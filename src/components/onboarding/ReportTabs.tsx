"use client";

import { useSendDisciplineReportMutation } from "@/redux/features/disciplineTestApi/disciplineTestApi";
import { Form, Input, Modal } from "antd";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { AiOutlineWarning } from "react-icons/ai";
import {
  IoMdCheckmarkCircleOutline,
  IoMdClose,
  IoMdCloseCircleOutline,
} from "react-icons/io";
import { MdEmail } from "react-icons/md";
import CustomPrimaryButton from "../shared/CustomPrimaryButton";

type TabType = "low" | "moderate" | "high";

const reportData = {
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
  const searchParams = useSearchParams();
  const riskParam = searchParams.get("risk") as TabType | null;
  const scoreParam = searchParams.get("score");

  const [riskLevel, setRiskLevel] = useState<TabType>("low");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  // Use the RTK Query mutation
  const [sendReport, { isLoading: isSending }] =
    useSendDisciplineReportMutation();

  // Set risk level based on URL param when component mounts
  useEffect(() => {
    if (riskParam && ["low", "moderate", "high"].includes(riskParam)) {
      setRiskLevel(riskParam);
    }
  }, [riskParam]);

  const currentReport = reportData[riskLevel];

  const getIcon = () => {
    const iconClass = "w-5 h-5 flex-shrink-0 mt-0.5";

    switch (riskLevel) {
      case "low":
        return (
          <IoMdCheckmarkCircleOutline
            className={`${iconClass} ${currentReport.iconColor}`}
          />
        );
      case "moderate":
        return (
          <AiOutlineWarning
            className={`${iconClass} ${currentReport.iconColor}`}
          />
        );
      case "high":
        return (
          <IoMdCloseCircleOutline
            className={`${iconClass} ${currentReport.iconColor}`}
          />
        );
      default:
        return null;
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const handleSubmit = async (values: { email: string }) => {
    try {
      // Call the API to send the report
      await sendReport({
        email: values.email,
        risk_level: riskLevel,
      }).unwrap();

      console.log("Report sent to:", values.email, "Risk Level:", riskLevel);

      // Show success message
      Modal.success({
        title: "Success!",
        content: "Your discipline profile has been sent to your email.",
        centered: true,
      });

      handleCloseModal();
    } catch (error) {
      console.error("Failed to send report:", error);
      Modal.error({
        title: "Error",
        content: "Failed to send report. Please try again.",
        centered: true,
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Score Display - Optional */}
      {scoreParam && (
        <div className="container mx-auto px-4 pt-6">
          <div className="text-center">
            <span className="inline-block bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-sm font-medium px-4 py-2 rounded-full">
              Your Score: {scoreParam} / 15
            </span>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="flex-1 flex items-center justify-center p-4 py-12">
        <div className="max-w-lg w-full bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 transition-colors">
          <div className="text-center mb-6">
            <span
              className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium border ${currentReport.badgeColor} transition-colors`}
            >
              {currentReport.badgeIcon} {currentReport.badge}
            </span>
          </div>

          <h2 className="text-2xl font-semibold text-center mb-8 text-blue-600 dark:text-blue-400 leading-tight transition-colors">
            {currentReport.title}
          </h2>

          <p className="text-gray-600 dark:text-gray-400 mb-4 text-[15px] transition-colors">
            {currentReport.description}
          </p>

          <div className="space-y-3.5 mb-6">
            {currentReport.points.map((point, index) => (
              <div key={index} className="flex items-start gap-3">
                {getIcon()}
                <span className="text-[15px] flex-1 text-gray-800 dark:text-gray-200 leading-relaxed transition-colors">
                  {point}
                </span>
              </div>
            ))}
          </div>

          <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 transition-colors">
            {currentReport.advice}
          </p>

          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-5 mb-6 transition-colors">
            <p className="font-semibold text-sm text-gray-900 dark:text-gray-100 mb-1 transition-colors">
              {currentReport.infoBox.title}
            </p>

            {currentReport.infoBox.subtitle && (
              <p className="text-[13px] text-gray-800 dark:text-gray-200 mb-3 transition-colors">
                {currentReport.infoBox.subtitle}
              </p>
            )}

            <div className="space-y-1">
              {currentReport.infoBox.content.map((line, index) => (
                <p
                  key={index}
                  className="text-[13px] text-gray-600 dark:text-gray-400 leading-relaxed transition-colors"
                >
                  {line}
                </p>
              ))}
            </div>

            {currentReport.infoBox.footer && (
              <p className="font-semibold text-[13px] text-gray-800 dark:text-gray-200 mt-3 transition-colors">
                {currentReport.infoBox.footer}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <CustomPrimaryButton className="w-full" onClick={handleOpenModal}>
              {currentReport.buttonText}
            </CustomPrimaryButton>

            <p className="text-center text-xs text-gray-500 dark:text-gray-400 pt-1 pb-3 transition-colors">
              {currentReport.buttonSubtext}
            </p>
          </div>
        </div>
      </div>

      {/* Email Modal */}
      <Modal
        open={isModalOpen}
        onCancel={handleCloseModal}
        footer={null}
        centered
        width={500}
        closeIcon={
          <IoMdClose className="text-gray-500 hover:text-gray-700 text-2xl" />
        }
      >
        <div className="py-4">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <MdEmail className="w-8 h-8 text-blue-600" />
            </div>
          </div>

          {/* Title */}
          <h3 className="text-2xl font-semibold text-center mb-2 text-gray-900 dark:text-white">
            Want a copy of your discipline profile?
          </h3>

          {/* Description */}
          <p className="text-center text-gray-600 dark:text-white mb-8">
            {
              "We'll send your result breakdown and how traders at your level usually slip."
            }
          </p>

          {/* Form */}
          <Form form={form} onFinish={handleSubmit} layout="vertical">
            <Form.Item
              name="email"
              rules={[
                { required: true, message: "Please enter your email" },
                { type: "email", message: "Please enter a valid email" },
              ]}
            >
              <Input
                size="large"
                placeholder="your@email.com"
                className="rounded-lg"
                style={{ height: 56 }}
              />
            </Form.Item>

            <Form.Item className="mb-4">
              <button
                type="submit"
                disabled={isSending}
                className="w-full h-11 sm:h-12 md:h-14 rounded-full bg-primary hover:bg-secondary shadow-lg hover:shadow-sm text-white font-medium text-sm sm:text-base md:text-lg px-6 sm:px-8 transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:bg-primary touch-manipulation"
              >
                {isSending ? (
                  <>
                    <span className="animate-spin">⏳</span> Sending...
                  </>
                ) : (
                  <>📧 Send My Results</>
                )}
              </button>
            </Form.Item>

            <p className="text-center text-sm text-gray-500">
              No signals. No spam. Ever.
            </p>
          </Form>
        </div>
      </Modal>
    </div>
  );
}
