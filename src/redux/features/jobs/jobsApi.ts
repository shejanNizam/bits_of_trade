import baseApi from "@/redux/api/baseApi/baseApi";

export const jobsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // getJobs: builder.query({
    //   query: ({ page = 1, limit = 10 }) => ({
    //     // url: `/job/all?${type}=${value}`,
    //     url: `/job/all`,
    //     method: "GET",
    //     params: {
    //       page,
    //       limit,
    //     },
    //   }),
    //   providesTags: ["jobs"],
    // }),

    getJobs: builder.query({
      query: ({ page = 1, limit = 10, category, profession, jobType }) => ({
        url: `/job/all`,
        method: "GET",
        params: {
          page,
          limit,
          ...(category ? { category } : {}),
          ...(profession ? { profession } : {}),
          ...(jobType ? { jobType } : {}),
        },
      }),
      providesTags: ["jobs"],
    }),

    // get jobs by id
    getJobDetails: builder.query({
      query: (id) => ({
        url: `/job/single/${id}`,
        method: "GET",
      }),
      providesTags: ["jobs"],
    }),

    // post jobs
    // postJob: builder.mutation({
    //   query: (jobData) => ({
    //     url: "/job/create",
    //     method: "POST",
    //     body: jobData,
    //   }),
    //   invalidatesTags: ["jobs"],
    // }),
  }),
});

export const { useGetJobsQuery, useGetJobDetailsQuery } = jobsApi;
