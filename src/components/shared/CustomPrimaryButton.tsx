import React from "react";

interface CustomPrimaryButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export default function CustomPrimaryButton({
  children,
  className = "",
  onClick,
  type = "button",
  disabled = false,
}: CustomPrimaryButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`h-11 sm:h-12 md:h-14 rounded-full bg-primary hover:bg-secondary dark:bg-primary dark:hover:bg-secondary shadow-lg dark:shadow-blue-500/20 hover:shadow-sm text-white font-medium text-sm sm:text-base md:text-lg px-6 sm:px-8 transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:bg-primary touch-manipulation ${className}`}
    >
      {children}
    </button>
  );
}
