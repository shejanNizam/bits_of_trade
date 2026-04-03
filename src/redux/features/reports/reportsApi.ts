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
      providesTags: ["reports"],
    }),

    //  get all report for risk and drawdown tab
    getAllRisk: builder.query({
      query: ({ page = 1, limit = 10 }) => ({
        url: "/api/reports/risk/",
        method: "GET",
        params: { page, limit },
      }),
      providesTags: ["reports"],
    }),

    // get all
    // /api/reports/behavior/
    getAllBehavior: builder.query({
      query: ({ page = 1, limit = 10 }) => ({
        url: "/api/reports/behavior/",
        method: "GET",
        params: { page, limit },
      }),
      providesTags: ["reports"],
    }),
  }),
});

export const {
  useGetAllPerfomanceQuery,
  useGetAllRiskQuery,
  useGetAllBehaviorQuery,
} = reportsApi;
