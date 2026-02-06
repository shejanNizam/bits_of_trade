"use client";

import { useState } from "react";
import EmotionsModal from "./cardsModals/EmotionsModal";
import JournalModal from "./cardsModals/JournalModal";
import LessonsModal from "./cardsModals/LessonsModal";
import RulesModal from "./cardsModals/RulesModal";
const detailedMetrics = [
  {
    id: "DIS*",
    value: "76.5%",
    label: "Discipline Integrity Score",
    status: "Improving",
    statusColor: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30",
    meaning: "You follow your rule 76.5% of the time",
    evidence: "10 rule breaches in last 30 days",
    action: "Review Rules & Limits",
    type: "rules",
  },
  {
    id: "VMI*",
    value: "24%",
    label: "Violation Momentum Index",
    status: "warning",
    statusColor: "text-amber-600 bg-amber-50 dark:bg-amber-950/30",
    meaning: "Your mistakes are slightly clustering",
    evidence: "3 mistakes in last 5 trades",
    action: "Complete Quick Journal",
    type: "journal",
  },
  {
    id: "DRT*",
    value: "3.2%",
    label: "Discipline Recovery Time",
    status: "stable",
    statusColor: "text-blue-600 bg-blue-50 dark:bg-blue-950/30",
    meaning: "You recover discipline in 3.2 sessions after violations",
    evidence: "You traders recover under 2 sessions",
    action: "Watch Quick Recovery Lesson",
    type: "lessons",
  },
  {
    id: "ECI*",
    value: "-2850%",
    label: "Emotion Cost Index",
    status: "critical",
    statusColor: "text-red-600 bg-red-50 dark:bg-red-950/30",
    meaning: "FOMO and Overconfidence cost you ₹2,850",
    evidence: "Calm trades profit 2.4x more",
    action: "Review emotional patterns",
    type: "emotions",
  },
];

export default function InsightsCards() {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mx-auto">
      {detailedMetrics.map((item, idx) => (
        <div
          key={idx}
          className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-4xl p-6 shadow-sm flex flex-col gap-4 transition-all hover:shadow-md"
        >
          {/* Card Header & Content (Same as your provided code) */}
          <div className="flex justify-between items-start">
            <span
              className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter ${item.statusColor}`}
            >
              {item.id}
            </span>
            <span
              className={`px-3 py-1 rounded-full text-[10px] font-medium capitalize ${item.statusColor}`}
            >
              {item.status}
            </span>
          </div>
          <div>
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white">
              {item.value}
            </h2>
            <p className="text-sm text-slate-500 mt-1">{item.label}</p>
          </div>
          <div className="space-y-3 mt-2">
            <div className="bg-purple-50/50 dark:bg-purple-900/10 border border-purple-100 dark:border-purple-900/30 p-4 rounded-2xl">
              <p className="text-[10px] font-bold text-purple-600 uppercase mb-1">
                What it means
              </p>
              <p className="text-sm text-slate-700 dark:text-slate-300">
                {item.meaning}
              </p>
            </div>
            <div className="bg-emerald-50/50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-900/30 p-4 rounded-2xl">
              <p className="text-[10px] font-bold text-emerald-600 uppercase mb-1">
                Evidence
              </p>
              <p className="text-sm text-slate-700 dark:text-slate-300">
                {item.evidence}
              </p>
            </div>
          </div>

          <button
            onClick={() => setActiveModal(item.type)}
            className="w-full mt-2 py-3 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors active:scale-95"
          >
            {item.action}
          </button>
        </div>
      ))}

      {/* Modals */}
      <RulesModal
        open={activeModal === "rules"}
        onCancel={() => setActiveModal(null)}
      />
      <JournalModal
        open={activeModal === "journal"}
        onCancel={() => setActiveModal(null)}
      />
      <LessonsModal
        open={activeModal === "lessons"}
        onCancel={() => setActiveModal(null)}
      />
      <EmotionsModal
        open={activeModal === "emotions"}
        onCancel={() => setActiveModal(null)}
      />
    </div>
  );
}
