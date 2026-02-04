import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";

const stats = [
  { label: "Net P&L", value: "₹15,800", change: "+12.5%", trend: "up" },
  { label: "Win Rate", value: "68%", change: "+5%", trend: "up" },
  { label: "Profit Factor", value: "2.8", change: "-0.2", trend: "down" },
  { label: "Trade Expectancy", value: "₹352", change: "+8%", trend: "up" },
  { label: "Avg Trade P&L", value: "₹485", change: "+12%", trend: "up" },
  { label: "Total Trades", value: "48", change: "+6", trend: "up" },
];

export default function PerformanceOverview() {
  return (
    <div className="w-full py-6">
      {/* Responsive Grid:
         - 1 column on very small mobile
         - 2 columns on small tablets
         - 3 columns on tablets
         - 6 columns on desktop 
      */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {stats.map((item, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-5 shadow-sm transition-all hover:shadow-md"
          >
            {/* Label */}
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
              {item.label}
            </p>

            {/* Value */}
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              {item.value}
            </h3>

            {/* Trend Indicator */}
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
          </div>
        ))}
      </div>
    </div>
  );
}
