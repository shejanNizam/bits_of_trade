"use client";

import { Modal, ModalProps } from "antd";
import { FaCheck, FaClock, FaEye } from "react-icons/fa";

export default function DisciplineRecoveryTimeModal({
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
          <div className="p-3 rounded-2xl">
            <FaClock className="w-7 h-7 text-cyan-600 dark:text-cyan-400" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
              Discipline Recovery Time (DRT)
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">DRT</p>
          </div>
        </div>

        {/* Quote */}
        <div className="bg-cyan-50 dark:bg-cyan-950/30 border-l-4 border-cyan-500 px-4 py-3 mb-6">
          <p className="text-sm italic text-cyan-700 dark:text-cyan-300">
            How long you take to recover discipline after a violation.
          </p>
        </div>

        {/* Current Value */}
        <div className="text-center mb-8">
          <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-2">
            YOUR CURRENT VALUE
          </p>
          <div className="text-6xl font-bold text-slate-900 dark:text-white">
            3.2 sessions
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
              <span>Time between violation → clean sessions</span>
            </li>
            <li className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
              <FaCheck className="w-4 h-4 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
              <span>Measures behavioural resilience</span>
            </li>
            <li className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
              <FaCheck className="w-4 h-4 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
              <span>Recovery patterns after mistakes</span>
            </li>
          </ul>
        </div>

        {/* Calculation */}
        <div className="bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4 mb-4">
          <h4 className="text-xs font-semibold uppercase tracking-wide text-purple-700 dark:text-purple-300 mb-2">
            CALCULATION (CONCEPTUAL)
          </h4>
          <p className="text-sm text-slate-700 dark:text-slate-300">
            Average number of sessions between a rule violation and returning to
            full green status.
          </p>
        </div>

        {/* Example Insight */}
        <div className="bg-cyan-50 dark:bg-cyan-950/20 border border-cyan-200 dark:border-cyan-800 rounded-lg p-4 mb-6">
          <h4 className="text-xs font-semibold uppercase tracking-wide text-cyan-700 dark:text-cyan-300 mb-2">
            EXAMPLE INSIGHT
          </h4>
          <p className="text-sm text-slate-700 dark:text-slate-300">
            You recover discipline in 3.2 sessions. Top traders recover under 2.
          </p>
        </div>

        {/* Where It Appears */}
        <div>
          <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-3">
            Where It Appears
          </h4>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs rounded-lg">
              Discipline Guard
            </span>
            <span className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs rounded-lg">
              Insights — Behaviour section
            </span>
          </div>
        </div>
      </div>
    </Modal>
  );
}
