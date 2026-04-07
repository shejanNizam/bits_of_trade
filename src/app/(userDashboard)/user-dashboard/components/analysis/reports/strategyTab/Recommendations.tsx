// "use client";

// import {
//   ExclamationCircleOutlined,
//   InfoCircleOutlined,
//   WarningOutlined,
// } from "@ant-design/icons";

// const recommendations = [
//   {
//     strategy: "Momentum Breakout",
//     text: "Continue deploying with full position size. Strategy is mature and performing well.",
//     priority: "High",
//     theme: "rose",
//     icon: <ExclamationCircleOutlined />,
//   },
//   {
//     strategy: "Trend Following",
//     text: "Increase sample size to 20+ trades before scaling position sizes.",
//     priority: "Medium",
//     theme: "amber",
//     icon: <WarningOutlined />,
//   },
//   {
//     strategy: "News Breakout",
//     text: "Reduce position size by 50% until win rate improves above 65%.",
//     priority: "High",
//     theme: "rose",
//     icon: <ExclamationCircleOutlined />,
//   },
//   {
//     strategy: "Reversal Scalp",
//     text: "Backtest on different market conditions. Consider tightening entry criteria.",
//     priority: "Low",
//     theme: "blue",
//     icon: <InfoCircleOutlined />,
//   },
// ];

// const themeMap = {
//   rose: "border-rose-500 bg-rose-50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-400",
//   amber:
//     "border-amber-500 bg-amber-50 dark:bg-amber-950/20 text-amber-600 dark:text-amber-400",
//   blue: "border-blue-500 bg-blue-50 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400",
// };

// const badgeMap = {
//   rose: "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300",
//   amber: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
//   blue: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
// };

// export default function Recommendations() {
//   return (
//     <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-3xl p-6 shadow-sm w-full">
//       <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-6">
//         Recommendations
//       </h3>

//       <div className="space-y-4">
//         {recommendations.map((rec, idx) => (
//           <div
//             key={idx}
//             className={`flex items-start gap-4 p-4 border-l-4 rounded-r-2xl transition-all ${themeMap[rec.theme as keyof typeof themeMap]}`}
//           >
//             <div className="mt-0.5 text-lg shrink-0">{rec.icon}</div>

//             <div className="grow">
//               <div className="flex justify-between items-center mb-1">
//                 <span className="font-bold text-sm text-gray-900 dark:text-gray-100">
//                   {rec.strategy}
//                 </span>
//                 <span
//                   className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md ${badgeMap[rec.theme as keyof typeof badgeMap]}`}
//                 >
//                   {rec.priority}
//                 </span>
//               </div>
//               <p className="text-xs opacity-90 leading-relaxed text-gray-700 dark:text-gray-300">
//                 {rec.text}
//               </p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

"use client";

import {
  ExclamationCircleOutlined,
  InfoCircleOutlined,
  WarningOutlined,
} from "@ant-design/icons";

interface Strategy {
  strategy_id: string;
  strategy_name: string;
  win_rate: number;
  total_trades: number;
  sample_size_progress: number;
  maturity_status: string;
}

interface RecommendationsProps {
  strategies: Strategy[];
}

const getRecommendation = (strategy: Strategy) => {
  const { win_rate, total_trades, sample_size_progress } = strategy;

  if (win_rate >= 60 && sample_size_progress >= 50) {
    return {
      text: "Continue deploying with full position size. Strategy is mature and performing well.",
      priority: "High",
      theme: "rose",
    };
  } else if (win_rate >= 60 && sample_size_progress < 50) {
    return {
      text: "Increase sample size to 20+ trades before scaling position sizes. Current win rate is promising.",
      priority: "Medium",
      theme: "amber",
    };
  } else if (win_rate >= 40 && win_rate < 60) {
    return {
      text: "Consider optimizing entry/exit criteria. Win rate needs improvement to reach target.",
      priority: "Medium",
      theme: "amber",
    };
  } else if (win_rate < 40 && total_trades > 10) {
    return {
      text: "Reduce position size by 50% until win rate improves above 60%. Backtest on different market conditions.",
      priority: "High",
      theme: "rose",
    };
  } else if (total_trades < 10) {
    return {
      text: "Continue gathering more data. Current sample size is too small for reliable conclusions.",
      priority: "Low",
      theme: "blue",
    };
  } else {
    return {
      text: "Monitor performance closely. Consider paper trading before full deployment.",
      priority: "Medium",
      theme: "blue",
    };
  }
};

const getThemeStyles = (theme: string) => {
  switch (theme) {
    case "rose":
      return {
        container:
          "border-rose-500 bg-rose-50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-400",
        badge:
          "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300",
        icon: <ExclamationCircleOutlined />,
      };
    case "amber":
      return {
        container:
          "border-amber-500 bg-amber-50 dark:bg-amber-950/20 text-amber-600 dark:text-amber-400",
        badge:
          "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
        icon: <WarningOutlined />,
      };
    default:
      return {
        container:
          "border-blue-500 bg-blue-50 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400",
        badge:
          "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
        icon: <InfoCircleOutlined />,
      };
  }
};

// Get unique strategies
const getUniqueStrategies = (strategies: Strategy[]) => {
  const uniqueMap = new Map();
  strategies.forEach((strategy) => {
    if (!uniqueMap.has(strategy.strategy_id)) {
      uniqueMap.set(strategy.strategy_id, strategy);
    }
  });
  return Array.from(uniqueMap.values());
};

export default function Recommendations({ strategies }: RecommendationsProps) {
  const uniqueStrategies = getUniqueStrategies(strategies);

  if (uniqueStrategies.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-3xl p-6 shadow-sm w-full">
        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-6">
          Recommendations
        </h3>
        <p className="text-center text-gray-500 dark:text-gray-400">
          No recommendations available
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-3xl p-6 shadow-sm w-full">
      <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-6">
        Recommendations
      </h3>

      <div className="space-y-4">
        {uniqueStrategies.map((strategy) => {
          const recommendation = getRecommendation(strategy);
          const styles = getThemeStyles(recommendation.theme);

          return (
            <div
              key={strategy.strategy_id}
              className={`flex items-start gap-4 p-4 border-l-4 rounded-r-2xl transition-all ${styles.container}`}
            >
              <div className="mt-0.5 text-lg shrink-0">{styles.icon}</div>

              <div className="grow">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-bold text-sm text-gray-900 dark:text-gray-100">
                    {strategy.strategy_name}
                  </span>
                  <span
                    className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md ${styles.badge}`}
                  >
                    {recommendation.priority}
                  </span>
                </div>
                <p className="text-xs opacity-90 leading-relaxed text-gray-700 dark:text-gray-300">
                  {recommendation.text}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
