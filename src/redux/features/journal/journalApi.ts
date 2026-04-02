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
      invalidatesTags: ["rules"],
    }),

    // GET api --> get all trades (pagination)
    getAllAddNote: builder.query({
      query: ({ page = 1, limit = 10 }) => ({
        url: "/api/journal/trade-notes/",
        method: "GET",
        params: { page, limit },
      }),
      providesTags: ["rules"],
    }),

    // DELETE api --> delete trade
    deleteAddNote: builder.mutation({
      query: (id) => ({
        url: `/api/journal/trade-notes/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["rules"],
    }),

    // for psychology log tab ------------------------------>>
    // apis
    // apis
    // apis

    // for mistakes tab ------------------------------>>
    // apis
    // apis
    // apis

    // for session recape tab ------------------------------>>
    // apis
    // apis
    // apis

    // for learning notes tab ------------------------------>>
    // apis
    // apis
    // apis
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
} = journalApi;
