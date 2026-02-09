"use client";

import { Col, Input, Modal, Row, Select } from "antd";
import { useEffect, useState } from "react";
import { FiAlertTriangle } from "react-icons/fi";
import { HiOutlinePlusSm } from "react-icons/hi";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import { RuleCardProps } from "./RuleCard";

interface AddRuleModalProps {
  open: boolean;
  onCancel: () => void;
  initialData?: RuleCardProps | null;
}

export default function AddRuleModal({
  open,
  onCancel,
  initialData,
}: AddRuleModalProps) {
  const isEdit = !!initialData;
  const [ruleType, setRuleType] = useState<"Hard" | "Soft">("Hard");

  // Sync state if initialData is provided
  useEffect(() => {
    if (initialData?.type) {
      setRuleType(initialData.type as "Hard" | "Soft");
    }
  }, [initialData]);

  return (
    <Modal
      title={
        <div className="flex items-center gap-2 pt-2">
          <IoShieldCheckmarkOutline className="text-teal-400 text-xl" />
          <h2 className="text-lg font-bold text-white">
            {isEdit ? "Edit Rule" : "Add Custom Rule"}
          </h2>
        </div>
      }
      open={open}
      onCancel={onCancel}
      footer={null}
      width={500}
      centered
      className="dark-modal"
      closeIcon={<span className="text-gray-500">×</span>}
    >
      <div className="py-4 space-y-5">
        {/* Rule Title */}
        <div>
          <label className="block text-xs font-semibold mb-1.5 text-zinc-300">
            Rule Title <span className="text-red-500">*</span>
          </label>
          <Input
            placeholder="e.g., Max Position Size Limit"
            defaultValue={initialData?.title}
            className="h-10 rounded bg-[#1a1f2e] border-[#2d3343] text-white placeholder:text-gray-600 hover:border-[#3d4455] focus:border-teal-500"
          />
        </div>

        {/* Category and Rule Type */}
        <Row gutter={16}>
          <Col span={12}>
            <label className="block text-xs font-semibold mb-1.5 text-zinc-300">
              Category <span className="text-red-500">*</span>
            </label>
            <Select
              placeholder="Select Category"
              className="w-full custom-select"
              defaultValue={initialData?.category}
              options={[{ value: "risk", label: "Risk Management" }]}
            />
          </Col>
          <Col span={12}>
            <label className="block text-xs font-semibold mb-1.5 text-zinc-300">
              Rule Type
            </label>
            <div className="flex p-1 rounded border">
              <button
                onClick={() => setRuleType("Hard")}
                className={`flex-1 py-1.5 text-xs font-bold rounded transition-all ${
                  ruleType === "Hard"
                    ? "bg-[#3e2329] text-[#ff4d4f]"
                    : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                Hard
              </button>
              <button
                onClick={() => setRuleType("Soft")}
                className={`flex-1 py-1.5 text-xs font-bold rounded transition-all ${
                  ruleType === "Soft"
                    ? "bg-[#3a301a] text-[#ffc53d]"
                    : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                Soft
              </button>
            </div>
          </Col>
        </Row>

        {/* Description */}
        <div>
          <label className="block text-xs font-semibold mb-1.5 text-zinc-300">
            Description <span className="text-red-500">*</span>
          </label>
          <Input.TextArea
            placeholder="What does this rule protect against?"
            defaultValue={initialData?.desc}
            rows={3}
            className="rounded bg-[#1a1f2e] border-[#2d3343] text-white placeholder:text-gray-600 hover:border-[#3d4455] focus:border-teal-500"
          />
        </div>

        {/* Thresholds */}
        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label className="text-xs font-semibold text-zinc-300">
              Thresholds (Optional)
            </label>
            <button className="flex items-center gap-1 px-2 py-1 text-[10px] bg-[#1a1f2e] border border-[#2d3343] text-zinc-300 rounded hover:bg-[#2d3343]">
              <HiOutlinePlusSm /> Add
            </button>
          </div>
          <div className="flex gap-2">
            <Input
              placeholder="e.g., maxTrades"
              className="flex-3 h-9 bg-[#1a1f2e] border-[#2d3343] text-white rounded"
            />
            <Input
              placeholder="Value"
              className="flex-1 h-9 bg-[#1a1f2e] border-[#2d3343] text-white rounded"
            />
          </div>
          <p className="text-[10px] text-zinc-500 mt-1.5">
            Define numeric thresholds that trigger this rule
          </p>
        </div>

        {/* Dynamic Footer Alert */}
        <div
          className={`flex items-start gap-2 p-3 rounded border text-[11px] leading-relaxed transition-colors duration-300 ${
            ruleType === "Hard"
              ? "bg-red/10 text-[#ff7875]"
              : "bg-yellow-300/10 text-[#ffd666]"
          }`}
        >
          {ruleType === "Hard" ? (
            <div className="w-3.5 h-3.5 bg-red-500 text-white rounded-full flex items-center justify-center shrink-0 text-[10px] font-bold">
              -
            </div>
          ) : (
            <FiAlertTriangle className="text-sm shrink-0" />
          )}
          <p>
            {ruleType === "Hard"
              ? "Hard rules completely block trading when triggered. Use for critical safety limits."
              : "Soft rules show warnings and may require acknowledgment. Use for guidance limits."}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-2">
          <button
            onClick={onCancel}
            className="px-6 py-2 rounded text-sm font-semibold text-zinc-400 hover:bg-[#2d3343] transition-colors"
          >
            Cancel
          </button>
          <button className="px-6 py-2 rounded bg-[#00d1b2] hover:bg-[#00b89c] text-[#0a0f1d] font-bold text-sm flex items-center gap-2 transition-colors">
            {isEdit ? (
              "Update Rule"
            ) : (
              <>
                <IoShieldCheckmarkOutline className="text-lg" />
                Create Rule
              </>
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
}
