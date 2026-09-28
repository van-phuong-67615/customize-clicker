import { z } from 'zod';
import { containsUnsafeMarkup } from './input-sanitization';

export function plainText(maxLength: number) {
  return z
    .string()
    .trim()
    .max(maxLength)
    .refine((value) => !containsUnsafeMarkup(value), {
      message: 'Nội dung không được chứa HTML hoặc JavaScript.',
    });
}

export const customText = z
  .string()
  .trim()
  .toUpperCase()
  .regex(/^[A-Z0-9 ]{0,8}$/, 'Chỉ chấp nhận chữ cái, số và khoảng trắng (tối đa 8 ký tự).');

export const hexColor = z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'Màu không hợp lệ.');

export const vietnamesePhoneNumber = plainText(20)
  .transform((value) => value.replace(/[\s().-]/g, '').replace(/^\+?84/, '0'))
  .refine((value) => /^0\d{9}$/.test(value), 'Số điện thoại không hợp lệ.');
