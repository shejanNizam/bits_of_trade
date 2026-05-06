"use client";

import NoSubscriptionModal from "@/components/shared/NoSubscriptionModal";
import WrongPlanModal from "@/components/shared/WrongPlanModal";
import { useGetUserDataQuery } from "@/redux/api/userApi/userApi";
import { usePathname } from "next/navigation";

// ─── Route classification ─────────────────────────────────────────────────────

/**
 * Routes that require the "tool" or "both" subscription.
 * Matches by prefix so nested pages are covered automatically.
 */
const TOOL_ROUTES = [
  "/user-dashboard/trade-log",
  "/user-dashboard/discipline-guard",
  "/user-dashboard/reports",
  "/user-dashboard/strategy-library",
  "/user-dashboard/journal",
  "/user-dashboard/mistakes",
  "/user-dashboard/rules-limit",
  "/user-dashboard/insights",
  "/user-dashboard/trade-intelligent",
] as const;

/**
 * Routes that require the "learning" or "both" subscription.
 */
const LEARNING_ROUTES = ["/user-dashboard/learning-hub"] as const;

/**
 * Routes that are always accessible regardless of subscription type.
 * Settings (including billing) must stay open so users can upgrade.
 */
const ALWAYS_OPEN_PREFIXES = ["/user-dashboard/settings"] as const;

// ─── Access logic ─────────────────────────────────────────────────────────────

type AccessResult = "allowed" | "no-subscription" | "wrong-plan";
type SubscriptionType = "none" | "tool" | "learning" | "both";

function getAccessResult(
  subscriptionType: SubscriptionType,
  pathname: string,
): AccessResult {
  // Settings and other open routes are always accessible
  const isAlwaysOpen = ALWAYS_OPEN_PREFIXES.some((prefix) =>
    pathname.startsWith(prefix),
  );
  if (isAlwaysOpen) return "allowed";

  // "both" plan can access everything
  if (subscriptionType === "both") return "allowed";

  // No subscription at all
  if (subscriptionType === "none") return "no-subscription";

  const isToolRoute = TOOL_ROUTES.some((r) => pathname.startsWith(r));
  const isLearningRoute = LEARNING_ROUTES.some((r) => pathname.startsWith(r));

  // "tool" plan trying to reach a learning route
  if (subscriptionType === "tool" && isLearningRoute) return "wrong-plan";

  // "learning" plan trying to reach a tool route
  if (subscriptionType === "learning" && isToolRoute) return "wrong-plan";

  return "allowed";
}

// ─── Skeleton loader ──────────────────────────────────────────────────────────

function SkeletonLoader() {
  return (
    <div className="w-full h-full min-h-[60vh] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 rounded-full border-4 border-blue-500 border-t-transparent animate-spin" />
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Checking your subscription…
        </p>
      </div>
    </div>
  );
}

// ─── Guard component ──────────────────────────────────────────────────────────

interface SubscriptionGuardProps {
  children: React.ReactNode;
}

export default function SubscriptionGuard({
  children,
}: SubscriptionGuardProps) {
  const pathname = usePathname();
  const { data: me, isLoading } = useGetUserDataQuery({});

  // While fetching subscription info, show a subtle loader
  if (isLoading) return <SkeletonLoader />;

  const subscriptionType: SubscriptionType =
    (me?.subscription_type as SubscriptionType) ?? "none";

  const access = getAccessResult(subscriptionType, pathname);

  if (access === "no-subscription") {
    return <NoSubscriptionModal />;
  }

  if (access === "wrong-plan") {
    // subscriptionType is guaranteed to be "tool" | "learning" here
    return (
      <WrongPlanModal currentPlan={subscriptionType as "tool" | "learning"} />
    );
  }

  return <>{children}</>;
}
