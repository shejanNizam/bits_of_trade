// "use client";

// import {
//   CheckCircleFilled,
//   ClockCircleOutlined,
//   CloseOutlined,
//   LockOutlined,
//   PlayCircleFilled,
// } from "@ant-design/icons";
// import { Modal, Progress } from "antd";
// import { LearningPath } from "./AllLearningPaths";

// interface LearningPathModalProps {
//   path: LearningPath | null;
//   open: boolean;
//   onClose: () => void;
// }

// // Internal interface for module state
// interface ModuleItem {
//   id: number;
//   title: string;
//   time: string;
//   status: "Completed" | "Current" | "Locked";
// }

// export default function LearningPathModal({
//   path,
//   open,
//   onClose,
// }: LearningPathModalProps) {
//   if (!path) return null;

//   const percentage = Math.round((path.completed / path.modules) * 100);

//   // Mock data mapped to the UI requirements
//   const modules: ModuleItem[] = [
//     {
//       id: 1,
//       title: "Introduction to Risk",
//       time: "13 min",
//       status: "Completed",
//     },
//     { id: 2, title: "Position Sizing", time: "12 min", status: "Completed" },
//     {
//       id: 3,
//       title: "Stop Loss Placement",
//       time: "12 min",
//       status: "Completed",
//     },
//     { id: 4, title: "Risk-Reward Ratios", time: "9 min", status: "Completed" },
//     { id: 5, title: "Portfolio Risk", time: "16 min", status: "Completed" },
//     { id: 6, title: "Drawdown Management", time: "5 min", status: "Current" },
//     { id: 7, title: "Risk Psychology", time: "6 min", status: "Locked" },
//     {
//       id: 8,
//       title: "Advanced Risk Techniques",
//       time: "17 min",
//       status: "Locked",
//     },
//   ];

//   return (
//     <Modal
//       open={open}
//       onCancel={onClose}
//       footer={null}
//       width={650}
//       centered
//       closeIcon={
//         <CloseOutlined className="text-slate-400 dark:text-slate-500 mt-2 mr-2" />
//       }
//       styles={{
//         body: { padding: 0 },
//       }}
//       className="dark:ant-modal-dark rounded-2xl overflow-hidden"
//     >
//       <div className="transition-colors duration-300">
//         {/* Header Section */}
//         <div className="p-6 sm:p-8 border-b border-slate-100 dark:border-slate-800">
//           <div className="flex gap-2 mb-4">
//             <span
//               className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide ${path.color}`}
//             >
//               {path.tag}
//             </span>
//             <span className="bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wide">
//               {path.level}
//             </span>
//           </div>

//           <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-2">
//             {path.title}
//           </h2>

//           <div className="flex gap-4 text-xs sm:text-sm text-slate-400 dark:text-slate-500 font-medium">
//             <span className="flex items-center gap-1">
//               📖 {path.modules} modules
//             </span>
//             <span className="flex items-center gap-1">
//               <ClockCircleOutlined /> {path.time}
//             </span>
//           </div>
//         </div>

//         <div className="p-6 sm:p-8 space-y-6 sm:space-y-8">
//           {/* Progress Card */}
//           <div className="bg-teal-50/50 dark:bg-teal-900/10 border border-teal-100 dark:border-teal-900/20 rounded-xl p-5">
//             <div className="flex justify-between items-center mb-3">
//               <span className="text-sm font-bold text-slate-900 dark:text-white">
//                 Your Progress
//               </span>
//               <span className="text-xs sm:text-sm font-bold text-slate-600 dark:text-slate-400">
//                 {path.completed} / {path.modules} completed
//               </span>
//             </div>
//             <Progress
//               percent={percentage}
//               strokeColor="#14b8a6"
//               trailColor="rgba(20, 184, 166, 0.1)"
//               showInfo={false}
//               className="mb-2"
//             />
//             <p className="text-[11px] sm:text-xs text-teal-600 dark:text-teal-400 font-medium">
//               {Math.max(0, 100 - percentage)}% remaining to complete this
//               learning path
//             </p>
//           </div>

//           {/* About Section */}
//           <div className="space-y-2">
//             <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 font-sans">
//               About This Course
//             </h3>
//             <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
//               A comprehensive course covering all aspects of risk management
//               from position sizing to drawdown recovery. Essential for any
//               serious trader looking to protect and grow their capital
//               consistently.
//             </p>
//           </div>

//           {/* Module List */}
//           <div className="space-y-4">
//             <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
//               Course Modules
//             </h3>
//             <div className="space-y-2.5 max-h-75 overflow-y-auto pr-2 custom-scrollbar">
//               {modules.map((mod) => (
//                 <div
//                   key={mod.id}
//                   className={`flex items-center justify-between p-3 sm:p-4 rounded-xl border transition-all duration-200 ${
//                     mod.status === "Completed"
//                       ? "bg-emerald-50/30 dark:bg-emerald-900/10 border-emerald-100 dark:border-emerald-900/20"
//                       : mod.status === "Current"
//                         ? "bg-white dark:bg-slate-900 border-indigo-200 dark:border-indigo-800 shadow-sm"
//                         : "bg-slate-50/50 dark:bg-slate-900/40 border-slate-100 dark:border-slate-800 opacity-60"
//                   }`}
//                 >
//                   <div className="flex items-center gap-3 sm:gap-4">
//                     <div
//                       className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shrink-0 ${
//                         mod.status === "Completed"
//                           ? "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600"
//                           : mod.status === "Current"
//                             ? "bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600"
//                             : "bg-slate-100 dark:bg-slate-800 text-slate-400"
//                       }`}
//                     >
//                       {mod.status === "Completed" ? (
//                         <CheckCircleFilled className="text-lg sm:text-xl" />
//                       ) : mod.status === "Current" ? (
//                         <PlayCircleFilled className="text-lg sm:text-xl" />
//                       ) : (
//                         <LockOutlined className="text-sm" />
//                       )}
//                     </div>
//                     <div>
//                       <h4
//                         className={`text-xs sm:text-sm font-bold leading-tight ${mod.status === "Locked" ? "text-slate-400 dark:text-slate-600" : "text-slate-900 dark:text-slate-200"}`}
//                       >
//                         Module {mod.id}: {mod.title}
//                       </h4>
//                       <span className="text-[10px] sm:text-xs text-slate-400 dark:text-slate-500">
//                         {mod.time}
//                       </span>
//                     </div>
//                   </div>
//                   <span
//                     className={`text-[9px] sm:text-[10px] font-bold uppercase tracking-tight ${
//                       mod.status === "Completed"
//                         ? "text-emerald-500"
//                         : mod.status === "Locked"
//                           ? "text-slate-300 dark:text-slate-600"
//                           : "hidden"
//                     }`}
//                   >
//                     {mod.status}
//                   </span>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Responsive Footer Actions */}
//           <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
//             <button
//               onClick={onClose}
//               className="order-2 sm:order-1 flex-1 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-bold text-sm hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
//             >
//               Close
//             </button>
//             <button className="order-1 sm:order-2 flex-2 py-3 rounded-xl bg-indigo-600 dark:bg-indigo-500 text-white font-bold text-sm hover:bg-indigo-700 shadow-lg shadow-indigo-200 dark:shadow-none transition-all flex items-center justify-center gap-2">
//               <PlayCircleFilled />
//               {path.completed > 0 ? "Continue Learning" : "Start Learning"}
//             </button>
//           </div>
//         </div>
//       </div>

