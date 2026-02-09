"use client";

import {
  CheckCircleFilled,
  ClockCircleOutlined,
  CloseOutlined,
  LockOutlined,
  PlayCircleFilled,
} from "@ant-design/icons";
import { Modal, Progress } from "antd";
import { LearningPath } from "./AllLearningPaths";

interface LearningPathModalProps {
  path: LearningPath | null;
  open: boolean;
  onClose: () => void;
}

// Internal interface for module state
interface ModuleItem {
  id: number;
  title: string;
  time: string;
  status: "Completed" | "Current" | "Locked";
}

export default function LearningPathModal({
  path,
  open,
  onClose,
}: LearningPathModalProps) {
  if (!path) return null;

  const percentage = Math.round((path.completed / path.modules) * 100);

  // Mock data mapped to the UI requirements
  const modules: ModuleItem[] = [
    {
      id: 1,
      title: "Introduction to Risk",
      time: "13 min",
      status: "Completed",
    },
    { id: 2, title: "Position Sizing", time: "12 min", status: "Completed" },
    {
      id: 3,
      title: "Stop Loss Placement",
      time: "12 min",
      status: "Completed",
    },
    { id: 4, title: "Risk-Reward Ratios", time: "9 min", status: "Completed" },
    { id: 5, title: "Portfolio Risk", time: "16 min", status: "Completed" },
    { id: 6, title: "Drawdown Management", time: "5 min", status: "Current" },
    { id: 7, title: "Risk Psychology", time: "6 min", status: "Locked" },
    {
      id: 8,
      title: "Advanced Risk Techniques",
      time: "17 min",
      status: "Locked",
    },
  ];

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      width={650}
      centered
      closeIcon={
        <CloseOutlined className="text-slate-400 dark:text-slate-500 mt-2 mr-2" />
      }
      styles={{
        body: { padding: 0 },
      }}
      className="dark:ant-modal-dark rounded-2xl overflow-hidden"
    >
      <div className="transition-colors duration-300">
        {/* Header Section */}
        <div className="p-6 sm:p-8 border-b border-slate-100 dark:border-slate-800">
          <div className="flex gap-2 mb-4">
            <span
              className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide ${path.color}`}
            >
              {path.tag}
            </span>
            <span className="bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wide">
              {path.level}
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-2">
            {path.title}
          </h2>

          <div className="flex gap-4 text-xs sm:text-sm text-slate-400 dark:text-slate-500 font-medium">
            <span className="flex items-center gap-1">
              📖 {path.modules} modules
            </span>
            <span className="flex items-center gap-1">
              <ClockCircleOutlined /> {path.time}
            </span>
          </div>
        </div>

        <div className="p-6 sm:p-8 space-y-6 sm:space-y-8">
          {/* Progress Card */}
          <div className="bg-teal-50/50 dark:bg-teal-900/10 border border-teal-100 dark:border-teal-900/20 rounded-xl p-5">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-bold text-slate-900 dark:text-white">
                Your Progress
              </span>
              <span className="text-xs sm:text-sm font-bold text-slate-600 dark:text-slate-400">
                {path.completed} / {path.modules} completed
              </span>
            </div>
            <Progress
              percent={percentage}
              strokeColor="#14b8a6"
              trailColor="rgba(20, 184, 166, 0.1)"
              showInfo={false}
              className="mb-2"
            />
            <p className="text-[11px] sm:text-xs text-teal-600 dark:text-teal-400 font-medium">
              {Math.max(0, 100 - percentage)}% remaining to complete this
              learning path
            </p>
          </div>

          {/* About Section */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 font-sans">
              About This Course
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              A comprehensive course covering all aspects of risk management
              from position sizing to drawdown recovery. Essential for any
              serious trader looking to protect and grow their capital
              consistently.
            </p>
          </div>

          {/* Module List */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
              Course Modules
            </h3>
            <div className="space-y-2.5 max-h-75 overflow-y-auto pr-2 custom-scrollbar">
              {modules.map((mod) => (
                <div
                  key={mod.id}
                  className={`flex items-center justify-between p-3 sm:p-4 rounded-xl border transition-all duration-200 ${
                    mod.status === "Completed"
                      ? "bg-emerald-50/30 dark:bg-emerald-900/10 border-emerald-100 dark:border-emerald-900/20"
                      : mod.status === "Current"
                        ? "bg-white dark:bg-slate-900 border-indigo-200 dark:border-indigo-800 shadow-sm"
                        : "bg-slate-50/50 dark:bg-slate-900/40 border-slate-100 dark:border-slate-800 opacity-60"
                  }`}
                >
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div
                      className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shrink-0 ${
                        mod.status === "Completed"
                          ? "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600"
                          : mod.status === "Current"
                            ? "bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600"
                            : "bg-slate-100 dark:bg-slate-800 text-slate-400"
                      }`}
                    >
                      {mod.status === "Completed" ? (
                        <CheckCircleFilled className="text-lg sm:text-xl" />
                      ) : mod.status === "Current" ? (
                        <PlayCircleFilled className="text-lg sm:text-xl" />
                      ) : (
                        <LockOutlined className="text-sm" />
                      )}
                    </div>
                    <div>
                      <h4
                        className={`text-xs sm:text-sm font-bold leading-tight ${mod.status === "Locked" ? "text-slate-400 dark:text-slate-600" : "text-slate-900 dark:text-slate-200"}`}
                      >
                        Module {mod.id}: {mod.title}
                      </h4>
                      <span className="text-[10px] sm:text-xs text-slate-400 dark:text-slate-500">
                        {mod.time}
                      </span>
                    </div>
                  </div>
                  <span
                    className={`text-[9px] sm:text-[10px] font-bold uppercase tracking-tight ${
                      mod.status === "Completed"
                        ? "text-emerald-500"
                        : mod.status === "Locked"
                          ? "text-slate-300 dark:text-slate-600"
                          : "hidden"
                    }`}
                  >
                    {mod.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Responsive Footer Actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={onClose}
              className="order-2 sm:order-1 flex-1 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-bold text-sm hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              Close
            </button>
            <button className="order-1 sm:order-2 flex-2 py-3 rounded-xl bg-indigo-600 dark:bg-indigo-500 text-white font-bold text-sm hover:bg-indigo-700 shadow-lg shadow-indigo-200 dark:shadow-none transition-all flex items-center justify-center gap-2">
              <PlayCircleFilled />
              {path.completed > 0 ? "Continue Learning" : "Start Learning"}
            </button>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 10px;
        }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #334155;
        }
        .dark .ant-modal-content {
          background-color: #0f172a !important;
        }
      `}</style>
    </Modal>
  );
}
