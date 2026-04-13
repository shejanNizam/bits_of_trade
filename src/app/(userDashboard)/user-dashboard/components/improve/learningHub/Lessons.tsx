// "use client";

// import { PlayCircleFilled } from "@ant-design/icons";
// import { useState } from "react";
// import LessonModal from "./LessonModal";

// // 1. Interface definitions for type safety
// export interface Lesson {
//   title: string;
//   type: string;
//   level: "Beginner" | "Intermediate" | "Advanced";
//   time: string;
//   outcome: string;
//   insight: string;
//   color: string;
// }

// interface LessonCategory {
//   category: string;
//   lessons: Lesson[];
// }

// const LESSON_DATA: LessonCategory[] = [
//   {
//     category: "Risk Management",
//     lessons: [
//       {
//         title: "Position Sizing Fundamentals",
//         type: "Risk Management",
//         level: "Beginner",
//         time: "15 min",
//         outcome: "Master proper position sizing techniques",
//         insight: "Your average loss size increased by 12% recently",
//         color: "blue",
//       },
//       {
//         title: "Breakout Confirmation System",
//         type: "Psychology",
//         level: "Intermediate",
//         time: "20 min",
//         outcome: "Reduce false breakout entries by 40%",
//         insight: "You had 4 false breakouts in last 10 trades",
//         color: "purple",
//       },
//       {
//         title: "Trend Following Framework",
//         type: "Technical",
//         level: "Beginner",
//         time: "10 min",
//         outcome: "Align entries with dominant trend direction",
//         insight: "Your counter-trend trades show 62% loss rate",
//         color: "orange",
//       },
//     ],
//   },
//   { category: "Psychology Lessons", lessons: [] },
//   { category: "Technical Analysis Lessons", lessons: [] },
//   { category: "Data Science Lessons", lessons: [] },
// ];

// export default function Lessons() {
//   const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);

//   // Use the first category's lessons as a fallback for empty sections
//   const demoLessons = LESSON_DATA[0].lessons;

//   return (
//     <div className="p-6 space-y-12">
//       {LESSON_DATA.map((section, idx) => (
//         <section key={idx} className="space-y-6">
//           <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">
//             {section.category}
//           </h2>

//           <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
//             {(section.lessons.length > 0 ? section.lessons : demoLessons).map(
//               (lesson, lIdx) => (
//                 <LessonCard
//                   key={`${idx}-${lIdx}`}
//                   lesson={lesson}
//                   onStart={() => setSelectedLesson(lesson)}
//                 />
//               ),
//             )}
//           </div>
//         </section>
//       ))}

//       {/* Separate Modal Component */}
//       <LessonModal
//         lesson={selectedLesson}
//         open={!!selectedLesson}
//         onClose={() => setSelectedLesson(null)}
//       />
//     </div>
//   );
// }

// function LessonCard({
//   lesson,
//   onStart,
// }: {
//   lesson: Lesson;
//   onStart: () => void;
// }) {
//   return (
//     <div className="flex flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
//       <div className="flex items-center justify-between mb-4">
//         <span className="rounded-md bg-indigo-50 px-2 py-1 text-xs font-semibold text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400">
//           {lesson.type}
//         </span>
//         <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
//           {lesson.level}
//         </span>
//       </div>

//       <h4 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">
//         {lesson.title}
//       </h4>
//       <p className="mt-1 text-sm text-slate-400">🕒 {lesson.time}</p>

//       <div className="mt-6 space-y-4">
//         <div>
//           <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
//             Outcome
//           </p>
//           <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
//             {lesson.outcome}
//           </p>
//         </div>

//         <div className="rounded-lg border-l-4 border-orange-400 bg-orange-50 p-3 dark:bg-orange-900/10">
//           <p className="text-[10px] font-bold uppercase tracking-wider text-orange-600 dark:text-orange-400">
//             Why Now:
//           </p>
//           <p className="text-xs text-orange-800 dark:text-orange-200">
//             {lesson.insight}
//           </p>
//         </div>
//       </div>

//       <button
//         onClick={onStart}
//         className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 py-2.5 text-sm font-bold text-white transition-all hover:bg-indigo-700 active:scale-[0.98]"
//       >
//         <PlayCircleFilled />
//         Start Learning
//       </button>
//     </div>
//   );
// }

"use client";

import { PlayCircleFilled } from "@ant-design/icons";
import { useMemo, useState } from "react";
import LessonModal from "./LessonModal";

