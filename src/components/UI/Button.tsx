"use client";
import * as React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "green" | "red" | "blue" | "gray" | "yellow" | "default" | "icon";
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
}

export function Button({
  children,
  variant = "default",
  disabled = false,
  className = "",

  ...props
}: ButtonProps) {
  const baseClassName = variant === "icon" ? "cursor-pointer" : "p-2 rounded-sm text-neutral-100 cursor-pointer";

  const variantClasses = {
    default: "bg-slate-600 hover:bg-slate-800",
    green: "bg-emerald-600 hover:bg-emerald-800",
    red: "bg-red-600 hover:bg-red-800",
    blue: "bg-blue-600 hover:bg-blue-800",
    gray: "bg-gray-500 hover:bg-gray-700",
    yellow: "bg-yellow-600 hover:bg-yellow-800",
    icon: "hover:opacity-70",
  };

  const disabledClasses = disabled ? "opacity-50 cursor-not-allowed hover:bg-current" : "";
  const iconDisabledClasses = disabled && variant === "icon" ? "opacity-50 cursor-not-allowed hover:opacity-50" : "";

  const combinedClassName = [
    baseClassName,
    variantClasses[variant],
    variant === "icon" ? iconDisabledClasses : disabledClasses,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button className={combinedClassName} disabled={disabled} {...props}>
      {children}
    </button>
  );
}
