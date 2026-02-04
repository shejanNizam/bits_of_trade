"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis,
} from "recharts";

// Data for Emotion Frequency Bar Chart
const emotionData = [
  { name: "Calm", count: 15 },
  { name: "Confident", count: 12 },
  { name: "Anxious", count: 8 },
  { name: "Excited", count: 6 },
  { name: "Frustrated", count: 3 },
];

// Data for Confidence vs Outcome Scatter Plot
const correlationData = [
  { confidence: 3, outcome: -500 },
  { confidence: 5, outcome: 800 },
  { confidence: 7, outcome: 1200 },
  { confidence: 8, outcome: 1800 },
  { confidence: 6, outcome: 600 },
  { confidence: 9, outcome: 2250 },
  { confidence: 4, outcome: -200 },
  { confidence: 8, outcome: 1600 },
  { confidence: 7, outcome: 1400 },
  { confidence: 5, outcome: 900 },
];

const metrics = [
  { label: "Most common emotional state", value: "Calm" },
  { label: "Confidence vs Outcome correlation", value: "0.78" },
  { label: "Satisfaction vs Outcome correlation", value: "0.82" },
  { label: "Emotional impact on P&L", value: "-₹1,240", isNegative: true },
];

export default function PsychologyReport() {
  return (
    <div className="w-full bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-3xl p-6 shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
          <span className="text-xl">🧠</span>
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            Psychology Report
          </h2>
          <p className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-wide">
            Emotional patterns and their impact on performance
          </p>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-8">
        {/* Emotion Frequency */}
        <div className="space-y-4">
          <h4 className="text-sm font-bold text-gray-700 dark:text-gray-300">
            Emotion Frequency
          </h4>
          <div className="h-62.5 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={emotionData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#f3f4f6"
                  className="dark:stroke-gray-700"
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11, fill: "#9ca3af" }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11, fill: "#9ca3af" }}
                />
                <Tooltip
                  cursor={{ fill: "transparent" }}
                  contentStyle={{
                    borderRadius: "12px",
                    border: "none",
                    background: "#fff",
                    boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
                  }}
                />
                <Bar
                  dataKey="count"
                  fill="#8b5cf6"
                  radius={[4, 4, 0, 0]}
                  barSize={40}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Confidence vs Outcome */}
        <div className="space-y-4">
          <h4 className="text-sm font-bold text-gray-700 dark:text-gray-300">
            Confidence vs Outcome
          </h4>
          <div className="h-62.5 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ left: -20 }}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#f3f4f6"
                  className="dark:stroke-gray-700"
                />
                <XAxis
                  type="number"
                  dataKey="confidence"
                  name="Confidence"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11, fill: "#9ca3af" }}
                  domain={[0, 10]}
                />
                <YAxis
                  type="number"
                  dataKey="outcome"
                  name="Outcome"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11, fill: "#9ca3af" }}
                />
                <ZAxis range={[60, 60]} />
                <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                <Scatter name="Trades" data={correlationData} fill="#14b8a6" />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {metrics.map((metric, i) => (
          <div
            key={i}
            className="bg-gray-50 dark:bg-gray-900/40 p-4 rounded-2xl border border-transparent hover:border-gray-100 dark:hover:border-gray-700 transition-all"
          >
            <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase mb-1">
              {metric.label}
            </p>
            <p
              className={`text-xl font-black ${metric.isNegative ? "text-rose-500" : "text-gray-900 dark:text-gray-100"}`}
            >
              {metric.value}
            </p>
          </div>
        ))}
      </div>

      {/* Insight Footer */}
      <div className="bg-purple-50 dark:bg-purple-950/20 border border-purple-100 dark:border-purple-900/40 rounded-2xl p-4 flex items-center gap-3">
        <span className="text-purple-600 dark:text-purple-400 font-bold text-sm">
          Insight:
        </span>
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
          Trades taken with anxiety show{" "}
          <span className="font-bold text-purple-600 dark:text-purple-400">
            35% lower expectancy
          </span>{" "}
          than calm trades. Consider implementing pre-trade breathing exercises.
        </p>
      </div>
    </div>
  );
}
