"use client";

import { Input, Modal, Select, Slider } from "antd";
import { useMemo, useState } from "react";
import { MdClose, MdRefresh } from "react-icons/md";

export interface FilterState {
  direction: string;
  outcome: string;
  instrument: string;
  strategy: string;
  emotionalState: string;
  disciplineStatus: string;
  reviewStatus: string;
  ruleBreaches: string;
  plRange: [number, number];
  mistakes: string[];
  tags: string;
}

interface AdvancedFiltersModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: FilterState, count: number) => void;
}

const MISTAKES: string[] = [
  "FOMO Entry",
  "Revenge Trading",
  "Oversized Position",
  "Premature Exit",
  "Ignored Stop Loss",
  "Overtrading",
];

const DEFAULT_FILTERS: FilterState = {
  direction: "All Directions",
  outcome: "All Outcomes",
  instrument: "All Instruments",
  strategy: "All Strategies",
  emotionalState: "All States",
  disciplineStatus: "All Trades",
  reviewStatus: "All Statuses",
  ruleBreaches: "All Trades",
  plRange: [-10000, 10000],
  mistakes: [],
  tags: "",
};

export default function AdvancedFiltersModal({
  isOpen,
  onClose,
  onApply,
}: AdvancedFiltersModalProps) {
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);

  const activeCount = useMemo(() => {
    let count = 0;
    if (filters.direction !== "All Directions") count++;
    if (filters.outcome !== "All Outcomes") count++;
    if (filters.instrument !== "All Instruments") count++;
    if (filters.strategy !== "All Strategies") count++;
    if (filters.emotionalState !== "All States") count++;
    if (filters.disciplineStatus !== "All Trades") count++;
    if (filters.reviewStatus !== "All Statuses") count++;
    if (filters.ruleBreaches !== "All Trades") count++;
    if (filters.plRange[0] !== -10000 || filters.plRange[1] !== 10000) count++;
    if (filters.mistakes.length > 0) count++;
    if (filters.tags !== "") count++;
    return count;
  }, [filters]);

  const updateFilter = <K extends keyof FilterState>(
    key: K,
    value: FilterState[K],
  ): void => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleToggleMistake = (mistake: string): void => {
    const newMistakes = filters.mistakes.includes(mistake)
      ? filters.mistakes.filter((m) => m !== mistake)
      : [...filters.mistakes, mistake];
    updateFilter("mistakes", newMistakes);
  };

  // Strictly type the keys used for the Select fields
  type SelectKeys =
    | "direction"
    | "outcome"
    | "instrument"
    | "strategy"
    | "emotionalState"
    | "disciplineStatus"
    | "reviewStatus"
    | "ruleBreaches";

  const selectFields: { label: string; key: SelectKeys; options: string[] }[] =
    [
      {
        label: "Direction",
        key: "direction",
        options: ["All Directions", "Long Only", "Short Only"],
      },
      {
        label: "Outcome",
        key: "outcome",
        options: ["All Outcomes", "Wins Only", "Losses Only"],
      },
      {
        label: "Instrument Type",
        key: "instrument",
        options: ["All Instruments", "F&O (Options/Futures)", "Equities"],
      },
      {
        label: "Strategy",
        key: "strategy",
        options: ["All Strategies", "Breakout", "Scalping"],
      },
      {
        label: "Emotional State",
        key: "emotionalState",
        options: ["All States", "Calm", "Anxious", "Neutral"],
      },
      {
        label: "Discipline Status",
        key: "disciplineStatus",
        options: ["All Trades", "Disciplined", "Undisciplined"],
      },
      {
        label: "Review Status",
        key: "reviewStatus",
        options: ["All Statuses", "Reviewed", "Pending"],
      },
      {
        label: "Rule Breaches",
        key: "ruleBreaches",
        options: ["All Trades", "No Breaches", "Has Breaches"],
      },
    ];

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={null}
      closeIcon={<MdClose className="text-xl dark:text-gray-400" />}
      width={750}
      centered
      title={
        <div className="flex items-center gap-3">
          <span className="text-lg font-semibold dark:text-white">
            Advanced Filters
          </span>
          {activeCount > 0 && (
            <span className="bg-teal-500/20 text-teal-500 text-[11px] px-2 py-0.5 rounded-md font-bold">
              {activeCount} active
            </span>
          )}
        </div>
      }
    >
      <div className="mt-6 space-y-6 overflow-y-auto max-h-[80vh] pr-2 custom-scrollbar">
        {/* 8 Select Fields Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          {selectFields.map((field) => (
            <div key={field.key} className="space-y-1.5">
              <label className="text-[13px] font-medium text-gray-500 dark:text-gray-400">
                {field.label}
              </label>
              <Select
                className="w-full"
                value={filters[field.key]}
                onChange={(val: string) => updateFilter(field.key, val)}
                options={field.options.map((opt) => ({
                  label: opt,
                  value: opt,
                }))}
              />
            </div>
          ))}
        </div>

        {/* P&L Range Slider */}
        <div className="p-5 bg-gray-50 dark:bg-[#111827] rounded-xl border border-gray-100 dark:border-gray-800">
          <div className="flex justify-between items-center mb-4">
            <span className="text-[13px] font-medium dark:text-gray-300">
              P&L Range
            </span>
            <span className="text-sm font-bold text-teal-500">
              ₹{filters.plRange[0].toLocaleString()} to ₹
              {filters.plRange[1].toLocaleString()}
            </span>
          </div>
          <Slider
            range
            min={-10000}
            max={10000}
            step={100}
            value={filters.plRange}
            onChange={(val: number[]) =>
              updateFilter("plRange", val as [number, number])
            }
            // Fix: In range mode, trackStyle and handleStyle expect an array of CSSProperties
            trackStyle={[{ backgroundColor: "#2DD4BF" }]}
            handleStyle={[
              { borderColor: "#2DD4BF", backgroundColor: "#2DD4BF" },
              { borderColor: "#2DD4BF", backgroundColor: "#2DD4BF" },
            ]}
          />
        </div>

        {/* Mistake Tags */}
        <div className="space-y-3">
          <label className="text-[13px] font-medium text-gray-500 dark:text-gray-400">
            Filter by Mistakes
          </label>
          <div className="flex flex-wrap gap-2">
            {MISTAKES.map((mistake) => {
              const isActive = filters.mistakes.includes(mistake);
              return (
                <button
                  key={mistake}
                  onClick={() => handleToggleMistake(mistake)}
                  className={`px-3 py-1.5 rounded-md text-[12px] font-medium border transition-all ${
                    isActive
                      ? "bg-red-500/10 border-red-500/50 text-red-500"
                      : "bg-gray-100 dark:bg-gray-800 border-transparent text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`}
                >
                  {mistake}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tags Search */}
        <div className="space-y-1.5">
          <label className="text-[13px] font-medium text-gray-500 dark:text-gray-400">
            Search by Tags
          </label>
          <Input
            placeholder="e.g., breakout, scalp..."
            value={filters.tags}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              updateFilter("tags", e.target.value)
            }
            className="dark:bg-gray-800 dark:border-gray-700 h-11"
          />
        </div>

        {/* Modal Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-6 border-t border-gray-100 dark:border-gray-800 gap-4">
          <button
            onClick={() => setFilters(DEFAULT_FILTERS)}
            className="flex items-center gap-2 px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-all dark:text-gray-300"
          >
            <MdRefresh className="text-lg" /> Reset All
          </button>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="flex-1 sm:flex-none px-6 py-2 text-sm font-medium text-gray-500"
            >
              Cancel
            </button>
            <button
              onClick={() => onApply(filters, activeCount)}
              className="flex-1 sm:flex-none px-8 py-2.5 bg-teal-500 hover:bg-teal-600 text-white rounded-lg font-semibold transition-all shadow-lg shadow-teal-500/20"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
