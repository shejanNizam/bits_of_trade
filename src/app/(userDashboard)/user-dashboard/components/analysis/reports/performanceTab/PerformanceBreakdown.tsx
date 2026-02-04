import { BarChartOutlined, ClockCircleOutlined } from "@ant-design/icons";

const tradeMetrics = [
  { label: "Total P&L", value: "₹15,800", color: "text-emerald-500" },
  { label: "Average winning trade", value: "₹725" },
  { label: "Average losing trade", value: "₹-385" },
  { label: "Largest winning trade", value: "₹2,850" },
  { label: "Largest losing trade", value: "₹-1,240" },
  { label: "Profit factor", value: "2.8" },
  { label: "Trade expectancy", value: "₹352" },
];

const dayMetrics = [
  { label: "Total trading days", value: "10" },
  { label: "Winning days", value: "8", color: "text-emerald-500" },
  { label: "Losing days", value: "2", color: "text-rose-500" },
  { label: "Breakeven days", value: "0" },
  { label: "Avg daily P&L", value: "₹1,580" },
  { label: "Avg daily volume", value: "₹1,25,000" },
  { label: "Avg holding time", value: "2h 15m" },
];

export default function PerformanceBreakdown() {
  return (
    <div className="w-full bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-6 shadow-sm">
      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-8">
        Performance Breakdown
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-10">
        {/* Left Column: Trade-based Metrics */}
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

        {/* Right Column: Day-based Metrics */}
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
