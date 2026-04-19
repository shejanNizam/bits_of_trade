/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import {
  useCreateMistakeMutation,
  useUpdateMistakeMutation,
} from "@/redux/features/mistake/mistakeApi";
import { ErrorSwal, SuccessSwal } from "@/utils/allSwal";
import { Input, Modal, Select, Slider, message } from "antd";
import { useEffect, useState } from "react";
import { FaRegCheckCircle } from "react-icons/fa";
import { IoCloseOutline, IoWarningOutline } from "react-icons/io5";
import { RxCrossCircled } from "react-icons/rx";

interface Mistake {
  id: string;
  mistake_name: string;
  category: string;
  mistake_mode: string;
  description: string;
  severity_weight: number;
}

interface Props {
  open: boolean;
  onCancel: () => void;
  editData?: Mistake | null;
}

export default function AddMistakeModal({ open, onCancel, editData }: Props) {
  const [severity, setSeverity] = useState<number>(5);
  const [mistakeName, setMistakeName] = useState("");
  const [category, setCategory] = useState("");
  const [mistakeMode, setMistakeMode] = useState("");
  const [description, setDescription] = useState("");
  const [createMistake, { isLoading: isCreating }] = useCreateMistakeMutation();
  const [updateMistake, { isLoading: isUpdating }] = useUpdateMistakeMutation();

  const isLoading = isCreating || isUpdating;
  const isEdit = !!editData;

  // Reset form when modal opens/closes or editData changes
  useEffect(() => {
    if (open) {
      if (editData) {
        setMistakeName(editData.mistake_name);
        setCategory(editData.category);
        setMistakeMode(editData.mistake_mode);
        setDescription(editData.description || "");
        setSeverity(editData.severity_weight);
      } else {
        setMistakeName("");
        setCategory("");
        setMistakeMode("");
        setDescription("");
        setSeverity(5);
      }
    }
  }, [open, editData]);

  // Dynamic severity text based on value
  const getSeverityText = (val: number) => {
    if (val <= 3)
      return "Low: This mistake has minimal impact on your performance.";
    if (val <= 7)
      return "Moderate: This mistake needs attention and improvement.";
    return "Critical: This mistake is severely impacting your edge.";
  };

  const handleSubmit = async () => {
    // Validation
    if (!mistakeName.trim()) {
      message.error("Please enter a mistake name");
      return;
    }
    if (!category.trim()) {
      message.error("Please select a category");
      return;
    }

    const payload = {
      mistake_name: mistakeName,
      category: category,
      mistake_mode: mistakeMode,
      description: description,
      severity_weight: severity,
    };

    try {
      if (isEdit && editData?.id) {
        // Update existing mistake
        await updateMistake({
          id: editData.id,
          payload,
        }).unwrap();
        SuccessSwal({
          title: "Success!",
          text: "Mistake updated successfully!",
        });
      } else {
        // Create new mistake
        await createMistake(payload).unwrap();
        SuccessSwal({
          title: "Success!",
          text: "Mistake added successfully!",
        });
      }
      onCancel();
    } catch (error: any) {
      console.error("Failed to save mistake:", error);
      ErrorSwal({
        title: "Error!",
        text:
          error?.data?.message || "Failed to save mistake. Please try again.",
      });
    }
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
            {isEdit ? "Edit Mistake" : "Add Custom Mistake"}
          </h2>
        </div>
      }
    >
      <div className="p-5 sm:p-6 transition-colors">
        <div className="space-y-6">
          {/* Mistake Name */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
              Mistake Name <span className="text-red-500">*</span>
            </label>
            <Input
              placeholder="e.g., Chasing Losses"
              className="dark-input h-11"
              value={mistakeName}
              onChange={(e) => setMistakeName(e.target.value)}
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
              value={category || undefined}
              onChange={setCategory}
              options={[
                { value: "psychology", label: "Psychology" },
                { value: "execution", label: "Execution" },
                { value: "risk", label: "Risk Management" },
                { value: "process", label: "Process" },
              ]}
            />
          </div>

          {/* Category Preview Tag */}
          <div className="bg-gray-50/50 dark:bg-gray-900/30 p-4 rounded-xl border border-gray-100 dark:border-gray-800 mb-2">
            <p className="text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">
              Category Preview
            </p>
            <div className="inline-flex items-center px-3 py-1.5 rounded-md bg-gray-200 dark:bg-slate-800 text-gray-600 dark:text-gray-400 text-xs font-semibold">
              {category ? category.toUpperCase() : "Select a category"}
            </div>
          </div>
        </div>

        {/* Mistake Mode */}
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
            Mistake Mode
          </label>
          <Select
            placeholder="Select Mistake Mode"
            className="w-full dark-select h-11"
            value={mistakeMode || undefined}
            onChange={setMistakeMode}
            options={[
              { value: "overtrading", label: "Overtrading" },
              { value: "revenge_trading", label: "Revenge Trading" },
              { value: "fomo", label: "FOMO" },
              { value: "early_exit", label: "Early Exit" },
              { value: "ignored_stop_loss", label: "Ignored Stop Loss" },
              { value: "late_exit", label: "Late Exit" },
              { value: "no_plan", label: "No Plan" },
              { value: "oversized_position", label: "Oversized Position" },
            ]}
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-semibold my-2 text-gray-700 dark:text-gray-300">
            Description
          </label>
          <Input.TextArea
            placeholder="What does this mistake look like? When do you make it?"
            rows={4}
            className="dark-input bg-transparent!"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* Severity Weight Slider Section */}
        <div className="bg-gray-50/50 dark:bg-gray-900/30 my-2 p-4 rounded-xl border border-gray-100 dark:border-gray-800">
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
            type="button"
            onClick={handleSubmit}
            disabled={isLoading}
            className={`flex-1 h-11 rounded-lg font-semibold bg-orange-500 text-white hover:bg-orange-600 flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20 order-1 sm:order-2 active:scale-95 transition-all ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <FaRegCheckCircle className="text-lg" />
            {isLoading
              ? isEdit
                ? "Updating..."
                : "Adding..."
              : isEdit
                ? "Update Mistake"
                : "Add Mistake"}
          </button>
        </div>
      </div>
    </Modal>
  );
}
