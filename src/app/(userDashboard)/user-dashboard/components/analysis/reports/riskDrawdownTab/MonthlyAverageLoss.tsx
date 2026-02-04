"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const lossData = [
  { month: "Oct", loss: -1200 },
  { month: "Nov", loss: -850 },
  { month: "Dec", loss: -1450 },
  { month: "Jan", loss: -980 },
];

export default function MonthlyAverageLoss() {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-3xl p-6 shadow-sm h-100">
      <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-6">
        Monthly Average Loss
      </h3>
      <div className="h-75 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={lossData} layout="vertical" margin={{ left: 20 }}>
            <CartesianGrid
              strokeDasharray="3 3"
              horizontal={false}
              stroke="#e5e7eb"
              className="dark:stroke-gray-700"
            />
            <XAxis
              type="number"
              tick={{ fontSize: 12, fill: "#9ca3af" }}
              axisLine={false}
              tickLine={false}
              domain={[-1600, -800]}
            />
            <YAxis
              dataKey="month"
              type="category"
              tick={{ fontSize: 12, fill: "#9ca3af" }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip cursor={{ fill: "transparent" }} />
            <Bar
              dataKey="loss"
              fill="#ef4444"
              radius={[0, 4, 4, 0]}
              barSize={40}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
