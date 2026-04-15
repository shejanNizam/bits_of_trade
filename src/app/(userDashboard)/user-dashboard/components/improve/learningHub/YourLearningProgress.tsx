/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  useGetAllCoursesQuery,
  useGetAllUserCourseProgressQuery,
} from "@/redux/features/learninghub/learninghubApi";
import { Course, UserCourseProgress } from "@/types/learning";
import { Empty, Skeleton } from "antd";
import { useMemo } from "react";

export default function YourLearningProgress() {
  const {
    data: progressResponse,
    isLoading: progressLoading,
    error: progressError,
  } = useGetAllUserCourseProgressQuery({});
  const { data: coursesResponse, isLoading: coursesLoading } =
    useGetAllCoursesQuery({});

  // Extract courses from response (handle both array and paginated response)
  const courses = useMemo(() => {
    if (!coursesResponse) return [];
    if (Array.isArray(coursesResponse)) return coursesResponse;
    if (coursesResponse.results && Array.isArray(coursesResponse.results))
      return coursesResponse.results;
    return [];
  }, [coursesResponse]);

  // Extract progress data from response (handle both array and paginated response)
  const progressData = useMemo(() => {
    if (!progressResponse) return [];
    if (Array.isArray(progressResponse)) return progressResponse;
    if (progressResponse.results && Array.isArray(progressResponse.results))
      return progressResponse.results;
    return [];
  }, [progressResponse]);

  // Calculate overall stats
  const stats = useMemo(() => {
    if (!progressData.length || !courses.length) {
      return {
        totalCourses: 0,
        completedCourses: 0,
        completionPercentage: 0,
        totalVideosWatched: 0,
        totalVideos: 0,
        recentCompleted: [] as string[],
        learningStreak: 7,
      };
    }

    // Get active courses only
    const activeCourses = courses.filter((c: Course) => c.is_active === true);
    const totalCourses = activeCourses.length;

    // Count completed courses from progress
    const completedCourses = progressData.filter(
      (p: UserCourseProgress) => p.is_completed === true,
    ).length;

    const completionPercentage =
      totalCourses > 0 ? (completedCourses / totalCourses) * 100 : 0;

    // Calculate video stats
    const totalVideosWatched = progressData.reduce(
      (sum: number, p: UserCourseProgress) => sum + (p.completed_videos || 0),
      0,
    );
    const totalVideos = progressData.reduce(
      (sum: number, p: UserCourseProgress) => sum + (p.total_videos || 0),
      0,
    );

    // Get recently completed courses (completed in last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const recentCompleted = progressData
      .filter(
        (p: UserCourseProgress) =>
          p.completed_at && new Date(p.completed_at) > sevenDaysAgo,
      )
      .map((p: UserCourseProgress) => p.course?.title || "Untitled Course")
      .slice(0, 5);

    return {
      totalCourses,
      completedCourses,
      completionPercentage,
      totalVideosWatched,
      totalVideos,
      recentCompleted,
      learningStreak: 12,
    };
  }, [progressData, courses]);

  if (progressLoading || coursesLoading) {
    return (
      <section className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
        <Skeleton active paragraph={{ rows: 6 }} />
      </section>
    );
  }

  if (progressError) {
    return (
      <section className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
        <Empty description="Unable to load progress data" />
      </section>
    );
  }

  const videoPercentage =
    stats.totalVideos > 0
      ? (stats.totalVideosWatched / stats.totalVideos) * 100
      : 0;

  // If no courses or progress, show empty state
  if (stats.totalCourses === 0 && stats.totalVideosWatched === 0) {
    return (
      <section className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-8">
          Your Learning Progress
        </h2>
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📚</div>
          <p className="text-slate-500 dark:text-slate-400">
            {"You haven't started any courses yet."}
          </p>
          <p className="text-sm text-slate-400 dark:text-slate-500 mt-2">
            Browse the learning paths above to begin your journey!
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
      <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-8">
        Your Learning Progress
      </h2>

      <div className="space-y-8">
        {/* Courses Completed Progress */}
        <div className="space-y-3">
          <div className="flex justify-between items-end">
            <span className="text-sm font-medium text-slate-500">
              Courses Completed
            </span>
            <span className="text-sm font-bold text-slate-900 dark:text-white">
              {stats.completedCourses} / {stats.totalCourses}
            </span>
          </div>
          <div className="h-2.5 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
            <div
              className="h-full bg-blue-500 transition-all duration-500"
              style={{ width: `${stats.completionPercentage}%` }}
            />
          </div>
          <p className="text-xs text-slate-400">
            {stats.completionPercentage === 100
              ? "🎉 Congratulations! You've completed all courses!"
              : `${Math.round(100 - stats.completionPercentage)}% more to complete all courses`}
          </p>
        </div>

        {/* Videos Watched Progress */}
        {stats.totalVideos > 0 && (
          <div className="space-y-3">
            <div className="flex justify-between items-end">
              <span className="text-sm font-medium text-slate-500">
                Videos Watched
              </span>
              <span className="text-sm font-bold text-slate-900 dark:text-white">
                {stats.totalVideosWatched} / {stats.totalVideos}
              </span>
            </div>
            <div className="h-2.5 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
              <div
                className="h-full bg-linear-to-r from-purple-500 to-pink-500 transition-all duration-500"
                style={{ width: `${videoPercentage}%` }}
              />
            </div>
          </div>
        )}

        {/* Learning Streak */}
        <div className="space-y-3">
          <div className="flex justify-between items-end">
            <span className="text-sm font-medium text-slate-500">
              Learning Streak
            </span>
            <span className="text-sm font-bold text-slate-900 dark:text-white">
              {stats.learningStreak} days
            </span>
          </div>
          <div className="h-2.5 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
            <div
              className="h-full bg-linear-to-r from-amber-500 to-orange-500 transition-all duration-500"
              style={{
                width: `${Math.min(100, (stats.learningStreak / 30) * 100)}%`,
              }}
            />
          </div>
          <p className="text-xs text-slate-400">
            {stats.learningStreak < 30
              ? `${30 - stats.learningStreak} more days to reach 30-day streak! 🔥`
              : "Amazing! You've reached a 30-day learning streak! 🎉"}
          </p>
        </div>

        {/* Recently Completed */}
        {stats.recentCompleted.length > 0 && (
          <div className="pt-4">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-3">
              Recently Completed
            </h4>
            <div className="space-y-2">
              {stats.recentCompleted.map((item: any, i: number) => (
                <div
                  key={i}
                  className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400"
                >
                  <div className="flex h-5 w-5 items-center justify-center rounded-full border border-emerald-500 text-[10px] text-emerald-500">
                    ✓
                  </div>
                  {item}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
