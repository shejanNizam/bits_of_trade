import { Modal, ModalProps } from "antd";
import React from "react";
import {
  IoAlertCircleOutline,
  IoCheckmarkCircleOutline,
  IoClose,
  IoInformationCircleOutline,
  IoShieldOutline,
} from "react-icons/io5";

// interface ModalProps {
//   open: boolean;
//   onCancel: () => void;
// }

interface RuleRowProps {
  title: string;
  desc: string;
  violations: number;
  color: "amber" | "emerald" | "red";
  icon: React.ReactNode;
}

export default function RulesModal({ open, onCancel }: ModalProps) {
  return (
    <Modal
      open={open}
      onCancel={onCancel}
      footer={null}
      closeIcon={null}
      width={700}
      centered
      styles={{ body: { padding: 0 } }}
      className="dark:bg-slate-900"
      rootClassName="custom-modal-root"
    >
      <div className="p-6 bg-white dark:bg-slate-900 rounded-4xl overflow-hidden">
        <div className="flex justify-between items-start mb-4">
          <div className="flex gap-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-2xl">
              <IoShieldOutline className="text-blue-500 text-2xl" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white leading-tight">
                Review Rules & Limits
              </h2>
              <p className="text-sm text-slate-400 dark:text-slate-500 font-medium">
                Your discipline violations analysis
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

        <div className="grid grid-cols-1 sm:grid-cols-3 py-8 border-y border-slate-50 dark:border-slate-800 mb-6 text-center gap-6">
          <div>
            <p className="text-4xl font-black text-slate-900 dark:text-white">
              11
            </p>
            <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-2">
              Total Violations
            </p>
            <p className="text-[11px] text-red-500 font-bold mt-1">
              Last 30 days
            </p>
          </div>
          <div>
            <p className="text-4xl font-black text-slate-900 dark:text-white">
              76.5%
            </p>
            <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-2">
              DIS Score
            </p>
            <p className="text-[11px] text-emerald-500 font-bold mt-1">
              Improving
            </p>
          </div>
          <div>
            <p className="text-4xl font-black text-slate-900 dark:text-white">
              3
            </p>
            <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-2">
              Critical Rules
            </p>
            <p className="text-[11px] text-orange-500 font-bold mt-1">
              Needs attention
            </p>
          </div>
        </div>

        <div className="space-y-3 max-h-[40vh] overflow-y-auto pr-2">
          <RuleRow
            title="RISK MANAGEMENT"
            desc="Max 2% risk per trade"
            violations={3}
            color="amber"
            icon={<IoInformationCircleOutline />}
          />
          <RuleRow
            title="POSITION SIZING"
            desc="Never exceed 5 contracts"
            violations={0}
            color="emerald"
            icon={<IoCheckmarkCircleOutline />}
          />
          <RuleRow
            title="TRADING HOURS"
            desc="Only trade 9:30 AM - 11:30 AM"
            violations={5}
            color="red"
            icon={<IoAlertCircleOutline />}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
          <button
            onClick={onCancel}
            className="py-4 border border-slate-100 dark:border-slate-800 rounded-2xl font-bold text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            Close
          </button>
          <button className="py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-bold hover:opacity-90 transition-all">
            Edit Rules & Limits
          </button>
        </div>
      </div>
    </Modal>
  );
}

const RuleRow: React.FC<RuleRowProps> = ({
  title,
  desc,
  violations,
  color,
  icon,
}) => {
  const themes = {
    amber:
      "bg-amber-50/50 dark:bg-amber-900/10 border-amber-100 dark:border-amber-900/30 text-amber-600 dark:text-amber-400",
    emerald:
      "bg-emerald-50/50 dark:bg-emerald-900/10 border-emerald-100 dark:border-emerald-900/30 text-emerald-600 dark:text-emerald-400",
    red: "bg-red-50/50 dark:bg-red-900/10 border-red-100 dark:border-red-900/30 text-red-600 dark:text-red-400",
  };
  return (
    <div
      className={`${themes[color]} border p-4 rounded-2xl flex justify-between items-center`}
    >
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5 mb-1 font-black text-[10px] tracking-wider uppercase">
          {title} <span className="text-sm">{icon}</span>
        </div>
        <p className="font-bold text-slate-800 dark:text-slate-200 text-sm">
          {desc}
        </p>
      </div>
      <div className="px-4 py-1.5 rounded-full text-[11px] font-black border border-current bg-white/50 dark:bg-slate-900/50">
        {violations} violations
      </div>
    </div>
  );
};
