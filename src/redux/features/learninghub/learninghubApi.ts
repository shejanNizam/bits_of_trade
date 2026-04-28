import baseApi from "@/redux/api/baseApi/baseApi";

type ListResponse<T> = T[] | { results: T[] };

const toList = <T>(response: ListResponse<T>): T[] =>
  Array.isArray(response) ? response : response.results;

export interface VideoAPI {
  id: number;
  title: string;
  description: string | null;
  video: string;
  course: {
    id: number;
    title: string;
    course_type: string;
    course_level: string;
  };
  is_free: boolean;
  is_complete: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface CourseAPI {
  id: number;
  title: string;
  about: string | null;
  description: string | null;
  course_type: string;
  course_level: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  lessons: {
    id: number;
    title: string;
    description: string | null;
  };
  videos: VideoAPI[];
}

export interface LearningLessonAPI {
  id: number;
  title: string;
  description: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  courses: CourseAPI[];
}

export interface CourseProgressAPI {
  id: number;
  user: { id: number; email: string };
  course: {
    id: number;
    title: string;
    course_type: string;
    course_level: string;
  };
  videos_watched: { id: number; title: string }[];
  started_at: string;
  completed_at: string | null;
  completion_percentage: number;
  total_videos: number;
  completed_videos: number;
  is_completed: boolean;
  total_UserCourseStart?: number;
  total_completed_UserCourseStart?: number;
}

export type LearningLessonWriteBody = {
  title: string;
  description?: string | null;
  is_active?: boolean;
};

export type CourseWriteBody = {
  title: string;
  lessons: number;
  about?: string | null;
  description?: string | null;
  course_type?: string;
  course_level?: string;
  is_active?: boolean;
};

export type VideoWriteBody = {
  title: string;
  course: number;
  description?: string | null;
  is_free?: boolean;
  is_complete?: boolean;
  is_active?: boolean;
};

export type CourseProgressCreateBody = {
  user: number;
  course: number;
};

type LearningLessonWriteResponse = {
  message: string;
  learning_lesson: LearningLessonAPI;
};

type CourseWriteResponse = {
  message: string;
  course: CourseAPI;
};

type VideoWriteResponse = {
  message: string;
  video: VideoAPI;
};

type CourseProgressCreateResponse = {
  message: string;
  course_progress: CourseProgressCreateBody;
};

type CourseProgressWriteResponse = {
  message: string;
  course_progress: CourseProgressAPI;
};

type DeleteResponse = { message: string } | void;

export const learninghubApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllLearningLessons: builder.query<LearningLessonAPI[], void>({
      query: () => ({
        url: "/api/learninghub/learning-lessons/",
        method: "GET",
      }),
      transformResponse: (response: ListResponse<LearningLessonAPI>) =>
        toList(response),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({
                type: "LearningLessons" as const,
                id,
              })),
              { type: "LearningLessons" as const, id: "LIST" },
            ]
          : [{ type: "LearningLessons" as const, id: "LIST" }],
    }),

    createLearningLesson: builder.mutation<
      LearningLessonWriteResponse,
      LearningLessonWriteBody
    >({
      query: (body) => ({
        url: "/api/learninghub/learning-lessons/",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "LearningLessons", id: "LIST" }],
    }),

    getLearningLessonById: builder.query<LearningLessonAPI, number>({
      query: (id) => ({
        url: `/api/learninghub/learning-lessons/${id}/`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: "LearningLessons", id }],
    }),

    updateLearningLesson: builder.mutation<
      LearningLessonWriteResponse,
      { id: number; body: LearningLessonWriteBody }
    >({
      query: ({ id, body }) => ({
        url: `/api/learninghub/learning-lessons/${id}/`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "LearningLessons", id },
        { type: "LearningLessons", id: "LIST" },
      ],
    }),

    patchLearningLesson: builder.mutation<
      LearningLessonWriteResponse,
      { id: number; body: Partial<LearningLessonWriteBody> }
    >({
      query: ({ id, body }) => ({
        url: `/api/learninghub/learning-lessons/${id}/`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "LearningLessons", id },
        { type: "LearningLessons", id: "LIST" },
      ],
    }),

    deleteLearningLesson: builder.mutation<DeleteResponse, number>({
      query: (id) => ({
        url: `/api/learninghub/learning-lessons/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["LearningLessons", "Courses", "Videos", "UserCourseProgress"],
    }),

    getAllCourses: builder.query<CourseAPI[], void>({
      query: () => ({
        url: "/api/learninghub/courses/",
        method: "GET",
      }),
      transformResponse: (response: ListResponse<CourseAPI>) =>
        toList(response),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Courses" as const, id })),
              { type: "Courses" as const, id: "LIST" },
            ]
          : [{ type: "Courses" as const, id: "LIST" }],
    }),

    createCourse: builder.mutation<CourseWriteResponse, CourseWriteBody>({
      query: (body) => ({
        url: "/api/learninghub/courses/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["LearningLessons", { type: "Courses", id: "LIST" }],
    }),

    getCourseById: builder.query<CourseAPI, number>({
      query: (id) => ({
        url: `/api/learninghub/courses/${id}/`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: "Courses", id }],
    }),

    updateCourse: builder.mutation<
      CourseWriteResponse,
      { id: number; body: CourseWriteBody }
    >({
      query: ({ id, body }) => ({
        url: `/api/learninghub/courses/${id}/`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        "LearningLessons",
        { type: "Courses", id },
        { type: "Courses", id: "LIST" },
      ],
    }),

    patchCourse: builder.mutation<
      CourseWriteResponse,
      { id: number; body: Partial<CourseWriteBody> }
    >({
      query: ({ id, body }) => ({
        url: `/api/learninghub/courses/${id}/`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        "LearningLessons",
        { type: "Courses", id },
        { type: "Courses", id: "LIST" },
      ],
    }),

    deleteCourse: builder.mutation<DeleteResponse, number>({
      query: (id) => ({
        url: `/api/learninghub/courses/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["LearningLessons", "Courses", "Videos", "UserCourseProgress"],
    }),

    getAllVideos: builder.query<VideoAPI[], void>({
      query: () => ({
        url: "/api/learninghub/videos/",
        method: "GET",
      }),
      transformResponse: (response: ListResponse<VideoAPI>) => toList(response),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Videos" as const, id })),
              { type: "Videos" as const, id: "LIST" },
            ]
          : [{ type: "Videos" as const, id: "LIST" }],
    }),

    createVideo: builder.mutation<VideoWriteResponse, FormData>({
      query: (body) => ({
        url: "/api/learninghub/videos/",
        method: "POST",
        body,
      }),
      invalidatesTags: [
        "LearningLessons",
        "Courses",
        { type: "Videos", id: "LIST" },
      ],
    }),

    getVideoById: builder.query<VideoAPI, number>({
      query: (id) => ({
        url: `/api/learninghub/videos/${id}/`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: "Videos", id }],
    }),

    updateVideo: builder.mutation<
      VideoWriteResponse,
      { id: number; body: VideoWriteBody | FormData }
    >({
      query: ({ id, body }) => ({
        url: `/api/learninghub/videos/${id}/`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        "LearningLessons",
        "Courses",
        { type: "Videos", id },
        { type: "Videos", id: "LIST" },
      ],
    }),

    patchVideo: builder.mutation<
      VideoWriteResponse,
      { id: number; body: Partial<VideoWriteBody> | FormData }
    >({
      query: ({ id, body }) => ({
        url: `/api/learninghub/videos/${id}/`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        "LearningLessons",
        "Courses",
        { type: "Videos", id },
        { type: "Videos", id: "LIST" },
      ],
    }),

    deleteVideo: builder.mutation<DeleteResponse, number>({
      query: (id) => ({
        url: `/api/learninghub/videos/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["LearningLessons", "Courses", "Videos", "UserCourseProgress"],
    }),

    getAllUserCourseProgress: builder.query<CourseProgressAPI[], void>({
      query: () => ({
        url: "/api/learninghub/course-progress/",
        method: "GET",
      }),
      transformResponse: (response: ListResponse<CourseProgressAPI>) =>
        toList(response),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({
                type: "UserCourseProgress" as const,
                id,
              })),
              { type: "UserCourseProgress" as const, id: "LIST" },
            ]
          : [{ type: "UserCourseProgress" as const, id: "LIST" }],
    }),

    createCourseProgress: builder.mutation<
      CourseProgressCreateResponse,
      CourseProgressCreateBody
    >({
      query: (body) => ({
        url: "/api/learninghub/course-progress/create/",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "UserCourseProgress", id: "LIST" }],
    }),

    watchVideo: builder.mutation<
      CourseProgressWriteResponse,
      { progressId: number; videoId: number }
    >({
      query: ({ progressId, videoId }) => ({
        url: `/api/learninghub/course-progress/${progressId}/watch/${videoId}/`,
        method: "POST",
      }),
      invalidatesTags: (_result, _error, { progressId }) => [
        { type: "UserCourseProgress", id: progressId },
        { type: "UserCourseProgress", id: "LIST" },
      ],
    }),

    unwatchVideo: builder.mutation<
      CourseProgressWriteResponse,
      { progressId: number; videoId: number }
    >({
      query: ({ progressId, videoId }) => ({
        url: `/api/learninghub/course-progress/${progressId}/unwatch/${videoId}/`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, { progressId }) => [
        { type: "UserCourseProgress", id: progressId },
        { type: "UserCourseProgress", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetAllLearningLessonsQuery,
  useCreateLearningLessonMutation,
  useGetLearningLessonByIdQuery,
  useUpdateLearningLessonMutation,
  usePatchLearningLessonMutation,
  useDeleteLearningLessonMutation,
  useGetAllCoursesQuery,
  useCreateCourseMutation,
  useGetCourseByIdQuery,
  useUpdateCourseMutation,
  usePatchCourseMutation,
  useDeleteCourseMutation,
  useGetAllVideosQuery,
  useCreateVideoMutation,
  useGetVideoByIdQuery,
  useUpdateVideoMutation,
  usePatchVideoMutation,
  useDeleteVideoMutation,
  useGetAllUserCourseProgressQuery,
  useCreateCourseProgressMutation,
  useWatchVideoMutation,
  useUnwatchVideoMutation,
} = learninghubApi;
