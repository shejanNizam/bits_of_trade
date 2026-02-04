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

const data = [
  { name: "Jan 1", minor: 0, major: 0 },
  { name: "Jan 2", minor: 1, major: 0 },
  { name: "Jan 3", minor: 0, major: 0 },
  { name: "Jan 4", minor: 2, major: 1 },
  { name: "Jan 5", minor: 1, major: 0 },
  { name: "Jan 6", minor: 0, major: 0 },
  { name: "Jan 7", minor: 1, major: 0 },
  { name: "Jan 8", minor: 0, major: 0 },
  { name: "Jan 9", minor: 1, major: 0 },
  { name: "Jan 10", minor: 0, major: 0 },
];

export default function ViolationsTimeline() {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-3xl p-6 shadow-sm w-full h-100 mb-6">
      <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-6">
        Violations Timeline
      </h3>
      <div className="h-75 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#e5e7eb"
              className="dark:stroke-gray-700"
            />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 12, fill: "#9ca3af" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 12, fill: "#9ca3af" }}
              axisLine={false}
              tickLine={false}
              domain={[0, 3]}
              ticks={[0, 0.75, 1.5, 2.25, 3]}
            />
            <Tooltip
              cursor={{ fill: "transparent" }}
              contentStyle={{ borderRadius: "12px", border: "none" }}
            />
            <Bar
              dataKey="minor"
              stackId="a"
              fill="#f59e0b"
              radius={[0, 0, 0, 0]}
              barSize={40}
            />
            <Bar
              dataKey="major"
              stackId="a"
              fill="#ef4444"
              radius={[4, 4, 0, 0]}
              barSize={40}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
