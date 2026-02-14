"use client";

import { Col, Input, Modal, Row, Select } from "antd";
import React, { useState } from "react";
import { FaRegCheckCircle } from "react-icons/fa";
import { HiOutlineLightBulb } from "react-icons/hi";
import { IoAddOutline, IoCloseOutline } from "react-icons/io5";
import { MdOutlineLock, MdOutlinePublic } from "react-icons/md";

type VisibilityType = "private" | "community";

interface CreateStrategyModalProps {
  open: boolean;
  onCancel: () => void;
}

interface RuleSectionProps {
  title: string;
  rules: string[];
  colorClass: string;
  onAdd: () => void;
  onRemove: (index: number) => void;
  onRuleChange: (index: number, value: string) => void;
}

export default function CreateStrategyModal({
  open,
  onCancel,
}: CreateStrategyModalProps) {
  // Explicitly typed states
  const [entryRules, setEntryRules] = useState<string[]>(["", ""]);
  const [exitRules, setExitRules] = useState<string[]>([""]);
  const [riskRules, setRiskRules] = useState<string[]>(["", ""]);
  const [visibility, setVisibility] = useState<VisibilityType>("private");

  // Helper to update specific rule in an array
  const handleRuleChange = (
    setter: React.Dispatch<React.SetStateAction<string[]>>,
    index: number,
    value: string,
  ) => {
    setter((prev) => {
      const newRules = [...prev];
      newRules[index] = value;
      return newRules;
    });
  };

  const addRule = (setter: React.Dispatch<React.SetStateAction<string[]>>) => {
    setter((prev) => [...prev, ""]);
  };

  const removeRule = (
    index: number,
    setter: React.Dispatch<React.SetStateAction<string[]>>,
  ) => {
    setter((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <Modal
      open={open}
      onCancel={onCancel}
      footer={null}
      width={650}
      centered
      closeIcon={
        <IoCloseOutline className="text-xl text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors" />
      }
      title={
        <div className="flex items-center gap-2 p-4 border-b border-gray-100 dark:border-gray-800 rounded-t-xl">
          <HiOutlineLightBulb className="text-teal-500 dark:text-teal-400 text-xl" />
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">
            Create New Strategy
          </h2>
        </div>
      }
    >
      <div className=" p-5 max-h-[85vh] overflow-y-auto custom-scrollbar transition-colors">
        {/* Section Header */}
        <div className="mb-4">
          <h4 className="text-[11px] font-bold text-teal-600 dark:text-teal-400 uppercase tracking-widest">
            Basic Information
          </h4>
        </div>

        <div className="space-y-5">
          {/* Strategy Name & Segment */}
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12}>
              <label className="block text-xs font-medium mb-1.5 text-gray-600 dark:text-gray-300">
                Strategy Name *
              </label>
              <Input
                placeholder="e.g., Momentum Breakout"
                className="dark-input h-10"
              />
            </Col>
            <Col xs={24} sm={12}>
              <label className="block text-xs font-medium mb-1.5 text-gray-600 dark:text-gray-300">
                Segment *
              </label>
              <Select
                defaultValue="Select Segment"
                className="w-full dark-select h-10"
                options={[
                  { value: "stocks", label: "Stocks" },
                  { value: "options", label: "Options" },
                  { value: "forex", label: "Forex" },
                ]}
              />
            </Col>
          </Row>

          {/* Timeframe & Sample Size */}
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12}>
              <label className="block text-xs font-medium mb-1.5 text-gray-600 dark:text-gray-300">
                Timeframe
              </label>
              <Select
                defaultValue="Select Timeframe"
                className="w-full dark-select h-10"
                options={[
                  { value: "5m", label: "5 Minutes" },
                  { value: "15m", label: "15 Minutes" },
                  { value: "1h", label: "1 Hour" },
                  { value: "1d", label: "Daily" },
                ]}
              />
            </Col>
            <Col xs={24} sm={12}>
              <label className="block text-xs font-medium mb-1.5 text-gray-600 dark:text-gray-300">
                Min Sample Size
              </label>
              <Input
                defaultValue="30"
                type="number"
                className="dark-input h-10"
              />
            </Col>
          </Row>

          {/* Summary */}
          <div>
            <label className="block text-xs font-medium mb-1.5 text-gray-600 dark:text-gray-300">
              Strategy Summary *
            </label>
            <Input.TextArea
              placeholder="Brief description of what this strategy does..."
              rows={3}
              className="dark-input bg-transparent!"
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-xs font-medium mb-1.5 text-gray-600 dark:text-gray-300">
              Setup Tags (comma separated)
            </label>
            <Input
              placeholder="e.g., breakout, volume, momentum"
              className="dark-input h-10"
            />
          </div>

          {/* Dynamic Rules Sections */}
          <RuleSection
            title="Entry Rules"
            rules={entryRules}
            colorClass="border-emerald-500/20 dark:border-emerald-500/30 text-emerald-600 dark:text-emerald-500"
            onAdd={() => addRule(setEntryRules)}
            onRemove={(i) => removeRule(i, setEntryRules)}
            onRuleChange={(i, v) => handleRuleChange(setEntryRules, i, v)}
          />

          <RuleSection
            title="Exit Rules"
            rules={exitRules}
            colorClass="border-rose-500/20 dark:border-rose-500/30 text-rose-600 dark:text-rose-500"
            onAdd={() => addRule(setExitRules)}
            onRemove={(i) => removeRule(i, setExitRules)}
            onRuleChange={(i, v) => handleRuleChange(setExitRules, i, v)}
          />

          <RuleSection
            title="Risk Management Rules"
            rules={riskRules}
            colorClass="border-amber-500/20 dark:border-amber-500/30 text-amber-600 dark:text-amber-500"
            onAdd={() => addRule(setRiskRules)}
            onRemove={(i) => removeRule(i, setRiskRules)}
            onRuleChange={(i, v) => handleRuleChange(setRiskRules, i, v)}
          />

          {/* Visibility Toggle */}
          <div className="pt-2">
            <label className="block text-xs font-medium mb-2 text-gray-600 dark:text-gray-300">
              Visibility
            </label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setVisibility("private")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-all border ${
                  visibility === "private"
                    ? "bg-slate-100 dark:bg-slate-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
                    : "text-gray-500 border-transparent hover:bg-gray-50 dark:hover:bg-gray-800/50"
                }`}
              >
                <MdOutlineLock /> Private
              </button>
              <button
                type="button"
                onClick={() => setVisibility("community")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-all border ${
                  visibility === "community"
                    ? "bg-slate-100 dark:bg-slate-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
                    : "text-gray-500 border-transparent hover:bg-gray-50 dark:hover:bg-gray-800/50"
                }`}
              >
                <MdOutlinePublic /> Share with Community
              </button>
            </div>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-8 mt-6 border-t border-gray-100 dark:border-gray-800">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 h-11 rounded-lg font-semibold bg-gray-100 dark:bg-slate-900 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-800 transition-all order-2 sm:order-1"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 h-11 rounded-lg font-semibold bg-teal-500 text-white hover:bg-teal-600 flex items-center justify-center gap-2 shadow-lg shadow-teal-500/20 order-1 sm:order-2 active:scale-95 transition-all"
          >
            <FaRegCheckCircle className="text-lg" /> Create Strategy
          </button>
        </div>
      </div>
    </Modal>
  );
}

