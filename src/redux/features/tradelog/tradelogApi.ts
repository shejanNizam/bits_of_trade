import baseApi from "@/redux/api/baseApi/baseApi";

export const tradelogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // POST api --> trade import (CSV) from form-data
    importTrade: builder.mutation({
      query: (payload) => ({
        url: "/api/tradelog/trades/import/",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: [
        "tradelog",
        "overview",
        "reports",
        "insights",
        "discipline",
        "user",
      ],
    }),

    // POST api --> trade import manually (raw body)
    importTradeManually: builder.mutation({
      query: (payload) => ({
        url: "/api/tradelog/trades/",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: [
        "tradelog",
        "overview",
        "reports",
        "insights",
        "discipline",
        "user",
      ],
    }),

    // PUT api --> update trade manually
    updateTradeManually: builder.mutation({
      query: ({ payload, id }) => ({
        url: `/api/tradelog/trades/${id}/`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: [
        "tradelog",
        "overview",
        "reports",
        "insights",
        "discipline",
        "user",
      ],
    }),

    // GET api --> get all trades (pagination)
    getAllTrade: builder.query({
      query: (params = {}) => ({
        url: "/api/tradelog/trades/",
        method: "GET",
        params: params,
      }),
      providesTags: ["tradelog"],
    }),

    // GET api --> get single trade
    getSingleTrade: builder.query({
      query: (id) => ({
        url: `/api/tradelog/trades/${id}/`,
        method: "GET",
      }),
      providesTags: ["tradelog"],
    }),

    // DELETE api --> delete single trade
    deleteTrade: builder.mutation({
      query: (id) => ({
        url: `/api/tradelog/trades/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: [
        "tradelog",
        "overview",
        "reports",
        "insights",
        "discipline",
        "user",
      ],
    }),

    // POST api --> bulk delete trades
    bulkDeleteTrades: builder.mutation({
      query: (payload) => ({
        url: "/api/tradelog/trades/bulk-delete/",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: [
        "tradelog",
        "overview",
        "reports",
        "insights",
        "discipline",
        "user",
      ],
    }),

    // post screenshots
    uploadScreenshots: builder.mutation({
      query: (payload) => ({
        url: "/api/tradelog/upload-screenshot/",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["tradelog"],
    }),
  }),
});

export const {
  useImportTradeMutation,
  useImportTradeManuallyMutation,
  useUpdateTradeManuallyMutation,
  useGetAllTradeQuery,
  useGetSingleTradeQuery,
  useDeleteTradeMutation,
  useBulkDeleteTradesMutation, // Add this

  // screenshots
  useUploadScreenshotsMutation,
} = tradelogApi;
