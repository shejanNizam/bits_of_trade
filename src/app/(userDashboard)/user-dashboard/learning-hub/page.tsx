/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  useGetAllLearningLessonsQuery,
  useGetAllUserCourseProgressQuery,
} from "@/redux/features/learninghub/learninghubApi";
import AllLearningPaths from "../components/improve/learningHub/AllLearningPaths";
import LearningImpactOnPerformance from "../components/improve/learningHub/LearningImpactOnPerformance";
import Lessons from "../components/improve/learningHub/Lessons";
import YourLearningProgress from "../components/improve/learningHub/YourLearningProgress";

export default function LearningHubPage() {
  // Use the correct hooks from your API
  const { data: lessonsResponse, isLoading: lessonsLoading } =
    useGetAllLearningLessonsQuery({});
  const { data: progressResponse, isLoading: progressLoading } =
    useGetAllUserCourseProgressQuery({});

  // The API returns array directly (not paginated based on your docs)
  // But to be safe, check if it's an array or has results property
  const lessons = Array.isArray(lessonsResponse)
    ? lessonsResponse
    : lessonsResponse?.results || [];
  const userProgress = Array.isArray(progressResponse)
    ? progressResponse
    : progressResponse?.results || [];

  if (lessonsLoading || progressLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  // Calculate overall progress
  const totalCourses = userProgress.length;
  const completedCourses = userProgress.filter(
    (p: any) => p.is_completed,
  ).length;

  // Get recently completed courses
  const recentlyCompleted = userProgress
    .filter((p: any) => p.is_completed)
    .sort((a: any, b: any) => {
      const dateA = a.completed_at ? new Date(a.completed_at).getTime() : 0;
      const dateB = b.completed_at ? new Date(b.completed_at).getTime() : 0;
      return dateB - dateA;
    })
    .slice(0, 3)
    .map((p: any) => ({
      id: p.id,
      title: p.course?.title || "Course Completed",
      completed_at: p.completed_at,
    }));

  return (
    <div className="space-y-4 min-h-screen transition-colors duration-300 p-6">
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
      {lessons.length > 0 && (
        <section className="relative mb-12 overflow-hidden rounded-2xl bg-linear-to-r from-indigo-600 to-indigo-700 p-6 text-white shadow-lg">
          <div className="relative z-10 flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h2 className="text-xl font-bold">Start Your Learning Journey</h2>
              <p className="mt-1 text-indigo-100">
                Explore our comprehensive trading courses and improve your
                skills.
              </p>
              <div className="mt-3 flex items-center gap-2 text-sm font-medium text-orange-200">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-orange-200 text-xs text-indigo-900">
                  !
                </span>
                Complete lessons to track your progress and earn certificates
              </div>
            </div>
            <button
              onClick={() =>
                document
                  .getElementById("lessons-section")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="whitespace-nowrap rounded-lg bg-white/20 px-6 py-2.5 font-semibold backdrop-blur-md hover:bg-white/30 transition-all"
            >
              Browse Lessons
            </button>
          </div>
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-3xl"></div>
        </section>
      )}

      <div id="lessons-section">
        <Lessons lessons={lessons} />
      </div>

      <AllLearningPaths userProgress={userProgress} />

      <YourLearningProgress
        completedCourses={completedCourses}
        totalCourses={totalCourses}
        learningStreak={7}
        recentlyCompleted={recentlyCompleted}
      />

      <LearningImpactOnPerformance />
    </div>
  );
}
