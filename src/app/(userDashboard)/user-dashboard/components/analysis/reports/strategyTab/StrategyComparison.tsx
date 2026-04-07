/* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import {
//   Bar,
//   BarChart,
//   CartesianGrid,
//   Legend,
//   PolarAngleAxis,
//   PolarGrid,
//   Radar,
//   RadarChart,
//   ResponsiveContainer,
//   Tooltip,
//   XAxis,
//   YAxis,
// } from "recharts";

// const performanceData = [
//   { name: "Win Rate", S1: 72, S2: 65, S3: 75, S4: 58 },
//   { name: "Avg Return", S1: 2.4, S2: 1.8, S3: 3.2, S4: 1.5 },
//   { name: "Consistency", S1: 85, S2: 70, S3: 90, S4: 60 },
//   { name: "Risk-Reward", S1: 80, S2: 75, S3: 95, S4: 65 },
//   { name: "Execution", S1: 88, S2: 82, S3: 78, S4: 70 },
// ];

// const radarData = [
//   { subject: "Win Rate", A: 72, B: 65, fullMark: 100 },
//   { subject: "Avg Return", A: 24, B: 18, fullMark: 100 },
//   { subject: "Consistency", A: 85, B: 70, fullMark: 100 },
//   { subject: "Risk-Reward", A: 80, B: 75, fullMark: 100 },
//   { subject: "Execution", A: 88, B: 82, fullMark: 100 },
// ];

// export default function StrategyComparison() {
//   return (
//     <div className="w-full bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-3xl p-6 shadow-sm">
//       <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-8">
//         Strategy Comparison
//       </h3>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
//         {/* Left: Grouped Bar Chart */}
//         <div className="space-y-4">
//           <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-4">
//             Performance Metrics
//           </p>
//           <div className="h-87.5 w-full">
//             <ResponsiveContainer width="100%" height="100%">
//               <BarChart data={performanceData} margin={{ left: -20 }}>
//                 <CartesianGrid
//                   strokeDasharray="3 3"
//                   vertical={false}
//                   stroke="#e5e7eb"
//                   className="dark:stroke-gray-700"
//                 />
//                 <XAxis
//                   dataKey="name"
//                   tick={{ fontSize: 11, fill: "#9ca3af" }}
//                   axisLine={false}
//                   tickLine={false}
//                 />
//                 <YAxis
//                   tick={{ fontSize: 11, fill: "#9ca3af" }}
//                   axisLine={false}
//                   tickLine={false}
//                   domain={[0, 100]}
//                 />
//                 <Tooltip
//                   cursor={{ fill: "transparent" }}
//                   contentStyle={{
//                     borderRadius: "12px",
//                     border: "none",
//                     boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
//                   }}
//                 />
//                 <Bar
//                   dataKey="S1"
//                   fill="#14b8a6"
//                   radius={[2, 2, 0, 0]}
//                   barSize={12}
//                 />
//                 <Bar
//                   dataKey="S2"
//                   fill="#a855f7"
//                   radius={[2, 2, 0, 0]}
//                   barSize={12}
//                 />
//                 <Bar
//                   dataKey="S3"
//                   fill="#3b82f6"
//                   radius={[2, 2, 0, 0]}
//                   barSize={12}
//                 />
//                 <Bar
//                   dataKey="S4"
//                   fill="#f59e0b"
//                   radius={[2, 2, 0, 0]}
//                   barSize={12}
//                 />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>
//         </div>

//         {/* Right: Multi-dimensional Radar View */}
//         <div className="space-y-4">
//           <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-4">
//             Multi-dimensional View
//           </p>
//           <div className="h-87.5 w-full flex justify-center">
//             <ResponsiveContainer width="100%" height="100%">
//               <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
//                 <PolarGrid stroke="#e5e7eb" className="dark:stroke-gray-700" />
//                 <PolarAngleAxis
//                   dataKey="subject"
//                   tick={{ fontSize: 10, fill: "#6b7280" }}
//                 />
//                 <Radar
//                   name="Strategy 1"
//                   dataKey="A"
//                   stroke="#14b8a6"
//                   fill="#14b8a6"
//                   fillOpacity={0.4}
//                 />
//                 <Radar
//                   name="Strategy 2"
//                   dataKey="B"
//                   stroke="#3b82f6"
//                   fill="#3b82f6"
//                   fillOpacity={0.4}
//                 />
//                 <Legend
//                   iconType="circle"
//                   wrapperStyle={{ fontSize: "12px", paddingTop: "20px" }}
//                 />
//               </RadarChart>
//             </ResponsiveContainer>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface ComparisonMetric {
  metrics: string[];
  metric_keys: string[];
  series: Array<{
    strategy_name: string;
    strategy_id: string;
    scores: {
      win_rate: number;
      avg_return: number;
      consistency: number;
      risk_reward: number;
      execution: number;
    };
  }>;
}

