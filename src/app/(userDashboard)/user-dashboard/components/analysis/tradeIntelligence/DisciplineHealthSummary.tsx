import { FiActivity } from "react-icons/fi";

export function DisciplineHealthSummary() {
  const stats = [
    {
      label: "Discipline Score",
      value: "76.5",
      color:
        "text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10 border-emerald-100 dark:border-emerald-500/20",
    },
    {
      label: "Violated Boundaries",
      value: "24",
      color:
        "text-amber-500 bg-amber-50 dark:bg-amber-500/10 border-amber-100 dark:border-amber-500/20",
    },
    {
      label: "Sessions Post",
      value: "3.2",
      color:
        "text-blue-500 bg-blue-50 dark:bg-blue-500/10 border-blue-100 dark:border-blue-500/20",
    },
    {
      label: "Health Rating",
      value: "Improving but fragile",
      color:
        "text-purple-500 bg-purple-50 dark:bg-purple-500/10 border-purple-100 dark:border-purple-500/20",
      small: true,
    },
  ];

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-6">
        <FiActivity className="text-indigo-500" size={20} />
        <h2 className="font-bold text-lg">Discipline Health Summary</h2>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
        {stats.map((stat, i) => (
          <div
            key={i}
            className={`p-6 rounded-2xl border text-center transition-transform hover:scale-[1.02] ${stat.color}`}
          >
            <div
              className={`font-black ${stat.small ? "text-sm" : "text-4xl"} mb-1`}
            >
              {stat.value}
            </div>
            <div className="text-[10px] uppercase font-bold opacity-80 tracking-widest">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-emerald-50/50 dark:bg-emerald-500/5 border border-emerald-100 dark:border-emerald-500/20 rounded-xl p-4 text-center">
        <p className="text-xs text-slate-600 dark:text-emerald-400/80 leading-relaxed">
          <span className="font-bold text-emerald-600">Remember:</span> Your
          discipline is improving, but fragile. One uncommitted session could
          trigger a cascade. Focus on the 3sec timer.
        </p>
      </div>
    </div>
  );
}
