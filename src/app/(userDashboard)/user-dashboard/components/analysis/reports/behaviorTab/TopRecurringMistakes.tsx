"use client";

import { InfoCircleOutlined } from "@ant-design/icons";

interface Mistake {
  name: string;
  occurrences: number;
  loss_percent: number;
}

interface TopRecurringMistakesProps {
  topRecurringMistakes: Mistake[];
  behaviorInsight: string;
}

export default function TopRecurringMistakes({
  topRecurringMistakes,
  behaviorInsight,
}: TopRecurringMistakesProps) {
  // Filter out mistakes with 0 occurrences
  const activeMistakes = topRecurringMistakes.filter(
    (mistake) => mistake.occurrences > 0,
  );

  return (
    <div className="space-y-6 mb-6">
      <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-3xl p-6 shadow-sm">
        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-6">
          Top Recurring Mistakes
        </h3>

        {activeMistakes.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No mistakes recorded. Great job maintaining discipline!
          </div>
        ) : (
          <div className="space-y-4">
            {activeMistakes.map((mistake, idx) => (
              <div
                key={idx}
                className="flex justify-between items-center p-4 bg-gray-50/50 dark:bg-gray-900/30 rounded-2xl border border-transparent hover:border-gray-100 dark:hover:border-gray-700 transition-colors"
              >
                <div>
                  <p className="text-sm font-bold text-gray-800 dark:text-gray-200">
                    {mistake.name}
                  </p>
                  <p className="text-[10px] text-gray-400 dark:text-gray-500 uppercase">
                    {mistake.occurrences} occurrence
                    {mistake.occurrences !== 1 ? "s" : ""}
                  </p>
                </div>
                <div className="text-right">
                  <p
                    className={`text-xl font-black ${
                      mistake.loss_percent > 0
                        ? "text-rose-500"
                        : "text-gray-300 dark:text-gray-600"
                    }`}
                  >
                    {mistake.loss_percent}%
                  </p>
                  <p className="text-[10px] text-gray-400 dark:text-gray-500 uppercase tracking-tighter">
                    of total losses
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Auto-generated Insight Banner */}
      {behaviorInsight && (
        <div className="bg-purple-50 dark:bg-purple-950/20 border border-purple-100 dark:border-purple-900/40 rounded-2xl p-4 flex gap-4 items-start">
          <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center shrink-0">
            <InfoCircleOutlined className="text-white text-lg" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-gray-900 dark:text-gray-100">
              Behavior Insight (Auto-generated)
            </h4>
            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed mt-1">
              {behaviorInsight}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
