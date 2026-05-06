import baseApi from "@/redux/api/baseApi/baseApi";

// ─── Shared Types ─────────────────────────────────────────────────────────────

export type CardKey =
  | "discipline_tools"
  | "learning_hub"
  | "combo_monthly"
  | "combo_annual";

export type PlanType = "tool" | "learning" | "both";

export type PaymentStatus = "pending" | "success" | "failed" | "refunded";

export type BillingCycleValue =
  | "monthly"
  | "yearly"
  | "biannual"
  | "annual"
  | "forever"
  | "quarterly";

// ─── Create Order ─────────────────────────────────────────────────────────────

export interface CreateOrderRequest {
  card_key: CardKey;
  /**
   * Only relevant for `discipline_tools`.
   * Pass "monthly" or "yearly"; ignored for all other card_keys.
   */
  billing_cycle?: "monthly" | "yearly";
}

export interface CreateOrderResponse {
  /** Razorpay order ID — pass to the Razorpay checkout SDK */
  order_id: string;
  /** Amount in paise — pass directly to the Razorpay JS SDK */
  amount: number;
  /** Amount in rupees — use for UI display (e.g. "₹999") */
  amount_display: number;
  currency: string;
  /** Razorpay public key ID for the frontend SDK */
  key: string;
  /** Internal UUID for this transaction */
  transaction_id: string;
  /** Human-readable plan name from CMS */
  plan_name: string;
  plan_type: PlanType;
}

// ─── Payment History ──────────────────────────────────────────────────────────

export interface PaymentTransaction {
  id: string;
  razorpay_order_id: string;
  razorpay_payment_id: string;
  /** Amount as a decimal string in INR (e.g. "999.00") */
  amount: string;
  currency: string;
  plan_type: PlanType;
  card_key: CardKey;
  billing_cycle: BillingCycleValue;
  status: PaymentStatus;
  paid_at: string | null;
  created_at: string;
}

// ─── API ──────────────────────────────────────────────────────────────────────

export const pricingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ── GET /api/cms/pricing/ ────────────────────────────────────────────────
    getAllPricing: builder.query({
      query: () => ({
        url: "/api/cms/pricing/",
        method: "GET",
      }),
      providesTags: ["pricing"],
    }),

    // ── POST /api/payments/create-order/ ────────────────────────────────────
    /**
     * Creates a Razorpay order and a pending PaymentTransaction record.
     * Prices are fetched live from the CMS — never hardcoded.
     *
     * @example
     *   createOrder({ card_key: "discipline_tools", billing_cycle: "monthly" })
     *   createOrder({ card_key: "learning_hub" })
     *   createOrder({ card_key: "combo_annual" })
     */
    createOrder: builder.mutation<CreateOrderResponse, CreateOrderRequest>({
      query: (body) => ({
        url: "/api/payments/create-order/",
        method: "POST",
        body,
      }),
    }),

    // ── GET /api/payments/history/ ───────────────────────────────────────────
    /**
     * Returns all payment transactions for the authenticated user,
     * ordered most-recent first.
     */
    getPaymentHistory: builder.query<PaymentTransaction[], void>({
      query: () => ({
        url: "/api/payments/history/",
        method: "GET",
      }),
      providesTags: ["payments"],
    }),
  }),
});

export const {
  useGetAllPricingQuery,
  useCreateOrderMutation,
  useGetPaymentHistoryQuery,
} = pricingApi;