function RuleSection({
  title,
  rules,
  colorClass,
  onAdd,
  onRemove,
  onRuleChange,
}: RuleSectionProps) {
  const colorParts = colorClass.split(" ");
  const borderCol = colorParts[0];
  const textCol = colorParts[1];

  return (
    <div
      className={`p-4 border rounded-xl ${borderCol} bg-gray-50/30 dark:bg-gray-900/10`}
    >
      <div className="flex justify-between items-center mb-3">
        <h5 className={`text-xs font-bold ${textCol}`}>{title}</h5>
        <button
          type="button"
          onClick={onAdd}
          className="flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded bg-gray-200/50 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-300/50 dark:hover:bg-gray-700 transition-all"
        >
          <IoAddOutline /> Add Rule
        </button>
      </div>
      <div className="space-y-2">
        {rules.map((rule, index) => (
          <div key={index} className="flex gap-2 items-center">
            <Input
              value={rule}
              onChange={(e) => onRuleChange(index, e.target.value)}
              placeholder={`${title.slice(0, -1)} ${index + 1}...`}
              className="dark-input text-xs h-9"
            />
            <button
              type="button"
              onClick={() => onRemove(index)}
              className="p-1.5 text-gray-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-md transition-all shrink-0"
              title="Remove Rule"
            >
              <IoCloseOutline className="text-lg" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
