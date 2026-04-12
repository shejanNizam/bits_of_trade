/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { useGetCalendarDataQuery } from "@/redux/features/overview/overviewApi";
import { Calendar } from "antd";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { useState } from "react";
import {
  MdChevronLeft,
  MdChevronRight,
  MdInsertDriveFile,
} from "react-icons/md";

interface DayStats {
  pnl?: number;
  trades?: number;
  outcome?: string;
  wins?: number;
  losses?: number;
  hasNote?: boolean;
  noteText?: string;
}

export default function TradingCalendar() {
  const { data: apiData } = useGetCalendarDataQuery({});
  const [currentMonth, setCurrentMonth] = useState(dayjs());

  // Process API data into a map for easy lookup
  const tradingData: Record<string, DayStats> = {};

  if (apiData?.weeks) {
    apiData.weeks.forEach((week: any[]) => {
      week.forEach((day: any) => {
        if (day && day.date) {
          tradingData[day.date] = {
            pnl: day.total_pnl,
            trades: day.trade_count,
            outcome: day.outcome,
            wins: day.wins,
            losses: day.losses,
            hasNote: false, // You can add note functionality later
            noteText: undefined,
          };
        }
      });
    });
  }

  const summary = apiData?.summary;
  const monthName = apiData?.month_name || currentMonth.format("MMMM");
  const year = apiData?.year || currentMonth.year();

  const goToPreviousMonth = () => {
    setCurrentMonth(currentMonth.subtract(1, "month"));
  };

  const goToNextMonth = () => {
    setCurrentMonth(currentMonth.add(1, "month"));
  };

  const goToCurrentMonth = () => {
    setCurrentMonth(dayjs());
  };

  const dateCellRender = (value: Dayjs) => {
    const dateStr = value.format("YYYY-MM-DD");
    const data = tradingData[dateStr];
    const isCurrentMonth = value.isSame(currentMonth, "month");
    const isToday = value.isSame(dayjs(), "day");

    const isLoss = data?.pnl && data.pnl < 0;
    const isProfit = data?.pnl && data.pnl > 0;
    const hasTrades = data?.trades && data.trades > 0;

    // Format PnL display
    const formatPnL = (pnl: number) => {
      const absPnl = Math.abs(pnl);
      if (absPnl >= 1000000) {
        return `${pnl < 0 ? "-" : "+"}$${(absPnl / 1000000).toFixed(2)}M`;
      } else if (absPnl >= 1000) {
        return `${pnl < 0 ? "-" : "+"}$${(absPnl / 1000).toFixed(1)}K`;
      }
      return `${pnl < 0 ? "-" : "+"}$${absPnl}`;
    };

    return (
      <div
        className={`
        h-full w-full min-h-25 border-[0.5px] border-gray-100 dark:border-gray-800 transition-all flex flex-col
        ${!isCurrentMonth ? "bg-gray-50/30 dark:bg-gray-900/10" : "bg-white dark:bg-[#0B0F1A]"}
        ${isLoss ? "bg-red-50/60 dark:bg-red-900/10 border-red-200 dark:border-red-900/40" : ""}
        ${isProfit ? "bg-green-50/60 dark:bg-green-900/10 border-green-200 dark:border-green-900/40" : ""}
        ${isToday && isCurrentMonth ? "ring-2 ring-teal-500 ring-inset" : ""}
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
            className={`
              text-[11px] font-medium 
              ${isCurrentMonth ? "text-gray-500 dark:text-gray-400" : "text-gray-300 dark:text-gray-700"}
              ${isToday && isCurrentMonth ? "bg-teal-500 text-white rounded-full w-5 h-5 flex items-center justify-center" : ""}
            `}
          >
            {value.date()}
          </span>
        </div>

        {/* Middle Section: P&L and Trade Count */}
        <div className="flex-1 flex flex-col items-center justify-center -mt-1">
          {hasTrades && data?.pnl !== undefined ? (
            <>
              <div
                className={`text-sm font-bold ${
                  isLoss ? "text-red-500" : "text-green-500"
                }`}
              >
                {formatPnL(data.pnl)}
              </div>
              <div className="text-[9px] uppercase tracking-wider text-gray-400 dark:text-gray-500 font-medium mt-0.5">
                {data.trades} trade{data.trades !== 1 ? "s" : ""}
              </div>
              {data.wins !== undefined && data.losses !== undefined && (
                <div className="text-[8px] text-gray-400 dark:text-gray-500 mt-0.5">
                  W:{data.wins} L:{data.losses}
                </div>
              )}
            </>
          ) : data?.outcome === "no_trades" && isCurrentMonth ? (
            <div className="text-[9px] text-gray-400 dark:text-gray-500 italic">
              No trades
            </div>
          ) : !isCurrentMonth ? null : (
            <div className="text-[9px] text-gray-300 dark:text-gray-600">—</div>
          )}
        </div>

        {/* Bottom Section: Note Preview */}
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

  // Calculate summary stats for display
  const winRate =
    summary?.total_trades && summary?.total_trades > 0
      ? (
          ((summary.total_trades - (summary.loss_days || 0)) /
            summary.total_trades) *
          100
        ).toFixed(1)
      : 0;

  return (
    <div className="w-full bg-white dark:bg-[#0B0F1A] rounded-xl shadow-sm overflow-hidden border border-gray-200 dark:border-gray-800">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-gray-800 gap-3">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <button
              onClick={goToPreviousMonth}
              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors"
            >
              <MdChevronLeft className="text-xl text-gray-400" />
            </button>
            <span className="text-[15px] font-bold text-gray-700 dark:text-gray-200 uppercase tracking-tight">
              {monthName} {year}
            </span>
            <button
              onClick={goToNextMonth}
              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors"
            >
              <MdChevronRight className="text-xl text-gray-400" />
            </button>
          </div>
          <button
            onClick={goToCurrentMonth}
            className="px-3 py-1 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md text-[11px] font-bold text-gray-500 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            This month
          </button>
        </div>

        {/* Summary Stats */}
        {summary && summary.total_trades > 0 && (
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span className="text-gray-600 dark:text-gray-400">
                Profit: {summary.profit_days || 0}d
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-red-500"></div>
              <span className="text-gray-600 dark:text-gray-400">
                Loss: {summary.loss_days || 0}d
              </span>
            </div>
            <div className="text-gray-500 dark:text-gray-500">
              Win Rate: {winRate}%
            </div>
          </div>
        )}

        {/* Info button (optional) */}
        {/* <div className="flex items-center gap-4 text-gray-400">
          <MdInfoOutline className="text-lg cursor-pointer hover:text-teal-500" />
        </div> */}
      </div>

      {/* Calendar */}
      <div className="trading-calendar-wrapper">
        <Calendar
          value={currentMonth}
          headerRender={() => null}
          fullCellRender={dateCellRender}
          onChange={(value) => setCurrentMonth(value)}
        />
      </div>

      {/* Legend for no trades (optional) */}
      {summary?.total_trades === 0 && (
        <div className="px-5 py-3 border-t border-gray-100 dark:border-gray-800 text-center text-xs text-gray-400 dark:text-gray-500">
          No trading activity recorded for {monthName} {year}
        </div>
      )}
    </div>
  );
}
