import React from "react";
import { FaCopy, FaEye } from "react-icons/fa";
import { FiEdit3, FiShare2, FiTrash2 } from "react-icons/fi";

interface StrategyStats {
  "Win Rate": string;
  Trades: string | number;
  "Total P&L": string;
  "Avg Return": string;
}

interface StrategyCardProps {
  title: string;
  status: "Mature" | "Developing" | "Testing";
  stats: StrategyStats;
  tags: string[];
  segment: string;
  progress: number;
  color: string;
}

const StrategyCard: React.FC<StrategyCardProps> = ({
  title,
  status,
  stats,
  tags,
  segment,
  progress,
  color,
}) => {
  return (
    <div className="bg-white dark:bg-primary/10 rounded-2xl border border-slate-200 dark:border-zinc-800 p-5 flex flex-col gap-4 shadow-sm hover:shadow-md transition-all duration-300">
      {/* Header Area */}
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className="font-bold text-lg text-slate-900 dark:text-white leading-tight">
            {title}
          </h3>
          <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1 line-clamp-2">
            Trade breakouts above key resistance with volume confirmation
          </p>
        </div>
        <span
          className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
            status === "Mature"
              ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
              : status === "Developing"
                ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
          }`}
        >
          {status}
        </span>
      </div>

      {/* Grid Stats */}
      <div className="grid grid-cols-4 gap-2 py-3 border-y border-slate-100 dark:border-zinc-800">
        {(Object.entries(stats) as [keyof StrategyStats, string][]).map(
          ([label, value]) => (
            <div key={label}>
              <p className="text-[10px] text-slate-400 uppercase font-medium">
                {label}
              </p>
              <p
                className={`text-sm font-bold truncate ${
                  label === "Total P&L" && value.includes("+")
                    ? "text-emerald-500"
                    : label === "Total P&L" && value.includes("-")
                      ? "text-red-500"
                      : "text-slate-700 dark:text-zinc-200"
                }`}
              >
                {value}
              </p>
            </div>
          ),
        )}
      </div>

      {/* R:R and Drawdown Box */}
      <div className="bg-slate-50 dark:bg-zinc-800/40 p-3 rounded-xl grid grid-cols-3 gap-2 border border-slate-100 dark:border-zinc-800/50">
        <div>
          <p className="text-[10px] text-slate-400">Risk:Reward</p>
          <p className="text-xs font-bold text-slate-700 dark:text-white">
            1:2
          </p>
        </div>
        <div>
          <p className="text-[10px] text-slate-400">Max DD</p>
          <p className="text-xs font-bold text-red-500">-₹1,000</p>
        </div>
        <div>
          <p className="text-[10px] text-slate-400">Profit Factor</p>
          <p className="text-xs font-bold text-slate-700 dark:text-white">
            1.5
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div>
        <div className="flex justify-between text-[10px] mb-1.5 font-medium">
          <span className="text-slate-500">Sample Size Progress</span>
          <span className="text-slate-700 dark:text-zinc-300">{progress}%</span>
        </div>
        <div className="w-full bg-slate-100 dark:bg-zinc-800 rounded-full h-2 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${color}`}
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5">
        {tags.map((tag) => (
          <span
            key={tag}
            className="text-[10px] bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 px-2 py-0.5 rounded font-semibold border border-purple-100 dark:border-purple-800/30"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Footer Actions */}
      <div className="flex justify-between items-center pt-3 mt-auto border-t border-slate-100 dark:border-zinc-800">
        <div className="flex gap-2">
          <span className="px-2 py-1 bg-slate-900 text-white text-[10px] font-bold rounded dark:bg-zinc-700">
            {segment}
          </span>
          <span className="px-2 py-1 bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400 text-[10px] font-bold rounded">
            Intraday
          </span>
        </div>
        <div className="flex gap-3.5 text-slate-400 dark:text-zinc-500">
          <FaEye
            size={15}
            className="cursor-pointer hover:text-blue-500 transition-colors"
          />
          <FiEdit3
            size={15}
            className="cursor-pointer hover:text-blue-500 transition-colors"
          />
          <FaCopy
            size={15}
            className="cursor-pointer hover:text-blue-500 transition-colors"
          />
          <FiShare2
            size={15}
            className="cursor-pointer hover:text-blue-500 transition-colors"
          />
          <FiTrash2
            size={15}
            className="cursor-pointer hover:text-red-500 transition-colors"
          />
        </div>
      </div>
    </div>
  );
};

export default StrategyCard;
