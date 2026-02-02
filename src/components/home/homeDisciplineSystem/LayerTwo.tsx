import { BsCheckCircle, BsInfoCircle, BsShieldLock } from "react-icons/bs";

export default function LayerTwo() {
  const outcomeMetrics = [
    "Net P&L",
    "Win Rate",
    "Drawdown",
    "Expectancy",
    "Average Win / Loss",
  ];

  const disciplineMetrics = [
    "Discipline Score",
    "Rule Adherence Rate",
    "Session Integrity",
    "Mistake Density",
    "Overtrading Index",
    "Control-to-Outcome Ratio",
  ];

  return (
    <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="container mx-auto max-w-7xl">
        {/* Metrics Framework Section */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 md:p-10 shadow-sm border border-gray-100 dark:border-gray-700 transition-colors">
          {/* Framework Header */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white transition-colors">
                The BitsOfTrade Metrics Framework
              </h3>
              <BsShieldLock className="w-5 h-5 text-gray-400 dark:text-gray-500" />
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-2 transition-colors">
              Most platforms measure results. BitsOfTrade measures permission.
            </p>
            <p className="text-gray-700 dark:text-gray-300 transition-colors">
              Our metrics are designed to answer a different question:{" "}
              <span className="font-semibold bg-yellow-100 dark:bg-yellow-900/30 px-2 py-1 rounded transition-colors">
                Should this trade have been allowed?
              </span>
            </p>
          </div>

          {/* Metrics Grid */}
          <div className="grid md:grid-cols-2 gap-8 relative">
            {/* Outcome Metrics */}
            <div className="flex flex-col">
              {/* ✅ Added flex flex-col */}
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-base font-bold text-gray-900 dark:text-white transition-colors">
                  Outcome Metrics
                </h4>
                <span className="text-xs bg-gray-200 dark:bg-gray-700 px-3 py-1.5 rounded-md text-gray-600 dark:text-gray-400 transition-colors">
                  Industry Standard
                </span>
              </div>
              <ul className="space-y-3 mb-6">
                {outcomeMetrics.map((metric, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-3 text-gray-500 dark:text-gray-400 transition-colors"
                  >
                    <BsCheckCircle className="w-4 h-4 shrink-0 text-gray-400 dark:text-gray-500 transition-colors" />
                    <span className="text-sm">{metric}</span>
                  </li>
                ))}
              </ul>
              <div className="flex items-start gap-2 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600 transition-colors mt-auto">
                <BsInfoCircle className="w-4 h-4 text-gray-400 dark:text-gray-500 shrink-0 mt-0.5 transition-colors" />
                <p className="text-xs text-gray-500 dark:text-gray-400 transition-colors">
                  Useful for review. Never for permission.
                </p>
              </div>
            </div>

            {/* Discipline Metrics */}
            <div className="flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-base font-bold text-gray-900 dark:text-white transition-colors">
                  Discipline Metrics
                </h4>
                <span className="text-xs bg-emerald-100 dark:bg-emerald-900/30 px-3 py-1.5 rounded-md text-emerald-700 dark:text-emerald-400 font-semibold transition-colors">
                  BitsOfTrade Exclusive
                </span>
              </div>
              <ul className="space-y-3 mb-6">
                {disciplineMetrics.map((metric, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-3 text-gray-700 dark:text-gray-300 transition-colors"
                  >
                    <BsCheckCircle className="w-4 h-4 text-emerald-500 dark:text-emerald-400 shrink-0 transition-colors" />
                    <span className="text-sm">{metric}</span>
                  </li>
                ))}
              </ul>
              <div className="flex items-start gap-2 p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg border border-emerald-100 dark:border-emerald-900/30 transition-colors mt-auto">
                {/* ✅ Added mt-auto */}
                <BsShieldLock className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5 transition-colors" />
                <p className="text-xs text-emerald-700 dark:text-emerald-300 transition-colors">
                  Used to monitor and control trading behavior.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Warning */}
        <div className="bg-[#0F172A] dark:bg-gray-950 rounded-2xl p-6 md:p-8 mt-8 text-center transition-colors">
          <p className="text-gray-400 dark:text-gray-500 text-sm mb-2 transition-colors">
            These metrics are not cosmetic. They actively determine warnings,
            restrictions, and session locks.
          </p>
          <p className="text-white dark:text-gray-200 font-semibold transition-colors">
            {
              "BitsOfTrade doesn't help you trade more. It helps you stop at the"
            }
            right time.
          </p>
        </div>
      </div>
    </section>
  );
}
