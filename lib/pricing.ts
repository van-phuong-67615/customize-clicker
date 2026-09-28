import { PricingBreakdown } from './types';

export const BASE_PRICE = 5000;
export const MAX_CHARS = 8;

// Pricing Configuration
const PRICING_CONFIG = {
  char1Price: 20000,               // Fixed total price for exactly 1 character
  basePerCharPrice: 15000,         // Base price per character starting at 2 characters
  discountStepPerChar: 1000,       // Price drop per character for each additional character beyond 2
};

/**
 * Calculates the total text addon price using a progressive tiered discount.
 * 1 char = flat price.
 * >= 2 chars = (basePerCharPrice - (count - 2) * discountStep) * count
 */
export function calculateTextAddon(charCount: number): number {
  if (charCount <= 0) return 0;
  const count = Math.min(charCount, MAX_CHARS);
  
  // Special case for 1 character
  if (count === 1) return PRICING_CONFIG.char1Price;
  
  // For 2 or more characters, calculate the discounted price per character
  // Example with base=15k, step=1k: 
  // 2 chars -> 15k/char
  // 3 chars -> 14k/char
  // 8 chars -> 9k/char
  const pricePerChar = PRICING_CONFIG.basePerCharPrice - (count - 2) * PRICING_CONFIG.discountStepPerChar;
  
  return pricePerChar * count;
}

export function calculateTotal(charCount: number): number {
  return charCount == 0 ? 0 : BASE_PRICE + calculateTextAddon(charCount);
}

export function getPricingBreakdown(text: string): PricingBreakdown {
  // sanitize
  const cleanText = text.trim();
  const charCount = cleanText.length;
  
  return {
    base: charCount == 0 ? 0 : BASE_PRICE,
    textAddon: calculateTextAddon(charCount),
    total: calculateTotal(charCount),
    charCount: Math.min(charCount, MAX_CHARS),
  };
}
