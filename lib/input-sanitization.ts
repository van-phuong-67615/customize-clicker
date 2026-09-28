const UNSAFE_TEXT_PATTERN = /[<>]|javascript\s*:/i;
const UNSAFE_TEXT_GLOBAL_PATTERN = /[<>]|javascript\s*:/gi;

export function sanitizePlainTextInput(value: string): string {
  return value.normalize('NFC').replace(UNSAFE_TEXT_GLOBAL_PATTERN, '');
}

export function containsUnsafeMarkup(value: string): boolean {
  return UNSAFE_TEXT_PATTERN.test(value);
}
