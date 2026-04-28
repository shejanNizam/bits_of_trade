import { CourseProgressAPI } from "@/redux/features/learninghub/learninghubApi";

interface LearningImpactOnPerformanceProps {
  progress: CourseProgressAPI[];
}

export default function LearningImpactOnPerformance({
  progress,
}: LearningImpactOnPerformanceProps) {
  const startedCourses = progress.length;
  const completedCourses = progress.filter((p) => p.is_completed).length;
  const completionRate =
    startedCourses > 0
      ? Math.round((completedCourses / startedCourses) * 100)
      : 0;
  const averageProgress =
    startedCourses > 0
      ? Math.round(
          progress.reduce((sum, p) => sum + p.completion_percentage, 0) /
            startedCourses,
        )
      : 0;

  const stats = [
    {
      label: "Your completion rate",
      value: `${completionRate}%`,
      color: "text-emerald-500",
    },
    {
      label: "Your average progress",
      value: `${averageProgress}%`,
      color: "text-blue-500",
    },
    {
      label: "Courses completed",
      value: `${completedCourses}`,
      color: "text-purple-500",
    },
  ];

  return (
    <section className="rounded-2xl border border-slate-200 bg-slate-50/50 p-8 dark:border-slate-800 dark:bg-slate-900/50">
      <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-10">
        Learning Impact on Performance
      </h2>

      <div className="flex flex-col md:flex-row justify-around items-center gap-12 text-center">
        {stats.map((stat) => (
          <div key={stat.label} className="max-w-48">
            <div className={`text-4xl font-black mb-2 ${stat.color}`}>
              {stat.value}
            </div>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-10 pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-wrap justify-center gap-6 text-center text-xs text-slate-400 dark:text-slate-500 font-medium">
        <span>
          Courses started:{" "}
          <strong className="text-slate-600 dark:text-slate-300">
            {startedCourses}
          </strong>
        </span>
        <span>
          Courses completed:{" "}
          <strong className="text-slate-600 dark:text-slate-300">
            {completedCourses}
          </strong>
        </span>
      </div>
    </section>
  );
}
