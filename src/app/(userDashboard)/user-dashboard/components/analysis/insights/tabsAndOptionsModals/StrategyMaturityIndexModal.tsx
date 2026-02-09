"use client";

import { Modal, ModalProps } from "antd";
import {
  IoCheckmarkCircle,
  IoClose,
  IoEyeOutline,
  IoGridOutline,
} from "react-icons/io5";

export default function StrategyMaturityIndexModal({
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
            <div className="bg-indigo-100 dark:bg-indigo-900/30 p-3.5 rounded-2xl text-indigo-600 shrink-0">
              <IoGridOutline size={28} />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white leading-tight">
                Strategy Maturity Index
              </h2>
              <p className="text-sm text-slate-400 font-bold uppercase tracking-widest mt-1">
                Metric Detail: SMI
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

        <div className="bg-indigo-50/50 dark:bg-indigo-950/20 border-l-4 border-indigo-500 p-5 rounded-r-2xl mb-8">
          <p className="text-base italic font-medium text-indigo-800 dark:text-indigo-300">
            Is your strategy real — or noise?
          </p>
        </div>

        <div className="text-center py-8 mb-8 bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 rounded-3xl shadow-sm">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">
            YOUR CURRENT VALUE
          </p>
          <div className="text-7xl font-black text-slate-900 dark:text-white tracking-tighter">
            72<span className="text-2xl opacity-30">/100</span>
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
                Rule adherence within strategy
              </li>
              <li className="flex items-center gap-3 text-sm font-bold text-slate-600 dark:text-slate-400">
                <IoCheckmarkCircle className="text-emerald-500 text-lg shrink-0" />{" "}
                Sample size significance
              </li>
              <li className="flex items-center gap-3 text-sm font-bold text-slate-600 dark:text-slate-400">
                <IoCheckmarkCircle className="text-emerald-500 text-lg shrink-0" />{" "}
                Emotional stability during execution
              </li>
              <li className="flex items-center gap-3 text-sm font-bold text-slate-600 dark:text-slate-400">
                <IoCheckmarkCircle className="text-emerald-500 text-lg shrink-0" />{" "}
                Drawdown behaviour
              </li>
            </ul>
          </div>

          <div className="bg-purple-50 dark:bg-purple-900/10 border border-purple-100 dark:border-purple-800/30 p-5 rounded-2xl">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-purple-700 dark:text-purple-400 mb-2">
              CALCULATION (CONCEPTUAL)
            </h4>
            <p className="text-sm text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
              Weighted score: Sample size (30%) + Win consistency (25%) +
              Emotional stability (25%) + Rule adherence (20%)
            </p>
          </div>

          <div className="bg-cyan-50 dark:bg-cyan-900/10 border border-cyan-100 dark:border-cyan-800/30 p-5 rounded-2xl">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-cyan-700 dark:text-cyan-400 mb-2">
              EXAMPLE INSIGHT
            </h4>
            <p className="text-sm text-slate-700 dark:text-slate-300 font-medium">
              Your Momentum strategy is mature (SMI 72). Mean Reversion is
              unproven (SMI 28).
            </p>
          </div>
        </div>

        <div className="flex gap-2 border-t border-slate-100 dark:border-slate-800 pt-6">
          <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-[10px] font-black uppercase rounded-md tracking-tighter">
            Strategy Library
          </span>
          <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-[10px] font-black uppercase rounded-md tracking-tighter">
            Reports → Strategy Health
          </span>
        </div>
      </div>
    </Modal>
  );
}
