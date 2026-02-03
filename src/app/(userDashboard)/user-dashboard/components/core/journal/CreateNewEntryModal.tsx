"use client";

import { Modal } from "antd";
import { FiEdit } from "react-icons/fi";
import { IoCloseOutline } from "react-icons/io5";
import { MdOutlineWarning } from "react-icons/md";
import { TbBrain, TbBulb, TbChartBar, TbTarget } from "react-icons/tb";

interface CreateNewEntryModalProps {
  open: boolean;
  onClose: () => void;
}

export default function CreateNewEntryModal({
  open,
  onClose,
}: CreateNewEntryModalProps) {
  const entryTypes = [
    {
      title: "Daily Journal",
      description: "Macro reflection & habit formation",
      icon: <FiEdit className="text-2xl" />,
      bgColor: "bg-blue-50 dark:bg-blue-950/30",
      borderColor: "border-blue-200 dark:border-blue-900/50",
      iconBg: "bg-blue-100 dark:bg-blue-900/50",
      iconColor: "text-blue-600 dark:text-blue-400",
    },
    {
      title: "Trade Notes",
      description: "Per-trade narrative and analysis",
      icon: <TbChartBar className="text-2xl" />,
      bgColor: "bg-green-50 dark:bg-green-950/30",
      borderColor: "border-green-200 dark:border-green-900/50",
      iconBg: "bg-green-100 dark:bg-green-900/50",
      iconColor: "text-green-600 dark:text-green-400",
    },
    {
      title: "Psychology Log",
      description: "Capture emotions separately from performance",
      icon: <TbBrain className="text-2xl" />,
      bgColor: "bg-purple-50 dark:bg-purple-950/30",
      borderColor: "border-purple-200 dark:border-purple-900/50",
      iconBg: "bg-purple-100 dark:bg-purple-900/50",
      iconColor: "text-purple-600 dark:text-purple-400",
    },
    {
      title: "Mistakes",
      description: "Convert mistakes into analyzable data",
      icon: <MdOutlineWarning className="text-2xl" />,
      bgColor: "bg-yellow-50 dark:bg-yellow-950/30",
      borderColor: "border-yellow-200 dark:border-yellow-900/50",
      iconBg: "bg-yellow-100 dark:bg-yellow-900/50",
      iconColor: "text-yellow-600 dark:text-yellow-400",
    },
    {
      title: "Session Recap",
      description: "End-of-day session intelligence",
      icon: <TbTarget className="text-2xl" />,
      bgColor: "bg-pink-50 dark:bg-pink-950/30",
      borderColor: "border-pink-200 dark:border-pink-900/50",
      iconBg: "bg-pink-100 dark:bg-pink-900/50",
      iconColor: "text-pink-600 dark:text-pink-400",
    },
    {
      title: "Learning Notes",
      description: "Close the learning loop",
      icon: <TbBulb className="text-2xl" />,
      bgColor: "bg-cyan-50 dark:bg-cyan-950/30",
      borderColor: "border-cyan-200 dark:border-cyan-900/50",
      iconBg: "bg-cyan-100 dark:bg-cyan-900/50",
      iconColor: "text-cyan-600 dark:text-cyan-400",
    },
  ];

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      width={700}
      closeIcon={<IoCloseOutline className="text-xl" />}
      title={
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            Create New Entry
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Choose the type of journal entry
          </p>
        </div>
      }
    >
      <div className="grid grid-cols-2 gap-4 py-4">
        {entryTypes.map((type, index) => (
          <button
            key={index}
            className={`${type.bgColor} border ${type.borderColor} rounded-xl p-5 text-left hover:shadow-md transition-all group`}
          >
            <div className="flex items-start gap-4">
              <div
                className={`${type.iconBg} ${type.iconColor} p-3 rounded-lg`}
              >
                {type.icon}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-base font-bold text-gray-900 dark:text-gray-100 mb-1">
                  {type.title}
                </h4>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {type.description}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="flex justify-center pt-4 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={onClose}
          className="px-6 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
        >
          Cancel
        </button>
      </div>
    </Modal>
  );
}
