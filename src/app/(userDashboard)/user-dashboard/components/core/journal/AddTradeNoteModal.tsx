/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  useCreateAddNoteMutation,
  useUpdateAddNoteMutation,
} from "@/redux/features/journal/journalApi";
import { DatePicker, Input, Modal, TimePicker, message } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";

const { TextArea } = Input;

interface AddTradeNoteModalProps {
  open: boolean;
  onClose: () => void;
  editingNote?: any;
}

interface TradeNoteFormData {
  trade_type: "win" | "loss" | null;
  symbol: string | null;
  trade_date: string | null;
  trade_time: string | null;
  pnl_amount: string | null;
  description: string;
  tags: string[];
}

export default function AddTradeNoteModal({
  open,
  onClose,
  editingNote,
}: AddTradeNoteModalProps) {
  const [createAddNote, { isLoading: isCreating }] = useCreateAddNoteMutation();
  const [updateAddNote, { isLoading: isUpdating }] = useUpdateAddNoteMutation();

  const [formData, setFormData] = useState<TradeNoteFormData>({
    trade_type: "win",
    symbol: null,
    trade_date: null,
    trade_time: null,
    pnl_amount: null,
    description: "",
    tags: [],
  });
  const [tagsInput, setTagsInput] = useState("");

  // Load editing note data
  useEffect(() => {
    if (editingNote) {
      setFormData({
        trade_type: editingNote.trade_type,
        symbol: editingNote.symbol,
        trade_date: editingNote.trade_date,
        trade_time: editingNote.trade_time,
        pnl_amount: editingNote.pnl_amount,
        description: editingNote.description || "",
        tags: editingNote.tags || [],
      });
      setTagsInput((editingNote.tags || []).join(", "));
    } else {
      // Reset form for new note
      setFormData({
        trade_type: "win",
        symbol: null,
        trade_date: null,
        trade_time: null,
        pnl_amount: null,
        description: "",
        tags: [],
      });
      setTagsInput("");
    }
  }, [editingNote, open]);

  const handleTradeTypeChange = (type: "win" | "loss") => {
    setFormData((prev) => ({ ...prev, trade_type: type }));
  };

  const handleInputChange = (field: keyof TradeNoteFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTagsInput(value);
    const tags = value
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag !== "");
    setFormData((prev) => ({ ...prev, tags }));
  };

  const handleSubmit = async () => {
    // Validate required fields
    if (!formData.trade_type) {
      message.error("Please select trade type");
      return;
    }

    const payload = {
      trade_type: formData.trade_type,
      symbol: formData.symbol || null,
      trade_date: formData.trade_date || null,
      trade_time: formData.trade_time || null,
      pnl_amount: formData.pnl_amount || null,
      description: formData.description || "",
      tags: formData.tags,
    };

    try {
      if (editingNote) {
        // Update existing note
        await updateAddNote({
          id: editingNote.id,
          payload,
        }).unwrap();
        message.success("Trade note updated successfully!");
      } else {
        // Create new note
        await createAddNote(payload).unwrap();
        message.success("Trade note created successfully!");
      }
      onClose();
    } catch (error: any) {
      message.error(
        error?.data?.message ||
          (editingNote
            ? "Failed to update trade note"
            : "Failed to create trade note"),
      );
      console.error("Failed to save trade note:", error);
    }
  };

  const isLoading = isCreating || isUpdating;

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      width={650}
      closeIcon={<IoCloseOutline className="text-xl" />}
      title={
        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
          {editingNote ? "Edit Trade Note" : "Add Trade Note"}
        </h3>
      }
    >
      <div className="space-y-5 py-4">
        {/* Trade Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Trade Type <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => handleTradeTypeChange("win")}
              className={`px-4 py-2.5 rounded-lg font-medium transition-colors ${
                formData.trade_type === "win"
                  ? "bg-green-500 text-white border-2 border-green-600"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-2 border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
              disabled={isLoading}
            >
              Win
            </button>
            <button
              onClick={() => handleTradeTypeChange("loss")}
              className={`px-4 py-2.5 rounded-lg font-medium transition-colors ${
                formData.trade_type === "loss"
                  ? "bg-red-500 text-white border-2 border-red-600"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-2 border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
              disabled={isLoading}
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
          <Input
            placeholder="e.g., RELIANCE, NIFTY 25000 CE"
            size="large"
            value={formData.symbol || ""}
            onChange={(e) =>
              handleInputChange("symbol", e.target.value || null)
            }
            disabled={isLoading}
          />
        </div>

        {/* Date & Time */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Date
            </label>
            <DatePicker
              size="large"
              className="w-full"
              value={formData.trade_date ? dayjs(formData.trade_date) : null}
              onChange={(date) =>
                handleInputChange(
                  "trade_date",
                  date ? date.format("YYYY-MM-DD") : null,
                )
              }
              disabled={isLoading}
            />
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
              value={
                formData.trade_time
                  ? dayjs(`2000-01-01T${formData.trade_time}`)
                  : null
              }
              onChange={(time) =>
                handleInputChange(
                  "trade_time",
                  time ? time.format("HH:mm:ss") : null,
                )
              }
              disabled={isLoading}
            />
          </div>
        </div>

        {/* P&L Amount */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            P&L Amount
          </label>
          <Input
            placeholder={formData.trade_type === "win" ? "+₹1,637" : "-₹3,625"}
            size="large"
            value={formData.pnl_amount || ""}
            onChange={(e) =>
              handleInputChange("pnl_amount", e.target.value || null)
            }
            disabled={isLoading}
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Description
          </label>
          <TextArea
            placeholder="What happened during this trade? What was your thought process?"
            rows={4}
            value={formData.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
            disabled={isLoading}
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
            value={tagsInput}
            onChange={handleTagsChange}
            disabled={isLoading}
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
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading
              ? editingNote
                ? "Updating..."
                : "Creating..."
              : editingNote
                ? "Update Trade Note"
                : "Save Trade Note"}
          </button>
        </div>
      </div>
    </Modal>
  );
}
