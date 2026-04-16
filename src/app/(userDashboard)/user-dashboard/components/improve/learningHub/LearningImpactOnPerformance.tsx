// export default function LearningImpactOnPerformance() {
//   const stats = [
//     {
//       label: "Win rate improved after courses",
//       value: "+18.5%",
//       icon: "🎯",
//       color: "text-emerald-500",
//     },
//     {
//       label: "Mistakes reduced with training",
//       value: "-42%",
//       icon: "⚠️",
//       color: "text-blue-500",
//     },
//     {
//       label: "Better discipline scores",
//       value: "3.2x",
//       icon: "✅",
//       color: "text-purple-500",
//     },
//   ];

import { CourseProgressAPI } from "@/redux/features/learninghub/learninghubApi";

//   return (
//     <section className="rounded-2xl border border-slate-200 bg-slate-50/50 p-8 dark:border-slate-800 dark:bg-slate-900/50">
//       <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-10">
//         Learning Impact on Performance
//       </h2>

//       <div className="flex flex-col md:flex-row justify-around items-center gap-12 text-center">
//         {stats.map((stat, i) => (
//           <div key={i} className="max-w-50">
//             <div className="mb-2 text-3xl">{stat.icon}</div>
//             <div className={`text-4xl font-black mb-2 ${stat.color}`}>
//               {stat.value}
//             </div>
//             <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
//               {stat.label}
//             </p>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }

// ─── Props ────────────────────────────────────────────────────────────────────

///////////////////////////////

// import { CourseProgressAPI } from "../../../learning-hub/page";

// interface LearningImpactOnPerformanceProps {
//   progress: CourseProgressAPI[];
// }

// // ─── Component ────────────────────────────────────────────────────────────────

// export default function LearningImpactOnPerformance({
//   progress,
// }: LearningImpactOnPerformanceProps) {
//   // ── Derive stats from real progress data ──────────────────────────────────

//   // Total enrolments across all users (from API field)
//   const totalEnrolments =
//     progress.length > 0 ? progress[0].total_UserCourseStart : 0;

//   // Total completions across all users (from API field)
//   const totalCompletions =
//     progress.length > 0 ? progress[0].total_completed_UserCourseStart : 0;

//   // Completion rate across the platform
//   const completionRate =
//     totalEnrolments > 0
//       ? Math.round((totalCompletions / totalEnrolments) * 100)
//       : 0;

//   // Personal completion percentage (average across this user's courses)
//   const personalAvg =
//     progress.length > 0
//       ? Math.round(
//           progress.reduce((sum, p) => sum + p.completion_percentage, 0) /
//             progress.length,
//         )
//       : 0;

//   // Multiplier: how many courses this user has completed vs started
//   const completedByUser = progress.filter((p) => p.is_completed).length;
//   const multiplier =
//     progress.length > 0
//       ? (completedByUser / progress.length).toFixed(1)
//       : "0.0";

//   const stats = [
//     {
//       label: "Platform completion rate",
//       value: `${completionRate}%`,
//       icon: "🎯",
//       color: "text-emerald-500",
//     },
//     {
//       label: "Your average progress",
//       value: `${personalAvg}%`,
//       icon: "⚠️",
//       color: "text-blue-500",
//     },
//     {
//       label: "Completion ratio",
//       value: `${multiplier}x`,
//       icon: "✅",
//       color: "text-purple-500",
//     },
//   ];

//   return (
//     <section className="rounded-2xl border border-slate-200 bg-slate-50/50 p-8 dark:border-slate-800 dark:bg-slate-900/50">
//       <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-10">
//         Learning Impact on Performance
//       </h2>

//       <div className="flex flex-col md:flex-row justify-around items-center gap-12 text-center">
//         {stats.map((stat, i) => (
//           <div key={i} className="max-w-50">
//             <div className="mb-2 text-3xl">{stat.icon}</div>
//             <div className={`text-4xl font-black mb-2 ${stat.color}`}>
//               {stat.value}
//             </div>
//             <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
//               {stat.label}
//             </p>
//           </div>
//         ))}
//       </div>

//       {/* Summary row */}
//       <div className="mt-10 pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-wrap justify-center gap-6 text-center text-xs text-slate-400 dark:text-slate-500 font-medium">
//         <span>
//           Total enrolments:{" "}
//           <strong className="text-slate-600 dark:text-slate-300">
//             {totalEnrolments}
//           </strong>
//         </span>
//         <span>
//           Total completions:{" "}
//           <strong className="text-slate-600 dark:text-slate-300">
//             {totalCompletions}
//           </strong>
//         </span>
//       </div>
//     </section>
//   );
// }

//////////////////////////////////////////

// ─── Props ────────────────────────────────────────────────────────────────────

interface LearningImpactOnPerformanceProps {
  progress: CourseProgressAPI[];
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function LearningImpactOnPerformance({
  progress,
}: LearningImpactOnPerformanceProps) {
  // Global platform stats (come from first progress record's computed fields)
  const totalEnrolments =
    progress.length > 0 ? progress[0].total_UserCourseStart : 0;
  const totalCompletions =
    progress.length > 0 ? progress[0].total_completed_UserCourseStart : 0;

  // Platform-wide completion rate
  const completionRate =
    totalEnrolments > 0
      ? Math.round((totalCompletions / totalEnrolments) * 100)
      : 0;

  // This user's average progress across all enrolled courses
  const personalAvg =
    progress.length > 0
      ? Math.round(
          progress.reduce((sum, p) => sum + p.completion_percentage, 0) /
            progress.length,
        )
      : 0;

  // Completion ratio: user's completed courses / total enrolled
  const completedByUser = progress.filter((p) => p.is_completed).length;
  const multiplier =
    progress.length > 0
      ? (completedByUser / progress.length).toFixed(1)
      : "0.0";

  const stats = [
    {
      label: "Platform completion rate",
      value: `${completionRate}%`,
      icon: "🎯",
      color: "text-emerald-500",
    },
    {
      label: "Your average progress",
      value: `${personalAvg}%`,
      icon: "⚠️",
      color: "text-blue-500",
    },
    {
      label: "Completion ratio",
      value: `${multiplier}x`,
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
          <div key={i} className="max-w-48">
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

      {/* Summary row */}
      <div className="mt-10 pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-wrap justify-center gap-6 text-center text-xs text-slate-400 dark:text-slate-500 font-medium">
        <span>
          Total enrolments:{" "}
          <strong className="text-slate-600 dark:text-slate-300">
            {totalEnrolments}
          </strong>
        </span>
        <span>
          Total completions:{" "}
          <strong className="text-slate-600 dark:text-slate-300">
            {totalCompletions}
          </strong>
        </span>
      </div>
    </section>
  );
}
