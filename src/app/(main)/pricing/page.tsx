"use client";

import PricingCard from "@/components/pricing/PricingCard";
import CustomHeading from "@/components/shared/CustomHeading";
import { useGetAllPricingQuery } from "@/redux/features/pricing/pricingApi";

// ─── Types ────────────────────────────────────────────────────────────────────

type BillingCycle = "forever" | "monthly" | "quarterly" | "biannual" | "annual";

interface PricingPlan {
  id: string;
  card_key:
    | "discipline_tools"
    | "learning_hub"
    | "combo_monthly"
    | "combo_annual";
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

// ─── Billing cycle → display period string ────────────────────────────────────
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

// ─── Format price with Indian locale ─────────────────────────────────────────
function fmt(price: string | number): string {
  return `₹${Number(price).toLocaleString("en-IN")}`;
}

// ─── Helper: find a plan by card_key ─────────────────────────────────────────
function findPlan(
  plans: PricingPlan[],
  cardKey: PricingPlan["card_key"],
): PricingPlan | null {
  return plans.find((p) => p.card_key === cardKey) ?? null;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function Pricing() {
  const { data: plans = [], isLoading, isError } = useGetAllPricingQuery({});

  const disciplinePlan = findPlan(plans as PricingPlan[], "discipline_tools");
  const learningPlan = findPlan(plans as PricingPlan[], "learning_hub");
  const comboMonthly = findPlan(plans as PricingPlan[], "combo_monthly");
  const comboAnnual = findPlan(plans as PricingPlan[], "combo_annual");

  if (isLoading) {
    return (
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto max-w-7xl text-center text-gray-500 py-24">
          Loading pricing...
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

  return (
    <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <CustomHeading>Choose the structure you need</CustomHeading>
          <p className="text-gray-600 dark:text-gray-400 mt-2 transition-colors">
            BitsOfTrade is priced by access to systems — not by promises or
            outcomes.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Card 1: Discipline Tools — monthly/yearly toggle */}
          {disciplinePlan && (
            <PricingCard
              badge={disciplinePlan.badge}
              title={disciplinePlan.name}
              description={disciplinePlan.tagline}
              colorScheme="blue"
              hasToggle={true}
              monthlyOption={{
                price: fmt(disciplinePlan.price),
                period: getPeriod(disciplinePlan.billing_cycle),
                features: disciplinePlan.features,
                buttonText:
                  disciplinePlan.cta_label || "Activate Discipline Tools",
                note: disciplinePlan.footer_note,
              }}
              yearlyOption={{
                // price_yearly is string | null — fall back to empty string so type is always string
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
                    )} with yearly plan`
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
              singleOption={{
                price: fmt(learningPlan.price),
                period: getPeriod(learningPlan.billing_cycle),
                features: learningPlan.features,
                buttonText: learningPlan.cta_label || "Unlock Learning Hub",
                note: learningPlan.footer_note,
              }}
            />
          )}

          {/* Card 3: Complete System — combo card, both options must be non-null */}
          {comboMonthly && comboAnnual && (
            <PricingCard
              badge={comboMonthly.badge || "Structure + Understanding"}
              title="Complete System"
              description={comboMonthly.tagline}
              colorScheme="purple"
              isCombo={true}
              comboOptions={{
                // Both are guaranteed non-null here — no null assignability issue
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

          {/* Fallback: render combo card if only one combo plan is active */}
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
