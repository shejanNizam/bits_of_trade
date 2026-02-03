export default function RecentEntries() {
  const entries = [
    {
      date: "2025-01-07",
      text: "Felt pressure during the second trade when NIFTY started moving against me.",
      tags: ["TR0001", "TR0002"],
      color: "orange",
    },
    {
      date: "2025-01-06",
      text: "Followed my plan perfectly. Waited for all confirmations.",
      tags: ["TR0003"],
      color: "green",
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 sm:p-6">
      <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
        Recent Entries
      </h3>

      <div className="space-y-4">
        {entries.map((entry, index) => (
          <div
            key={index}
            className="border-l-4 pl-3"
            style={{
              borderColor: entry.color === "orange" ? "#f59e0b" : "#10b981",
            }}
          >
            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">
              {entry.date}
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
              {entry.text}
            </p>
            <div className="flex flex-wrap gap-2">
              {entry.tags.map((tag, tagIndex) => (
                <span
                  key={tagIndex}
                  className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <p className="text-xs text-gray-500 dark:text-gray-400 text-center italic mt-6">
        Our journal {"doesn't"} store thoughts. It trains behavior.
      </p>
    </div>
  );
}
