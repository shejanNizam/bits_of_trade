import { Modal, ModalProps } from "antd";
import {
  IoAnalyticsOutline,
  IoClose,
  IoFlashOutline,
  IoInformationCircleOutline,
  IoWarningOutline,
} from "react-icons/io5";

interface EmotionItemProps {
  title: string;
  count: number;
  avgLoss: number;
  total: string;
  trigger: string;
  isRed?: boolean;
}

export default function EmotionsModal({ open, onCancel }: ModalProps) {
  return (
    <Modal
      open={open}
      onCancel={onCancel}
      footer={null}
      closeIcon={null}
      width={800}
      centered
      styles={{ body: { padding: 0 } }}
    >
      <div className="p-6 bg-white dark:bg-slate-900 rounded-4xl overflow-hidden">
        <div className="flex justify-between items-start mb-6">
          <div className="flex gap-4 text-slate-900 dark:text-white">
            <div className="bg-pink-100 dark:bg-pink-900/20 p-3 rounded-2xl text-pink-600">
              <IoAnalyticsOutline size={26} />
            </div>
            <div>
              <h2 className="text-xl font-bold">Emotional Patterns Analysis</h2>
              <p className="text-sm text-slate-400 font-medium">
                Emotion-driven losses breakdown
              </p>
            </div>
          </div>
          <button
            onClick={onCancel}
            className="text-slate-400 hover:text-slate-200"
          >
            <IoClose size={24} />
          </button>
        </div>

        <div className="bg-red-50/50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/20 p-6 rounded-3xl mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-red-500 text-white p-2 rounded-xl">
              <IoWarningOutline size={24} />
            </div>
            <p className="text-lg font-black text-slate-900 dark:text-white leading-tight">
              Emotion Cost Index: -₹2,850{" "}
              <span className="text-[10px] bg-red-200 text-red-700 px-2 py-0.5 rounded ml-2 uppercase tracking-tighter">
                Critical
              </span>
            </p>
          </div>
          <p className="text-xs text-slate-500 font-medium leading-relaxed mb-6">
            Emotional trades cost you ₹2,850 this month.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-red-100 dark:border-red-900/30">
            <div>
              <p className="text-3xl font-black text-slate-900 dark:text-white leading-none">
                20
              </p>
              <p className="text-[10px] text-slate-400 font-black uppercase mt-2 tracking-widest">
                Emotional trades
              </p>
            </div>
            <div>
              <p className="text-3xl font-black text-slate-900 dark:text-white leading-none">
                ₹143
              </p>
              <p className="text-[10px] text-slate-400 font-black uppercase mt-2 tracking-widest">
                Avg loss per trade
              </p>
            </div>
            <div>
              <p className="text-3xl font-black text-red-500 leading-none">
                40%
              </p>
              <p className="text-[10px] text-slate-400 font-black uppercase mt-2 tracking-widest">
                Of total trades
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4 max-h-[40vh] overflow-y-auto px-1">
          <EmotionItem
            title="FOMO (Fear of Missing Out)"
            count={8}
            avgLoss={356}
            total="₹2,850"
            trigger="Green candles or tips"
            isRed
          />
          <EmotionItem
            title="Overconfidence"
            count={5}
            avgLoss={284}
            total="₹1,420"
            trigger="After 2-3 winning trades"
          />
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 p-6 rounded-3xl mt-8">
          <p className="text-[11px] font-black text-blue-800 dark:text-blue-400 uppercase flex items-center gap-2 mb-4">
            <IoInformationCircleOutline size={18} /> ACTION PLAN
          </p>
          <ul className="space-y-3 text-xs text-blue-900 dark:text-blue-300 font-bold">
            <li>• Set 5-minute mandatory wait time before any trade</li>
            <li>• Stop trading immediately after any loss above ₹500</li>
          </ul>
        </div>
      </div>
    </Modal>
  );
}

const EmotionItem = ({
  title,
  avgLoss,
  total,
  trigger,
  isRed,
}: EmotionItemProps) => (
  <div
    className={`${isRed ? "bg-red-50/30 dark:bg-red-900/10 border-red-100 dark:border-red-900/30" : "bg-amber-50/30 dark:bg-amber-900/10 border-amber-100 dark:border-amber-900/30"} border p-6 rounded-4xl`}
  >
    <div className="flex justify-between items-start mb-4">
      <div>
        <p className="font-black text-slate-900 dark:text-white">{title}</p>
        <p className="text-[10px] text-slate-400 font-black uppercase mt-1">
          ₹{avgLoss} Avg Loss
        </p>
      </div>
      <p
        className={`text-xl font-black ${isRed ? "text-red-600" : "text-amber-600"}`}
      >
        {total}
      </p>
    </div>
    <div className="bg-white/80 dark:bg-slate-800/80 p-4 rounded-2xl border border-white dark:border-slate-700 flex items-start gap-3">
      <IoFlashOutline className="text-orange-500 mt-0.5" />
      <p className="text-xs text-slate-600 dark:text-slate-400 italic leading-relaxed">
        {trigger}
      </p>
    </div>
  </div>
);
