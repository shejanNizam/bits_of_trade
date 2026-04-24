// 06

"use client";

import { DisciplineTestFlow } from "@/components/onboarding/DisciplineTestFlow";
import { ReportTabs } from "@/components/onboarding/ReportTabs";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

// ==================== INNER COMPONENT WITH SEARCH PARAMS ====================
function DisciplineTestContent() {
  const searchParams = useSearchParams();
  const view = searchParams.get("view");

  if (view === "report") {
    return <ReportTabs />;
  }

  return <DisciplineTestFlow />;
}

// ==================== LOADING FALLBACK ====================
function DisciplineTestLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 dark:border-blue-400"></div>
        <p className="mt-4 text-gray-600 dark:text-gray-400">Loading...</p>
      </div>
    </div>
  );
}

// ==================== MAIN PAGE COMPONENT ====================
export default function DisciplineTestPage() {
  return (
    <Suspense fallback={<DisciplineTestLoading />}>
      <DisciplineTestContent />
    </Suspense>
  );
}
