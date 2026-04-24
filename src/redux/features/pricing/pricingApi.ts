// /api/cms/reviews/

import baseApi from "@/redux/api/baseApi/baseApi";

export const pricingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllPricing: builder.query({
      query: () => ({
        url: "/api/cms/pricing/",
        method: "GET",
      }),
      providesTags: ["pricing"],
    }),
  }),
});

export const { useGetAllPricingQuery } = pricingApi;
