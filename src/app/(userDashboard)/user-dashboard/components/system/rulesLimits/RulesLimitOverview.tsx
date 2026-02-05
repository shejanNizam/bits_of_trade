export default function RulesLimitOverview() {
  const stats = [
    {
      label: "Active Rules",
      value: "7",
      subtext: "Out of 7 total rules",
      color: "text-slate-900 dark:text-white",
    },
    {
      label: "Hard Rules",
      value: "3",
      subtext: "Cannot be overridden",
      color: "text-red-600 dark:text-red-500",
    },
    {
      label: "Soft Rules",
      value: "4",
      subtext: "Warning only",
      color: "text-amber-500 dark:text-amber-400",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white dark:bg-primary/10 border border-slate-200 dark:border-zinc-800 p-6 rounded-2xl shadow-sm"
          >
            <p className="text-sm font-medium text-slate-500 dark:text-zinc-400 mb-1">
              {stat.label}
            </p>
            <h3 className={`text-4xl font-bold mb-2 ${stat.color}`}>
              {stat.value}
            </h3>
            <p className="text-xs text-slate-400 dark:text-zinc-500">
              {stat.subtext}
            </p>
          </div>
        ))}
      </div>

      {/* Explanation Section */}
      <div className="bg-white dark:bg-primary/10 border border-slate-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-6">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Rule Type Explanation
          </h3>
        </div>

        <div className="space-y-4">
          {/* Hard Rules Box */}
          <div className="bg-red-50/50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/20 rounded-xl p-4 flex flex-col sm:flex-row gap-4">
            <div className="shrink-0">
              <span className="bg-red-600 text-white text-[10px] font-bold px-3 py-1 rounded-md uppercase tracking-wider">
                Hard
              </span>
            </div>
            <div>
              <h4 className="font-bold text-red-900 dark:text-red-400 text-sm mb-1">
                Hard Rules = Hard Stops
              </h4>
              <p className="text-red-700/80 dark:text-red-300/70 text-sm leading-relaxed">
                These fully block trading or specific actions when triggered. No
                override, this is your red line of defense.
              </p>
            </div>
          </div>

          {/* Soft Rules Box */}
          <div className="bg-amber-50/50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/20 rounded-xl p-4 flex flex-col sm:flex-row gap-4">
            <div className="shrink-0">
              <span className="bg-amber-500 text-white text-[10px] font-bold px-3 py-1 rounded-md uppercase tracking-wider">
                Soft
              </span>
            </div>
            <div>
              <h4 className="font-bold text-amber-900 dark:text-amber-400 text-sm mb-1">
                Soft Rules = Guardrails
              </h4>
              <p className="text-amber-700/80 dark:text-amber-300/70 text-sm leading-relaxed">
                These warn you and require acknowledgment like Quick Check. You
                can proceed, but {"you're"} aware.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
