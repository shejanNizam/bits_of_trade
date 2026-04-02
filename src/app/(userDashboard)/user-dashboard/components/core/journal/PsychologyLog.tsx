/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  useCreatePsychologyLogMutation,
  useDeletePsychologyLogMutation,
  useGetAllPsychologyLogQuery,
  useUpdatePsychologyLogMutation,
} from "@/redux/features/journal/journalApi";
import { useGetTradeQuery } from "@/redux/features/utils/utilsApi";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, DatePicker, message, Popconfirm, Select, Slider } from "antd";
import dayjs from "dayjs";
import { useState } from "react";

const { Option } = Select;

interface PsychologyLogFormData {
  log_date: string;
  trade: string | null;
  emotional_state: string;
  confidence_before: number;
  satisfaction_after: number;
  pressure_source: string | null;
}

interface PsychologyLog {
  id: string;
  log_date: string;
  trade: string | null;
  emotional_state: string;
  confidence_before: number;
  satisfaction_after: number;
  pressure_source: string | null;
  created_at: string;
  user: number;
}

interface TradeOption {
  id: string;
  symbol: string;
}

export default function PsychologyLog() {
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<PsychologyLogFormData>({
    log_date: dayjs().format("YYYY-MM-DD"),
    trade: null,
    emotional_state: "",
    confidence_before: 5,
    satisfaction_after: 5,
    pressure_source: null,
  });

  // API hooks
  const [createPsychologyLog, { isLoading: isCreating }] =
    useCreatePsychologyLogMutation();
  const [updatePsychologyLog, { isLoading: isUpdating }] =
    useUpdatePsychologyLogMutation();
  const [deletePsychologyLog, { isLoading: isDeleting }] =
    useDeletePsychologyLogMutation();
  const {
    data: logsData,
    isLoading: isLoadingLogs,
    refetch,
  } = useGetAllPsychologyLogQuery({
    page: 1,
    limit: 100,
  });
  const { data: tradesData, isLoading: isLoadingTrades } = useGetTradeQuery({});

  const emotionalStates = [
    { value: "calm", label: "Calm", color: "green" },
    { value: "anxious", label: "Anxious", color: "yellow" },
    { value: "fomo", label: "FOMO", color: "orange" },
    { value: "angry", label: "Angry", color: "red" },
    { value: "overconfident", label: "Overconfident", color: "purple" },
    { value: "uncertain", label: "Uncertain", color: "gray" },
  ];

  const pressureSources = [
    { value: "money", label: "Money" },
    { value: "time", label: "Time" },
    { value: "missed_move", label: "Missed move" },
    { value: "anger", label: "Anger" },
    { value: "uncertainty", label: "Uncertainty" },
  ];

  const logs = logsData?.results || [];
  const trades = tradesData || [];

  const handleInputChange = (
    field: keyof PsychologyLogFormData,
    value: any,
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleEmotionalStateSelect = (state: string) => {
    setFormData((prev) => ({ ...prev, emotional_state: state }));
  };

  const handlePressureSourceSelect = (source: string) => {
    setFormData((prev) => ({ ...prev, pressure_source: source }));
  };

  const handleEdit = (log: PsychologyLog) => {
    setIsEditing(true);
    setEditingId(log.id);
    setFormData({
      log_date: log.log_date,
      trade: log.trade,
      emotional_state: log.emotional_state,
      confidence_before: log.confidence_before,
      satisfaction_after: log.satisfaction_after,
      pressure_source: log.pressure_source,
    });
  };

  const handleDelete = async (id: string) => {
    try {
      await deletePsychologyLog(id).unwrap();
      message.success("Psychology log deleted successfully!");
      refetch();
    } catch (error: any) {
      message.error(error?.data?.message || "Failed to delete psychology log");
      console.error("Failed to delete psychology log:", error);
    }
  };

  const resetForm = () => {
    setIsEditing(false);
    setEditingId(null);
    setFormData({
      log_date: dayjs().format("YYYY-MM-DD"),
      trade: null,
      emotional_state: "",
      confidence_before: 5,
      satisfaction_after: 5,
      pressure_source: null,
    });
  };

  const handleSubmit = async () => {
    // Validate required fields
    if (!formData.emotional_state) {
      message.error("Please select an emotional state");
      return;
    }

    if (
      !formData.confidence_before ||
      formData.confidence_before < 1 ||
      formData.confidence_before > 10
    ) {
      message.error("Confidence rating must be between 1 and 10");
      return;
    }

    if (
      !formData.satisfaction_after ||
      formData.satisfaction_after < 1 ||
      formData.satisfaction_after > 10
    ) {
      message.error("Satisfaction rating must be between 1 and 10");
      return;
    }

    const payload = {
      log_date: formData.log_date,
      trade: formData.trade || null,
      emotional_state: formData.emotional_state,
      confidence_before: formData.confidence_before,
      satisfaction_after: formData.satisfaction_after,
      pressure_source: formData.pressure_source || null,
    };

    try {
      if (isEditing && editingId) {
        await updatePsychologyLog({ id: editingId, payload }).unwrap();
        message.success("Psychology log updated successfully!");
      } else {
        await createPsychologyLog(payload).unwrap();
        message.success("Psychology log created successfully!");
      }
      resetForm();
      refetch();
    } catch (error: any) {
      message.error(
        error?.data?.message ||
          (isEditing
            ? "Failed to update psychology log"
            : "Failed to create psychology log"),
      );
      console.error("Failed to save psychology log:", error);
    }
  };

  const getEmotionalStateColor = (state: string) => {
    const found = emotionalStates.find((s) => s.value === state);
    return found?.color || "gray";
  };

  const getTradeSymbol = (tradeId: string | null) => {
    if (!tradeId) return "No Trade Linked";
    const trade = trades.find((t: TradeOption) => t.id === tradeId);
    return trade?.symbol || "Unknown Symbol";
  };

  const getPressureSourceLabel = (source: string | null) => {
    if (!source) return "None";
    const found = pressureSources.find((s) => s.value === source);
    return found?.label || source;
  };

  const isLoading = isCreating || isUpdating || isDeleting;

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

      {/* Form Section */}
      <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          {isEditing ? "Edit Psychology Log" : "New Psychology Log"}
        </h3>

        {/* Log Date */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Log Date <span className="text-red-500">*</span>
          </label>
          <DatePicker
            size="large"
            className="w-full"
            value={dayjs(formData.log_date)}
            onChange={(date) =>
              handleInputChange(
                "log_date",
                date ? date.format("YYYY-MM-DD") : dayjs().format("YYYY-MM-DD"),
              )
            }
            disabled={isLoading}
          />
        </div>

        {/* Emotional State */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
            Emotional State <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-3 gap-2">
            {emotionalStates.map((state) => (
              <button
                key={state.value}
                onClick={() => handleEmotionalStateSelect(state.value)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  formData.emotional_state === state.value
                    ? `bg-${state.color}-500 text-white border-2 border-${state.color}-600`
                    : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-2 border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
                disabled={isLoading}
              >
                {state.label}
              </button>
            ))}
          </div>
        </div>

        {/* Confidence Before Trade */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Confidence Before Trade (1-10){" "}
              <span className="text-red-500">*</span>
            </label>
            <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
              {formData.confidence_before}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-500 dark:text-gray-400 min-w-8">
              Low
            </span>
            <Slider
              value={formData.confidence_before}
              onChange={(value) =>
                handleInputChange("confidence_before", value)
              }
              min={1}
              max={10}
              className="flex-1"
              disabled={isLoading}
            />
            <span className="text-xs text-gray-500 dark:text-gray-400 min-w-8 text-right">
              High
            </span>
          </div>
        </div>

        {/* Satisfaction After Trade */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Satisfaction After Trade (1-10){" "}
              <span className="text-red-500">*</span>
            </label>
            <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
              {formData.satisfaction_after}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-500 dark:text-gray-400 min-w-8">
              Low
            </span>
            <Slider
              value={formData.satisfaction_after}
              onChange={(value) =>
                handleInputChange("satisfaction_after", value)
              }
              min={1}
              max={10}
              className="flex-1"
              disabled={isLoading}
            />
            <span className="text-xs text-gray-500 dark:text-gray-400 min-w-8 text-right">
              High
            </span>
          </div>
        </div>

        {/* Pressure Source */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
            Pressure Source
          </label>
          <div className="grid grid-cols-3 gap-3">
            {pressureSources.map((source) => (
              <button
                key={source.value}
                onClick={() => handlePressureSourceSelect(source.value)}
                className={`px-4 py-2.5 rounded-lg font-medium transition-colors ${
                  formData.pressure_source === source.value
                    ? "bg-green-500 dark:bg-green-600 text-white border-2 border-green-600 dark:border-green-500"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-2 border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
                disabled={isLoading}
              >
                {source.label}
              </button>
            ))}
          </div>
        </div>

        {/* Link to Trades */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Link to Trades
          </label>
          <Select
            size="large"
            className="w-full"
            placeholder="Search trades to link..."
            value={formData.trade}
            onChange={(value) => handleInputChange("trade", value)}
            loading={isLoadingTrades}
            disabled={isLoading}
            showSearch
            optionFilterProp="children"
            allowClear
          >
            {trades.map((trade: TradeOption) => (
              <Option key={trade.id} value={trade.id}>
                {trade.symbol}
              </Option>
            ))}
          </Select>
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
                ? "Update Psychology Log"
                : "Save Psychology Log"}
          </Button>
        </div>
      </div>

      {/* Previous Logs */}
      <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
          Previous Logs
        </h3>

        {isLoadingLogs ? (
          <div className="text-center py-8">
            <p className="text-gray-500 dark:text-gray-400">Loading logs...</p>
          </div>
        ) : logs.length > 0 ? (
          <div className="space-y-2">
            {logs.map((log: PsychologyLog) => (
              <div
                key={log.id}
                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-center gap-3 flex-1">
                  <span className="text-sm font-medium text-gray-900 dark:text-gray-100 min-w-25">
                    {log.log_date}
                  </span>
                  <span
                    className={`px-2 py-1 rounded text-xs font-bold uppercase ${
                      getEmotionalStateColor(log.emotional_state) === "green"
                        ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"
                        : getEmotionalStateColor(log.emotional_state) ===
                            "yellow"
                          ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300"
                          : getEmotionalStateColor(log.emotional_state) ===
                              "orange"
                            ? "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300"
                            : getEmotionalStateColor(log.emotional_state) ===
                                "red"
                              ? "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300"
                              : getEmotionalStateColor(log.emotional_state) ===
                                  "purple"
                                ? "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300"
                                : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    {log.emotional_state.toUpperCase()}
                  </span>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Confidence: {log.confidence_before}/10 • Satisfaction:{" "}
                    {log.satisfaction_after}/10 • Pressure:{" "}
                    {getPressureSourceLabel(log.pressure_source)}
                  </div>
                  <div className="text-xs text-gray-400 dark:text-gray-500">
                    Trade: {getTradeSymbol(log.trade)}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleEdit(log)}
                    className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors"
                    disabled={isLoading}
                  >
                    <EditOutlined className="text-gray-500 dark:text-gray-400" />
                  </button>
                  <Popconfirm
                    title="Delete Psychology Log"
                    description="Are you sure you want to delete this psychology log?"
                    onConfirm={() => handleDelete(log.id)}
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
              No psychology logs yet. Create your first log above!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
