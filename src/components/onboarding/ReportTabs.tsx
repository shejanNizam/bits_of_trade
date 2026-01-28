// 05

"use client";

import { Tabs } from "antd";
import { useState } from "react";
// import { useGetDisciplineReportQuery } from '@/lib/redux/features/onboarding/onboardingApi';

type TabType = "low" | "moderate" | "high";

const mockReportData = {
  low: {
    title: "Your discipline patterns are currently stable.",
    badge: "Low Discipline Risk",
    badgeIcon: "🟢",
    badgeColor:
      "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 border-green-300 dark:border-green-700",
    description: "Your responses suggest that you:",
    iconColor: "text-green-500",
    points: [
      "Respect limits",
      "Pause after losses",
      "Avoid emotional escalation",
    ],
    advice: "This already puts you ahead of most retail traders.",
    infoBox: {
      title: "Reality Check",
      subtitle: "Discipline is not permanent.",
      content: [
        "Most breakdowns happen:",
        "• After profitable streaks",
        "• During high-confidence phases",
        "• When rules feel safe to bend",
      ],
      footer: "Strong discipline still needs protection.",
    },
    buttonText: "🛡️ Protect What's Working",
    buttonSubtext: "Because discipline should not rely on memory.",
  },
  moderate: {
    title: "Your discipline holds — until pressure increases.",
    badge: "Moderate Discipline Risk",
    badgeIcon: "🟡",
    badgeColor:
      "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 border-yellow-300 dark:border-yellow-700",
    description: "Your answers suggest that:",
    iconColor: "text-yellow-500",
    points: [
      "Rules exist, but aren't always enforced",
      "Trade behavior changes after wins or losses",
      "Limits are sometimes flexible",
    ],
    advice: "This is where overtrading usually begins.",
    infoBox: {
      title: "Reframe",
      subtitle: "This is not a personal failure.",
      content: [
        "It's what happens when structure is missing during emotionally charged moments.",
      ],
      footer: "",
    },
    buttonText: "⚡ Stabilize Your Trading Behavior",
    buttonSubtext: "Small structure now prevents larger damage later.",
  },
  high: {
    title: "Your trading behavior is likely harming your results.",
    badge: "High Discipline Risk",
    badgeIcon: "🔴",
    badgeColor:
      "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 border-red-300 dark:border-red-700",
    description: "Your responses suggest:",
    iconColor: "text-red-500",
    points: [
      "Rules are often overridden",
      "Trading continues after emotional triggers",
      "Loss recovery attempts increase activity",
    ],
    advice: "This is a behavior pattern — not a strategy problem.",
    infoBox: {
      title: "Normalize",
      subtitle: "This is extremely common. And it's reversible.",
      content: [
        "Without structure, discipline relies on willpower.",
        "Willpower always runs out.",
      ],
      footer: "",
    },
    buttonText: "🔧 Create Immediate Structure",
    buttonSubtext: "The goal is not more trades. It's fewer mistakes.",
  },
};

export function ReportTabs() {
  const [activeTab, setActiveTab] = useState<TabType>("low");

  // 🔥 RTK Query - Uncomment when backend ready
  // const { data, isLoading } = useGetDisciplineReportQuery(activeTab);

  const reportData = mockReportData[activeTab];

  const tabItems = [
    { key: "low", label: "Low Risk" },
    { key: "moderate", label: "Moderate Risk" },
    { key: "high", label: "High Risk" },
  ];

  const getIcon = () => {
    const iconClass = "w-5 h-5 flex-shrink-0 mt-0.5";

    switch (activeTab) {
      case "low":
        return (
          <svg
            className={`${iconClass} ${reportData.iconColor}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        );
      case "moderate":
        return (
          <svg
            className={`${iconClass} ${reportData.iconColor}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        );
      case "high":
        return (
          <svg
            className={`${iconClass} ${reportData.iconColor}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      {/* Tabs - Only Ant Design component */}
      <div className="font-bold">
        <div className="container mx-auto px-4">
          <Tabs
            centered
            activeKey={activeTab}
            onChange={(key) => setActiveTab(key as TabType)}
            items={tabItems}
            size="large"
          />
        </div>
      </div>

      {/* Content - All Tailwind */}
      <div className="flex-1 flex items-center justify-center p-4 py-12">
        <div className="max-w-lg w-full bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8">
          {/* Badge */}
          <div className="text-center mb-6">
            <span
              className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium border ${reportData.badgeColor}`}
            >
              {reportData.badgeIcon} {reportData.badge}
            </span>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-semibold text-center mb-8 text-blue-600 dark:text-blue-400 leading-tight">
            {reportData.title}
          </h2>

          {/* Description */}
          <p className="text-gray-600 dark:text-gray-400 mb-4 text-[15px]">
            {reportData.description}
          </p>

          {/* Points List */}
          <div className="space-y-3.5 mb-6">
            {reportData.points.map((point, index) => (
              <div key={index} className="flex items-start gap-3">
                {getIcon()}
                <span className="text-[15px] flex-1 text-gray-800 dark:text-gray-200 leading-relaxed">
                  {point}
                </span>
              </div>
            ))}
          </div>

          {/* Advice */}
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">
            {reportData.advice}
          </p>

          {/* Info Box (Reality Check / Reframe / Normalize) */}
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-5 mb-6">
            <p className="font-semibold text-sm text-gray-900 dark:text-gray-100 mb-1">
              {reportData.infoBox.title}
            </p>

            {reportData.infoBox.subtitle && (
              <p className="text-[13px] text-gray-800 dark:text-gray-200 mb-3">
                {reportData.infoBox.subtitle}
              </p>
            )}

            <div className="space-y-1">
              {reportData.infoBox.content.map((line, index) => (
                <p
                  key={index}
                  className="text-[13px] text-gray-600 dark:text-gray-400 leading-relaxed"
                >
                  {line}
                </p>
              ))}
            </div>

            {reportData.infoBox.footer && (
              <p className="font-semibold text-[13px] text-gray-800 dark:text-gray-200 mt-3">
                {reportData.infoBox.footer}
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="space-y-2">
            <button className="w-full h-12 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-medium text-[15px] rounded-lg transition-colors">
              {reportData.buttonText}
            </button>

            <p className="text-center text-xs text-gray-500 dark:text-gray-400 pt-1 pb-3">
              {reportData.buttonSubtext}
            </p>

            <button className="w-full h-11 flex items-center justify-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 text-sm transition-colors">
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
              Or share this result and view later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
