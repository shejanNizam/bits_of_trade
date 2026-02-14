"use client";

import { Input, Modal, Select, Slider } from "antd";
import { useState } from "react";
import { FaRegCheckCircle } from "react-icons/fa";
import { IoCloseOutline, IoWarningOutline } from "react-icons/io5";
import { RxCrossCircled } from "react-icons/rx"; // Matching header icon

interface Props {
  open: boolean;
  onCancel: () => void;
}

export default function AddMistakeModal({ open, onCancel }: Props) {
  const [severity, setSeverity] = useState<number>(5);

  // Dynamic severity text based on value
  const getSeverityText = (val: number) => {
    if (val <= 3)
      return "Low: This mistake has minimal impact on your performance.";
    if (val <= 7)
      return "Moderate: This mistake needs attention and improvement.";
    return "Critical: This mistake is severely impacting your edge.";
  };

  return (
    <Modal
      open={open}
      onCancel={onCancel}
      footer={null}
      width={500}
      centered
      closeIcon={
        <IoCloseOutline className="text-2xl text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors" />
      }
      title={
        <div className="flex items-center gap-2 p-4 border-b border-gray-100 dark:border-gray-800 rounded-t-xl">
          <RxCrossCircled className="text-orange-500 text-xl" />
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">
            Add Custom Mistake
          </h2>
        </div>
      }
    >
      <div className=" p-5 sm:p-6 transition-colors">
        <div className="space-y-6">
          {/* Mistake Name */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
              Mistake Name <span className="text-red-500">*</span>
            </label>
            <Input
              placeholder="e.g., Chasing Losses"
              className="dark-input h-11"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
              Category <span className="text-red-500">*</span>
            </label>
            <Select
              placeholder="Select Category"
              className="w-full dark-select h-11"
              options={[
                { value: "psychology", label: "Psychology" },
                { value: "execution", label: "Execution" },
                { value: "risk", label: "Risk Management" },
              ]}
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
              Description
            </label>
            <Input.TextArea
              placeholder="What does this mistake look like? When do you make it?"
              rows={4}
              className="dark-input bg-transparent!"
            />
          </div>

          {/* Severity Weight Slider Section */}
          <div className="bg-gray-50/50 dark:bg-gray-900/30 p-4 rounded-xl border border-gray-100 dark:border-gray-800">
            <div className="flex justify-between items-center mb-6">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Severity Weight
              </label>
              <span className="bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-500 text-xs font-bold px-2 py-1 rounded">
                {severity}/10
              </span>
            </div>

            <Slider
              min={1}
              max={10}
              value={severity}
              onChange={(val) => setSeverity(val)}
              tooltip={{ open: false }}
              className="custom-severity-slider"
            />

            <div className="flex justify-between text-[10px] font-medium text-gray-400 dark:text-gray-500 px-1 mt-1">
              <span>Low (1)</span>
              <span>Medium (5)</span>
              <span>High (10)</span>
            </div>

            <div className="mt-4 flex items-start gap-2">
              <IoWarningOutline className="text-amber-500 text-lg shrink-0 mt-0.5" />
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                {getSeverityText(severity)}
              </p>
            </div>
          </div>

          {/* Category Preview Tag */}
          <div className="bg-gray-50/50 dark:bg-gray-900/30 p-4 rounded-xl border border-gray-100 dark:border-gray-800">
            <p className="text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">
              Category Preview
            </p>
            <div className="inline-flex items-center px-3 py-1.5 rounded-md bg-gray-200 dark:bg-slate-800 text-gray-600 dark:text-gray-400 text-xs font-semibold">
              Select a category
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-col sm:flex-row gap-3 pt-8 mt-4 border-t border-gray-100 dark:border-gray-800">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 h-11 rounded-lg font-semibold bg-gray-100 dark:bg-slate-900 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-800 transition-all order-2 sm:order-1"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 h-11 rounded-lg font-semibold bg-orange-500 text-white hover:bg-orange-600 flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20 order-1 sm:order-2 active:scale-95 transition-all"
          >
            <FaRegCheckCircle className="text-lg" /> Add Mistake
          </button>
        </div>
      </div>
    </Modal>
  );
}
