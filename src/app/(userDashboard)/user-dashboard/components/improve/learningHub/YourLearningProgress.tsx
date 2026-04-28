import {
  CourseAPI,
  CourseProgressAPI,
} from "@/redux/features/learninghub/learninghubApi";
import { CheckCircleFilled } from "@ant-design/icons";

interface YourLearningProgressProps {
  progress: CourseProgressAPI[];
  courses: CourseAPI[];
}

export default function YourLearningProgress({
  progress,
  courses,
}: YourLearningProgressProps) {
  const activeCourses = courses.filter((course) => course.is_active);
  const activeCourseIds = new Set(activeCourses.map((course) => course.id));
  const visibleProgress = progress.filter((item) =>
    activeCourseIds.has(item.course.id),
  );

  const totalCourses = activeCourses.length;
  const completedCourses = visibleProgress.filter((p) => p.is_completed).length;
  const coursesPercent =
    totalCourses > 0 ? Math.round((completedCourses / totalCourses) * 100) : 0;

  const activeDays = new Set(
    visibleProgress.map((p) => p.started_at.slice(0, 10)),
  ).size;
  const streakPercent = Math.min(100, activeDays * 7);

  const inProgress = visibleProgress.filter((p) => !p.is_completed);

  const recentlyCompleted = [...visibleProgress]
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

        <div className="space-y-3">
          <div className="flex justify-between items-end">
            <span className="text-sm font-medium text-slate-500">
              Active Learning Days
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

        {inProgress.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
              In Progress
            </h4>
            <div className="space-y-2">
              {inProgress.map((p) => (
                <div key={p.id} className="space-y-1">
                  <div className="flex justify-between gap-3 text-xs text-slate-500 dark:text-slate-400">
                    <span className="font-medium truncate">
                      {p.course.title}
                    </span>
                    <span className="shrink-0">
                      {Math.round(p.completion_percentage)}%
                    </span>
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

        <div className="pt-4">
          <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-3">
            Recently Completed
          </h4>

          {recentlyCompleted.length === 0 ? (
            <p className="text-sm text-slate-400 dark:text-slate-500">
              No completed courses yet.
            </p>
          ) : (
            <div className="space-y-2">
              {recentlyCompleted.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400"
                >
                  <div className="flex h-5 w-5 items-center justify-center text-emerald-500">
                    <CheckCircleFilled />
                  </div>
                  <span className="truncate">{p.course.title}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
