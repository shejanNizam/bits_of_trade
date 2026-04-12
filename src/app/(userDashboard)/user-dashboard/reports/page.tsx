"use client";

import { Tabs } from "antd";
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
