// static ------------------->>

"use client";

import { useState } from "react";
import { BsCheckLg } from "react-icons/bs";

type PricingPeriod = "monthly" | "yearly";
type ColorScheme = "blue" | "amber" | "purple";

interface PricingOption {
  price: string;
  period: string;
  features: string[];
  buttonText: string;
  note?: string;
  savings?: string;
}

interface ComboOptions {
  monthly: {
    title: string;
    price: string;
    features: string[];
    buttonText: string;
    note: string;
  };
  yearly: {
    title: string;
    price: string;
    period: string;
    features: string[];
    buttonText: string;
    note: string;
    buttonVariant?: "outline" | "solid";
  };
}

interface PricingCardProps {
  badge: string;
  title: string;
  description: string;
  colorScheme: ColorScheme;
  hasToggle?: boolean;
  monthlyOption?: PricingOption;
  yearlyOption?: PricingOption;
  singleOption?: PricingOption;
  isCombo?: boolean;
  comboOptions?: ComboOptions;
}

export default function PricingCard({
  badge,
  title,
  description,
  colorScheme,
  hasToggle = false,
  monthlyOption,
  yearlyOption,
  singleOption,
  isCombo = false,
  comboOptions,
}: PricingCardProps) {
  const [selectedPeriod, setSelectedPeriod] =
    useState<PricingPeriod>("monthly");

  const colorClasses = {
    blue: {
      badge: "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400",
      checkIcon: "text-blue-600 dark:text-blue-400",
      button:
        "border-2 border-blue-600 dark:border-blue-500 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20",
      buttonSolid:
        "bg-blue-600 dark:bg-blue-600 text-white hover:bg-blue-700 dark:hover:bg-blue-700",
      toggleActive: "bg-blue-600 text-white",
      toggleInactive:
        "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700",
    },
    amber: {
      badge:
        "bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400",
      checkIcon: "text-amber-600 dark:text-amber-400",
      button:
        "border-2 border-amber-600 dark:border-amber-500 text-amber-700 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/20",
      buttonSolid:
        "bg-amber-600 dark:bg-amber-600 text-white hover:bg-amber-700 dark:hover:bg-amber-700",
      toggleActive: "bg-amber-600 text-white",
      toggleInactive:
        "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700",
    },
    purple: {
      badge:
        "bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400",
      checkIcon: "text-purple-600 dark:text-purple-400",
      button:
        "border-2 border-purple-600 dark:border-purple-500 text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20",
      buttonSolid:
        "bg-purple-600 dark:bg-purple-600 text-white hover:bg-purple-700 dark:hover:bg-purple-700",
      toggleActive: "bg-purple-600 text-white",
      toggleInactive:
        "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700",
    },
  };

  const colors = colorClasses[colorScheme];
  const currentOption =
    hasToggle && selectedPeriod === "yearly"
      ? yearlyOption
      : monthlyOption || singleOption;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-lg flex flex-col">
      {/* Badge & Toggle */}
      <div className="mb-6 flex items-center justify-between">
        <span
          className={`inline-block text-xs font-medium px-3 py-1.5 rounded-md transition-colors ${colors.badge}`}
        >
          {badge}
        </span>

        {/* Toggle Switch for Monthly/Yearly */}
        {hasToggle && (
          <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg p-1 transition-colors">
            <button
              onClick={() => setSelectedPeriod("monthly")}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                selectedPeriod === "monthly"
                  ? colors.toggleActive
                  : colors.toggleInactive
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setSelectedPeriod("yearly")}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                selectedPeriod === "yearly"
                  ? colors.toggleActive
                  : colors.toggleInactive
              }`}
            >
              Yearly
            </button>
          </div>
        )}
      </div>

      {/* Regular Card Content */}
      {!isCombo && (
        <div className="flex-1 flex flex-col">
          {currentOption && (
            <>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 transition-colors">
                {title}
              </h3>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-5xl font-bold text-gray-900 dark:text-white transition-colors">
                  {currentOption.price}
                </span>
                <span className="text-gray-500 dark:text-gray-400 text-sm transition-colors">
                  {currentOption.period}
                </span>
              </div>

              <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 transition-colors">
                {description}
              </p>

              <ul className="space-y-3 mb-8">
                {currentOption.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <BsCheckLg
                      className={`w-4 h-4 shrink-0 mt-0.5 transition-colors ${colors.checkIcon}`}
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300 transition-colors">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto">
                {selectedPeriod === "yearly" && currentOption.savings && (
                  <div className="text-center pb-4 mb-4 border-b border-gray-100 dark:border-gray-700 transition-colors">
                    <p className="text-xs text-green-600 dark:text-green-400 font-medium transition-colors">
                      {currentOption.savings}
                    </p>
                  </div>
                )}
                <button
                  className={`w-full py-3.5 rounded-lg font-medium transition-colors mb-4 ${colors.button}`}
                >
                  {currentOption.buttonText}
                </button>

                {currentOption.note && (
                  <p className="text-xs text-center text-gray-400 dark:text-gray-500 transition-colors">
                    {currentOption.note}
                  </p>
                )}
              </div>
            </>
          )}
        </div>
      )}

      {/* Combo Card Content */}
      {isCombo && comboOptions && (
        <>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 transition-colors">
            {title}
          </h3>

          <p className="text-sm text-gray-600 dark:text-gray-400 mb-8 transition-colors">
            {description}
          </p>

          <div className="flex-1 flex flex-col">
            {/* Monthly Combo */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-base font-semibold text-gray-900 dark:text-white transition-colors">
                  {comboOptions.monthly.title}
                </h4>
                <span className="text-lg font-bold text-gray-900 dark:text-white transition-colors">
                  {comboOptions.monthly.price}
                </span>
              </div>

              <ul className="space-y-2 mb-4">
                {comboOptions.monthly.features.map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300 transition-colors"
                  >
                    <BsCheckLg
                      className={`w-4 h-4 shrink-0 mt-0.5 transition-colors ${colors.checkIcon}`}
                    />
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-3.5 rounded-lg font-medium transition-colors ${colors.button}`}
              >
                {comboOptions.monthly.buttonText}
              </button>

              <p className="text-xs text-center text-gray-400 dark:text-gray-500 mt-3 transition-colors">
                {comboOptions.monthly.note}
              </p>
            </div>

            {/* Annual Combo */}
            <div className="pt-6 border-t border-gray-100 dark:border-gray-700 transition-colors mt-auto">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-base font-semibold text-gray-900 dark:text-white transition-colors">
                  {comboOptions.yearly.title}
                </h4>
                <div className="text-right">
                  <span className="text-lg font-bold text-gray-900 dark:text-white transition-colors">
                    {comboOptions.yearly.price}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400 transition-colors">
                    {comboOptions.yearly.period}
                  </span>
                </div>
              </div>

              <ul className="space-y-2 mb-4">
                {comboOptions.yearly.features.map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300 transition-colors"
                  >
                    <BsCheckLg
                      className={`w-4 h-4 shrink-0 mt-0.5 transition-colors ${colors.checkIcon}`}
                    />
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-3.5 rounded-lg font-medium transition-colors ${
                  comboOptions.yearly.buttonVariant === "solid"
                    ? colors.buttonSolid
                    : colors.button
                }`}
              >
                {comboOptions.yearly.buttonText}
              </button>

              <p className="text-xs text-center text-purple-600 dark:text-purple-400 mt-3 font-medium transition-colors">
                {comboOptions.yearly.note}
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// // dynamic -------------------->>
// "use client";

// import { useState } from "react";
// import { BsCheckLg } from "react-icons/bs";

// // ─── API Plan Type ─────────────────────────────────────────────────────────────
// export interface Plan {
//   id: string;
//   name: string;
//   price: string;
//   billing_cycle: "forever" | "monthly" | "quarterly" | "biannual" | "annual";
//   is_popular: boolean;
//   is_active: boolean;
//   features: string[];
//   display_order: number;
//   created_at: string;
//   updated_at: string;
// }

// export type ColorScheme = "blue" | "amber" | "purple";
// type PricingPeriod = "monthly" | "yearly";

// // ─── Static Fallbacks ──────────────────────────────────────────────────────────
// // These are used when the API doesn't return optional display fields.
// const FALLBACKS = {
//   description:
//     "A flexible plan built for traders who want structure and clarity.",
//   note: "Access to selected tools and features.",
//   badge: (cycle: Plan["billing_cycle"], isPopular: boolean): string => {
//     if (isPopular) return "⭐ Most Popular";
//     const map: Record<Plan["billing_cycle"], string> = {
//       forever: "LIFETIME ACCESS",
//       monthly: "MONTHLY PLAN",
//       quarterly: "QUARTERLY PLAN",
//       biannual: "6-MONTH PLAN",
//       annual: "ANNUAL PLAN",
//     };
//     return map[cycle] ?? "PLAN";
//   },
//   period: (cycle: Plan["billing_cycle"]): string => {
//     const map: Record<Plan["billing_cycle"], string> = {
//       forever: "forever",
//       monthly: "/ month",
//       quarterly: "/ 3 months",
//       biannual: "/ 6 months",
//       annual: "/ year",
//     };
//     return map[cycle] ?? "";
//   },
//   buttonText: (name: string) => `Get ${name}`,
// };

// // ─── Color Classes ─────────────────────────────────────────────────────────────
// const colorClasses: Record<
//   ColorScheme,
//   {
//     badge: string;
//     checkIcon: string;
//     button: string;
//     buttonSolid: string;
//     toggleActive: string;
//     toggleInactive: string;
//   }
// > = {
//   blue: {
//     badge: "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400",
//     checkIcon: "text-blue-600 dark:text-blue-400",
//     button:
//       "border-2 border-blue-600 dark:border-blue-500 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20",
//     buttonSolid: "bg-blue-600 text-white hover:bg-blue-700",
//     toggleActive: "bg-blue-600 text-white",
//     toggleInactive:
//       "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700",
//   },
//   amber: {
//     badge:
//       "bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400",
//     checkIcon: "text-amber-600 dark:text-amber-400",
//     button:
//       "border-2 border-amber-600 dark:border-amber-500 text-amber-700 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/20",
//     buttonSolid: "bg-amber-600 text-white hover:bg-amber-700",
//     toggleActive: "bg-amber-600 text-white",
//     toggleInactive:
//       "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700",
//   },
//   purple: {
//     badge:
//       "bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400",
//     checkIcon: "text-purple-600 dark:text-purple-400",
//     button:
//       "border-2 border-purple-600 dark:border-purple-500 text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20",
//     buttonSolid: "bg-purple-600 text-white hover:bg-purple-700",
//     toggleActive: "bg-purple-600 text-white",
//     toggleInactive:
//       "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700",
//   },
// };

// // ─── Props ─────────────────────────────────────────────────────────────────────
// interface PricingCardProps {
//   // Primary plan (monthly by default)
//   plan: Plan;
//   colorScheme?: ColorScheme;

//   // Pass a yearly variant to enable the Monthly/Yearly toggle
//   yearlyPlan?: Plan;
//   // Shown only when yearlyPlan toggle is active
//   savings?: string;

//   // Pass both to render as a Combo card (shows two sub-plans, no toggle)
//   isCombo?: boolean;
//   comboMonthlyPlan?: Plan;
//   comboYearlyPlan?: Plan;

//   // Static display overrides — use these if your API doesn't return them
//   badge?: string;
//   description?: string;
//   buttonText?: string;
//   note?: string;

//   onSubscribe?: (plan: Plan) => void;
// }

// // ─── Component ─────────────────────────────────────────────────────────────────
// export default function PricingCard({
//   plan,
//   colorScheme = "blue",
//   yearlyPlan,
//   savings,
//   isCombo = false,
//   comboMonthlyPlan,
//   comboYearlyPlan,
//   badge,
//   description,
//   buttonText,
//   note,
//   onSubscribe,
// }: PricingCardProps) {
//   const [selectedPeriod, setSelectedPeriod] =
//     useState<PricingPeriod>("monthly");
//   const colors = colorClasses[colorScheme];
//   const hasToggle = Boolean(yearlyPlan);
//   const activePlan =
//     hasToggle && selectedPeriod === "yearly" ? yearlyPlan! : plan;

//   // Resolved display values (API → static fallback)
//   const resolvedBadge =
//     badge ?? FALLBACKS.badge(plan.billing_cycle, plan.is_popular);
//   const resolvedDescription = description ?? FALLBACKS.description;
//   const resolvedNote = note ?? FALLBACKS.note;
//   const resolvedButtonText =
//     buttonText ?? FALLBACKS.buttonText(activePlan.name);
//   const resolvedPeriod = FALLBACKS.period(activePlan.billing_cycle);

//   // ── COMBO CARD ──────────────────────────────────────────────────────────────
//   if (isCombo && comboMonthlyPlan && comboYearlyPlan) {
//     return (
//       <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-lg flex flex-col">
//         {/* Badge */}
//         <div className="mb-6">
//           <span
//             className={`inline-block text-xs font-medium px-3 py-1.5 rounded-md transition-colors ${colors.badge}`}
//           >
//             {resolvedBadge}
//           </span>
//         </div>

//         <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 transition-colors">
//           {plan.name}
//         </h3>
//         <p className="text-sm text-gray-600 dark:text-gray-400 mb-8 transition-colors">
//           {resolvedDescription}
//         </p>

//         <div className="flex-1 flex flex-col">
//           {/* Monthly Combo sub-plan */}
//           <div className="mb-6">
//             <div className="flex items-center justify-between mb-3">
//               <h4 className="text-base font-semibold text-gray-900 dark:text-white transition-colors">
//                 Monthly Combo
//               </h4>
//               <span className="text-lg font-bold text-gray-900 dark:text-white transition-colors">
//                 ₹{comboMonthlyPlan.price}
//               </span>
//             </div>

//             <ul className="space-y-2 mb-4">
//               {comboMonthlyPlan.features.map((feature, idx) => (
//                 <li
//                   key={idx}
//                   className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300 transition-colors"
//                 >
//                   <BsCheckLg
//                     className={`w-4 h-4 shrink-0 mt-0.5 ${colors.checkIcon}`}
//                   />
//                   {feature}
//                 </li>
//               ))}
//             </ul>

//             <button
//               onClick={() => onSubscribe?.(comboMonthlyPlan)}
//               className={`w-full py-3.5 rounded-lg font-medium transition-colors ${colors.button}`}
//             >
//               {FALLBACKS.buttonText(comboMonthlyPlan.name)}
//             </button>

//             <p className="text-xs text-center text-gray-400 dark:text-gray-500 mt-3 transition-colors">
//               {FALLBACKS.note}
//             </p>
//           </div>

//           {/* Annual Combo sub-plan */}
//           <div className="pt-6 border-t border-gray-100 dark:border-gray-700 transition-colors mt-auto">
//             <div className="flex items-center justify-between mb-3">
//               <h4 className="text-base font-semibold text-gray-900 dark:text-white transition-colors">
//                 Annual Combo
//               </h4>
//               <div className="text-right">
//                 <span className="text-lg font-bold text-gray-900 dark:text-white transition-colors">
//                   ₹{comboYearlyPlan.price}
//                 </span>
//                 <span className="text-sm text-gray-500 dark:text-gray-400 transition-colors">
//                   {" "}
//                   {FALLBACKS.period(comboYearlyPlan.billing_cycle)}
//                 </span>
//               </div>
//             </div>

//             <ul className="space-y-2 mb-4">
//               {comboYearlyPlan.features.map((feature, idx) => (
//                 <li
//                   key={idx}
//                   className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300 transition-colors"
//                 >
//                   <BsCheckLg
//                     className={`w-4 h-4 shrink-0 mt-0.5 ${colors.checkIcon}`}
//                   />
//                   {feature}
//                 </li>
//               ))}
//             </ul>

//             <button
//               onClick={() => onSubscribe?.(comboYearlyPlan)}
//               className={`w-full py-3.5 rounded-lg font-medium transition-colors ${colors.buttonSolid}`}
//             >
//               {FALLBACKS.buttonText(comboYearlyPlan.name)}
//             </button>

//             <p
//               className={`text-xs text-center mt-3 font-medium transition-colors ${colors.badge}`}
//             >
//               Best value for traders committed to consistency
//             </p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // ── REGULAR / TOGGLE CARD ──────────────────────────────────────────────────
//   return (
//     <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-lg flex flex-col">
//       {/* Badge & Toggle */}
//       <div className="mb-6 flex items-center justify-between">
//         <span
//           className={`inline-block text-xs font-medium px-3 py-1.5 rounded-md transition-colors ${colors.badge}`}
//         >
//           {resolvedBadge}
//         </span>

//         {hasToggle && (
//           <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg p-1 transition-colors">
//             <button
//               onClick={() => setSelectedPeriod("monthly")}
//               className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
//                 selectedPeriod === "monthly"
//                   ? colors.toggleActive
//                   : colors.toggleInactive
//               }`}
//             >
//               Monthly
//             </button>
//             <button
//               onClick={() => setSelectedPeriod("yearly")}
//               className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
//                 selectedPeriod === "yearly"
//                   ? colors.toggleActive
//                   : colors.toggleInactive
//               }`}
//             >
//               Yearly
//             </button>
//           </div>
//         )}
//       </div>

