// /api/cms/reviews/

import baseApi from "@/redux/api/baseApi/baseApi";

export const reviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllReview: builder.query({
      query: () => ({
        url: "/api/cms/reviews/",
        method: "GET",
      }),
      providesTags: ["review"],
    }),
  }),
});

export const { useGetAllReviewQuery } = reviewApi;
