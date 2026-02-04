"use client";

import { DownloadOutlined, FileTextOutlined } from "@ant-design/icons";
import { Button, Radio, Select, Tabs } from "antd";
import { useState } from "react";
import BehaviorTab from "../components/analysis/reports/behaviorTab/BehaviorTab";
import JournalTab from "../components/analysis/reports/journalTab/JournalTab";
import PerformanceTab from "../components/analysis/reports/performanceTab/PerformanceTab";
import RiskDrawdownTab from "../components/analysis/reports/riskDrawdownTab/RiskDrawdownTab";
import StrategyTab from "../components/analysis/reports/strategyTab/StrategyTab";

export default function ReportsPage() {
  const [activeTab, setActiveTab] = useState("performance");

  const tabItems = [
    {
      key: "performance",
      label: "Performance",
      children: <PerformanceTab />,
    },
    {
      key: "risk",
      label: "Risk & Drawdown",
      children: <RiskDrawdownTab />,
    },
    {
      key: "behavior",
      label: "Behavior",
      children: <BehaviorTab />,
    },
    {
      key: "strategy",
      label: "Strategy",
      children: <StrategyTab />,
    },
    {
      key: "journal",
      label: "Journal",
      children: <JournalTab />,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="w-full mx-auto">
        {/* Header Section */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Reports
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Structured analytics across performance, risk, behavior, and
            strategy.
          </p>
        </header>

        {/* Common Filter Bar */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-4 mb-8 shadow-sm">
          <div className="flex flex-wrap items-end gap-6">
            {/* Time Range */}
            <div className="flex flex-col gap-2">
              <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                Time Range
              </span>
              <Radio.Group
                defaultValue="month"
                buttonStyle="solid"
                className="custom-radio-group"
              >
                <Radio.Button value="day">Day</Radio.Button>
                <Radio.Button value="week">Week</Radio.Button>
                <Radio.Button value="month">Month</Radio.Button>
                <Radio.Button value="custom">Custom</Radio.Button>
              </Radio.Group>
            </div>

            {/* Market Filter */}
            <div className="flex flex-col gap-2 ">
              <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                Market
              </span>
              <Select
                defaultValue="all"
                className="w-full"
                options={[{ value: "all", label: "All Markets" }]}
              />
            </div>

            {/* Broker Filter */}
            <div className="flex flex-col gap-2 ">
              <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                Broker
              </span>
              <Select
                defaultValue="all"
                className="w-full"
                options={[{ value: "all", label: "All Brokers" }]}
              />
            </div>

            {/* Export Buttons */}
            <div className="flex gap-2 ml-auto">
              <Button icon={<FileTextOutlined />}>CSV</Button>
              <Button icon={<DownloadOutlined />}>PDF</Button>
            </div>
          </div>
        </div>

        {/* Tabs System */}
        <div className="reports-tabs-container">
          <Tabs
            activeKey={activeTab}
            onChange={setActiveTab}
            items={tabItems}
            className="custom-antd-tabs dark:text-white"
          />
        </div>
      </div>
    </div>
  );
}
