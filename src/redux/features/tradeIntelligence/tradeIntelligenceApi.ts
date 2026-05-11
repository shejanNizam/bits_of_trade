import baseApi from "@/redux/api/baseApi/baseApi";

export type TimeRange =
  | "all"
  | "last7"
  | "last30"
  | "last90"
  | "last365"
  | "custom";

export interface TradeIntelligencePayload {
  timeRange: TimeRange;
  fromDate?: string;
  toDate?: string;
  market?: string;
  broker?: string;
}

export interface IntelligenceSummary {
  text: string;
  performance: "positive" | "negative";
  discipline_consistency:
    | "strong and consistent"
    | "improving but fragile"
    | "unstable and needs work";
  best_profit_session_state: "GREEN" | "YELLOW" | "RED";
  loss_cluster_session_state: "YELLOW" | "RED";
  total_pnl: number;
  wins: number;
  losses: number;
  win_rate_pct: number;
}

export interface DoingWellItem {
  id: string;
  label: string;
  value: number;
  out_of: number | null;
  pct: number | null;
  description: string;
  view_in_plan: boolean;
}

export interface HoldingBackItem {
  id: string;
  label: string;
  value: number;
  out_of: number | null;
  pct: number | null;
  description: string;
  avg_session_pnl_after?: number;
}

export interface RepeatingPattern {
  id: string;
  label: string;
  value: number;
  out_of: number | null;
  description: string;
  stat: string;
  journal_mention_pct?: number;
}

export interface SessionPnLSummary {
  green_pnl: number;
  yellow_pnl: number;
  red_pnl: number;
}

export interface DisciplineHealth {
  discipline_score: number;
  violated_boundaries: number;
  hard_violations: number;
  sessions_count: number;
  sessions_per_violation: number;
  health_rating:
    | "Excellent"
    | "Improving but fragile"
    | "Needs Attention"
    | "Critical";
  trend: "Improving" | "Declining" | "Stable";
  green_sessions: number;
  yellow_sessions: number;
  red_sessions: number;
  reminder: string;
  session_pnl_summary: SessionPnLSummary;
}

export interface TradeIntelligenceResponse {
  period: string;
  total_trades: number;
  message?: string;
  intelligence_summary?: IntelligenceSummary;
  doing_well?: DoingWellItem[];
  holding_back?: HoldingBackItem[];
  repeating_patterns?: RepeatingPattern[];
  discipline_health?: DisciplineHealth;
}

export const tradeIntelligenceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createAnalyze: builder.mutation<
      TradeIntelligenceResponse,
      TradeIntelligencePayload
    >({
      query: (payload) => ({
        url: "/api/trade_intelligence/analyze/",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["tradeIntelligence"],
    }),
  }),
});

export const { useCreateAnalyzeMutation } = tradeIntelligenceApi;
