"use client";

import { Button } from "antd";
import { useState } from "react";
import { HiOutlinePlus } from "react-icons/hi";
import { IoWarningOutline } from "react-icons/io5";
import AddRuleModal from "../components/system/rulesLimits/AddRuleModal";
import RulesTabs from "../components/system/rulesLimits/RulesTabs";

export default function RulesLimitPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen transition-colors duration-300">
      <div className="w-full mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              Rules & Limits
            </h1>
            <p className="text-slate-500 dark:text-zinc-400">
              Use healthy constraints. These rules protect you when emotions
              kick in.
            </p>
          </div>
          <Button
            type="primary"
            icon={<HiOutlinePlus size={18} />}
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 h-10 flex items-center gap-2 rounded-lg"
          >
            Add Custom Rule
          </Button>
        </div>

        {/* Warning Banner */}
        <div className="mb-8 p-4 rounded-2xl border border-red-100 bg-red-50/50 dark:bg-red-900/10 dark:border-red-900/20 flex gap-4">
          <div className="mt-1">
            <IoWarningOutline className="text-red-600" size={24} />
          </div>
          <div>
            <h4 className="font-bold text-red-800 dark:text-red-400 uppercase text-sm tracking-tight">
              IMPORTANT: Rules Override Emotion
            </h4>
            <p className="text-red-700 dark:text-red-300/80 text-sm mt-1">
              When you set to{" "}
              <span className="font-bold border-b-2 border-red-600 text-red-600">
                disable rules
              </span>{" "}
              {"you're"} overriding your safety net. This should happen rarely
              and deliberately — not in the heat of a trade.
            </p>
          </div>
        </div>

        {/* Tab System */}
        <RulesTabs />

        {/* Modal Component */}
        <AddRuleModal
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
        />
      </div>
    </div>
  );
}
