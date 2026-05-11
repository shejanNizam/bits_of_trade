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
    period?: string;
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

  onBuy?: (period: PricingPeriod) => void;
  onBuyMonthly?: () => void;
  onBuyYearly?: () => void;
  isLoading?: boolean;
}

function Spinner() {
  return (
    <svg
      className="inline-block w-4 h-4 mr-2 animate-spin"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  );
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
  onBuy,
  onBuyMonthly,
  onBuyYearly,
  isLoading = false,
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

  const btnBase =
    "w-full py-3.5 rounded-lg font-medium transition-colors disabled:opacity-60 disabled:cursor-not-allowed";

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-lg flex flex-col">
      <div className="mb-6 flex items-center justify-between">
        <span
          className={`inline-block text-xs font-medium px-3 py-1.5 rounded-md transition-colors ${colors.badge}`}
        >
          {badge}
        </span>

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
                  onClick={() =>
                    onBuy?.(hasToggle ? selectedPeriod : "monthly")
                  }
                  disabled={isLoading}
                  className={`${btnBase} mb-4 ${colors.button}`}
                >
                  {isLoading ? (
                    <>
                      <Spinner />
                      Processing…
                    </>
                  ) : (
                    currentOption.buttonText
                  )}
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

      {isCombo && comboOptions && (
        <>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 transition-colors">
            {title}
          </h3>

          <p className="text-sm text-gray-600 dark:text-gray-400 mb-8 transition-colors">
            {description}
          </p>

          <div className="flex-1 flex flex-col">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-base font-semibold text-gray-900 dark:text-white transition-colors">
                  {comboOptions.monthly.title}
                </h4>
                <div className="text-right">
                  <span className="text-lg font-bold text-gray-900 dark:text-white transition-colors">
                    {comboOptions.monthly.price}
                  </span>
                  {comboOptions.monthly.period && (
                    <span className="text-sm text-gray-500 dark:text-gray-400 ml-1 transition-colors">
                      {comboOptions.monthly.period}
                    </span>
                  )}
                </div>
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
                onClick={() => onBuyMonthly?.()}
                disabled={isLoading}
                className={`${btnBase} ${colors.button}`}
              >
                {isLoading ? (
                  <>
                    <Spinner />
                    Processing…
                  </>
                ) : (
                  comboOptions.monthly.buttonText
                )}
              </button>

              <p className="text-xs text-center text-gray-400 dark:text-gray-500 mt-3 transition-colors">
                {comboOptions.monthly.note}
              </p>
            </div>

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
                onClick={() => onBuyYearly?.()}
                disabled={isLoading}
                className={`${btnBase} ${
                  comboOptions.yearly.buttonVariant === "solid"
                    ? colors.buttonSolid
                    : colors.button
                }`}
              >
                {isLoading ? (
                  <>
                    <Spinner />
                    Processing…
                  </>
                ) : (
                  comboOptions.yearly.buttonText
                )}
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
