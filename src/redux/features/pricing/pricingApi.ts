import baseApi from "@/redux/api/baseApi/baseApi";

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

export interface CreateOrderRequest {
  card_key: CardKey;
  billing_cycle?: "monthly" | "yearly";
}

export interface CreateOrderResponse {
  order_id: string;
  amount: number;
  amount_display: number;
  currency: string;
  key: string;
  transaction_id: string;
  plan_name: string;
  plan_type: PlanType;
}

export interface PaymentTransaction {
  id: string;
  razorpay_order_id: string;
  razorpay_payment_id: string;
  amount: string;
  currency: string;
  plan_type: PlanType;
  card_key: CardKey;
  billing_cycle: BillingCycleValue;
  status: PaymentStatus;
  paid_at: string | null;
  created_at: string;
}

export const pricingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllPricing: builder.query({
      query: () => ({
        url: "/api/cms/pricing/",
        method: "GET",
      }),
      providesTags: ["pricing"],
    }),

    createOrder: builder.mutation<CreateOrderResponse, CreateOrderRequest>({
      query: (body) => ({
        url: "/api/payments/create-order/",
        method: "POST",
        body,
      }),
    }),

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
