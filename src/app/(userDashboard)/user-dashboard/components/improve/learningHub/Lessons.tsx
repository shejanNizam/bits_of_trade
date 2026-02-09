"use client";

import { PlayCircleFilled } from "@ant-design/icons";
import { useState } from "react";
import LessonModal from "./LessonModal";

// 1. Interface definitions for type safety
export interface Lesson {
  title: string;
  type: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  time: string;
  outcome: string;
  insight: string;
  color: string;
}

interface LessonCategory {
  category: string;
  lessons: Lesson[];
}

const LESSON_DATA: LessonCategory[] = [
  {
    category: "Risk Management",
    lessons: [
      {
        title: "Position Sizing Fundamentals",
        type: "Risk Management",
        level: "Beginner",
        time: "15 min",
        outcome: "Master proper position sizing techniques",
        insight: "Your average loss size increased by 12% recently",
        color: "blue",
      },
      {
        title: "Breakout Confirmation System",
        type: "Psychology",
        level: "Intermediate",
        time: "20 min",
        outcome: "Reduce false breakout entries by 40%",
        insight: "You had 4 false breakouts in last 10 trades",
        color: "purple",
      },
      {
        title: "Trend Following Framework",
        type: "Technical",
        level: "Beginner",
        time: "10 min",
        outcome: "Align entries with dominant trend direction",
        insight: "Your counter-trend trades show 62% loss rate",
        color: "orange",
      },
    ],
  },
  { category: "Psychology Lessons", lessons: [] },
  { category: "Technical Analysis Lessons", lessons: [] },
  { category: "Data Science Lessons", lessons: [] },
];

export default function Lessons() {
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);

  // Use the first category's lessons as a fallback for empty sections
  const demoLessons = LESSON_DATA[0].lessons;

  return (
    <div className="p-6 space-y-12">
      {LESSON_DATA.map((section, idx) => (
        <section key={idx} className="space-y-6">
          <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">
            {section.category}
          </h2>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {(section.lessons.length > 0 ? section.lessons : demoLessons).map(
              (lesson, lIdx) => (
                <LessonCard
                  key={`${idx}-${lIdx}`}
                  lesson={lesson}
                  onStart={() => setSelectedLesson(lesson)}
                />
              ),
            )}
          </div>
        </section>
      ))}

      {/* Separate Modal Component */}
      <LessonModal
        lesson={selectedLesson}
        open={!!selectedLesson}
        onClose={() => setSelectedLesson(null)}
      />
    </div>
  );
}

function LessonCard({
  lesson,
  onStart,
}: {
  lesson: Lesson;
  onStart: () => void;
}) {
  return (
    <div className="flex flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-center justify-between mb-4">
        <span className="rounded-md bg-indigo-50 px-2 py-1 text-xs font-semibold text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400">
          {lesson.type}
        </span>
        <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
          {lesson.level}
        </span>
      </div>

      <h4 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">
        {lesson.title}
      </h4>
      <p className="mt-1 text-sm text-slate-400">🕒 {lesson.time}</p>

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
        Start Learning
      </button>
    </div>
  );
}
