import { prisma } from "./prisma";
import { PaymentStatus, PaymentMethod, Order, Prisma } from "@prisma/client";

export const MAX_COD_ORDERS_PER_PHONE = 5;

export class CodOrderLimitError extends Error {
  constructor() {
    super('COD order limit reached');
  }
}

type CreateOrderData = {
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  productOptions: Prisma.InputJsonValue;
  totalPrice: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
};

export function generateOrderCode(): string {
  // DH + 6 random digits e.g. DH362309
  const randomNum = Math.floor(100000 + Math.random() * 900000);
  return `DH${randomNum}`;
}

export async function createOrder(data: CreateOrderData): Promise<Order> {
  const orderCode = generateOrderCode();
  
  return await prisma.order.create({
    data: {
      orderCode,
      ...data,
    },
  });
}

export async function createCodOrderWithinLimit(data: CreateOrderData): Promise<Order> {
  for (let attempt = 0; attempt < 3; attempt += 1) {
    try {
      return await prisma.$transaction(async (transaction) => {
        const existingCodOrders = await transaction.order.count({
          where: {
            customerPhone: data.customerPhone,
            paymentMethod: PaymentMethod.COD,
          },
        });

        if (existingCodOrders >= MAX_COD_ORDERS_PER_PHONE) {
          throw new CodOrderLimitError();
        }

        return transaction.order.create({
          data: {
            orderCode: generateOrderCode(),
            ...data,
          },
        });
      }, {
        isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
      });
    } catch (error) {
      if (error instanceof CodOrderLimitError || !(error instanceof Prisma.PrismaClientKnownRequestError) || error.code !== 'P2034') {
        throw error;
      }
    }
  }

  throw new Error('Unable to create COD order due to concurrent requests');
}

export async function getOrder(id: string): Promise<Order | null> {
  return await prisma.order.findUnique({
    where: { id },
  });
}

export async function findOrderByOrderCode(orderCode: string): Promise<Order | null> {
  return await prisma.order.findUnique({
    where: { orderCode },
  });
}

export async function updateOrderStatus(id: string, status: PaymentStatus, sePayTxId?: string): Promise<Order> {
  return await prisma.order.update({
    where: { id },
    data: {
      paymentStatus: status,
      ...(sePayTxId && { sePayTxId }),
    },
  });
}
