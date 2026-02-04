"use client";

const symbolData = [
  { label: "Most traded symbol", value: "RELIANCE" },
  { label: "Most profitable symbol", value: "TCS" },
  { label: "Least profitable symbol", value: "HDFC" },
  { label: "Highest win-rate symbol", value: "INFY" },
  { label: "Lowest win-rate symbol", value: "ICICI" },
];

export default function SymbolFrequency() {
  return (
    <div className="w-full bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-3xl p-6 shadow-sm mb-6">
      <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-6">
        Symbol Frequency
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {symbolData.map((item, index) => (
          <div
            key={index}
            className="bg-gray-50/50 dark:bg-gray-900/40 border border-gray-50 dark:border-gray-800 rounded-xl p-4"
          >
            <p className="text-[10px] font-medium text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-tight">
              {item.label}
            </p>
            <p className="text-lg font-bold text-gray-900 dark:text-gray-100 truncate">
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
