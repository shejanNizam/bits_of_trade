"use client";

import { Tabs } from "antd";
import { useState } from "react";
import { IoAddOutline } from "react-icons/io5";
import CreateNewEntryModal from "../components/core/journal/CreateNewEntryModal";
import DailyJournal from "../components/core/journal/DailyJournal";
import JournalStreak from "../components/core/journal/JournalStreak";
import LearningNotes from "../components/core/journal/LearningNotes";
import Mistakes from "../components/core/journal/Mistakes";
import PsychologyLog from "../components/core/journal/PsychologyLog";
import RecentEntries from "../components/core/journal/RecentEntries";
import SessionRecap from "../components/core/journal/SessionRecap";
import TradeNotes from "../components/core/journal/TradeNotes";

export default function JournalPage() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("daily-journal");

  const tabs = [
    {
      key: "daily-journal",
      label: "Daily Journal",
      children: <DailyJournal />,
    },
    {
      key: "trade-notes",
      label: "Trade Notes",
      children: <TradeNotes />,
    },
    {
      key: "psychology-log",
      label: "Psychology Log",
      children: <PsychologyLog />,
    },
    {
      key: "mistakes",
      label: "Mistakes",
      children: <Mistakes />,
    },
    {
      key: "session-recap",
      label: "Session Recap",
      children: <SessionRecap />,
    },
    {
      key: "learning-notes",
      label: "Learning Notes",
      children: <LearningNotes />,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="w-full mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              Journal
            </h1>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
              One honest review per day beats 20 random trades.
            </p>
          </div>

          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors font-semibold text-sm"
          >
            <IoAddOutline className="text-lg" />
            <span>New Entry</span>
          </button>
        </div>

        {/* Prompt Banner */}
        <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 rounded-xl p-4 mb-6">
          <p className="text-sm text-gray-700 dark:text-gray-300">
            <span className="font-semibold">
              {"Today's"} Prompt (GREEN Session):
            </span>{" "}
            What went well in your process today?
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[70%_30%] gap-6">
          {/* Left Side - Tabs */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
            <Tabs
              activeKey={activeTab}
              onChange={setActiveTab}
              items={tabs}
              className="journal-tabs"
            />
          </div>

          {/* Right Side - Streak & Recent Entries */}
          <div className="space-y-6">
            <JournalStreak />
            <RecentEntries />
          </div>
        </div>

        {/* Modals */}
        <CreateNewEntryModal
          open={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
        />
      </div>
    </div>
  );
}
