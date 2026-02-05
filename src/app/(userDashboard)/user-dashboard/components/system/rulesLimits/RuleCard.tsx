import { FiEdit3, FiTrash2 } from "react-icons/fi";

// Define the shape of the stats object
export interface RuleStats {
  [key: string]: string | number;
}

// RuleCard.tsx
export interface RuleCardProps {
  title: string;
  type: "Hard" | "Soft";
  category: string;
  desc: string;
  stats: RuleStats;
  // Add these two:
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function RuleCard({
  title,
  type,
  category,
  desc,
  stats,
  onEdit,
  onDelete,
}: RuleCardProps) {
  return (
    <div className="bg-white dark:bg-primary/10 border border-slate-200 dark:border-zinc-800 rounded-2xl p-5 shadow-sm transition-all hover:border-slate-300 dark:hover:border-zinc-700">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          {/* Status Indicator Dot */}
          <div className="w-2.5 h-2.5 rounded-full bg-blue-600 shadow-[0_0_8px_rgba(37,99,235,0.6)]" />

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-bold text-lg text-slate-900 dark:text-white leading-tight">
                {title}
              </h3>
              <div className="flex gap-1.5">
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                    type === "Hard"
                      ? "bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400"
                      : "bg-yellow-50 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400"
                  }`}
                >
                  {type}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider bg-slate-100 dark:bg-zinc-800 text-slate-500 dark:text-zinc-400">
                  {category}
                </span>
              </div>
            </div>
            <p className="text-sm text-slate-500 dark:text-zinc-400 mt-1">
              {desc}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-1 text-slate-400">
          <button
            onClick={onEdit} // Trigger edit
            className="p-2 hover:bg-slate-100 dark:hover:bg-zinc-800 rounded-lg"
          >
            <FiEdit3 size={18} />
          </button>
          <button
            onClick={onDelete} // Trigger delete
            className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
          >
            <FiTrash2 size={18} className="hover:text-red-500" />
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="bg-slate-50 dark:bg-zinc-800/40 rounded-xl p-4 grid grid-cols-1 sm:grid-cols-2 gap-4 border border-transparent dark:border-zinc-800/50">
        {Object.entries(stats).map(([label, value]) => (
          <div key={label}>
            <p className="text-[10px] uppercase font-bold text-slate-400 dark:text-zinc-500 tracking-widest mb-1">
              {label}
            </p>
            <p className="font-mono text-sm font-semibold text-slate-700 dark:text-zinc-200">
              {value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
