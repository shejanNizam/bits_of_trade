/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useGetAllTradeQuery } from "@/redux/features/tradelog/tradelogApi";

interface TradeLogFooterProps {
  stats?: {
    cleanTrades: number;
    violations: number;
    ruleBreaches: number;
    totalTrades: number;
  };
}

export default function TradeLogFooter({
  stats: propStats,
}: TradeLogFooterProps) {
  const { data, isLoading } = useGetAllTradeQuery({ page: 1, limit: 1000 });

  const calculateStats = () => {
    const trades = data?.results || [];
    const totalTrades = trades.length;

    const cleanTrades = trades.filter(
      (trade: any) =>
        !trade.violation_modes || trade.violation_modes.length === 0,
    ).length;

    const violations = trades.filter(
      (trade: any) => trade.violation_modes && trade.violation_modes.length > 0,
    ).length;

    const ruleBreaches = trades.reduce(
      (total: number, trade: any) =>
        total + (trade.violation_modes?.length || 0),
      0,
    );

    return {
      cleanTrades,
      violations,
      ruleBreaches,
      totalTrades,
    };
  };

  const stats = propStats || calculateStats();

  const displayStats = [
    {
      value: stats.cleanTrades.toString(),
      label: "Clean Trades",
      sublabel: `${stats.totalTrades > 0 ? Math.round((stats.cleanTrades / stats.totalTrades) * 100) : 0}% of total`,
      color: "text-green-600 dark:text-green-400",
    },
    {
      value: stats.violations.toString(),
      label: "Violations",
      sublabel: `${stats.totalTrades > 0 ? Math.round((stats.violations / stats.totalTrades) * 100) : 0}% of total`,
      color: "text-orange-600 dark:text-orange-400",
    },
    {
      value: stats.ruleBreaches.toString(),
      label: "Rule Breaches",
      sublabel: `${stats.totalTrades > 0 ? Math.round((stats.ruleBreaches / stats.totalTrades) * 100) : 0}% [max]`,
      color: "text-red-600 dark:text-red-400",
    },
  ];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mt-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 animate-pulse"
          >
            <div className="h-12 w-24 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
            <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mt-6">
      {displayStats.map((stat, index) => (
        <div
          key={index}
          className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md dark:hover:shadow-gray-900/50 transition-shadow"
        >
          <h3 className={`text-4xl sm:text-5xl font-bold mb-2 ${stat.color}`}>
            {stat.value}
          </h3>
          <p className="text-base sm:text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">
            {stat.label}
          </p>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
            {stat.sublabel}
          </p>
        </div>
      ))}
    </div>
  );
}
