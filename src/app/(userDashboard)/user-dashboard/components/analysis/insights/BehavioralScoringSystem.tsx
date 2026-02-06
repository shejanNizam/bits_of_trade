"use client";

import { useState } from "react";
import { FaBrain } from "react-icons/fa";
import MetricsModal from "./tabsAndOptionsModals/MetricsModal";

export default function BehavioralScoringSystem() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section className="w-full mx-auto">
        {/* Top Insights Label */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Insights
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Proprietary metrics you {"won't"} find elsewhere. Discipline &gt;
            Performance.
          </p>
        </div>

        {/* Main Banner Card */}
        <div className="bg-white dark:bg-primary/10 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-start gap-6 transition-colors shadow-sm">
          <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-2xl">
            <FaBrain className="w-8 h-8 text-purple-600 dark:text-purple-400" />
          </div>

          <div className="flex-1 space-y-4">
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                Behavioral Scoring System
              </h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed max-w-4xl">
                These {"aren't"} vanity metrics. FVGR, VMI, DRT, and 8 other
                proprietary metrics measure control — not luck. This is what
                separates pros from gamblers.
              </p>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-[#7c3aed] hover:bg-[#6d28d9] text-white px-6 py-2.5 rounded-xl font-semibold transition-all transform active:scale-95"
            >
              Understand the Metrics
            </button>
          </div>
        </div>
      </section>

      {/* Metrics Modal */}
      <MetricsModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
