// import { useGetAllStrategyForCommunityQuery } from "@/redux/features/strategy/strategyApi";
// import { Button } from "antd";
// import { FaCopy, FaStar } from "react-icons/fa";

// export default function CommunityTab() {
//   const items = [
//     {
//       name: "Institutional Gap Fill",
//       author: "TraderPro",
//       win: "72.5%",
//       trades: 155,
//       rating: 4.8,
//       segment: "Indian Stocks",
//       followers: "1240",
//       clones: "342",
//     },
//     {
//       name: "Options Iron Condor",
//       author: "OptionsGuru",
//       win: "68.2%",
//       trades: 89,
//       rating: 4.6,
//       segment: "F&O",
//       followers: "980",
//       clones: "267",
//     },
//   ];

//   const { data } = useGetAllStrategyForCommunityQuery({});
//   console.log(data);

//   return (
//     <div className="flex flex-col gap-4 py-4">
//       {items.map((item, idx) => (
//         <div
//           key={idx}
//           className="bg-white dark:bg-primary/10 p-6 rounded-2xl border border-slate-200 dark:border-zinc-800 flex flex-col lg:flex-row justify-between gap-6 shadow-sm"
//         >
//           <div className="flex-1">
//             <div className="flex items-center gap-2 mb-1">
//               <h3 className="font-bold text-lg dark:text-white">{item.name}</h3>
//               <span className="bg-purple-600 text-[10px] text-white px-1.5 py-0.5 rounded font-bold">
//                 PRO
//               </span>
//             </div>
//             <p className="text-sm text-slate-500 mb-4">by {item.author}</p>
//             <div className="flex flex-wrap gap-8">
//               <div>
//                 <p className="text-xs text-slate-400">Win Rate</p>
//                 <p className="font-bold text-teal-500 text-lg">{item.win}</p>
//               </div>
//               <div>
//                 <p className="text-xs text-slate-400">Trades</p>
//                 <p className="font-bold dark:text-white text-lg">
//                   {item.trades}
//                 </p>
//               </div>
//               <div>
//                 <p className="text-xs text-slate-400">Rating</p>
//                 <p className="font-bold dark:text-white text-lg flex items-center gap-1">
//                   <FaStar
//                     size={14}
//                     className="fill-yellow-400 text-yellow-400"
//                   />{" "}
//                   {item.rating}
//                 </p>
//               </div>
//               <div>
//                 <p className="text-xs text-slate-400">Segment</p>
//                 <p className="font-bold dark:text-white text-lg">
//                   {item.segment}
//                 </p>
//               </div>
//             </div>
//           </div>
//           <div className="flex flex-col sm:flex-row lg:flex-col gap-3 justify-center min-w-50">
//             <Button type="primary" className="bg-purple-600 h-11 font-semibold">
//               View Strategy
//             </Button>
//             <Button
//               icon={<FaCopy size={16} />}
//               className="h-11 dark:bg-zinc-800 dark:text-white dark:border-zinc-700"
//             >
//               Clone to My Strategies
//             </Button>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

import { useGetAllStrategyForCommunityQuery } from "@/redux/features/strategy/strategyApi";
import { Strategy } from "@/types/strategy";
import { Button } from "antd";
import { FaCopy } from "react-icons/fa";