//       <style jsx global>{`
//         .custom-scrollbar::-webkit-scrollbar {
//           width: 4px;
//         }
//         .custom-scrollbar::-webkit-scrollbar-thumb {
//           background: #e2e8f0;
//           border-radius: 10px;
//         }
//         .dark .custom-scrollbar::-webkit-scrollbar-thumb {
//           background: #334155;
//         }
//         .dark .ant-modal-content {
//           background-color: #0f172a !important;
//         }
//       `}</style>
//     </Modal>
//   );
// }

///////////////////////////////////////

// "use client";

// import {
//   CourseProgressAPI,
//   useCreateCourseProgressMutation,
// } from "@/redux/features/learninghub/learninghubApi";
// import {
//   CheckCircleFilled,
//   ClockCircleOutlined,
//   CloseOutlined,
//   LockOutlined,
//   PlayCircleFilled,
// } from "@ant-design/icons";
// import { Modal, Progress } from "antd";
// import type { LearningPath } from "./AllLearningPaths";

// // ─── Props ────────────────────────────────────────────────────────────────────

// interface LearningPathModalProps {
//   path: LearningPath | null;
//   open: boolean;
//   onClose: () => void;
//   progress: CourseProgressAPI[];
// }

// // ─── Component ────────────────────────────────────────────────────────────────

// export default function LearningPathModal({
//   path,
//   open,
//   onClose,
//   progress,
// }: LearningPathModalProps) {
//   const [createCourseProgress, { isLoading: starting, error: createError }] =
//     useCreateCourseProgressMutation();

//   if (!path) return null;

//   // Find this course's progress
//   const courseProgress = progress.find((p) => p.course.id === path.courseId);
//   const hasStarted = !!courseProgress;
//   const watchedIds = path.watchedIds;

//   const percentage =
//     path.modules > 0 ? Math.round((path.completed / path.modules) * 100) : 0;

//   const apiError = createError
//     ? "error" in createError
//       ? (createError as { error: string }).error
//       : "Failed to enrol. Please try again."
//     : null;

//   async function handleContinueOrStart() {
//     if (!path) return;
//     if (!hasStarted) {
//       const userId = Number(localStorage.getItem("user_id") ?? 0);
//       if (!userId) {
//         alert("Please log in to start this course.");
//         return;
//       }
//       try {
//         await createCourseProgress({
//           user: userId,
//           course: path.courseId,
//         }).unwrap();
//       } catch {
//         return;
//       }
//     }
//     onClose();
//   }

//   return (
//     <Modal
//       open={open}
//       onCancel={onClose}
//       footer={null}
//       width={650}
//       centered
//       closeIcon={
//         <CloseOutlined className="text-slate-400 dark:text-slate-500 mt-2 mr-2" />
//       }
//       styles={{ body: { padding: 0 } }}
//       className="dark:ant-modal-dark rounded-2xl overflow-hidden"
//     >
//       <div className="transition-colors duration-300">
//         {/* Header */}
//         <div className="p-6 sm:p-8 border-b border-slate-100 dark:border-slate-800">
//           <div className="flex gap-2 mb-4">
//             <span
//               className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide ${path.color}`}
//             >
//               {path.tag}
//             </span>
//             <span className="bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wide">
//               {path.level}
//             </span>
//           </div>

//           <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-2">
//             {path.title}
//           </h2>

//           <div className="flex gap-4 text-xs sm:text-sm text-slate-400 dark:text-slate-500 font-medium">
//             <span className="flex items-center gap-1">
//               📖 {path.modules} modules
//             </span>
//             <span className="flex items-center gap-1">
//               <ClockCircleOutlined /> {path.time}
//             </span>
//           </div>
//         </div>

//         {/* Body */}
//         <div className="p-6 sm:p-8 space-y-6 sm:space-y-8">
//           {/* Progress card */}
//           <div className="bg-teal-50/50 dark:bg-teal-900/10 border border-teal-100 dark:border-teal-900/20 rounded-xl p-5">
//             <div className="flex justify-between items-center mb-3">
//               <span className="text-sm font-bold text-slate-900 dark:text-white">
//                 Your Progress
//               </span>
//               <span className="text-xs sm:text-sm font-bold text-slate-600 dark:text-slate-400">
//                 {path.completed} / {path.modules} completed
//               </span>
//             </div>
//             <Progress
//               percent={percentage}
//               strokeColor="#14b8a6"
//               trailColor="rgba(20, 184, 166, 0.1)"
//               showInfo={false}
//               className="mb-2"
//             />
//             <p className="text-[11px] sm:text-xs text-teal-600 dark:text-teal-400 font-medium">
//               {Math.max(0, 100 - percentage)}% remaining to complete this
//               learning path
//             </p>
//           </div>

//           {/* About */}
//           {(path.about || path.description) && (
//             <div className="space-y-2">
//               <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
//                 About This Course
//               </h3>
//               <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
//                 {path.about ?? path.description}
//               </p>
//             </div>
//           )}

