import baseApi from "@/redux/api/baseApi/baseApi";

export const learninghubApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ============ Learning Lessons (User: GET only) ============
    getAllLearningLessons: builder.query({
      query: () => ({
        url: "/api/learninghub/learning-lessons/",
        method: "GET",
      }),
      providesTags: ["LearningLessons"],
    }),

    getLearningLessonById: builder.query({
      query: (id: number) => ({
        url: `/api/learninghub/learning-lessons/${id}/`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: "LearningLessons", id }],
    }),

    // ============ Courses (User: GET only) ============
    getAllCourses: builder.query({
      query: () => ({
        url: "/api/learninghub/courses/",
        method: "GET",
      }),
      providesTags: ["Courses"],
    }),

    getCourseById: builder.query({
      query: (id: number) => ({
        url: `/api/learninghub/courses/${id}/`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: "Courses", id }],
    }),

    // ============ Videos (User: GET only) ============
    getAllVideos: builder.query({
      query: () => ({
        url: "/api/learninghub/videos/",
        method: "GET",
      }),
      providesTags: ["Videos"],
    }),

    getVideoById: builder.query({
      query: (id: number) => ({
        url: `/api/learninghub/videos/${id}/`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: "Videos", id }],
    }),

    // ============ User Course Progress (Authenticated User) ============
    getAllUserCourseProgress: builder.query({
      query: () => ({
        url: "/api/learninghub/course-progress/",
        method: "GET",
      }),
      providesTags: ["UserCourseProgress"],
    }),

    createCourseProgress: builder.mutation({
      query: (body: { user: number; course: number }) => ({
        url: "/api/learninghub/course-progress/create/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["UserCourseProgress"],
    }),

    // Optional: Mark video as watched (if you have this endpoint)
    markVideoAsWatched: builder.mutation({
      query: ({
        progressId,
        videoId,
      }: {
        progressId: number;
        videoId: number;
      }) => ({
        url: `/api/learninghub/course-progress/${progressId}/add-video/`,
        method: "POST",
        body: { video_id: videoId },
      }),
      invalidatesTags: ["UserCourseProgress"],
    }),
  }),
});

// Export hooks
export const {
  // Learning Lessons
  useGetAllLearningLessonsQuery,
  useGetLearningLessonByIdQuery,
  // Courses
  useGetAllCoursesQuery,
  useGetCourseByIdQuery,
  // Videos
  useGetAllVideosQuery,
  useGetVideoByIdQuery,
  // User Course Progress
  useGetAllUserCourseProgressQuery,
  useCreateCourseProgressMutation,
  useMarkVideoAsWatchedMutation,
} = learninghubApi;
