// static design --------------->>

// import PricingCard from "@/components/pricing/PricingCard";
// import CustomHeading from "@/components/shared/CustomHeading";

// export default function Pricing() {
//   return (
//     <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900 transition-colors">
//       <div className="container mx-auto max-w-7xl">
//         {/* Header */}
//         <div className="mb-12 text-center">
//           <CustomHeading>Choose the structure you need</CustomHeading>
//           <p className="text-gray-600 dark:text-gray-400 mt-2 transition-colors">
//             BitsOfTrade is priced by access to systems — not by promises or
//             outcomes.
//           </p>
//         </div>

//         {/* Pricing Cards */}
//         <div className="grid lg:grid-cols-3 gap-6 mb-8">
//           {/* Card 1: Discipline Tools - WITH TOGGLE */}
//           <PricingCard
//             badge="Behavior Control & Prevention"
//             title="Discipline Tools"
//             description="Traders who want to control activity, reduce overtrading, and introduce structure."
//             colorScheme="blue"
//             hasToggle={true}
//             monthlyOption={{
//               price: "₹499",
//               period: "/ month",
//               features: [
//                 "Discipline Guard",
//                 "Behavior-First Journal",
//                 "Session & Rule Monitoring",
//                 "Behavior-Based Reports",
//                 "Strategy Frameworks",
//                 "AI Based Insights",
//               ],
//               buttonText: "Activate Discipline Tools",
//               note: "Discipline infrastructure only. No learning included.",
//             }}
//             yearlyOption={{
//               price: "₹4,999",
//               period: "/ year",
//               features: [
//                 "Discipline Guard",
//                 "Behavior-First Journal",
//                 "Session & Rule Monitoring",
//                 "Behavior-Based Reports",
//                 "Strategy Frameworks",
//                 "AI Based Insights",
//               ],
//               buttonText: "Activate Discipline Tools (Yearly)",
//               note: "Discipline infrastructure only. No learning included.",
//               savings: "Save ₹989 with yearly plan",
//             }}
//           />

//           {/* Card 2: Learning Hub - NO TOGGLE */}
//           <PricingCard
//             badge="Structured Trading Education"
//             title="Learning Hub"
//             description="Traders building long-term understanding and process."
//             colorScheme="amber"
//             singleOption={{
//               price: "₹2,999",
//               period: "/ 6 months",
//               features: [
//                 "Full Learning Hub Access",
//                 "Risk & Discipline Modules",
//                 "Structured Curriculum",
//                 "Access for 6 months",
//               ],
//               buttonText: "Unlock Learning Hub",
//               note: "Educational access only. No discipline tools included.",
//             }}
//           />

//           {/* Card 3: Complete System - COMBO CARD */}
//           <PricingCard
//             badge="Structure + Understanding"
//             title="Complete System"
//             description="For traders who want both structure and understanding, working together."
//             colorScheme="purple"
//             isCombo={true}
//             comboOptions={{
//               monthly: {
//                 title: "Monthly Combo",
//                 price: "₹2,799",
//                 features: ["1 month Discipline Tools", "6 months Learning Hub"],
//                 buttonText: "Get Complete System",
//                 note: "Ideal for trying the full system before committing long-term.",
//               },
//               yearly: {
//                 title: "Annual Combo",
//                 price: "₹6,999",
//                 period: "/yr",
//                 features: [
//                   "12 months Discipline Tools",
//                   "6 months Learning Hub",
//                 ],
//                 buttonText: "Commit for a Year",
//                 note: "Best value for traders committed to consistency",
//                 buttonVariant: "solid",
//               },
//             }}
//           />
//         </div>

//         {/* Footer Disclaimer */}
//         <p className="text-center text-xs text-gray-500 dark:text-gray-400 max-w-4xl mx-auto transition-colors">
//           BitsOfTrade does not provide investment advice. All pricing reflects
//           access to tools and educational content only.
//         </p>
//       </div>
//     </section>
//   );
// }

// dynamic --------------------->>

"use client";

import PricingCard, {
  type ColorScheme,
  type Plan,
} from "@/components/pricing/PricingCard";
import CustomHeading from "@/components/shared/CustomHeading";
import { useGetAllPricingQuery } from "@/redux/features/pricing/pricingApi";

// ─── Static card config ────────────────────────────────────────────────────────
// These are the static display strings that wrap each API plan.
// Map them by display_order (0, 1, 2) to match your backend ordering.
// If you add more plans, extend this array.

interface CardConfig {
  badge: string;
  description: string;
  note: string;
  buttonText?: string;
  savings?: string;
  colorScheme: ColorScheme;
  variant: "toggle" | "single" | "combo";
  yearlyOrder?: number;
  comboMonthlyOrder?: number;
  comboYearlyOrder?: number;
}

