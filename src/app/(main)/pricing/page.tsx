/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import PricingCard from "@/components/pricing/PricingCard";
import CustomHeading from "@/components/shared/CustomHeading";
import LoginRequiredModal from "@/components/shared/LoginRequiredModal";
import {
  useCreateOrderMutation,
  useGetAllPricingQuery,
  type CardKey,
  type CreateOrderResponse,
} from "@/redux/features/pricing/pricingApi";
import { RootState } from "@/redux/store";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

// ─── Types ────────────────────────────────────────────────────────────────────

type BillingCycle = "forever" | "monthly" | "quarterly" | "biannual" | "annual";

interface PricingPlan {
  id: string;
  card_key: CardKey;
  name: string;
  tagline: string;
  badge: string;
  cta_label: string;
  footer_note: string;
  price: string;
  price_yearly: string | null;
  billing_cycle: BillingCycle;
  is_popular: boolean;
  is_active: boolean;
  features: string[];
  display_order: number;
  created_at: string;
  updated_at: string;
}

// ─── Notification types ───────────────────────────────────────────────────────

type NotificationType = "success" | "error";

interface Notification {
  type: NotificationType;
  message: string;
}

// ─── Razorpay global (loaded dynamically) ─────────────────────────────────────

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Razorpay: any;
  }
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const CYCLE_PERIOD: Record<BillingCycle, string> = {
  forever: "forever",
  monthly: "/ month",
  quarterly: "/ 3 months",
  biannual: "/ 6 months",
  annual: "/ year",
};

function getPeriod(cycle: BillingCycle): string {
  return CYCLE_PERIOD[cycle] ?? "";
}

function fmt(price: string | number): string {
  return `₹${Number(price).toLocaleString("en-IN")}`;
}

function findPlan(plans: PricingPlan[], cardKey: CardKey): PricingPlan | null {
  return plans.find((p) => p.card_key === cardKey) ?? null;
}

/**
 * Injects the Razorpay checkout script once and resolves when it is ready.
 * Safe to call multiple times — reuses the already-loaded instance.
 */
