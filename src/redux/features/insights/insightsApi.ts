import baseApi from "@/redux/api/baseApi/baseApi";

export const insightsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // GET api --> get all insights metrics
    getAllInsightsMetrics: builder.query({
      query: ({ page = 1, limit = 10 }) => ({
        url: "/api/insights/metrics/",
        method: "GET",
        params: { page, limit },
      }),
      providesTags: ["insights"],
    }),
  }),
});

export const { useGetAllInsightsMetricsQuery } = insightsApi;
