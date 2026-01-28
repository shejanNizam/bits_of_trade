// 01

"use client";

import { RiseOutlined } from "@ant-design/icons";
import { Avatar, Button, Card, Typography } from "antd";

const { Title, Paragraph } = Typography;

interface WelcomeCardProps {
  onContinue: () => void;
}

export function WelcomeCard({ onContinue }: WelcomeCardProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <Card className="max-w-lg w-full shadow-2xl" style={{ borderRadius: 24 }}>
        {/* App Icon */}
        <div className="text-center mb-6">
          <Avatar
            size={64}
            style={{ backgroundColor: "#2563eb" }}
            icon={<RiseOutlined />}
          />
        </div>

        {/* Title */}
        <Title level={2} className="text-center mb-8">
          Welcome to BitsofTrade
        </Title>

        {/* Info Box */}
        <div className="bg-blue-50 rounded-2xl p-6 mb-6 relative">
          <Paragraph className="text-center mb-0 mt-6 font-medium">
            BitsOfTrade is not a trading platform.
          </Paragraph>
        </div>

        {/* Description */}
        <Paragraph className="text-center mb-8">
          It is a{" "}
          <span className="text-blue-600 font-medium">
            discipline and behavior system
          </span>{" "}
          designed to help traders reduce overtrading, enforce limits, and
          understand when and why their process breaks down.
        </Paragraph>

        {/* Continue Button */}
        <Button
          type="primary"
          size="large"
          block
          onClick={onContinue}
          style={{ height: 48, borderRadius: 12, fontSize: 16 }}
        >
          Continue
        </Button>
      </Card>
    </div>
  );
}
