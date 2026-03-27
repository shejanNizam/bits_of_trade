import baseApi from "@/redux/api/baseApi/baseApi";

export const tradeIntelligenceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // POST api --> create mistake
    createMistake: builder.mutation({
      query: (payload) => ({
        url: "/api/mistakes/",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["mistake"],
    }),

    // PUT api --> update mistake
    updateMistake: builder.mutation({
      query: ({ payload, id }) => ({
        url: `/api/mistakes/${id}/`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["mistake"],
    }),

    // GET api --> get all mistake
    getAllMistake: builder.query({
      query: ({ page = 1, limit = 10 }) => ({
        url: "/api/mistakes/",
        method: "GET",
        params: { page, limit },
      }),
      providesTags: ["mistake"],
    }),

    // DELETE api --> delete mistake
    deleteMistake: builder.mutation({
      query: (id) => ({
        url: `/api/mistakes/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["mistake"],
    }),
  }),
});

export const {} = tradeIntelligenceApi;
