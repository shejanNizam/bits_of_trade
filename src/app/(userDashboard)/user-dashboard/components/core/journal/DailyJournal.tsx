/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import DeleteConfirmationModal from "@/components/shared/DeleteConfirmationModal";
import { useUnlockJournalMutation } from "@/redux/features/discipline/disciplineApi";
import {
  useCreateDailyJournalEntryMutation,
  useDeleteDailyJournalEntryMutation,
  useGetAllDailyJournalQuery,
  useUpdateDailyJournalEntryMutation,
} from "@/redux/features/journal/journalApi";
import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { ErrorSwal, SuccessSwal } from "@/utils/allSwal";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Input, Modal, message } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";

const { TextArea } = Input;

interface JournalFormData {
  reflection: string;
  intention_next_session: string;
  limits_followed: "yes" | "mostly" | "no";
}

interface JournalEntry {
  id: string;
  journal_date: string;
  prompt_text: string;
  reflection: string;
  intention_next_session: string;
  limits_followed: string;
  session_state: string;
  created_at: string;
  updated_at: string;
}

export default function DailyJournal() {
  const router = useRouter();

  const { user } = useAppSelector((state: RootState) => state.auth);
  const sessionState = (user as any)?.session_state || null;

  const { data, refetch } = useGetAllDailyJournalQuery({});
  const [createDailyJournalEntry, { isLoading: isCreating }] =
    useCreateDailyJournalEntryMutation();
  const [updateDailyJournalEntry, { isLoading: isUpdating }] =
    useUpdateDailyJournalEntryMutation();
  const [deleteDailyJournalEntry, { isLoading: isDeleting }] =
    useDeleteDailyJournalEntryMutation();
  const [unlockJournal, { isLoading: isUnlocking }] =
    useUnlockJournalMutation();

  const [formData, setFormData] = useState<JournalFormData>({
    reflection: "",
    intention_next_session: "",
    limits_followed: "yes",
  });

  // Edit modal state
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState<JournalEntry | null>(null);
  const [deleteModal, setDeleteModal] = useState<{
    open: boolean;
    id: string | null;
  }>({
    open: false,
    id: null,
  });
  const [editFormData, setEditFormData] = useState<JournalFormData>({
    reflection: "",
    intention_next_session: "",
    limits_followed: "yes",
  });

  // Get today's date in YYYY-MM-DD format
  const todayDate = new Date().toISOString().split("T")[0];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLimitsFollowed = (value: "yes" | "mostly" | "no") => {
    setFormData((prev) => ({
      ...prev,
      limits_followed: value,
    }));
  };

  const handleEditLimitsFollowed = (value: "yes" | "mostly" | "no") => {
    setEditFormData((prev) => ({
      ...prev,
      limits_followed: value,
    }));
  };

  const getSessionStateStyles = (state: string) => {
    switch (state) {
      case "green":
        return "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800";
      case "yellow":
        return "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 border border-yellow-200 dark:border-yellow-800";
      case "red":
        return "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800";
      default:
        return "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700";
    }
  };

  const handleSubmit = async () => {
    // Validate required fields
    if (!formData.reflection.trim()) {
      message.error("Please write your reflection before saving");
      return;
    }

    if (!formData.intention_next_session.trim()) {
      message.error("Please set your intention for the next session");
      return;
    }

    const payload = {
      journal_date: todayDate,
      prompt_text: "What went well in your process today?",
      reflection: formData.reflection,
      intention_next_session: formData.intention_next_session,
      limits_followed: formData.limits_followed,
    };

    try {
      const response = await createDailyJournalEntry(payload).unwrap();
      SuccessSwal({
        title: "Success!",
        text: "Journal entry saved successfully!",
      });

      // Check if session_state is "red" and call unlock API
      if (sessionState === "red" || sessionState === "yellow") {
        try {
          await unlockJournal({ action: "complete_journal" }).unwrap();
          SuccessSwal({
            title: "Success!",
            text: "Journal unlocked successfully!",
          });
          router.push("/user-dashboard/discipline-guard");
        } catch (unlockError: any) {
          ErrorSwal({
            title: "",
            text:
              unlockError?.data?.message ||
              "Failed to unlock journal. Please try again.",
          });
          console.error("Failed to unlock journal:", unlockError);
        }
      }

      // Reset form after successful submission
      setFormData({
        reflection: "",
        intention_next_session: "",
        limits_followed: "yes",
      });

      refetch();
    } catch (error: any) {
      ErrorSwal({
        title: "",
        text:
          error?.data?.journal_date ||
          "Failed to save journal entry. Please try again.",
      });
      console.error("Failed to save journal entry:", error);
    }
  };

  const handleEdit = (entry: JournalEntry) => {
    setEditingEntry(entry);
    setEditFormData({
      reflection: entry.reflection,
      intention_next_session: entry.intention_next_session,
      limits_followed: entry.limits_followed as "yes" | "mostly" | "no",
    });
    setIsEditModalOpen(true);
  };

  const handleUpdate = async () => {
    if (!editingEntry) return;

    if (!editFormData.reflection.trim()) {
      message.error("Please write your reflection");
      return;
    }

    if (!editFormData.intention_next_session.trim()) {
      message.error("Please set your intention for the next session");
      return;
    }

    const payload = {
      reflection: editFormData.reflection,
      intention_next_session: editFormData.intention_next_session,
      limits_followed: editFormData.limits_followed,
    };

    try {
      await updateDailyJournalEntry({
        id: editingEntry.id,
        payload,
      }).unwrap();
      SuccessSwal({
        title: "Success!",
        text: "Journal entry updated successfully!",
      });
      setIsEditModalOpen(false);
      setEditingEntry(null);
      refetch();
    } catch (error: any) {
      ErrorSwal({
        title: "Error!",
        text: error?.data?.message || "Failed to update journal entry",
      });
      console.error("Failed to update:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteDailyJournalEntry(id).unwrap();
      SuccessSwal({
        title: "Success!",
        text: "Journal entry deleted successfully!",
      });
      refetch();
    } catch (error: any) {
      ErrorSwal({
        title: "Error!",
        text: error?.data?.message || "Failed to delete journal entry",
      });
      console.error("Failed to delete:", error);
    }
  };

  const isLoading = isCreating || isUnlocking;

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-1">
              Daily Journal
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Macro reflection & habit formation
            </p>
          </div>
          <div className="text-right space-y-2">
            {sessionState && (
              <div>
                <span
                  className={`px-3 py-1 rounded-lg text-xs font-medium ${getSessionStateStyles(sessionState)}`}
                >
                  Session State: {sessionState.toUpperCase()}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Daily Prompt */}
        <div className="bg-linear-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 rounded-lg p-5 border border-blue-100 dark:border-blue-900/50">
          <p className="text-sm font-medium text-blue-700 dark:text-blue-300 mb-2 flex items-center gap-2">
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              />
            </svg>
            Daily Prompt (System Generated)
          </p>
          <p className="text-lg text-gray-900 dark:text-gray-100 font-medium">
            What went well in your process today?
          </p>
        </div>

        {/* Reflection */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Reflection <span className="text-red-500">*</span>
          </label>
          <TextArea
            name="reflection"
            value={formData.reflection}
            onChange={handleInputChange}
            placeholder="Write your honest reflection..."
            rows={4}
            className="resize-none"
            disabled={isLoading}
            showCount
            maxLength={1000}
          />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Be honest with yourself - this is for your growth
          </p>
        </div>

        {/* Intention for Next Session */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Intention for Next Session <span className="text-red-500">*</span>
          </label>
          <TextArea
            name="intention_next_session"
            value={formData.intention_next_session}
            onChange={handleInputChange}
            placeholder="What's your focus for the next session? (e.g., Be patient, Follow stop loss, Wait for confirmation)"
            rows={3}
            className="resize-none"
            disabled={isLoading}
            showCount
            maxLength={500}
          />
        </div>

        {/* Limits Followed */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
            Limits Followed?
          </label>
          <div className="grid grid-cols-3 gap-3">
            <button
              type="button"
              onClick={() => handleLimitsFollowed("yes")}
              className={`px-4 py-2.5 rounded-lg font-medium transition-all duration-200 ${
                formData.limits_followed === "yes"
                  ? "bg-green-100 dark:bg-green-900/30 border-2 border-green-500 dark:border-green-400 text-green-700 dark:text-green-300 shadow-sm"
                  : "bg-gray-100 dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
              disabled={isLoading}
            >
              Yes
            </button>
            <button
              type="button"
              onClick={() => handleLimitsFollowed("mostly")}
              className={`px-4 py-2.5 rounded-lg font-medium transition-all duration-200 ${
                formData.limits_followed === "mostly"
                  ? "bg-yellow-100 dark:bg-yellow-900/30 border-2 border-yellow-500 dark:border-yellow-400 text-yellow-700 dark:text-yellow-300 shadow-sm"
                  : "bg-gray-100 dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
              disabled={isLoading}
            >
              Mostly
            </button>
            <button
              type="button"
              onClick={() => handleLimitsFollowed("no")}
              className={`px-4 py-2.5 rounded-lg font-medium transition-all duration-200 ${
                formData.limits_followed === "no"
                  ? "bg-red-100 dark:bg-red-900/30 border-2 border-red-500 dark:border-red-400 text-red-700 dark:text-red-300 shadow-sm"
                  : "bg-gray-100 dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
              disabled={isLoading}
            >
              No
            </button>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            Being honest about limits helps track your discipline over time
          </p>
        </div>

        {/* Save Button */}
        <Button
          type="primary"
          size="large"
          block
          onClick={handleSubmit}
          loading={isLoading}
          className="h-12! bg-blue-600! hover:bg-blue-700! dark:bg-blue-500! dark:hover:bg-blue-600! font-semibold! shadow-sm"
        >
          {isLoading
            ? isCreating
              ? "Saving Entry..."
              : "Unlocking Journal..."
            : "Save Journal Entry"}
        </Button>
      </div>

      <br />
      <br />

      {/* Show all journal entries with edit/delete */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
          Previous Journal Entries
        </h3>
        {data?.results?.map((journal: JournalEntry) => (
          <div
            key={journal.id}
            className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-3 group hover:shadow-sm transition-shadow"
          >
            {/* Header row with edit/delete buttons */}
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                    {new Date(journal.journal_date).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => handleEdit(journal)}
                  className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                  disabled={isDeleting || isUpdating}
                >
                  <EditOutlined className="text-gray-500 dark:text-gray-400 text-sm" />
                </button>
                <button
                  onClick={() => setDeleteModal({ open: true, id: journal.id })}
                  className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                  disabled={isDeleting || isUpdating}
                >
                  <DeleteOutlined className="text-red-500 dark:text-red-400 text-sm" />
                </button>
              </div>
            </div>

            {/* Content rows */}
            <div className="space-y-1.5 text-sm">
              <p className="text-gray-900 dark:text-gray-100">
                <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                  Prompt:{" "}
                </span>
                {journal.prompt_text}
              </p>
              <p className="text-gray-900 dark:text-gray-100">
                <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                  Reflection:{" "}
                </span>
                {journal.reflection || "-"}
              </p>
              <p className="text-gray-900 dark:text-gray-100">
                <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                  Intention:{" "}
                </span>
                {journal.intention_next_session || "-"}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                  Limits:{" "}
                </span>
                <span className="capitalize">
                  {journal.limits_followed || "-"}
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      <Modal
        title="Edit Journal Entry"
        open={isEditModalOpen}
        onCancel={() => {
          setIsEditModalOpen(false);
          setEditingEntry(null);
        }}
        footer={[
          <Button key="cancel" onClick={() => setIsEditModalOpen(false)}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={handleUpdate}
            loading={isUpdating}
            className="bg-blue-600! hover:bg-blue-700!"
          >
            Update
          </Button>,
        ]}
        width={600}
      >
        <div className="space-y-4 py-2">
          {/* Prompt (read-only) */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Prompt
            </label>
            <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-lg border border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                {editingEntry?.prompt_text}
              </p>
            </div>
          </div>

          {/* Reflection */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Reflection <span className="text-red-500">*</span>
            </label>
            <TextArea
              value={editFormData.reflection}
              onChange={(e) =>
                setEditFormData((prev) => ({
                  ...prev,
                  reflection: e.target.value,
                }))
              }
              placeholder="Write your honest reflection..."
              rows={4}
              showCount
              maxLength={1000}
            />
          </div>

          {/* Intention for Next Session */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Intention for Next Session <span className="text-red-500">*</span>
            </label>
            <TextArea
              value={editFormData.intention_next_session}
              onChange={(e) =>
                setEditFormData((prev) => ({
                  ...prev,
                  intention_next_session: e.target.value,
                }))
              }
              placeholder="What's your focus for the next session?"
              rows={3}
              showCount
              maxLength={500}
            />
          </div>

          {/* Limits Followed */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              Limits Followed?
            </label>
            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => handleEditLimitsFollowed("yes")}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  editFormData.limits_followed === "yes"
                    ? "bg-green-100 dark:bg-green-900/30 border-2 border-green-500 dark:border-green-400 text-green-700 dark:text-green-300"
                    : "bg-gray-100 dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
              >
                Yes
              </button>
              <button
                type="button"
                onClick={() => handleEditLimitsFollowed("mostly")}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  editFormData.limits_followed === "mostly"
                    ? "bg-yellow-100 dark:bg-yellow-900/30 border-2 border-yellow-500 dark:border-yellow-400 text-yellow-700 dark:text-yellow-300"
                    : "bg-gray-100 dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
              >
                Mostly
              </button>
              <button
                type="button"
                onClick={() => handleEditLimitsFollowed("no")}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  editFormData.limits_followed === "no"
                    ? "bg-red-100 dark:bg-red-900/30 border-2 border-red-500 dark:border-red-400 text-red-700 dark:text-red-300"
                    : "bg-gray-100 dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
              >
                No
              </button>
            </div>
          </div>
        </div>
      </Modal>

      <DeleteConfirmationModal
        open={deleteModal.open}
        loading={isDeleting}
        onCancel={() => setDeleteModal({ open: false, id: null })}
        onConfirm={() => {
          if (deleteModal.id) {
            handleDelete(deleteModal.id);
            setDeleteModal({ open: false, id: null });
          }
        }}
        title="Delete Journal Entry"
        description="Are you sure you want to delete this journal entry?"
      />
    </>
  );
}
