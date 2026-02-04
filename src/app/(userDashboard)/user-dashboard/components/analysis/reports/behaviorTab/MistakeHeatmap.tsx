"use client";

const mistakes = [
  "Premature Exit",
  "Overtrading",
  "FOMO Entry",
  "Missed Stop Loss",
  "Revenge Trading",
];
const days = [
  "Jan 1",
  "Jan 2",
  "Jan 3",
  "Jan 4",
  "Jan 5",
  "Jan 6",
  "Jan 7",
  "Jan 8",
  "Jan 9",
  "Jan 10",
];

// Mock data: 0 = none, 1 = minor (yellow), 2 = major (red)
const heatmapData: Record<string, number[]> = {
  "Premature Exit": [0, 1, 0, 2, 0, 0, 1, 0, 0, 0],
  Overtrading: [0, 0, 0, 1, 1, 0, 0, 0, 1, 0],
  "FOMO Entry": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  "Missed Stop Loss": [0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
  "Revenge Trading": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
};

export default function MistakeHeatmap() {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-3xl p-6 shadow-sm w-full overflow-hidden">
      <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-6">
        Mistake Heatmap
      </h3>

      <div className="overflow-x-auto">
        <div className="min-w-200">
          {/* Header Row */}
          <div className="grid grid-cols-[180px_repeat(10,1fr)] mb-4">
            <span className="text-xs font-medium text-gray-400">
              Mistake Type
            </span>
            {days.map((day) => (
              <span
                key={day}
                className="text-xs font-medium text-gray-400 text-center"
              >
                {day}
              </span>
            ))}
          </div>

          {/* Data Rows */}
          <div className="space-y-3">
            {mistakes.map((type) => (
              <div
                key={type}
                className="grid grid-cols-[180px_repeat(10,1fr)] items-center"
              >
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  {type}
                </span>
                {heatmapData[type].map((val, idx) => (
                  <div key={idx} className="flex justify-center">
                    <div
                      className={`w-8 h-8 rounded-lg transition-colors ${
                        val === 2
                          ? "bg-rose-500"
                          : val === 1
                            ? "bg-amber-300"
                            : "bg-gray-100 dark:bg-gray-700/50"
                      }`}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
