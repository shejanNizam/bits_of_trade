// 02

"use client";

import { ArrowLeftOutlined, CheckOutlined } from "@ant-design/icons";
import { Button, Card, Space, Tag, Typography } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";
// import { useSubmitOnboardingAnswersMutation } from '@/lib/redux/features/onboarding/onboardingApi';

const { Title, Text } = Typography;

const questions = [
  {
    id: "q1",
    title: "What is your primary trading goal?",
    type: "single" as const,
    options: [
      "Generate consistent income",
      "Build long-term wealth",
      "Learn and improve skills",
      "Supplement my main income",
    ],
  },
  {
    id: "q2",
    title: "Which trading styles interest you?",
    subtitle: "Select all that apply",
    type: "multiple" as const,
    options: [
      "Day Trading",
      "Swing Trading",
      "Scalping",
      "Position Trading",
      "Options Trading",
    ],
  },
  {
    id: "q3",
    title: "How much time can you dedicate to trading daily?",
    type: "single" as const,
    options: [
      "Less than 1 hour",
      "1-3 hours",
      "3-6 hours",
      "More than 6 hours",
    ],
  },
  {
    id: "q4",
    title: "What is your risk tolerance?",
    type: "single" as const,
    options: [
      "Conservative - Minimize losses",
      "Moderate - Balanced approach",
      "Aggressive - Higher risk for higher returns",
    ],
  },
  {
    id: "q5",
    title: "What challenges do you face in trading?",
    subtitle: "Select all that apply",
    type: "multiple" as const,
    options: [
      "Emotional decision making",
      "Overtrading",
      "Lack of strategy",
      "Poor risk management",
      "Inconsistent results",
    ],
  },
];

const isLoading = false;

export function QuestionFlow() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});

  //   const [submitAnswers, { isLoading }] = useSubmitOnboardingAnswersMutation();

  const currentQuestion = questions[currentStep];
  const progress = ((currentStep + 1) / questions.length) * 100;

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
        // 🔥 API Call - Uncomment when backend ready
        // await submitAnswers(answers).unwrap();
        console.log("Submitting answers:", answers);

        router.push("/onboarding?step=last");
      } catch (error) {
        console.error("Failed to submit answers:", error);
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
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Top Progress Bar */}
      <div className="bg-white border-b sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Button
            type="text"
            icon={<ArrowLeftOutlined />}
            onClick={handleBack}
            style={{ padding: "4px 8px" }}
          />

          <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Question Card */}
      <div className="flex-1 flex items-center justify-center p-4">
        <Card
          className="max-w-lg w-full shadow-xl"
          style={{ borderRadius: 24 }}
          bordered={false}
        >
          {/* Question Number */}
          <div className="text-center mb-6">
            <Tag
              color="blue"
              style={{ fontSize: 14, padding: "4px 16px", borderRadius: 20 }}
            >
              Question {currentStep + 1}/{questions.length}
            </Tag>
          </div>

          {/* Title */}
          <Title
            level={4}
            className="text-center mb-2"
            style={{ fontWeight: 600 }}
          >
            {currentQuestion.title}
          </Title>

          {currentQuestion.subtitle && (
            <Text
              type="secondary"
              className="block text-center mb-6"
              style={{ fontSize: 14 }}
            >
              {currentQuestion.subtitle}
            </Text>
          )}

          {/* Options - Custom Styled */}
          <Space direction="vertical" size={12} className="w-full mb-6">
            {currentQuestion.options.map((option) => {
              const selected = isSelected(option);
              return (
                <button
                  key={option}
                  onClick={() => handleSelect(option)}
                  className="w-full text-left transition-all"
                  style={{
                    height: 60,
                    padding: "0 20px",
                    borderRadius: 6,
                    border: `2px solid ${selected ? "#2563EB" : "#e5e7eb"}`,
                    backgroundColor: selected ? "#eff6ff" : "#ffffff",
                    fontSize: 14,
                    fontWeight: 500,
                    color: selected ? "#1e40af" : "#374151",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    cursor: "pointer",
                  }}
                >
                  <span>{option}</span>

                  <div
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: "50%",
                      border: `2px solid ${selected ? "#2563EB" : "#d1d5db"}`,
                      backgroundColor: selected ? "#2563EB" : "transparent",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {selected && (
                      <CheckOutlined
                        style={{ fontSize: 12, color: "#ffffff" }}
                      />
                    )}
                  </div>
                </button>
              );
            })}
          </Space>

          {/* Next Button (only for multiple answers) */}
          {currentQuestion.type === "multiple" && (
            <Button
              type="primary"
              size="large"
              block
              onClick={handleNext}
              loading={isLoading}
              disabled={!hasSelection}
            >
              {currentStep === questions.length - 1 ? "Submit" : "Next"}
            </Button>
          )}
        </Card>
      </div>
    </div>
  );
}
