"use client";

interface CapitalUsageProps {
  capitalUsage: {
    max_capital_used: number;
    min_capital_used: number;
    average_capital_used: number;
    pnl_at_max_capital: number;
    pnl_at_min_capital: number;
  } | null;
}

export default function CapitalUsage({ capitalUsage }: CapitalUsageProps) {
  if (!capitalUsage) return null;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const capitalData = [
    {
      label: "Maximum capital used",
      value: formatCurrency(capitalUsage.max_capital_used),
    },
    {
      label: "Minimum capital used",
      value: formatCurrency(capitalUsage.min_capital_used),
    },
    {
      label: "Average capital used",
      value: formatCurrency(capitalUsage.average_capital_used),
    },
    {
      label: "P&L at max capital",
      value: formatCurrency(capitalUsage.pnl_at_max_capital),
      color:
        capitalUsage.pnl_at_max_capital >= 0
          ? "text-emerald-500"
          : "text-rose-500",
    },
    {
      label: "P&L at min capital",
      value: formatCurrency(capitalUsage.pnl_at_min_capital),
      color:
        capitalUsage.pnl_at_min_capital >= 0
          ? "text-emerald-500"
          : "text-rose-500",
    },
  ];

  return (
    <div className="w-full bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-3xl p-6 shadow-sm mb-6">
      <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-6">
        Capital Usage
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {capitalData.map((item, index) => (
          <div
            key={index}
            className="bg-gray-50/50 dark:bg-gray-900/40 border border-gray-50 dark:border-gray-800 rounded-xl p-4"
          >
            <p className="text-[10px] font-medium text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-tight">
              {item.label}
            </p>
            <p
              className={`text-lg font-bold ${item.color || "text-gray-900 dark:text-gray-100"}`}
            >
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