function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window === "undefined") return resolve(false);
    if (window.Razorpay) return resolve(true);

    const existing = document.querySelector(
      'script[src="https://checkout.razorpay.com/v1/checkout.js"]',
    );
    if (existing) {
      existing.addEventListener("load", () => resolve(true));
      existing.addEventListener("error", () => resolve(false));
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function Pricing() {
  const { data: plans = [], isLoading, isError } = useGetAllPricingQuery({});
  const [createOrder] = useCreateOrderMutation();

  // ── Auth ────────────────────────────────────────────────────────────────────
  // Same selector pattern used in Navbar
  const { user } = useSelector((state: RootState) => state.auth);

  // ── Login-required modal ─────────────────────────────────────────────────────
  const [loginModal, setLoginModal] = useState<{
    open: boolean;
    planName?: string;
  }>({ open: false });

  // ── Per-card loading & inline notifications ──────────────────────────────────
  const [loadingCard, setLoadingCard] = useState<CardKey | null>(null);
  const [notification, setNotification] = useState<Notification | null>(null);
  const notifTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (notifTimer.current) clearTimeout(notifTimer.current);
    };
  }, []);

  const showNotification = useCallback(
    (type: NotificationType, message: string) => {
      if (notifTimer.current) clearTimeout(notifTimer.current);
      setNotification({ type, message });
      notifTimer.current = setTimeout(() => setNotification(null), 6000);
    },
    [],
  );

  /**
   * Core payment handler.
   *
   * Steps:
   *  1. Guard — show login modal if the user is not authenticated.
   *  2. Load Razorpay SDK.
   *  3. Call create-order API → get order details.
   *  4. Open Razorpay checkout modal.
   */
  const handleBuy = useCallback(
    async (
      cardKey: CardKey,
      billingCycle?: "monthly" | "yearly",
      /** Human-readable plan name for the login modal message */
      planName?: string,
    ): Promise<void> => {
      // ── 1. Auth guard ───────────────────────────────────────────────────────
      if (!user) {
        setLoginModal({ open: true, planName });
        return;
      }

      setLoadingCard(cardKey);

      try {
        // ── 2. Load Razorpay script ───────────────────────────────────────────
        const scriptLoaded = await loadRazorpayScript();
        if (!scriptLoaded) {
          showNotification(
            "error",
            "Payment gateway failed to load. Please check your connection and try again.",
          );
          return;
        }

        // ── 3. Create order via backend ───────────────────────────────────────
        const order: CreateOrderResponse = await createOrder({
          card_key: cardKey,
          ...(billingCycle ? { billing_cycle: billingCycle } : {}),
        }).unwrap();

        // ── 4. Open Razorpay checkout ─────────────────────────────────────────
        const rzp = new window.Razorpay({
          key: order.key,
          amount: order.amount, // in paise — Razorpay expects this
          currency: order.currency,
          name: "BitsOfTrade",
          description: order.plan_name,
          order_id: order.order_id,
          handler(_response: unknown) {
            // Razorpay fires this on client-side capture confirmation.
            // The webhook activates the subscription server-side.
            showNotification(
              "success",
              `Payment successful! Your ${order.plan_name} subscription is being activated. It may take a moment to reflect.`,
            );
          },
          modal: {
            ondismiss() {
              // User closed modal without paying — no action needed.
            },
          },
          theme: { color: "#6366f1" },
        });

        rzp.on("payment.failed", (_response: unknown) => {
          showNotification(
            "error",
            "Payment failed. Please try again or use a different payment method.",
          );
        });

        rzp.open();
      } catch (err: unknown) {
        const apiError = err as { data?: { error?: string }; status?: number };
        const message =
          apiError?.data?.error ??
          (apiError?.status === 401
            ? "Please log in to complete your purchase."
            : "Something went wrong. Please try again.");
        showNotification("error", message);
      } finally {
        setLoadingCard(null);
      }
    },
    [user, createOrder, showNotification],
  );

  // ── Resolve plans ────────────────────────────────────────────────────────────

  const disciplinePlan = findPlan(plans as PricingPlan[], "discipline_tools");
  const learningPlan = findPlan(plans as PricingPlan[], "learning_hub");
  const comboMonthly = findPlan(plans as PricingPlan[], "combo_monthly");
  const comboAnnual = findPlan(plans as PricingPlan[], "combo_annual");

  // ── Loading / error states ────────────────────────────────────────────────────

  if (isLoading) {
    return (
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto max-w-7xl text-center text-gray-500 py-24">
          Loading pricing…
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto max-w-7xl text-center text-red-500 py-24">
          Failed to load pricing. Please try again later.
        </div>
      </section>
    );
  }

  // ── Main render ───────────────────────────────────────────────────────────────

  return (
    <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Login-required modal */}
      <LoginRequiredModal
        isOpen={loginModal.open}
        planName={loginModal.planName}
        onClose={() => setLoginModal({ open: false })}
      />

      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <CustomHeading>Choose the structure you need</CustomHeading>
          <p className="text-gray-600 dark:text-gray-400 mt-2 transition-colors">
            BitsOfTrade is priced by access to systems — not by promises or
            outcomes.
          </p>
        </div>

        {/* Inline notification banner */}
        {notification && (
          <div
            role="alert"
            aria-live="polite"
            className={`mb-8 flex items-start gap-3 rounded-xl border px-5 py-4 text-sm font-medium transition-all ${
              notification.type === "success"
                ? "border-green-200 bg-green-50 text-green-800 dark:border-green-800 dark:bg-green-900/20 dark:text-green-300"
                : "border-red-200 bg-red-50 text-red-800 dark:border-red-800 dark:bg-red-900/20 dark:text-red-300"
            }`}
          >
            <span className="mt-0.5 shrink-0 text-lg leading-none">
              {notification.type === "success" ? "✓" : "✕"}
            </span>
            <span className="flex-1">{notification.message}</span>
            <button
              aria-label="Dismiss notification"
              onClick={() => setNotification(null)}
              className="ml-auto shrink-0 opacity-60 hover:opacity-100 transition-opacity"
            >
              ✕
            </button>
          </div>
        )}

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Card 1: Discipline Tools — monthly / yearly toggle */}
          {disciplinePlan && (
            <PricingCard
              badge={disciplinePlan.badge}
              title={disciplinePlan.name}
              description={disciplinePlan.tagline}
              colorScheme="blue"
              hasToggle={true}
              isLoading={loadingCard === "discipline_tools"}
              onBuy={(period) =>
                handleBuy(
                  "discipline_tools",
                  period === "yearly" ? "yearly" : "monthly",
                  disciplinePlan.name,
                )
              }
              monthlyOption={{
                price: fmt(disciplinePlan.price),
                period: getPeriod(disciplinePlan.billing_cycle),
                features: disciplinePlan.features,
                buttonText:
                  disciplinePlan.cta_label || "Activate Discipline Tools",
                note: disciplinePlan.footer_note,
              }}
              yearlyOption={{
                price: disciplinePlan.price_yearly
                  ? fmt(disciplinePlan.price_yearly)
                  : fmt(disciplinePlan.price),
                period: getPeriod("annual"),
                features: disciplinePlan.features,
                buttonText: disciplinePlan.cta_label
                  ? `${disciplinePlan.cta_label} (Yearly)`
                  : "Activate Discipline Tools (Yearly)",
                note: disciplinePlan.footer_note,
                savings: disciplinePlan.price_yearly
                  ? `Save ${fmt(
                      Number(disciplinePlan.price) * 12 -
                        Number(disciplinePlan.price_yearly),
                    )} with the yearly plan`
                  : undefined,
              }}
            />
          )}

          {/* Card 2: Learning Hub — single price, no toggle */}
          {learningPlan && (
            <PricingCard
              badge={learningPlan.badge}
              title={learningPlan.name}
              description={learningPlan.tagline}
              colorScheme="amber"
              isLoading={loadingCard === "learning_hub"}
              onBuy={() =>
                handleBuy("learning_hub", undefined, learningPlan.name)
              }
              singleOption={{
                price: fmt(learningPlan.price),
                period: getPeriod(learningPlan.billing_cycle),
                features: learningPlan.features,
                buttonText: learningPlan.cta_label || "Unlock Learning Hub",
                note: learningPlan.footer_note,
              }}
            />
          )}

          {/* Card 3: Complete System — combo card (both plans active) */}
          {comboMonthly && comboAnnual && (
            <PricingCard
              badge={comboMonthly.badge || "Structure + Understanding"}
              title="Complete System"
              description={comboMonthly.tagline}
              colorScheme="purple"
              isCombo={true}
              isLoading={
                loadingCard === "combo_monthly" ||
                loadingCard === "combo_annual"
              }
              onBuyMonthly={() =>
                handleBuy(
                  "combo_monthly",
                  undefined,
                  comboMonthly.name || "Complete System",
                )
              }
              onBuyYearly={() =>
                handleBuy(
                  "combo_annual",
                  undefined,
                  comboAnnual.name || "Complete System",
                )
              }
              comboOptions={{
                monthly: {
                  title: comboMonthly.name || "Monthly Combo",
                  price: fmt(comboMonthly.price),
                  period: getPeriod(comboMonthly.billing_cycle),
                  features: comboMonthly.features,
                  buttonText: comboMonthly.cta_label || "Get Complete System",
                  note: comboMonthly.footer_note,
                },
                yearly: {
                  title: comboAnnual.name || "Annual Combo",
                  price: fmt(comboAnnual.price),
                  period: getPeriod(comboAnnual.billing_cycle),
                  features: comboAnnual.features,
                  buttonText: comboAnnual.cta_label || "Commit for a Year",
                  note: comboAnnual.footer_note,
                  buttonVariant: "solid" as const,
                },
              }}
            />
          )}

          {/* Fallback: only one combo plan is active */}
          {(comboMonthly || comboAnnual) && !(comboMonthly && comboAnnual) && (
            <PricingCard
              badge={
                comboMonthly?.badge ??
                comboAnnual?.badge ??
                "Structure + Understanding"
              }
              title="Complete System"
              description={comboMonthly?.tagline ?? comboAnnual?.tagline ?? ""}
              colorScheme="purple"
              isLoading={
                loadingCard === "combo_monthly" ||
                loadingCard === "combo_annual"
              }
              onBuy={() =>
                handleBuy(
                  comboMonthly ? "combo_monthly" : "combo_annual",
                  undefined,
                  "Complete System",
                )
              }
              singleOption={{
                price: fmt((comboMonthly ?? comboAnnual)!.price),
                period: getPeriod((comboMonthly ?? comboAnnual)!.billing_cycle),
                features: (comboMonthly ?? comboAnnual)!.features,
                buttonText:
                  (comboMonthly ?? comboAnnual)!.cta_label ||
                  "Get Complete System",
                note: (comboMonthly ?? comboAnnual)!.footer_note,
              }}
            />
          )}
        </div>

        {/* Footer Disclaimer */}
        <p className="text-center text-xs text-gray-500 dark:text-gray-400 max-w-4xl mx-auto transition-colors">
          BitsOfTrade does not provide investment advice. All pricing reflects
          access to tools and educational content only.
        </p>
      </div>
    </section>
  );
}
