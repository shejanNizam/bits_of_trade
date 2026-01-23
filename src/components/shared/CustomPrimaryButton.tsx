import { ButtonProps } from "antd";

export default function CustomPrimaryButton({
  children,
  className = "",
}: ButtonProps) {
  return (
    <button
      className={`h-12 rounded-full bg-primary shadow-lg dark:shadow-blue-500/20 hover:bg-secondary text-white font-medium px-6 transition-all duration-300 cursor-pointer hover:shadow-sm hover:scale-105 active:scale-95 ${className}`}
    >
      {children}
    </button>
  );
}
