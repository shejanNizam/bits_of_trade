"use client";

interface RuleAdherenceProps {
  ruleAdherence: {
    "Risk Management"?: number;
    "Entry Rules"?: number;
    "Exit Rules"?: number;
    "Position Sizing"?: number;
    "Time Management"?: number;
  };
}

export default function RuleAdherenceByCategory({
  ruleAdherence,
}: RuleAdherenceProps) {
  const adherenceData = [
    {
      category: "Risk Management",
      score: ruleAdherence["Risk Management"] || 0,
    },
    { category: "Entry Rules", score: ruleAdherence["Entry Rules"] || 0 },
    { category: "Exit Rules", score: ruleAdherence["Exit Rules"] || 0 },
    {
      category: "Position Sizing",
      score: ruleAdherence["Position Sizing"] || 0,
    },
    {
      category: "Time Management",
      score: ruleAdherence["Time Management"] || 0,
    },
  ];

  return (
    <div className="w-full bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-3xl p-6 shadow-sm">
      <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-6">
        Rule Adherence by Category
      </h3>

      <div className="space-y-6">
        {adherenceData.map((item, idx) => (
          <div key={idx} className="space-y-2">
            <div className="flex justify-between items-center px-1">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {item.category}
              </span>
              <span className="text-xs font-bold text-[#14b8a6]">
                {item.score}%
              </span>
            </div>
            <div className="w-full bg-gray-100 dark:bg-gray-700/50 h-2.5 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#14b8a6] rounded-full transition-all duration-1000 ease-out shadow-[0_0_8px_rgba(20,184,166,0.2)]"
                style={{ width: `${item.score}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
