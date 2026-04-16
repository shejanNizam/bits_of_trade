// "use client";

// import {
//   ClockCircleOutlined,
//   CloseOutlined,
//   LockOutlined,
//   PlayCircleFilled,
// } from "@ant-design/icons";
// import { Modal } from "antd";
// import { Lesson } from "./Lessons";

// interface LessonModalProps {
//   lesson: Lesson | null;
//   open: boolean;
//   onClose: () => void;
// }

// export default function LessonModal({
//   lesson,
//   open,
//   onClose,
// }: LessonModalProps) {
//   if (!lesson) return null;

//   const modules = [
//     {
//       id: 1,
//       title: "Understanding Risk Per Trade",
//       time: "16 min",
//       isLocked: false,
//     },
//     { id: 2, title: "Kelly Criterion Basics", time: "7 min", isLocked: true },
//     { id: 3, title: "Fixed Fractional Method", time: "16 min", isLocked: true },
//     {
//       id: 4,
//       title: "Position Size Calculator",
//       time: "11 min",
//       isLocked: true,
//     },
//     { id: 5, title: "Real-World Examples", time: "9 min", isLocked: true },
//   ];

//   return (
//     <Modal
//       open={open}
//       onCancel={onClose}
//       footer={null}
//       width={650}
//       centered
//       // Apply dark mode styles to Ant Design Modal container via global class or inline
//       className="responsive-lesson-modal"
//       closeIcon={
//         <CloseOutlined className="text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors" />
//       }
//       // Ensure the modal content matches the theme
//       styles={{
//         body: {
//           padding: 0,
//           borderRadius: "16px",
//           overflow: "hidden",
//           backgroundColor: "transparent",
//         },
//       }}
//     >
//       <div className=" p-5 sm:p-8 transition-colors duration-300">
//         <div className="flex flex-col gap-6">
//           {/* Header Badges */}
//           <div className="flex flex-wrap gap-2">
//             <span className="bg-red-50 dark:bg-red-900/20 text-red-500 dark:text-red-400 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wide">
//               {lesson.type}
//             </span>
//             <span className="bg-emerald-50 dark:bg-emerald-900/20 text-emerald-500 dark:text-emerald-400 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wide">
//               {lesson.level}
//             </span>
//           </div>

//           {/* Title and Time */}
//           <div className="space-y-2">
//             <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white leading-tight">
//               {lesson.title}
//             </h2>
//             <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500 text-sm font-medium">
//               <ClockCircleOutlined />
//               <span>{lesson.time} total duration</span>
//             </div>
//           </div>

//           {/* Learning Outcome Section */}
//           <div className="bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 rounded-xl p-4 flex items-center gap-4 transition-colors">
//             <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 text-xl border border-indigo-100 dark:border-indigo-800 shadow-sm">
//               🎯
//             </div>
//             <div>
//               <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
//                 Learning Outcome
//               </p>
//               <p className="text-sm sm:text-base font-semibold text-slate-700 dark:text-slate-200">
//                 {lesson.outcome}
//               </p>
//             </div>
//           </div>

//           {/* Insight/Alert Section */}
//           <div className="bg-orange-50 dark:bg-orange-900/10 border border-orange-100 dark:border-orange-900/30 p-4 rounded-xl">
//             <p className="text-xs font-bold text-orange-700 dark:text-orange-400 uppercase tracking-wider">
//               Why you should take this now:
//             </p>
//             <p className="text-sm text-orange-800 dark:text-orange-200/80 font-medium mt-1">
//               {lesson.insight}
//             </p>
//           </div>

