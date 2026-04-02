/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  useCreateSessionRecapMutation,
  useDeleteSessionRecapMutation,
  useGetAllSessionRecapQuery,
  useUpdateSessionRecapMutation,
} from "@/redux/features/journal/journalApi";
import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Checkbox, DatePicker, Input, message, Popconfirm } from "antd";
import dayjs from "dayjs";
import { useState } from "react";

interface SessionRecapFormData {
  recap_date: string;
  outcome: "good" | "neutral" | "bad";
  what_went_right: string[];
  what_slipped: string[];
  rule_to_focus: string;
}

interface SessionRecap {
  id: string;
  recap_date: string;
  session_state: "green" | "yellow" | "red";
  outcome: "good" | "neutral" | "bad";
  what_went_right: string[];
  what_slipped: string[];
  rule_to_focus: string;
  created_at: string;
  user: number;
}

export default function SessionRecap() {
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<SessionRecapFormData>({
    recap_date: dayjs().format("YYYY-MM-DD"),
    outcome: "good",
    what_went_right: [],
    what_slipped: [],
    rule_to_focus: "",
  });

  const { user } = useAppSelector((state: RootState) => state.auth);
  const sessionState = (user as any)?.session_state || "";

  // API hooks
  const [createSessionRecap, { isLoading: isCreating }] =
    useCreateSessionRecapMutation();
  const [updateSessionRecap, { isLoading: isUpdating }] =
    useUpdateSessionRecapMutation();
  const [deleteSessionRecap, { isLoading: isDeleting }] =
    useDeleteSessionRecapMutation();
  const {
    data: recapsData,
    isLoading: isLoadingRecaps,
    refetch,
  } = useGetAllSessionRecapQuery({
    page: 1,
    limit: 100,
  });

  const recaps = recapsData?.results || [];

  const whatWentRightOptions = [
    "Followed risk limits",
    "Emotional control",
    "Proper exits",
    "Good entries",
    "Stuck to plan",
    "Journaled",
  ];

  const whatSlippedOptions = [
    "Chased trades",
    "Late entry",
    "Early exit",
    "Oversized",
    "Ignored signals",
  ];

  const handleOutcomeChange = (outcome: "good" | "neutral" | "bad") => {
    setFormData((prev) => ({ ...prev, outcome }));
  };

  const handleWhatWentRightChange = (item: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      what_went_right: checked
        ? [...prev.what_went_right, item]
        : prev.what_went_right.filter((i) => i !== item),
    }));
  };

  const handleWhatSlippedChange = (item: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      what_slipped: checked
        ? [...prev.what_slipped, item]
        : prev.what_slipped.filter((i) => i !== item),
    }));
  };

  const handleEdit = (recap: SessionRecap) => {
    setIsEditing(true);
    setEditingId(recap.id);
    setFormData({
      recap_date: recap.recap_date,
      outcome: recap.outcome,
      what_went_right: recap.what_went_right || [],
      what_slipped: recap.what_slipped || [],
      rule_to_focus: recap.rule_to_focus || "",
    });
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteSessionRecap(id).unwrap();
      message.success("Session recap deleted successfully!");
      refetch();
    } catch (error: any) {
      message.error(error?.data?.message || "Failed to delete session recap");
      console.error("Failed to delete session recap:", error);
    }
  };

  const resetForm = () => {
    setIsEditing(false);
    setEditingId(null);
    setFormData({
      recap_date: dayjs().format("YYYY-MM-DD"),
      outcome: "good",
      what_went_right: [],
      what_slipped: [],
      rule_to_focus: "",
    });
  };

  const handleSubmit = async () => {
    // Validate required fields
    if (!formData.recap_date) {
      message.error("Please select a date");
      return;
    }

    if (!formData.outcome) {
      message.error("Please select session outcome");
      return;
    }

    const payload = {
      recap_date: formData.recap_date,
      session_state: sessionState, // Using session_state from user
      outcome: formData.outcome,
      what_went_right: formData.what_went_right,
      what_slipped: formData.what_slipped,
      rule_to_focus: formData.rule_to_focus,
    };

    try {
      if (isEditing && editingId) {
        await updateSessionRecap({ id: editingId, payload }).unwrap();
        message.success("Session recap updated successfully!");
      } else {
        await createSessionRecap(payload).unwrap();
        message.success("Session recap created successfully!");
      }
      resetForm();
      refetch();
    } catch (error: any) {
      // Handle error response dynamically
      if (error?.data?.non_field_errors) {
        message.error(error.data.non_field_errors[0]);
      } else if (error?.data?.recap_date) {
        message.error(error.data.recap_date[0]);
      } else if (error?.data?.session_state) {
        message.error(error.data.session_state[0]);
      } else if (error?.data?.outcome) {
        message.error(error.data.outcome[0]);
      } else if (error?.data?.message) {
        message.error(error.data.message);
      } else {
        message.error(
          isEditing
            ? "Failed to update session recap"
            : "Failed to create session recap",
        );
      }
      console.error("Failed to save session recap:", error);
    }
  };

  const isLoading = isCreating || isUpdating || isDeleting;

  const getSessionStateColor = (state: string) => {
    switch (state) {
      case "green":
        return "bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300";
      case "yellow":
        return "bg-yellow-100 dark:bg-yellow-900/50 text-yellow-700 dark:text-yellow-300";
      case "red":
        return "bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300";
      default:
        return "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300";
    }
  };

  const getOutcomeEmoji = (outcome: string) => {
    switch (outcome) {
      case "good":
        return "😊";
      case "neutral":
        return "😐";
      case "bad":
        return "🔴";
      default:
        return "";
    }
  };

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
        <span
          className={`px-3 py-1 rounded-lg text-xs font-bold uppercase ${getSessionStateColor(
            sessionState,
          )}`}
        >
          {sessionState}
        </span>
      </div>

      {/* Form Section */}
      <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          {isEditing ? "Edit Session Recap" : "New Session Recap"}
        </h3>

        {/* Recap Date */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Recap Date <span className="text-red-500">*</span>
          </label>
          <DatePicker
            size="large"
            className="w-full"
            value={dayjs(formData.recap_date)}
            onChange={(date) =>
              setFormData((prev) => ({
                ...prev,
                recap_date: date
                  ? date.format("YYYY-MM-DD")
                  : dayjs().format("YYYY-MM-DD"),
              }))
            }
            disabled={isLoading}
          />
        </div>

        {/* Session Outcome */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
            Session Outcome <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={() => handleOutcomeChange("good")}
              className={`px-4 py-2.5 rounded-lg font-medium transition-colors ${
                formData.outcome === "good"
                  ? "bg-green-500 text-white border-2 border-green-600"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-2 border-gray-300 dark:border-gray-600"
              }`}
              disabled={isLoading}
            >
              😊 Good
            </button>
            <button
              onClick={() => handleOutcomeChange("neutral")}
              className={`px-4 py-2.5 rounded-lg font-medium transition-colors ${
                formData.outcome === "neutral"
                  ? "bg-yellow-500 text-white border-2 border-yellow-600"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-2 border-gray-300 dark:border-gray-600"
              }`}
              disabled={isLoading}
            >
              😐 Neutral
            </button>
            <button
              onClick={() => handleOutcomeChange("bad")}
              className={`px-4 py-2.5 rounded-lg font-medium transition-colors ${
                formData.outcome === "bad"
                  ? "bg-red-500 text-white border-2 border-red-600"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-2 border-gray-300 dark:border-gray-600"
              }`}
              disabled={isLoading}
            >
              🔴 Bad
            </button>
          </div>
        </div>

        {/* What Went Right */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
            What Went Right
          </label>
          <div className="grid grid-cols-2 gap-3">
            {whatWentRightOptions.map((item) => (
              <label
                key={item}
                className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <Checkbox
                  checked={formData.what_went_right.includes(item)}
                  onChange={(e) =>
                    handleWhatWentRightChange(item, e.target.checked)
                  }
                  disabled={isLoading}
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {item}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* What Slipped */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
            What Slipped
          </label>
          <div className="grid grid-cols-2 gap-3">
            {whatSlippedOptions.map((item) => (
              <label
                key={item}
                className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <Checkbox
                  checked={formData.what_slipped.includes(item)}
                  onChange={(e) =>
                    handleWhatSlippedChange(item, e.target.checked)
                  }
                  disabled={isLoading}
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {item}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* One Rule to Focus on Tomorrow */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            One Rule to Focus on Tomorrow
          </label>
          <Input
            placeholder="What's the ONE thing you'll focus on?"
            size="large"
            value={formData.rule_to_focus}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                rule_to_focus: e.target.value,
              }))
            }
            disabled={isLoading}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3">
          {isEditing && (
            <button
              onClick={resetForm}
              className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              disabled={isLoading}
            >
              Cancel
            </button>
          )}
          <Button
            type="primary"
            size="large"
            onClick={handleSubmit}
            loading={isLoading}
            className="h-12! bg-blue-600! hover:bg-blue-700! dark:bg-blue-500! dark:hover:bg-blue-600! font-semibold!"
          >
            {isLoading
              ? isEditing
                ? "Updating..."
                : "Creating..."
              : isEditing
                ? "Update Session Recap"
                : "Save Session Recap"}
          </Button>
        </div>
      </div>

      {/* Recent Recaps */}
      <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
          Recent Recaps
        </h3>

        {isLoadingRecaps ? (
          <div className="text-center py-8">
            <p className="text-gray-500 dark:text-gray-400">
              Loading recaps...
            </p>
          </div>
        ) : recaps.length > 0 ? (
          <div className="space-y-2">
            {recaps.map((recap: SessionRecap) => (
              <div
                key={recap.id}
                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg border border-gray-200 dark:border-gray-700"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {recap.recap_date}
                    </span>
                    <span className="text-sm">
                      {getOutcomeEmoji(recap.outcome)}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded text-xs font-bold uppercase ${getSessionStateColor(
                        recap.session_state,
                      )}`}
                    >
                      {recap.session_state}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Focus: {recap.rule_to_focus || "No rule set"}
                  </p>
                  {recap.what_went_right.length > 0 && (
                    <div className="text-xs text-green-600 dark:text-green-400 mt-1">
                      ✓ {recap.what_went_right.join(", ")}
                    </div>
                  )}
                  {recap.what_slipped.length > 0 && (
                    <div className="text-xs text-red-600 dark:text-red-400">
                      ✗ {recap.what_slipped.join(", ")}
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleEdit(recap)}
                    className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors"
                    disabled={isLoading}
                  >
                    <EditOutlined className="text-gray-500 dark:text-gray-400" />
                  </button>
                  <Popconfirm
                    title="Delete Session Recap"
                    description="Are you sure you want to delete this session recap?"
                    onConfirm={() => handleDelete(recap.id)}
                    okText="Yes"
                    cancelText="No"
                    okButtonProps={{ loading: isDeleting }}
                  >
                    <button
                      className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors"
                      disabled={isLoading}
                    >
                      <DeleteOutlined className="text-red-500 dark:text-red-400" />
                    </button>
                  </Popconfirm>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 bg-gray-50 dark:bg-gray-900/30 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-700">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              No session recaps yet. Create your first recap above!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
