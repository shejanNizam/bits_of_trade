"use client";

import {
  CourseProgressAPI,
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
    refetch: refetchProgress,
  } = useGetAllUserCourseProgressQuery();

  const isLoading = lessonsLoading || coursesLoading || progressLoading;
  const isError = lessonsError || coursesError || progressError;
  const activeCourses = courses.filter((course) => course.is_active);
  const activeLessons = lessons.filter((lesson) => lesson.is_active);
  const inProgressCourses = progress.filter((item) => !item.is_completed);
  const completedCourses = progress.filter((item) => item.is_completed);
  const recommendedCourse =
    inProgressCourses[0]?.course.title ?? activeCourses[0]?.title;

  async function refreshProgress(): Promise<CourseProgressAPI[] | undefined> {
    const result = await refetchProgress();
    return result.data;
  }

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
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
          Learning Hub
        </h1>
        <p className="text-slate-500 dark:text-slate-400">
          Structured learning paths to improve your trading skills and
          discipline.
        </p>
      </header>

      <section className="relative mb-12 overflow-hidden rounded-2xl bg-indigo-600 p-6 text-white shadow-lg dark:bg-indigo-700">
        <div className="relative z-10 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h2 className="text-xl font-bold">
              {recommendedCourse ? recommendedCourse : "Ready to Learn"}
            </h2>
            <p className="mt-1 text-indigo-100">
              {inProgressCourses.length > 0
                ? "Continue the course you already started, or browse every available path below."
                : "Start a course from the Learning Hub and track watched videos automatically."}
            </p>
            <div className="mt-3 flex flex-wrap gap-3 text-sm font-medium text-indigo-100">
              <span>{activeLessons.length} active sections</span>
              <span>{activeCourses.length} active courses</span>
              <span>{completedCourses.length} completed</span>
            </div>
          </div>
          <a
            href="#learning-paths"
            className="whitespace-nowrap rounded-lg bg-white/20 px-6 py-2.5 text-center font-semibold backdrop-blur-md transition-hover hover:bg-white/30"
          >
            Browse Paths
          </a>
        </div>
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
      </section>

      <Lessons
        lessons={lessons}
        progress={progress}
        onProgressRefresh={refreshProgress}
      />

      <AllLearningPaths
        courses={courses}
        progress={progress}
        onProgressRefresh={refreshProgress}
      />

      <YourLearningProgress progress={progress} courses={courses} />

      <LearningImpactOnPerformance progress={progress} />
    </div>
  );
}
