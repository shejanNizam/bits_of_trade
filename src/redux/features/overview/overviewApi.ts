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
      query: ({ year, month }) => ({
        url: "api/tradelog/trades/calendar/",
        method: "GET",
        params: { year, month },
      }),
      providesTags: ["overview"],
    }),
    // getCalendarData: builder.query({
    //   query: ({ year, month }: { year?: number; month?: number } = {}) => {
    //     const params = new URLSearchParams();
    //     if (year) params.append("year", year.toString());
    //     if (month) params.append("month", month.toString());

    //     const queryString = params.toString();
    //     return {
    //       url: queryString
    //         ? `api/tradelog/trades/calendar/?${queryString}`
    //         : "api/tradelog/trades/calendar/",
    //       method: "GET",
    //     };
    //   },
    //   providesTags: ["overview"],
    // }),
  }),
});

export const {
  useGetAllOverviewQuery,
  useGetTradeDistributionQuery,
  useGetCalendarDataQuery,
} = overviewApi;
