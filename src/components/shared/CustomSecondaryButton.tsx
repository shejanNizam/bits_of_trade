import { ButtonProps } from "antd";

export default function CustomSecondaryButton({
  children,
  className,
}: ButtonProps) {
  return (
    <div>
      <>
        <button
          className={`h-12 rounded-full text-gray-700 dark:text-gray-200 font-medium px-4 transition-all duration-300 cursor-pointer border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-800 shadow-sm hover:bg-secondary dark:hover:bg-secondary  hover:text-white hover:shadow-sm hover:scale-105 active:scale-95 group ${className}`}
        >
          {children}
        </button>
      </>
    </div>
  );
}
