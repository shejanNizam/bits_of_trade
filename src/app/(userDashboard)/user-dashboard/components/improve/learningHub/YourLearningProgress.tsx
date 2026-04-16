// export default function YourLearningProgress() {
//   return (
//     <section className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
//       <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-8">
//         Your Learning Progress
//       </h2>

//       <div className="space-y-8">
//         {/* Progress Bar 1 */}
//         <div className="space-y-3">
//           <div className="flex justify-between items-end">
//             <span className="text-sm font-medium text-slate-500">
//               Courses Completed
//             </span>
//             <span className="text-sm font-bold text-slate-900 dark:text-white">
//               7 / 12
//             </span>
//           </div>
//           <div className="h-2.5 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
//             <div className="h-full w-[58%] bg-blue-500" />
//           </div>
//         </div>

//         {/* Progress Bar 2 */}
//         <div className="space-y-3">
//           <div className="flex justify-between items-end">
//             <span className="text-sm font-medium text-slate-500">
//               Learning Streak
//             </span>
//             <span className="text-sm font-bold text-slate-900 dark:text-white">
//               12 days
//             </span>
//           </div>
//           <div className="h-2.5 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
//             <div className="h-full w-[80%] bg-linear-to-r from-purple-500 to-pink-500" />
//           </div>
//         </div>

//         {/* Recently Completed */}
//         <div className="pt-4">
//           <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-3">
//             Recently Completed
//           </h4>
//           <div className="space-y-2">
//             {["Stop Loss Placement Mastery", "Reading Price Action Basics"].map(
//               (item, i) => (
//                 <div
//                   key={i}
//                   className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400"
//                 >
//                   <div className="flex h-5 w-5 items-center justify-center rounded-full border border-emerald-500 text-[10px] text-emerald-500">
//                     ✓
//                   </div>
//                   {item}
//                 </div>
//               ),
//             )}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// ─── Props ────────────────────────────────────────────────────────────────────

import { CourseAPI, CourseProgressAPI } from "../../../learning-hub/page";

interface YourLearningProgressProps {
  progress: CourseProgressAPI[];
  courses: CourseAPI[];
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function YourLearningProgress({
  progress,
  courses,
}: YourLearningProgressProps) {
  // Total courses available vs completed
  const totalCourses = courses.length;
  const completedCourses = progress.filter((p) => p.is_completed).length;
  const coursesPercent =
    totalCourses > 0 ? Math.round((completedCourses / totalCourses) * 100) : 0;

  // Learning streak: count of consecutive days with any progress.
  // The API doesn't expose a streak field, so we approximate using
  // started_at dates — show unique active day count as a proxy.
  const activeDays = new Set(progress.map((p) => p.started_at.slice(0, 10)))
    .size;
  const streakPercent = Math.min(100, activeDays * 7); // rough visual fill

  // Recently completed courses (is_completed = true), sorted by completed_at
  const recentlyCompleted = progress
    .filter((p) => p.is_completed && p.completed_at)
    .sort(
      (a, b) =>
        new Date(b.completed_at!).getTime() -
        new Date(a.completed_at!).getTime(),
    )
    .slice(0, 5);

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
      <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-8">
        Your Learning Progress
      </h2>

      <div className="space-y-8">
        {/* Courses Completed */}
        <div className="space-y-3">
          <div className="flex justify-between items-end">
            <span className="text-sm font-medium text-slate-500">
              Courses Completed
            </span>
            <span className="text-sm font-bold text-slate-900 dark:text-white">
              {completedCourses} / {totalCourses}
            </span>
          </div>
          <div className="h-2.5 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
            <div
              className="h-full bg-blue-500 transition-all duration-500"
              style={{ width: `${coursesPercent}%` }}
            />
          </div>
        </div>

        {/* Learning Streak (active days as proxy) */}
        <div className="space-y-3">
          <div className="flex justify-between items-end">
            <span className="text-sm font-medium text-slate-500">
              Learning Streak
            </span>
            <span className="text-sm font-bold text-slate-900 dark:text-white">
              {activeDays} day{activeDays !== 1 ? "s" : ""}
            </span>
          </div>
          <div className="h-2.5 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
            <div
              className="h-full bg-linear-to-r from-purple-500 to-pink-500 transition-all duration-500"
              style={{ width: `${streakPercent}%` }}
            />
          </div>
        </div>

        {/* In-Progress courses */}
        {progress.filter((p) => !p.is_completed).length > 0 && (
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
              In Progress
            </h4>
            <div className="space-y-2">
              {progress
                .filter((p) => !p.is_completed)
                .map((p) => (
                  <div key={p.id} className="space-y-1">
                    <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
                      <span className="font-medium">{p.course.title}</span>
                      <span>{Math.round(p.completion_percentage)}%</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                      <div
                        className="h-full bg-indigo-400 transition-all duration-500"
                        style={{ width: `${p.completion_percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Recently Completed */}
        <div className="pt-4">
          <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-3">
            Recently Completed
          </h4>

          {recentlyCompleted.length === 0 ? (
            <p className="text-sm text-slate-400 dark:text-slate-500">
              No completed courses yet. Keep going! 🚀
            </p>
          ) : (
            <div className="space-y-2">
              {recentlyCompleted.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400"
                >
                  <div className="flex h-5 w-5 items-center justify-center rounded-full border border-emerald-500 text-[10px] text-emerald-500">
                    ✓
                  </div>
                  {p.course.title}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
