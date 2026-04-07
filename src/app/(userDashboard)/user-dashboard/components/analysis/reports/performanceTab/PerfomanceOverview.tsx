import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";

interface PerformanceOverviewProps {
  performanceData: {
    total_pnl: number;
    win_rate: number;
    profit_factor: number;
    trade_expectancy: number;
    avg_trade_pnl: number;
    total_trades: number;
  } | null;
}

export default function PerformanceOverview({
  performanceData,
}: PerformanceOverviewProps) {
  if (!performanceData) return null;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const formatPercentage = (value: number) => {
    return `${value}%`;
  };

  const stats = [
    {
      label: "Net P&L",
      value: formatCurrency(performanceData.total_pnl),
      // value: performanceData.total_pnl,
      change: "",
      trend: performanceData.total_pnl >= 0 ? "up" : "down",
    },
    {
      label: "Win Rate",
      value: formatPercentage(performanceData.win_rate),
      change: "",
      trend: "up",
    },
    {
      label: "Profit Factor",
      value: performanceData.profit_factor.toFixed(2),
      change: "",
      trend: performanceData.profit_factor >= 1 ? "up" : "down",
    },
    {
      label: "Trade Expectancy",
      value: formatCurrency(performanceData.trade_expectancy),
      change: "",
      trend: performanceData.trade_expectancy >= 0 ? "up" : "down",
    },
    {
      label: "Avg Trade P&L",
      value: formatCurrency(performanceData.avg_trade_pnl),
      change: "",
      trend: performanceData.avg_trade_pnl >= 0 ? "up" : "down",
    },
    {
      label: "Total Trades",
      value: performanceData.total_trades.toString(),
      change: "",
      trend: "up",
    },
  ];

  return (
    <div className="w-full py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {stats.map((item, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-5 shadow-sm transition-all hover:shadow-md"
          >
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
              {item.label}
            </p>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              {item.value}
            </h3>
            {item.change && (
              <div
                className={`flex items-center gap-1.5 text-sm font-semibold ${
                  item.trend === "up"
                    ? "text-emerald-500 dark:text-emerald-400"
                    : "text-rose-500 dark:text-rose-400"
                }`}
              >
                {item.trend === "up" ? (
                  <ArrowUpOutlined className="text-xs" />
                ) : (
                  <ArrowDownOutlined className="text-xs" />
                )}
                <span>{item.change}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
