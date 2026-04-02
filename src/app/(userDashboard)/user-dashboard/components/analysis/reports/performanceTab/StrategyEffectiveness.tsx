"use client";

interface StrategyEffectivenessProps {
  strategyEffectiveness: Array<{
    strategy: string;
    win_rate: number;
  }>;
}

export default function StrategyEffectiveness({
  strategyEffectiveness,
}: StrategyEffectivenessProps) {
  if (!strategyEffectiveness || strategyEffectiveness.length === 0) return null;

  return (
    <div className="w-full bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-3xl p-6 shadow-sm mt-6">
      <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-6">
        Strategy Effectiveness
      </h3>
      <div className="space-y-4">
        {strategyEffectiveness.map((item, idx) => (
          <div
            key={idx}
            className="flex flex-col sm:flex-row sm:items-center gap-2"
          >
            <span className="w-40 text-sm text-gray-600 dark:text-gray-400 font-medium">
              {item.strategy}
            </span>
            <div className="flex-1 bg-gray-100 dark:bg-gray-700 h-6 rounded-full overflow-hidden relative">
              <div
                className="h-full bg-[#14b8a6] rounded-full flex items-center justify-end px-3 transition-all duration-700"
                style={{ width: `${item.win_rate}%` }}
              >
                <span className="text-[10px] font-bold text-white">
                  {item.win_rate}%
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
