export interface CustomerInfo {
  name: string;
  phone: string;
  city: string;
  district: string;
  address: string;
  notes?: string;
}

export interface ProductSelection {
  customText: string;
  colorMode: 'single' | 'dual';
  colors: string[];
}

export interface PricingBreakdown {
  base: number;
  textAddon: number;
  total: number;
  charCount: number;
}

export interface PaymentInfo {
  bankName: string;
  accountNumber: string;
  accountHolder: string;
  amount: number;
  description: string;
  qrCodeUrl: string;
}

export interface CreateOrderResponse {
  orderId: string;
  orderCode: string;
  serverTotal: number;
  paymentInfo?: PaymentInfo;
}

export interface OrderRecord {
  id: string;
  createdAt: number;
  status: 'pending_payment' | 'paid' | 'awaiting_cod';
  customer: CustomerInfo;
  product: ProductSelection;
  pricing: PricingBreakdown;
  payment: {
    method: 'cod' | 'qr';
    transferCode?: string;
    sePayTxId?: string;
  };
}