interface RadarMetric {
  metric: string;
  [key: string]: string | number;
}

interface StrategyComparisonProps {
  comparison?: ComparisonMetric;
  radar?: RadarMetric[];
}

const COLORS = ["#14b8a6", "#a855f7", "#3b82f6", "#f59e0b"];

export default function StrategyComparison({
  comparison,
  radar,
}: StrategyComparisonProps) {
  if (!comparison || !radar || comparison.series.length === 0) {
    return (
      <div className="w-full bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-3xl p-6 shadow-sm">
        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-8">
          Strategy Comparison
        </h3>
        <p className="text-center text-gray-500 dark:text-gray-400">
          No comparison data available
        </p>
      </div>
    );
  }

  // Get unique strategies for bar chart
  const uniqueStrategies = comparison.series.reduce(
    (acc, curr) => {
      if (!acc.find((s) => s.strategy_id === curr.strategy_id)) {
        acc.push(curr);
      }
      return acc;
    },
    [] as typeof comparison.series,
  );

  // Prepare bar chart data
  const barChartData = comparison.metrics.map((metric, index) => {
    const dataPoint: any = { name: metric };
    uniqueStrategies.forEach((strategy, idx) => {
      const score =
        strategy.scores[
          comparison.metric_keys[index] as keyof typeof strategy.scores
        ];
      dataPoint[`S${idx + 1}`] = score;
    });
    return dataPoint;
  });

  // Prepare radar chart data
  const radarChartData = radar.map((metric) => ({
    subject: metric.metric,
    ...Object.keys(metric)
      .filter((key) => key !== "metric")
      .reduce((acc, key) => ({ ...acc, [key]: metric[key] }), {}),
  }));

  return (
    <div className="w-full bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-3xl p-6 shadow-sm">
      <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-8">
        Strategy Comparison
      </h3>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left: Grouped Bar Chart */}
        <div className="space-y-4">
          <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-4">
            Performance Metrics
          </p>
          <div className="h-87.5 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barChartData} margin={{ left: -20 }}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#e5e7eb"
                  className="dark:stroke-gray-700"
                />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 11, fill: "#9ca3af" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: "#9ca3af" }}
                  axisLine={false}
                  tickLine={false}
                  domain={[0, 100]}
                />
                <Tooltip
                  cursor={{ fill: "transparent" }}
                  contentStyle={{
                    borderRadius: "12px",
                    border: "none",
                    boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
                  }}
                />
                {uniqueStrategies.map((strategy, idx) => (
                  <Bar
                    key={strategy.strategy_id}
                    dataKey={`S${idx + 1}`}
                    fill={COLORS[idx % COLORS.length]}
                    radius={[2, 2, 0, 0]}
                    barSize={12}
                    name={strategy.strategy_name}
                  />
                ))}
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right: Multi-dimensional Radar View */}
        <div className="space-y-4">
          <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-4">
            Multi-dimensional View
          </p>
          <div className="h-87.5 w-full flex justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart
                cx="50%"
                cy="50%"
                outerRadius="80%"
                data={radarChartData}
              >
                <PolarGrid stroke="#e5e7eb" className="dark:stroke-gray-700" />
                <PolarAngleAxis
                  dataKey="subject"
                  tick={{ fontSize: 10, fill: "#6b7280" }}
                />
                {uniqueStrategies.map((strategy, idx) => (
                  <Radar
                    key={strategy.strategy_id}
                    name={strategy.strategy_name}
                    dataKey={strategy.strategy_name}
                    stroke={COLORS[idx % COLORS.length]}
                    fill={COLORS[idx % COLORS.length]}
                    fillOpacity={0.4}
                  />
                ))}
                <Legend
                  iconType="circle"
                  wrapperStyle={{ fontSize: "12px", paddingTop: "20px" }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
