// 04

"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { IoMdArrowBack, IoMdCheckmark } from "react-icons/io";
import CustomPrimaryButton from "../shared/CustomPrimaryButton";

const questions = [
  {
    id: "q1",
    title: "How long you been trading?",
    type: "single" as const,
    options: [
      "Less than 6 months",
      "6 months to 1 year",
      "1-3 years",
      "3+ years",
    ],
  },
  {
    id: "q2",
    title: "Primary market you trade most often?",
    subtitle: "(select all that apply)",
    type: "multiple" as const,
    options: ["Indian Equity / F&O", "Forex", "Crypto"],
  },
  {
    id: "q3",
    title: "How do you usually trade?",
    subtitle: "(select all that apply)",
    type: "multiple" as const,
    options: ["Impulsive", "Mixed", "Rule-based", "Unsure"],
  },
  {
    id: "q4",
    title: "What do you want BitsOfTrade to help you control?",
    subtitle: "(select all that apply)",
    type: "multiple" as const,
    options: [
      "Reduce Overtrading ( identify when trade frequency, timing, or emotions start breaking your rules )",
      "Enforce Trading Rules ( set limits on trades, losses, sites, and apps—and get evolved when you're close to breaking them )",
      "Understand My Trading Behavior ( See patterns in your emotions, decisions, and mistakes — not just P&L. )",
      "Build a Repeatable Process ( Move from impulsive decisions to a structured daily trading routine. )",
      "Learn Risk-First Trading ( Access learning focused on risk management, discipline, and execution — not signals. )",
    ],
  },
  {
    id: "q5",
    title: "How do you currently track trades?",
    subtitle: "(select all that apply)",
    type: "multiple" as const,
    options: [
      "I don't track consistently",
      "Notes / Excel",
      "Another Journal",
      "Broker statements only",
    ],
  },
  {
    id: "q6",
    title: "How did you hear about us?",
    type: "single" as const,
    options: ["Instagram", "YouTube", "Google", "Other"],
  },
];

export function QuestionFlow() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [isLoading, setIsLoading] = useState(false);

  const currentQuestion = questions[currentStep];
  const progress = (currentStep / questions.length) * 100;

  const handleSelect = (value: string) => {
    if (currentQuestion.type === "multiple") {
      const current = (answers[currentQuestion.id] as string[]) || [];
      const updated = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      setAnswers({ ...answers, [currentQuestion.id]: updated });
    } else {
      setAnswers({ ...answers, [currentQuestion.id]: value });
      // Auto navigate for single answer
      setTimeout(() => handleNext(), 300);
    }
  };

  const handleNext = async () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      try {
        setIsLoading(true);
        // 🔥 API Call - Uncomment when backend ready
        // await submitAnswers(answers).unwrap();
        console.log("Submitting answers:", answers);

        router.push("/onboarding?step=last");
      } catch (error) {
        console.error("Failed to submit answers:", error);
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
    <div className="min-h-screen flex flex-col bg-lineaar-to-br from-gray-50 via-white to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      {/* Top Progress Bar */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-10 shadow-sm dark:shadow-gray-900/50">
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
          <div className="flex-1 h-2 sm:h-2.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 dark:bg-blue-500 transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Progress Text */}
          <div className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400 whitespace-nowrap">
            {currentStep + 1}/{questions.length}
          </div>
        </div>
      </div>

      {/* Question Card */}
      <div className="flex-1 flex items-center justify-center p-3 sm:p-4 md:p-6">
        <div className="max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl w-full bg-white dark:bg-gray-900 shadow-xl sm:shadow-2xl dark:shadow-gray-900/50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 border border-gray-200 dark:border-gray-800">
          {/* Question Number Badge */}
          <div className="text-center mb-4 sm:mb-6">
            <span className="inline-block bg-blue-100 dark:bg-blue-950/50 text-blue-700 dark:text-blue-400 text-xs sm:text-sm font-medium px-4 sm:px-5 py-1.5 sm:py-2 rounded-full border border-blue-200 dark:border-blue-900/50">
              Question {currentStep + 1} of {questions.length}
            </span>
          </div>

          {/* Question Title */}
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-center mb-2 sm:mb-3 text-gray-900 dark:text-white leading-tight">
            {currentQuestion.title}
          </h2>

          {/* Subtitle */}
          {currentQuestion.subtitle && (
            <p className="text-sm sm:text-base text-center mb-6 sm:mb-8 text-gray-600 dark:text-gray-400">
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
                  className={`w-full text-left transition-all duration-200 flex items-center justify-between px-4 sm:px-5 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl text-sm sm:text-base font-medium border-2 ${
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
                : currentStep === questions.length - 1
                  ? "Submit"
                  : "Next"}
            </CustomPrimaryButton>
          )}
        </div>
      </div>
    </div>
  );
}
