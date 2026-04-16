import baseApi from "@/redux/api/baseApi/baseApi";

export const learninghubApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ─── Learning Lessons ────────────────────────────────────────────────────
    getAllLearningLessons: builder.query<LearningLessonAPI[], void>({
      query: () => ({
        url: "/api/learninghub/learning-lessons/",
        method: "GET",
      }),
      // Transform the response to extract the results array
      transformResponse: (response: { results: LearningLessonAPI[] }) =>
        response.results,
      providesTags: ["LearningLessons"],
    }),

    getLearningLessonById: builder.query<LearningLessonAPI, number>({
      query: (id) => ({
        url: `/api/learninghub/learning-lessons/${id}/`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: "LearningLessons", id }],
    }),

    // ─── Courses ─────────────────────────────────────────────────────────────
    getAllCourses: builder.query<CourseAPI[], void>({
      query: () => ({
        url: "/api/learninghub/courses/",
        method: "GET",
      }),
      // Transform the response to extract the results array
      transformResponse: (response: { results: CourseAPI[] }) =>
        response.results,
      providesTags: ["Courses"],
    }),

    getCourseById: builder.query<CourseAPI, number>({
      query: (id) => ({
        url: `/api/learninghub/courses/${id}/`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: "Courses", id }],
    }),

    // ─── Videos ──────────────────────────────────────────────────────────────
    getAllVideos: builder.query<VideoAPI[], void>({
      query: () => ({
        url: "/api/learninghub/videos/",
        method: "GET",
      }),
      // Transform the response to extract the results array
      transformResponse: (response: { results: VideoAPI[] }) =>
        response.results,
      providesTags: ["Videos"],
    }),

    getVideoById: builder.query<VideoAPI, number>({
      query: (id) => ({
        url: `/api/learninghub/videos/${id}/`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: "Videos", id }],
    }),

    // ─── User Course Progress ─────────────────────────────────────────────────
    getAllUserCourseProgress: builder.query<CourseProgressAPI[], void>({
      query: () => ({
        url: "/api/learninghub/course-progress/",
        method: "GET",
      }),
      // Transform the response to extract the results array
      transformResponse: (response: { results: CourseProgressAPI[] }) =>
        response.results,
      providesTags: ["UserCourseProgress"],
    }),

    createCourseProgress: builder.mutation<
      { message: string; course_progress: { user: number; course: number } },
      { user: number; course: number }
    >({
      query: (body) => ({
        url: "/api/learninghub/course-progress/create/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["UserCourseProgress"],
    }),
  }),
});

// Export hooks remain the same
export const {
  useGetAllLearningLessonsQuery,
  useGetLearningLessonByIdQuery,
  useGetAllCoursesQuery,
  useGetCourseByIdQuery,
  useGetAllVideosQuery,
  useGetVideoByIdQuery,
  useGetAllUserCourseProgressQuery,
  useCreateCourseProgressMutation,
} = learninghubApi;

// ─── Shared API Types (exported for components) ───────────────────────────────

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
  total_UserCourseStart: number;
  total_completed_UserCourseStart: number;
}
