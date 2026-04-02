/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  useCreateLearningNotesMutation,
  useUpdateLearningNotesMutation,
} from "@/redux/features/journal/journalApi";
import { Input, Modal, message } from "antd";
import { useEffect, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { TbBook, TbLink, TbTarget } from "react-icons/tb";

const { TextArea } = Input;

interface AddLearningNoteModalProps {
  open: boolean;
  onClose: () => void;
  editingNote?: any;
}

interface LearningNoteFormData {
  lesson_source: string;
  key_takeaway: string;
  application_plan: string;
  linked_type: "mistake" | "rule" | "strategy" | "none";
}

export default function AddLearningNoteModal({
  open,
  onClose,
  editingNote,
}: AddLearningNoteModalProps) {
  const [createLearningNotes, { isLoading: isCreating }] =
    useCreateLearningNotesMutation();
  const [updateLearningNotes, { isLoading: isUpdating }] =
    useUpdateLearningNotesMutation();

  const [formData, setFormData] = useState<LearningNoteFormData>({
    lesson_source: "",
    key_takeaway: "",
    application_plan: "",
    linked_type: "none",
  });

  const linkOptions = [
    {
      label: "Mistake",
      value: "mistake",
      icon: <TbLink className="text-lg" />,
    },
    { label: "Rule", value: "rule", icon: <TbBook className="text-lg" /> },
    {
      label: "Strategy",
      value: "strategy",
      icon: <TbTarget className="text-lg" />,
    },
  ] as const;

  // Load editing note data
  useEffect(() => {
    if (editingNote && open) {
      setFormData({
        lesson_source: editingNote.lesson_source || "",
        key_takeaway: editingNote.key_takeaway || "",
        application_plan: editingNote.application_plan || "",
        linked_type: editingNote.linked_type || "none",
      });
    } else if (!editingNote && open) {
      // Reset form for new note
      setFormData({
        lesson_source: "",
        key_takeaway: "",
        application_plan: "",
        linked_type: "none",
      });
    }
  }, [editingNote, open]);

  const handleInputChange = (field: keyof LearningNoteFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleLinkedTypeSelect = (
    value: "mistake" | "rule" | "strategy" | "none",
  ) => {
    setFormData((prev) => ({ ...prev, linked_type: value }));
  };

  const handleSubmit = async () => {
    // Validate required fields
    if (!formData.lesson_source.trim()) {
      message.error("Please enter the lesson source");
      return;
    }

    if (!formData.key_takeaway.trim()) {
      message.error("Please enter the key takeaway");
      return;
    }

    if (!formData.application_plan.trim()) {
      message.error("Please enter how you will apply this");
      return;
    }

    const payload = {
      lesson_source: formData.lesson_source,
      key_takeaway: formData.key_takeaway,
      application_plan: formData.application_plan,
      linked_type: formData.linked_type,
    };

    try {
      if (editingNote) {
        // Update existing note
        await updateLearningNotes({
          id: editingNote.id,
          payload,
        }).unwrap();
        message.success("Learning note updated successfully!");
      } else {
        // Create new note
        await createLearningNotes(payload).unwrap();
        message.success("Learning note created successfully!");
      }
      onClose();
    } catch (error: any) {
      // Handle error response dynamically
      if (error?.data?.non_field_errors) {
        message.error(error.data.non_field_errors[0]);
      } else if (error?.data?.lesson_source) {
        message.error(error.data.lesson_source[0]);
      } else if (error?.data?.key_takeaway) {
        message.error(error.data.key_takeaway[0]);
      } else if (error?.data?.application_plan) {
        message.error(error.data.application_plan[0]);
      } else if (error?.data?.message) {
        message.error(error.data.message);
      } else {
        message.error(
          editingNote
            ? "Failed to update learning note"
            : "Failed to create learning note",
        );
      }
      console.error("Failed to save learning note:", error);
    }
  };

  const isLoading = isCreating || isUpdating;

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      width={650}
      closeIcon={<IoCloseOutline className="text-xl" />}
      title={
        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
          {editingNote ? "Edit Learning Note" : "Add Learning Note"}
        </h3>
      }
    >
      <div className="space-y-5 py-4">
        {/* Lesson Watched / Read */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Lesson Watched / Read <span className="text-red-500">*</span>
          </label>
          <Input
            placeholder="Enter lesson title..."
            size="large"
            value={formData.lesson_source}
            onChange={(e) => handleInputChange("lesson_source", e.target.value)}
            disabled={isLoading}
          />
        </div>

        {/* Key Takeaway */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Key Takeaway <span className="text-red-500">*</span>
          </label>
          <TextArea
            placeholder="What's the main insight from this lesson?"
            rows={4}
            value={formData.key_takeaway}
            onChange={(e) => handleInputChange("key_takeaway", e.target.value)}
            disabled={isLoading}
            showCount
            maxLength={500}
          />
        </div>

        {/* How Will I Apply This? */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            How Will I Apply This? <span className="text-red-500">*</span>
          </label>
          <TextArea
            placeholder="Concrete action steps..."
            rows={3}
            value={formData.application_plan}
            onChange={(e) =>
              handleInputChange("application_plan", e.target.value)
            }
            disabled={isLoading}
            showCount
            maxLength={500}
          />
        </div>

        {/* Link to */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            Link to
          </label>
          <div className="flex gap-3">
            {linkOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleLinkedTypeSelect(option.value)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-colors ${
                  formData.linked_type === option.value
                    ? "bg-green-500 text-white border-2 border-green-600"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-2 border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
                disabled={isLoading}
              >
                {option.icon}
                <span>{option.label}</span>
              </button>
            ))}
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            Link this learning to a mistake, rule, or strategy for better
            tracking
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-green-600 dark:bg-green-500 text-white rounded-lg font-medium hover:bg-green-700 dark:hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading
              ? editingNote
                ? "Updating..."
                : "Creating..."
              : editingNote
                ? "Update Learning Note"
                : "Save Learning Note"}
          </button>
        </div>
      </div>
    </Modal>
  );
}
