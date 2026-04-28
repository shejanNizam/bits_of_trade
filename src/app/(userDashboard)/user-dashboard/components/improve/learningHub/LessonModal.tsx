"use client";

import {
  CourseProgressAPI,
  useCreateCourseProgressMutation,
  VideoAPI,
} from "@/redux/features/learninghub/learninghubApi";
import {
  CheckCircleFilled,
  ClockCircleOutlined,
  CloseOutlined,
  LockOutlined,
  PlayCircleFilled,
} from "@ant-design/icons";
import { Modal, message } from "antd";
import { useEffect, useState } from "react";
import type { Lesson } from "./Lessons";
import VideoPlayerView from "./VideoPlayerView";

interface LessonModalProps {
  lesson: Lesson | null;
  open: boolean;
  onClose: () => void;
  progress: CourseProgressAPI[];
  onProgressRefresh: () => Promise<CourseProgressAPI[] | undefined>;
}

function getStoredUserId(): number {
  return (
    Number(localStorage.getItem("user_id")) ||
    Number(localStorage.getItem("userId")) ||
    Number(localStorage.getItem("id")) ||
    0
  );
}

function isDuplicateProgressError(error: unknown): boolean {
  if (!error || typeof error !== "object") return false;

  const data = (error as { data?: unknown }).data;
  if (!data || typeof data !== "object") return false;

  const nonFieldErrors = (data as { non_field_errors?: unknown })
    .non_field_errors;

  return Array.isArray(nonFieldErrors) && nonFieldErrors.length > 0;
}

function getApiErrorMessage(error: unknown): string {
  if (!error || typeof error !== "object") {
    return "Failed to enrol. Please try again.";
  }

  const record = error as Record<string, unknown>;
  if (typeof record.error === "string") return record.error;
  if (typeof record.message === "string") return record.message;

  if (record.data && typeof record.data === "object") {
    return JSON.stringify(record.data);
  }

  return "Failed to enrol. Please try again.";
}

