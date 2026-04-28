"use client";

import {
  CourseProgressAPI,
  useUnwatchVideoMutation,
  useWatchVideoMutation,
  VideoAPI,
} from "@/redux/features/learninghub/learninghubApi";
import {
  ArrowLeftOutlined,
  CheckCircleFilled,
  PlayCircleFilled,
} from "@ant-design/icons";
import { message } from "antd";

interface VideoPlayerViewProps {
  video: VideoAPI;
  videos: VideoAPI[];
  watchedIds: Set<number>;
  progressId: number | null;
  onBack: () => void;
  onSelectVideo: (video: VideoAPI) => void;
  onProgressChange: (progress: CourseProgressAPI) => void;
}

export default function VideoPlayerView({
  video,
  videos,
  watchedIds,
  progressId,
  onBack,
  onSelectVideo,
  onProgressChange,
}: VideoPlayerViewProps) {
  const [watchVideo, { isLoading: isMarking }] = useWatchVideoMutation();
  const [unwatchVideo, { isLoading: isUnmarking }] =
    useUnwatchVideoMutation();

  const currentIdx = videos.findIndex((v) => v.id === video.id);
  const moduleNumber = currentIdx >= 0 ? currentIdx + 1 : 1;
  const prevVideo = currentIdx > 0 ? videos[currentIdx - 1] : null;
  const nextVideo =
    currentIdx >= 0 && currentIdx < videos.length - 1
      ? videos[currentIdx + 1]
      : null;

  const videoUrl = video.video.startsWith("http")
    ? video.video
    : `${process.env.NEXT_PUBLIC_API_URL ?? ""}${video.video}`;
  const completedVideos = videos.filter((item) => watchedIds.has(item.id)).length;
  const completionPercentage =
    videos.length > 0 ? Math.round((completedVideos / videos.length) * 100) : 0;

  async function handleMarkWatched() {
    if (!progressId || watchedIds.has(video.id) || isMarking) return;

    try {
      const result = await watchVideo({ progressId, videoId: video.id }).unwrap();
      onProgressChange(result.course_progress);
    } catch {
      message.error("Could not mark this video as watched.");
    }
  }

  async function handleUnmarkWatched() {
    if (!progressId || !watchedIds.has(video.id) || isUnmarking) return;

    try {
      const result = await unwatchVideo({
        progressId,
        videoId: video.id,
      }).unwrap();
      onProgressChange(result.course_progress);
    } catch {
      message.error("Could not remove this video from watched.");
    }
  }

  const isCurrentWatched = watchedIds.has(video.id);
  const isSaving = isMarking || isUnmarking;

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-slate-100 dark:border-slate-800">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors"
        >
          <ArrowLeftOutlined />
          Back to overview
        </button>
        <span className="text-xs text-slate-400 font-medium shrink-0">
          Module {moduleNumber} of {videos.length}
        </span>
      </div>

      <div className="w-full bg-black aspect-video">
        <video
          key={video.id}
          src={videoUrl}
          controls
          autoPlay
          className="w-full h-full object-contain"
          controlsList="nodownload"
          onEnded={handleMarkWatched}
        >
          Your browser does not support the video tag.
        </video>
      </div>

      <div className="px-5 pt-4 pb-2 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
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

        {progressId && (
          <div className="flex items-center gap-2 shrink-0">
            {isCurrentWatched ? (
              <>
                <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-500 uppercase tracking-wide">
                  <CheckCircleFilled /> Watched
                </span>
                <button
                  onClick={handleUnmarkWatched}
                  disabled={isSaving}
                  className="text-[10px] font-bold text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 uppercase tracking-wide transition-colors disabled:opacity-50"
                >
                  {isUnmarking ? "Saving..." : "Undo"}
                </button>
              </>
            ) : (
              <button
                onClick={handleMarkWatched}
                disabled={isSaving}
                className="text-[10px] font-bold text-indigo-500 hover:text-indigo-700 dark:hover:text-indigo-300 uppercase tracking-wide transition-colors disabled:opacity-50"
              >
                {isMarking ? "Saving..." : "Mark as watched"}
              </button>
            )}
          </div>
        )}
      </div>

      <div className="px-5 pb-4">
        <div className="mb-1.5 flex items-center justify-between text-[11px] font-bold text-slate-500 dark:text-slate-400">
          <span>Course Progress</span>
          <span>
            {completedVideos} / {videos.length} watched
          </span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
          <div
            className="h-full bg-teal-500 transition-all duration-500"
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
      </div>

      <div className="flex gap-3 px-5 py-3 border-t border-slate-100 dark:border-slate-800 mt-1">
        <button
          onClick={() => prevVideo && onSelectVideo(prevVideo)}
          disabled={!prevVideo}
          className="flex-1 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-sm font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <button
          onClick={() => nextVideo && onSelectVideo(nextVideo)}
          disabled={!nextVideo}
          className="flex-1 py-2.5 rounded-xl bg-indigo-600 dark:bg-indigo-500 text-white text-sm font-bold hover:bg-indigo-700 dark:hover:bg-indigo-600 shadow-md shadow-indigo-200 dark:shadow-none transition-all disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>

      <div className="px-5 pb-5 max-h-52 overflow-y-auto custom-scrollbar space-y-1.5">
        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">
          All Modules
        </p>
        {videos.map((item, idx) => {
          const isWatched = watchedIds.has(item.id);
          const isActive = item.id === video.id;

          return (
            <button
              key={item.id}
              onClick={() => onSelectVideo(item)}
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
                {item.title}
              </span>

              {isActive && (
                <span className="ml-auto shrink-0 text-[9px] font-bold text-indigo-500 uppercase">
                  Playing
                </span>
              )}
              {!isActive && !isWatched && (
                <PlayCircleFilled className="ml-auto shrink-0 text-slate-300 dark:text-slate-700" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