const CARD_CONFIGS: CardConfig[] = [
  {
    badge: "Behavior Control & Prevention",
    description:
      "Traders who want to control activity, reduce overtrading, and introduce structure.",
    note: "Discipline infrastructure only. No learning included.",
    buttonText: "Activate Discipline Tools",
    savings: "Save ₹989 with yearly plan",
    colorScheme: "blue",
    variant: "toggle",
    yearlyOrder: 1, // display_order of the yearly counterpart plan
  },
  {
    badge: "Structured Trading Education",
    description: "Traders building long-term understanding and process.",
    note: "Educational access only. No discipline tools included.",
    buttonText: "Unlock Learning Hub",
    colorScheme: "amber",
    variant: "single",
  },
  {
    badge: "Structure + Understanding",
    description:
      "For traders who want both structure and understanding, working together.",
    colorScheme: "purple",
    variant: "combo",
    comboMonthlyOrder: 3, // display_order of monthly combo plan
    comboYearlyOrder: 4, // display_order of yearly combo plan
    note: "",
  },
];

// ─── Helpers ───────────────────────────────────────────────────────────────────
const byOrder = (plans: Plan[], order: number): Plan | undefined =>
  plans.find((p) => p.display_order === order);

// ─── Component ─────────────────────────────────────────────────────────────────
export default function Pricing() {
  const { data: plans = [], isLoading, isError } = useGetAllPricingQuery({});

  // Active plans only
  const activePlans: Plan[] = plans.filter((p: Plan) => p.is_active);

  // The first 3 display_order values are the "primary" cards (0, 1, 2)
  const primaryPlans = activePlans
    .filter((p) => [0, 1, 2].includes(p.display_order))
    .sort((a, b) => a.display_order - b.display_order);

  return (
    <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="container mx-auto max-w-7xl">
        {/* ── Header ── */}
        <div className="mb-12 text-center">
          <CustomHeading>Choose the structure you need</CustomHeading>
          <p className="text-gray-600 dark:text-gray-400 mt-2 transition-colors">
            BitsOfTrade is priced by access to systems — not by promises or
            outcomes.
          </p>
        </div>

        {/* ── Loading ── */}
        {isLoading && (
          <div className="text-center text-gray-500 dark:text-gray-400 py-16">
            Loading plans...
          </div>
        )}

        {/* ── Error ── */}
        {isError && (
          <div className="text-center text-red-500 py-16">
            Failed to load pricing plans. Please try again later.
          </div>
        )}

        {/* ── Pricing Cards ── */}
        {!isLoading && !isError && (
          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            {primaryPlans.map((plan, index) => {
              const config = CARD_CONFIGS[index];
              if (!config) return null;

              // ── Toggle card
              if (config.variant === "toggle") {
                const yearlyPlan =
                  config.yearlyOrder !== undefined
                    ? byOrder(activePlans, config.yearlyOrder)
                    : undefined;

                return (
                  <PricingCard
                    key={plan.id}
                    plan={plan}
                    yearlyPlan={yearlyPlan}
                    colorScheme={config.colorScheme}
                    badge={config.badge}
                    description={config.description}
                    note={config.note}
                    buttonText={config.buttonText}
                    savings={config.savings}
                    onSubscribe={(selected) =>
                      console.log("Subscribe:", selected)
                    }
                  />
                );
              }

              // ── Combo card
              if (config.variant === "combo") {
                const comboMonthlyPlan =
                  config.comboMonthlyOrder !== undefined
                    ? byOrder(activePlans, config.comboMonthlyOrder)
                    : undefined;
                const comboYearlyPlan =
                  config.comboYearlyOrder !== undefined
                    ? byOrder(activePlans, config.comboYearlyOrder)
                    : undefined;

                return (
                  <PricingCard
                    key={plan.id}
                    plan={plan}
                    isCombo={true}
                    comboMonthlyPlan={comboMonthlyPlan}
                    comboYearlyPlan={comboYearlyPlan}
                    colorScheme={config.colorScheme}
                    badge={config.badge}
                    description={config.description}
                    onSubscribe={(selected) =>
                      console.log("Subscribe:", selected)
                    }
                  />
                );
              }

              // ── Single card (no toggle)
              return (
                <PricingCard
                  key={plan.id}
                  plan={plan}
                  colorScheme={config.colorScheme}
                  badge={config.badge}
                  description={config.description}
                  note={config.note}
                  buttonText={config.buttonText}
                  onSubscribe={(selected) =>
                    console.log("Subscribe:", selected)
                  }
                />
              );
            })}
          </div>
        )}

        {/* ── Footer Disclaimer ── */}
        <p className="text-center text-xs text-gray-500 dark:text-gray-400 max-w-4xl mx-auto transition-colors">
          BitsOfTrade does not provide investment advice. All pricing reflects
          access to tools and educational content only.
        </p>
      </div>
    </section>
  );
}
