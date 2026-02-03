"use client";

import { useState } from "react";
import { IoAddOutline } from "react-icons/io5";
import AddLearningNoteModal from "./AddLearningNoteModal";
// import AddLearningNoteModal from "./AddLearningNoteModal";

export default function LearningNotes() {
  const [isAddNoteModalOpen, setIsAddNoteModalOpen] = useState(false);

  const notes = [
    {
      date: "2025-01-07",
      title:
        "Felt pressure during the second trade when NIFTY started moving against me.",
      tags: ["TR0001", "TR0002"],
      color: "orange",
    },
    {
      date: "2025-01-06",
      title: "Followed my plan perfectly. Waited for all confirmations.",
      tags: ["TR0003"],
      color: "green",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-1">
            Learning Notes
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Close the learning loop
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

      {/* Positive Streaks */}
      <div>
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
          Positive Streaks
        </h3>
        <div className="space-y-3">
          {notes.map((note, index) => (
            <div
              key={index}
              className="border-l-4 pl-4 py-2"
              style={{
                borderColor: note.color === "orange" ? "#f59e0b" : "#10b981",
              }}
            >
              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">
                {note.date}
              </p>
              <p className="text-sm text-gray-900 dark:text-gray-100 mb-2">
                {note.title}
              </p>
              <div className="flex flex-wrap gap-2">
                {note.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <AddLearningNoteModal
        open={isAddNoteModalOpen}
        onClose={() => setIsAddNoteModalOpen(false)}
      />
    </div>
  );
}
