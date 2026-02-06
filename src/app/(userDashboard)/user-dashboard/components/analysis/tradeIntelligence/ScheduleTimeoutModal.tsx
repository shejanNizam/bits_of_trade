import {
  Button,
  Checkbox,
  Input,
  InputNumber,
  Modal,
  Radio,
  Select,
  TimePicker,
} from "antd";
import dayjs from "dayjs";
import { HiOutlineLightBulb, HiOutlineX } from "react-icons/hi";

const ScheduleTimeoutModal = ({
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
              Schedule Timeout
            </h3>
            <p className="text-sm text-slate-500">
              Set up automated discipline enforcement
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
        <div className="px-6 py-2 space-y-5">
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
                Use forced timeouts after loss calendar. 4 hour session is
                processed preventing risky emotions, live-trade-log risk
                mitigation by 97%.
              </p>
            </div>
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5">
                Schedule Name
              </label>
              <Input
                placeholder="Enter schedule name"
                className="h-10 rounded-lg border-slate-300 focus:border-purple-500 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5">
                Frequency
              </label>
              <Select
                placeholder="Select frequency"
                className="w-full"
                options={[
                  { value: "daily", label: "Daily" },
                  { value: "weekly", label: "Weekly" },
                  { value: "after_loss", label: "After Every Loss" },
                ]}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1.5">
                  Start Time
                </label>
                <TimePicker
                  use12Hours
                  format="h:mm A"
                  className="w-full h-10 rounded-lg"
                  defaultValue={dayjs("14:00", "HH:mm")}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1.5">
                  Duration (minutes)
                </label>
                <InputNumber
                  min={1}
                  defaultValue={30}
                  className="w-full h-10 rounded-lg"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5">
                Activity During Timeout
              </label>
              <div className="space-y-2">
                {[
                  "Complete journal reflection",
                  "Review recent trades",
                  "Breathing exercise / meditation",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Checkbox
                      id={`timeout-act-${i}`}
                      className="custom-checkbox"
                    />
                    <label
                      htmlFor={`timeout-act-${i}`}
                      className="text-sm text-slate-600 dark:text-slate-400 cursor-pointer select-none"
                    >
                      {item}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3 py-1">
              <Checkbox id="notify" className="custom-checkbox" />
              <label
                htmlFor="notify"
                className="text-sm text-slate-600 dark:text-slate-400 cursor-pointer select-none"
              >
                Send notification reminder when timeout starts
              </label>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-2">
                Enforcement Level
              </label>
              <Radio.Group className="flex flex-col gap-3">
                <Radio value="soft" className="flex items-start">
                  <div className="ml-2 -mt-1">
                    <div className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      Soft Reminder
                    </div>
                    <div className="text-xs text-slate-500">
                      Show notification, but allow trading.
                    </div>
                  </div>
                </Radio>
                <Radio value="hard" className="flex items-start">
                  <div className="ml-2 -mt-1">
                    <div className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      Hard Block
                    </div>
                    <div className="text-xs text-slate-500">
                      Prevent all trading during timeout period.
                    </div>
                  </div>
                </Radio>
              </Radio.Group>
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
            className="flex-1 h-10 rounded-lg bg-violet-600 hover:bg-violet-700 border-none shadow-md shadow-violet-500/20"
          >
            Schedule Timeout
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ScheduleTimeoutModal;
