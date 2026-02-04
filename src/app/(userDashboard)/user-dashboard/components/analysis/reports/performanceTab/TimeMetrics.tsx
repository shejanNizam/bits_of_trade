"use client";

import React from "react";

const timeData = [
  { label: "Trading Days", value: "10" },
  { label: "Consecutive Win Days", value: "5" },
  { label: "Consecutive Loss Days", value: "2" },
  { label: "Most Profitable Day", value: "Jan 10" },
  { label: "Least Profitable Day", value: "Jan 4" },
];

export default function TimeMetrics() {
  return (
    <div className="w-full bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-3xl p-6 shadow-sm">
      <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-6">
        Time Metrics
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {timeData.map((item, index) => (
          <div
            key={index}
            className="bg-gray-50/50 dark:bg-gray-900/40 border border-gray-50 dark:border-gray-800 rounded-xl p-4 transition-colors"
          >
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-tight">
              {item.label}
            </p>
            <p className="text-xl font-bold text-gray-900 dark:text-gray-100">
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
