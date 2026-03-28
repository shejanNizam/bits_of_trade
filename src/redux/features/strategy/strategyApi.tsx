import baseApi from "@/redux/api/baseApi/baseApi";

export const strategyApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // POST api --> create mistake
    createStrategy: builder.mutation({
      query: (payload) => ({
        url: "/api/strategies/",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["strategy"],
    }),

    // PUT api --> update mistake
    updateStrategy: builder.mutation({
      query: ({ payload, id }) => ({
        url: `/api/strategies/${id}/`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["strategy"],
    }),

    // GET api --> get all strategies
    getAllStrategy: builder.query({
      query: ({ page = 1, limit = 10, search = "" }) => ({
        url: "/api/strategies/",
        method: "GET",
        params: {
          page,
          limit,
          search: search || undefined,
        },
      }),
      providesTags: ["strategy"],
    }),

    // DELETE api --> delete mistake
    deleteStrategy: builder.mutation({
      query: (id) => ({
        url: `/api/strategies/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["strategy"],
    }),

    //  GET api --> get strategy for community tab
    getAllStrategyForCommunity: builder.query({
      query: ({ page = 1, limit = 10 }) => ({
        url: "/api/strategies/community/",
        method: "GET",
        params: { page, limit },
      }),
      providesTags: ["strategy"],
    }),

    //  GET api --> get strategy for community tab
    getAllStrategyForTemplates: builder.query({
      query: ({ page = 1, limit = 10 }) => ({
        url: "/api/strategies/templates/",
        method: "GET",
        params: { page, limit },
      }),
      providesTags: ["strategy"],
    }),

    // Add Community Strategy to Mine
    addToMineStrategy: builder.mutation({
      query: (id) => ({
        url: `/api/strategies/${id}/add-to-mine/`,
        method: "POST",
      }),
      invalidatesTags: ["strategy"],
    }),
  }),
});

export const {
  useCreateStrategyMutation,
  useUpdateStrategyMutation,
  useGetAllStrategyQuery,
  useDeleteStrategyMutation,

  // for community
  useGetAllStrategyForCommunityQuery,

  // for templates
  useGetAllStrategyForTemplatesQuery,

  // add to mine strategy
  useAddToMineStrategyMutation,
} = strategyApi;
