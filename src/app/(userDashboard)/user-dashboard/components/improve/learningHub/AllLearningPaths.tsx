"use client";

import { useState } from "react";
import LearningPathModal from "./LearningPathModal";

// Exported interface for child component type safety
export interface LearningPath {
  title: string;
  tag: string;
  level: string;
  modules: number;
  completed: number;
  time: string;
  color: string;
}

const PATHS: LearningPath[] = [
  {
    title: "Complete Risk Management",
    tag: "Risk Management",
    level: "Beginner",
    modules: 8,
    completed: 5,
    time: "2h 30min",
    color: "text-red-500 bg-red-50 dark:bg-red-900/20",
  },
  {
    title: "Trading Psychology Mastery",
    tag: "Psychology",
    level: "Intermediate",
    modules: 12,
    completed: 3,
    time: "3h 45min",
    color: "text-purple-500 bg-purple-50 dark:bg-purple-900/20",
  },
  {
    title: "Technical Analysis Pro",
    tag: "Technical",
    level: "Advanced",
    modules: 15,
    completed: 0,
    time: "5h 20min",
    color: "text-blue-500 bg-blue-50 dark:bg-blue-900/20",
  },
  {
    title: "Strategy Building Framework",
    tag: "Strategy",
    level: "Intermediate",
    modules: 10,
    completed: 7,
    time: "3h 15min",
    color: "text-emerald-500 bg-emerald-50 dark:bg-emerald-900/20",
  },
];

export default function AllLearningPaths() {
  const [selectedPath, setSelectedPath] = useState<LearningPath | null>(null);

  const handleOpenModal = (path: LearningPath) => {
    setSelectedPath(path);
  };

  return (
    <section className="p-4 sm:p-6">
      <h2 className="mb-6 text-2xl font-bold text-slate-900 dark:text-white">
        All Learning Paths
      </h2>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {PATHS.map((path, i) => (
          <div
            key={i}
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

            <div className="flex gap-4 mb-6 text-sm text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1">
                📖 {path.modules} modules
              </span>
              <span className="flex items-center gap-1">🕒 {path.time}</span>
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
                  style={{ width: `${(path.completed / path.modules) * 100}%` }}
                />
              </div>
            </div>

            <button
              onClick={() => handleOpenModal(path)}
              className="w-full rounded-xl border border-slate-200 py-2.5 text-sm font-bold text-slate-600 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 active:scale-[0.98]"
            >
              {path.completed > 0 ? "Continue Learning" : "Start Path"}
            </button>
          </div>
        ))}
      </div>

      <LearningPathModal
        path={selectedPath}
        open={!!selectedPath}
        onClose={() => setSelectedPath(null)}
      />
    </section>
  );
}
