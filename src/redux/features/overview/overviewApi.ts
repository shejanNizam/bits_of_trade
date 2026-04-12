import baseApi from "@/redux/api/baseApi/baseApi";

export const overviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // GET api --> get all overview
    getAllOverview: builder.query({
      query: ({ page = 1, limit = 10 }) => ({
        url: "/api/reports/overview/",
        method: "GET",
        params: { page, limit },
      }),
      providesTags: ["overview"],
    }),

    //
    getTradeDistribution: builder.query({
      query: () => ({
        url: "/api/tradelog/trades/distribution/",
        method: "GET",
      }),
      providesTags: ["overview"],
    }),
    //
    //api/tradelogs/trades/calendar/

    getCalendarData: builder.query({
      query: () => ({
        url: "api/tradelog/trades/calendar/",
        method: "GET",
      }),
      providesTags: ["overview"],
    }),
  }),
});

export const {
  useGetAllOverviewQuery,
  useGetTradeDistributionQuery,
  useGetCalendarDataQuery,
} = overviewApi;
