"use client";

import {
  useGetAllCoursesQuery,
  useGetAllLearningLessonsQuery,
  useGetAllUserCourseProgressQuery,
} from "@/redux/features/learninghub/learninghubApi";
import AllLearningPaths from "../components/improve/learningHub/AllLearningPaths";
import LearningImpactOnPerformance from "../components/improve/learningHub/LearningImpactOnPerformance";
import Lessons from "../components/improve/learningHub/Lessons";
import YourLearningProgress from "../components/improve/learningHub/YourLearningProgress";

export default function LearningHubPage() {
  const {
    data: lessons = [],
    isLoading: lessonsLoading,
    isError: lessonsError,
  } = useGetAllLearningLessonsQuery();

  const {
    data: courses = [],
    isLoading: coursesLoading,
    isError: coursesError,
  } = useGetAllCoursesQuery();

  const {
    data: progress = [],
    isLoading: progressLoading,
    isError: progressError,
  } = useGetAllUserCourseProgressQuery();

  const isLoading = lessonsLoading || coursesLoading || progressLoading;
  const isError = lessonsError || coursesError || progressError;

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-screen items-center justify-center text-red-500">
        Failed to load Learning Hub. Please try again.
      </div>
    );
  }

  return (
    <div className="space-y-4 min-h-screen transition-colors duration-300">
      {/* Page Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
          Learning Hub
        </h1>
        <p className="text-slate-500 dark:text-slate-400">
          Structured learning paths to improve your trading skills and
          discipline.
        </p>
      </header>

      {/* Recommended Section Banner */}
      <section className="relative mb-12 overflow-hidden rounded-2xl bg-indigo-600 p-6 text-white shadow-lg dark:bg-indigo-700">
        <div className="relative z-10 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h2 className="text-xl font-bold">Recommended for You</h2>
            <p className="mt-1 text-indigo-100">
              Based on your recent performance and risk profile, these learning
              paths may improve your results.
            </p>
            <div className="mt-3 flex items-center gap-2 text-sm font-medium text-orange-200">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-orange-200 text-xs text-indigo-900">
                !
              </span>
              Your trend-following win rate dropped 8% this week
            </div>
          </div>
          <button className="whitespace-nowrap rounded-lg bg-white/20 px-6 py-2.5 font-semibold backdrop-blur-md transition-hover hover:bg-white/30">
            Start Learning Path
          </button>
        </div>
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
      </section>

      {/* Lesson sections grouped by LearningLesson */}
      <Lessons lessons={lessons} progress={progress} />

      {/* All flat courses as learning paths */}
      <AllLearningPaths courses={courses} progress={progress} />

      {/* User progress summary */}
      <YourLearningProgress progress={progress} courses={courses} />

      {/* Platform-level impact stats */}
      <LearningImpactOnPerformance progress={progress} />
    </div>
  );
}
