/* eslint-disable @typescript-eslint/no-explicit-any */

import { FilterParams } from "@/contexts/FilterContext";
import baseApi from "@/redux/api/baseApi/baseApi";

export const reportsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // get all report for performance tab
    getAllPerfomance: builder.query({
      query: (filters: FilterParams = {}) => {
        const params: any = {};

        // Date Range
        if (filters.date_range) params.date_range = filters.date_range;
        if (filters.date_from) params.date_from = filters.date_from;
        if (filters.date_to) params.date_to = filters.date_to;

        // Instrument & Account
        if (filters.broker && filters.broker !== "all")
          params.broker = filters.broker;
        if (filters.market_type) params.market_type = filters.market_type;
        if (filters.direction) params.direction = filters.direction;
        if (filters.strategy) params.strategy = filters.strategy;

        // Outcome & P&L
        if (filters.outcome) params.outcome = filters.outcome;
        if (filters.filter) params.filter = filters.filter;
        if (filters.pnl_min !== undefined) params.pnl_min = filters.pnl_min;
        if (filters.pnl_max !== undefined) params.pnl_max = filters.pnl_max;

        // Psychology & Discipline
        if (filters.emotional_state)
          params.emotional_state = filters.emotional_state;
        if (filters.discipline_status)
          params.discipline_status = filters.discipline_status;
        if (filters.review_status) params.review_status = filters.review_status;

        // JSON Array Fields
        if (filters.rule_breach) params.rule_breach = filters.rule_breach;
        if (filters.mistakes) params.mistakes = filters.mistakes;
        if (filters.tags) params.tags = filters.tags;

        // Search
        if (filters.search) params.search = filters.search;

        // Pagination
        if (filters.page) params.page = filters.page;
        if (filters.limit) params.limit = filters.limit;

        return {
          url: "/api/reports/performance/",
          method: "GET",
          params,
        };
      },
      providesTags: ["reports"],
    }),

    // get all report for risk and drawdown tab
    getAllRisk: builder.query({
      query: (filters: FilterParams = {}) => {
        const params: any = {};

        // Date Range
        if (filters.date_range) params.date_range = filters.date_range;
        if (filters.date_from) params.date_from = filters.date_from;
        if (filters.date_to) params.date_to = filters.date_to;

        // Instrument & Account
        if (filters.broker && filters.broker !== "all")
          params.broker = filters.broker;
        if (filters.market_type) params.market_type = filters.market_type;
        if (filters.direction) params.direction = filters.direction;
        if (filters.strategy) params.strategy = filters.strategy;

        // Outcome & P&L
        if (filters.outcome) params.outcome = filters.outcome;
        if (filters.filter) params.filter = filters.filter;
        if (filters.pnl_min !== undefined) params.pnl_min = filters.pnl_min;
        if (filters.pnl_max !== undefined) params.pnl_max = filters.pnl_max;

        // Psychology & Discipline
        if (filters.emotional_state)
          params.emotional_state = filters.emotional_state;
        if (filters.discipline_status)
          params.discipline_status = filters.discipline_status;
        if (filters.review_status) params.review_status = filters.review_status;

        // JSON Array Fields
        if (filters.rule_breach) params.rule_breach = filters.rule_breach;
        if (filters.mistakes) params.mistakes = filters.mistakes;
        if (filters.tags) params.tags = filters.tags;

        // Search
        if (filters.search) params.search = filters.search;

        // Pagination
        if (filters.page) params.page = filters.page;
        if (filters.limit) params.limit = filters.limit;

        return {
          url: "/api/reports/risk/",
          method: "GET",
          params,
        };
      },
      providesTags: ["reports"],
    }),

    // get all behavior report
    getAllBehavior: builder.query({
      query: (filters: FilterParams = {}) => {
        const params: any = {};

        // Date Range
        if (filters.date_range) params.date_range = filters.date_range;
        if (filters.date_from) params.date_from = filters.date_from;
        if (filters.date_to) params.date_to = filters.date_to;

        // Instrument & Account
        if (filters.broker && filters.broker !== "all")
          params.broker = filters.broker;
        if (filters.market_type) params.market_type = filters.market_type;
        if (filters.direction) params.direction = filters.direction;
        if (filters.strategy) params.strategy = filters.strategy;

        // Outcome & P&L
        if (filters.outcome) params.outcome = filters.outcome;
        if (filters.filter) params.filter = filters.filter;
        if (filters.pnl_min !== undefined) params.pnl_min = filters.pnl_min;
        if (filters.pnl_max !== undefined) params.pnl_max = filters.pnl_max;

        // Psychology & Discipline
        if (filters.emotional_state)
          params.emotional_state = filters.emotional_state;
        if (filters.discipline_status)
          params.discipline_status = filters.discipline_status;
        if (filters.review_status) params.review_status = filters.review_status;

        // JSON Array Fields
        if (filters.rule_breach) params.rule_breach = filters.rule_breach;
        if (filters.mistakes) params.mistakes = filters.mistakes;
        if (filters.tags) params.tags = filters.tags;

        // Search
        if (filters.search) params.search = filters.search;

        // Pagination
        if (filters.page) params.page = filters.page;
        if (filters.limit) params.limit = filters.limit;

        return {
          url: "/api/reports/behavior/",
          method: "GET",
          params,
        };
      },
      providesTags: ["reports"],
    }),

    // get all strategy report
    getAllStrategies: builder.query({
      query: (filters: FilterParams = {}) => {
        const params: any = {};

        // Date Range
        if (filters.date_range) params.date_range = filters.date_range;
        if (filters.date_from) params.date_from = filters.date_from;
        if (filters.date_to) params.date_to = filters.date_to;

        // Instrument & Account
        if (filters.broker && filters.broker !== "all")
          params.broker = filters.broker;
        if (filters.market_type) params.market_type = filters.market_type;
        if (filters.direction) params.direction = filters.direction;
        if (filters.strategy) params.strategy = filters.strategy;

        // Outcome & P&L
        if (filters.outcome) params.outcome = filters.outcome;
        if (filters.filter) params.filter = filters.filter;
        if (filters.pnl_min !== undefined) params.pnl_min = filters.pnl_min;
        if (filters.pnl_max !== undefined) params.pnl_max = filters.pnl_max;

        // Psychology & Discipline
        if (filters.emotional_state)
          params.emotional_state = filters.emotional_state;
        if (filters.discipline_status)
          params.discipline_status = filters.discipline_status;
        if (filters.review_status) params.review_status = filters.review_status;

        // JSON Array Fields
        if (filters.rule_breach) params.rule_breach = filters.rule_breach;
        if (filters.mistakes) params.mistakes = filters.mistakes;
        if (filters.tags) params.tags = filters.tags;

        // Search
        if (filters.search) params.search = filters.search;

        // Pagination
        if (filters.page) params.page = filters.page;
        if (filters.limit) params.limit = filters.limit;

        return {
          url: "/api/reports/strategy/",
          method: "GET",
          params,
        };
      },
      providesTags: ["reports"],
    }),

    // get all journal report
    getAllJournal: builder.query({
      query: (filters: FilterParams = {}) => {
        const params: any = {};

        // Date Range
        if (filters.date_range) params.date_range = filters.date_range;
        if (filters.date_from) params.date_from = filters.date_from;
        if (filters.date_to) params.date_to = filters.date_to;

        // Instrument & Account
        if (filters.broker && filters.broker !== "all")
          params.broker = filters.broker;
        if (filters.market_type) params.market_type = filters.market_type;
        if (filters.direction) params.direction = filters.direction;
        if (filters.strategy) params.strategy = filters.strategy;

        // Outcome & P&L
        if (filters.outcome) params.outcome = filters.outcome;
        if (filters.filter) params.filter = filters.filter;
        if (filters.pnl_min !== undefined) params.pnl_min = filters.pnl_min;
        if (filters.pnl_max !== undefined) params.pnl_max = filters.pnl_max;

        // Psychology & Discipline
        if (filters.emotional_state)
          params.emotional_state = filters.emotional_state;
        if (filters.discipline_status)
          params.discipline_status = filters.discipline_status;
        if (filters.review_status) params.review_status = filters.review_status;

        // JSON Array Fields
        if (filters.rule_breach) params.rule_breach = filters.rule_breach;
        if (filters.mistakes) params.mistakes = filters.mistakes;
        if (filters.tags) params.tags = filters.tags;

        // Search
        if (filters.search) params.search = filters.search;

        // Pagination
        if (filters.page) params.page = filters.page;
        if (filters.limit) params.limit = filters.limit;

        return {
          url: "/api/reports/journal/",
          method: "GET",
          params,
        };
      },
      providesTags: ["reports"],
    }),
  }),
});

export const {
  useGetAllPerfomanceQuery,
  useGetAllRiskQuery,
  useGetAllBehaviorQuery,
  useGetAllStrategiesQuery,
  useGetAllJournalQuery,
} = reportsApi;
