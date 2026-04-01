import baseApi from "@/redux/api/baseApi/baseApi";

export const disciplineApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // GET /api/discipline/current-session/
    getCurrentSession: builder.query({
      query: () => ({
        url: "/api/discipline/current-session/",
        method: "GET",
      }),
      providesTags: ["discipline"],
    }),

    // GET /api/discipline/violations-timeline/
    getViolationsTimeline: builder.query({
      query: () => ({
        url: "/api/discipline/violations-timeline/",
        method: "GET",
      }),
      providesTags: ["discipline"],
    }),

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

    //  unlock the journal
    // /api/discipline/unlock/
    unlockJournal: builder.mutation({
      query: () => ({
        url: "/api/discipline/unlock/",
        method: "POST",
      }),
      invalidatesTags: ["discipline"],
    }),
  }),
});

export const {
  useGetCurrentSessionQuery,
  useGetViolationsTimelineQuery,
  useUnlockJournalMutation,
} = disciplineApi;
