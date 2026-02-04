"use client";

const capitalData = [
  { label: "Maximum capital used", value: "₹2,50,000" },
  { label: "Minimum capital used", value: "₹25,000" },
  { label: "Average capital used", value: "₹1,25,000" },
  { label: "P&L at max capital", value: "₹3,250" },
  { label: "P&L at min capital", value: "₹850" },
];

export default function CapitalUsage() {
  return (
    <div className="w-full bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-3xl p-6 shadow-sm mb-6">
      <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-6">
        Capital Usage
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {capitalData.map((item, index) => (
          <div
            key={index}
            className="bg-gray-50/50 dark:bg-gray-900/40 border border-gray-50 dark:border-gray-800 rounded-xl p-4"
          >
            <p className="text-[10px] font-medium text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-tight">
              {item.label}
            </p>
            <p className="text-lg font-bold text-gray-900 dark:text-gray-100">
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
