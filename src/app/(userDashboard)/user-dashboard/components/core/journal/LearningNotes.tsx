/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  useDeleteLearningNotesMutation,
  useGetAllLearningNotesQuery,
} from "@/redux/features/journal/journalApi";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { message, Popconfirm } from "antd";
import { useState } from "react";
import { IoAddOutline } from "react-icons/io5";
import AddLearningNoteModal from "./AddLearningNoteModal";

interface LearningNote {
  id: string;
  lesson_source: string;
  key_takeaway: string;
  application_plan: string;
  linked_type: "mistake" | "rule" | "strategy" | "none";
  created_at: string;
  user: number;
}

export default function LearningNotes() {
  const [isAddNoteModalOpen, setIsAddNoteModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<LearningNote | null>(null);

  // API hooks
  const {
    data: notesData,
    isLoading,
    refetch,
  } = useGetAllLearningNotesQuery({
    page: 1,
    limit: 100,
  });
  const [deleteLearningNotes, { isLoading: isDeleting }] =
    useDeleteLearningNotesMutation();

  const notes = notesData?.results || [];

  const handleEdit = (note: LearningNote) => {
    setEditingNote(note);
    setIsAddNoteModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteLearningNotes(id).unwrap();
      message.success("Learning note deleted successfully!");
      refetch();
    } catch (error: any) {
      message.error(error?.data?.message || "Failed to delete learning note");
      console.error("Failed to delete learning note:", error);
    }
  };

  const handleModalClose = () => {
    setIsAddNoteModalOpen(false);
    setEditingNote(null);
    refetch();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getTagColor = (linkedType: string) => {
    switch (linkedType) {
      case "mistake":
        return "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300";
      case "rule":
        return "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300";
      case "strategy":
        return "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300";
      default:
        return "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400";
    }
  };

  const getBorderColor = (linkedType: string) => {
    switch (linkedType) {
      case "mistake":
        return "#ef4444"; // Red
      case "rule":
        return "#3b82f6"; // Blue
      case "strategy":
        return "#8b5cf6"; // Purple
      default:
        return "#6b7280"; // Gray
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-1">
            Learning Notes
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Close the learning loop
          </p>
        </div>
        <button
          onClick={() => {
            setEditingNote(null);
            setIsAddNoteModalOpen(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 dark:bg-green-500 text-white rounded-lg hover:bg-green-700 dark:hover:bg-green-600 transition-colors font-medium text-sm"
        >
          <IoAddOutline className="text-lg" />
          <span>Add Note</span>
        </button>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="text-center py-8">
          <p className="text-gray-500 dark:text-gray-400">
            Loading learning notes...
          </p>
        </div>
      )}

      {/* Learning Notes List */}
      {!isLoading && notes.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
            Learning Notes
          </h3>
          <div className="space-y-3">
            {notes.map((note: LearningNote) => (
              <div
                key={note.id}
                className="border-l-4 pl-4 py-2"
                style={{
                  borderColor: getBorderColor(note.linked_type || "none"),
                }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">
                      {formatDate(note.created_at)}
                    </p>
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-1">
                      {note.lesson_source}
                    </p>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                      {note.key_takeaway}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      {note.application_plan}
                    </p>
                    {note.linked_type && note.linked_type !== "none" && (
                      <div className="flex flex-wrap gap-2">
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium uppercase ${getTagColor(
                            note.linked_type,
                          )}`}
                        >
                          {note.linked_type}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <button
                      onClick={() => handleEdit(note)}
                      className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors"
                      disabled={isDeleting}
                    >
                      <EditOutlined className="text-gray-500 dark:text-gray-400" />
                    </button>
                    <Popconfirm
                      title="Delete Learning Note"
                      description="Are you sure you want to delete this learning note?"
                      onConfirm={() => handleDelete(note.id)}
                      okText="Yes"
                      cancelText="No"
                      okButtonProps={{ loading: isDeleting }}
                    >
                      <button
                        className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors"
                        disabled={isDeleting}
                      >
                        <DeleteOutlined className="text-red-500 dark:text-red-400" />
                      </button>
                    </Popconfirm>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && notes.length === 0 && (
        <div className="text-center py-8 bg-gray-50 dark:bg-gray-900/30 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-700">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Add a new learning note to track your insights and growth
          </p>
        </div>
      )}

      <AddLearningNoteModal
        open={isAddNoteModalOpen}
        onClose={handleModalClose}
        editingNote={editingNote}
      />
    </div>
  );
}
