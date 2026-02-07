export default function LearningImpactOnPerformance() {
  const stats = [
    {
      label: "Win rate improved after courses",
      value: "+18.5%",
      icon: "🎯",
      color: "text-emerald-500",
    },
    {
      label: "Mistakes reduced with training",
      value: "-42%",
      icon: "⚠️",
      color: "text-blue-500",
    },
    {
      label: "Better discipline scores",
      value: "3.2x",
      icon: "✅",
      color: "text-purple-500",
    },
  ];

  return (
    <section className="rounded-2xl border border-slate-200 bg-slate-50/50 p-8 dark:border-slate-800 dark:bg-slate-900/50">
      <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-10">
        Learning Impact on Performance
      </h2>

      <div className="flex flex-col md:flex-row justify-around items-center gap-12 text-center">
        {stats.map((stat, i) => (
          <div key={i} className="max-w-50">
            <div className="mb-2 text-3xl">{stat.icon}</div>
            <div className={`text-4xl font-black mb-2 ${stat.color}`}>
              {stat.value}
            </div>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
