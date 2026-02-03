"use client";

import { Input, Modal, Select, Slider, Tabs } from "antd";
import { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { MdCloudUpload } from "react-icons/md";

interface AddTradeModalProps {
  open: boolean;
  onClose: () => void;
}

export default function AddTradeModal({ open, onClose }: AddTradeModalProps) {
  const [activeTab, setActiveTab] = useState("general");

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      width={650}
      closeIcon={<IoCloseOutline className="text-xl" />}
      title={
        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
          Add New Trade
        </h3>
      }
    >
      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        items={[
          {
            key: "general",
            label: "General",
            children: <GeneralTab />,
          },
          {
            key: "psychology",
            label: "Psychology",
            children: <PsychologyTab />,
          },
        ]}
      />
    </Modal>
  );
}

function GeneralTab() {
  return (
    <div className="space-y-5 py-4">
      {/* Market Type & Symbol */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Market Type*
          </label>
          <Select
            placeholder="RELIANCE, NIFTY, 55-GE..."
            className="w-full"
            size="large"
            options={[
              { value: "indian-stocks", label: "Indian Stocks" },
              { value: "forex", label: "Forex" },
              { value: "crypto", label: "Crypto" },
            ]}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Symbol*
          </label>
          <Input placeholder="Symbol" size="large" />
        </div>
      </div>

      {/* Entry Details */}
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Entry Price (₹)*
          </label>
          <Input placeholder="0.00" size="large" type="number" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Title*
          </label>
          <Input placeholder="e.g. Lot 1" size="large" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Quantity*
          </label>
          <Input placeholder="0" size="large" type="number" />
        </div>
      </div>

      {/* Exit Details */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Exit Price*
          </label>
          <Input placeholder="0.00" size="large" type="number" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Fees (₹)*
          </label>
          <Input placeholder="0.00" size="large" type="number" />
        </div>
      </div>

      {/* Direction & Profit */}
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Direction*
          </label>
          <Select
            placeholder="Long/Short"
            className="w-full"
            size="large"
            options={[
              { value: "long", label: "Long" },
              { value: "short", label: "Short" },
            ]}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Total Amount (₹)
          </label>
          <Input placeholder="Auto calculated" size="large" disabled />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Entry Date*
          </label>
          <Input type="date" size="large" />
        </div>
      </div>

      {/* Leverage */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Leverage
        </label>
        <Input placeholder="1x" size="large" />
      </div>

      {/* Strategy, Stop Loss, Target */}
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Stop Loss
          </label>
          <Input placeholder="0.00" size="large" type="number" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Target
          </label>
          <Input placeholder="0.00" size="large" type="number" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Strategy*
          </label>
          <Input placeholder="Strategy" size="large" />
        </div>
      </div>

      {/* Trade Analysis */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Trade Analysis (Screenshot)
        </label>
        <Input.TextArea
          placeholder="Why did you take this trade? What was your analysis?"
          rows={3}
        />
      </div>

      {/* Rules and Limits */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Rules and Limits Followed
        </label>
        <Select
          mode="multiple"
          placeholder="Select or add rules..."
          className="w-full"
          size="large"
        />
      </div>

      {/* Trade Screenshots */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Trade Screenshots
        </label>
        <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center hover:border-blue-500 dark:hover:border-blue-400 transition-colors cursor-pointer">
          <MdCloudUpload className="text-4xl text-gray-400 dark:text-gray-500 mx-auto mb-3" />
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
            Click to upload or drag and drop
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-500">
            PNG, JPG or GIF (max. 10 MB)
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
        <button className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
          Reset
        </button>
        <button className="px-6 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors">
          Save Trade
        </button>
      </div>
    </div>
  );
}

function PsychologyTab() {
  const [entryConfidence, setEntryConfidence] = useState(50);
  const [satisfaction, setSatisfaction] = useState(50);

  const violationModes = [
    "Standard Mode",
    "Overtrading",
    "Exited Too Late",
    "Entered Too Late",
    "Exited Too Early",
    "FOMO Entry",
    "No Clear Entry",
  ];

  return (
    <div className="space-y-5 py-4">
      {/* Entry Confidence */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          Entry Confidence (Level 1-10)
        </label>
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-blue-600 dark:text-blue-400 min-w-12">
            Low
          </span>
          <Slider
            value={entryConfidence}
            onChange={setEntryConfidence}
            className="flex-1"
            marks={{
              0: "",
              25: "",
              50: "Medium",
              75: "",
              100: "",
            }}
          />
          <span className="text-sm font-medium text-blue-600 dark:text-blue-400 min-w-12 text-right">
            High
          </span>
        </div>
      </div>

      {/* Satisfaction Rating */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          Satisfaction Rating (1-10)
        </label>
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-blue-600 dark:text-blue-400 min-w-12">
            Not Satisfied
          </span>
          <Slider
            value={satisfaction}
            onChange={setSatisfaction}
            className="flex-1"
            marks={{
              0: "",
              25: "",
              50: "Average",
              75: "",
              100: "",
            }}
          />
          <span className="text-sm font-medium text-blue-600 dark:text-blue-400 min-w-12 text-right">
            Satisfied
          </span>
        </div>
      </div>

      {/* Emotional State During Trade */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Emotional State During Trade
        </label>
        <Select
          placeholder="Select your emotional state..."
          className="w-full"
          size="large"
          mode="multiple"
          options={[
            { value: "calm", label: "Calm" },
            { value: "anxious", label: "Anxious" },
            { value: "confident", label: "Confident" },
            { value: "fearful", label: "Fearful" },
            { value: "greedy", label: "Greedy" },
            { value: "impatient", label: "Impatient" },
          ]}
        />
      </div>

      {/* Violation Modes */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          Violation Modes
        </label>
        <div className="grid grid-cols-2 gap-2">
          {violationModes.map((mode) => (
            <button
              key={mode}
              className="px-3 py-2 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-left"
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      {/* Lessons Learned */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Lessons Learned
        </label>
        <Input.TextArea
          placeholder="What did you learn from this trade?"
          rows={4}
        />
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
        <button className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
          Reset
        </button>
        <button className="px-6 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors">
          Save Trade
        </button>
      </div>
    </div>
  );
}
