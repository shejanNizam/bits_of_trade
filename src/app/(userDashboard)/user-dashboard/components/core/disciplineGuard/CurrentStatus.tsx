"use client";

import { Modal } from "antd";
import { useState } from "react";
import { BiListCheck } from "react-icons/bi";
import { FaBrain } from "react-icons/fa";
import { FiAlertTriangle, FiTarget } from "react-icons/fi";
import { IoCloseOutline, IoLockClosedOutline } from "react-icons/io5";
import { MdOutlineWarningAmber } from "react-icons/md";

export default function CurrentStatus() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);
  const [isCheckComplete, setIsCheckComplete] = useState(false);

  // This data will come from backend later
  const statusData = {
    status: "yellow", // "green" | "yellow" | "red"
    activeRestrictions: [
      "Max position size reduced by 50%",
      "Requires checklist before entry",
    ],
    reasonsDetected: [
      {
        type: "Rule Violation",
        message: "Max Trades Per Day approached",
      },
    ],
    requiredActions: [
      { id: 1, label: "Complete Quick Journal", completed: false },
      { id: 2, label: "Review last trade", completed: false },
    ],
  };

  const questions = [
    {
      id: 1,
      text: "Are you emotionally calm and focused?",
      icon: <FaBrain className="text-purple-500" />,
    },
    {
      id: 2,
      text: "Have you reviewed your rules and limits?",
      icon: <BiListCheck className="text-orange-500" />,
    },
    {
      id: 3,
      text: "Is your setup valid according to your strategy?",
      icon: <FiAlertTriangle className="text-blue-500" />,
    },
    {
      id: 4,
      text: "Are you trading within position size limits?",
      icon: <FiTarget className="text-orange-500" />,
    },
    {
      id: 5,
      text: "Have you identified your exit plan?",
      icon: <FiAlertTriangle className="text-blue-500" />,
    },
  ];

  const statusConfig = {
    green: {
      label: "GREEN",
      bgColor: "bg-green-100 dark:bg-green-900/50",
      textColor: "text-green-700 dark:text-green-300",
    },
    yellow: {
      label: "YELLOW",
      bgColor: "bg-yellow-100 dark:bg-yellow-900/50",
      textColor: "text-yellow-700 dark:text-yellow-300",
    },
    red: {
      label: "RED",
      bgColor: "bg-red-100 dark:bg-red-900/50",
      textColor: "text-red-700 dark:text-red-300",
    },
  };

  const config = statusConfig[statusData.status as keyof typeof statusConfig];

  const handleQuestionClick = (questionId: number) => {
    if (completedQuestions.includes(questionId)) {
      setCompletedQuestions(
        completedQuestions.filter((id) => id !== questionId),
      );
    } else {
      const newCompleted = [...completedQuestions, questionId];
      setCompletedQuestions(newCompleted);

      // Check if all questions are completed
      if (newCompleted.length === questions.length) {
        setTimeout(() => {
          setIsCheckComplete(true);
        }, 300);
      }
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setCompletedQuestions([]);
      setIsCheckComplete(false);
    }, 300);
  };

  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-xl lg:rounded-2xl p-5 sm:p-6 border border-gray-200 dark:border-gray-700">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100">
            Current Status
          </h3>
          <div
            className={`${config.bgColor} ${config.textColor} px-3 py-1 rounded-lg text-xs sm:text-sm font-bold uppercase`}
          >
            {config.label}
          </div>
        </div>

        {/* Active Restrictions */}
        <div className="mb-6">
          <h4 className="text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
            Active Restrictions
          </h4>
          <div className="space-y-2">
            {statusData.activeRestrictions.map((restriction, index) => (
              <div
                key={index}
                className="flex items-start gap-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400"
              >
                <IoLockClosedOutline className="text-orange-500 dark:text-orange-400 text-base shrink-0 mt-0.5" />
                <span>{restriction}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Reasons Detected */}
        <div className="mb-6">
          <h4 className="text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
            Reasons Detected
          </h4>
          {statusData.reasonsDetected.map((reason, index) => (
            <div
              key={index}
              className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 rounded-lg p-3"
            >
              <div className="flex items-start gap-2">
                <MdOutlineWarningAmber className="text-red-600 dark:text-red-400 text-base shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs sm:text-sm font-medium text-red-800 dark:text-red-300">
                    {reason.type}: {reason.message}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Required Actions */}
        <div className="mb-6">
          <h4 className="text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
            Required Actions
          </h4>
          <div className="space-y-2">
            {statusData.requiredActions.map((action) => (
              <label
                key={action.id}
                className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
              >
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
                  defaultChecked={action.completed}
                />
                <span className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                  {action.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 text-white rounded-lg py-3 px-4 font-semibold text-sm sm:text-base transition-colors"
          >
            Complete
          </button>
          <button className="w-full bg-white dark:bg-gray-900/50 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg py-3 px-4 font-medium text-sm sm:text-base transition-colors">
            Edit Rules & Limit
          </button>
        </div>
      </div>

      {/* Quick Discipline Check Modal */}
      <Modal
        open={isModalOpen}
        onCancel={handleModalClose}
        footer={null}
        width={500}
        closeIcon={
          <IoCloseOutline className="text-gray-500 dark:text-gray-400 text-xl" />
        }
        modalRender={(modal) => (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl">
            {modal}
          </div>
        )}
      >
        <div className="p-2">
          {!isCheckComplete ? (
            <>
              {/* Modal Header */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                  Quick Discipline Check
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Answer these questions honestly before your next trade. This
                  protects you from impulsive decisions.
                </p>
              </div>

              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                    Progress
                  </span>
                  <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                    {completedQuestions.length}/{questions.length}
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-gray-800 dark:bg-gray-400 h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${(completedQuestions.length / questions.length) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>

              {/* Questions */}
              <div className="space-y-3 mb-6">
                {questions.map((question) => (
                  <button
                    key={question.id}
                    onClick={() => handleQuestionClick(question.id)}
                    className={`w-full flex items-center gap-3 p-4 border-2 rounded-xl transition-all text-left ${
                      completedQuestions.includes(question.id)
                        ? "border-green-500 dark:border-green-400 bg-green-50 dark:bg-green-950/30"
                        : "border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                        completedQuestions.includes(question.id)
                          ? "border-green-500 dark:border-green-400 bg-green-500 dark:bg-green-400"
                          : "border-gray-400 dark:border-gray-500"
                      }`}
                    >
                      {completedQuestions.includes(question.id) && (
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 12 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M2 6L5 9L10 3"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </div>
                    <span className="flex-1 text-sm text-gray-900 dark:text-gray-100">
                      {question.text}
                    </span>
                    <div className="text-xl shrink-0">{question.icon}</div>
                  </button>
                ))}
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-end gap-3">
                <button
                  onClick={handleModalClose}
                  className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={completedQuestions.length !== questions.length}
                >
                  {completedQuestions.length}/{questions.length} Complete
                </button>
              </div>
            </>
          ) : (
            <>
              {/* Success State */}
              <div className="text-center py-8">
                <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 40 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-green-600 dark:text-green-400"
                  >
                    <path
                      d="M12 20L18 26L28 14"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                  Quick Check Complete!
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {"You're"} cleared to trade. Stay disciplined.
                </p>
              </div>
            </>
          )}
        </div>
      </Modal>
    </>
  );
}
