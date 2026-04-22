// interface OverviewProps {
//   overviewData?: {
//     netPnl: {
//       value: number;
//       percentChange: number;
//       vsText: string;
//     };
//     tradeWinPercent: {
//       value: number;
//       percentChange: number;
//       vsText: string;
//     };
//     profitFactor: number;
//     dayWinPercent: number;
//     avgWin: number;
//     avgLoss: number;
//   };
// }

// export default function Overview({ overviewData }: OverviewProps) {
//   const metrics = [
//     {
//       label: "Net P&L",
//       value: `₹${overviewData?.netPnl?.value?.toLocaleString() || "0"}`,
//       subtext: `${overviewData?.netPnl?.percentChange || 0}% ${overviewData?.netPnl?.vsText || "vs last month"}`,
//       subtextColor:
//         (overviewData?.netPnl?.percentChange ?? 0) >= 0 ? "green" : "red",
//     },
//     {
//       label: "Trade Win %",
//       value: `${overviewData?.tradeWinPercent?.value || 0}%`,
//       subtext: `${overviewData?.tradeWinPercent?.percentChange || 0}% ${overviewData?.tradeWinPercent?.vsText || "improvement"}`,
//       subtextColor:
//         (overviewData?.tradeWinPercent?.value ?? 0) >= 50 ? "green" : "red",
//     },
//     {
//       label: "Profit Factor",
//       value: (overviewData?.profitFactor || 0).toFixed(1),
//       subtext:
//         overviewData?.profitFactor && overviewData.profitFactor > 1
//           ? "Healthy ratio"
//           : "Needs improvement",
//       subtextColor:
//         overviewData?.profitFactor && overviewData.profitFactor > 1
//           ? "green"
//           : "red",
//     },
//     {
//       label: "Day Win %",
//       value: `${overviewData?.dayWinPercent || 0}%`,
//       subtext: `${(((overviewData?.dayWinPercent || 0) / 100) * 100).toFixed(1)}% winning days`,
//       subtextColor: (overviewData?.dayWinPercent || 0) >= 50 ? "green" : "red",
//     },
//     {
//       label: "Avg Win / Avg Loss",
//       value: `${overviewData?.avgWin && overviewData?.avgLoss ? (overviewData.avgWin / overviewData.avgLoss).toFixed(1) : "0"}`,
//       subtext: `₹${overviewData?.avgWin?.toLocaleString() || "0"} / ₹${overviewData?.avgLoss?.toLocaleString() || "0"}`,
//       subtextColor:
//         overviewData?.avgWin &&
//         overviewData?.avgLoss &&
//         overviewData.avgWin > overviewData.avgLoss
//           ? "green"
//           : "red",
//     },
//   ];

//   return (
//     <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl lg:rounded-2xl">
//       <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8">
//         <div className="flex-1">
//           <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-1 sm:mb-2">
//             Overview
//           </h2>
//           <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
//             Your trading system at a glance. Process first, outcomes later.
//           </p>
//         </div>
//       </div>

//       {/* Metrics Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
//         {metrics.map((metric, index) => (
//           <div
//             key={index}
//             className="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-5 border border-gray-200 dark:border-gray-700 hover:shadow-md dark:hover:shadow-gray-900/50 transition-shadow"
//           >
//             {/* Label */}
//             <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-2 sm:mb-3">
//               {metric.label}
//             </p>

//             {/* Main Value */}
//             <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-1 sm:mb-2">
//               {metric.value}
//             </h3>

//             {/* Subtext */}
//             <p
//               className={`text-xs sm:text-sm font-medium ${
//                 metric.subtextColor === "green"
//                   ? "text-green-600 dark:text-green-400"
//                   : metric.subtextColor === "red"
//                     ? "text-red-600 dark:text-red-400"
//                     : "text-gray-500 dark:text-gray-400"
//               }`}
//             >
//               {metric.subtext}
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

interface OverviewProps {
  overviewData?: {
    netPnl: {
      value: number;
      percentChange: number;
      vsText: string;
    };
    tradeWinPercent: {
      value: number;
      percentChange: number;
      vsText: string;
    };
    profitFactor: number;
    dayWinPercent: number;
    avgWin: number;
    avgLoss: number;
  };
}