//           {/* Module list from real API videos */}
//           <div className="space-y-4">
//             <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
//               Course Modules
//             </h3>

//             {path.videos.length === 0 ? (
//               <p className="text-sm text-slate-400 dark:text-slate-500">
//                 No videos uploaded yet.
//               </p>
//             ) : (
//               <div className="space-y-2.5 max-h-72 overflow-y-auto pr-2 custom-scrollbar">
//                 {path.videos.map((video, idx) => {
//                   const isWatched = watchedIds.has(video.id);
//                   const firstUnwatchedIdx = path.videos.findIndex(
//                     (v) => !watchedIds.has(v.id),
//                   );
//                   const isCurrent = idx === firstUnwatchedIdx;
//                   const isLocked =
//                     !video.is_free && !isWatched && idx > firstUnwatchedIdx;

//                   const status: "Completed" | "Current" | "Locked" = isWatched
//                     ? "Completed"
//                     : isCurrent
//                       ? "Current"
//                       : "Locked";

//                   return (
//                     <div
//                       key={video.id}
//                       className={`flex items-center justify-between p-3 sm:p-4 rounded-xl border transition-all duration-200 ${
//                         status === "Completed"
//                           ? "bg-emerald-50/30 dark:bg-emerald-900/10 border-emerald-100 dark:border-emerald-900/20"
//                           : status === "Current"
//                             ? "bg-white dark:bg-slate-900 border-indigo-200 dark:border-indigo-800 shadow-sm"
//                             : "bg-slate-50/50 dark:bg-slate-900/40 border-slate-100 dark:border-slate-800 opacity-60"
//                       }`}
//                     >
//                       <div className="flex items-center gap-3 sm:gap-4">
//                         <div
//                           className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shrink-0 ${
//                             status === "Completed"
//                               ? "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600"
//                               : status === "Current"
//                                 ? "bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600"
//                                 : "bg-slate-100 dark:bg-slate-800 text-slate-400"
//                           }`}
//                         >
//                           {status === "Completed" ? (
//                             <CheckCircleFilled className="text-lg sm:text-xl" />
//                           ) : status === "Current" ? (
//                             <PlayCircleFilled className="text-lg sm:text-xl" />
//                           ) : (
//                             <LockOutlined className="text-sm" />
//                           )}
//                         </div>
//                         <div>
//                           <h4
//                             className={`text-xs sm:text-sm font-bold leading-tight ${
//                               isLocked
//                                 ? "text-slate-400 dark:text-slate-600"
//                                 : "text-slate-900 dark:text-slate-200"
//                             }`}
//                           >
//                             Module {idx + 1}: {video.title}
//                           </h4>
//                           {video.description && (
//                             <span className="text-[10px] sm:text-xs text-slate-400 dark:text-slate-500">
//                               {video.description}
//                             </span>
//                           )}
//                         </div>
//                       </div>

//                       <span
//                         className={`text-[9px] sm:text-[10px] font-bold uppercase tracking-tight ${
//                           status === "Completed"
//                             ? "text-emerald-500"
//                             : status === "Locked"
//                               ? "text-slate-300 dark:text-slate-600"
//                               : "hidden"
//                         }`}
//                       >
//                         {status === "Locked" ? "Locked" : "Done"}
//                       </span>
//                     </div>
//                   );
//                 })}
//               </div>
//             )}
//           </div>

//           {/* API Error */}
//           {apiError && (
//             <p className="text-xs text-red-500 font-medium">{apiError}</p>
//           )}

//           {/* Footer */}
//           <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
//             <button
//               onClick={onClose}
//               className="order-2 sm:order-1 flex-1 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-bold text-sm hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
//             >
//               Close
//             </button>
//             <button
//               onClick={handleContinueOrStart}
//               disabled={starting}
//               className="order-1 sm:order-2 flex-2 py-3 rounded-xl bg-indigo-600 dark:bg-indigo-500 text-white font-bold text-sm hover:bg-indigo-700 shadow-lg shadow-indigo-200 dark:shadow-none transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
//             >
//               <PlayCircleFilled />
//               {starting
//                 ? "Starting…"
//                 : hasStarted
//                   ? "Continue Learning"
//                   : "Start Learning"}
//             </button>
//           </div>
//         </div>
//       </div>

//       <style jsx global>{`
//         .custom-scrollbar::-webkit-scrollbar {
//           width: 4px;
//         }
//         .custom-scrollbar::-webkit-scrollbar-thumb {
//           background: #e2e8f0;
//           border-radius: 10px;
//         }
//         .dark .custom-scrollbar::-webkit-scrollbar-thumb {
//           background: #334155;
//         }
//         .dark .ant-modal-content {
//           background-color: #0f172a !important;
//         }
//       `}</style>
//     </Modal>
//   );
// }

// "use client";

// import {
//   CourseProgressAPI,
//   useCreateCourseProgressMutation,
//   VideoAPI,
// } from "@/redux/features/learninghub/learninghubApi";
// import {
//   ArrowLeftOutlined,
//   CheckCircleFilled,
//   ClockCircleOutlined,
//   CloseOutlined,
//   LockOutlined,
//   PlayCircleFilled,
// } from "@ant-design/icons";
// import { Modal, Progress } from "antd";
// import { useState } from "react";
// import type { LearningPath } from "./AllLearningPaths";

// // ─── Props ────────────────────────────────────────────────────────────────────

// interface LearningPathModalProps {
//   path: LearningPath | null;
//   open: boolean;
//   onClose: () => void;
//   progress: CourseProgressAPI[];
// }

// // ─── Root component ───────────────────────────────────────────────────────────

// export default function LearningPathModal({
//   path,
//   open,
//   onClose,
//   progress,
// }: LearningPathModalProps) {
//   const [createCourseProgress, { isLoading: starting }] =
//     useCreateCourseProgressMutation();

//   const [activeVideo, setActiveVideo] = useState<VideoAPI | null>(null);
//   const [enrollError, setEnrollError] = useState<string | null>(null);

//   function handleClose() {
//     setActiveVideo(null);
//     setEnrollError(null);
//     onClose();
//   }

//   // Guard: render nothing when no path is selected.
//   // All logic below is moved into child components so `path` is always
//   // non-null by the time it reaches them — no TS(18047) possible.
//   if (!path) return null;

//   const courseProgress = progress.find((p) => p.course.id === path.courseId);
//   const hasStarted = !!courseProgress;
//   const watchedIds = path.watchedIds;
//   const percentage =
//     path.modules > 0 ? Math.round((path.completed / path.modules) * 100) : 0;

//   // Enrol (if needed) then open the first unwatched video
//   async function handleStartOrContinue() {
//     setEnrollError(null);

//     if (!hasStarted) {
//       const userId =
//         Number(localStorage.getItem("user_id")) ||
//         Number(localStorage.getItem("userId")) ||
//         Number(localStorage.getItem("id")) ||
//         0;

//       if (!userId) {
//         setEnrollError("Could not find your user ID. Please log in again.");
//         return;
//       }

//       try {
//         await createCourseProgress({
//           user: userId,
//           course: path.courseId,
//         }).unwrap();
//       } catch (err: unknown) {
//         let msg = "Failed to enrol. Please try again.";

//         if (err && typeof err === "object") {
//           const e = err as Record<string, unknown>;

//           if (e.data && typeof e.data === "object") {
//             const data = e.data as Record<string, unknown>;
//             // Django unique_together → user already enrolled → treat as success
//             if (data.non_field_errors) {
//               openFirstVideo();
//               return;
//             }
//             msg = JSON.stringify(data);
//           } else if (typeof e.error === "string") {
//             msg = e.error;
//           } else if (typeof e.message === "string") {
//             msg = e.message;
//           }
//         }

//         setEnrollError(msg);
//         return;
//       }
//     }

//     openFirstVideo();
//   }

//   function openFirstVideo() {
//     const firstPlayable =
//       path.videos.find((v) => !watchedIds.has(v.id)) ?? path.videos[0];
//     if (firstPlayable) setActiveVideo(firstPlayable);
//   }

//   function handleVideoRowClick(video: VideoAPI, isLocked: boolean) {
//     if (isLocked) return;
//     setActiveVideo(video);
//   }

//   return (
//     <Modal
//       open={open}
//       onCancel={handleClose}
//       footer={null}
//       width={700}
//       centered
//       destroyOnHidden
//       closeIcon={
//         <CloseOutlined className="text-slate-400 dark:text-slate-500 mt-2 mr-2" />
//       }
//       styles={{ body: { padding: 0 } }}
//       className="dark:ant-modal-dark rounded-2xl overflow-hidden"
//     >
//       {activeVideo ? (
//         <VideoPlayerView
//           video={activeVideo}
//           path={path!}
//           watchedIds={watchedIds}
//           onBack={() => setActiveVideo(null)}
//           onSelectVideo={setActiveVideo}
//         />
//       ) : (
//         <CourseOverview
//           path={path!}
//           hasStarted={hasStarted}
//           watchedIds={watchedIds}
//           percentage={percentage}
//           starting={starting}
//           enrollError={enrollError}
//           onVideoRowClick={handleVideoRowClick}
//           onStartOrContinue={handleStartOrContinue}
//           onClose={handleClose}
//         />
//       )}

//       <style jsx global>{`
//         .custom-scrollbar::-webkit-scrollbar {
//           width: 4px;
//         }
//         .custom-scrollbar::-webkit-scrollbar-thumb {
//           background: #e2e8f0;
//           border-radius: 10px;
//         }
//         .dark .custom-scrollbar::-webkit-scrollbar-thumb {
//           background: #334155;
//         }
//         .dark .ant-modal-content {
//           background-color: #0f172a !important;
//         }
//       `}</style>
//     </Modal>
//   );
// }

// // ─── Course Overview ──────────────────────────────────────────────────────────
// // courseProgress removed from props — it was declared but never read (TS6133).
// // hasStarted (boolean) + watchedIds (Set) carry all needed derived data.

// interface CourseOverviewProps {
//   path: LearningPath; // non-null: parent already guarded
//   hasStarted: boolean;
//   watchedIds: Set<number>;
//   percentage: number;
//   starting: boolean;
//   enrollError: string | null;
//   onVideoRowClick: (video: VideoAPI, isLocked: boolean) => void;
//   onStartOrContinue: () => void;
//   onClose: () => void;
// }

// function CourseOverview({
//   path,
//   hasStarted,
//   watchedIds,
//   percentage,
//   starting,
//   enrollError,
//   onVideoRowClick,
//   onStartOrContinue,
//   onClose,
// }: CourseOverviewProps) {
//   return (
//     <div className="transition-colors duration-300">
//       {/* Header */}
//       <div className="p-6 sm:p-8 border-b border-slate-100 dark:border-slate-800">
//         <div className="flex gap-2 mb-4">
//           <span
//             className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide ${path.color}`}
//           >
//             {path.tag}
//           </span>
//           <span className="bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wide">
//             {path.level}
//           </span>
//         </div>

//         <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-2">
//           {path.title}
//         </h2>

//         <div className="flex gap-4 text-xs sm:text-sm text-slate-400 dark:text-slate-500 font-medium">
//           <span className="flex items-center gap-1">
//             📖 {path.modules} modules
//           </span>
//           <span className="flex items-center gap-1">
//             <ClockCircleOutlined /> {path.time}
//           </span>
//         </div>
//       </div>

//       {/* Body */}
//       <div className="p-6 sm:p-8 space-y-6">
//         {/* Progress card */}
//         <div className="bg-teal-50/50 dark:bg-teal-900/10 border border-teal-100 dark:border-teal-900/20 rounded-xl p-5">
//           <div className="flex justify-between items-center mb-3">
//             <span className="text-sm font-bold text-slate-900 dark:text-white">
//               Your Progress
//             </span>
//             <span className="text-xs sm:text-sm font-bold text-slate-600 dark:text-slate-400">
//               {path.completed} / {path.modules} completed
//             </span>
//           </div>
//           <Progress
//             percent={percentage}
//             strokeColor="#14b8a6"
//             trailColor="rgba(20, 184, 166, 0.1)"
//             showInfo={false}
//             className="mb-2"
//           />
//           <p className="text-[11px] sm:text-xs text-teal-600 dark:text-teal-400 font-medium">
//             {Math.max(0, 100 - percentage)}% remaining to complete this learning
//             path
//           </p>
//         </div>

