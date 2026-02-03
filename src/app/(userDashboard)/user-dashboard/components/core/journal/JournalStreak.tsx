export default function JournalStreak() {
  // This data will come from backend later
  const streak = 12;
  const thisMonth = [
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    false,
    true,
    true,
    true,
    true,
    true,
    false,
    false,
    true,
    true,
    true,
    true,
    true,
    false,
    true,
    true,
    true,
    true,
    true,
    true,
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 sm:p-6">
      <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
        Journal Streak
      </h3>
      <div className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-1">
        {streak}
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        Consecutive days
      </p>

      {/* Calendar Grid */}
      <div>
        <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">
          This Month
        </p>
        <div className="grid grid-cols-7 gap-2">
          {thisMonth.map((hasEntry, index) => (
            <div
              key={index}
              className={`aspect-square rounded ${
                hasEntry
                  ? "bg-green-500 dark:bg-green-400"
                  : "bg-gray-200 dark:bg-gray-700"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
