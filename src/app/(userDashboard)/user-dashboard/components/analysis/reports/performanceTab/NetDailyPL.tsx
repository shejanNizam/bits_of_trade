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

const dailyData = [
  { name: "Jan 1", pnl: 0 },
  { name: "Jan 2", pnl: 2500 },
  { name: "Jan 3", pnl: 2300 },
  { name: "Jan 4", pnl: -1600 },
  { name: "Jan 5", pnl: 2400 },
  { name: "Jan 6", pnl: 1600 },
  { name: "Jan 7", pnl: 2600 },
  { name: "Jan 8", pnl: 1700 },
  { name: "Jan 9", pnl: 1700 },
  { name: "Jan 10", pnl: 2600 },
];

export default function NetDailyPL() {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-3xl p-6 shadow-sm w-full h-full min-h-100">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
          Net Daily P&L
        </h3>
      </div>

      <div className="h-75 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={dailyData}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#e5e7eb"
              className="dark:stroke-gray-700"
            />
            <XAxis
              dataKey="name"
              axisLine={true}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#9ca3af" }}
              dy={10}
            />
            <YAxis
              axisLine={true}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#9ca3af" }}
              domain={[-3000, 3000]}
              ticks={[-3000, -1500, 0, 1500, 3000]}
              dx={-10}
            />
            <Tooltip
              cursor={{ fill: "transparent" }}
              contentStyle={{
                borderRadius: "12px",
                border: "none",
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
              }}
            />
            <Bar dataKey="pnl" radius={[4, 4, 0, 0]}>
              {dailyData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.pnl >= 0 ? "#14b8a6" : "#14b8a6"}
                  fillOpacity={0.9}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
