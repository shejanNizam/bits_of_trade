interface ReviewRequirement {
  id: number;
  text: string;
}

export default function AfterBreach() {
  const reviewRequirements: ReviewRequirement[] = [
    { id: 1, text: "Automatic summary of breached limits" },
    { id: 2, text: "Short reflection on what changed during the session" },
    { id: 3, text: "Explicit acknowledgement of deviation" },
  ];

  return (
    <div className="py-8">
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:scale-[1.01]">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-4 transition-colors">
          What happens after a breach
        </h2>

        <p className="text-gray-700 dark:text-gray-300 mb-6 transition-colors">
          When a session exceeds critical limits, the system requires a
          structured review before proceeding.
        </p>

        <h3 className="text-base font-bold text-gray-900 dark:text-white mb-4 transition-colors">
          Review requirements:
        </h3>

        <div className="space-y-3 mb-6">
          {reviewRequirements.map((requirement) => (
            <div
              key={requirement.id}
              className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 hover:bg-gray-100 dark:hover:bg-gray-700 hover:scale-[1.02] transition-all duration-300 cursor-pointer"
            >
              <div className="flex items-start gap-3">
                <span className="text-gray-400 dark:text-gray-500 mt-1 shrink-0 transition-colors">
                  •
                </span>
                <p className="text-sm text-gray-700 dark:text-gray-300 transition-colors">
                  {requirement.text}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-2">
          <p className="text-xs text-gray-500 dark:text-gray-400 italic transition-colors">
            This review must be completed before the next session can continue.
          </p>
          <p className="text-sm text-rose-600 dark:text-rose-400 font-semibold transition-colors hover:scale-[1.01] inline-block">
            Trading is treated as a privilege earned through process, not
            impulse.
          </p>
        </div>
      </div>
    </div>
  );
}
