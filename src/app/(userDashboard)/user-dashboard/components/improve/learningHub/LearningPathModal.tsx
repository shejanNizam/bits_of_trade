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
import { Modal, Progress } from "antd";
import { useEffect, useState } from "react";
import type { LearningPath } from "./AllLearningPaths";
import VideoPlayerView from "./VideoPlayerView";

interface LearningPathModalProps {
  path: LearningPath | null;
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

export default function LearningPathModal({
  path,
  open,
  onClose,
  progress,
  onProgressRefresh,
}: LearningPathModalProps) {
  const [createCourseProgress, { isLoading: starting }] =
    useCreateCourseProgressMutation();
  const [activeVideo, setActiveVideo] = useState<VideoAPI | null>(null);
  const [enrolError, setEnrolError] = useState<string | null>(null);
  const [localCourseProgress, setLocalCourseProgress] =
    useState<CourseProgressAPI | null>(null);
  const selectedCourseId = path?.courseId;

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

  if (!path) return null;

  const selectedPath = path;
  const courseProgress =
    localCourseProgress ??
    progress.find((p) => p.course.id === selectedPath.courseId);
  const hasStarted = !!courseProgress;
  const watchedIds = new Set<number>(
    courseProgress?.videos_watched.map((v) => v.id) ?? [
      ...selectedPath.watchedIds,
    ],
  );
  const completedVideos = selectedPath.videos.filter((video) =>
    watchedIds.has(video.id),
  ).length;
  const totalVideos = selectedPath.videos.length;
  const percentage =
    totalVideos > 0 ? Math.round((completedVideos / totalVideos) * 100) : 0;

  function handleClose() {
    setActiveVideo(null);
    setEnrolError(null);
    setLocalCourseProgress(null);
    onClose();
  }

  async function ensureCourseProgress(): Promise<CourseProgressAPI | null> {
    if (courseProgress) return courseProgress;

    const userId = getStoredUserId();

    if (!userId) {
      setEnrolError("Could not find your user ID. Please log in again.");
      return null;
    }

    try {
      await createCourseProgress({
        user: userId,
        course: selectedPath.courseId,
      }).unwrap();
    } catch (error) {
      if (!isDuplicateProgressError(error)) {
        setEnrolError(getApiErrorMessage(error));
        return null;
      }
    }

    const refreshedProgress = await onProgressRefresh();
    const nextProgress = refreshedProgress?.find(
      (item) => item.course.id === selectedPath.courseId,
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
      selectedPath.videos.find((video) => !nextWatchedIds.has(video.id)) ??
      selectedPath.videos[0];

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
          videos={selectedPath.videos}
          watchedIds={watchedIds}
          progressId={courseProgress?.id ?? null}
          onBack={() => setActiveVideo(null)}
          onSelectVideo={setActiveVideo}
          onProgressChange={setLocalCourseProgress}
        />
      ) : (
        <CourseOverview
          path={selectedPath}
          hasStarted={hasStarted}
          watchedIds={watchedIds}
          completedVideos={completedVideos}
          totalVideos={totalVideos}
          percentage={percentage}
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
  path: LearningPath;
  hasStarted: boolean;
  watchedIds: Set<number>;
  completedVideos: number;
  totalVideos: number;
  percentage: number;
  starting: boolean;
  enrolError: string | null;
  onVideoRowClick: (video: VideoAPI, isLocked: boolean) => void;
  onStartOrContinue: () => void;
  onClose: () => void;
}

function CourseOverview({
  path,
  hasStarted,
  watchedIds,
  completedVideos,
  totalVideos,
  percentage,
  starting,
  enrolError,
  onVideoRowClick,
  onStartOrContinue,
  onClose,
}: CourseOverviewProps) {
  const firstUnwatchedIdx = path.videos.findIndex(
    (video) => !watchedIds.has(video.id),
  );

  return (
    <div className="transition-colors duration-300">
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

        <div className="flex flex-wrap gap-4 text-xs sm:text-sm text-slate-400 dark:text-slate-500 font-medium">
          <span>{totalVideos} modules</span>
          <span className="flex items-center gap-1">
            <ClockCircleOutlined /> {path.time}
          </span>
        </div>
      </div>

      <div className="p-6 sm:p-8 space-y-6">
        <div className="bg-teal-50/50 dark:bg-teal-900/10 border border-teal-100 dark:border-teal-900/20 rounded-xl p-5">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-bold text-slate-900 dark:text-white">
              Your Progress
            </span>
            <span className="text-xs sm:text-sm font-bold text-slate-600 dark:text-slate-400">
              {completedVideos} / {totalVideos} completed
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
            {Math.max(0, 100 - percentage)}% remaining to complete this path
          </p>
        </div>

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
                const isCurrent =
                  !isWatched &&
                  (firstUnwatchedIdx === -1
                    ? idx === 0
                    : idx === firstUnwatchedIdx);
                const isLocked = !video.is_free && !hasStarted;

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
                    className={`w-full text-left flex items-center justify-between gap-3 p-3 sm:p-4 rounded-xl border transition-all duration-200 group ${
                      isLocked
                        ? "opacity-60 cursor-not-allowed bg-slate-50/50 dark:bg-slate-900/40 border-slate-100 dark:border-slate-800"
                        : status === "Completed"
                          ? "bg-emerald-50/30 dark:bg-emerald-900/10 border-emerald-100 dark:border-emerald-900/20 hover:bg-emerald-50 cursor-pointer"
                          : status === "Current"
                            ? "bg-white dark:bg-slate-900 border-indigo-200 dark:border-indigo-800 shadow-sm hover:bg-indigo-50/30 cursor-pointer"
                            : "bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60 cursor-pointer"
                    }`}
                  >
                    <div className="flex min-w-0 items-center gap-3 sm:gap-4">
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

                      <div className="min-w-0">
                        <h4
                          className={`text-xs sm:text-sm font-bold leading-tight truncate ${
                            isLocked
                              ? "text-slate-400 dark:text-slate-600"
                              : "text-slate-900 dark:text-slate-200"
                          }`}
                        >
                          Module {idx + 1}: {video.title}
                        </h4>
                        {video.description && (
                          <span className="text-[10px] sm:text-xs text-slate-400 dark:text-slate-500 truncate block">
                            {video.description}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {status === "Locked" && (
                        <span className="text-[9px] sm:text-[10px] font-bold text-slate-300 dark:text-slate-600 uppercase">
                          Locked
                        </span>
                      )}
                      {status === "Completed" && (
                        <span className="text-[9px] sm:text-[10px] font-bold text-emerald-500 uppercase">
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

        {enrolError && (
          <div className="rounded-lg bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 p-3">
            <p className="text-xs text-red-600 dark:text-red-400 font-medium">
              {enrolError}
            </p>
          </div>
        )}

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
              ? "Enrolling..."
              : hasStarted
                ? "Continue Learning"
                : "Start Learning"}
          </button>
        </div>
      </div>
    </div>
  );
}
