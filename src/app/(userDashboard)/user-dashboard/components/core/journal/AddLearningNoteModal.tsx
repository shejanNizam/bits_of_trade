"use client";

import { Input, Modal } from "antd";
import { IoCloseOutline } from "react-icons/io5";
import { TbBook, TbLink, TbTarget } from "react-icons/tb";

const { TextArea } = Input;

interface AddLearningNoteModalProps {
  open: boolean;
  onClose: () => void;
}

export default function AddLearningNoteModal({
  open,
  onClose,
}: AddLearningNoteModalProps) {
  const linkOptions = [
    { label: "Mistake", icon: <TbLink className="text-lg" /> },
    { label: "Rule", icon: <TbBook className="text-lg" /> },
    { label: "Strategy", icon: <TbTarget className="text-lg" /> },
  ];

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      width={650}
      closeIcon={<IoCloseOutline className="text-xl" />}
      title={
        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
          Add Learning Note
        </h3>
      }
    >
      <div className="space-y-5 py-4">
        {/* Lesson Watched / Read */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Lesson Watched / Read
          </label>
          <Input placeholder="Enter lesson title..." size="large" />
        </div>

        {/* Key Takeaway */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Key Takeaway
          </label>
          <TextArea
            placeholder="What's the main insight from this lesson?"
            rows={4}
          />
        </div>

        {/* How Will I Apply This? */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            How Will I Apply This?
          </label>
          <TextArea placeholder="Concrete action steps..." rows={3} />
        </div>

        {/* Link to */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            Link to
          </label>
          <div className="flex gap-3">
            {linkOptions.map((option) => (
              <button
                key={option.label}
                className="flex items-center gap-2 px-4 py-2.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors font-medium"
              >
                {option.icon}
                <span>{option.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button className="px-6 py-2 bg-green-600 dark:bg-green-500 text-white rounded-lg font-medium hover:bg-green-700 dark:hover:bg-green-600 transition-colors">
            Save Learning Note
          </button>
        </div>
      </div>
    </Modal>
  );
}
