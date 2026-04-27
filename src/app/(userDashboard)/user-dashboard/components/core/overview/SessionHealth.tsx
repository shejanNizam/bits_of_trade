"use client";

import { RootState } from "@/redux/store";
import { User } from "@/types/auth";
import { IoCheckmarkCircle, IoCloseCircle } from "react-icons/io5";
import { useSelector } from "react-redux";

interface SessionHealthProps {
  sessionHealth?: {
    status: string;
    color: string;
    tradesToday: number;
    rulesViolated: number;
    mistakesLogged: number;
    journalCompleted: boolean;
  };
}

export default function SessionHealth({ sessionHealth }: SessionHealthProps) {
  const user = useSelector((state: RootState) => state.auth.user) as User | null;

  const healthData = sessionHealth || {
    status: "green",
    tradesToday: 0,
    rulesViolated: 0,
    mistakesLogged: 0,
    journalCompleted: false,
  };

  const sessionState = (
    user?.session_state ||
    healthData.status ||
    "green"
  ).toLowerCase() as "green" | "yellow" | "red";

  const statusConfig = {
    green: {
      label: "Green",
      bgColor: "bg-green-100 dark:bg-green-900/50",
      textColor: "text-green-700 dark:text-green-300",
    },
    yellow: {
      label: "Yellow",
      bgColor: "bg-yellow-100 dark:bg-yellow-900/50",
      textColor: "text-yellow-700 dark:text-yellow-300",
    },
    red: {
      label: "Red",
      bgColor: "bg-red-100 dark:bg-red-900/50",
      textColor: "text-red-700 dark:text-red-300",
    },
  };

  const config = statusConfig[sessionState] || statusConfig.green;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl lg:rounded-2xl p-5 sm:p-6 border border-gray-200 dark:border-gray-700">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 sm:mb-8">
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100">
          Session Health
        </h3>
        <div
          className={`${config.bgColor} ${config.textColor} px-3 py-1 rounded-full text-xs sm:text-sm font-medium`}
        >
          {config.label}
        </div>
      </div>
      {/*  */}

      {/* Health Metrics */}
      <div className="space-y-4 sm:space-y-5">
        {/* Trades Today */}
        <div className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-700">
          <span className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
            Trades Today
          </span>
          <span className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100">
            {healthData.tradesToday}
          </span>
        </div>

        {/* Rules Violated */}
        <div className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-700">
          <span className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
            Rules Violated
          </span>
          <span className="text-lg sm:text-xl font-bold text-red-600 dark:text-red-400">
            {healthData.rulesViolated}
          </span>
        </div>

        {/* Mistakes Logged */}
        <div className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-700">
          <span className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
            Mistakes Logged
          </span>
          <span className="text-lg sm:text-xl font-bold text-orange-600 dark:text-orange-400">
            {healthData.mistakesLogged}
          </span>
        </div>

        {/* Journal Completed */}
        <div className="flex items-center justify-between py-3">
          <span className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
            Journal Completed
          </span>
          {healthData.journalCompleted ? (
            <IoCheckmarkCircle className="text-green-600 dark:text-green-400 text-2xl sm:text-3xl" />
          ) : (
            <IoCloseCircle className="text-gray-400 dark:text-gray-500 text-2xl sm:text-3xl" />
          )}
        </div>
      </div>
    </div>
  );
}