//       <div className="flex-1 flex flex-col">
//         {/* Title */}
//         <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 transition-colors">
//           {activePlan.name}
//         </h3>

//         {/* Price */}
//         <div className="flex items-baseline gap-1 mb-4">
//           <span className="text-5xl font-bold text-gray-900 dark:text-white transition-colors">
//             ₹{activePlan.price}
//           </span>
//           <span className="text-gray-500 dark:text-gray-400 text-sm transition-colors">
//             {resolvedPeriod}
//           </span>
//         </div>

//         {/* Description */}
//         <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 transition-colors">
//           {resolvedDescription}
//         </p>

//         {/* Features */}
//         <ul className="space-y-3 mb-8">
//           {activePlan.features.map((feature, idx) => (
//             <li key={idx} className="flex items-start gap-3">
//               <BsCheckLg
//                 className={`w-4 h-4 shrink-0 mt-0.5 transition-colors ${colors.checkIcon}`}
//               />
//               <span className="text-sm text-gray-700 dark:text-gray-300 transition-colors">
//                 {feature}
//               </span>
//             </li>
//           ))}
//         </ul>

//         <div className="mt-auto">
//           {/* Savings — only on yearly toggle */}
//           {hasToggle && selectedPeriod === "yearly" && savings && (
//             <div className="text-center pb-4 mb-4 border-b border-gray-100 dark:border-gray-700 transition-colors">
//               <p className="text-xs text-green-600 dark:text-green-400 font-medium transition-colors">
//                 {savings}
//               </p>
//             </div>
//           )}

//           <button
//             onClick={() => onSubscribe?.(activePlan)}
//             className={`w-full py-3.5 rounded-lg font-medium transition-colors mb-4 ${colors.button}`}
//           >
//             {resolvedButtonText}
//           </button>

//           <p className="text-xs text-center text-gray-400 dark:text-gray-500 transition-colors">
//             {resolvedNote}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }
