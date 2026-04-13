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
  useCreateCourseProgressMutation,
  useGetAllUserCourseProgressQuery,
  useMarkVideoAsWatchedMutation,
} from "@/redux/features/learninghub/learninghubApi";
import {
  CheckCircleFilled,
  ClockCircleOutlined,
  CloseOutlined,
  LockOutlined,
  PlayCircleFilled,
} from "@ant-design/icons";
import { Modal, Progress, message } from "antd";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";

interface Video {
  id: number;
  title: string;
  description: string;
  video: string;
  is_free: boolean;
  is_complete: boolean;
  is_active: boolean;
  course?: {
    id: number;
    title: string;
  };
}

interface Course {
  id: number;
  title: string;
  about: string;
  description: string;
  course_type: string;
  course_level: string;
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

interface LessonModalProps {
  lesson: LearningLesson | null;
  open: boolean;
  onClose: () => void;
}

export default function LessonModal({
  lesson,
  open,
  onClose,
}: LessonModalProps) {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [watchedVideos, setWatchedVideos] = useState<number[]>([]);
  const [progressId, setProgressId] = useState<number | null>(null);

  const [createCourseProgress] = useCreateCourseProgressMutation();
  const [markVideoAsWatched] = useMarkVideoAsWatchedMutation();
  const { data: userProgress, refetch: refetchProgress } =
    useGetAllUserCourseProgressQuery({});

  // Find progress for selected course
  useEffect(() => {
    if (selectedCourse && userProgress) {
      const progress = Array.isArray(userProgress)
        ? userProgress.find((p: any) => p.course?.id === selectedCourse.id)
        : userProgress?.results?.find(
            (p: any) => p.course?.id === selectedCourse.id,
          );

      if (progress) {
        setProgressId(progress.id);
        const watchedIds = progress.videos_watched?.map((v: any) => v.id) || [];
        setWatchedVideos(watchedIds);
      } else {
        setProgressId(null);
        setWatchedVideos([]);
      }
    }
  }, [selectedCourse, userProgress]);

  if (!lesson) return null;

  const handleVideoSelect = async (video: Video, course: Course) => {
    setSelectedVideo(video);
    setSelectedCourse(course);

    // Create progress if not exists
    if (!progressId) {
      try {
        // You'll need to get the current user ID from your auth state
        // For now, this is a placeholder - you should get the actual user ID
        const userId = localStorage.getItem("userId") || 1;
        const result = await createCourseProgress({
          user: Number(userId),
          course: course.id,
        }).unwrap();
        setProgressId(result.course_progress?.id || result.id);
        message.success("Course progress tracking started!");
        refetchProgress();
      } catch (error: any) {
        if (error?.data?.non_field_errors) {
          // Course already started, just refetch
          refetchProgress();
        } else {
          console.error("Failed to start course:", error);
        }
      }
    }
  };

  const handleVideoComplete = async (videoId: number) => {
    if (!watchedVideos.includes(videoId) && progressId) {
      try {
        await markVideoAsWatched({
          progressId: progressId,
          videoId: videoId,
        }).unwrap();
        setWatchedVideos([...watchedVideos, videoId]);
        refetchProgress();
        message.success("Video marked as completed!");
      } catch (error) {
        console.error("Failed to mark video as watched:", error);
        message.error("Failed to mark video as completed");
      }
    }
  };

  // Get all videos from all courses
  const allVideos =
    lesson.courses?.flatMap((course) =>
      course.videos?.map((video) => ({
        ...video,
        courseId: course.id,
        courseTitle: course.title,
      })),
    ) || [];

  const totalVideos = allVideos.length;
  const watchedCount = watchedVideos.length;
  const progress = totalVideos > 0 ? (watchedCount / totalVideos) * 100 : 0;

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      width={900}
      centered
      className="lesson-modal"
      closeIcon={
        <CloseOutlined className="text-slate-400 hover:text-slate-600" />
      }
      styles={{ body: { padding: 0 } }}
    >
      <div className="flex flex-col lg:flex-row h-[80vh]">
        {/* Video Player Section */}
        <div className="flex-1 bg-black rounded-l-xl overflow-hidden">
          {selectedVideo ? (
            <div className="h-full flex flex-col">
              <div className="aspect-video">
                <ReactPlayer
                  url={selectedVideo.video}
                  width="100%"
                  height="100%"
                  controls
                  playing={false}
                  onEnded={() => handleVideoComplete(selectedVideo.id)}
                  config={{
                    file: {
                      attributes: {
                        controlsList: "nodownload",
                      },
                    },
                  }}
                  fallback={
                    <div className="flex items-center justify-center h-full bg-gray-900 text-white">
                      <p>Video player loading...</p>
                    </div>
                  }
                />
              </div>
              <div className="p-4 bg-white dark:bg-slate-900 border-t dark:border-slate-800">
                <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                  {selectedVideo.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                  {selectedVideo.description || "No description available"}
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-xs text-slate-500">Course:</span>
                  <span className="text-xs font-medium text-indigo-600 dark:text-indigo-400">
                    {selectedVideo.courseTitle || selectedVideo.course?.title}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
              <div className="text-center text-white p-6">
                <PlayCircleFilled className="text-6xl mb-4 opacity-50" />
                <p className="text-lg font-semibold">
                  Select a video to start learning
                </p>
                <p className="text-sm opacity-75 mt-2">
                  Choose from the course modules on the right
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Course Content Sidebar */}
        <div className="w-full lg:w-96 bg-slate-50 dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 flex flex-col rounded-r-xl">
          {/* Header */}
          <div className="p-5 border-b border-slate-200 dark:border-slate-800">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              {lesson.title}
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
              {lesson.description}
            </p>

            {/* Overall Progress */}
            {totalVideos > 0 && (
              <div className="mt-4">
                <div className="flex justify-between text-xs text-slate-500 mb-1">
                  <span>Overall Progress</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <Progress
                  percent={progress}
                  size="small"
                  strokeColor="#6366f1"
                  showInfo={false}
                />
                <p className="text-xs text-slate-400 mt-2">
                  {watchedCount} of {totalVideos} videos completed
                </p>
              </div>
            )}
          </div>

          {/* Courses and Videos List */}
          <div className="flex-1 overflow-y-auto p-3 space-y-4">
            {lesson.courses?.map((course) => {
              const courseWatchedCount =
                course.videos?.filter((v) => watchedVideos.includes(v.id))
                  .length || 0;
              const courseTotalVideos = course.videos?.length || 0;
              const courseProgress =
                courseTotalVideos > 0
                  ? (courseWatchedCount / courseTotalVideos) * 100
                  : 0;

              return (
                <div key={course.id} className="space-y-2">
                  {/* Course Header */}
                  <div
                    className="p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 cursor-pointer hover:border-indigo-300 transition-all"
                    onClick={() => {
                      if (course.videos?.length > 0) {
                        handleVideoSelect(course.videos[0], course);
                      }
                    }}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-semibold text-sm text-slate-900 dark:text-white">
                          {course.title}
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-1">
                          {course.about || course.description}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <span className="text-xs text-slate-400">
                          {courseTotalVideos} videos
                        </span>
                        {courseProgress > 0 && (
                          <span className="text-xs text-emerald-500">
                            {Math.round(courseProgress)}% complete
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Videos List */}
                  <div className="ml-4 space-y-1">
                    {course.videos?.map((video, index) => {
                      const isWatched = watchedVideos.includes(video.id);
                      const isLocked =
                        !video.is_free &&
                        !isWatched &&
                        index > 0 &&
                        !watchedVideos.includes(course.videos[index - 1]?.id);

                      return (
                        <button
                          key={video.id}
                          onClick={() => {
                            if (!isLocked) {
                              handleVideoSelect(video, course);
                            } else {
                              message.info(
                                "Complete previous videos to unlock this one",
                              );
                            }
                          }}
                          disabled={isLocked}
                          className={`w-full text-left p-2 rounded-lg transition-all ${
                            selectedVideo?.id === video.id
                              ? "bg-indigo-50 dark:bg-indigo-900/20 border-indigo-200 dark:border-indigo-800"
                              : isLocked
                                ? "opacity-50 cursor-not-allowed"
                                : "hover:bg-slate-100 dark:hover:bg-slate-800"
                          } border border-transparent`}
                        >
                          <div className="flex items-start gap-2">
                            <div
                              className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                                isWatched
                                  ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400"
                                  : isLocked
                                    ? "bg-slate-200 text-slate-500 dark:bg-slate-800 dark:text-slate-600"
                                    : "bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400"
                              }`}
                            >
                              {isWatched ? "✓" : index + 1}
                            </div>
                            <div className="flex-1">
                              <div className="font-medium text-sm text-slate-900 dark:text-white">
                                {video.title}
                              </div>
                              <div className="flex items-center gap-2 mt-0.5">
                                <ClockCircleOutlined className="text-xs text-slate-400" />
                                <span className="text-xs text-slate-400">
                                  ~15 min
                                </span>
                                {video.is_free && (
                                  <span className="text-xs text-emerald-500">
                                    Free Preview
                                  </span>
                                )}
                              </div>
                            </div>
                            {isWatched && (
                              <CheckCircleFilled className="text-emerald-500 text-sm" />
                            )}
                            {isLocked && (
                              <LockOutlined className="text-slate-400 text-sm" />
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-slate-200 dark:border-slate-800">
            <button
              onClick={onClose}
              className="w-full py-2.5 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium text-sm hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors"
            >
              Close Lesson
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
