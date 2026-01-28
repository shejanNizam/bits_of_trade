import { BsInfoCircle } from "react-icons/bs";

interface Signal {
  id: number;
  text: string;
}

export default function LayerOneDis() {
  const leftColumnSignals: Signal[] = [
    { id: 1, text: "Trade frequency acceleration" },
    { id: 2, text: "Session duration extension beyond plan" },
    { id: 3, text: "Rule overrides after profitable streaks" },
  ];

  const rightColumnSignals: Signal[] = [
    { id: 4, text: "Consecutive loss continuation" },
    { id: 5, text: "Rapid re-entries after losses" },
  ];

  return (
    <div className="py-8">
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:scale-[1.01]">
        <div className="flex items-center gap-3 mb-6">
          <BsInfoCircle className="w-6 h-6 text-blue-600 dark:text-blue-400 shrink-0 transition-colors" />
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white transition-colors">
            Layer 1 — Behavior Observation
          </h2>
        </div>

        <p className="text-gray-700 dark:text-gray-300 mb-6 transition-colors">
          BitsOfTrade does not evaluate what you trade. It evaluates how your
          behavior changes during a session.
        </p>

        <h3 className="text-base font-bold text-gray-900 dark:text-white mb-4 transition-colors">
          Observed signals:
        </h3>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          {/* Left Column */}
          <div className="space-y-4">
            {leftColumnSignals.map((signal) => (
              <div
                key={signal.id}
                className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 hover:bg-gray-100 dark:hover:bg-gray-700 hover:scale-[1.02] transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-start gap-3">
                  <span className="text-gray-400 dark:text-gray-500 mt-1 shrink-0 transition-colors">
                    •
                  </span>
                  <p className="text-sm text-gray-700 dark:text-gray-300 transition-colors">
                    {signal.text}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            {rightColumnSignals.map((signal) => (
              <div
                key={signal.id}
                className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 hover:bg-gray-100 dark:hover:bg-gray-700 hover:scale-[1.02] transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-start gap-3">
                  <span className="text-gray-400 dark:text-gray-500 mt-1 shrink-0 transition-colors">
                    •
                  </span>
                  <p className="text-sm text-gray-700 dark:text-gray-300 transition-colors">
                    {signal.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="text-xs text-gray-500 dark:text-gray-400 italic transition-colors">
          These signals are behavioral — not predictive.
        </p>
      </div>
    </div>
  );
}
