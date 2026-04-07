// import { FiActivity } from "react-icons/fi";

// export function DisciplineHealthSummary() {
//   const stats = [
//     {
//       label: "Discipline Score",
//       value: "76.5",
//       color:
//         "text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10 border-emerald-100 dark:border-emerald-500/20",
//     },
//     {
//       label: "Violated Boundaries",
//       value: "24",
//       color:
//         "text-amber-500 bg-amber-50 dark:bg-amber-500/10 border-amber-100 dark:border-amber-500/20",
//     },
//     {
//       label: "Sessions Post",
//       value: "3.2",
//       color:
//         "text-blue-500 bg-blue-50 dark:bg-blue-500/10 border-blue-100 dark:border-blue-500/20",
//     },
//     {
//       label: "Health Rating",
//       value: "Improving but fragile",
//       color:
//         "text-purple-500 bg-purple-50 dark:bg-purple-500/10 border-purple-100 dark:border-purple-500/20",
//       small: true,
//     },
//   ];

//   return (
//     <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm">
//       <div className="flex items-center gap-2 mb-6">
//         <FiActivity className="text-indigo-500" size={20} />
//         <h2 className="font-bold text-lg">Discipline Health Summary</h2>
//       </div>

//       <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
//         {stats.map((stat, i) => (
//           <div
//             key={i}
//             className={`p-6 rounded-2xl border text-center transition-transform hover:scale-[1.02] ${stat.color}`}
//           >
//             <div
//               className={`font-black ${stat.small ? "text-sm" : "text-4xl"} mb-1`}
//             >
//               {stat.value}
//             </div>
//             <div className="text-[10px] uppercase font-bold opacity-80 tracking-widest">
//               {stat.label}
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="bg-emerald-50/50 dark:bg-emerald-500/5 border border-emerald-100 dark:border-emerald-500/20 rounded-xl p-4 text-center">
//         <p className="text-xs text-slate-600 dark:text-emerald-400/80 leading-relaxed">
//           <span className="font-bold text-emerald-600">Remember:</span> Your
//           discipline is improving, but fragile. One uncommitted session could
//           trigger a cascade. Focus on the 3sec timer.
//         </p>
//       </div>
//     </div>
//   );
// }

import { FiActivity } from "react-icons/fi";

interface DisciplineHealthProps {
  disciplineHealth: {
    discipline_score: number;
    violated_boundaries: number;
    hard_violations: number;
    sessions_count: number;
    sessions_per_violation: number;
    health_rating: string;
    trend: string;
    green_sessions: number;
    yellow_sessions: number;
    red_sessions: number;
    reminder: string;
    session_pnl_summary: {
      green_pnl: number;
      yellow_pnl: number;
      red_pnl: number;
    };
  };
}

export function DisciplineHealthSummary({
  disciplineHealth,
}: DisciplineHealthProps) {
  if (!disciplineHealth) {
    return (
      <div className="bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-6">
          <FiActivity className="text-indigo-500" size={20} />
          <h2 className="font-bold text-lg">Discipline Health Summary</h2>
        </div>
        <p className="text-center text-gray-500 dark:text-gray-400 py-8">
          No discipline health data available.
        </p>
      </div>
    );
  }

  const getScoreColor = (score: number) => {
    if (score >= 85)
      return "text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10";
    if (score >= 70) return "text-amber-500 bg-amber-50 dark:bg-amber-500/10";
    if (score >= 50)
      return "text-orange-500 bg-orange-50 dark:bg-orange-500/10";
    return "text-red-500 bg-red-50 dark:bg-red-500/10";
  };

  const getRatingColor = (rating: string) => {
    if (rating === "Excellent") return "text-emerald-500";
    if (rating === "Improving but fragile") return "text-amber-500";
    if (rating === "Needs Attention") return "text-orange-500";
    return "text-red-500";
  };

  const getTrendIcon = (trend: string) => {
    if (trend === "Improving") return "📈";
    if (trend === "Declining") return "📉";
    return "➡️";
  };

  const stats = [
    {
      label: "Discipline Score",
      value: disciplineHealth.discipline_score.toFixed(1),
      color: getScoreColor(disciplineHealth.discipline_score),
    },
    {
      label: "Violated Boundaries",
      value: disciplineHealth.violated_boundaries.toString(),
      color: "text-amber-500 bg-amber-50 dark:bg-amber-500/10",
    },
    {
      label: "Sessions Per Violation",
      value: disciplineHealth.sessions_per_violation.toFixed(1),
      color: "text-blue-500 bg-blue-50 dark:bg-blue-500/10",
    },
    {
      label: "Health Rating",
      value: disciplineHealth.health_rating,
      color: `bg-purple-50 dark:bg-purple-500/10 ${getRatingColor(disciplineHealth.health_rating)}`,
      small: true,
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-xl p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-6">
        <FiActivity className="text-indigo-500" size={20} />
        <h2 className="font-bold text-lg">Discipline Health Summary</h2>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
        {stats.map((stat, i) => (
          <div
            key={i}
            className={`p-6 rounded-2xl border text-center transition-transform hover:scale-[1.02] ${stat.color} border-current/20`}
          >
            <div
              className={`font-black ${stat.small ? "text-sm" : "text-4xl"} mb-1`}
            >
              {stat.value}
            </div>
            <div className="text-[10px] uppercase font-bold opacity-80 tracking-widest">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Session Distribution */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        <div className="text-center p-3 bg-emerald-50 dark:bg-emerald-500/10 rounded-xl">
          <p className="text-xs text-emerald-600 dark:text-emerald-400">
            GREEN
          </p>
          <p className="text-xl font-bold text-emerald-600 dark:text-emerald-400">
            {disciplineHealth.green_sessions}
          </p>
          <p className="text-[10px] text-emerald-500">
            ${disciplineHealth.session_pnl_summary.green_pnl.toLocaleString()}
          </p>
        </div>
        <div className="text-center p-3 bg-amber-50 dark:bg-amber-500/10 rounded-xl">
          <p className="text-xs text-amber-600 dark:text-amber-400">YELLOW</p>
          <p className="text-xl font-bold text-amber-600 dark:text-amber-400">
            {disciplineHealth.yellow_sessions}
          </p>
          <p className="text-[10px] text-amber-500">
            ${disciplineHealth.session_pnl_summary.yellow_pnl.toLocaleString()}
          </p>
        </div>
        <div className="text-center p-3 bg-red-50 dark:bg-red-500/10 rounded-xl">
          <p className="text-xs text-red-600 dark:text-red-400">RED</p>
          <p className="text-xl font-bold text-red-600 dark:text-red-400">
            {disciplineHealth.red_sessions}
          </p>
          <p className="text-[10px] text-red-500">
            ${disciplineHealth.session_pnl_summary.red_pnl.toLocaleString()}
          </p>
        </div>
      </div>

      <div className="bg-emerald-50/50 dark:bg-emerald-500/5 border border-emerald-100 dark:border-emerald-500/20 rounded-xl p-4 text-center">
        <p className="text-xs text-slate-600 dark:text-emerald-400/80 leading-relaxed">
          <span className="font-bold text-emerald-600">
            Trend: {getTrendIcon(disciplineHealth.trend)}
          </span>{" "}
          {disciplineHealth.reminder}
        </p>
      </div>
    </div>
  );
}
