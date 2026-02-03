import { Button, Input, Slider } from "antd";
import { useState } from "react";

export default function PsychologyLog() {
  const [confidence, setConfidence] = useState(5);
  const [satisfaction, setSatisfaction] = useState(5);

  const emotionalStates = [
    "Calm",
    "Anxious",
    "FOMO",
    "Angry",
    "Overconfident",
    "Uncertain",
  ];

  const pressureSources = [
    "Money",
    "Time",
    "Missed move",
    "Angry",
    "Overconfident",
    "Uncertain",
  ];
  const [selectedPressure, setSelectedPressure] = useState("Time");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-1">
          Psychology Log
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Capture emotions separately from performance
        </p>
      </div>

      {/* Emotional State */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
          Emotional State
        </label>
        <div className="grid grid-cols-3 gap-2">
          {emotionalStates.map((state) => (
            <button
              key={state}
              className="px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              {state}
            </button>
          ))}
        </div>
      </div>

      {/* Confidence Before Trade */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            Confidence Before Trade (1-10)
          </label>
          <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
            {confidence}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-500 dark:text-gray-400 min-w-8">
            Low
          </span>
          <Slider
            value={confidence}
            onChange={setConfidence}
            min={1}
            max={10}
            className="flex-1"
          />
          <span className="text-xs text-gray-500 dark:text-gray-400 min-w-8 text-right">
            High
          </span>
        </div>
      </div>

      {/* Satisfaction After Trade */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            Satisfaction After Trade (1-10)
          </label>
          <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
            {satisfaction}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-500 dark:text-gray-400 min-w-8">
            Low
          </span>
          <Slider
            value={satisfaction}
            onChange={setSatisfaction}
            min={1}
            max={10}
            className="flex-1"
          />
          <span className="text-xs text-gray-500 dark:text-gray-400 min-w-8 text-right">
            High
          </span>
        </div>
      </div>

      {/* Pressure Source */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
          Pressure Source
        </label>
        <div className="grid grid-cols-3 gap-3">
          {pressureSources.map((source) => (
            <button
              key={source}
              onClick={() => setSelectedPressure(source)}
              className={`px-4 py-2.5 rounded-lg font-medium transition-colors ${
                selectedPressure === source
                  ? "bg-green-500 dark:bg-green-600 text-white border-2 border-green-600 dark:border-green-500"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-2 border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              {source}
            </button>
          ))}
        </div>
      </div>

      {/* Link to Trades */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Link to Trades
        </label>
        <Input placeholder="Search trades to link..." size="large" />
      </div>

      {/* Save Button */}
      <Button
        type="primary"
        size="large"
        block
        className="h-12! bg-blue-600! hover:bg-blue-700! dark:bg-blue-500! dark:hover:bg-blue-600! font-semibold!"
      >
        Save Psychology Log
      </Button>

      {/* Previous Logs */}
      <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
          Previous Logs
        </h3>
        <div className="space-y-2">
          {[
            {
              date: "2025-01-07",
              tag: "FOMO",
              confidence: 8,
              satisfaction: 3,
              pressure: "Missed move",
            },
          ].map((log, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {log.date}
                </span>
                <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 rounded text-xs font-bold uppercase">
                  {log.tag}
                </span>
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Confidence: {log.confidence}/10 • Satisfaction:{" "}
                {log.satisfaction}/10 • Pressure: {log.pressure}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
