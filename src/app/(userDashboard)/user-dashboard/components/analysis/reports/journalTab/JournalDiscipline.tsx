import { FaBrain } from "react-icons/fa";
import {
  IoAlertCircleOutline,
  IoBookOutline,
  IoTrendingUp,
} from "react-icons/io5";

export default function JournalDiscipline() {
  const stats = [
    {
      label: "Journal completion rate",
      value: "88%",
      icon: <IoTrendingUp className="text-green-500" />,
    },
    {
      label: "Current streak",
      value: "7 days",
      icon: <IoTrendingUp className="text-emerald-500" />,
    },
    {
      label: "Longest streak",
      value: "15 days",
      icon: <IoTrendingUp className="text-blue-500" />,
    },
    {
      label: "Missed journaling days",
      value: "3",
      icon: <IoAlertCircleOutline className="text-orange-500" />,
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Main Journal Discipline Card */}
      <div className="w-full p-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm transition-colors">
        {/* Header */}
        <div className="flex items-start gap-4 mb-8">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 border border-blue-100 dark:border-blue-800">
            <IoBookOutline className="text-xl" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              Journal Discipline
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Consistency in journaling and its impact
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-gray-50/50 dark:bg-gray-800/40 border border-transparent hover:border-gray-200 dark:hover:border-gray-700 transition-all"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">{stat.icon}</span>
                <span className="text-[12px] font-medium text-gray-500 dark:text-gray-400 leading-tight">
                  {stat.label}
                </span>
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {stat.value}
              </div>
            </div>
          ))}
        </div>

        {/* Blue Insight Banner */}
        <div className="p-4 rounded-xl bg-blue-50/30 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30">
          <p className="text-sm text-blue-800 dark:text-blue-300 leading-relaxed">
            <span className="font-bold mr-1">Insight:</span>
            Losses increase 1.8× on days without journaling. Maintaining your
            journal discipline is directly correlated with better performance.
          </p>
        </div>
      </div>

      {/* Auto-generated Insight Card */}
      <div className="w-full p-6 bg-indigo-50/20 dark:bg-indigo-900/10 rounded-2xl border border-indigo-100 dark:border-indigo-900/30 transition-colors">
        <div className="flex items-start gap-4">
          <div className="flex items-center justify-center w-11 h-11 rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-200 dark:shadow-none shrink-0">
            <FaBrain className="text-2xl" />
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
              Journal Summary Insight (Auto-generated)
            </h2>
            <div className="space-y-4 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              <p>
                Your journal data reveals a strong correlation between emotional
                state and trading outcomes. Trades executed in a calm, confident
                state show 45% higher returns compared to anxious or frustrated
                states.
              </p>
              <p>
                The most costly mistake pattern is{" "}
                <span className="font-bold text-indigo-700 dark:text-indigo-400">
                  Premature Exit
                </span>
                , accounting for ₹3,200 in losses. This mistake clusters after
                losing trades, suggesting an emotional response rather than a
                strategic decision.
              </p>
              <p>
                Your journaling discipline has been excellent at 88% completion
                rate. Continue this habit as data shows losses increase
                significantly on non-journaled days. Consider implementing a
                pre-trade emotional check-in to reduce anxiety-driven trades.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