//           {/* Modules List */}
//           <div className="space-y-4">
//             <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex justify-between items-center">
//               Course Modules
//               <span className="text-[10px] font-medium text-slate-400">
//                 {modules.length} lessons
//               </span>
//             </h3>
//             <div className="space-y-2.5 max-h-75 overflow-y-auto pr-1 custom-scrollbar">
//               {modules.map((mod) => (
//                 <div
//                   key={mod.id}
//                   className={`flex items-center justify-between p-3 sm:p-4 rounded-xl border transition-all duration-200 ${
//                     mod.isLocked
//                       ? "bg-white dark:bg-slate-900/40 border-slate-100 dark:border-slate-800"
//                       : "bg-indigo-50/40 dark:bg-indigo-900/10 border-indigo-100 dark:border-indigo-900/30 shadow-sm"
//                   }`}
//                 >
//                   <div className="flex items-center gap-3 sm:gap-4">
//                     <div
//                       className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shrink-0 ${
//                         mod.isLocked
//                           ? "bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-600"
//                           : "bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 shadow-sm"
//                       }`}
//                     >
//                       {mod.isLocked ? (
//                         <LockOutlined className="text-sm" />
//                       ) : (
//                         <PlayCircleFilled className="text-lg sm:text-xl" />
//                       )}
//                     </div>
//                     <div>
//                       <h4
//                         className={`text-xs sm:text-sm font-bold leading-none ${mod.isLocked ? "text-slate-400 dark:text-slate-600" : "text-slate-800 dark:text-slate-200"}`}
//                       >
//                         {mod.title}
//                       </h4>
//                       <span className="text-[10px] sm:text-xs text-slate-400 dark:text-slate-500 mt-1 block tracking-tight">
//                         Module {mod.id} • {mod.time}
//                       </span>
//                     </div>
//                   </div>
//                   {mod.isLocked && (
//                     <span className="text-[10px] font-bold text-slate-300 dark:text-slate-700 uppercase tracking-tighter">
//                       Locked
//                     </span>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Footer Actions - Responsive columns on mobile */}
//           <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-slate-100 dark:border-slate-800">
//             <button
//               onClick={onClose}
//               className="order-2 sm:order-1 flex-1 py-3 px-4 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-bold text-sm hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
//             >
//               Close Overview
//             </button>
//             <button className="order-1 sm:order-2 flex-2 py-3 px-4 rounded-xl bg-indigo-600 dark:bg-indigo-500 text-white font-bold text-sm hover:bg-indigo-700 dark:hover:bg-indigo-600 shadow-lg shadow-indigo-200 dark:shadow-none transition-all flex items-center justify-center gap-2 active:scale-[0.98]">
//               <PlayCircleFilled />
//               Start Learning Now
//             </button>
//           </div>
//         </div>
//       </div>
//     </Modal>
//   );
// }

"use client";

import {
  ClockCircleOutlined,
  CloseOutlined,
  LockOutlined,
  PlayCircleFilled,
} from "@ant-design/icons";
import { Modal } from "antd";
import { useState } from "react";
import { CourseProgressAPI } from "../../../learning-hub/page";
import { Lesson } from "./Lessons";

// ─── Props ────────────────────────────────────────────────────────────────────

