// 07

"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { IoMdArrowBack, IoMdCheckmark } from "react-icons/io";
import CustomPrimaryButton from "../shared/CustomPrimaryButton";

const disciplineQuestions = [
  {
    id: "dt1",
    title: "After a losing trade, what usually happens next?",
    type: "single" as const,
    options: [
      "⏸️ I usually stop for the day",
      "🔁 I take one more “setup”",
      "🔥 I trade more aggressively",
      "❓ I don't really track this",
    ],
  },
  {
    id: "dt2",
    title: "On a profitable day, how do you behave?",
    type: "single" as const,
    options: [
      "✅ I follow my usual rules",
      "🔄 I increase trade frequency",
      "📈 I increase position size",
      "🧠 It depends on how confident I feel",
    ],
  },
  {
    id: "dt3",
    title: "Do you have fixed limits for?",
    subtitle: "(select all that apply)",
    type: "multiple" as const,
    options: [
      "🔢 Number of trades per session",
      "💸 Daily loss",
      "⏱️ Time spent trading",
      "🚫 I don't have fixed limits",
    ],
  },
  {
    id: "dt4",
    title: "When rules are broken, what usually causes it?",
    type: "single" as const,
    options: [
      "😰 Emotion (fear / greed)",
      "🌪️ Market volatility",
      "📭 I don't review rule breaks",
      "🧩 Lack of clarity",
    ],
  },
  {
    id: "dt5",
    title: "How often do you journal your trades?",
    type: "single" as const,
    options: ["📆 Daily", "🗓️ Weekly", "⏳ Occasionally", "🚫 Almost never"],
  },
];

export function DisciplineTestFlow() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [isLoading, setIsLoading] = useState(false);

  const currentQuestion = disciplineQuestions[currentStep];
  const progress = (currentStep / disciplineQuestions.length) * 100;

  const handleSelect = (value: string) => {
    if (currentQuestion.type === "multiple") {
      const current = (answers[currentQuestion.id] as string[]) || [];
      const updated = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      setAnswers({ ...answers, [currentQuestion.id]: updated });
    } else {
      setAnswers({ ...answers, [currentQuestion.id]: value });
      setTimeout(() => handleNext(), 300);
    }
  };

  const handleNext = async () => {
    if (currentStep < disciplineQuestions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      try {
        setIsLoading(true);
        console.log("Submitting discipline test:", answers);
        router.push("/onboarding/discipline-test?view=report");
      } catch (error) {
        console.error("Failed to submit test:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const isSelected = (value: string) => {
    if (currentQuestion.type === "multiple") {
      return ((answers[currentQuestion.id] as string[]) || []).includes(value);
    }
    return answers[currentQuestion.id] === value;
  };

  const hasSelection =
    currentQuestion.type === "multiple"
      ? ((answers[currentQuestion.id] as string[]) || []).length > 0
      : false;

  return (
    <div className="min-h-screen flex flex-col bg-linear-to-br from-gray-50 via-white to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 transition-colors">
      {/* Top Progress Bar */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-10 shadow-sm dark:shadow-gray-900/50 transition-colors">
        <div className="container mx-auto px-3 sm:px-4 md:px-6 py-3 sm:py-4 flex items-center gap-3 sm:gap-4">
          {/* Back Button */}
          <button
            onClick={handleBack}
            disabled={currentStep === 0}
            className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <IoMdArrowBack className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700 dark:text-gray-300" />
          </button>

          {/* Progress Bar */}
          <div className="flex-1 h-2 sm:h-2.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden transition-colors">
            <div
              className="h-full bg-blue-600 dark:bg-blue-500 transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Progress Text */}
          <div className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400 whitespace-nowrap transition-colors">
            {currentStep + 1}/{disciplineQuestions.length}
          </div>
        </div>
      </div>

      {/* Question Card */}
      <div className="flex-1 flex items-center justify-center p-3 sm:p-4 md:p-6">
        <div className="max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl w-full bg-white dark:bg-gray-900 shadow-xl sm:shadow-2xl dark:shadow-gray-900/50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 border border-gray-200 dark:border-gray-800 transition-colors">
          {/* Question Number Badge */}
          <div className="text-center mb-4 sm:mb-6">
            <span className="inline-block bg-blue-100 dark:bg-blue-950/50 text-blue-700 dark:text-blue-400 text-xs sm:text-sm font-medium px-4 sm:px-5 py-1.5 sm:py-2 rounded-full border border-blue-200 dark:border-blue-900/50 transition-colors">
              Question {currentStep + 1} of {disciplineQuestions.length}
            </span>
          </div>

          {/* Question Title */}
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-center mb-2 sm:mb-3 text-gray-900 dark:text-white leading-tight transition-colors">
            {currentQuestion.title}
          </h2>

          {/* Subtitle */}
          {currentQuestion.subtitle && (
            <p className="text-sm sm:text-base text-center mb-6 sm:mb-8 text-gray-600 dark:text-gray-400 transition-colors">
              {currentQuestion.subtitle}
            </p>
          )}

          {/* Options */}
          <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
            {currentQuestion.options.map((option) => {
              const selected = isSelected(option);
              return (
                <button
                  key={option}
                  onClick={() => handleSelect(option)}
                  className={`w-full text-center transition-all duration-200 flex items-center justify-between px-4 sm:px-5 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl text-sm sm:text-base font-medium border-2 ${
                    selected
                      ? "border-blue-600 dark:border-blue-500 bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-300"
                      : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-750"
                  }`}
                >
                  <span className="pr-3">{option}</span>

                  {/* Checkbox/Radio Circle */}
                  <div
                    className={`shrink-0 w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      selected
                        ? "border-blue-600 dark:border-blue-500 bg-blue-600 dark:bg-blue-500"
                        : "border-gray-300 dark:border-gray-600 bg-transparent"
                    }`}
                  >
                    {selected && (
                      <IoMdCheckmark className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Next Button (only for multiple answers) */}
          {currentQuestion.type === "multiple" && (
            <CustomPrimaryButton
              onClick={handleNext}
              disabled={!hasSelection || isLoading}
              className="w-full"
            >
              {isLoading
                ? "Submitting..."
                : currentStep === disciplineQuestions.length - 1
                  ? "Submit"
                  : "Next"}
            </CustomPrimaryButton>
          )}
        </div>
      </div>
    </div>
  );
}