//         {/* About */}
//         {(path.about || path.description) && (
//           <div className="space-y-2">
//             <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
//               About This Course
//             </h3>
//             <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
//               {path.about ?? path.description}
//             </p>
//           </div>
//         )}

//         {/* Module list */}
//         <div className="space-y-4">
//           <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
//             Course Modules
//           </h3>

//           {path.videos.length === 0 ? (
//             <p className="text-sm text-slate-400 dark:text-slate-500">
//               No videos uploaded yet.
//             </p>
//           ) : (
//             <div className="space-y-2.5 max-h-72 overflow-y-auto pr-2 custom-scrollbar">
//               {path.videos.map((video, idx) => {
//                 const isWatched = watchedIds.has(video.id);
//                 const firstUnwatchedIdx = path.videos.findIndex(
//                   (v) => !watchedIds.has(v.id),
//                 );
//                 const isCurrent = idx === firstUnwatchedIdx;
//                 const isLocked = !video.is_free && !hasStarted && idx > 0;

//                 const status: "Completed" | "Current" | "Locked" | "Available" =
//                   isWatched
//                     ? "Completed"
//                     : isLocked
//                       ? "Locked"
//                       : isCurrent
//                         ? "Current"
//                         : "Available";

//                 return (
//                   <button
//                     key={video.id}
//                     onClick={() => onVideoRowClick(video, isLocked)}
//                     disabled={isLocked}
//                     className={`w-full text-left flex items-center justify-between p-3 sm:p-4 rounded-xl border transition-all duration-200 group ${
//                       isLocked
//                         ? "opacity-60 cursor-not-allowed bg-slate-50/50 dark:bg-slate-900/40 border-slate-100 dark:border-slate-800"
//                         : status === "Completed"
//                           ? "bg-emerald-50/30 dark:bg-emerald-900/10 border-emerald-100 dark:border-emerald-900/20 hover:bg-emerald-50 cursor-pointer"
//                           : status === "Current"
//                             ? "bg-white dark:bg-slate-900 border-indigo-200 dark:border-indigo-800 shadow-sm hover:bg-indigo-50/30 cursor-pointer"
//                             : "bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60 cursor-pointer"
//                     }`}
//                   >
//                     <div className="flex items-center gap-3 sm:gap-4">
//                       <div
//                         className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shrink-0 ${
//                           status === "Completed"
//                             ? "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600"
//                             : status === "Current"
//                               ? "bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600"
//                               : status === "Locked"
//                                 ? "bg-slate-100 dark:bg-slate-800 text-slate-400"
//                                 : "bg-slate-100 dark:bg-slate-800 text-slate-500"
//                         }`}
//                       >
//                         {status === "Completed" ? (
//                           <CheckCircleFilled className="text-lg sm:text-xl" />
//                         ) : status === "Locked" ? (
//                           <LockOutlined className="text-sm" />
//                         ) : (
//                           <PlayCircleFilled className="text-lg sm:text-xl" />
//                         )}
//                       </div>

//                       <div>
//                         <h4
//                           className={`text-xs sm:text-sm font-bold leading-tight ${
//                             isLocked
//                               ? "text-slate-400 dark:text-slate-600"
//                               : "text-slate-900 dark:text-slate-200"
//                           }`}
//                         >
//                           Module {idx + 1}: {video.title}
//                         </h4>
//                         {video.description && (
//                           <span className="text-[10px] sm:text-xs text-slate-400 dark:text-slate-500">
//                             {video.description}
//                           </span>
//                         )}
//                       </div>
//                     </div>

//                     <div className="flex items-center gap-2 shrink-0">
//                       {status === "Locked" && (
//                         <span className="text-[9px] sm:text-[10px] font-bold text-slate-300 dark:text-slate-600 uppercase tracking-tight">
//                           Locked
//                         </span>
//                       )}
//                       {status === "Completed" && (
//                         <span className="text-[9px] sm:text-[10px] font-bold text-emerald-500 uppercase tracking-tight">
//                           Done
//                         </span>
//                       )}
//                       {(status === "Current" || status === "Available") && (
//                         <PlayCircleFilled className="text-slate-300 dark:text-slate-700 text-base group-hover:text-indigo-400 transition-colors" />
//                       )}
//                     </div>
//                   </button>
//                 );
//               })}
//             </div>
//           )}
//         </div>

//         {/* Enrol error */}
//         {enrollError && (
//           <div className="rounded-lg bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 p-3">
//             <p className="text-xs text-red-600 dark:text-red-400 font-medium">
//               {enrollError}
//             </p>
//           </div>
//         )}

//         {/* Footer */}
//         <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
//           <button
//             onClick={onClose}
//             className="order-2 sm:order-1 flex-1 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-bold text-sm hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
//           >
//             Close
//           </button>
//           <button
//             onClick={onStartOrContinue}
//             disabled={starting || path.videos.length === 0}
//             className="order-1 sm:order-2 flex-2 py-3 rounded-xl bg-indigo-600 dark:bg-indigo-500 text-white font-bold text-sm hover:bg-indigo-700 shadow-lg shadow-indigo-200 dark:shadow-none transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
//           >
//             <PlayCircleFilled />
//             {starting
//               ? "Enrolling…"
//               : hasStarted
//                 ? "Continue Learning"
//                 : "Start Learning"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// // ─── Video Player View ────────────────────────────────────────────────────────

// interface VideoPlayerViewProps {
//   video: VideoAPI;
//   path: LearningPath; // non-null: parent already guarded
//   watchedIds: Set<number>;
//   onBack: () => void;
//   onSelectVideo: (video: VideoAPI) => void;
// }

// function VideoPlayerView({
//   video,
//   path,
//   watchedIds,
//   onBack,
//   onSelectVideo,
// }: VideoPlayerViewProps) {
//   const currentIdx = path.videos.findIndex((v) => v.id === video.id);
//   const prevVideo = currentIdx > 0 ? path.videos[currentIdx - 1] : null;
//   const nextVideo =
//     currentIdx < path.videos.length - 1 ? path.videos[currentIdx + 1] : null;

//   const videoUrl = video.video.startsWith("http")
//     ? video.video
//     : `${process.env.NEXT_PUBLIC_API_URL ?? ""}${video.video}`;