export default function LessonModal({
  lesson,
  open,
  onClose,
  progress,
  onProgressRefresh,
}: LessonModalProps) {
  const [createCourseProgress, { isLoading: starting }] =
    useCreateCourseProgressMutation();
  const [activeVideo, setActiveVideo] = useState<VideoAPI | null>(null);
  const [enrolError, setEnrolError] = useState<string | null>(null);
  const [localCourseProgress, setLocalCourseProgress] =
    useState<CourseProgressAPI | null>(null);
  const selectedCourseId = lesson?.courseId;

  useEffect(() => {
    if (!selectedCourseId) {
      setLocalCourseProgress(null);
      return;
    }

    const latestProgress = progress.find(
      (item) => item.course.id === selectedCourseId,
    );

    if (latestProgress) {
      setLocalCourseProgress(latestProgress);
    }
  }, [selectedCourseId, progress]);

  if (!lesson) return null;

  const selectedLesson = lesson;
  const courseProgress =
    localCourseProgress ??
    progress.find((p) => p.course.id === selectedLesson.courseId);
  const hasStarted = !!courseProgress;
  const watchedIds = new Set<number>(
    courseProgress?.videos_watched.map((v) => v.id) ?? [],
  );

  async function ensureCourseProgress(): Promise<CourseProgressAPI | null> {
    if (courseProgress) return courseProgress;

    const userId = getStoredUserId();

    if (!userId) {
      message.error("Please log in to start this course.");
      return null;
    }

    try {
      await createCourseProgress({
        user: userId,
        course: selectedLesson.courseId,
      }).unwrap();
    } catch (error) {
      if (!isDuplicateProgressError(error)) {
        setEnrolError(getApiErrorMessage(error));
        return null;
      }
    }

    const refreshedProgress = await onProgressRefresh();
    const nextProgress = refreshedProgress?.find(
      (item) => item.course.id === selectedLesson.courseId,
    );

    if (!nextProgress) {
      setEnrolError("Course started, but progress is still loading.");
      return null;
    }

    setLocalCourseProgress(nextProgress);
    return nextProgress;
  }

  function openFirstVideo(nextProgress = courseProgress) {
    const nextWatchedIds = new Set<number>(
      nextProgress?.videos_watched.map((video) => video.id) ?? [],
    );
    const firstPlayable =
      selectedLesson.videos.find((video) => !nextWatchedIds.has(video.id)) ??
      selectedLesson.videos[0];

    if (firstPlayable) setActiveVideo(firstPlayable);
  }

  async function handleStartOrContinue() {
    setEnrolError(null);

    const progressForPlayback = await ensureCourseProgress();
    if (!progressForPlayback) return;

    openFirstVideo(progressForPlayback);
  }

  async function handleVideoRowClick(video: VideoAPI, isLocked: boolean) {
    if (isLocked || starting) return;

    const progressForPlayback = await ensureCourseProgress();
    if (!progressForPlayback) return;

    setActiveVideo(video);
  }

  function handleClose() {
    setActiveVideo(null);
    setEnrolError(null);
    setLocalCourseProgress(null);
    onClose();
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
          videos={selectedLesson.videos}
          watchedIds={watchedIds}
          progressId={courseProgress?.id ?? null}
          onBack={() => setActiveVideo(null)}
          onSelectVideo={setActiveVideo}
          onProgressChange={setLocalCourseProgress}
        />
      ) : (
        <CourseOverview
          lesson={selectedLesson}
          hasStarted={hasStarted}
          courseProgress={courseProgress}
          watchedIds={watchedIds}
          starting={starting}
          enrolError={enrolError}
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

interface CourseOverviewProps {
  lesson: Lesson;
  hasStarted: boolean;
  courseProgress: CourseProgressAPI | undefined;
  watchedIds: Set<number>;
  starting: boolean;
  enrolError: string | null;
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
  enrolError,
  onVideoRowClick,
  onStartOrContinue,
  onClose,
}: CourseOverviewProps) {
  const firstUnwatchedIdx = lesson.videos.findIndex(
    (video) => !watchedIds.has(video.id),
  );

  return (
    <div className="p-5 sm:p-8 transition-colors duration-300">
      <div className="flex flex-col gap-6">
        <div className="flex flex-wrap gap-2">
          <span className="bg-red-50 dark:bg-red-900/20 text-red-500 dark:text-red-400 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wide">
            {lesson.type}
          </span>
          <span className="bg-emerald-50 dark:bg-emerald-900/20 text-emerald-500 dark:text-emerald-400 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wide">
            {lesson.level}
          </span>
        </div>

        <div className="space-y-2">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white leading-tight">
            {lesson.title}
          </h2>
          <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500 text-sm font-medium">
            <ClockCircleOutlined />
            <span>{lesson.time}</span>
          </div>
        </div>

        <div className="bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 rounded-xl p-4">
          <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
            Learning Outcome
          </p>
          <p className="mt-1 text-sm sm:text-base font-semibold text-slate-700 dark:text-slate-200">
            {lesson.outcome}
          </p>
        </div>

        <div className="bg-orange-50 dark:bg-orange-900/10 border border-orange-100 dark:border-orange-900/30 p-4 rounded-xl">
          <p className="text-xs font-bold text-orange-700 dark:text-orange-400 uppercase tracking-wider">
            Why you should take this now
          </p>
          <p className="text-sm text-orange-800 dark:text-orange-200/80 font-medium mt-1">
            {lesson.insight}
          </p>
        </div>

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
          </div>
        )}

        <div className="space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex justify-between items-center">
            Course Modules
            <span className="text-[10px] font-medium text-slate-400">
              {lesson.videos.length} video
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
                const isCurrent =
                  !isWatched &&
                  (firstUnwatchedIdx === -1
                    ? idx === 0
                    : idx === firstUnwatchedIdx);
                const isLocked = !video.is_free && !hasStarted;

                return (
                  <button
                    key={video.id}
                    onClick={() => onVideoRowClick(video, isLocked)}
                    disabled={isLocked}
                    className={`w-full text-left flex items-center justify-between gap-3 p-3 sm:p-4 rounded-xl border transition-all duration-200 group ${
                      isLocked
                        ? "opacity-60 cursor-not-allowed bg-white dark:bg-slate-900/40 border-slate-100 dark:border-slate-800"
                        : isWatched
                          ? "bg-emerald-50/30 dark:bg-emerald-900/10 border-emerald-100 dark:border-emerald-900/20 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 cursor-pointer"
                          : isCurrent
                            ? "bg-indigo-50/40 dark:bg-indigo-900/10 border-indigo-100 dark:border-indigo-900/30 shadow-sm hover:bg-indigo-50 dark:hover:bg-indigo-900/20 cursor-pointer"
                            : "bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60 cursor-pointer"
                    }`}
                  >
                    <div className="flex min-w-0 items-center gap-3 sm:gap-4">
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

                      <div className="min-w-0">
                        <h4
                          className={`text-xs sm:text-sm font-bold leading-tight truncate ${
                            isLocked
                              ? "text-slate-400 dark:text-slate-600"
                              : "text-slate-800 dark:text-slate-200"
                          }`}
                        >
                          {video.title}
                        </h4>
                        <span className="text-[10px] sm:text-xs text-slate-400 dark:text-slate-500 mt-1 block truncate">
                          Module {idx + 1}
                          {video.description ? ` - ${video.description}` : ""}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {isLocked && (
                        <span className="text-[10px] font-bold text-slate-300 dark:text-slate-700 uppercase">
                          Locked
                        </span>
                      )}
                      {isWatched && (
                        <span className="text-[10px] font-bold text-emerald-400 uppercase">
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

        {enrolError && (
          <p className="text-xs text-red-500 font-medium">{enrolError}</p>
        )}

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
              ? "Starting..."
              : hasStarted
                ? "Continue Learning"
                : "Start Learning Now"}
          </button>
        </div>
      </div>
    </div>
  );
}
