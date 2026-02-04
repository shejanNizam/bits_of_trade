import { HiOutlineLightBulb } from "react-icons/hi";

export function FixesForNext() {
  const fixes = [
    {
      id: 1,
      title: "Stop trading after 2 consecutive losses",
      desc: "You currently FOMO if you encounter trades below 2PM vs 100mks, a mandatory cooldown trades 67% or purple.",
      btn: "Create Rule",
      color: "bg-teal-600",
    },
    {
      id: 2,
      title: "Mandatory 3-minute pause before any re-entry",
      desc: "New tool based timeout. 70-3 seconds on re-analyzes has a correlation has a rational 91% better safe ratio.",
      btn: "Create Rule",
      color: "bg-teal-600",
    },
    {
      id: 3,
      title: "Use forced timeouts after loss calendar",
      desc: "4 hour session is processed preventing risky emotions, live-trade-log risk mitigation by 97%.",
      btn: "Schedule named",
      color: "bg-[#8B5CF6]",
    },
  ];

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-6 text-amber-400">
        <HiOutlineLightBulb size={24} />
        <h2 className="font-bold text-lg text-slate-900 dark:text-white">
          Your Top 3 Fixes for the Next 7 Days
        </h2>
      </div>

      <div className="space-y-4">
        {fixes.map((fix) => (
          <div
            key={fix.id}
            className="bg-purple-50/30 dark:bg-purple-900/5 border border-purple-100 dark:border-purple-900/10 rounded-2xl p-5 hover:border-purple-300 transition-colors"
          >
            <div className="flex flex-col md:flex-row gap-5">
              <div className="h-10 w-10 shrink-0 bg-[#8B5CF6] text-white rounded-xl flex items-center justify-center font-bold text-lg shadow-lg shadow-purple-500/20">
                {fix.id}
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-sm mb-1">{fix.title}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 leading-relaxed">
                  {fix.desc}
                </p>
                <button
                  className={`${fix.color} text-white px-5 py-2 rounded-xl text-[11px] font-bold shadow-sm active:scale-95 transition-all`}
                >
                  {fix.btn}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
