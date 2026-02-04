"use client";

import { AlertOutlined } from "@ant-design/icons";

const exposureMetrics = [
  {
    label: "Value at Risk (VaR 95%)",
    sub: "Maximum expected loss at 95% confidence",
    value: "₹4,500",
  },
  { label: "Sharpe Ratio", sub: "Risk-adjusted return measure", value: "1.85" },
  {
    label: "Sortino Ratio",
    sub: "Downside risk-adjusted return",
    value: "2.12",
  },
  {
    label: "Maximum Risk per Trade",
    sub: "Highest percentage risked on single trade",
    value: "1.5%",
  },
  {
    label: "Average Risk per Trade",
    sub: "Average percentage risked per trade",
    value: "0.8%",
  },
];

export default function RiskExposureAnalysis() {
  return (
    <div className="space-y-6">
      <div className="w-full bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-3xl p-6 shadow-sm">
        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-6">
          Risk Exposure Analysis
        </h3>

        <div className="divide-y divide-gray-50 dark:divide-gray-700/50">
          {exposureMetrics.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center py-5 first:pt-0 last:pb-0"
            >
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                  {item.label}
                </span>
                <span className="text-[11px] text-gray-400 dark:text-gray-500">
                  {item.sub}
                </span>
              </div>
              <span className="text-base font-bold text-gray-900 dark:text-gray-100">
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Risk Alert Banner */}
      <div className="bg-rose-50 dark:bg-rose-950/30 border border-rose-100 dark:border-rose-900/50 rounded-2xl p-4 flex gap-4 items-start">
        <AlertOutlined className="text-rose-500 mt-1" />
        <div>
          <h4 className="text-sm font-bold text-rose-600 dark:text-rose-400">
            Risk Alert
          </h4>
          <p className="text-xs text-rose-500/80 dark:text-rose-400/70 leading-relaxed">
            Your maximum drawdown is approaching the recommended threshold of
            6%. Consider reducing position sizes or taking a break to review
            your strategy.
          </p>
        </div>
      </div>
    </div>
  );
}
