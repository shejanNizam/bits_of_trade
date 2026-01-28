// export default function OnBoardingPage() {
//   return (
//     <div>
//       <h3>OnBoardingPage---------</h3>
//     </div>
//   );
// }

"use client";

import { OneLastThing } from "@/components/onboarding/OneLastThing";
import { QuestionFlow } from "@/components/onboarding/QuestionFlow";
import { WelcomeCard } from "@/components/onboarding/WelcomeCard";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function OnboardingPage() {
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
