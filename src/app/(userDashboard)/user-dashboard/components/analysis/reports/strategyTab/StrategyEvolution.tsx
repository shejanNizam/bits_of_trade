"use client";

const evolutionData = [
  { name: "Momentum Breakout", trades: 18, winRate: 72, avgReturn: "2.4R" },
  { name: "Reversal Scalp", trades: 12, winRate: 65, avgReturn: "1.8R" },
  { name: "Trend Following", trades: 8, winRate: 75, avgReturn: "3.2R" },
  { name: "News Breakout", trades: 6, winRate: 58, avgReturn: "1.5R" },
];

export default function StrategyEvolution() {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-3xl p-6 shadow-sm w-full mb-6">
      <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-8">
        Strategy Evolution
      </h3>

      <div className="space-y-10">
        {evolutionData.map((item, idx) => (
          <div key={idx} className="relative pt-1">
            <div className="flex mb-2 items-center justify-between">
              <div>
                <span className="text-sm font-bold text-gray-800 dark:text-gray-200">
                  {item.name}
                </span>
                <p className="text-[10px] text-gray-400 dark:text-gray-500 uppercase tracking-wide">
                  {item.trades} trades executed
                </p>
              </div>
              <div className="text-right">
                <span className="text-sm font-bold text-[#14b8a6]">
                  {item.winRate}% Win Rate
                </span>
                <p className="text-[10px] text-gray-400 dark:text-gray-500 uppercase">
                  {item.avgReturn} Avg Return
                </p>
              </div>
            </div>
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded-full bg-gray-100 dark:bg-gray-700/50">
              <div
                style={{ width: `${item.winRate}%` }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-[#14b8a6] rounded-full transition-all duration-1000"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
