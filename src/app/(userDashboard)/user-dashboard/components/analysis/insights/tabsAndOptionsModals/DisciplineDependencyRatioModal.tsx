"use client";

import { Modal, ModalProps } from "antd";
import {
  IoCheckmarkCircle,
  IoClose,
  IoEyeOutline,
  IoFlashOutline,
} from "react-icons/io5";

export default function DisciplineDependencyRatioModal({
  open,
  onCancel,
}: ModalProps) {
  return (
    <Modal
      open={open}
      onCancel={onCancel}
      footer={null}
      closeIcon={null}
      width={600}
      centered
      styles={{ body: { padding: 0 } }}
    >
      <div className="p-2 rounded-3xl md:rounded-4xl overflow-hidden transition-all duration-300">
        <div className="flex justify-between items-start mb-8">
          <div className="flex gap-4">
            <div className="bg-yellow-100 dark:bg-yellow-900/30 p-3.5 rounded-2xl text-yellow-600 shrink-0">
              <IoFlashOutline size={28} />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white leading-tight">
                Discipline Dependency Ratio
              </h2>
              <p className="text-sm text-slate-400 font-bold uppercase tracking-widest mt-1">
                Metric Detail: DDR
              </p>
            </div>
          </div>
          <button
            onClick={onCancel}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
          >
            <IoClose size={24} />
          </button>
        </div>

        <div className="bg-yellow-50/50 dark:bg-yellow-950/20 border-l-4 border-yellow-500 p-5 rounded-r-2xl mb-8">
          <p className="text-base italic font-medium text-yellow-800 dark:text-yellow-300">
            How dependent your profitability is on discipline.
          </p>
        </div>

        <div className="text-center py-8 mb-8 bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 rounded-3xl shadow-sm">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">
            YOUR CURRENT VALUE
          </p>
          <div className="text-7xl font-black text-slate-900 dark:text-white tracking-tighter">
            78%
          </div>
        </div>

        <div className="space-y-6 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4 text-slate-900 dark:text-white">
              <IoEyeOutline className="text-xl" />
              <h3 className="text-sm font-black uppercase tracking-wider">
                What It Measures
              </h3>
            </div>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-sm font-bold text-slate-600 dark:text-slate-400">
                <IoCheckmarkCircle className="text-emerald-500 text-lg shrink-0" />{" "}
                Profit difference: disciplined vs undisciplined
              </li>
              <li className="flex items-center gap-3 text-sm font-bold text-slate-600 dark:text-slate-400">
                <IoCheckmarkCircle className="text-emerald-500 text-lg shrink-0" />{" "}
                Whether skill exists but discipline is missing
              </li>
              <li className="flex items-center gap-3 text-sm font-bold text-slate-600 dark:text-slate-400">
                <IoCheckmarkCircle className="text-emerald-500 text-lg shrink-0" />{" "}
                Or if {"there's"} a structural strategy problem
              </li>
            </ul>
          </div>

          <div className="bg-purple-50 dark:bg-purple-900/10 border border-purple-100 dark:border-purple-800/30 p-5 rounded-2xl">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-purple-700 dark:text-purple-400 mb-2">
              CALCULATION (CONCEPTUAL)
            </h4>
            <p className="text-sm text-slate-700 dark:text-slate-300 font-medium">
              (Disciplined profit - Undisciplined profit) / Total profit × 100
            </p>
          </div>

          <div className="bg-cyan-50 dark:bg-cyan-900/10 border border-cyan-100 dark:border-cyan-800/30 p-5 rounded-2xl">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-cyan-700 dark:text-cyan-400 mb-2">
              EXAMPLE INSIGHT
            </h4>
            <p className="text-sm text-slate-700 dark:text-slate-300 font-medium">
              High DDR (78%) = skill exists, discipline missing. Focus on
              control, not strategy.
            </p>
          </div>
        </div>

        <div className="flex gap-2 border-t border-slate-100 dark:border-slate-800 pt-6">
          <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-[10px] font-black uppercase rounded-md tracking-tighter">
            Insights
          </span>
          <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-[10px] font-black uppercase rounded-md tracking-tighter">
            Learning recommendations
          </span>
        </div>
      </div>
    </Modal>
  );
}
