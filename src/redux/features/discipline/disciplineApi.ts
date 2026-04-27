import baseApi from "@/redux/api/baseApi/baseApi";

export const disciplineApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // /api/discipline/current-session/
    // /api/discipline/current-session/
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

    //  unlock the journal
    unlockJournal: builder.mutation({
      query: (payload) => ({
        url: "/api/discipline/unlock/",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["discipline", "user", "tradelog", "journal"],
    }),
  }),
});

export const {
  useGetCurrentSessionQuery,
  useGetViolationsTimelineQuery,

  // unlock journal api
  useUnlockJournalMutation, // session_state === "red"
} = disciplineApi;
