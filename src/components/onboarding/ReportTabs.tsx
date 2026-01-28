// 05

"use client";

import { CheckCircleOutlined, CopyOutlined } from "@ant-design/icons";
import { Button, Card, Space, Tabs, Tag, Typography } from "antd";
import { useState } from "react";
// import { useGetDisciplineReportQuery } from '@/lib/redux/features/onboarding/onboardingApi';

const { Title, Paragraph, Text } = Typography;

type TabType = "low" | "moderate" | "high";

const mockReportData = {
  low: {
    title: "Your discipline patterns are currently stable.",
    subtitle: "Low Risk",
    color: "#10b981",
    description: "Your responses suggest that:",
    points: [
      "Respect limits",
      "Pause after losses",
      "Avoid emotional execution",
    ],
    advice: "This steady puts you ahead of most retail traders.",
    buttonText: "If Anxiet What's Working",
  },
  moderate: {
    title: "Your discipline holds — until pressure increases.",
    subtitle: "Moderate Risk",
    color: "#f59e0b",
    description: "Your answers suggest that:",
    points: [
      "Rules exist, but aren't always enforced",
      "Trade between ranges when stress is lower",
      "Limits are sometimes flexible",
    ],
    advice: "This is where overtrading usually starts.",
    buttonText: "⚡ Stabilize Your Trading Behavior",
  },
  high: {
    title: "Your trading behavior is likely harming your results.",
    subtitle: "High Risk",
    color: "#ef4444",
    description: "Your responses suggest:",
    points: [
      "Rules are often overridden",
      "Trading continues after emotional triggers",
      "Loses recovery attempts increase activity",
    ],
    advice: "This is a behavior pattern — not a strategy problem.",
    buttonText: "Create Immediate Structure →",
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

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Top Bar */}
      <div className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Title level={5} className="mb-0">
            BitsOfTrade
          </Title>
          <Button type="link">Logout</Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4">
          <Tabs
            activeKey={activeTab}
            onChange={(key) => setActiveTab(key as TabType)}
            items={tabItems}
            size="large"
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center p-4 py-12">
        <Card
          className="max-w-lg w-full shadow-2xl"
          style={{ borderRadius: 24 }}
          bordered={false}
        >
          {/* Badge */}
          <div className="text-center mb-6">
            <Tag
              style={{
                fontSize: 14,
                padding: "4px 16px",
                borderRadius: 20,
                backgroundColor: `${reportData.color}20`,
                color: reportData.color,
                border: `1px solid ${reportData.color}`,
              }}
            >
              {reportData.subtitle}
            </Tag>
          </div>

          {/* Title */}
          <Title
            level={4}
            className="text-center mb-6"
            style={{ color: "#2563eb", fontWeight: 600 }}
          >
            {reportData.title}
          </Title>

          {/* Description */}
          <Text strong className="block mb-4" style={{ fontSize: 15 }}>
            {reportData.description}
          </Text>

          {/* Points List */}
          <Space direction="vertical" size={12} className="w-full mb-6">
            {reportData.points.map((point, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircleOutlined
                  style={{ color: "#10b981", fontSize: 20, marginTop: 2 }}
                />
                <Text style={{ fontSize: 14, flex: 1 }}>{point}</Text>
              </div>
            ))}
          </Space>

          {/* Advice */}
          <Paragraph
            italic
            className="mb-6"
            style={{
              color: "#6b7280",
              fontSize: 14,
              padding: "12px 16px",
              backgroundColor: "#f9fafb",
              borderRadius: 8,
            }}
          >
            {reportData.advice}
          </Paragraph>

          {/* Action Buttons */}
          <Space direction="vertical" size={12} className="w-full">
            <Button type="primary" size="large" block>
              {reportData.buttonText}
            </Button>

            <Button
              type="text"
              block
              icon={<CopyOutlined />}
              style={{ height: 48 }}
            >
              Or share this result and view later
            </Button>
          </Space>
        </Card>
      </div>
    </div>
  );
}
