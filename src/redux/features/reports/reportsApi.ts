import baseApi from "@/redux/api/baseApi/baseApi";

export const reportsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //  get all report for perfomance tab
    getAllPerfomance: builder.query({
      query: ({ page = 1, limit = 10 }) => ({
        url: "/api/reports/performance/",
        method: "GET",
        params: { page, limit },
      }),
      providesTags: ["mistake"],
    }),
  }),
});

export const { useGetAllPerfomanceQuery } = reportsApi;
