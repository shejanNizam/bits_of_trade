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

    // GET api --> get all mistake
    getAllStrategy: builder.query({
      query: ({ page = 1, limit = 10 }) => ({
        url: "/api/strategies/",
        method: "GET",
        params: { page, limit },
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
  }),
});

export const {
  useCreateStrategyMutation,
  useUpdateStrategyMutation,
  useGetAllStrategyQuery,
  useDeleteStrategyMutation,
} = strategyApi;
