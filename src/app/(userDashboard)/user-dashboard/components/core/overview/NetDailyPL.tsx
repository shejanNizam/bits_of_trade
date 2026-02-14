"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function NetDailyPL() {
  // This data will come from backend later
  const data = [
    { day: "1", value: 2000 },
    { day: "2", value: -500 },
    { day: "3", value: 1800 },
    { day: "4", value: -700 },
    { day: "5", value: 1400 },
    { day: "6", value: -300 },
    { day: "7", value: 1600 },
    { day: "8", value: 2800 },
    { day: "9", value: -1200 },
    { day: "10", value: 2200 },
    { day: "11", value: 3000 },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl lg:rounded-2xl p-4 sm:p-5 lg:p-6 border border-gray-200 dark:border-gray-700">
      <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 sm:mb-6">
        Net Daily P&L
      </h3>

      <div className="w-full h-64 sm:h-72 lg:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#e5e7eb"
              className="dark:stroke-gray-700"
              vertical={false}
            />
            <XAxis
              dataKey="day"
              tick={{ fill: "#9ca3af", fontSize: 12 }}
              axisLine={{ stroke: "#e5e7eb" }}
              className="dark:stroke-gray-700"
              tickLine={false}
            />
            <YAxis
              tick={{ fill: "#9ca3af", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(value) => value.toLocaleString()}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(255, 255, 255, 0.95)",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                fontSize: "12px",
              }}
              formatter={(value: number | undefined) => {
                if (value === undefined) return ["N/A", "P&L"];
                return [`₹${value.toLocaleString()}`, "P&L"];
              }}
              labelFormatter={(label) => `Day ${label}`}
            />
            <Bar dataKey="value" radius={[4, 4, 0, 0]}>
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.value >= 0 ? "#10b981" : "#ef4444"}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
