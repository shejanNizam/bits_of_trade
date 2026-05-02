"use client";

import { Input, Modal, ModalProps } from "antd";
import { IoBookOutline, IoBulbOutline, IoClose } from "react-icons/io5";

interface ScorecardItem {
  code: string;
  label: string;
  value: number | null;
  unit: string;
  data_state: string;
  status: string;
  trend: string;
  what_it_means: string;
  evidence: string;
  cta?: {
    label: string;
    type: string;
  };
}

interface JournalModalProps extends ModalProps {
  metricData?: ScorecardItem;
}

const { TextArea } = Input;

export default function JournalModal({
  open,
  onCancel,
  metricData,
}: JournalModalProps) {
  const vmiStatus = metricData?.status || "warning";

  return (
    <Modal
      open={open}
      onCancel={onCancel}
      footer={null}
      closeIcon={null}
      width={650}
      centered
      styles={{ body: { padding: 0 } }}
    >
      <div className="p-6 bg-white dark:bg-slate-900 rounded-4xl">
        <div className="flex justify-between items-start mb-6">
          <div className="flex gap-4">
            <div className="bg-purple-100 dark:bg-purple-900/20 p-3 rounded-2xl text-purple-600">
              <IoBookOutline size={26} />
            </div>
            <div>
              <h2 className="text-xl font-bold dark:text-white">
                Quick Journal Entry
              </h2>
              <p className="text-sm text-slate-400 font-medium">
                {metricData?.what_it_means ||
                  "Reflect on your recent violations"}
              </p>
            </div>
          </div>
          <button
            onClick={onCancel}
            className="dark:text-slate-400 hover:text-slate-200"
          >
            <IoClose size={24} />
          </button>
        </div>

        <div
          className={`${vmiStatus === "warning" ? "bg-amber-50 dark:bg-amber-900/10 border-amber-100 dark:border-amber-900/30" : "bg-blue-50 dark:bg-blue-900/10 border-blue-100 dark:border-blue-900/30"} p-4 rounded-2xl mb-8 flex gap-3`}
        >
          <div
            className={`${vmiStatus === "warning" ? "bg-amber-500" : "bg-blue-500"} text-white w-6 h-6 rounded-lg flex items-center justify-center font-black text-xs shrink-0`}
          >
            !
          </div>
          <div>
            <p className="text-sm font-black text-amber-900 dark:text-amber-400">
              VMI Alert: {metricData?.evidence || "Mistakes are clustering"}
            </p>
            <p className="text-xs text-amber-700 dark:text-amber-500 font-medium leading-relaxed">
              {metricData?.value && metricData.value > 30
                ? "You had multiple violations recently. Let's break the pattern."
                : "Track your emotions to prevent violations from clustering."}
            </p>
          </div>
        </div>

        <div className="space-y-6 max-h-[50vh] overflow-y-auto px-1">
          <JournalField
            label="What emotions were you feeling before the violations?"
            placeholder="E.g., FOMO, overconfident, frustrated..."
          />
          <JournalField label="Which specific mistake pattern keeps repeating?" />
          <JournalField label="What's ONE thing you'll do differently tomorrow?" />
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 p-4 rounded-2xl my-6 flex gap-3 items-center">
          <IoBulbOutline className="text-blue-500 text-xl shrink-0" />
          <p className="text-[11px] font-bold text-blue-800 dark:text-blue-400 uppercase tracking-tighter">
            PRO TIP:{" "}
            <span className="normal-case font-medium text-blue-700 dark:text-blue-500">
              Journaling within 1 hour improves DRT by 40%.
            </span>
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={onCancel}
            className="py-4 border border-slate-100 dark:border-slate-800 rounded-2xl font-bold text-slate-500"
          >
            Cancel
          </button>
          <button className="py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-bold flex items-center justify-center gap-2">
            <IoBookOutline size={18} /> Save Journal
          </button>
        </div>
      </div>
    </Modal>
  );
}

const JournalField = ({
  label,
  placeholder,
}: {
  label: string;
  placeholder?: string;
}) => (
  <div>
    <label className="text-sm font-black text-slate-900 dark:text-white block mb-2">
      {label}
    </label>
    <TextArea
      rows={2}
      className="rounded-xl border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 dark:text-white focus:bg-white text-sm"
      placeholder={placeholder || "Type your response here..."}
    />
  </div>
);
