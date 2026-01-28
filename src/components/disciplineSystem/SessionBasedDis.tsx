interface Boundary {
  id: number;
  text: string;
}

export default function SessionBasedDis() {
  const sessionBoundaries: Boundary[] = [
    { id: 1, text: "Maximum trades per session" },
    { id: 2, text: "Maximum session loss" },
    { id: 3, text: "Consecutive loss limits" },
    { id: 4, text: "Session time window" },
  ];

  return (
    <div className="py-8">
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:scale-[1.01]">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-4 transition-colors">
          Session-based discipline
        </h2>

        <p className="text-gray-700 dark:text-gray-300 mb-6 transition-colors">
          Every trading session in BitsOfTrade operates with predefined
          boundaries.
        </p>

        <h3 className="text-base font-bold text-gray-900 dark:text-white mb-4 transition-colors">
          Session boundaries include:
        </h3>

        <div className="space-y-3 mb-6">
          {sessionBoundaries.map((boundary) => (
            <div
              key={boundary.id}
              className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 hover:bg-gray-100 dark:hover:bg-gray-700 hover:scale-[1.02] transition-all duration-300 cursor-pointer"
            >
              <div className="flex items-start gap-3">
                <span className="text-gray-400 dark:text-gray-500 mt-1 shrink-0 transition-colors">
                  •
                </span>
                <p className="text-sm text-gray-700 dark:text-gray-300 transition-colors">
                  {boundary.text}
                </p>
              </div>
            </div>
          ))}
        </div>

        <p className="text-xs text-gray-500 dark:text-gray-400 italic transition-colors">
          These boundaries define when trading should slow down or stop for
          review.
        </p>
      </div>
    </div>
  );
}
