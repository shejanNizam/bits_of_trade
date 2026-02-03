"use client";

import { Tag } from "antd";
import { useState } from "react";
import { IoAddOutline } from "react-icons/io5";
import AddTradeNoteModal from "./AddTradeNoteModal";

export default function TradeNotes() {
  const [isAddNoteModalOpen, setIsAddNoteModalOpen] = useState(false);

  const notes = [
    {
      type: "Win",
      symbol: "RELIANCE",
      date: "2025-01-07",
      time: "14:30 AM",
      pnl: "+₹1,637",
      description: "Clean breakout setup. Volume confirmed. Followed the plan.",
      tags: ["Momentum Breakout", "#breakout", "#high-volume"],
    },
    {
      type: "Loss",
      symbol: "NIFTY 25000 CE",
      date: "2025-01-07",
      time: "02:15 PM",
      pnl: "-₹3,625",
      description: "Entered without waiting for confirmation. Got impatient.",
      tags: ["Option Momentum", "#FOMO", "#impatient"],
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-1">
            Trade Notes
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Per-trade narrative and analysis
          </p>
        </div>
        <button
          onClick={() => setIsAddNoteModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 dark:bg-green-500 text-white rounded-lg hover:bg-green-700 dark:hover:bg-green-600 transition-colors font-medium text-sm"
        >
          <IoAddOutline className="text-lg" />
          <span>Add Note</span>
        </button>
      </div>

      {/* Notes List */}
      <div className="space-y-4">
        {notes.map((note, index) => (
          <div
            key={index}
            className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-4 border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <Tag
                  color={note.type === "Win" ? "green" : "red"}
                  className="text-xs font-bold"
                >
                  {note.type}
                </Tag>
                <div>
                  <h3 className="text-base font-bold text-gray-900 dark:text-gray-100">
                    {note.symbol}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {note.date} • {note.time}
                  </p>
                </div>
              </div>
              <span
                className={`text-base font-bold ${
                  note.type === "Win"
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-600 dark:text-red-400"
                }`}
              >
                {note.pnl}
              </span>
            </div>

            <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
              {note.description}
            </p>

            <div className="flex flex-wrap gap-2">
              {note.tags.map((tag, tagIndex) => (
                <span
                  key={tagIndex}
                  className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded text-xs font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      <div className="text-center py-8 bg-gray-50 dark:bg-gray-900/30 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-700">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Add a new trade note to track your execution and thought process
        </p>
      </div>

      <AddTradeNoteModal
        open={isAddNoteModalOpen}
        onClose={() => setIsAddNoteModalOpen(false)}
      />
    </div>
  );
}
