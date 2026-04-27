import baseApi from "@/redux/api/baseApi/baseApi";

export const journalApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // for daily journal tab ------------------------------>>
    getAllDailyJournal: builder.query({
      query: () => ({
        url: "/api/journal/daily/",
        method: "GET",
      }),
      providesTags: ["journal"],
    }),

    createDailyJournalEntry: builder.mutation({
      query: (payload) => ({
        url: "/api/journal/daily/",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["journal", "discipline", "user", "reports"],
    }),
    // Update daily journal entry
    updateDailyJournalEntry: builder.mutation({
      query: ({ id, payload }) => ({
        url: `/api/journal/daily/${id}/`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["journal", "discipline", "user", "reports"],
    }),

    // Delete daily journal entry
    deleteDailyJournalEntry: builder.mutation({
      query: (id) => ({
        url: `/api/journal/daily/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["journal", "discipline", "user", "reports"],
    }),

    //  for  trade note tab ------------------------------>>
    // POST api --> create daily journal entry
    createAddNote: builder.mutation({
      query: (payload) => ({
        url: "/api/journal/trade-notes/",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["journal", "reports"],
    }),

    // PATCH api --> update rules
    updateAddNote: builder.mutation({
      query: ({ payload, id }) => ({
        url: `/api/journal/trade-notes/${id}/`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["journal", "reports"],
    }),

    // GET api --> get all trades (pagination)
    getAllAddNote: builder.query({
      query: ({ page = 1, limit = 10 }) => ({
        url: "/api/journal/trade-notes/",
        method: "GET",
        params: { page, limit },
      }),
      providesTags: ["journal"],
    }),

    // DELETE api --> delete trade
    deleteAddNote: builder.mutation({
      query: (id) => ({
        url: `/api/journal/trade-notes/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["journal", "reports"],
    }),

    // for psychology log tab ------------------------------>>
    createPsychologyLog: builder.mutation({
      query: (payload) => ({
        url: "/api/journal/psychology/",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["journal", "reports"],
    }),

    updatePsychologyLog: builder.mutation({
      query: ({ payload, id }) => ({
        url: `/api/journal/psychology/${id}/`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["journal", "reports"],
    }),

    getAllPsychologyLog: builder.query({
      query: ({ page = 1, limit = 10 }) => ({
        url: "/api/journal/psychology/",
        method: "GET",
        params: { page, limit },
      }),
      providesTags: ["journal"],
    }),

    deletePsychologyLog: builder.mutation({
      query: (id) => ({
        url: `/api/journal/psychology/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["journal", "reports"],
    }),

    // for mistakes tab ------------------------------>>
    tradeLinkWithMistake: builder.mutation({
      query: (payload) => ({
        url: "/api/mistakes/trade-links/",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: [
        "journal",
        "tradelog",
        "mistake",
        "discipline",
        "user",
        "overview",
        "reports",
      ],
    }),

    tradeLinkWithRules: builder.mutation({
      query: (payload) => ({
        url: "/api/rules/trade-links/",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: [
        "journal",
        "tradelog",
        "rules",
        "discipline",
        "user",
        "overview",
        "reports",
      ],
    }),

    // for session recape tab ------------------------------>>
    createSessionRecap: builder.mutation({
      query: (payload) => ({
        url: "/api/journal/recaps/",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["journal", "discipline", "user", "reports"],
    }),

    updateSessionRecap: builder.mutation({
      query: ({ payload, id }) => ({
        url: `/api/journal/recaps/${id}/`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["journal", "discipline", "user", "reports"],
    }),

    getAllSessionRecap: builder.query({
      query: ({ page = 1, limit = 10 }) => ({
        url: "/api/journal/recaps/",
        method: "GET",
        params: { page, limit },
      }),
      providesTags: ["journal"],
    }),

    deleteSessionRecap: builder.mutation({
      query: (id) => ({
        url: `/api/journal/recaps/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["journal", "discipline", "user", "reports"],
    }),

    // for learning notes tab ------------------------------>>
    createLearningNotes: builder.mutation({
      query: (payload) => ({
        url: "/api/journal/learning-notes/",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["journal", "reports"],
    }),

    updateLearningNotes: builder.mutation({
      query: ({ payload, id }) => ({
        url: `/api/journal/learning-notes/${id}/`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["journal", "reports"],
    }),

    getAllLearningNotes: builder.query({
      query: ({ page = 1, limit = 10 }) => ({
        url: "/api/journal/learning-notes/",
        method: "GET",
        params: { page, limit },
      }),
      providesTags: ["journal"],
    }),

    deleteLearningNotes: builder.mutation({
      query: (id) => ({
        url: `/api/journal/learning-notes/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["journal", "reports"],
    }),

    // Journal Streak get api
    getAllJournalStreak: builder.query({
      query: () => ({
        url: "/api/journal/streak/",
        method: "GET",
      }),
      providesTags: ["journal"],
    }),
  }),
});

export const {
  useGetAllDailyJournalQuery,
  useCreateDailyJournalEntryMutation,
  useUpdateDailyJournalEntryMutation,
  useDeleteDailyJournalEntryMutation,

  // for trade notes tab
  useCreateAddNoteMutation,
  useUpdateAddNoteMutation,
  useGetAllAddNoteQuery,
  useDeleteAddNoteMutation,

  // for psychology log tab
  useCreatePsychologyLogMutation,
  useUpdatePsychologyLogMutation,
  useGetAllPsychologyLogQuery,
  useDeletePsychologyLogMutation,

  // trade link with mistake
  useTradeLinkWithMistakeMutation,

  // trade link with rules
  useTradeLinkWithRulesMutation,

  // for session recap tab
  useCreateSessionRecapMutation,
  useUpdateSessionRecapMutation,
  useGetAllSessionRecapQuery,
  useDeleteSessionRecapMutation,

  // for learning notes
  useCreateLearningNotesMutation,
  useUpdateLearningNotesMutation,
  useGetAllLearningNotesQuery,
  useDeleteLearningNotesMutation,

  //  get all journal streak
  useGetAllJournalStreakQuery,
} = journalApi;