//   return (
//     <div className="flex flex-col">
//       {/* Top bar */}
//       <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 dark:border-slate-800">
//         <button
//           onClick={onBack}
//           className="flex items-center gap-2 text-sm font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors"
//         >
//           <ArrowLeftOutlined />
//           Back to overview
//         </button>
//         <span className="text-xs text-slate-400 font-medium">
//           Module {currentIdx + 1} of {path.videos.length}
//         </span>
//       </div>

//       {/* Video player */}
//       <div className="w-full bg-black aspect-video">
//         <video
//           key={video.id}
//           src={videoUrl}
//           controls
//           autoPlay
//           className="w-full h-full object-contain"
//           controlsList="nodownload"
//         >
//           Your browser does not support the video tag.
//         </video>
//       </div>

//       {/* Video info */}
//       <div className="px-5 pt-4 pb-2 flex items-start justify-between gap-3">
//         <div>
//           <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-tight">
//             {video.title}
//           </h2>
//           {video.description && (
//             <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
//               {video.description}
//             </p>
//           )}
//         </div>
//         {watchedIds.has(video.id) && (
//           <span className="shrink-0 flex items-center gap-1 text-[10px] font-bold text-emerald-500 uppercase tracking-wide mt-1">
//             <CheckCircleFilled /> Watched
//           </span>
//         )}
//       </div>

//       {/* Prev / Next */}
//       <div className="flex gap-3 px-5 py-3 border-t border-slate-100 dark:border-slate-800 mt-1">
//         <button
//           onClick={() => prevVideo && onSelectVideo(prevVideo)}
//           disabled={!prevVideo}
//           className="flex-1 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-sm font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
//         >
//           ← Previous
//         </button>
//         <button
//           onClick={() => nextVideo && onSelectVideo(nextVideo)}
//           disabled={!nextVideo}
//           className="flex-1 py-2.5 rounded-xl bg-indigo-600 dark:bg-indigo-500 text-white text-sm font-bold hover:bg-indigo-700 dark:hover:bg-indigo-600 shadow-md shadow-indigo-200 dark:shadow-none transition-all disabled:opacity-40 disabled:cursor-not-allowed"
//         >
//           Next →
//         </button>
//       </div>

//       {/* Mini playlist */}
//       <div className="px-5 pb-5 max-h-52 overflow-y-auto custom-scrollbar space-y-1.5">
//         <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">
//           All Modules
//         </p>
//         {path.videos.map((v, idx) => {
//           const isWatched = watchedIds.has(v.id);
//           const isActive = v.id === video.id;
//           return (
//             <button
//               key={v.id}
//               onClick={() => onSelectVideo(v)}
//               className={`w-full text-left flex items-center gap-3 p-2.5 rounded-lg transition-all ${
//                 isActive
//                   ? "bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800"
//                   : "hover:bg-slate-50 dark:hover:bg-slate-800/60"
//               }`}
//             >
//               <div
//                 className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
//                   isActive
//                     ? "bg-indigo-600 text-white"
//                     : isWatched
//                       ? "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600"
//                       : "bg-slate-100 dark:bg-slate-800 text-slate-400"
//                 }`}
//               >
//                 {isWatched && !isActive ? <CheckCircleFilled /> : idx + 1}
//               </div>
//               <span
//                 className={`text-xs font-semibold truncate ${
//                   isActive
//                     ? "text-indigo-700 dark:text-indigo-300"
//                     : isWatched
//                       ? "text-emerald-700 dark:text-emerald-400"
//                       : "text-slate-600 dark:text-slate-400"
//                 }`}
//               >
//                 {v.title}
//               </span>
//               {isActive && (
//                 <span className="ml-auto shrink-0 text-[9px] font-bold text-indigo-500 uppercase">
//                   Playing
//                 </span>
//               )}
//             </button>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

"use client";

import {
  CourseProgressAPI,
  useCreateCourseProgressMutation,
  VideoAPI,
} from "@/redux/features/learninghub/learninghubApi";
import {
  ArrowLeftOutlined,
  CheckCircleFilled,
  ClockCircleOutlined,
  CloseOutlined,
  LockOutlined,
  PlayCircleFilled,
} from "@ant-design/icons";
import { Modal, Progress } from "antd";
import { useState } from "react";
import type { LearningPath } from "./AllLearningPaths";

// ─── Props ────────────────────────────────────────────────────────────────────

interface LearningPathModalProps {
  path: LearningPath | null;
  open: boolean;
  onClose: () => void;
  progress: CourseProgressAPI[];
}

// ─── Root component ───────────────────────────────────────────────────────────

