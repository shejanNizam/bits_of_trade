import { FaBrain } from "react-icons/fa";
import { FiActivity, FiCpu, FiZap } from "react-icons/fi";

const categories = [
  {
    title: "Discipline & Behaviour",
    count: "1 Metric",
    sub: "DIS, DRT, VMI",
    icon: FaBrain,
    color: "text-purple-600 bg-purple-100",
  },
  {
    title: "Session & Control",
    count: "3 Metrics",
    sub: "SMA, STM, CR",
    icon: FiZap,
    color: "text-blue-600 bg-blue-100",
  },
  {
    title: "Psychology + Performance",
    count: "3 Metrics",
    sub: "ECI, FLE, PRC",
    icon: FiActivity,
    color: "text-pink-600 bg-pink-100",
  },
  {
    title: "System Intelligence",
    count: "3 Metrics",
    sub: "SMI, STM, QR",
    icon: FiCpu,
    color: "text-emerald-600 bg-emerald-100",
  },
];

export default function InsightsOverview() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full mx-auto">
      {categories.map((cat, i) => (
        <div
          key={i}
          className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-6 rounded-3xl flex flex-col gap-3 shadow-sm"
        >
          <div
            className={`${cat.color} dark:bg-opacity-20 p-2 rounded-xl w-fit`}
          >
            <cat.icon size={20} />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 leading-tight">
              {cat.title}
            </p>
            <h4 className="text-xl font-bold text-slate-900 dark:text-white my-1">
              {cat.count}
            </h4>
            <p className="text-[10px] text-slate-400 uppercase tracking-widest">
              {cat.sub}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
