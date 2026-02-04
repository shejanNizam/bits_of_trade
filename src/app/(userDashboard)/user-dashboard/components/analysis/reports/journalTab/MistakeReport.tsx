import { FiAlertTriangle } from "react-icons/fi";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface PieLabelProps {
  cx?: number;
  cy?: number;
  midAngle?: number;
  innerRadius?: number;
  outerRadius?: number;
  index?: number;
  value?: number;
}

const frequencyData = [
  { name: "Premature Exit", value: 8 },
  { name: "Overtrading", value: 5 },
  { name: "FOMO Entry", value: 3 },
  { name: "Missed Stop Loss", value: 2 },
  { name: "Revenge Trading", value: 1 },
];

const contributionData = [
  { name: "Teal", value: 3200, color: "#14B8A6" },
  { name: "Purple", value: 2100, color: "#8B5CF6" },
  { name: "Blue", value: 1500, color: "#3B82F6" },
  { name: "Orange", value: 1800, color: "#F59E0B" },
  { name: "Red", value: 900, color: "#EF4444" },
];

// Custom Label for Pie Chart
const renderCustomizedLabel = ({
  cx = 0,
  cy = 0,
  midAngle = 0,
  outerRadius = 0,
  index = 0,
  value = 0,
}: PieLabelProps) => {
  const RADIAN = Math.PI / 180;
  // Position for the label
  const radius = outerRadius * 1.4;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill={contributionData[index]?.color || "#888"}
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      className="text-xs font-medium dark:opacity-90"
    >
      {value}
    </text>
  );
};

export default function MistakeReport() {
  return (
    <div className="w-full p-4 md:p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 transition-colors duration-200">
      {/* --- Header --- */}
      <div className="flex items-start gap-4 mb-8">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-50 dark:bg-red-900/20 text-red-500">
          <FiAlertTriangle className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Mistake Report
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Analysis of recurring mistakes and their cost
          </p>
        </div>
      </div>

      {/* --- Charts Section --- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="w-full">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-6">
            Mistake Frequency
          </h3>
          <div className="h-62.5 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={frequencyData}
                margin={{ top: 5, right: 30, left: -20, bottom: 5 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#E5E7EB"
                  className="dark:opacity-10"
                />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 10, fill: "#6B7280" }}
                  interval={0}
                  angle={-15}
                  textAnchor="end"
                  tickMargin={10}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: "#6B7280" }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  cursor={{ fill: "transparent" }}
                  contentStyle={{
                    borderRadius: "8px",
                    border: "none",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                  }}
                />
                <Bar
                  dataKey="value"
                  fill="#EF4444"
                  radius={[4, 4, 0, 0]}
                  barSize={40}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="w-full">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-6">
            Mistake-to-Loss Contribution
          </h3>
          <div className="h-62.5 w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={contributionData}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  label={renderCustomizedLabel}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  strokeWidth={2}
                  className="stroke-white dark:stroke-gray-900"
                >
                  {contributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Most frequent mistake" value="Premature Exit" isText />
        <StatCard label="Total mistake cost" value="₹9,500" />
        <StatCard label="Avg cost per mistake" value="₹500" />
        <StatCard label="Clustering pattern detected" value="Yes" isText />
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  isText = false,
}: {
  label: string;
  value: string;
  isText?: boolean;
}) {
  return (
    <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl">
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{label}</p>
      <p
        className={`text-lg font-bold text-gray-900 dark:text-white ${isText ? "text-base" : ""}`}
      >
        {value}
      </p>
    </div>
  );
}
