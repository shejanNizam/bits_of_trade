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
import { Modal } from "antd";
import { useState } from "react";
import type { Lesson } from "./Lessons";

// ─── Props ────────────────────────────────────────────────────────────────────

interface LessonModalProps {
  lesson: Lesson | null;
  open: boolean;
  onClose: () => void;
  progress: CourseProgressAPI[];
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function LessonModal({
  lesson,
  open,
  onClose,
  progress,
}: LessonModalProps) {
  const [createCourseProgress, { isLoading: starting, error: createError }] =
    useCreateCourseProgressMutation();

  // null = course overview, VideoAPI object = video player view
  const [activeVideo, setActiveVideo] = useState<VideoAPI | null>(null);

  if (!lesson) return null;

  const courseProgress = progress.find((p) => p.course.id === lesson.courseId);
  const hasStarted = !!courseProgress;

  const watchedIds = new Set<number>(
    courseProgress?.videos_watched.map((v) => v.id) ?? [],
  );

  const apiError = createError
    ? "error" in createError
      ? (createError as { error: string }).error
      : "Failed to enrol. Please try again."
    : null;

  // Enrol user (if not started) then open first available video
  async function handleStartOrContinue() {
    if (!lesson) return;

    if (!hasStarted) {
      const userId = Number(localStorage.getItem("user_id") ?? 0);
      if (!userId) {
        alert("Please log in to start this course.");
        return;
      }
      try {
        await createCourseProgress({
          user: userId,
          course: lesson.courseId,
        }).unwrap();
      } catch {
        return;
      }
    }

    // Jump to first unwatched video (or first video if all watched)
    const firstPlayable =
      lesson.videos.find((v) => !watchedIds.has(v.id)) ?? lesson.videos[0];
    if (firstPlayable) setActiveVideo(firstPlayable);
  }

  // Click a specific video row in the list
  function handleVideoRowClick(video: VideoAPI, isLocked: boolean) {
    if (isLocked) return;
    setActiveVideo(video);
  }

  function handleClose() {
    setActiveVideo(null);
    onClose();
  }

  return (
    <Modal
      open={open}
      onCancel={handleClose}
      footer={null}
      width={700}
      centered
      destroyOnClose
      closeIcon={
        <CloseOutlined className="text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors mt-2 mr-2" />
      }
      styles={{
        body: { padding: 0, borderRadius: "16px", overflow: "hidden" },
      }}
      className="responsive-lesson-modal"
    >
      {activeVideo ? (
        <VideoPlayerView
          video={activeVideo}
          lesson={lesson}
          watchedIds={watchedIds}
          onBack={() => setActiveVideo(null)}
          onClose={handleClose}
          onSelectVideo={setActiveVideo}
        />
      ) : (
        <CourseOverview
          lesson={lesson}
          hasStarted={hasStarted}
          courseProgress={courseProgress}
          watchedIds={watchedIds}
          starting={starting}
          apiError={apiError}
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
  lesson: Lesson;
  hasStarted: boolean;
  courseProgress: CourseProgressAPI | undefined;
  watchedIds: Set<number>;
  starting: boolean;
  apiError: string | null;
  onVideoRowClick: (video: VideoAPI, isLocked: boolean) => void;
  onStartOrContinue: () => void;
  onClose: () => void;
}

function CourseOverview({
  lesson,
  hasStarted,
  courseProgress,
  watchedIds,
  starting,
  apiError,
  onVideoRowClick,
  onStartOrContinue,
  onClose,
}: CourseOverviewProps) {
  return (
    <div className="p-5 sm:p-8 transition-colors duration-300">
      <div className="flex flex-col gap-6">
        {/* Badges */}
        <div className="flex flex-wrap gap-2">
          <span className="bg-red-50 dark:bg-red-900/20 text-red-500 dark:text-red-400 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wide">
            {lesson.type}
          </span>
          <span className="bg-emerald-50 dark:bg-emerald-900/20 text-emerald-500 dark:text-emerald-400 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wide">
            {lesson.level}
          </span>
        </div>

        {/* Title */}
        <div className="space-y-2">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white leading-tight">
            {lesson.title}
          </h2>
          <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500 text-sm font-medium">
            <ClockCircleOutlined />
            <span>{lesson.time} total duration</span>
          </div>
        </div>

        {/* Outcome */}
        <div className="bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 rounded-xl p-4 flex items-center gap-4">
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

        {/* Why Now */}
        <div className="bg-orange-50 dark:bg-orange-900/10 border border-orange-100 dark:border-orange-900/30 p-4 rounded-xl">
          <p className="text-xs font-bold text-orange-700 dark:text-orange-400 uppercase tracking-wider">
            Why you should take this now:
          </p>
          <p className="text-sm text-orange-800 dark:text-orange-200/80 font-medium mt-1">
            {lesson.insight}
          </p>
        </div>

        {/* Progress (if started) */}
        {hasStarted && courseProgress && (
          <div className="bg-teal-50/50 dark:bg-teal-900/10 border border-teal-100 dark:border-teal-900/20 rounded-xl p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-bold text-slate-900 dark:text-white">
                Your Progress
              </span>
              <span className="text-xs font-bold text-slate-600 dark:text-slate-400">
                {courseProgress.completed_videos} /{" "}
                {courseProgress.total_videos} completed
              </span>
            </div>
            <div className="h-2 w-full rounded-full bg-teal-100 dark:bg-teal-900/30 overflow-hidden">
              <div
                className="h-full bg-teal-500 transition-all duration-500"
                style={{ width: `${courseProgress.completion_percentage}%` }}
              />
            </div>
            <p className="mt-2 text-[11px] text-teal-600 dark:text-teal-400 font-medium">
              {Math.max(
                0,
                100 - Math.round(courseProgress.completion_percentage),
              )}
              % remaining
            </p>
          </div>
        )}

        {/* Modules list — rows are clickable */}
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
                const isWatched = watchedIds.has(video.id);
                const firstUnwatchedIdx = lesson.videos.findIndex(
                  (v) => !watchedIds.has(v.id),
                );
                const isCurrent = idx === firstUnwatchedIdx;
                // Lock non-free videos if user hasn't enrolled yet
                const isLocked = !video.is_free && !hasStarted && idx > 0;

                return (
                  <button
                    key={video.id}
                    onClick={() => onVideoRowClick(video, isLocked)}
                    disabled={isLocked}
                    className={`w-full text-left flex items-center justify-between p-3 sm:p-4 rounded-xl border transition-all duration-200 group ${
                      isLocked
                        ? "opacity-60 cursor-not-allowed bg-white dark:bg-slate-900/40 border-slate-100 dark:border-slate-800"
                        : isWatched
                          ? "bg-emerald-50/30 dark:bg-emerald-900/10 border-emerald-100 dark:border-emerald-900/20 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 cursor-pointer"
                          : isCurrent
                            ? "bg-indigo-50/40 dark:bg-indigo-900/10 border-indigo-100 dark:border-indigo-900/30 shadow-sm hover:bg-indigo-50 dark:hover:bg-indigo-900/20 cursor-pointer"
                            : "bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60 cursor-pointer"
                    }`}
                  >
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div
                        className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shrink-0 ${
                          isLocked
                            ? "bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-600"
                            : isWatched
                              ? "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600"
                              : isCurrent
                                ? "bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400"
                                : "bg-slate-100 dark:bg-slate-800 text-slate-500"
                        }`}
                      >
                        {isLocked ? (
                          <LockOutlined className="text-sm" />
                        ) : isWatched ? (
                          <CheckCircleFilled className="text-lg sm:text-xl" />
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

                    <div className="flex items-center gap-2 shrink-0">
                      {isLocked && (
                        <span className="text-[10px] font-bold text-slate-300 dark:text-slate-700 uppercase tracking-tighter">
                          Locked
                        </span>
                      )}
                      {isWatched && (
                        <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-tighter">
                          Done
                        </span>
                      )}
                      {!isLocked && (
                        <PlayCircleFilled className="text-slate-300 dark:text-slate-700 text-base group-hover:text-indigo-400 transition-colors" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {apiError && (
          <p className="text-xs text-red-500 font-medium">{apiError}</p>
        )}

        {/* Footer */}
        <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-slate-100 dark:border-slate-800">
          <button
            onClick={onClose}
            className="order-2 sm:order-1 flex-1 py-3 px-4 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-bold text-sm hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            Close Overview
          </button>
          <button
            onClick={onStartOrContinue}
            disabled={starting || lesson.videos.length === 0}
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
  );
}

// ─── Video Player View ────────────────────────────────────────────────────────

interface VideoPlayerViewProps {
  video: VideoAPI;
  lesson: Lesson;
  watchedIds: Set<number>;
  onBack: () => void;
  onClose: () => void;
  onSelectVideo: (video: VideoAPI) => void;
}

function VideoPlayerView({
  video,
  lesson,
  watchedIds,
  onBack,
  onSelectVideo,
}: VideoPlayerViewProps) {
  const currentIdx = lesson.videos.findIndex((v) => v.id === video.id);
  const prevVideo = currentIdx > 0 ? lesson.videos[currentIdx - 1] : null;
  const nextVideo =
    currentIdx < lesson.videos.length - 1
      ? lesson.videos[currentIdx + 1]
      : null;

  // Build absolute URL — API returns relative path like /media/...
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
          Module {currentIdx + 1} of {lesson.videos.length}
        </span>
      </div>

      {/* Video player */}
      <div className="w-full bg-black aspect-video">
        <video
          key={video.id} /* key forces re-mount on video change */
          src={videoUrl}
          controls
          autoPlay
          className="w-full h-full object-contain"
          controlsList="nodownload"
        >
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Video title + watched badge */}
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
        {lesson.videos.map((v, idx) => {
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
              {/* Number / check circle */}
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
