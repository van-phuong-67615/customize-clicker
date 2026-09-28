import * as React from "react";
import { sanitizePlainTextInput } from '@/lib/input-sanitization';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", error, onChange, ...props }, ref) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      event.currentTarget.value = sanitizePlainTextInput(event.currentTarget.value);
      onChange?.(event);
    };

    return (
      <input
        className={`flex h-11 w-full rounded-md border ${error ? "border-red-500" : "border-gray-300"} bg-white px-3 py-2 text-base ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
        ref={ref}
        onChange={handleChange}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";
