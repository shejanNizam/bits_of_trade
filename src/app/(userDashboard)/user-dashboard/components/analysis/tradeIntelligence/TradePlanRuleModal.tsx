import { Button, Checkbox, Modal } from "antd";
import { HiCheckCircle, HiOutlineX } from "react-icons/hi";

const TradePlanRuleModal = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      width={480}
      closable={false}
      className="custom-modal"
    >
      <div className="bg-white dark:bg-slate-900">
        {/* Header */}
        <div className=" flex justify-between items-start">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Trading Plan Rule
            </h3>
            <p className="text-sm text-slate-500">
              Review your documented strategy
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors"
          >
            <HiOutlineX size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-2 space-y-6">
          {/* Success Banner */}
          <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800 rounded-lg p-4 flex gap-3">
            <div className="mt-0.5 text-emerald-600">
              <HiCheckCircle size={20} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-emerald-900 dark:text-emerald-100">
                Wait for Confirmation
              </h4>
              <p className="text-xs text-emerald-700 dark:text-emerald-300 mt-1 leading-relaxed">
                You waited for confirmation 18 out of 22 times when entering
                trades. 21 of 24 surveying trades followed documented strategy
                rules.
              </p>
            </div>
          </div>

          {/* Details Form (Read-only style) */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">
                Rule Type
              </label>
              <div className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-700 dark:text-slate-300">
                Entry Confirmation Strategy
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">
                Success Rate
              </label>
              <div className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-700 dark:text-slate-300">
                82% when followed consistently
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">
                Key Checklist
              </label>
              <div className="space-y-2">
                {[
                  "Wait for volume confirmation",
                  "Check trend alignment on higher timeframe",
                  "Verify risk-to-reward ratio minimum 1:2",
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2.5"
                  >
                    <Checkbox id={`check-${i}`} className="custom-checkbox" />
                    <label
                      htmlFor={`check-${i}`}
                      className="text-sm text-slate-600 dark:text-slate-400 cursor-pointer select-none"
                    >
                      {item}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">
                Related Journal Entries
              </label>
              <div className="space-y-2">
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-lg px-3 py-2 text-xs text-blue-700 dark:text-blue-300 cursor-pointer hover:bg-blue-100 transition-colors">
                  Trade Note - RELIANCE Momentum Breakout (Jan 23, 2025)
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-lg px-3 py-2 text-xs text-blue-700 dark:text-blue-300 cursor-pointer hover:bg-blue-100 transition-colors">
                  Learning Note - Volume Confirmation Importance (Jan 20, 2025)
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 pt-2 flex gap-3 mt-4">
          <Button
            onClick={onClose}
            className="flex-1 h-10 rounded-lg border-slate-300 text-slate-700 hover:text-slate-900 hover:border-slate-400"
          >
            Close
          </Button>
          <Button
            type="primary"
            className="flex-1 h-10 rounded-lg bg-blue-600 hover:bg-blue-700 border-none shadow-md shadow-blue-500/20"
          >
            Edit Rule
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default TradePlanRuleModal;
