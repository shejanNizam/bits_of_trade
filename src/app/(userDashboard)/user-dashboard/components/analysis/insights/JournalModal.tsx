import { Input, Modal, ModalProps } from "antd";
import { IoBookOutline, IoBulbOutline, IoClose } from "react-icons/io5";
const { TextArea } = Input;

export default function JournalModal({ open, onCancel }: ModalProps) {
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
                Reflect on your recent violations
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

        <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/30 p-4 rounded-2xl mb-8 flex gap-3">
          <div className="bg-amber-500 text-white w-6 h-6 rounded-lg flex items-center justify-center font-black text-xs shrink-0">
            !
          </div>
          <div>
            <p className="text-sm font-black text-amber-900 dark:text-amber-400">
              VMI Alert: Mistakes are clustering
            </p>
            <p className="text-xs text-amber-700 dark:text-amber-500 font-medium leading-relaxed">
              You had 3 violations in your last 5 trades. {"Let's"} break the
              pattern.
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
      placeholder={placeholder}
    />
  </div>
);
