"use client";

interface QuantityAnalysisProps {
  quantityAnalysis: {
    max_quantity: number;
    min_quantity: number;
    average_quantity: number;
    pnl_at_max_quantity: number;
    pnl_at_min_quantity: number;
  } | null;
}

export default function QuantityAnalysis({
  quantityAnalysis,
}: QuantityAnalysisProps) {
  if (!quantityAnalysis) return null;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat("en-IN").format(Math.round(value));
  };

  const quantityData = [
    {
      label: "Maximum quantity",
      value: formatNumber(quantityAnalysis.max_quantity),
    },
    {
      label: "Minimum quantity",
      value: formatNumber(quantityAnalysis.min_quantity),
    },
    {
      label: "Average quantity",
      value: formatNumber(quantityAnalysis.average_quantity),
    },
    {
      label: "P&L at max quantity",
      value: formatCurrency(quantityAnalysis.pnl_at_max_quantity),
      color:
        quantityAnalysis.pnl_at_max_quantity >= 0
          ? "text-emerald-500"
          : "text-rose-500",
    },
    {
      label: "P&L at min quantity",
      value: formatCurrency(quantityAnalysis.pnl_at_min_quantity),
      color:
        quantityAnalysis.pnl_at_min_quantity >= 0
          ? "text-emerald-500"
          : "text-rose-500",
    },
  ];

  return (
    <div className="w-full bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-3xl p-6 shadow-sm">
      <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-6">
        Quantity Analysis
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {quantityData.map((item, index) => (
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
