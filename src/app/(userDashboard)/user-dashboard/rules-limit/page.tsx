"use client";

import { Button } from "antd";
import { useState } from "react";
import { HiOutlinePlus } from "react-icons/hi";
import { IoWarningOutline } from "react-icons/io5";
import AddRuleModal from "../components/system/rulesLimits/AddRuleModal";
import DeleteConfirmationModal from "../components/system/rulesLimits/DeleteConfirmationModal";
import { RuleCardProps } from "../components/system/rulesLimits/RuleCard";
import RulesLimitOverview from "../components/system/rulesLimits/RulesLimitOverview";
import RulesTabs from "../components/system/rulesLimits/RulesTabs";

export default function RulesLimitPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedRule, setSelectedRule] = useState<RuleCardProps | null>(null);

  const handleEdit = (rule: RuleCardProps) => {
    setSelectedRule(rule);
    setIsModalOpen(true);
  };

  const handleDeleteTrigger = (rule: RuleCardProps) => {
    setSelectedRule(rule);
    setIsDeleteOpen(true);
  };

  const handleOpenAdd = () => {
    setSelectedRule(null);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen transition-colors duration-300 space-y-4">
      <div className="w-full mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              Rules & Limits
            </h1>
            <p className="text-slate-500 dark:text-zinc-400">
              Protect your capital when emotions kick in.
            </p>
          </div>
          <Button
            type="primary"
            icon={<HiOutlinePlus size={18} />}
            onClick={handleOpenAdd}
          >
            Add Custom Rule
          </Button>
        </div>

        {/* Warning Banner */}
        <div className="mb-8 p-4 rounded-2xl border border-red-100 bg-red-50/50 dark:bg-red-900/10 dark:border-red-900/20 flex gap-4">
          <IoWarningOutline className="text-red-600 shrink-0" size={24} />
          <div>
            <h4 className="font-bold text-red-800 dark:text-red-400 uppercase text-sm tracking-tight">
              IMPORTANT: Rules Override Emotion
            </h4>
            <p className="text-red-700 dark:text-red-300/80 text-sm mt-1">
              Disabling rules overrides your safety net. This should be a
              deliberate action.
            </p>
          </div>
        </div>

        {/* Tab System */}
        <RulesTabs onEdit={handleEdit} onDelete={handleDeleteTrigger} />

        {/* Modals */}
        <AddRuleModal
          open={isModalOpen}
          initialData={selectedRule}
          onCancel={() => {
            setIsModalOpen(false);
            setSelectedRule(null);
          }}
        />

        <DeleteConfirmationModal
          open={isDeleteOpen}
          title={selectedRule?.title}
          onCancel={() => setIsDeleteOpen(false)}
          onConfirm={() => setIsDeleteOpen(false)}
        />
      </div>

      {/* overview  */}
      <RulesLimitOverview />
    </div>
  );
}
