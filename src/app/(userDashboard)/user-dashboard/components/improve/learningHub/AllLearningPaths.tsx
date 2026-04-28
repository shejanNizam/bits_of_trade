"use client";

import {
  CourseAPI,
  CourseProgressAPI,
} from "@/redux/features/learninghub/learninghubApi";
import {
  ClockCircleOutlined,
  PlayCircleFilled,
  ReadOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import LearningPathModal from "./LearningPathModal";

export interface LearningPath {
  courseId: number;
  title: string;
  tag: string;
  level: string;
  modules: number;
  completed: number;
  time: string;
  color: string;
  about: string | null;
  description: string | null;
  videos: CourseAPI["videos"];
  watchedIds: Set<number>;
}

const TYPE_COLORS: Record<string, string> = {
  "risk management": "text-red-500 bg-red-50 dark:bg-red-900/20",
  psychology: "text-purple-500 bg-purple-50 dark:bg-purple-900/20",
  technical: "text-blue-500 bg-blue-50 dark:bg-blue-900/20",
  strategy: "text-emerald-500 bg-emerald-50 dark:bg-emerald-900/20",
  general: "text-indigo-500 bg-indigo-50 dark:bg-indigo-900/20",
};

function colorForType(type: string): string {
  return (
    TYPE_COLORS[type.toLowerCase()] ??
    "text-slate-500 bg-slate-100 dark:bg-slate-800"
  );
}

function formatLabel(value: string): string {
  return value
    .replace(/[_-]/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

interface AllLearningPathsProps {
  courses: CourseAPI[];
  progress: CourseProgressAPI[];
  onProgressRefresh: () => Promise<CourseProgressAPI[] | undefined>;
}

export default function AllLearningPaths({
  courses,
  progress,
  onProgressRefresh,
}: AllLearningPathsProps) {
  const [selectedPath, setSelectedPath] = useState<LearningPath | null>(null);

  const paths: LearningPath[] = courses
    .filter((course) => course.is_active)
    .map((course) => {
      const courseProgress = progress.find((p) => p.course.id === course.id);
      const watchedIds = new Set<number>(
        courseProgress?.videos_watched.map((v) => v.id) ?? [],
      );
      const activeVideos = course.videos.filter((video) => video.is_active);
      const completedCount = activeVideos.filter((video) =>
        watchedIds.has(video.id),
      ).length;
      const totalCount = activeVideos.length;

      return {
        courseId: course.id,
        title: course.title,
        tag: formatLabel(course.course_type),
        level: formatLabel(course.course_level),
        modules: totalCount,
        completed: completedCount,
        time:
          totalCount > 0
            ? `${totalCount} video${totalCount !== 1 ? "s" : ""}`
            : "No videos",
        color: colorForType(course.course_type),
        about: course.about,
        description: course.description,
        videos: activeVideos,
        watchedIds,
      };
    });

  if (paths.length === 0) {
    return (
      <section id="learning-paths" className="p-4 sm:p-6">
        <h2 className="mb-6 text-2xl font-bold text-slate-900 dark:text-white">
          All Learning Paths
        </h2>
        <p className="text-sm text-slate-400 dark:text-slate-500">
          No learning paths available yet.
        </p>
      </section>
    );
  }

  return (
    <section id="learning-paths" className="p-4 sm:p-6">
      <h2 className="mb-6 text-2xl font-bold text-slate-900 dark:text-white">
        All Learning Paths
      </h2>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {paths.map((path) => {
          const percentage =
            path.modules > 0
              ? Math.round((path.completed / path.modules) * 100)
              : 0;

          return (
            <div
              key={path.courseId}
              className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 transition-colors"
            >
              <div className="flex justify-between items-start mb-4">
                <span
                  className={`rounded-md px-2 py-1 text-xs font-bold ${path.color}`}
                >
                  {path.tag}
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  {path.level}
                </span>
              </div>

              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
                {path.title}
              </h3>

              <div className="flex flex-wrap gap-4 mb-6 text-sm text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1">
                  <ReadOutlined />
                  {path.modules} module{path.modules !== 1 ? "s" : ""}
                </span>
                <span className="flex items-center gap-1">
                  <ClockCircleOutlined />
                  {path.time}
                </span>
              </div>

              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-xs font-bold text-slate-500">
                  <span>Progress</span>
                  <span>
                    {path.completed} / {path.modules}
                  </span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div
                    className="h-full bg-teal-500 transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>

              <button
                onClick={() => setSelectedPath(path)}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 py-2.5 text-sm font-bold text-slate-600 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 active:scale-[0.98]"
              >
                <PlayCircleFilled />
                {path.completed > 0 ? "Continue Learning" : "Start Path"}
              </button>
            </div>
          );
        })}
      </div>

      <LearningPathModal
        path={selectedPath}
        open={!!selectedPath}
        onClose={() => setSelectedPath(null)}
        progress={progress}
        onProgressRefresh={onProgressRefresh}
      />
    </section>
  );
}
