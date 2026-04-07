/* eslint-disable @typescript-eslint/no-unused-vars */
// "use client";

// import {
//   Bar,
//   BarChart,
//   CartesianGrid,
//   ResponsiveContainer,
//   Scatter,
//   ScatterChart,
//   Tooltip,
//   XAxis,
//   YAxis,
//   ZAxis,
// } from "recharts";

// // Data for Emotion Frequency Bar Chart
// const emotionData = [
//   { name: "Calm", count: 15 },
//   { name: "Confident", count: 12 },
//   { name: "Anxious", count: 8 },
//   { name: "Excited", count: 6 },
//   { name: "Frustrated", count: 3 },
// ];

// // Data for Confidence vs Outcome Scatter Plot
// const correlationData = [
//   { confidence: 3, outcome: -500 },
//   { confidence: 5, outcome: 800 },
//   { confidence: 7, outcome: 1200 },
//   { confidence: 8, outcome: 1800 },
//   { confidence: 6, outcome: 600 },
//   { confidence: 9, outcome: 2250 },
//   { confidence: 4, outcome: -200 },
//   { confidence: 8, outcome: 1600 },
//   { confidence: 7, outcome: 1400 },
//   { confidence: 5, outcome: 900 },
// ];

// const metrics = [
//   { label: "Most common emotional state", value: "Calm" },
//   { label: "Confidence vs Outcome correlation", value: "0.78" },
//   { label: "Satisfaction vs Outcome correlation", value: "0.82" },
//   { label: "Emotional impact on P&L", value: "-₹1,240", isNegative: true },
// ];

// export default function PsychologyReport() {
//   return (
//     <div className="w-full bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-3xl p-6 shadow-sm">
//       {/* Header */}
//       <div className="flex items-center gap-4 mb-8">
//         <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
//           <span className="text-xl">🧠</span>
//         </div>
//         <div>
//           <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
//             Psychology Report
//           </h2>
//           <p className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-wide">
//             Emotional patterns and their impact on performance
//           </p>
//         </div>
//       </div>

//       {/* Charts Grid */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-8">
//         {/* Emotion Frequency */}
//         <div className="space-y-4">
//           <h4 className="text-sm font-bold text-gray-700 dark:text-gray-300">
//             Emotion Frequency
//           </h4>
//           <div className="h-62.5 w-full">
//             <ResponsiveContainer width="100%" height="100%">
//               <BarChart data={emotionData}>
//                 <CartesianGrid
//                   strokeDasharray="3 3"
//                   vertical={false}
//                   stroke="#f3f4f6"
//                   className="dark:stroke-gray-700"
//                 />
//                 <XAxis
//                   dataKey="name"
//                   axisLine={false}
//                   tickLine={false}
//                   tick={{ fontSize: 11, fill: "#9ca3af" }}
//                 />
//                 <YAxis
//                   axisLine={false}
//                   tickLine={false}
//                   tick={{ fontSize: 11, fill: "#9ca3af" }}
//                 />
//                 <Tooltip
//                   cursor={{ fill: "transparent" }}
//                   contentStyle={{
//                     borderRadius: "12px",
//                     border: "none",
//                     background: "#fff",
//                     boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
//                   }}
//                 />
//                 <Bar
//                   dataKey="count"
//                   fill="#8b5cf6"
//                   radius={[4, 4, 0, 0]}
//                   barSize={40}
//                 />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>
//         </div>

//         {/* Confidence vs Outcome */}
//         <div className="space-y-4">
//           <h4 className="text-sm font-bold text-gray-700 dark:text-gray-300">
//             Confidence vs Outcome
//           </h4>
//           <div className="h-62.5 w-full">
//             <ResponsiveContainer width="100%" height="100%">
//               <ScatterChart margin={{ left: -20 }}>
//                 <CartesianGrid
//                   strokeDasharray="3 3"
//                   stroke="#f3f4f6"
//                   className="dark:stroke-gray-700"
//                 />
//                 <XAxis
//                   type="number"
//                   dataKey="confidence"
//                   name="Confidence"
//                   axisLine={false}
//                   tickLine={false}
//                   tick={{ fontSize: 11, fill: "#9ca3af" }}
//                   domain={[0, 10]}
//                 />
//                 <YAxis
//                   type="number"
//                   dataKey="outcome"
//                   name="Outcome"
//                   axisLine={false}
//                   tickLine={false}
//                   tick={{ fontSize: 11, fill: "#9ca3af" }}
//                 />
//                 <ZAxis range={[60, 60]} />
//                 <Tooltip cursor={{ strokeDasharray: "3 3" }} />
//                 <Scatter name="Trades" data={correlationData} fill="#14b8a6" />
//               </ScatterChart>
//             </ResponsiveContainer>
//           </div>
//         </div>
//       </div>

