import * as React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  fullWidth?: boolean;
}

export function Button({ className = "", variant = "primary", fullWidth, ...props }: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 disabled:opacity-50 disabled:pointer-events-none min-h-[44px] px-4 py-2";
  
  const variants = {
    primary: "bg-red-600 text-white hover:bg-red-700",
    secondary: "bg-blue-600 text-white hover:bg-blue-700",
    outline: "border border-gray-300 bg-transparent hover:bg-gray-50 text-gray-900",
    ghost: "bg-transparent hover:bg-gray-100 text-gray-900",
  };

  const widthStyle = fullWidth ? "w-full" : "";

  return (
    <button className={`${baseStyles} ${variants[variant]} ${widthStyle} ${className}`} {...props} />
  );
}