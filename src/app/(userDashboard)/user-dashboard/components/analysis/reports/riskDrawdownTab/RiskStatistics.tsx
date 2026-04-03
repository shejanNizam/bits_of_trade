// "use client";

// const riskStats = [
//   { label: "Max drawdown %", value: "-5.2%", color: "text-rose-500" },
//   { label: "Avg drawdown %", value: "-2.5%", color: "text-orange-500" },
//   { label: "Largest losing day", value: "₹-1,600", color: "text-rose-500" },
//   { label: "Avg losing day", value: "₹-725", color: "text-rose-500" },
//   { label: "Avg realized R-multiple", value: "1.8R", color: "text-teal-500" },
//   { label: "Max consecutive losing days", value: "2", color: "text-rose-500" },
//   { label: "Risk-adjusted return", value: "3.2", color: "text-emerald-500" },
//   { label: "Volatility index", value: "12.3%", color: "text-amber-500" },
// ];

// export default function RiskStatistics() {
//   return (
//     <div className="w-full bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-3xl p-6 shadow-sm mb-6">
//       <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-6">
//         Risk Statistics
//       </h3>

//       <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-4">
//         {riskStats.map((item, index) => (
//           <div key={index}>
//             <p className="text-[11px] font-medium text-gray-400 dark:text-gray-500 mb-1 uppercase tracking-wider">
//               {item.label}
//             </p>
//             <p className={`text-xl font-bold ${item.color}`}>{item.value}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

"use client";

interface RiskStatisticsProps {
  riskStatistics: {
    max_drawdown_pct: number;
    avg_drawdown_pct: number;
    largest_losing_day: number;
    avg_losing_day: number;
    avg_realized_r_multiple: number;
    max_consecutive_losing_days: number;
    risk_adjusted_return: number;
    volatility_index: number;
  };
}

export default function RiskStatistics({
  riskStatistics,
}: RiskStatisticsProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(Math.abs(amount));
  };

  const riskStats = [
    {
      label: "Max drawdown %",
      value: `${Math.abs(riskStatistics.max_drawdown_pct || 0).toFixed(1)}%`,
      color: "text-rose-500",
    },
    {
      label: "Avg drawdown %",
      value: `${Math.abs(riskStatistics.avg_drawdown_pct || 0).toFixed(1)}%`,
      color: "text-orange-500",
    },
    {
      label: "Largest losing day",
      value: formatCurrency(riskStatistics.largest_losing_day || 0),
      color: "text-rose-500",
    },
    {
      label: "Avg losing day",
      value: formatCurrency(riskStatistics.avg_losing_day || 0),
      color: "text-rose-500",
    },
    {
      label: "Avg realized R-multiple",
      value: `${(riskStatistics.avg_realized_r_multiple || 0).toFixed(1)}R`,
      color: "text-teal-500",
    },
    {
      label: "Max consecutive losing days",
      value: riskStatistics.max_consecutive_losing_days || 0,
      color: "text-rose-500",
    },
    {
      label: "Risk-adjusted return",
      value: (riskStatistics.risk_adjusted_return || 0).toFixed(2),
      color: "text-emerald-500",
    },
    {
      label: "Volatility index",
      value: `${(riskStatistics.volatility_index || 0).toFixed(1)}%`,
      color: "text-amber-500",
    },
  ];

  return (
    <div className="w-full bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-3xl p-6 shadow-sm mb-6">
      <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-6">
        Risk Statistics
      </h3>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-4">
        {riskStats.map((item, index) => (
          <div key={index}>
            <p className="text-[11px] font-medium text-gray-400 dark:text-gray-500 mb-1 uppercase tracking-wider">
              {item.label}
            </p>
            <p className={`text-xl font-bold ${item.color}`}>{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
