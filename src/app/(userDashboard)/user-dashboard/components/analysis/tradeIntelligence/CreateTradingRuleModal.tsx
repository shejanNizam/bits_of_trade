import { Button, Input, Modal, Switch } from "antd";
import { HiOutlineLightBulb, HiOutlineX } from "react-icons/hi";

const CreateTradingRuleModal = ({
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
      width={520}
      closable={false}
      className="custom-modal"
    >
      <div className="bg-white dark:bg-slate-900">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Create Trading Rule
            </h3>
            <p className="text-sm text-slate-500">
              Set up a new rule to improve discipline
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
        <div className="px-6 py-2 space-y-5 max-h-[70vh] overflow-y-auto custom-scrollbar">
          {/* Suggestion Banner */}
          <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-800 rounded-lg p-4 flex gap-3">
            <div className="mt-0.5 text-purple-600">
              <HiOutlineLightBulb size={20} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-purple-900 dark:text-purple-100">
                Suggestion
              </h4>
              <p className="text-xs text-purple-700 dark:text-purple-300 mt-1 leading-relaxed">
                Stop trading after 2 consecutive losses. You currently FOMO if
                you encounter trades below 2PM vs 100mks, a mandatory cooldown
                trades 67% or purple.
              </p>
            </div>
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5">
                Rule Name
              </label>
              <Input
                placeholder="Enter rule name"
                className="h-10 rounded-lg border-slate-300 focus:border-purple-500 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5">
                Description
              </label>
              <Input.TextArea
                placeholder="Describe this rule in detail"
                rows={3}
                className="rounded-lg border-slate-300 focus:border-purple-500 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5">
                Trigger Condition
              </label>
              <Input
                placeholder="e.g. 2 consecutive losses"
                className="h-10 rounded-lg border-slate-300 focus:border-purple-500 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5">
                Action to Take
              </label>
              <Input
                placeholder="e.g. Stop trading for the day"
                className="h-10 rounded-lg border-slate-300 focus:border-purple-500 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5">
                Penalty for Violation (Optional)
              </label>
              <Input
                placeholder="e.g., No trading next day, Journal reflection required"
                className="h-10 rounded-lg border-slate-300 focus:border-purple-500 focus:ring-purple-500"
              />
            </div>

            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-slate-600 dark:text-slate-300">
                Enable auto-enforcement
              </span>
              <span className="text-xs text-slate-400 mr-2">
                (System will prevent trading when rule is triggered)
              </span>
              <Switch size="small" />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 pt-4 flex gap-3 mt-2 border-t border-slate-100 dark:border-slate-800">
          <Button
            onClick={onClose}
            className="flex-1 h-10 rounded-lg border-slate-300 text-slate-700 hover:text-slate-900 hover:border-slate-400"
          >
            Cancel
          </Button>
          <Button
            type="primary"
            className="flex-1 h-10 rounded-lg bg-teal-600 hover:bg-teal-700 border-none shadow-md shadow-teal-500/20"
          >
            Create Rule
          </Button>
        </div>
      </div>
    </Modal>
  );
};
export default CreateTradingRuleModal;
