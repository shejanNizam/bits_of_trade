"use client";

import {
  CourseAPI,
  CourseProgressAPI,
  LearningLessonAPI,
} from "@/redux/features/learninghub/learninghubApi";
import { PlayCircleFilled } from "@ant-design/icons";
import { useState } from "react";
import LessonModal from "./LessonModal";

// ─── Public lesson type used by LessonModal ───────────────────────────────────

export interface Lesson {
  courseId: number;
  title: string;
  type: string; // course_type
  level: string; // course_level
  time: string; // derived from video count
  outcome: string; // about field
  insight: string; // description field
  about: string | null;
  videos: CourseAPI["videos"];
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function deriveTime(videos: CourseAPI["videos"]): string {
  const count = videos.length;
  if (count === 0) return "—";
  return `${count} video${count !== 1 ? "s" : ""}`;
}

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// ─── Props ────────────────────────────────────────────────────────────────────

interface LessonsProps {
  lessons: LearningLessonAPI[];
  progress: CourseProgressAPI[];
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function Lessons({ lessons, progress }: LessonsProps) {
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  console.log(lessons);

  const sections = lessons
    ?.filter((l) => l.is_active)
    ?.map((l) => ({
      category: l.title,
      lessons: l.courses
        .filter((c) => c.is_active)
        .map(
          (c): Lesson => ({
            courseId: c.id,
            title: c.title,
            type: capitalize(c.course_type),
            level: capitalize(c.course_level),
            time: deriveTime(c.videos),
            outcome: c.about ?? "Complete this course to level up your skills.",
            insight:
              c.description ??
              "This course is recommended based on your recent activity.",
            about: c.about,
            videos: c.videos,
          }),
        ),
    }));

  if (sections.length === 0) {
    return (
      <div className="p-6 text-center text-slate-400 dark:text-slate-500">
        No lessons available yet.
      </div>
    );
  }

  return (
    <div className="p-6 space-y-12">
      {sections.map((section, idx) => (
        <section key={idx} className="space-y-6">
          <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">
            {section.category}
          </h2>

          {section.lessons.length === 0 ? (
            <p className="text-sm text-slate-400 dark:text-slate-500">
              No courses in this section yet.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {section.lessons.map((lesson, lIdx) => {
                const courseProgress = progress.find(
                  (p) => p.course.id === lesson.courseId,
                );
                return (
                  <LessonCard
                    key={`${idx}-${lIdx}`}
                    lesson={lesson}
                    courseProgress={courseProgress}
                    onStart={() => setSelectedLesson(lesson)}
                  />
                );
              })}
            </div>
          )}
        </section>
      ))}

      <LessonModal
        lesson={selectedLesson}
        open={!!selectedLesson}
        onClose={() => setSelectedLesson(null)}
        progress={progress}
      />
    </div>
  );
}

// ─── Lesson Card ──────────────────────────────────────────────────────────────

function LessonCard({
  lesson,
  courseProgress,
  onStart,
}: {
  lesson: Lesson;
  courseProgress: CourseProgressAPI | undefined;
  onStart: () => void;
}) {
  const hasStarted = !!courseProgress;
  const percentage = courseProgress?.completion_percentage ?? 0;

  return (
    <div className="flex flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
      {/* Type & Level badges */}
      <div className="flex items-center justify-between mb-4">
        <span className="rounded-md bg-indigo-50 px-2 py-1 text-xs font-semibold text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400">
          {lesson.type}
        </span>
        <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
          {lesson.level}
        </span>
      </div>

      {/* Title */}
      <h4 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">
        {lesson.title}
      </h4>
      <p className="mt-1 text-sm text-slate-400">🕒 {lesson.time}</p>

      {/* Progress bar — only shown if user has started */}
      {hasStarted && (
        <div className="mt-3 space-y-1">
          <div className="flex justify-between text-[10px] font-bold text-slate-400">
            <span>Progress</span>
            <span>{Math.round(percentage)}%</span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
            <div
              className="h-full bg-indigo-500 transition-all duration-500"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
      )}

      {/* Outcome & insight */}
      <div className="mt-6 space-y-4">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Outcome
          </p>
          <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
            {lesson.outcome}
          </p>
        </div>

        <div className="rounded-lg border-l-4 border-orange-400 bg-orange-50 p-3 dark:bg-orange-900/10">
          <p className="text-[10px] font-bold uppercase tracking-wider text-orange-600 dark:text-orange-400">
            Why Now:
          </p>
          <p className="text-xs text-orange-800 dark:text-orange-200">
            {lesson.insight}
          </p>
        </div>
      </div>

      <button
        onClick={onStart}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 py-2.5 text-sm font-bold text-white transition-all hover:bg-indigo-700 active:scale-[0.98]"
      >
        <PlayCircleFilled />
        {hasStarted ? "Continue Learning" : "Start Learning"}
      </button>
    </div>
  );
}
