"use client";

import { DatePicker, Input, Modal, TimePicker } from "antd";
import { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";

const { TextArea } = Input;

interface AddTradeNoteModalProps {
  open: boolean;
  onClose: () => void;
}

export default function AddTradeNoteModal({
  open,
  onClose,
}: AddTradeNoteModalProps) {
  const [tradeType, setTradeType] = useState<"Win" | "Loss">("Win");

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      width={650}
      closeIcon={<IoCloseOutline className="text-xl" />}
      title={
        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
          Add Trade Note
        </h3>
      }
    >
      <div className="space-y-5 py-4">
        {/* Trade Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Trade Type
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setTradeType("Win")}
              className={`px-4 py-2.5 rounded-lg font-medium transition-colors ${
                tradeType === "Win"
                  ? "bg-green-500 text-white border-2 border-green-600"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-2 border-gray-300 dark:border-gray-600"
              }`}
            >
              Win
            </button>
            <button
              onClick={() => setTradeType("Loss")}
              className={`px-4 py-2.5 rounded-lg font-medium transition-colors ${
                tradeType === "Loss"
                  ? "bg-red-500 text-white border-2 border-red-600"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-2 border-gray-300 dark:border-gray-600"
              }`}
            >
              Loss
            </button>
          </div>
        </div>

        {/* Symbol */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Symbol
          </label>
          <Input placeholder="e.g., RELIANCE, NIFTY 25000 CE" size="large" />
        </div>

        {/* Date & Time */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Date
            </label>
            <DatePicker size="large" className="w-full" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Time
            </label>
            <TimePicker
              size="large"
              className="w-full"
              use12Hours
              format="h:mm A"
            />
          </div>
        </div>

        {/* P&L Amount */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            P&L Amount
          </label>
          <Input placeholder="e.g., +₹1,637 or -₹3,625" size="large" />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Description
          </label>
          <TextArea
            placeholder="What happened during this trade? What was your thought process?"
            rows={4}
          />
        </div>

        {/* Tags */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Tags
          </label>
          <Input
            placeholder="Comma separated: Momentum Breakout, #breakout, #high-volume"
            size="large"
          />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Separate tags with commas. Use # for hashtags.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button className="px-6 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors">
            Save Trade Note
          </button>
        </div>
      </div>
    </Modal>
  );
}
