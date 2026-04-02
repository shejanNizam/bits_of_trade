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

interface NetDailyPLProps {
  netDailyPnl: Array<{ date: string; pnl: number }>;
}

export default function NetDailyPL({ netDailyPnl }: NetDailyPLProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const data = netDailyPnl.map((item) => ({
    name: item.date,
    pnl: item.pnl,
  }));

  const maxPnl = Math.max(...data.map((d) => Math.abs(d.pnl)), 1000);
  const domain = [-maxPnl * 1.1, maxPnl * 1.1];

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
            data={data}
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
              interval={Math.floor(data.length / 10)}
            />
            <YAxis
              axisLine={true}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#9ca3af" }}
              domain={domain}
              tickFormatter={(value) => formatCurrency(value)}
              dx={-10}
            />
            <Tooltip
              formatter={(value: number | undefined) => [
                formatCurrency(value ?? 0),
                "P&L",
              ]}
              cursor={{ fill: "transparent" }}
              contentStyle={{
                borderRadius: "12px",
                border: "none",
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
              }}
            />
            <Bar dataKey="pnl" radius={[4, 4, 0, 0]}>
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.pnl >= 0 ? "#14b8a6" : "#ef4444"}
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
