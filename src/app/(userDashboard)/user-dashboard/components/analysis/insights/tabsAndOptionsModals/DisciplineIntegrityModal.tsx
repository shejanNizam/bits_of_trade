"use client";

import { Modal, ModalProps } from "antd";
import { FaBullseye, FaCheck, FaEye } from "react-icons/fa";

export default function DisciplineIntegrityModal({
  open,
  onCancel,
}: ModalProps) {
  return (
    <Modal
      open={open}
      onCancel={onCancel}
      footer={null}
      width={600}
      centered
      className="metric-detail-modal"
    >
      <div className="py-2">
        {/* Header */}
        <div className="flex items-start gap-4 mb-6">
          <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-2xl">
            <FaBullseye className="w-7 h-7 text-purple-600 dark:text-purple-400" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
              Discipline Integrity Score (DIS™)
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">DIS™</p>
          </div>
        </div>

        {/* Quote */}
        <div className="bg-purple-50 dark:bg-purple-950/30 border-l-4 border-purple-500 px-4 py-3 mb-6">
          <p className="text-sm italic text-purple-700 dark:text-purple-300">
            How consistently you follow your own rules — regardless of profit.
          </p>
        </div>

        {/* Current Value */}
        <div className="text-center mb-8">
          <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-2">
            YOUR CURRENT VALUE
          </p>
          <div className="text-6xl font-bold text-slate-900 dark:text-white">
            76.5%
          </div>
        </div>

        {/* What It Measures */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <FaEye className="w-4 h-4 text-slate-600 dark:text-slate-400" />
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">
              What It Measures
            </h3>
          </div>
          <ul className="space-y-2">
            <li className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
              <FaCheck className="w-4 h-4 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
              <span>Rule adherence</span>
            </li>
            <li className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
              <FaCheck className="w-4 h-4 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
              <span>Mistake recurrence</span>
            </li>
            <li className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
              <FaCheck className="w-4 h-4 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
              <span>Session violations</span>
            </li>
            <li className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
              <FaCheck className="w-4 h-4 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
              <span>Ignored warnings</span>
            </li>
          </ul>
        </div>

        {/* Calculation */}
        <div className="bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4 mb-4">
          <h4 className="text-xs font-semibold uppercase tracking-wide text-purple-700 dark:text-purple-300 mb-2">
            CALCULATION (CONCEPTUAL)
          </h4>
          <p className="text-sm text-slate-700 dark:text-slate-300">
            100 — weighted penalties for: Rule breaches, Repeated mistakes,
            Trading during restricted sessions, Skipped journals
          </p>
        </div>

        {/* Example Insight */}
        <div className="bg-cyan-50 dark:bg-cyan-950/20 border border-cyan-200 dark:border-cyan-800 rounded-lg p-4 mb-6">
          <h4 className="text-xs font-semibold uppercase tracking-wide text-cyan-700 dark:text-cyan-300 mb-2">
            EXAMPLE INSIGHT
          </h4>
          <p className="text-sm text-slate-700 dark:text-slate-300">
            Your DIS dropped 12% after skipping journal entries for 3
            consecutive sessions.
          </p>
        </div>

        {/* Where It Appears */}
        <div>
          <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-3">
            Where It Appears
          </h4>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs rounded-lg">
              Overview (primary)
            </span>
            <span className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs rounded-lg">
              Discipline Guard (detailed)
            </span>
            <span className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs rounded-lg">
              Weekly recap email
            </span>
          </div>
        </div>
      </div>
    </Modal>
  );
}
