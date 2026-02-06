"use client";

import { clsx, type ClassValue } from "clsx";
import { useState } from "react";
import { HiOutlineLightBulb } from "react-icons/hi";
import { twMerge } from "tailwind-merge";
import CreateTradingRuleModal from "./CreateTradingRuleModal";
import ScheduleTimeoutModal from "./ScheduleTimeoutModal";
import TradePlanRuleModal from "./TradePlanRuleModal";

// Utility for cleaner tailwind classes
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Types ---

type FixItem = {
  id: number;
  title: string;
  desc: string;
  btn: string;
  color: string;
  modalType: "tradePlan" | "createRule" | "scheduleTimeout";
};

// --- Mock Data ---

const FIXES_DATA: FixItem[] = [
  {
    id: 1,
    title: "Stop trading after 2 consecutive losses",
    desc: "You currently FOMO if you encounter trades below 2PM vs 100mks, a mandatory cooldown trades 67% or purple.",
    btn: "Create Rule",
    color: "bg-teal-600",
    modalType: "createRule",
  },
  {
    id: 2,
    title: "Mandatory 3-minute pause before any re-entry",
    desc: "New tool based timeout. 70-3 seconds on re-analyzes has a correlation has a rational 91% better safe ratio.",
    btn: "Create Rule",
    color: "bg-teal-600",
    modalType: "tradePlan", // Just for demo variety, usually would map to specific logic
  },
  {
    id: 3,
    title: "Use forced timeouts after loss calendar",
    desc: "4 hour session is processed preventing risky emotions, live-trade-log risk mitigation by 97%.",
    btn: "Schedule Timeout",
    color: "bg-violet-600",
    modalType: "scheduleTimeout",
  },
];

export default function FixesForNext() {
  const [activeModal, setActiveModal] = useState<
    "none" | "tradePlan" | "createRule" | "scheduleTimeout"
  >("none");

  const handleOpenModal = (
    type: "tradePlan" | "createRule" | "scheduleTimeout",
  ) => {
    setActiveModal(type);
  };

  const handleCloseModal = () => {
    setActiveModal("none");
  };

  return (
    <div className=" bg-slate-50 dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-100">
      {/* Left Column: Fixes List */}
      <div className="lg:col-span-2">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-6 text-amber-500">
            <HiOutlineLightBulb size={24} />
            <h2 className="font-bold text-lg text-slate-900 dark:text-white">
              Your Top 3 Fixes for the Next 7 Days
            </h2>
          </div>

          <div className="space-y-4">
            {FIXES_DATA.map((fix) => (
              <div
                key={fix.id}
                className="bg-purple-50/50 dark:bg-purple-900/10 border border-purple-100 dark:border-purple-900/20 rounded-2xl p-5 hover:border-purple-300 dark:hover:border-purple-700 transition-all duration-300 group"
              >
                <div className="flex flex-col sm:flex-row gap-5">
                  <div className="h-12 w-12 shrink-0 bg-violet-600 text-white rounded-xl flex items-center justify-center font-bold text-xl shadow-lg shadow-violet-500/20 group-hover:scale-105 transition-transform">
                    {fix.id}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-base mb-1 text-slate-800 dark:text-slate-200">
                      {fix.title}
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 leading-relaxed">
                      {fix.desc}
                    </p>
                    <button
                      onClick={() => handleOpenModal(fix.modalType)}
                      className={cn(
                        "text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow-md active:scale-95 transition-all flex items-center gap-2",
                        fix.color,
                        "hover:brightness-110",
                      )}
                    >
                      {fix.btn}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Render Modals */}
      <TradePlanRuleModal
        open={activeModal === "tradePlan"}
        onClose={handleCloseModal}
      />
      <CreateTradingRuleModal
        open={activeModal === "createRule"}
        onClose={handleCloseModal}
      />
      <ScheduleTimeoutModal
        open={activeModal === "scheduleTimeout"}
        onClose={handleCloseModal}
      />
    </div>
  );
}
