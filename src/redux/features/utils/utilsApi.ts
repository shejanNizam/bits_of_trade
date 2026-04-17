import baseApi from "@/redux/api/baseApi/baseApi";

export const utilsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // get trade id and symbol for dropdown in trade link with others
    getTrade: builder.query({
      query: () => ({
        url: `/api/tradelog/trades/symbols/`,
        method: "GET",
      }),
      providesTags: ["tradelog"],
    }),

    //  get strategy id and title
    getStrategyForTrade: builder.query({
      query: () => ({
        url: `/api/strategies/names/`,
        method: "GET",
      }),
      providesTags: ["tradelog"],
    }),

    // get mistake id and title for tag with trade
    getMistake: builder.query({
      query: () => ({
        url: `/api/mistakes/list/`,
        method: "GET",
      }),
      providesTags: ["mistake"],
    }),

    // get rules is and title
    getRules: builder.query({
      query: () => ({
        url: `/api/rules/list/`,
        method: "GET",
      }),
      providesTags: ["rules"],
    }),
  }),
});

export const {
  // get all trade with id and title
  useGetTradeQuery,

  //  get strategy id and title
  useGetStrategyForTradeQuery,

  //  get mistake id and title
  useGetMistakeQuery,

  //    get rules id and title
  useGetRulesQuery,
} = utilsApi;
