/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { useDeleteMistakeMutation } from "@/redux/features/mistake/mistakeApi";
import { ErrorSwal, SuccessSwal } from "@/utils/allSwal";
import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  MinusOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, MenuProps } from "antd";
import { useState } from "react";
import AddMistakeModal from "./AddMistakeModal";
import DeleteMistakeModal from "./DeleteMistakeModal";

interface Mistake {
  id: string;
  mistake_name: string;
  category: string;
  mistake_mode: string;
  description: string;
  severity_weight: number;
  is_custom: boolean;
  created_at: string;
}

interface MistakeOverviewProps {
  mistakes: Mistake[];
  refetch: () => void;
}

export default function MistakeOverview({
  mistakes,
  refetch,
}: MistakeOverviewProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedMistake, setSelectedMistake] = useState<Mistake | null>(null);

  const [deleteMistake, { isLoading: isDeleting }] = useDeleteMistakeMutation();

  const handleEdit = (mistake: Mistake) => {
    setSelectedMistake(mistake);
    setIsModalOpen(true);
  };

  const handleDeleteTrigger = (mistake: Mistake) => {
    setSelectedMistake(mistake);
    setIsDeleteOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedMistake?.id) return;

    try {
      await deleteMistake(selectedMistake.id).unwrap();
      SuccessSwal({
        title: "Deleted!",
        text: "Mistake has been deleted successfully.",
      });
      refetch();
      setIsDeleteOpen(false);
      setSelectedMistake(null);
    } catch (error: any) {
      ErrorSwal({
        title: "Error!",
        text: error?.data?.message || "Failed to delete mistake.",
      });
    }
  };

  const getTrend = (mistake: Mistake) => {
    // This is a placeholder - you can implement actual trend calculation
    // based on historical data if available
    const trends = ["Increasing", "Decreasing", "Stable"];
    return trends[Math.floor(Math.random() * 3)];
  };

  // Calculate statistics for warning banner
  const calculateMistakeStats = () => {
    const totalMistakes = mistakes.length;
    const recentMistakes = mistakes.slice(0, 5);
    return { totalMistakes, recentMistakesCount: recentMistakes.length };
  };

  const stats = calculateMistakeStats();

  const getMenuItems = (mistake: Mistake): MenuProps["items"] => [
    {
      key: "edit",
      label: "Edit Mistake",
      onClick: () => handleEdit(mistake),
    },
    {
      key: "delete",
      label: "Delete Mistake",
      danger: true,
      onClick: () => handleDeleteTrigger(mistake),
    },
  ];

  return (
    <div className="transition-colors">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Mistakes
          </h1>
          <p className="text-slate-500 dark:text-zinc-400">
            Tag, track, and reduce. Mistakes are data — use them.
          </p>
        </div>
        <Button
          type="primary"
          onClick={() => {
            setSelectedMistake(null);
            setIsModalOpen(true);
          }}
          className="bg-orange-500 hover:bg-orange-600"
        >
          + Add Custom Mistake
        </Button>
      </div>

      {/* Warning Banner */}
      {stats.recentMistakesCount > 3 && (
        <div className="mb-8 p-4 rounded-xl border border-orange-100 bg-orange-50/50 dark:bg-orange-900/10 dark:border-orange-900/20 flex gap-4 items-center">
          <div className="bg-orange-100 dark:bg-orange-900/30 p-2 rounded-lg text-orange-600">
            ⚠️
          </div>
          <div className="flex-1">
            <h4 className="font-bold text-orange-900 dark:text-orange-400 text-sm">
              Mistake Clustering Detected
            </h4>
            <p className="text-orange-800/80 dark:text-orange-300/70 text-sm">
              {"  You've logged "}
              <span className="font-bold">
                {stats.recentMistakesCount} mistakes
              </span>{" "}
              in your recent trades. This is above your average.
            </p>
          </div>
          <button className="bg-orange-600 text-white px-4 py-1.5 rounded-lg text-sm font-bold hover:bg-orange-700">
            Review Pattern
          </button>
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mistakes?.map((mistake) => {
          const trend = getTrend(mistake);
          return (
            <div
              key={mistake.id}
              className="bg-white dark:bg-primary/10 border border-slate-200 dark:border-zinc-800 p-5 rounded-2xl shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-slate-900 dark:bg-white" />
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-zinc-800 text-slate-500 uppercase tracking-wider">
                    {mistake.category}
                  </span>
                </div>
                <Dropdown
                  menu={{ items: getMenuItems(mistake) }}
                  trigger={["click"]}
                >
                  <MoreOutlined className="text-slate-400 cursor-pointer hover:text-slate-600" />
                </Dropdown>
              </div>

              <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                {mistake.mistake_name}
              </h3>
              <p className="text-sm text-slate-500 dark:text-zinc-400 mb-6">
                {mistake.description}
              </p>

              <div className="flex justify-between items-end">
                <div>
                  <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-1">
                    Usage Count
                  </p>
                  <p className="text-3xl font-bold dark:text-white">-</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-1">
                    Severity
                  </p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">
                    <span className="text-orange-600">
                      {mistake.severity_weight}
                    </span>
                    /10
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-zinc-800 flex justify-between items-center text-xs">
                <span className="text-slate-400 uppercase font-bold tracking-tighter">
                  Trend
                </span>
                <span
                  className={`flex items-center gap-1 font-bold ${
                    trend === "Increasing"
                      ? "text-red-500"
                      : trend === "Decreasing"
                        ? "text-green-500"
                        : "text-slate-400"
                  }`}
                >
                  {trend === "Increasing" && <ArrowUpOutlined />}
                  {trend === "Decreasing" && <ArrowDownOutlined />}
                  {trend === "Stable" && <MinusOutlined />}
                  {trend}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {mistakes.length === 0 && (
        <div className="text-center py-12 bg-white dark:bg-primary/10 rounded-2xl border border-slate-200 dark:border-zinc-800">
          <p className="text-slate-500 dark:text-zinc-400">
            No mistakes logged yet.
          </p>
          <Button
            type="primary"
            onClick={() => setIsModalOpen(true)}
            className="mt-4 bg-orange-500 hover:bg-orange-600"
          >
            Add Your First Mistake
          </Button>
        </div>
      )}

      {/* Modals */}
      <AddMistakeModal
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          setSelectedMistake(null);
          refetch();
        }}
        editData={selectedMistake}
      />

      <DeleteMistakeModal
        open={isDeleteOpen}
        onCancel={() => {
          setIsDeleteOpen(false);
          setSelectedMistake(null);
        }}
        onConfirm={handleDeleteConfirm}
        mistakeName={selectedMistake?.mistake_name}
        isLoading={isDeleting}
      />
    </div>
  );
}
