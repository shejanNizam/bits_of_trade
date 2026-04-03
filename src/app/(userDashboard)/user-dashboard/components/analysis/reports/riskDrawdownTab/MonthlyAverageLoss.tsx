/* eslint-disable @typescript-eslint/no-unused-vars */
// "use client";

// import {
//   Bar,
//   BarChart,
//   CartesianGrid,
//   ResponsiveContainer,
//   Tooltip,
//   XAxis,
//   YAxis,
// } from "recharts";

// const lossData = [
//   { month: "Oct", loss: -1200 },
//   { month: "Nov", loss: -850 },
//   { month: "Dec", loss: -1450 },
//   { month: "Jan", loss: -980 },
// ];

// export default function MonthlyAverageLoss() {
//   return (
//     <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-3xl p-6 shadow-sm h-100">
//       <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-6">
//         Monthly Average Loss
//       </h3>
//       <div className="h-75 w-full">
//         <ResponsiveContainer width="100%" height="100%">
//           <BarChart data={lossData} layout="vertical" margin={{ left: 20 }}>
//             <CartesianGrid
//               strokeDasharray="3 3"
//               horizontal={false}
//               stroke="#e5e7eb"
//               className="dark:stroke-gray-700"
//             />
//             <XAxis
//               type="number"
//               tick={{ fontSize: 12, fill: "#9ca3af" }}
//               axisLine={false}
//               tickLine={false}
//               domain={[-1600, -800]}
//             />
//             <YAxis
//               dataKey="month"
//               type="category"
//               tick={{ fontSize: 12, fill: "#9ca3af" }}
//               axisLine={false}
//               tickLine={false}
//             />
//             <Tooltip cursor={{ fill: "transparent" }} />
//             <Bar
//               dataKey="loss"
//               fill="#ef4444"
//               radius={[0, 4, 4, 0]}
//               barSize={40}
//             />
//           </BarChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// }

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

interface MonthlyAverageLossProps {
  monthlyLossData: Array<{
    month: string;
    loss: number;
  }>;
}

export default function MonthlyAverageLoss({
  monthlyLossData,
}: MonthlyAverageLossProps) {
  // Format the data for the chart (loss values are negative)
  const chartData = monthlyLossData.map((item) => ({
    month: item.month,
    loss: Math.abs(item.loss), // Convert to positive for better display
    originalLoss: item.loss,
  }));

  const maxLoss = Math.max(...chartData.map((d) => d.loss), 0);
  const minLoss = Math.min(...chartData.map((d) => d.loss), 0);

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-3xl p-6 shadow-sm h-100">
      <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-6">
        Monthly Average Loss
      </h3>
      <div className="h-75 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} layout="vertical" margin={{ left: 20 }}>
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
              domain={[0, maxLoss]}
              tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}k`}
              label={{
                value: "Loss Amount (₹)",
                position: "bottom",
                style: { fontSize: "12px", fill: "#9ca3af" },
              }}
            />
            <YAxis
              dataKey="month"
              type="category"
              tick={{ fontSize: 12, fill: "#9ca3af" }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              cursor={{ fill: "transparent" }}
              formatter={(value) => {
                if (value === undefined || value === null) return "";
                return `₹${(value as number).toLocaleString("en-IN")}`;
              }}
              labelFormatter={(label) => `Month: ${label}`}
            />
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
