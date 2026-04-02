import { BarChartOutlined, ClockCircleOutlined } from "@ant-design/icons";

interface PerformanceBreakdownProps {
  performanceBreakdown: {
    trade_based_metrics: {
      total_pnl: number;
      average_winning_trade: number;
      average_losing_trade: number;
      largest_winning_trade: number;
      largest_losing_trade: number;
      profit_factor: number;
      trade_expectancy: number;
    };
    day_based_metrics: {
      total_trading_days: number;
      winning_days: number;
      losing_days: number;
      breakeven_days: number;
      avg_daily_pnl: number;
      avg_daily_volume: number;
      avg_holding_time: string;
    };
  } | null;
}

export default function PerformanceBreakdown({
  performanceBreakdown,
}: PerformanceBreakdownProps) {
  if (!performanceBreakdown) return null;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const tradeMetrics = [
    {
      label: "Total P&L",
      value: formatCurrency(performanceBreakdown.trade_based_metrics.total_pnl),
      color:
        performanceBreakdown.trade_based_metrics.total_pnl >= 0
          ? "text-emerald-500"
          : "text-rose-500",
    },
    {
      label: "Average winning trade",
      value: formatCurrency(
        performanceBreakdown.trade_based_metrics.average_winning_trade,
      ),
    },
    {
      label: "Average losing trade",
      value: formatCurrency(
        performanceBreakdown.trade_based_metrics.average_losing_trade,
      ),
    },
    {
      label: "Largest winning trade",
      value: formatCurrency(
        performanceBreakdown.trade_based_metrics.largest_winning_trade,
      ),
    },
    {
      label: "Largest losing trade",
      value: formatCurrency(
        performanceBreakdown.trade_based_metrics.largest_losing_trade,
      ),
    },
    {
      label: "Profit factor",
      value: performanceBreakdown.trade_based_metrics.profit_factor.toFixed(2),
    },
    {
      label: "Trade expectancy",
      value: formatCurrency(
        performanceBreakdown.trade_based_metrics.trade_expectancy,
      ),
    },
  ];

  const dayMetrics = [
    {
      label: "Total trading days",
      value:
        performanceBreakdown.day_based_metrics.total_trading_days.toString(),
    },
    {
      label: "Winning days",
      value: performanceBreakdown.day_based_metrics.winning_days.toString(),
      color: "text-emerald-500",
    },
    {
      label: "Losing days",
      value: performanceBreakdown.day_based_metrics.losing_days.toString(),
      color: "text-rose-500",
    },
    {
      label: "Breakeven days",
      value: performanceBreakdown.day_based_metrics.breakeven_days.toString(),
    },
    {
      label: "Avg daily P&L",
      value: formatCurrency(
        performanceBreakdown.day_based_metrics.avg_daily_pnl,
      ),
    },
    {
      label: "Avg daily volume",
      value: formatCurrency(
        performanceBreakdown.day_based_metrics.avg_daily_volume,
      ),
    },
    {
      label: "Avg holding time",
      value: performanceBreakdown.day_based_metrics.avg_holding_time,
    },
  ];

  return (
    <div className="w-full bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-6 shadow-sm">
      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-8">
        Performance Breakdown
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-10">
        <div>
          <div className="flex items-center gap-2 mb-6">
            <BarChartOutlined className="text-gray-400" />
            <h3 className="font-bold text-gray-700 dark:text-gray-300">
              Trade-based Metrics
            </h3>
          </div>
          <div className="space-y-4">
            {tradeMetrics.map((item, idx) => (
              <MetricRow key={idx} {...item} />
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-6">
            <ClockCircleOutlined className="text-gray-400" />
            <h3 className="font-bold text-gray-700 dark:text-gray-300">
              Day-based Metrics
            </h3>
          </div>
          <div className="space-y-4">
            {dayMetrics.map((item, idx) => (
              <MetricRow key={idx} {...item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricRow({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color?: string;
}) {
  return (
    <div className="flex justify-between items-center py-1 border-b border-gray-50 dark:border-gray-700/50 last:border-0">
      <span className="text-sm text-gray-500 dark:text-gray-400">{label}</span>
      <span
        className={`text-sm font-bold ${color || "text-gray-900 dark:text-gray-100"}`}
      >
        {value}
      </span>
    </div>
  );
}
