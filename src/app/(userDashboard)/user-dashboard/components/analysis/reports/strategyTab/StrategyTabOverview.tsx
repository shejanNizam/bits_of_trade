// "use client";

// import { LineChartOutlined } from "@ant-design/icons";

// const strategyData = [
//   {
//     name: "Momentum Breakout",
//     market: "Indian Stocks",
//     type: "Intraday",
//     status: "Mature",
//     statusColor:
//       "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
//     winRate: 72,
//     avgReturn: "2.4R",
//     totalTrades: 18,
//     maturity: 90,
//     barColor: "bg-emerald-500",
//   },
//   {
//     name: "Reversal Scalp",
//     market: "Indian Stocks",
//     type: "Scalping",
//     status: "Developing",
//     statusColor:
//       "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
//     winRate: 65,
//     avgReturn: "1.8R",
//     totalTrades: 12,
//     maturity: 60,
//     barColor: "bg-amber-500",
//   },
//   {
//     name: "Trend Following",
//     market: "Forex",
//     type: "Swing",
//     status: "Developing",
//     statusColor:
//       "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
//     winRate: 75,
//     avgReturn: "3.2R",
//     totalTrades: 8,
//     maturity: 40,
//     barColor: "bg-orange-500",
//   },
//   {
//     name: "News Breakout",
//     market: "Indian Stocks",
//     type: "Intraday",
//     status: "Developing",
//     statusColor:
//       "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
//     winRate: 58,
//     avgReturn: "1.5R",
//     totalTrades: 6,
//     maturity: 30,
//     barColor: "bg-orange-600",
//   },
// ];

// export default function StrategyTabOverview() {
//   return (
//     <div className="w-full space-y-6">
//       {/* Strategy Performance Grid */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         {strategyData.map((strategy, index) => (
//           <div
//             key={index}
//             className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-3xl p-6 shadow-sm"
//           >
//             <div className="flex justify-between items-start mb-6">
//               <div>
//                 <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 leading-tight">
//                   {strategy.name}
//                 </h3>
//                 <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
//                   {strategy.market} • {strategy.type}
//                 </p>
//               </div>
//               <span
//                 className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${strategy.statusColor}`}
//               >
//                 {strategy.status}
//               </span>
//             </div>

//             <div className="grid grid-cols-3 gap-4 mb-8">
//               <div>
//                 <p className="text-[10px] text-gray-400 dark:text-gray-500 uppercase font-bold mb-1">
//                   Win Rate
//                 </p>
//                 <p className="text-2xl font-black text-[#14b8a6]">
//                   {strategy.winRate}%
//                 </p>
//               </div>
//               <div>
//                 <p className="text-[10px] text-gray-400 dark:text-gray-500 uppercase font-bold mb-1">
//                   Avg Return
//                 </p>
//                 <p className="text-2xl font-black text-gray-900 dark:text-gray-100">
//                   {strategy.avgReturn}
//                 </p>
//               </div>
//               <div>
//                 <p className="text-[10px] text-gray-400 dark:text-gray-500 uppercase font-bold mb-1">
//                   Total Trades
//                 </p>
//                 <p className="text-2xl font-black text-gray-900 dark:text-gray-100">
//                   {strategy.totalTrades}
//                 </p>
//               </div>
//             </div>

//             <div className="space-y-2">
//               <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-tight">
//                 <span className="text-gray-400 dark:text-gray-500">
//                   Sample Size Maturity
//                 </span>
//                 <span className="text-gray-900 dark:text-gray-100">
//                   {strategy.maturity}%
//                 </span>
//               </div>
//               <div className="w-full bg-gray-100 dark:bg-gray-700/50 h-1.5 rounded-full overflow-hidden">
//                 <div
//                   className={`h-full rounded-full transition-all duration-1000 ${strategy.barColor}`}
//                   style={{ width: `${strategy.maturity}%` }}
//                 />
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Auto-generated Insight Banner */}
//       <div className="bg-[#f0fdfa] dark:bg-teal-950/20 border border-[#ccfbf1] dark:border-teal-900/40 rounded-3xl p-6 flex gap-5 items-start">
//         <div className="w-10 h-10 rounded-full bg-[#14b8a6] flex items-center justify-center shrink-0">
//           <LineChartOutlined className="text-white text-xl" />
//         </div>
//         <div>
//           <h4 className="text-base font-bold text-gray-900 dark:text-gray-100">
//             Strategy Insights (Auto-generated)
//           </h4>
//           <ul className="mt-3 space-y-2">
//             {[
//               "Momentum Breakout performs best when sample size > 30 trades and volatility is elevated.",
//               "Trend Following shows highest consistency but requires larger position sizes to maximize returns.",
//               "News Breakout strategy is still developing - recommend 20 more trades before full deployment.",
//             ].map((insight, i) => (
//               <li
//                 key={i}
//                 className="flex gap-2 text-sm text-gray-600 dark:text-gray-400 leading-relaxed"
//               >
//                 <span className="text-[#14b8a6] font-bold">•</span> {insight}
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { LineChartOutlined } from "@ant-design/icons";

