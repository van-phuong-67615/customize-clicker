export function verifyWebhookApiKey(apiKey: string | null): boolean {
  const expectedApiKey = process.env.SEPAY_WEBHOOK_API_KEY;
  if (!expectedApiKey) {
    console.error('[SECURITY] SEPAY_WEBHOOK_API_KEY not configured — rejecting all webhook requests');
    return false;
  }
  return apiKey === expectedApiKey;
}

export function buildVietQrUrl(bankBin: string, accountNumber: string, amount: number, orderCode: string, accountName: string): string {
  const vietQrUrl = new URL(
    `https://img.vietqr.io/image/${bankBin}-${accountNumber}-compact2.jpg`,
  );
  vietQrUrl.searchParams.set('amount', String(amount));
  vietQrUrl.searchParams.set('addInfo', orderCode);
  vietQrUrl.searchParams.set('accountName', accountName);
  
  return vietQrUrl.toString();
}

export interface SePayBankAccount {
  id: string;
  account_holder_name: string;
  account_number: string;
  bank_short_name: string;
  bank_bin: string;
  is_active: boolean;
}

export async function getSepayBankAccounts(): Promise<SePayBankAccount[]> {
  const apiKey = process.env.SEPAY_API_TOKEN;
  if (!apiKey) {
    throw new Error('SEPAY_API_TOKEN is not configured');
  }

  const response = await fetch('https://userapi.sepay.vn/v2/bank-accounts', {
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`SePay API error: ${response.statusText}`);
  }

  const data = await response.json();
  if (data?.status !== 'success') {
    throw new Error('SePay bank accounts API returned unexpected response');
  }

  return data?.data || [];
}

import { PaymentInfo } from './types';

export async function getPaymentInfo(orderCode: string, amount: number): Promise<PaymentInfo> {
  const bankAccounts = await getSepayBankAccounts();
  const targetBank = process.env.SEPAY_BANK_NAME || 'ACB';
  
  const account = bankAccounts.find(
    acc => acc.bank_short_name?.toUpperCase().includes(targetBank.toUpperCase()) && acc.is_active !== false,
  );

  let bankBin = '6022817'; // Default Vietcombank BIN if not found
  let accountNumber = process.env.SEPAY_BANK_ACCOUNT || '';
  let accountHolder = process.env.SEPAY_ACCOUNT_NAME || '';
  let bankName = targetBank;

  if (account) {
    bankBin = account.bank_bin || bankBin;
    accountNumber = account.account_number;
    accountHolder = account.account_holder_name;
    bankName = account.bank_short_name || targetBank;
  } else {
    console.warn(`No active ${targetBank} bank account found in SePay. Using fallback values.`);
  }

  const qrCodeUrl = buildVietQrUrl(bankBin, accountNumber, amount, orderCode, accountHolder);

  return {
    bankName,
    accountNumber,
    accountHolder,
    amount,
    description: orderCode,
    qrCodeUrl,
  };
}