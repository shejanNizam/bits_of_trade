"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

type SubscriptionType = "tool" | "learning";

interface WrongPlanModalProps {
  currentPlan: SubscriptionType;
}

const PLAN_LABELS: Record<SubscriptionType, string> = {
  tool: "Discipline Tools",
  learning: "Learning Hub",
};

const MISSING_PLAN_LABELS: Record<SubscriptionType, string> = {
  tool: "Learning Hub",
  learning: "Discipline Tools",
};

const MISSING_PLAN_DESC: Record<SubscriptionType, string> = {
  tool: "The Learning Hub is part of the Complete System plan. Upgrade to access structured trading education.",
  learning:
    "The Discipline Tools (trade log, journal, reports, and more) require the Discipline Tools or Complete System plan.",
};

export default function WrongPlanModal({ currentPlan }: WrongPlanModalProps) {
  const router = useRouter();

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="wrong-plan-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => router.back()}
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-md rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-2xl p-8 flex flex-col items-center gap-5 transition-colors">
        <div className="w-20 h-20 rounded-full bg-amber-50 dark:bg-amber-900/20 flex items-center justify-center text-4xl">
          🔒
        </div>

        <h2
          id="wrong-plan-title"
          className="text-xl font-bold text-gray-900 dark:text-white text-center"
        >
          Not Included in Your Plan
        </h2>

        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
          Your plan: {PLAN_LABELS[currentPlan]}
        </span>

        <p className="text-sm text-gray-600 dark:text-gray-400 text-center leading-relaxed">
          {MISSING_PLAN_DESC[currentPlan]}
        </p>

        <div className="w-full rounded-xl border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/10 px-4 py-3 text-sm text-amber-800 dark:text-amber-300">
          <span className="font-semibold">Required:</span>{" "}
          {MISSING_PLAN_LABELS[currentPlan]} or Complete System plan
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full mt-1">
          <Link
            href="/user-dashboard/settings/billing"
            className="flex-1 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold text-center transition-colors"
          >
            Upgrade Plan
          </Link>
          <button
            onClick={() => router.back()}
            className="flex-1 py-3 rounded-xl border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 text-sm font-semibold transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
