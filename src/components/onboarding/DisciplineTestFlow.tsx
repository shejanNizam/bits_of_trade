//  04

"use client";

import { CheckOutlined } from "@ant-design/icons";
import { Button, Card, Space, Tag, Typography } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";
// import { useSubmitDisciplineTestMutation } from '@/lib/redux/features/onboarding/onboardingApi';

const { Title, Text } = Typography;

const disciplineQuestions = [
  {
    id: "dt1",
    title: "How do you handle losing trades?",
    type: "single" as const,
    options: [
      "I immediately want to make it back",
      "I take a break and reassess",
      "I stick to my trading plan",
      "I increase my position size",
    ],
  },
  {
    id: "dt2",
    title: "What triggers you to overtrade?",
    subtitle: "Select all that apply",
    type: "multiple" as const,
    options: [
      "Seeing others profit",
      "Consecutive losses",
      "Market volatility",
      "Boredom",
      "Fear of missing out",
    ],
  },
  {
    id: "dt3",
    title: "How often do you follow your trading plan?",
    type: "single" as const,
    options: [
      "Always stick to it",
      "Most of the time",
      "Sometimes deviate",
      "Rarely follow it",
    ],
  },
  {
    id: "dt4",
    title: "When do you feel most tempted to break rules?",
    subtitle: "Select all that apply",
    type: "multiple" as const,
    options: [
      "After big wins",
      "After big losses",
      "During winning streaks",
      "During losing streaks",
      "When market is very active",
    ],
  },
  {
    id: "dt5",
    title: "How do you manage risk?",
    type: "single" as const,
    options: [
      "Set stop-loss every trade",
      "Use mental stops",
      "Risk a fixed percentage",
      "Adjust based on feeling",
    ],
  },
];

const isLoading = false;

export function DisciplineTestFlow() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});

  //   const [submitTest, { isLoading }] = useSubmitDisciplineTestMutation();

  const currentQuestion = disciplineQuestions[currentStep];
  // const progress = ((currentStep + 1) / disciplineQuestions.length) * 100;

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
        // 🔥 API Call - Uncomment when backend ready
        // await submitTest(answers).unwrap();
        console.log("Submitting discipline test:", answers);

        router.push("/onboarding/discipline-test?view=report");
      } catch (error) {
        console.error("Failed to submit test:", error);
      }
    }
  };

  // const handleBack = () => {
  //   if (currentStep > 0) {
  //     setCurrentStep(currentStep - 1);
  //   }
  // };

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
      {/* Top Bar */}
      {/* <div className="bg-white border-b sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4 flex-1">
            <Button
              type="text"
              icon={<ArrowLeftOutlined />}
              onClick={handleBack}
              style={{ padding: "4px 8px" }}
            />

            <Title
              level={5}
              className="mb-0 mr-4"
              style={{ whiteSpace: "nowrap" }}
            >
              BitsOfTrade
            </Title>

            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden max-w-md">
              <div
                className="h-full bg-blue-600 transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <Button type="link">Logout</Button>
        </div>
      </div> */}

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
              {currentStep + 1}/{disciplineQuestions.length}
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
                      flexShrink: 0,
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

          {/* Next Button (only for multiple) */}
          {currentQuestion.type === "multiple" && (
            <Button
              type="primary"
              size="large"
              block
              onClick={handleNext}
              loading={isLoading}
              disabled={!hasSelection}
            >
              {currentStep === disciplineQuestions.length - 1
                ? "Submit"
                : "Next"}
            </Button>
          )}
        </Card>
      </div>
    </div>
  );
}
