"use client";

import { Modal, ModalProps } from "antd";
import {
  IoCheckmarkCircle,
  IoClose,
  IoEyeOutline,
  IoHeartOutline,
} from "react-icons/io5";

export default function EmotionCostIndexModal({ open, onCancel }: ModalProps) {
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
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div className="flex gap-4">
            <div className="bg-pink-100 dark:bg-pink-900/30 p-3.5 rounded-2xl text-pink-600 shrink-0">
              <IoHeartOutline size={28} />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white leading-tight">
                Emotion Cost Index
              </h2>
              <p className="text-sm text-slate-400 font-bold uppercase tracking-widest mt-1">
                Metric Detail: ECI
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

        {/* Insight Quote */}
        <div className="bg-pink-50/50 dark:bg-pink-950/20 border-l-4 border-pink-500 p-5 rounded-r-2xl mb-8">
          <p className="text-base italic font-medium text-pink-800 dark:text-pink-300">
            How much each emotion costs you in real money.
          </p>
        </div>

        {/* Value Display */}
        <div className="text-center py-8 mb-8 bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 rounded-3xl shadow-sm">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">
            YOUR CURRENT VALUE
          </p>
          <div className="text-6xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tighter">
            -₹14,850
          </div>
        </div>

        {/* Breakdown */}
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
                <IoCheckmarkCircle className="text-emerald-500 text-lg shrink-0" />
                P&L by emotional state: FOMO, Fear, etc.
              </li>
              <li className="flex items-center gap-3 text-sm font-bold text-slate-600 dark:text-slate-400">
                <IoCheckmarkCircle className="text-emerald-500 text-lg shrink-0" />
                Actual rupee cost of each emotion
              </li>
              <li className="flex items-center gap-3 text-sm font-bold text-slate-600 dark:text-slate-400">
                <IoCheckmarkCircle className="text-emerald-500 text-lg shrink-0" />
                Pattern recognition across moods
              </li>
            </ul>
          </div>

          <div className="bg-purple-50 dark:bg-purple-900/10 border border-purple-100 dark:border-purple-800/30 p-5 rounded-2xl">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-purple-700 dark:text-purple-400 mb-2">
              CALCULATION (CONCEPTUAL)
            </h4>
            <p className="text-sm text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
              Sum of losses attributed to each tagged emotional state.
            </p>
          </div>

          <div className="bg-cyan-50 dark:bg-cyan-900/10 border border-cyan-100 dark:border-cyan-800/30 p-5 rounded-2xl">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-cyan-700 dark:text-cyan-400 mb-2">
              EXAMPLE INSIGHT
            </h4>
            <p className="text-sm text-slate-700 dark:text-slate-300 font-medium">
              Overconfidence trades lose 2.4× more than calm trades.
            </p>
          </div>
        </div>

        {/* Tags */}
        <div className="flex gap-2 border-t border-slate-100 dark:border-slate-800 pt-6">
          <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-[10px] font-black uppercase rounded-md tracking-tighter">
            Insights
          </span>
          <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-[10px] font-black uppercase rounded-md tracking-tighter">
            Psychology Reports
          </span>
        </div>
      </div>
    </Modal>
  );
}
