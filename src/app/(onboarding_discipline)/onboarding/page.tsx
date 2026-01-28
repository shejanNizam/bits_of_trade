"use client";

import { OneLastThing } from "@/components/onboarding/OneLastThing";
import { QuestionFlow } from "@/components/onboarding/QuestionFlow";
import { WelcomeCard } from "@/components/onboarding/WelcomeCard";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

// ==================== ONBOARDING CONTENT COMPONENT ====================
function OnboardingContent() {
  const searchParams = useSearchParams();
  const step = searchParams.get("step");
  const [currentView, setCurrentView] = useState<
    "welcome" | "questions" | "last"
  >("welcome");

  useEffect(() => {
    if (step === "last") {
      setCurrentView("last");
    }
  }, [step]);

  const handleContinue = () => {
    setCurrentView("questions");
  };

  if (currentView === "welcome") {
    return <WelcomeCard onContinue={handleContinue} />;
  }

  if (currentView === "questions") {
    return <QuestionFlow />;
  }

  if (currentView === "last") {
    return <OneLastThing />;
  }

  return null;
}

// ==================== MAIN COMPONENT WITH SUSPENSE ====================
export default function OnboardingPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen w-full flex justify-center items-center bg-white dark:bg-gray-900">
          <div className="text-gray-900 dark:text-white">Loading...</div>
        </div>
      }
    >
      <OnboardingContent />
    </Suspense>
  );
}
