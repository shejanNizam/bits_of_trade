/* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import { useState } from "react";
// import LearningPathModal from "./LearningPathModal";

// // Exported interface for child component type safety
// export interface LearningPath {
//   title: string;
//   tag: string;
//   level: string;
//   modules: number;
//   completed: number;
//   time: string;
//   color: string;
// }

// const PATHS: LearningPath[] = [
//   {
//     title: "Complete Risk Management",
//     tag: "Risk Management",
//     level: "Beginner",
//     modules: 8,
//     completed: 5,
//     time: "2h 30min",
//     color: "text-red-500 bg-red-50 dark:bg-red-900/20",
//   },
//   {
//     title: "Trading Psychology Mastery",
//     tag: "Psychology",
//     level: "Intermediate",
//     modules: 12,
//     completed: 3,
//     time: "3h 45min",
//     color: "text-purple-500 bg-purple-50 dark:bg-purple-900/20",
//   },
//   {
//     title: "Technical Analysis Pro",
//     tag: "Technical",
//     level: "Advanced",
//     modules: 15,
//     completed: 0,
//     time: "5h 20min",
//     color: "text-blue-500 bg-blue-50 dark:bg-blue-900/20",
//   },
//   {
//     title: "Strategy Building Framework",
//     tag: "Strategy",
//     level: "Intermediate",
//     modules: 10,
//     completed: 7,
//     time: "3h 15min",
//     color: "text-emerald-500 bg-emerald-50 dark:bg-emerald-900/20",
//   },
// ];

// export default function AllLearningPaths() {
//   const [selectedPath, setSelectedPath] = useState<LearningPath | null>(null);

//   const handleOpenModal = (path: LearningPath) => {
//     setSelectedPath(path);
//   };

//   return (
//     <section className="p-4 sm:p-6">
//       <h2 className="mb-6 text-2xl font-bold text-slate-900 dark:text-white">
//         All Learning Paths
//       </h2>
//       <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
//         {PATHS.map((path, i) => (
//           <div
//             key={i}
//             className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 transition-colors"
//           >
//             <div className="flex justify-between items-start mb-4">
//               <span
//                 className={`rounded-md px-2 py-1 text-xs font-bold ${path.color}`}
//               >
//                 {path.tag}
//               </span>
//               <span className="text-xs text-slate-400 font-medium">
//                 {path.level}
//               </span>
//             </div>

//             <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
//               {path.title}
//             </h3>

//             <div className="flex gap-4 mb-6 text-sm text-slate-500 dark:text-slate-400">
//               <span className="flex items-center gap-1">
//                 📖 {path.modules} modules
//               </span>
//               <span className="flex items-center gap-1">🕒 {path.time}</span>
//             </div>

//             <div className="space-y-2 mb-6">
//               <div className="flex justify-between text-xs font-bold text-slate-500">
//                 <span>Progress</span>
//                 <span>
//                   {path.completed} / {path.modules}
//                 </span>
//               </div>
//               <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
//                 <div
//                   className="h-full bg-teal-500 transition-all duration-500"
//                   style={{ width: `${(path.completed / path.modules) * 100}%` }}
//                 />
//               </div>
//             </div>

//             <button
//               onClick={() => handleOpenModal(path)}
//               className="w-full rounded-xl border border-slate-200 py-2.5 text-sm font-bold text-slate-600 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 active:scale-[0.98]"
//             >
//               {path.completed > 0 ? "Continue Learning" : "Start Path"}
//             </button>
//           </div>
//         ))}
//       </div>

//       <LearningPathModal
//         path={selectedPath}
//         open={!!selectedPath}
//         onClose={() => setSelectedPath(null)}
//       />
//     </section>
//   );
// }

"use client";

import { useGetAllCoursesQuery } from "@/redux/features/learninghub/learninghubApi";
import { useMemo, useState } from "react";
import LearningPathModal from "./LearningPathModal";

interface Video {
  id: number;
  title: string;
  video: string;
  is_free: boolean;
  is_complete: boolean;
  is_active: boolean;
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

export interface LearningPath {
  id: number;
  title: string;
  tag: string;
  level: string;
  modules: number;
  completed: number;
  time: string;
  color: string;
  description?: string;
}

interface AllLearningPathsProps {
  userProgress?: any[];
}

export default function AllLearningPaths({
  userProgress = [],
}: AllLearningPathsProps) {
  const [selectedPath, setSelectedPath] = useState<LearningPath | null>(null);
  const { data: coursesResponse, isLoading, error } = useGetAllCoursesQuery({});

  // Extract courses from response (handle both array and paginated response)
  const courses = useMemo(() => {
    if (!coursesResponse) return [];
    // Check if response has results array (paginated) or is directly an array
    if (Array.isArray(coursesResponse)) {
      return coursesResponse;
    }
    if (coursesResponse.results && Array.isArray(coursesResponse.results)) {
      return coursesResponse.results;
    }
    return [];
  }, [coursesResponse]);

  // Create progress map for quick lookup
  const progressMap = useMemo(() => {
    const map = new Map();
    if (Array.isArray(userProgress)) {
      userProgress.forEach((progress: any) => {
        if (progress.course?.id) {
          map.set(progress.course.id, progress);
        }
      });
    }
    return map;
  }, [userProgress]);

  // Transform courses to LearningPath format
  const learningPaths: LearningPath[] = useMemo(() => {
    // Colors for different courses
    const colors = [
      "text-red-500 bg-red-50 dark:bg-red-900/20",
      "text-purple-500 bg-purple-50 dark:bg-purple-900/20",
      "text-blue-500 bg-blue-50 dark:bg-blue-900/20",
      "text-emerald-500 bg-emerald-50 dark:bg-emerald-900/20",
      "text-orange-500 bg-orange-50 dark:bg-orange-900/20",
      "text-teal-500 bg-teal-50 dark:bg-teal-900/20",
      "text-pink-500 bg-pink-50 dark:bg-pink-900/20",
      "text-indigo-500 bg-indigo-50 dark:bg-indigo-900/20",
    ];

    if (!courses.length) return [];

    return courses
      .filter((course: Course) => course.is_active === true)
      .map((course: Course, index: number) => {
        const progress = progressMap.get(course.id);
        const totalVideos = course.videos?.length || 0;
        const completedVideos = progress?.completed_videos || 0;

        // Estimate time based on number of videos (average 15 min per video)
        const estimatedTime = totalVideos * 15;
        const hours = Math.floor(estimatedTime / 60);
        const minutes = estimatedTime % 60;
        const timeString =
          hours > 0 ? `${hours}h ${minutes}min` : `${minutes}min`;

        return {
          id: course.id,
          title: course.title,
          tag: course.course_type?.toUpperCase() || "TRADING",
          level:
            course.course_level?.charAt(0).toUpperCase() +
              course.course_level?.slice(1) || "Beginner",
          modules: totalVideos,
          completed: completedVideos,
          time: timeString,
          color: colors[index % colors.length],
          description: course.about || course.description,
        };
      });
  }, [courses, progressMap]);

  if (isLoading) {
    return (
      <section className="p-4 sm:p-6">
        <h2 className="mb-6 text-2xl font-bold text-slate-900 dark:text-white">
          All Learning Paths
        </h2>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="p-4 sm:p-6">
        <h2 className="mb-6 text-2xl font-bold text-slate-900 dark:text-white">
          All Learning Paths
        </h2>
        <div className="text-center py-12 text-red-500">
          <p>Failed to load learning paths. Please try again later.</p>
        </div>
      </section>
    );
  }

  const handleOpenModal = (path: LearningPath) => {
    setSelectedPath(path);
  };

  return (
    <section className="p-4 sm:p-6">
      <h2 className="mb-6 text-2xl font-bold text-slate-900 dark:text-white">
        All Learning Paths
      </h2>
      {learningPaths.length === 0 ? (
        <div className="text-center py-12 text-slate-500 dark:text-slate-400">
          No learning paths available yet. Check back soon!
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {learningPaths.map((path) => (
            <div
              key={path.id}
              className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 transition-colors hover:shadow-lg"
            >
              <div className="flex justify-between items-start mb-4">
                <span
                  className={`rounded-md px-2 py-1 text-xs font-bold ${path.color}`}
                >
                  {path.tag}
                </span>
                <span className="text-xs text-slate-400 font-medium uppercase">
                  {path.level}
                </span>
              </div>

              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                {path.title}
              </h3>
              {path.description && (
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 line-clamp-2">
                  {path.description}
                </p>
              )}

              <div className="flex gap-4 mb-6 text-sm text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1">
                  📖 {path.modules} {path.modules === 1 ? "module" : "modules"}
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
                    style={{
                      width: `${(path.completed / path.modules) * 100}%`,
                    }}
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
      )}

      <LearningPathModal
        path={selectedPath}
        open={!!selectedPath}
        onClose={() => setSelectedPath(null)}
      />
    </section>
  );
}
