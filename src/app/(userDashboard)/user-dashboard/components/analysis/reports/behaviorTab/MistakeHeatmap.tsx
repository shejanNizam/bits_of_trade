"use client";

interface MistakeOccurrences {
  [date: string]: number;
}

interface MistakeData {
  mistake_type: string;
  occurrences: MistakeOccurrences;
}

interface MistakeHeatmapProps {
  mistakeHeatmap: MistakeData[];
}

export default function MistakeHeatmap({
  mistakeHeatmap,
}: MistakeHeatmapProps) {
  // Extract all unique dates from all mistakes
  const allDates = new Set<string>();
  mistakeHeatmap.forEach((mistake) => {
    Object.keys(mistake.occurrences).forEach((date) => {
      allDates.add(date);
    });
  });

  // Sort dates chronologically
  const sortedDates = Array.from(allDates).sort((a, b) => {
    const dateA = new Date(a);
    const dateB = new Date(b);
    return dateA.getTime() - dateB.getTime();
  });

  // Prepare heatmap data: 0 = none, 1 = minor (1-2 occurrences), 2 = major (3+ occurrences)
  const getSeverity = (occurrences: number): number => {
    if (occurrences >= 3) return 2;
    if (occurrences >= 1) return 1;
    return 0;
  };

  // Create a map for quick lookup
  const heatmapDataMap = new Map();
  mistakeHeatmap.forEach((mistake) => {
    const severityMap = new Map();
    Object.entries(mistake.occurrences).forEach(([date, count]) => {
      severityMap.set(date, getSeverity(count));
    });
    heatmapDataMap.set(mistake.mistake_type, severityMap);
  });

  const mistakeTypes = mistakeHeatmap.map((m) => m.mistake_type);

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-3xl p-6 shadow-sm w-full overflow-hidden">
      <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-6">
        Mistake Heatmap
      </h3>

      {mistakeTypes.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No mistake data available
        </div>
      ) : (
        <div className="overflow-x-auto">
          <div className="min-w-150">
            {/* Header Row */}
            <div className="grid grid-cols-[180px_repeat(auto-fit,minmax(80px,1fr))] mb-4">
              <span className="text-xs font-medium text-gray-400">
                Mistake Type
              </span>
              {sortedDates.map((date) => (
                <span
                  key={date}
                  className="text-xs font-medium text-gray-400 text-center"
                >
                  {date}
                </span>
              ))}
            </div>

            {/* Data Rows */}
            <div className="space-y-3">
              {mistakeTypes.map((type) => {
                const severityMap = heatmapDataMap.get(type) || new Map();
                return (
                  <div
                    key={type}
                    className="grid grid-cols-[180px_repeat(auto-fit,minmax(80px,1fr))] items-center"
                  >
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      {type}
                    </span>
                    {sortedDates.map((date) => {
                      const severity = severityMap.get(date) || 0;
                      return (
                        <div key={date} className="flex justify-center">
                          <div
                            className={`w-8 h-8 rounded-lg transition-colors ${
                              severity === 2
                                ? "bg-rose-500"
                                : severity === 1
                                  ? "bg-amber-300"
                                  : "bg-gray-100 dark:bg-gray-700/50"
                            }`}
                            title={`${type}: ${severity === 2 ? "Multiple" : severity === 1 ? "Single" : "No"} occurrence${severity === 1 ? "" : "s"}`}
                          />
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
