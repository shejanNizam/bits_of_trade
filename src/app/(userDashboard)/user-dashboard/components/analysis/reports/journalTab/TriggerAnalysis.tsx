import { clsx, type ClassValue } from "clsx";
import { GoZap } from "react-icons/go";
import { twMerge } from "tailwind-merge";

// Utility for cleaner class merging
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Data Configuration ---
// Percent represents the visual width of the bar in the image
const triggers = [
  {
    id: 1,
    name: "Money pressure",
    trades: 4,
    pnl: -425,
    type: "negative",
    barWidth: 40,
  },
  {
    id: 2,
    name: "Time pressure",
    trades: 6,
    pnl: -280,
    type: "negative",
    barWidth: 25,
  },
  {
    id: 3,
    name: "Missed move",
    trades: 8,
    pnl: -350,
    type: "negative",
    barWidth: 35,
  },
  {
    id: 4,
    name: "Losing streak",
    trades: 3,
    pnl: -680,
    type: "negative",
    barWidth: 65,
  },
  {
    id: 5,
    name: "Winning streak",
    trades: 5,
    pnl: 820,
    type: "positive",
    barWidth: 75,
  },
];

export default function TriggerAnalysis() {
  return (
    <div className="w-full p-4 md:p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 transition-colors duration-200">
      {/* --- Header --- */}
      <div className="flex items-start gap-4 mb-6">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-500">
          <GoZap className="w-6 h-6 fill-current" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Trigger Analysis
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Understanding what triggers poor decisions
          </p>
        </div>
      </div>

      {/* --- List of Triggers --- */}
      <div className="space-y-4">
        {triggers.map((item) => (
          <TriggerCard key={item.id} data={item} />
        ))}
      </div>
    </div>
  );
}

// Sub-component for individual rows
function TriggerCard({ data }: { data: (typeof triggers)[0] }) {
  const isPositive = data.type === "positive";
  const barColor = isPositive ? "bg-green-500" : "bg-red-500";
  const textColor = isPositive
    ? "text-green-600 dark:text-green-400"
    : "text-red-600 dark:text-red-400";
  const formattedPnL = `₹${data.pnl > 0 ? "+" : ""}${data.pnl.toLocaleString()}`;

  return (
    <div className="p-4 rounded-xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-800/40 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
      {/* Top Row: Title & Stats */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        {/* Left: Icon & Name */}
        <div className="flex items-center gap-3">
          <GoZap className="w-5 h-5 text-yellow-500 fill-yellow-500/20" />
          <span className="font-semibold text-gray-900 dark:text-gray-100">
            {data.name}
          </span>
        </div>

        {/* Right: Stats (Trades & P&L) */}
        <div className="flex items-center justify-between sm:justify-end gap-6 sm:gap-8 w-full sm:w-auto">
          <div className="text-right">
            <span className="block text-xs text-gray-500 dark:text-gray-400 mb-0.5">
              Trades
            </span>
            <span className="font-bold text-gray-900 dark:text-gray-100">
              {data.trades}
            </span>
          </div>
          <div className="text-right min-w-20">
            <span className="block text-xs text-gray-500 dark:text-gray-400 mb-0.5">
              Avg P&L
            </span>
            <span className={cn("font-bold", textColor)}>{formattedPnL}</span>
          </div>
        </div>
      </div>

      {/* Bottom Row: Progress Bar */}
      <div className="w-full h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
        <div
          className={cn(
            "h-full rounded-full transition-all duration-500 ease-out",
            barColor,
          )}
          style={{ width: `${data.barWidth}%` }}
        />
      </div>
    </div>
  );
}
