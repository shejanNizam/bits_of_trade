// import baseApi from "@/redux/api/baseApi/baseApi";

// export const tradelogApi = baseApi.injectEndpoints({
//   endpoints: (builder) => ({
//     // POST api --> trade import (CSV) from form-data
//     importTrade: builder.mutation({
//       query: (payload) => ({
//         url: "/api/tradelog/trades/import/",
//         method: "POST",
//         body: payload,
//       }),
//       invalidatesTags: ["tradelog"],
//     }),

//     // POST api --> trade import manually (raw body)
//     importTradeManually: builder.mutation({
//       query: (payload) => ({
//         url: "/api/tradelog/trades/",
//         method: "POST",
//         body: payload,
//       }),
//       invalidatesTags: ["tradelog"],
//     }),

//     // PUT api --> update trade manually
//     updateTradeManually: builder.mutation({
//       query: ({ payload, id }) => ({
//         url: `/api/tradelog/trades/${id}/`,
//         method: "PATCH",
//         body: payload,
//       }),
//       invalidatesTags: ["tradelog"],
//     }),

//     // GET api --> get all trades (pagination)
//     getAllTrade: builder.query({
//       query: ({ page = 1, limit = 10 }) => ({
//         url: "/api/tradelog/trades/",
//         method: "GET",
//         params: { page, limit },
//       }),
//       providesTags: ["tradelog"],
//     }),

//     // GET api --> get single trade
//     getSingleTrade: builder.query({
//       query: (id) => ({
//         url: `/api/tradelog/trades/${id}/`,
//         method: "GET",
//       }),
//       providesTags: ["tradelog"],
//     }),

//     // DELETE api --> delete trade
//     deleteTrade: builder.mutation({
//       query: (id) => ({
//         url: `/api/tradelog/trades/${id}/`,
//         method: "DELETE",
//       }),
//       invalidatesTags: ["tradelog"],
//     }),

//     // post screen shorts
//     uploadScreenshots: builder.mutation({
//       query: (payload) => ({
//         url: "/api/tradelog/upload-screenshot/",
//         method: "POST",
//         body: payload,
//       }),
//       invalidatesTags: ["tradelog"],
//     }),
//   }),
// });

// export const {
//   useImportTradeMutation,
//   useImportTradeManuallyMutation,
//   useUpdateTradeManuallyMutation,
//   useGetAllTradeQuery,
//   useGetSingleTradeQuery,
//   useDeleteTradeMutation,

//   // screenshots
//   useUploadScreenshotsMutation,
// } = tradelogApi;

// tradelogApi.ts
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
      invalidatesTags: ["tradelog"],
    }),

    // POST api --> trade import manually (raw body)
    importTradeManually: builder.mutation({
      query: (payload) => ({
        url: "/api/tradelog/trades/",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["tradelog"],
    }),

    // PUT api --> update trade manually
    updateTradeManually: builder.mutation({
      query: ({ payload, id }) => ({
        url: `/api/tradelog/trades/${id}/`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["tradelog"],
    }),

    // GET api --> get all trades (pagination)
    getAllTrade: builder.query({
      query: ({ page = 1, limit = 10 }) => ({
        url: "/api/tradelog/trades/",
        method: "GET",
        params: { page, limit },
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
      invalidatesTags: ["tradelog"],
    }),

    // POST api --> bulk delete trades
    bulkDeleteTrades: builder.mutation({
      query: (payload) => ({
        url: "/api/tradelog/trades/bulk-delete/",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["tradelog"],
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
