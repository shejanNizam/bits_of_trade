// 01

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

  // const [currentView, setCurrentView] = useState<
  //   "welcome" | "before-begin" | "questions" | "last"
  // >("welcome");

  const [currentView, setCurrentView] = useState<
    "welcome" | "questions" | "last"
  >("welcome");

  useEffect(() => {
    if (step === "last") {
      setCurrentView("last");
    }
  }, [step]);

  const handleWelcomeContinue = () => {
    setCurrentView("questions");
  };

  // const handleBeforeBeginContinue = () => {
  //   setCurrentView("questions");
  // };

  if (currentView === "welcome") {
    return <WelcomeCard onContinue={handleWelcomeContinue} />;
  }

  // if (currentView === "before-begin") {
  //   return <BeforeYouBegin onContinue={handleBeforeBeginContinue} />;
  // }

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
    <div className="min-h-screen w-full bg-linear-to-br from-gray-50 via-white to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <Suspense
        fallback={
          <div className="min-h-screen w-full flex justify-center items-center">
            <div className="flex flex-col items-center gap-4">
              {/* Loading Spinner */}
              <div className="relative w-16 h-16">
                <div className="absolute inset-0 border-4 border-gray-200 dark:border-gray-700 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-transparent border-t-blue-600 dark:border-t-blue-500 rounded-full animate-spin"></div>
              </div>

              {/* Loading Text */}
              <div className="text-lg font-medium text-gray-900 dark:text-gray-100">
                Loading...
              </div>

              {/* Loading Subtext */}
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Preparing your experience
              </div>
            </div>
          </div>
        }
      >
        <OnboardingContent />
      </Suspense>
    </div>
  );
}
