import baseApi from "@/redux/api/baseApi/baseApi";

export const journalApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // for daily journal tab ------------------------------>>
    createDailyJournalEntry: builder.mutation({
      query: (payload) => ({
        url: "/api/journal/daily/",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["journal"],
    }),

    //  for  trade note tab ------------------------------>>
    // POST api --> create daily journal entry
    createAddNote: builder.mutation({
      query: (payload) => ({
        url: "/api/journal/trade-notes/",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["journal"],
    }),

    // PATCH api --> update rules
    updateAddNote: builder.mutation({
      query: ({ payload, id }) => ({
        url: `/api/journal/trade-notes/${id}/`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["journal"],
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
      invalidatesTags: ["journal"],
    }),

    // for psychology log tab ------------------------------>>
    createPsychologyLog: builder.mutation({
      query: (payload) => ({
        url: "/api/journal/psychology/",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["journal"],
    }),

    updatePsychologyLog: builder.mutation({
      query: ({ payload, id }) => ({
        url: `/api/journal/psychology/${id}/`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["journal"],
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
      invalidatesTags: ["journal"],
    }),

    // for mistakes tab ------------------------------>>
    tradeLinkWithMistake: builder.mutation({
      query: (payload) => ({
        url: "/api/mistakes/trade-links/",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["journal"],
    }),

    // for session recape tab ------------------------------>>
    createSessionRecap: builder.mutation({
      query: (payload) => ({
        url: "/api/journal/recaps/",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["journal"],
    }),

    updateSessionRecap: builder.mutation({
      query: ({ payload, id }) => ({
        url: `/api/journal/recaps/${id}/`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["journal"],
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
      invalidatesTags: ["journal"],
    }),

    // for learning notes tab ------------------------------>>
    createLearningNotes: builder.mutation({
      query: (payload) => ({
        url: "/api/journal/learning-notes/",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["journal"],
    }),

    updateLearningNotes: builder.mutation({
      query: ({ payload, id }) => ({
        url: `/api/journal/learning-notes/${id}/`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["journal"],
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
      invalidatesTags: ["journal"],
    }),
  }),
});

export const {
  useCreateDailyJournalEntryMutation,

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
} = journalApi;
