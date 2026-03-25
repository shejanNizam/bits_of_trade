import baseApi from "@/redux/api/baseApi/baseApi";

export const rulesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // POST api --> create custom rules
    createCustomRules: builder.mutation({
      query: (payload) => ({
        url: "/api/rules/",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["rules"],
    }),

    // PATCH api --> update rules
    updateRules: builder.mutation({
      query: ({ payload, id }) => ({
        url: `/api/rules/${id}/`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["rules"],
    }),

    // GET api --> get all trades (pagination)
    getAllRules: builder.query({
      query: ({ page = 1, limit = 10 }) => ({
        url: "/api/rules/",
        method: "GET",
        params: { page, limit },
      }),
      providesTags: ["rules"],
    }),

    // DELETE api --> delete trade
    deleteRules: builder.mutation({
      query: (id) => ({
        url: `/api/rules/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["rules"],
    }),
  }),
});

export const {
  useCreateCustomRulesMutation,
  useUpdateRulesMutation,
  useGetAllRulesQuery,
  useDeleteRulesMutation,
} = rulesApi;
