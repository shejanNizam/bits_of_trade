/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  useDeleteAddNoteMutation,
  useGetAllAddNoteQuery,
} from "@/redux/features/journal/journalApi";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { message, Tag } from "antd";
import { useState } from "react";
import { IoAddOutline } from "react-icons/io5";
import AddTradeNoteModal from "./AddTradeNoteModal";
import DeleteConfirmationModal from "@/components/shared/DeleteConfirmationModal";

interface TradeNote {
  id: string;
  trade_type: "win" | "loss" | null;
  symbol: string | null;
  trade_date: string | null;
  trade_time: string | null;
  pnl_amount: string | null;
  description: string;
  tags: string[];
  created_at: string;
  updated_at: string;
  user: number;
}

export default function TradeNotes() {
  const [isAddNoteModalOpen, setIsAddNoteModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<TradeNote | null>(null);
  const [deleteModal, setDeleteModal] = useState<{
    open: boolean;
    id: string | null;
  }>({
    open: false,
    id: null,
  });

  // Fetch all trade notes
  const {
    data: notesData,
    isLoading,
    refetch,
  } = useGetAllAddNoteQuery({
    page: 1,
    limit: 100,
  });
  const [deleteAddNote, { isLoading: isDeleting }] = useDeleteAddNoteMutation();

  const notes = notesData?.results || [];

  const handleEdit = (note: TradeNote) => {
    setEditingNote(note);
    setIsAddNoteModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteAddNote(id).unwrap();
      message.success("Trade note deleted successfully!");
      refetch();
    } catch (error: any) {
      message.error(error?.data?.message || "Failed to delete trade note");
      console.error("Failed to delete trade note:", error);
    }
  };

  const handleModalClose = () => {
    setIsAddNoteModalOpen(false);
    setEditingNote(null);
    refetch();
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatTime = (timeString: string | null) => {
    if (!timeString) return "N/A";
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };

  const formatPnl = (pnl: string | null, type: string | null) => {
    if (!pnl) return "N/A";
    const isWin = type === "win";
    const prefix = isWin ? "+" : "-";
    return `${prefix}${pnl}`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-1">
            Trade Notes
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Per-trade narrative and analysis
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
            Loading trade notes...
          </p>
        </div>
      )}

      {/* Notes List */}
      {!isLoading && notes.length > 0 && (
        <div className="space-y-4">
          {notes.map((note: TradeNote) => (
            <div
              key={note.id}
              className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-4 border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <Tag
                    color={
                      note.trade_type === "win"
                        ? "green"
                        : note.trade_type === "loss"
                          ? "red"
                          : "default"
                    }
                    className="text-xs font-bold"
                  >
                    {note.trade_type ? note.trade_type.toUpperCase() : "N/A"}
                  </Tag>
                  <div>
                    <h3 className="text-base font-bold text-gray-900 dark:text-gray-100">
                      {note.symbol || "No Symbol"}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {formatDate(note.trade_date)} •{" "}
                      {formatTime(note.trade_time)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`text-base font-bold ${
                      note.trade_type === "win"
                        ? "text-green-600 dark:text-green-400"
                        : note.trade_type === "loss"
                          ? "text-red-600 dark:text-red-400"
                          : "text-gray-600 dark:text-gray-400"
                    }`}
                  >
                    {formatPnl(note.pnl_amount, note.trade_type)}
                  </span>
                  <button
                    onClick={() => handleEdit(note)}
                    className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors"
                    disabled={isDeleting}
                  >
                    <EditOutlined className="text-gray-500 dark:text-gray-400" />
                  </button>
                  <button
                    onClick={() => setDeleteModal({ open: true, id: note.id })}
                    className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors"
                    disabled={isDeleting}
                  >
                    <DeleteOutlined className="text-red-500 dark:text-red-400" />
                  </button>
                </div>
              </div>

              {note.description && (
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                  {note.description}
                </p>
              )}

              {note.tags && note.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {note.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && notes.length === 0 && (
        <div className="text-center py-8 bg-gray-50 dark:bg-gray-900/30 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-700">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Add a new trade note to track your execution and thought process
          </p>
        </div>
      )}

      <AddTradeNoteModal
        open={isAddNoteModalOpen}
        onClose={handleModalClose}
        editingNote={editingNote}
      />

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
        title="Delete Trade Note"
        description="Are you sure you want to delete this trade note?"
      />
    </div>
  );
}