interface LessonModalProps {
  lesson: Lesson | null;
  open: boolean;
  onClose: () => void;
  token: string;
  progress: CourseProgressAPI[];
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function LessonModal({
  lesson,
  open,
  onClose,
  token,
  progress,
}: LessonModalProps) {
  const [starting, setStarting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  if (!lesson) return null;

  // Check if the user has already started this course
  const existingProgress = progress.find(
    (p) => p.course.id === lesson.courseId,
  );
  const hasStarted = !!existingProgress;
  const watchedIds = new Set(
    existingProgress?.videos_watched.map((v) => v.id) ?? [],
  );

  // ── POST /course-progress/create/ ──────────────────────────────────────────
  async function handleStartLearning() {
    if (hasStarted) {
      // Already started — just close the modal; navigation to player is handled separately
      onClose();
      return;
    }

    setStarting(true);
    setApiError(null);

    try {
      // We need the user id. Decode it from the JWT payload (middle section).
      const payloadBase64 = token.split(".")[1];
      const payload = JSON.parse(atob(payloadBase64));
      const userId: number = payload.user_id;

      const res = await fetch("/api/learninghub/course-progress/create/", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user: userId, course: lesson.courseId }),
      });

      if (!res.ok) {
        const errData = await res.json();
        // 400 with unique_together error means user already enrolled — treat as OK
        const isAlreadyEnrolled =
          res.status === 400 && JSON.stringify(errData).includes("unique set");

        if (!isAlreadyEnrolled) {
          throw new Error(errData?.detail ?? `Error ${res.status}`);
        }
      }

      // Progress created (or already existed). In a real app you'd also
      // navigate to a video player page here, e.g.:
      // router.push(`/courses/${lesson.courseId}`);
      onClose();
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Something went wrong";
      setApiError(message);
    } finally {
      setStarting(false);
    }
  }

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      width={650}
      centered
      className="responsive-lesson-modal"
      closeIcon={
        <CloseOutlined className="text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors" />
      }
      styles={{
        body: {
          padding: 0,
          borderRadius: "16px",
          overflow: "hidden",
          backgroundColor: "transparent",
        },
      }}
    >
      <div className="p-5 sm:p-8 transition-colors duration-300">
        <div className="flex flex-col gap-6">
          {/* Header Badges */}
          <div className="flex flex-wrap gap-2">
            <span className="bg-red-50 dark:bg-red-900/20 text-red-500 dark:text-red-400 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wide">
              {lesson.type}
            </span>
            <span className="bg-emerald-50 dark:bg-emerald-900/20 text-emerald-500 dark:text-emerald-400 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wide">
              {lesson.level}
            </span>
          </div>

          {/* Title and Time */}
          <div className="space-y-2">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white leading-tight">
              {lesson.title}
            </h2>
            <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500 text-sm font-medium">
              <ClockCircleOutlined />
              <span>{lesson.time} total duration</span>
            </div>
          </div>

          {/* Learning Outcome */}
          <div className="bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 rounded-xl p-4 flex items-center gap-4 transition-colors">
            <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 text-xl border border-indigo-100 dark:border-indigo-800 shadow-sm">
              🎯
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                Learning Outcome
              </p>
              <p className="text-sm sm:text-base font-semibold text-slate-700 dark:text-slate-200">
                {lesson.outcome}
              </p>
            </div>
          </div>

          {/* Insight / Why Now */}
          <div className="bg-orange-50 dark:bg-orange-900/10 border border-orange-100 dark:border-orange-900/30 p-4 rounded-xl">
            <p className="text-xs font-bold text-orange-700 dark:text-orange-400 uppercase tracking-wider">
              Why you should take this now:
            </p>
            <p className="text-sm text-orange-800 dark:text-orange-200/80 font-medium mt-1">
              {lesson.insight}
            </p>
          </div>

          {/* Modules List — built from real API videos */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex justify-between items-center">
              Course Modules
              <span className="text-[10px] font-medium text-slate-400">
                {lesson.videos.length} lesson
                {lesson.videos.length !== 1 ? "s" : ""}
              </span>
            </h3>

            {lesson.videos.length === 0 ? (
              <p className="text-sm text-slate-400 dark:text-slate-500">
                No videos uploaded yet.
              </p>
            ) : (
              <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1 custom-scrollbar">
                {lesson.videos.map((video, idx) => {
                  // A video is "watched" if its id is in the watched set
                  const isWatched = watchedIds.has(video.id);
                  // First unwatched video is "current"
                  const firstUnwatchedIdx = lesson.videos.findIndex(
                    (v) => !watchedIds.has(v.id),
                  );
                  const isCurrent = idx === firstUnwatchedIdx;
                  // A video is locked if it's not free AND not watched AND it's after the current
                  const isLocked =
                    !video.is_free && !isWatched && idx > firstUnwatchedIdx;

                  return (
                    <div
                      key={video.id}
                      className={`flex items-center justify-between p-3 sm:p-4 rounded-xl border transition-all duration-200 ${
                        isLocked
                          ? "bg-white dark:bg-slate-900/40 border-slate-100 dark:border-slate-800 opacity-60"
                          : isCurrent
                            ? "bg-indigo-50/40 dark:bg-indigo-900/10 border-indigo-100 dark:border-indigo-900/30 shadow-sm"
                            : "bg-emerald-50/30 dark:bg-emerald-900/10 border-emerald-100 dark:border-emerald-900/20"
                      }`}
                    >
                      <div className="flex items-center gap-3 sm:gap-4">
                        <div
                          className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shrink-0 ${
                            isLocked
                              ? "bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-600"
                              : isCurrent
                                ? "bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 shadow-sm"
                                : "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600"
                          }`}
                        >
                          {isLocked ? (
                            <LockOutlined className="text-sm" />
                          ) : (
                            <PlayCircleFilled className="text-lg sm:text-xl" />
                          )}
                        </div>
                        <div>
                          <h4
                            className={`text-xs sm:text-sm font-bold leading-none ${
                              isLocked
                                ? "text-slate-400 dark:text-slate-600"
                                : "text-slate-800 dark:text-slate-200"
                            }`}
                          >
                            {video.title}
                          </h4>
                          <span className="text-[10px] sm:text-xs text-slate-400 dark:text-slate-500 mt-1 block tracking-tight">
                            Module {idx + 1}
                            {video.description ? ` • ${video.description}` : ""}
                          </span>
                        </div>
                      </div>
                      {isLocked && (
                        <span className="text-[10px] font-bold text-slate-300 dark:text-slate-700 uppercase tracking-tighter">
                          Locked
                        </span>
                      )}
                      {isWatched && !isCurrent && (
                        <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-tighter">
                          Done
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* API Error */}
          {apiError && (
            <p className="text-xs text-red-500 font-medium">{apiError}</p>
          )}

          {/* Footer Actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={onClose}
              className="order-2 sm:order-1 flex-1 py-3 px-4 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-bold text-sm hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              Close Overview
            </button>
            <button
              onClick={handleStartLearning}
              disabled={starting}
              className="order-1 sm:order-2 flex-2 py-3 px-4 rounded-xl bg-indigo-600 dark:bg-indigo-500 text-white font-bold text-sm hover:bg-indigo-700 dark:hover:bg-indigo-600 shadow-lg shadow-indigo-200 dark:shadow-none transition-all flex items-center justify-center gap-2 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <PlayCircleFilled />
              {starting
                ? "Starting…"
                : hasStarted
                  ? "Continue Learning"
                  : "Start Learning Now"}
            </button>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 10px;
        }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #334155;
        }
        .dark .ant-modal-content {
          background-color: #0f172a !important;
        }
      `}</style>
    </Modal>
  );
}
