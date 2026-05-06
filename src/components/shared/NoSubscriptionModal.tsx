"use client";

import Link from "next/link";

/**
 * Blocking, non-dismissible modal shown when the authenticated user
 * has subscription_type === "none".
 * The only exit is the "View Plans" button which navigates to billing.
 */
export default function NoSubscriptionModal() {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="no-sub-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      {/* Non-clickable dark overlay — modal cannot be dismissed */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Panel */}
      <div className="relative z-10 w-full max-w-md rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-2xl p-8 flex flex-col items-center gap-5 transition-colors">
        {/* Icon */}
        <div className="w-20 h-20 rounded-full bg-red-50 dark:bg-red-900/20 flex items-center justify-center text-4xl">
          🔐
        </div>

        {/* Heading */}
        <h2
          id="no-sub-title"
          className="text-2xl font-bold text-gray-900 dark:text-white text-center"
        >
          No Active Subscription
        </h2>

        {/* Body */}
        <p className="text-sm text-gray-600 dark:text-gray-400 text-center leading-relaxed">
          You don&apos;t have an active subscription yet. Purchase a plan to
          unlock the full BitsOfTrade dashboard — tools, journal, insights, and
          more.
        </p>

        {/* Divider */}
        <div className="w-full border-t border-gray-100 dark:border-gray-700" />

        {/* Plan summary */}
        <ul className="w-full space-y-2 text-sm text-gray-700 dark:text-gray-300">
          <li className="flex items-center gap-2">
            <span className="text-blue-500">🔧</span>
            <span>
              <span className="font-semibold">Discipline Tools</span> — trade
              log, journal, reports &amp; more
            </span>
          </li>
          <li className="flex items-center gap-2">
            <span className="text-amber-500">📚</span>
            <span>
              <span className="font-semibold">Learning Hub</span> — structured
              trading education
            </span>
          </li>
          <li className="flex items-center gap-2">
            <span className="text-purple-500">⚡</span>
            <span>
              <span className="font-semibold">Complete System</span> — all tools
              + learning, best value
            </span>
          </li>
        </ul>

        {/* CTA */}
        <Link
          href="/user-dashboard/settings/billing"
          className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold text-center transition-colors"
        >
          View Subscription Plans
        </Link>

        <p className="text-xs text-gray-400 dark:text-gray-500 text-center">
          You&apos;ll be taken to the billing page inside your dashboard.
        </p>
      </div>
    </div>
  );
}
