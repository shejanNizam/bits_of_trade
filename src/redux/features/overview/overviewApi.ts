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
  }),
});

export const { useGetAllOverviewQuery } = overviewApi;