export default function Overview({ overviewData }: OverviewProps) {
  const metrics = [
    {
      label: "Net P&L",
      value: `₹${overviewData?.netPnl?.value?.toLocaleString() || "0"}`,
      subtext: `${overviewData?.netPnl?.percentChange || 0}% ${overviewData?.netPnl?.vsText || "vs last month"}`,
      valueColor: (overviewData?.netPnl?.value ?? 0) >= 0 ? "green" : "red",
      subtextColor:
        (overviewData?.netPnl?.percentChange ?? 0) >= 0 ? "green" : "red",
    },
    {
      label: "Trade Win %",
      value: `${overviewData?.tradeWinPercent?.value || 0}%`,
      subtext: `${overviewData?.tradeWinPercent?.percentChange || 0}% ${overviewData?.tradeWinPercent?.vsText || "improvement"}`,
      valueColor: "default", // Win % is always positive
      subtextColor:
        (overviewData?.tradeWinPercent?.percentChange ?? 0) >= 0
          ? "green"
          : "red",
    },
    {
      label: "Profit Factor",
      value: (overviewData?.profitFactor || 0).toFixed(1),
      subtext:
        overviewData?.profitFactor && overviewData.profitFactor > 1
          ? "Healthy ratio"
          : "Needs improvement",
      valueColor: (overviewData?.profitFactor ?? 0) >= 1 ? "green" : "red",
      subtextColor:
        overviewData?.profitFactor && overviewData.profitFactor > 1
          ? "green"
          : "red",
    },
    {
      label: "Day Win %",
      value: `${overviewData?.dayWinPercent || 0}%`,
      subtext: `${(((overviewData?.dayWinPercent || 0) / 100) * 100).toFixed(1)}% winning days`,
      valueColor: "default", // Day Win % is always positive
      subtextColor: (overviewData?.dayWinPercent || 0) >= 50 ? "green" : "red",
    },
    {
      label: "Avg Win / Avg Loss",
      value: `${overviewData?.avgWin && overviewData?.avgLoss ? (overviewData.avgWin / overviewData.avgLoss).toFixed(1) : "0"}`,
      subtext: `₹${overviewData?.avgWin?.toLocaleString() || "0"} / ₹${overviewData?.avgLoss?.toLocaleString() || "0"}`,
      valueColor:
        overviewData?.avgWin &&
        overviewData?.avgLoss &&
        overviewData.avgWin > overviewData.avgLoss
          ? "green"
          : "red",
      subtextColor:
        overviewData?.avgWin &&
        overviewData?.avgLoss &&
        overviewData.avgWin > overviewData.avgLoss
          ? "green"
          : "red",
    },
  ];

  return (
    <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl lg:rounded-2xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8">
        <div className="flex-1">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-1 sm:mb-2">
            Overview
          </h2>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
            Your trading system at a glance. Process first, outcomes later.
          </p>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
        {metrics.map((metric, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-5 border border-gray-200 dark:border-gray-700 hover:shadow-md dark:hover:shadow-gray-900/50 transition-shadow"
          >
            {/* Label */}
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-2 sm:mb-3">
              {metric.label}
            </p>

            {/* Main Value */}
            <h3
              className={`text-2xl sm:text-3xl font-bold mb-1 sm:mb-2 ${
                metric.valueColor === "green"
                  ? "text-green-600 dark:text-green-400"
                  : metric.valueColor === "red"
                    ? "text-red-600 dark:text-red-400"
                    : "text-gray-900 dark:text-gray-100"
              }`}
            >
              {metric.value}
            </h3>

            {/* Subtext */}
            <p
              className={`text-xs sm:text-sm font-medium ${
                metric.subtextColor === "green"
                  ? "text-green-600 dark:text-green-400"
                  : metric.subtextColor === "red"
                    ? "text-red-600 dark:text-red-400"
                    : "text-gray-500 dark:text-gray-400"
              }`}
            >
              {metric.subtext}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