//       {/* Metric Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
//         {metrics.map((metric, i) => (
//           <div
//             key={i}
//             className="bg-gray-50 dark:bg-gray-900/40 p-4 rounded-2xl border border-transparent hover:border-gray-100 dark:hover:border-gray-700 transition-all"
//           >
//             <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase mb-1">
//               {metric.label}
//             </p>
//             <p
//               className={`text-xl font-black ${metric.isNegative ? "text-rose-500" : "text-gray-900 dark:text-gray-100"}`}
//             >
//               {metric.value}
//             </p>
//           </div>
//         ))}
//       </div>

//       {/* Insight Footer */}
//       <div className="bg-purple-50 dark:bg-purple-950/20 border border-purple-100 dark:border-purple-900/40 rounded-2xl p-4 flex items-center gap-3">
//         <span className="text-purple-600 dark:text-purple-400 font-bold text-sm">
//           Insight:
//         </span>
//         <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
//           Trades taken with anxiety show{" "}
//           <span className="font-bold text-purple-600 dark:text-purple-400">
//             35% lower expectancy
//           </span>{" "}
//           than calm trades. Consider implementing pre-trade breathing exercises.
//         </p>
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
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis,
} from "recharts";

interface EmotionFrequency {
  emotion: string;
  count: number;
}

interface ConfidenceVsOutcome {
  confidence: number;
  pnl: number;
}

interface PsychologyReportProps {
  psychologyReport?: {
    emotion_frequency: EmotionFrequency[];
    confidence_vs_outcome: ConfidenceVsOutcome[];
    most_common_emotion: string;
    confidence_correlation: number;
    satisfaction_correlation: number;
    emotional_impact_pnl: number;
    avg_confidence: number;
    avg_satisfaction: number;
    psychology_insight: string;
  };
}

export default function PsychologyReport({
  psychologyReport,
}: PsychologyReportProps) {
  if (!psychologyReport) {
    return (
      <div className="w-full bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-3xl p-6 shadow-sm">
        <p className="text-center text-gray-500 dark:text-gray-400">
          No psychology report data available
        </p>
      </div>
    );
  }

  const {
    emotion_frequency,
    confidence_vs_outcome,
    most_common_emotion,
    confidence_correlation,
    satisfaction_correlation,
    emotional_impact_pnl,
    psychology_insight,
  } = psychologyReport;

  // Format emotion data for chart (capitalize first letter)
  const emotionData = emotion_frequency.map((item) => ({
    name: item.emotion.charAt(0).toUpperCase() + item.emotion.slice(1),
    count: item.count,
  }));

  // Format correlation data for scatter plot
  const correlationData = confidence_vs_outcome.map((item) => ({
    confidence: item.confidence,
    outcome: item.pnl,
  }));

  const metrics = [
    {
      label: "Most common emotional state",
      value:
        most_common_emotion?.charAt(0).toUpperCase() +
          most_common_emotion?.slice(1) || "N/A",
    },
    {
      label: "Confidence vs Outcome correlation",
      value: confidence_correlation?.toFixed(2) || "0.00",
    },
    {
      label: "Satisfaction vs Outcome correlation",
      value: satisfaction_correlation?.toFixed(2) || "0.00",
    },
    {
      label: "Emotional impact on P&L",
      value: `₹${Math.abs(emotional_impact_pnl || 0).toLocaleString()}`,
      isNegative: (emotional_impact_pnl || 0) < 0,
    },
  ];

  // Extract insight text from the API response
  // const getInsightText = () => {
  //   if (psychology_insight) {
  //     return psychology_insight;
  //   }
  //   return "No insight available for psychology patterns.";
  // };

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
      {/* <div className="bg-purple-50 dark:bg-purple-950/20 border border-purple-100 dark:border-purple-900/40 rounded-2xl p-4 flex items-start gap-3">
        <span className="text-purple-600 dark:text-purple-400 font-bold text-sm shrink-0">
          Insight:
        </span>
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
          {getInsightText()}
        </p>
      </div> */}
    </div>
  );
}
