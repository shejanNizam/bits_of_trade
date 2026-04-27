/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

"use client";

import {
  useGetCurrentSessionQuery,
  useUnlockJournalMutation,
} from "@/redux/features/discipline/disciplineApi";
import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { message, Modal } from "antd";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BiListCheck } from "react-icons/bi";
import { FaBrain } from "react-icons/fa";
import { FiAlertTriangle, FiTarget } from "react-icons/fi";
import { IoCloseOutline, IoLockClosedOutline } from "react-icons/io5";
import { MdOutlineWarningAmber } from "react-icons/md";

export default function CurrentStatus() {
  const { user } = useAppSelector((state: RootState) => state.auth);

  // Fetch current session data
  const { data: sessionData, refetch: refetchSession } =
    useGetCurrentSessionQuery({});
  const [unlockJournal, { isLoading: isUnlocking }] =
    useUnlockJournalMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);
  const [isCheckComplete, setIsCheckComplete] = useState(false);

  // Cooldown modal state
  const [isCooldownModalOpen, setIsCooldownModalOpen] = useState(false);
  const [cooldownMessage, setCooldownMessage] = useState("");
  const [cooldownSeconds, setCooldownSeconds] = useState(0);
  const [cooldownEndsAt, setCooldownEndsAt] = useState<string | null>(null);

  // Local state for review last trade checkbox (no API call)
  const [localTradeReviewCompleted, setLocalTradeReviewCompleted] =
    useState(false);

  // Get session state from API response
  const sessionState = sessionData?.session_state || "green";

  // Get session data from API response
  const sessionViolations = sessionData?.session || null;

  // Get journal completed status from API response
  const journalCompleted = sessionData?.journal_completed || false;
  const tagAllMistake = sessionData?.trades_tag_status?.all_tagged || false;
  const tradeReviewCompleted = sessionData?.trade_review_completed || false;

  // For UI - use local state for checkbox, but show actual status from API if already completed
  const showTradeReviewChecked =
    tradeReviewCompleted || localTradeReviewCompleted;

  // Get cooldown ends at from session data
  const sessionCooldownEndsAt = sessionViolations?.cooldown_ends_at || null;

  // Real-time countdown for the main UI
  const [remainingTimeText, setRemainingTimeText] = useState<string>("");

  // Real-time countdown timer effect for main UI
  useEffect(() => {
    if (!sessionCooldownEndsAt) {
      setRemainingTimeText("");
      return;
    }

    const updateMainTimer = () => {
      const now = new Date();
      const endTime = new Date(sessionCooldownEndsAt);
      const remainingMs = endTime.getTime() - now.getTime();

      if (remainingMs <= 0) {
        setRemainingTimeText("");
        refetchSession(); // Refresh to get updated status
        return;
      }

      const remainingSeconds = Math.floor(remainingMs / 1000);
      const minutes = Math.floor(remainingSeconds / 60);
      const seconds = remainingSeconds % 60;

      if (minutes > 0) {
        setRemainingTimeText(`${minutes}m ${seconds}s remaining`);
      } else {
        setRemainingTimeText(`${seconds}s remaining`);
      }
    };

    updateMainTimer();
    const interval = setInterval(updateMainTimer, 1000);
    return () => clearInterval(interval);
  }, [sessionCooldownEndsAt, refetchSession]);

  // Real-time countdown timer effect for modal
  useEffect(() => {
    if (!isCooldownModalOpen || !cooldownEndsAt) return;

    const updateTimer = () => {
      const now = new Date();
      const endTime = new Date(cooldownEndsAt);
      const remainingMs = endTime.getTime() - now.getTime();

      if (remainingMs <= 0) {
        // Cooldown finished
        setIsCooldownModalOpen(false);
        setCooldownMessage("");
        setCooldownSeconds(0);
        setCooldownEndsAt(null);
        refetchSession(); // Refresh session data
        return;
      }

      const remainingSeconds = Math.floor(remainingMs / 1000);
      setCooldownSeconds(remainingSeconds);

      // Update message with remaining time
      const minutes = Math.floor(remainingSeconds / 60);
      const seconds = remainingSeconds % 60;
      if (minutes > 0) {
        setCooldownMessage(
          `Cooldown active. ${minutes} minute(s) and ${seconds} second(s) remaining.`,
        );
      } else {
        setCooldownMessage(`Cooldown active. ${seconds} second(s) remaining.`);
      }
    };

    // Update immediately
    updateTimer();

    // Set interval to update every second
    const interval = setInterval(updateTimer, 1000);

    // Cleanup interval on unmount or modal close
    return () => clearInterval(interval);
  }, [isCooldownModalOpen, cooldownEndsAt, refetchSession]);

  // Dynamic status data based on API response
  const getStatusData = () => {
    const violationsCount = sessionData?.violations_count || 0;
    const hardViolations = sessionData?.hard_violations || 0;

    if (sessionState === "red") {
      return {
        activeRestrictions: [
          "Trading is temporarily blocked",
          "Max position size reduced by 100%",
          "Requires mandatory cooldown period",
        ],
        reasonsDetected: [
          {
            type: "Rule Violation",
            message: `${violationsCount} rule violation${violationsCount !== 1 ? "s" : ""} detected`,
          },
          {
            type: "Hard Violations",
            message: `${hardViolations} hard violation${hardViolations !== 1 ? "s" : ""} recorded`,
          },
        ],
        requiredActions: [
          {
            id: 1,
            label: "Complete Quick Journal",
            completed: journalCompleted,
          },
          {
            id: 2,
            label: "Review last trade",
            completed: showTradeReviewChecked,
          },
        ],
      };
    }

    if (sessionState === "yellow") {
      return {
        activeRestrictions: [
          "Max position size reduced by 50%",
          "Requires checklist before entry",
          "Max 3 trades per day",
        ],
        reasonsDetected: [
          {
            type: "Rule Violation",
            message: `${violationsCount} rule violation${violationsCount !== 1 ? "s" : ""} detected`,
          },
          {
            type: "Warning",
            message: "Approaching daily trade limits",
          },
        ],
        requiredActions: [
          {
            id: 1,
            label: "Complete Quick Journal",
            completed: journalCompleted,
          },
          {
            id: 2,
            label: "Review last trade",
            completed: showTradeReviewChecked,
          },
        ],
      };
    }

    // Green status
    return {
      activeRestrictions: [],
      reasonsDetected: [],
      requiredActions: [],
    };
  };

  const statusData = getStatusData();

  // Check if all required actions are completed
  const areAllActionsCompleted = () => {
    if (statusData.requiredActions.length === 0) return true;
    return statusData.requiredActions.every((action) => action.completed);
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

  // Status configuration based on session_state
  const getStatusConfig = (state: string) => {
    switch (state) {
      case "green":
        return {
          label: "GREEN",
          bgColor: "bg-green-100 dark:bg-green-900/50",
          textColor: "text-green-700 dark:text-green-300",
        };
      case "yellow":
        return {
          label: "YELLOW",
          bgColor: "bg-yellow-100 dark:bg-yellow-900/50",
          textColor: "text-yellow-700 dark:text-yellow-300",
        };
      case "red":
        return {
          label: "RED",
          bgColor: "bg-red-100 dark:bg-red-900/50",
          textColor: "text-red-700 dark:text-red-300",
        };
      default:
        return {
          label: "GREEN",
          bgColor: "bg-green-100 dark:bg-green-900/50",
          textColor: "text-green-700 dark:text-green-300",
        };
    }
  };

  const config = getStatusConfig(sessionState);

  // Handle Review last trade checkbox - just local state, no API call
  const handleTradeReviewChange = (checked: boolean) => {
    setLocalTradeReviewCompleted(checked);
  };

  // Handle modal submit button - call unlock API here
  const handleModalSubmit = async () => {
    try {
      // Call unlock API when submitting the modal
      const response = await unlockJournal({
        action: "complete_trade_review",
      }).unwrap();

      console.log(response);

      // Check if response contains cooldown message
      if (response.message && response.message.includes("Cooldown active")) {
        // Show cooldown modal
        setCooldownMessage(response.message);
        setCooldownEndsAt(response.cooldown_ends_at);
        setIsCooldownModalOpen(true);

        // Close the discipline check modal
        setIsModalOpen(false);
        setCompletedQuestions([]);
        setIsCheckComplete(false);
        setLocalTradeReviewCompleted(false);

        message.info(response.message);
      } else {
        // Success - no cooldown
        message.success(
          response.message || "Trade review completed successfully!",
        );
        setLocalTradeReviewCompleted(false);
        refetchSession();
        setIsModalOpen(false);
        setCompletedQuestions([]);
        setIsCheckComplete(false);
      }
    } catch (error: any) {
      // Check if error contains cooldown message
      if (
        error?.data?.message &&
        error.data.message.includes("Cooldown active")
      ) {
        setCooldownMessage(error.data.message);
        setCooldownEndsAt(error.data.cooldown_ends_at);
        setIsCooldownModalOpen(true);
        setIsModalOpen(false);
        setCompletedQuestions([]);
        setIsCheckComplete(false);
        setLocalTradeReviewCompleted(false);
      } else {
        message.error(
          error?.data?.message || "Failed to complete trade review",
        );
      }
    }
  };

  const handleQuestionClick = (questionId: number) => {
    if (completedQuestions.includes(questionId)) {
      setCompletedQuestions(
        completedQuestions.filter((id) => id !== questionId),
      );
    } else {
      const newCompleted = [...completedQuestions, questionId];
      setCompletedQuestions(newCompleted);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setCompletedQuestions([]);
      setIsCheckComplete(false);
      setLocalTradeReviewCompleted(false);
    }, 300);
  };

  const handleCooldownModalClose = () => {
    setIsCooldownModalOpen(false);
    setCooldownMessage("");
    setCooldownSeconds(0);
    setCooldownEndsAt(null);
  };

  const handleCompleteButtonClick = () => {
    // Check if all questions are answered
    if (completedQuestions.length === questions.length) {
      // Call the API on modal submit
      handleModalSubmit();
    }
  };

  // Check if all questions are completed
  const allQuestionsCompleted = completedQuestions.length === questions.length;

  // Check if the Complete button should be disabled (in main card)
  const isCompleteButtonDisabled = !areAllActionsCompleted();

  // Format time display
  const formatTimeDisplay = () => {
    const minutes = Math.floor(cooldownSeconds / 60);
    const seconds = cooldownSeconds % 60;

    if (minutes > 0) {
      return `${minutes}:${seconds.toString().padStart(2, "0")}`;
    }
    return `${seconds} seconds`;
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
        {statusData.activeRestrictions.length > 0 && (
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
        )}

        {/* Reasons Detected */}
        {statusData.reasonsDetected.length > 0 && (
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
        )}

        {/* Required Actions with Countdown */}
        {statusData.requiredActions.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300">
                Required Actions
              </h4>
              {/* Countdown Timer beside the title */}
              {remainingTimeText && (
                <div className="flex items-center gap-1.5 px-2 py-1 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                  <svg
                    className="w-3 h-3 text-orange-600 dark:text-orange-400 animate-pulse"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="text-xs font-medium text-orange-700 dark:text-orange-300">
                    {remainingTimeText}
                  </span>
                </div>
              )}
            </div>
            <div className="space-y-2">
              {/* Complete Quick Journal - Static checkbox, no API call */}
              <label className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-lg cursor-not-allowed opacity-75">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-blue-600"
                  checked={journalCompleted}
                  disabled={true}
                />
                <span className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                  Complete Quick Journal
                </span>
              </label>
              <label className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-lg cursor-not-allowed opacity-75">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-blue-600"
                  checked={tagAllMistake}
                  disabled={true}
                />
                <span className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                  Tags all mistake
                </span>
              </label>

              {/* Review last trade - Checkbox with local state only, no API call */}
              <label className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
                  checked={showTradeReviewChecked}
                  onChange={(e) => handleTradeReviewChange(e.target.checked)}
                  disabled={tradeReviewCompleted}
                />
                <span className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                  Review last trade
                </span>
              </label>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-2">
          {statusData.requiredActions.length > 0 && (
            <button
              onClick={() => setIsModalOpen(true)}
              disabled={isCompleteButtonDisabled}
              className={`w-full rounded-lg py-3 px-4 font-semibold text-sm sm:text-base transition-colors ${
                isCompleteButtonDisabled
                  ? "bg-gray-400 dark:bg-gray-600 cursor-not-allowed text-white"
                  : "bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 text-white"
              }`}
            >
              Complete
            </button>
          )}
          <Link href="/user-dashboard/rules-limit">
            <button className="w-full bg-white dark:bg-gray-900/50 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg py-3 px-4 font-medium text-sm sm:text-base transition-colors">
              Edit Rules & Limit
            </button>
          </Link>
        </div>

        {/* Green Status Message */}
        {sessionState === "green" &&
          statusData.requiredActions.length === 0 && (
            <div className="mt-4 p-3 bg-green-50 dark:bg-green-950/30 rounded-lg text-center">
              <p className="text-sm text-green-700 dark:text-green-300">
                {"✓ All systems normal. You're cleared to trade."}
              </p>
            </div>
          )}
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
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              Quick Discipline Check
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Answer these questions honestly before your next trade. This
              protects you from impulsive decisions.
            </p>
          </div>

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

          <div className="flex items-center justify-end gap-3">
            <button
              onClick={handleModalClose}
              className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleCompleteButtonClick}
              disabled={!allQuestionsCompleted || isUnlocking}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                !allQuestionsCompleted || isUnlocking
                  ? "bg-gray-300 dark:bg-gray-600 cursor-not-allowed text-gray-500 dark:text-gray-400"
                  : "bg-blue-600 dark:bg-blue-500 text-white hover:bg-blue-700 dark:hover:bg-blue-600"
              }`}
            >
              {isUnlocking ? "Submitting..." : "Submit"}
            </button>
          </div>
        </div>
      </Modal>

      {/* Cooldown Timer Modal - Now closable */}
      <Modal
        open={isCooldownModalOpen}
        onCancel={handleCooldownModalClose}
        footer={null}
        width={450}
        closable={true}
        maskClosable={true}
        closeIcon={
          <IoCloseOutline className="text-gray-500 dark:text-gray-400 text-xl hover:text-gray-700 dark:hover:text-gray-200" />
        }
        modalRender={(modal) => (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl">
            {modal}
          </div>
        )}
      >
        <div className="p-6 text-center">
          {/* Warning Icon */}
          <div className="mb-4 flex justify-center">
            <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center">
              <IoLockClosedOutline className="text-orange-600 dark:text-orange-400 text-3xl" />
            </div>
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Cooldown Active
          </h3>

          {/* Message */}
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {cooldownMessage}
          </p>

          {/* Timer Display */}
          <div className="mb-6">
            <div className="inline-flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-lg px-6 py-3">
              <div className="text-center">
                <div className="text-3xl font-bold font-mono text-gray-900 dark:text-gray-100">
                  {formatTimeDisplay()}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Remaining Time
                </div>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
              <div
                className="bg-orange-500 dark:bg-orange-400 h-2 rounded-full transition-all duration-1000"
                style={{
                  width: `${(cooldownSeconds / (parseInt(cooldownMessage.match(/\d+/)?.[0] || "60") * 60)) * 100}%`,
                }}
              />
            </div>
          </div>

          {/* Info Text */}
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
            {
              "Please wait while the cooldown period ends. You'll be able to trade again automatically."
            }
          </p>

          {/* Cancel Button */}
          <button
            onClick={handleCooldownModalClose}
            className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors text-sm font-medium"
          >
            Close
          </button>
        </div>
      </Modal>
    </>
  );
}
