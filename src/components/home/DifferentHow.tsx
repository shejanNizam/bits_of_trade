import CustomHeading from "@/components/shared/CustomHeading";

interface ComparisonRow {
  area: string;
  traditional: string;
  bitsOfTrade: string;
}

export default function DifferentHow() {
  const comparisonData: ComparisonRow[] = [
    {
      area: "Core Purpose",
      traditional: "Analyze performance after trades",
      bitsOfTrade: "Prevent behavioral mistakes before they repeat",
    },
    {
      area: "Primary Focus",
      traditional: "Trades & P&L",
      bitsOfTrade: "Behavior & discipline",
    },
    {
      area: "Incentive Design",
      traditional: "Encourages more logging and activity",
      bitsOfTrade: "Designed to reduce unnecessary trades",
    },
    {
      area: "Discipline Handling",
      traditional: "Manual, optional, post-trade",
      bitsOfTrade: "System-driven, pattern-based",
    },
    {
      area: "Overtrading Control",
      traditional: "Observed after damage",
      bitsOfTrade: "Detected early through behavior signals",
    },
    {
      area: "Rule Enforcement",
      traditional: "User-defined, passive",
      bitsOfTrade: "Actively monitored with alerts & reflections",
    },
    {
      area: "Loss Streaks",
      traditional: "Shown in reports",
      bitsOfTrade: "Interpreted as behavioral risk",
    },
    {
      area: "Winning Days",
      traditional: "Highlighted as success",
      bitsOfTrade: "Analyzed for rule drift",
    },
    {
      area: "Journaling Style",
      traditional: "Trade-centric",
      bitsOfTrade: "Context & decision-centric",
    },
    {
      area: "Learning Content",
      traditional: "Strategy-heavy",
      bitsOfTrade: "Risk & discipline-first",
    },
    {
      area: "Signals / Tips",
      traditional: "Often implied or adjacent",
      bitsOfTrade: "Explicitly not provided",
    },
    {
      area: "Outcome Philosophy",
      traditional: "Improve strategy performance",
      bitsOfTrade: "Improve longevity & decision quality",
    },
  ];

  return (
    <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12">
          <CustomHeading>How BitsOfTrade is different</CustomHeading>
          <p className="text-gray-600 dark:text-gray-400 transition-colors">
            Most platforms optimize for activity. BitsOfTrade optimizes for
            discipline and capital protection.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 transition-colors">
          {/* Table Header */}
          <div className="grid grid-cols-3 bg-linear-to-r from-purple-50 to-blue-50 dark:from-purple-950/30 dark:to-blue-950/30 border-b border-gray-200 dark:border-gray-700 transition-colors">
            <div className="p-4 md:p-6 font-semibold text-gray-900 dark:text-white border-r border-gray-200 dark:border-gray-700 transition-colors">
              Area
            </div>
            <div className="p-4 md:p-6 font-semibold text-gray-900 dark:text-white border-r border-gray-200 dark:border-gray-700 transition-colors">
              Traditional Trading Journals
            </div>
            <div className="p-4 md:p-6 font-semibold text-purple-700 dark:text-purple-400 transition-colors">
              BitsOfTrade
            </div>
          </div>

          {/* Table Rows */}
          {comparisonData.map((row, index) => (
            <div
              key={index}
              className={`grid grid-cols-3 ${
                index !== comparisonData.length - 1
                  ? "border-b border-gray-200 dark:border-gray-700"
                  : ""
              } hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all`}
            >
              <div className="p-4 md:p-6 font-semibold text-gray-900 dark:text-white border-r border-gray-200 dark:border-gray-700 transition-colors">
                {row.area}
              </div>
              <div className="p-4 md:p-6 text-sm text-gray-600 dark:text-gray-400 border-r border-gray-200 dark:border-gray-700 transition-colors">
                {row.traditional}
              </div>
              <div className="p-4 md:p-6 text-sm font-medium text-gray-900 dark:text-white transition-colors">
                {row.bitsOfTrade}
              </div>
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400 max-w-4xl mx-auto transition-colors">
            BitsOfTrade does not replace execution platforms or brokers. It
            complements them by focusing on discipline and behavior.
          </p>
        </div>
      </div>
    </section>
  );
}
