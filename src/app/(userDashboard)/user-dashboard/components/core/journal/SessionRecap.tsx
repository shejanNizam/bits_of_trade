import { Button, Checkbox, Input } from "antd";
import { useState } from "react";

// const { TextArea } = Input;

export default function SessionRecap() {
  const [outcome, setOutcome] = useState<"good" | "neutral" | "bad">("good");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-1">
            Session Recap
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            End-of-day session intelligence
          </p>
        </div>
        <span className="px-3 py-1 bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300 rounded-lg text-xs font-bold uppercase">
          RED
        </span>
      </div>

      {/* Session Outcome */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
          Session Outcome
        </label>
        <div className="grid grid-cols-3 gap-3">
          <button
            onClick={() => setOutcome("good")}
            className={`px-4 py-2.5 rounded-lg font-medium transition-colors ${
              outcome === "good"
                ? "bg-green-500 text-white border-2 border-green-600"
                : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-2 border-gray-300 dark:border-gray-600"
            }`}
          >
            😊 Good
          </button>
          <button
            onClick={() => setOutcome("neutral")}
            className={`px-4 py-2.5 rounded-lg font-medium transition-colors ${
              outcome === "neutral"
                ? "bg-yellow-500 text-white border-2 border-yellow-600"
                : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-2 border-gray-300 dark:border-gray-600"
            }`}
          >
            😐 Neutral
          </button>
          <button
            onClick={() => setOutcome("bad")}
            className={`px-4 py-2.5 rounded-lg font-medium transition-colors ${
              outcome === "bad"
                ? "bg-red-500 text-white border-2 border-red-600"
                : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-2 border-gray-300 dark:border-gray-600"
            }`}
          >
            🔴 Bad
          </button>
        </div>
      </div>

      {/* What Went Right */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
          What Went Right
        </label>
        <div className="grid grid-cols-2 gap-3">
          {[
            "Followed risk limits",
            "Emotional control",
            "Proper exits",
            "Good entries",
            "Stuck to plan",
            "Journaled",
          ].map((item) => (
            <label
              key={item}
              className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <Checkbox />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                {item}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* What Slipped */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
          What Slipped
        </label>
        <div className="grid grid-cols-2 gap-3">
          {[
            "Chased trades",
            "Late entry",
            "Early exit",
            "Oversized",
            "Ignored signals",
          ].map((item) => (
            <label
              key={item}
              className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <Checkbox />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                {item}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* One Rule to Focus on Tomorrow */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          One Rule to Focus on Tomorrow
        </label>
        <Input
          placeholder="What's the ONE thing you'll focus on?"
          size="large"
        />
      </div>

      {/* Save Button */}
      <Button
        type="primary"
        size="large"
        block
        className="h-12 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 font-semibold"
      >
        Save Session Recap
      </Button>

      {/* Recent Recaps */}
      <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
          Recent Recaps
        </h3>
        <div className="space-y-2">
          {[
            {
              date: "2025-01-07",
              focus: "Wait for full confirmation before entry",
              tag: "YELLOW",
            },
            {
              date: "2025-01-06",
              focus: "Mixed session. Need better emotional control.",
              tag: "YELLOW",
            },
          ].map((recap, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg border border-gray-200 dark:border-gray-700"
            >
              <div className="flex-1">
                <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {recap.date}
                </span>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                  Focus: {recap.focus}
                </p>
              </div>
              <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 rounded text-xs font-bold uppercase">
                {recap.tag}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
