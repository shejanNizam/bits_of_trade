"use client";

import {
  ExclamationCircleOutlined,
  InfoCircleOutlined,
  WarningOutlined,
} from "@ant-design/icons";

const recommendations = [
  {
    strategy: "Momentum Breakout",
    text: "Continue deploying with full position size. Strategy is mature and performing well.",
    priority: "High",
    theme: "rose",
    icon: <ExclamationCircleOutlined />,
  },
  {
    strategy: "Trend Following",
    text: "Increase sample size to 20+ trades before scaling position sizes.",
    priority: "Medium",
    theme: "amber",
    icon: <WarningOutlined />,
  },
  {
    strategy: "News Breakout",
    text: "Reduce position size by 50% until win rate improves above 65%.",
    priority: "High",
    theme: "rose",
    icon: <ExclamationCircleOutlined />,
  },
  {
    strategy: "Reversal Scalp",
    text: "Backtest on different market conditions. Consider tightening entry criteria.",
    priority: "Low",
    theme: "blue",
    icon: <InfoCircleOutlined />,
  },
];

const themeMap = {
  rose: "border-rose-500 bg-rose-50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-400",
  amber:
    "border-amber-500 bg-amber-50 dark:bg-amber-950/20 text-amber-600 dark:text-amber-400",
  blue: "border-blue-500 bg-blue-50 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400",
};

const badgeMap = {
  rose: "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300",
  amber: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
  blue: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
};

export default function Recommendations() {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-3xl p-6 shadow-sm w-full">
      <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-6">
        Recommendations
      </h3>

      <div className="space-y-4">
        {recommendations.map((rec, idx) => (
          <div
            key={idx}
            className={`flex items-start gap-4 p-4 border-l-4 rounded-r-2xl transition-all ${themeMap[rec.theme as keyof typeof themeMap]}`}
          >
            <div className="mt-0.5 text-lg shrink-0">{rec.icon}</div>

            <div className="grow">
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold text-sm text-gray-900 dark:text-gray-100">
                  {rec.strategy}
                </span>
                <span
                  className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md ${badgeMap[rec.theme as keyof typeof badgeMap]}`}
                >
                  {rec.priority}
                </span>
              </div>
              <p className="text-xs opacity-90 leading-relaxed text-gray-700 dark:text-gray-300">
                {rec.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
