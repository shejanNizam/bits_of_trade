// 03

"use client";

import { PlayCircleOutlined } from "@ant-design/icons";
import { Avatar, Button, Card, Space, Typography } from "antd";
import { useRouter } from "next/navigation";

const { Title, Paragraph } = Typography;

export function OneLastThing() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Top Bar */}
      {/* <div className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Space>
            <Button
              type="text"
              icon={<ArrowLeftOutlined />}
              onClick={() => router.back()}
            />
            <Title level={5} className="mb-0">
              BitsOfTrade
            </Title>
          </Space>

          <Progress
            percent={100}
            showInfo={false}
            strokeColor="#2563eb"
            style={{ flex: 1, maxWidth: 400, margin: "0 32px" }}
          />

          <Button type="link">Logout</Button>
        </div>
      </div> */}

      {/* Content */}
      <div className="flex-1 flex items-center justify-center p-4">
        <Card
          className="max-w-md w-full shadow-2xl"
          style={{ borderRadius: 24 }}
        >
          {/* Icon */}
          <div className="text-center mb-6">
            <Avatar
              size={64}
              style={{ backgroundColor: "#ef4444" }}
              icon={<PlayCircleOutlined />}
            />
          </div>

          {/* Title */}
          <Title level={3} className="text-center mb-4">
            One last thing
          </Title>

          {/* Description */}
          <Paragraph className="text-center mb-8">
            Most traders dont lose money because of bad strategies. They lose it
            when{" "}
            <span className="text-blue-600 font-medium">
              discipline collapses
            </span>{" "}
            under specific conditions.
          </Paragraph>

          {/* Buttons */}
          <Space direction="vertical" size="middle" className="w-full">
            <Button
              type="primary"
              size="large"
              block
              onClick={() => router.push("/onboarding/discipline-test")}
              style={{ height: 48, borderRadius: 12 }}
            >
              Take the Discipline Test (2 mins)
            </Button>

            <Button type="text" block onClick={() => router.push("/")}>
              Skip for now
            </Button>
          </Space>
        </Card>
      </div>
    </div>
  );
}