interface Video {
  id: number;
  title: string;
  video: string;
  is_free: boolean;
  is_complete: boolean;
  is_active: boolean;
  description?: string;
}

interface Course {
  id: number;
  title: string;
  about: string;
  description: string;
  course_type: string;
  course_level: string;
  is_active: boolean;
  videos: Video[];
}

interface LearningLesson {
  id: number;
  title: string;
  description: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  courses: Course[];
}

interface LessonsProps {
  lessons: LearningLesson[];
}

export default function Lessons({ lessons }: LessonsProps) {
  const [selectedLesson, setSelectedLesson] = useState<LearningLesson | null>(
    null,
  );

  // Ensure lessons is an array
  const lessonsArray = Array.isArray(lessons) ? lessons : [];

  // Group lessons by category based on course types
  const lessonCategories = useMemo(() => {
    const categories = [
      {
        category: "Risk Management",
        lessons: lessonsArray.filter(
          (l) =>
            l.title?.toLowerCase().includes("risk") ||
            l.courses?.some((c) => c.course_type === "risk"),
        ),
      },
      {
        category: "Psychology Lessons",
        lessons: lessonsArray.filter(
          (l) =>
            l.title?.toLowerCase().includes("psychology") ||
            l.courses?.some((c) => c.course_type === "psychology"),
        ),
      },
      {
        category: "Technical Analysis",
        lessons: lessonsArray.filter(
          (l) =>
            l.title?.toLowerCase().includes("technical") ||
            l.courses?.some((c) => c.course_type === "technical"),
        ),
      },
      {
        category: "All Lessons",
        lessons: lessonsArray,
      },
    ];

    return categories.filter((cat) => cat.lessons.length > 0);
  }, [lessonsArray]);

  const getColorForLesson = (title: string) => {
    if (title?.toLowerCase().includes("risk")) return "blue";
    if (title?.toLowerCase().includes("psychology")) return "purple";
    if (title?.toLowerCase().includes("technical")) return "orange";
    return "emerald";
  };

  const getTotalVideos = (lesson: LearningLesson) => {
    return (
      lesson.courses?.reduce(
        (total, course) => total + (course.videos?.length || 0),
        0,
      ) || 0
    );
  };

  const getTotalCourses = (lesson: LearningLesson) => {
    return lesson.courses?.length || 0;
  };

  if (lessonsArray.length === 0) {
    return (
      <div className="p-6 text-center">
        <p className="text-slate-500 dark:text-slate-400">
          No lessons available yet. Check back soon!
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-12">
      {lessonCategories.map((section, idx) => (
        <section key={idx} className="space-y-6">
          <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">
            {section.category}
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {section.lessons.map((lesson) => (
              <LessonCard
                key={lesson.id}
                lesson={lesson}
                color={getColorForLesson(lesson.title)}
                totalVideos={getTotalVideos(lesson)}
                totalCourses={getTotalCourses(lesson)}
                onStart={() => setSelectedLesson(lesson)}
              />
            ))}
          </div>
        </section>
      ))}

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
  color,
  totalVideos,
  totalCourses,
  onStart,
}: {
  lesson: LearningLesson;
  color: string;
  totalVideos: number;
  totalCourses: number;
  onStart: () => void;
}) {
  const colorClasses: Record<string, string> = {
    blue: "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
    purple:
      "bg-purple-50 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400",
    orange:
      "bg-orange-50 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400",
    emerald:
      "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400",
  };

  return (
    <div className="flex flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-center justify-between mb-4">
        <span
          className={`rounded-md px-2 py-1 text-xs font-semibold ${colorClasses[color]}`}
        >
          {totalCourses} {totalCourses === 1 ? "Course" : "Courses"}
        </span>
        <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
          {totalVideos} {totalVideos === 1 ? "Video" : "Videos"}
        </span>
      </div>

      <h4 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">
        {lesson.title}
      </h4>
      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 line-clamp-2">
        {lesson.description || "No description available"}
      </p>

      {lesson.courses && lesson.courses.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {lesson.courses.slice(0, 2).map((course) => (
            <span
              key={course.id}
              className="text-xs px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded text-slate-600 dark:text-slate-400 truncate max-w-[150px]"
              title={course.title}
            >
              {course.title}
            </span>
          ))}
          {totalCourses > 2 && (
            <span className="text-xs px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded text-slate-600 dark:text-slate-400">
              +{totalCourses - 2} more
            </span>
          )}
        </div>
      )}

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