interface Strategy {
  strategy_id: string;
  strategy_name: string;
  market_types: string[];
  trade_type: string;
  maturity_status: string;
  total_trades: number;
  closed_trades: number;
  win_rate: number;
  avg_return: number;
  total_pnl: number;
  profit_factor: number;
  risk_reward_ratio: string;
  max_drawdown: number;
  max_drawdown_pct: number;
  sample_size_progress: number;
}

interface StrategyTabOverviewProps {
  strategies: Strategy[];
}

const getStatusColor = (status: string) => {
  switch (status?.toLowerCase()) {
    case "mature":
      return "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400";
    case "developing":
      return "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400";
    case "testing":
      return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
    default:
      return "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400";
  }
};

const getBarColor = (winRate: number) => {
  if (winRate >= 60) return "bg-emerald-500";
  if (winRate >= 40) return "bg-amber-500";
  return "bg-red-500";
};

// Remove duplicates by strategy_id
const getUniqueStrategies = (strategies: Strategy[]) => {
  const uniqueMap = new Map();
  strategies.forEach((strategy) => {
    if (!uniqueMap.has(strategy.strategy_id)) {
      uniqueMap.set(strategy.strategy_id, strategy);
    }
  });
  return Array.from(uniqueMap.values());
};

export default function StrategyTabOverview({
  strategies,
}: StrategyTabOverviewProps) {
  const uniqueStrategies = getUniqueStrategies(strategies);

  if (uniqueStrategies.length === 0) {
    return (
      <div className="w-full bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-3xl p-6 shadow-sm">
        <p className="text-center text-gray-500 dark:text-gray-400">
          No strategy data available
        </p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      {/* Strategy Performance Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {uniqueStrategies.map((strategy) => (
          <div
            key={strategy.strategy_id}
            className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-3xl p-6 shadow-sm"
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 leading-tight">
                  {strategy.strategy_name}
                </h3>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                  {strategy.market_types?.join(", ") || "N/A"} •{" "}
                  {strategy.trade_type || "N/A"}
                </p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${getStatusColor(strategy.maturity_status)}`}
              >
                {strategy.maturity_status || "Unknown"}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-8">
              <div>
                <p className="text-[10px] text-gray-400 dark:text-gray-500 uppercase font-bold mb-1">
                  Win Rate
                </p>
                <p className="text-2xl font-black text-[#14b8a6]">
                  {strategy.win_rate?.toFixed(1) || 0}%
                </p>
              </div>
              <div>
                <p className="text-[10px] text-gray-400 dark:text-gray-500 uppercase font-bold mb-1">
                  Avg Return
                </p>
                <p className="text-2xl font-black text-gray-900 dark:text-gray-100">
                  ₹{Math.abs(strategy.avg_return || 0).toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-[10px] text-gray-400 dark:text-gray-500 uppercase font-bold mb-1">
                  Total Trades
                </p>
                <p className="text-2xl font-black text-gray-900 dark:text-gray-100">
                  {strategy.total_trades || 0}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-tight">
                <span className="text-gray-400 dark:text-gray-500">
                  Sample Size Maturity
                </span>
                <span className="text-gray-900 dark:text-gray-100">
                  {strategy.sample_size_progress?.toFixed(1) || 0}%
                </span>
              </div>
              <div className="w-full bg-gray-100 dark:bg-gray-700/50 h-1.5 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-1000 ${getBarColor(strategy.win_rate)}`}
                  style={{
                    width: `${Math.min(strategy.sample_size_progress || 0, 100)}%`,
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Auto-generated Insight Banner */}
      <div className="bg-[#f0fdfa] dark:bg-teal-950/20 border border-[#ccfbf1] dark:border-teal-900/40 rounded-3xl p-6 flex gap-5 items-start">
        <div className="w-10 h-10 rounded-full bg-[#14b8a6] flex items-center justify-center shrink-0">
          <LineChartOutlined className="text-white text-xl" />
        </div>
        <div>
          <h4 className="text-base font-bold text-gray-900 dark:text-gray-100">
            Strategy Insights (Auto-generated)
          </h4>
          <ul className="mt-3 space-y-2">
            {uniqueStrategies.map((strategy, i) => (
              <li
                key={i}
                className="flex gap-2 text-sm text-gray-600 dark:text-gray-400 leading-relaxed"
              >
                <span className="text-[#14b8a6] font-bold">•</span>
                {strategy.strategy_name}:{" "}
                {strategy.win_rate >= 60
                  ? "Performing well with strong win rate. Continue deployment."
                  : strategy.win_rate >= 40
                    ? "Showing moderate performance. Consider optimization."
                    : "Needs improvement. Review strategy parameters."}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
