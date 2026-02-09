"use client";

import { Calendar } from "antd";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import {
  MdChevronLeft,
  MdChevronRight,
  MdInsertDriveFile,
} from "react-icons/md";

interface DayStats {
  pnl?: number;
  trades?: number;
  hasNote?: boolean;
  noteText?: string; // Statically added for now
}

// Mock Data updated with static notes
const tradingData: Record<string, DayStats> = {
  "2025-11-06": {
    hasNote: true,
    noteText: "CPI Data Release - Stay cautious",
  },
  "2025-11-25": {
    pnl: -31200,
    trades: 5,
    hasNote: true,
    noteText: "Revenge trading after initial loss",
  },
};

export default function TradingCalendar() {
  const currentMonth = dayjs("2025-11-01");

  const dateCellRender = (value: Dayjs) => {
    const dateStr = value.format("YYYY-MM-DD");
    const data = tradingData[dateStr];
    const isCurrentMonth = value.isSame(currentMonth, "month");

    const isLoss = data?.pnl && data.pnl < 0;
    const isProfit = data?.pnl && data.pnl > 0;

    return (
      <div
        className={`
        h-full w-full min-h-27.5 border-[0.5px] border-gray-100 dark:border-gray-800 transition-all flex flex-col
        ${!isCurrentMonth ? "bg-gray-50/30 dark:bg-gray-900/10" : "bg-white dark:bg-[#0B0F1A]"}
        ${isLoss ? "bg-red-50/60 dark:bg-red-900/10 border-red-200 dark:border-red-900/40" : ""}
        ${isProfit ? "bg-green-50/60 dark:bg-green-900/10 border-green-200 dark:border-green-900/40" : ""}
      `}
      >
        {/* Top Section: Icon and Date */}
        <div className="flex justify-between p-2">
          <div className="w-4 h-4">
            {data?.hasNote && (
              <MdInsertDriveFile className="text-gray-400 dark:text-gray-500 text-[13px]" />
            )}
          </div>
          <span
            className={`text-[11px] font-medium ${isCurrentMonth ? "text-gray-500" : "text-gray-300 dark:text-gray-700"}`}
          >
            {value.date()}
          </span>
        </div>

        {/* Middle Section: P&L and Trade Count */}
        <div className="flex-1 flex flex-col items-center justify-center -mt-2">
          {data?.pnl !== undefined && (
            <>
              <div
                className={`text-sm font-bold ${isLoss ? "text-red-500" : "text-green-500"}`}
              >
                {data.pnl < 0 ? "-" : "+"}$
                {Math.abs(data.pnl / 1000).toFixed(1)}K
              </div>
              <div className="text-[9px] uppercase tracking-wider text-gray-400 dark:text-gray-500 font-medium">
                {data.trades} trades
              </div>
            </>
          )}
        </div>

        {/* Bottom Section: Static Note Preview (New) */}
        {data?.hasNote && data.noteText && (
          <div className="px-2 pb-2">
            <div className="bg-white/50 dark:bg-black/20 border border-gray-100 dark:border-gray-800 rounded p-1 text-[9px] text-gray-500 dark:text-gray-400 truncate leading-tight italic">
              {data.noteText}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-full bg-white dark:bg-[#0B0F1A] rounded-xl shadow-sm overflow-hidden border border-gray-200 dark:border-gray-800">
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded">
              <MdChevronLeft className="text-xl text-gray-400" />
            </button>
            <span className="text-[15px] font-bold text-gray-700 dark:text-gray-200 uppercase tracking-tight">
              November 2025
            </span>
            <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded">
              <MdChevronRight className="text-xl text-gray-400" />
            </button>
          </div>
          <div className="px-3 py-1 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md text-[11px] font-bold text-gray-500 dark:text-gray-300">
            This month
          </div>
        </div>

        {/* <div className="flex items-center gap-4 text-gray-400">
          <MdCameraAlt className="text-lg cursor-pointer hover:text-teal-500" />
          <MdInfoOutline className="text-lg cursor-pointer hover:text-teal-500" />
        </div> */}
      </div>

      <div className="trading-calendar-wrapper">
        <Calendar headerRender={() => null} fullCellRender={dateCellRender} />
      </div>
    </div>
  );
}
