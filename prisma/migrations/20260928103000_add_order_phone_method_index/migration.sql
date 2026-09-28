CREATE INDEX IF NOT EXISTS "Order_customerPhone_paymentMethod_idx"
ON "Order"("customerPhone", "paymentMethod");