export default function LearningPathModal({
  path,
  open,
  onClose,
  progress,
}: LearningPathModalProps) {
  const [createCourseProgress, { isLoading: starting }] =
    useCreateCourseProgressMutation();

  const [activeVideo, setActiveVideo] = useState<VideoAPI | null>(null);
  const [enrollError, setEnrollError] = useState<string | null>(null);

  function handleClose() {
    setActiveVideo(null);
    setEnrollError(null);
    onClose();
  }

  // Guard: render nothing when no path is selected.
  if (!path) return null;

  // After the guard, path is definitely non-null
  const nonNullPath = path;

  const courseProgress = progress.find(
    (p) => p.course.id === nonNullPath.courseId,
  );
  const hasStarted = !!courseProgress;
  const watchedIds = nonNullPath.watchedIds;
  const percentage =
    nonNullPath.modules > 0
      ? Math.round((nonNullPath.completed / nonNullPath.modules) * 100)
      : 0;

  // Enrol (if needed) then open the first unwatched video
  async function handleStartOrContinue() {
    setEnrollError(null);

    if (!hasStarted) {
      const userId =
        Number(localStorage.getItem("user_id")) ||
        Number(localStorage.getItem("userId")) ||
        Number(localStorage.getItem("id")) ||
        0;

      if (!userId) {
        setEnrollError("Could not find your user ID. Please log in again.");
        return;
      }

      try {
        await createCourseProgress({
          user: userId,
          course: nonNullPath.courseId,
        }).unwrap();
      } catch (err: unknown) {
        let msg = "Failed to enrol. Please try again.";

        if (err && typeof err === "object") {
          const e = err as Record<string, unknown>;

          if (e.data && typeof e.data === "object") {
            const data = e.data as Record<string, unknown>;
            // Django unique_together → user already enrolled → treat as success
            if (data.non_field_errors) {
              openFirstVideo();
              return;
            }
            msg = JSON.stringify(data);
          } else if (typeof e.error === "string") {
            msg = e.error;
          } else if (typeof e.message === "string") {
            msg = e.message;
          }
        }

        setEnrollError(msg);
        return;
      }
    }

    openFirstVideo();
  }

  function openFirstVideo() {
    const firstPlayable =
      nonNullPath.videos.find((v) => !watchedIds.has(v.id)) ??
      nonNullPath.videos[0];
    if (firstPlayable) setActiveVideo(firstPlayable);
  }

  function handleVideoRowClick(video: VideoAPI, isLocked: boolean) {
    if (isLocked) return;
    setActiveVideo(video);
  }

  return (
    <Modal
      open={open}
      onCancel={handleClose}
      footer={null}
      width={700}
      centered
      destroyOnHidden
      closeIcon={
        <CloseOutlined className="text-slate-400 dark:text-slate-500 mt-2 mr-2" />
      }
      styles={{ body: { padding: 0 } }}
      className="dark:ant-modal-dark rounded-2xl overflow-hidden"
    >
      {activeVideo ? (
        <VideoPlayerView
          video={activeVideo}
          path={nonNullPath}
          watchedIds={watchedIds}
          onBack={() => setActiveVideo(null)}
          onSelectVideo={setActiveVideo}
        />
      ) : (
        <CourseOverview
          path={nonNullPath}
          hasStarted={hasStarted}
          watchedIds={watchedIds}
          percentage={percentage}
          starting={starting}
          enrollError={enrollError}
          onVideoRowClick={handleVideoRowClick}
          onStartOrContinue={handleStartOrContinue}
          onClose={handleClose}
        />
      )}

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

// ─── Course Overview ──────────────────────────────────────────────────────────

interface CourseOverviewProps {
  path: LearningPath; // Now non-null
  hasStarted: boolean;
  watchedIds: Set<number>;
  percentage: number;
  starting: boolean;
  enrollError: string | null;
  onVideoRowClick: (video: VideoAPI, isLocked: boolean) => void;
  onStartOrContinue: () => void;
  onClose: () => void;
}

function CourseOverview({
  path,
  hasStarted,
  watchedIds,
  percentage,
  starting,
  enrollError,
  onVideoRowClick,
  onStartOrContinue,
  onClose,
}: CourseOverviewProps) {
  return (
    <div className="transition-colors duration-300">
      {/* Header */}
      <div className="p-6 sm:p-8 border-b border-slate-100 dark:border-slate-800">
        <div className="flex gap-2 mb-4">
          <span
            className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide ${path.color}`}
          >
            {path.tag}
          </span>
          <span className="bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wide">
            {path.level}
          </span>
        </div>

        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-2">
          {path.title}
        </h2>

        <div className="flex gap-4 text-xs sm:text-sm text-slate-400 dark:text-slate-500 font-medium">
          <span className="flex items-center gap-1">
            📖 {path.modules} modules
          </span>
          <span className="flex items-center gap-1">
            <ClockCircleOutlined /> {path.time}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="p-6 sm:p-8 space-y-6">
        {/* Progress card */}
        <div className="bg-teal-50/50 dark:bg-teal-900/10 border border-teal-100 dark:border-teal-900/20 rounded-xl p-5">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-bold text-slate-900 dark:text-white">
              Your Progress
            </span>
            <span className="text-xs sm:text-sm font-bold text-slate-600 dark:text-slate-400">
              {path.completed} / {path.modules} completed
            </span>
          </div>
          <Progress
            percent={percentage}
            strokeColor="#14b8a6"
            trailColor="rgba(20, 184, 166, 0.1)"
            showInfo={false}
            className="mb-2"
          />
          <p className="text-[11px] sm:text-xs text-teal-600 dark:text-teal-400 font-medium">
            {Math.max(0, 100 - percentage)}% remaining to complete this learning
            path
          </p>
        </div>

        {/* About */}
        {(path.about || path.description) && (
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
              About This Course
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              {path.about ?? path.description}
            </p>
          </div>
        )}

        {/* Module list */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
            Course Modules
          </h3>

          {path.videos.length === 0 ? (
            <p className="text-sm text-slate-400 dark:text-slate-500">
              No videos uploaded yet.
            </p>
          ) : (
            <div className="space-y-2.5 max-h-72 overflow-y-auto pr-2 custom-scrollbar">
              {path.videos.map((video, idx) => {
                const isWatched = watchedIds.has(video.id);
                const firstUnwatchedIdx = path.videos.findIndex(
                  (v) => !watchedIds.has(v.id),
                );
                const isCurrent = idx === firstUnwatchedIdx;
                const isLocked = !video.is_free && !hasStarted && idx > 0;

                const status: "Completed" | "Current" | "Locked" | "Available" =
                  isWatched
                    ? "Completed"
                    : isLocked
                      ? "Locked"
                      : isCurrent
                        ? "Current"
                        : "Available";

                return (
                  <button
                    key={video.id}
                    onClick={() => onVideoRowClick(video, isLocked)}
                    disabled={isLocked}
                    className={`w-full text-left flex items-center justify-between p-3 sm:p-4 rounded-xl border transition-all duration-200 group ${
                      isLocked
                        ? "opacity-60 cursor-not-allowed bg-slate-50/50 dark:bg-slate-900/40 border-slate-100 dark:border-slate-800"
                        : status === "Completed"
                          ? "bg-emerald-50/30 dark:bg-emerald-900/10 border-emerald-100 dark:border-emerald-900/20 hover:bg-emerald-50 cursor-pointer"
                          : status === "Current"
                            ? "bg-white dark:bg-slate-900 border-indigo-200 dark:border-indigo-800 shadow-sm hover:bg-indigo-50/30 cursor-pointer"
                            : "bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60 cursor-pointer"
                    }`}
                  >
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div
                        className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shrink-0 ${
                          status === "Completed"
                            ? "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600"
                            : status === "Current"
                              ? "bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600"
                              : status === "Locked"
                                ? "bg-slate-100 dark:bg-slate-800 text-slate-400"
                                : "bg-slate-100 dark:bg-slate-800 text-slate-500"
                        }`}
                      >
                        {status === "Completed" ? (
                          <CheckCircleFilled className="text-lg sm:text-xl" />
                        ) : status === "Locked" ? (
                          <LockOutlined className="text-sm" />
                        ) : (
                          <PlayCircleFilled className="text-lg sm:text-xl" />
                        )}
                      </div>

                      <div>
                        <h4
                          className={`text-xs sm:text-sm font-bold leading-tight ${
                            isLocked
                              ? "text-slate-400 dark:text-slate-600"
                              : "text-slate-900 dark:text-slate-200"
                          }`}
                        >
                          Module {idx + 1}: {video.title}
                        </h4>
                        {video.description && (
                          <span className="text-[10px] sm:text-xs text-slate-400 dark:text-slate-500">
                            {video.description}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {status === "Locked" && (
                        <span className="text-[9px] sm:text-[10px] font-bold text-slate-300 dark:text-slate-600 uppercase tracking-tight">
                          Locked
                        </span>
                      )}
                      {status === "Completed" && (
                        <span className="text-[9px] sm:text-[10px] font-bold text-emerald-500 uppercase tracking-tight">
                          Done
                        </span>
                      )}
                      {(status === "Current" || status === "Available") && (
                        <PlayCircleFilled className="text-slate-300 dark:text-slate-700 text-base group-hover:text-indigo-400 transition-colors" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Enrol error */}
        {enrollError && (
          <div className="rounded-lg bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 p-3">
            <p className="text-xs text-red-600 dark:text-red-400 font-medium">
              {enrollError}
            </p>
          </div>
        )}

        {/* Footer */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <button
            onClick={onClose}
            className="order-2 sm:order-1 flex-1 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-bold text-sm hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            Close
          </button>
          <button
            onClick={onStartOrContinue}
            disabled={starting || path.videos.length === 0}
            className="order-1 sm:order-2 flex-2 py-3 rounded-xl bg-indigo-600 dark:bg-indigo-500 text-white font-bold text-sm hover:bg-indigo-700 shadow-lg shadow-indigo-200 dark:shadow-none transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <PlayCircleFilled />
            {starting
              ? "Enrolling…"
              : hasStarted
                ? "Continue Learning"
                : "Start Learning"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Video Player View ────────────────────────────────────────────────────────

interface VideoPlayerViewProps {
  video: VideoAPI;
  path: LearningPath; // Now non-null
  watchedIds: Set<number>;
  onBack: () => void;
  onSelectVideo: (video: VideoAPI) => void;
}

function VideoPlayerView({
  video,
  path,
  watchedIds,
  onBack,
  onSelectVideo,
}: VideoPlayerViewProps) {
  const currentIdx = path.videos.findIndex((v) => v.id === video.id);
  const prevVideo = currentIdx > 0 ? path.videos[currentIdx - 1] : null;
  const nextVideo =
    currentIdx < path.videos.length - 1 ? path.videos[currentIdx + 1] : null;

  const videoUrl = video.video.startsWith("http")
    ? video.video
    : `${process.env.NEXT_PUBLIC_API_URL ?? ""}${video.video}`;

  return (
    <div className="flex flex-col">
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 dark:border-slate-800">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors"
        >
          <ArrowLeftOutlined />
          Back to overview
        </button>
        <span className="text-xs text-slate-400 font-medium">
          Module {currentIdx + 1} of {path.videos.length}
        </span>
      </div>

      {/* Video player */}
      <div className="w-full bg-black aspect-video">
        <video
          key={video.id}
          src={videoUrl}
          controls
          autoPlay
          className="w-full h-full object-contain"
          controlsList="nodownload"
        >
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Video info */}
      <div className="px-5 pt-4 pb-2 flex items-start justify-between gap-3">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-tight">
            {video.title}
          </h2>
          {video.description && (
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              {video.description}
            </p>
          )}
        </div>
        {watchedIds.has(video.id) && (
          <span className="shrink-0 flex items-center gap-1 text-[10px] font-bold text-emerald-500 uppercase tracking-wide mt-1">
            <CheckCircleFilled /> Watched
          </span>
        )}
      </div>

      {/* Prev / Next */}
      <div className="flex gap-3 px-5 py-3 border-t border-slate-100 dark:border-slate-800 mt-1">
        <button
          onClick={() => prevVideo && onSelectVideo(prevVideo)}
          disabled={!prevVideo}
          className="flex-1 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-sm font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          ← Previous
        </button>
        <button
          onClick={() => nextVideo && onSelectVideo(nextVideo)}
          disabled={!nextVideo}
          className="flex-1 py-2.5 rounded-xl bg-indigo-600 dark:bg-indigo-500 text-white text-sm font-bold hover:bg-indigo-700 dark:hover:bg-indigo-600 shadow-md shadow-indigo-200 dark:shadow-none transition-all disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Next →
        </button>
      </div>

      {/* Mini playlist */}
      <div className="px-5 pb-5 max-h-52 overflow-y-auto custom-scrollbar space-y-1.5">
        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">
          All Modules
        </p>
        {path.videos.map((v, idx) => {
          const isWatched = watchedIds.has(v.id);
          const isActive = v.id === video.id;
          return (
            <button
              key={v.id}
              onClick={() => onSelectVideo(v)}
              className={`w-full text-left flex items-center gap-3 p-2.5 rounded-lg transition-all ${
                isActive
                  ? "bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800"
                  : "hover:bg-slate-50 dark:hover:bg-slate-800/60"
              }`}
            >
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                  isActive
                    ? "bg-indigo-600 text-white"
                    : isWatched
                      ? "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-400"
                }`}
              >
                {isWatched && !isActive ? <CheckCircleFilled /> : idx + 1}
              </div>
              <span
                className={`text-xs font-semibold truncate ${
                  isActive
                    ? "text-indigo-700 dark:text-indigo-300"
                    : isWatched
                      ? "text-emerald-700 dark:text-emerald-400"
                      : "text-slate-600 dark:text-slate-400"
                }`}
              >
                {v.title}
              </span>
              {isActive && (
                <span className="ml-auto shrink-0 text-[9px] font-bold text-indigo-500 uppercase">
                  Playing
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