export default function CommunityTab() {
  const { data, isLoading, error } = useGetAllStrategyForCommunityQuery({});
  const strategies: Strategy[] = data || [];

  const getStatusBadge = (status: string) => {
    const statusColors = {
      mature: "bg-green-600",
      testing: "bg-yellow-600",
      draft: "bg-gray-600",
    };
    return statusColors[status as keyof typeof statusColors] || "bg-purple-600";
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <p className="text-slate-500">Loading strategies...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center py-12">
        <p className="text-red-500">
          Error loading strategies. Please try again.
        </p>
      </div>
    );
  }

  if (strategies.length === 0) {
    return (
      <div className="flex justify-center items-center py-12">
        <p className="text-slate-500">No strategies available yet.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 py-4">
      {strategies.map((strategy) => (
        <div
          key={strategy.id}
          className="bg-white dark:bg-primary/10 p-6 rounded-2xl border border-slate-200 dark:border-zinc-800 flex flex-col lg:flex-row justify-between gap-6 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <h3 className="font-bold text-lg dark:text-white">
                {strategy.strategy_name}
              </h3>
              {strategy.maturity_status && (
                <span
                  className={`${getStatusBadge(strategy.maturity_status)} text-[10px] text-white px-1.5 py-0.5 rounded font-bold uppercase`}
                >
                  {strategy.maturity_status}
                </span>
              )}
              {strategy.total_trades === 0 && (
                <span className="bg-blue-600 text-[10px] text-white px-1.5 py-0.5 rounded font-bold">
                  NEW
                </span>
              )}
            </div>

            {strategy.description && (
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-2">
                {strategy.description}
              </p>
            )}
            <div className="flex flex-wrap gap-8">
              <div>
                <p className="text-xs text-slate-400">Win Rate</p>
                <p
                  className={`font-bold text-lg ${strategy.win_rate > 0 ? "text-teal-500" : "text-slate-500"}`}
                >
                  {`${strategy.win_rate.toFixed(1)}%` || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-400">Trades</p>
                <p className="font-bold dark:text-white text-lg">
                  {strategy.total_trades}
                </p>
              </div>
              {/* <div>
                <p className="text-xs text-slate-400">Rating</p>
                <p className="font-bold dark:text-white text-lg flex items-center gap-1">
                  <FaStar
                    size={14}
                    className="fill-yellow-400 text-yellow-400"
                  />{" "}
                  {calculateRating(strategy.win_rate, strategy.total_trades)}
                </p>
              </div> */}
              <div>
                <p className="text-xs text-slate-400">Segment</p>
                <p className="font-bold dark:text-white text-lg">
                  {strategy.market_types && strategy.market_types.length > 0
                    ? strategy.market_types.join(", ")
                    : "All Markets"}
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-400">Total P&L</p>
                <p
                  className={`font-bold text-lg ${strategy.total_pnl >= 0 ? "text-green-500" : "text-red-500"}`}
                >
                  ₹
                  {strategy.total_pnl < 0
                    ? `${strategy.total_pnl}(Loss)`
                    : `${strategy.total_pnl} (Profit)`}
                </p>
              </div>

              {strategy.tags && strategy.tags.length > 0 && (
                <div>
                  <p className="text-xs text-slate-400">Tags</p>
                  <div className="flex gap-1 flex-wrap mt-1">
                    {strategy.tags.slice(0, 2).map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-slate-100 dark:bg-zinc-800 px-2 py-0.5 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                    {strategy.tags.length > 2 && (
                      <span className="text-xs text-slate-500">
                        +{strategy.tags.length - 2}
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="mt-4">
              <div className="flex justify-between text-xs text-slate-500 mb-1">
                <span>Sample Size Progress</span>
                <span>{strategy.sample_size_threshold}%</span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-zinc-700 rounded-full h-1.5">
                <div
                  className="bg-purple-600 h-1.5 rounded-full transition-all duration-300"
                  style={{
                    width: `${Math.min(100, strategy.sample_size_threshold)}%`,
                  }}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 justify-center min-w-50">
            <Button
              type="primary"
              className="bg-purple-600 h-11 font-semibold hover:bg-purple-700"
              onClick={() => {
                console.log("View strategy:", strategy.id);
              }}
            >
              View Strategy
            </Button>
            <Button
              icon={<FaCopy size={16} />}
              className="h-11 dark:bg-zinc-800 dark:text-white dark:border-zinc-700 hover:border-purple-500"
              onClick={() => {
                console.log("Clone strategy:", strategy.id);
              }}
            >
              Clone to My Strategies
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
