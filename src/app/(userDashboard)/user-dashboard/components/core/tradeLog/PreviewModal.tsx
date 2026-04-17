"use client";

import { Divider, Image, Modal, Tag } from "antd";
import {
  IoBarChartOutline,
  IoCalendarOutline,
  IoCashOutline,
  IoCheckmarkCircleOutline,
  IoCloseOutline,
  IoDocumentTextOutline,
  IoFlagOutline,
  IoHappyOutline,
  IoSadOutline,
  IoStatsChart,
  IoTrendingDown,
  IoTrendingUp,
  IoWarningOutline,
} from "react-icons/io5";
import { TradeData } from "./TradeLogTable";

interface PreviewModalProps {
  open: boolean;
  onClose: () => void;
  trade: TradeData | null;
}

export default function PreviewModal({
  open,
  onClose,
  trade,
}: PreviewModalProps) {
  if (!trade) return null;

  const pnl = parseFloat(trade.total_pnl);
  const isProfit = pnl > 0;
  const isLoss = pnl < 0;
  const quantity = parseFloat(trade.quantity);
  const entryPrice = parseFloat(trade.entry_price);
  const exitPrice = parseFloat(trade.exit_price);
  const fees = parseFloat(trade.fees);
  const stopLoss = trade.stop_loss ? parseFloat(trade.stop_loss) : null;
  const target = trade.target ? parseFloat(trade.target) : null;

  const getOutcomeSummaryLabel = (summary?: string) => {
    switch (summary) {
      case "target_hit":
        return { label: "Target Hit", color: "green", icon: <IoTrendingUp /> };
      case "stop_loss_hit":
        return {
          label: "Stop Loss Hit",
          color: "red",
          icon: <IoTrendingDown />,
        };
      case "breakeven":
        return { label: "Breakeven", color: "gold", icon: <IoFlagOutline /> };
      case "partial_exit":
        return {
          label: "Partial Exit",
          color: "blue",
          icon: <IoFlagOutline />,
        };
      default:
        return { label: "Not Specified", color: "default", icon: null };
    }
  };

  const outcomeSummary = getOutcomeSummaryLabel(trade.outcome_summary);

  const getEmotionalStateIcon = (state?: string) => {
    switch (state?.toLowerCase()) {
      case "calm":
        return <IoHappyOutline className="text-green-500" />;
      case "anxious":
      case "fearful":
        return <IoSadOutline className="text-yellow-500" />;
      case "angry":
        return <IoWarningOutline className="text-red-500" />;
      default:
        return <IoHappyOutline className="text-gray-500" />;
    }
  };

  // Calculate P&L percentage
  const pnlPercentage = ((pnl / (entryPrice * quantity)) * 100).toFixed(2);

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      width={900}
      destroyOnClose
      closeIcon={
        <IoCloseOutline className="text-xl text-gray-500 hover:text-gray-700 dark:text-gray-400" />
      }
      title={
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            Trade Details
          </h3>
          <Tag
            color={isProfit ? "green" : isLoss ? "red" : "default"}
            className="text-sm font-semibold px-3 py-1"
          >
            {isProfit ? "WINNER" : isLoss ? "LOSER" : "BREAKEVEN"}
          </Tag>
        </div>
      }
    >
      <div className="space-y-6 py-4 max-h-[70vh] overflow-y-auto custom-scrollbar">
        {/* Header Section with Symbol and Basic Info */}
        <div
          className={`bg-linear-to-r rounded-xl p-5 ${
            isProfit
              ? "from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20"
              : isLoss
                ? "from-red-50 to-rose-50 dark:from-red-900/20 dark:to-rose-900/20"
                : "from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900"
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {trade.symbol}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {trade.market_type?.replace("_", " ").toUpperCase()} •{" "}
                {trade.direction?.toUpperCase()}
              </p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">
                <span
                  className={
                    isProfit
                      ? "text-green-600 dark:text-green-400"
                      : isLoss
                        ? "text-red-600 dark:text-red-400"
                        : "text-gray-600 dark:text-gray-400"
                  }
                >
                  {isProfit ? "+" : ""}₹{Math.abs(pnl).toLocaleString()}
                </span>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {pnlPercentage}% • Total P&L
              </p>
            </div>
          </div>
        </div>

        {/* Trade Details Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3">
            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-xs mb-1">
              <IoCalendarOutline />
              <span>Trade Date</span>
            </div>
            <p className="text-sm font-semibold text-gray-900 dark:text-white">
              {trade.trade_date}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {trade.trade_time}
            </p>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3">
            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-xs mb-1">
              <IoBarChartOutline />
              <span>Entry Price</span>
            </div>
            <p className="text-sm font-semibold text-gray-900 dark:text-white">
              ₹{entryPrice.toLocaleString()}
            </p>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3">
            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-xs mb-1">
              <IoBarChartOutline />
              <span>Exit Price</span>
            </div>
            <p className="text-sm font-semibold text-gray-900 dark:text-white">
              ₹{exitPrice.toLocaleString()}
            </p>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3">
            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-xs mb-1">
              <IoCashOutline />
              <span>Quantity</span>
            </div>
            <p className="text-sm font-semibold text-gray-900 dark:text-white">
              {quantity.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Additional Trade Details */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stopLoss && (
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3">
              <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-xs mb-1">
                <IoTrendingDown />
                <span>Stop Loss</span>
              </div>
              <p className="text-sm font-semibold text-red-600 dark:text-red-400">
                ₹{stopLoss.toLocaleString()}
              </p>
            </div>
          )}

          {target && (
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3">
              <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-xs mb-1">
                <IoTrendingUp />
                <span>Target</span>
              </div>
              <p className="text-sm font-semibold text-green-600 dark:text-green-400">
                ₹{target.toLocaleString()}
              </p>
            </div>
          )}

          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3">
            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-xs mb-1">
              <IoCashOutline />
              <span>Fees</span>
            </div>
            <p className="text-sm font-semibold text-gray-900 dark:text-white">
              ₹{fees.toLocaleString()}
            </p>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3">
            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-xs mb-1">
              <IoStatsChart />
              <span>Leverage</span>
            </div>
            <p className="text-sm font-semibold text-gray-900 dark:text-white">
              {trade.leverage || "1.00"}x
            </p>
          </div>
        </div>

        {/* Strategy and Outcome Summary */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
              Strategy
            </label>
            <p className="text-sm text-gray-900 dark:text-white mt-1">
              {trade.strategy_name || "No strategy selected"}
            </p>
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase flex items-center gap-2">
              {outcomeSummary.icon}
              Outcome Summary
            </label>
            <div className="mt-1">
              <Tag color={outcomeSummary.color}>{outcomeSummary.label}</Tag>
            </div>
          </div>
        </div>

        {/* Trade Analysis */}
        {trade.trade_analysis && (
          <div>
            <Divider className="my-3" />
            <div>
              <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase flex items-center gap-2">
                <IoDocumentTextOutline />
                Trade Analysis
              </label>
              <div className="mt-2 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                  {trade.trade_analysis}
                </p>
              </div>
            </div>
          </div>
        )}

        <Divider className="my-3" />

        {/* Psychology Section */}
        <div>
          <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
            <IoStatsChart />
            Psychology & Discipline
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3">
              <label className="text-xs text-gray-500 dark:text-gray-400">
                Entry Confidence
              </label>
              <div className="mt-1">
                <Tag
                  color={
                    trade.entry_confidence && trade.entry_confidence >= 70
                      ? "green"
                      : trade.entry_confidence && trade.entry_confidence >= 40
                        ? "orange"
                        : "red"
                  }
                >
                  {trade.entry_confidence || 0}%
                </Tag>
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3">
              <label className="text-xs text-gray-500 dark:text-gray-400">
                Satisfaction Rating
              </label>
              <div className="mt-1">
                <Tag
                  color={
                    trade.satisfaction_rating && trade.satisfaction_rating >= 70
                      ? "green"
                      : trade.satisfaction_rating &&
                          trade.satisfaction_rating >= 40
                        ? "orange"
                        : "red"
                  }
                >
                  {trade.satisfaction_rating || 0}%
                </Tag>
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3">
              <label className="text-xs text-gray-500 dark:text-gray-400">
                Emotional State
              </label>
              <div className="mt-1 flex items-center gap-2">
                {getEmotionalStateIcon(trade.emotional_state || undefined)}
                <span className="text-sm text-gray-900 dark:text-white capitalize">
                  {trade.emotional_state || "Not recorded"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Rules Followed & Mistakes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-green-50 dark:bg-green-900/10 rounded-lg p-3">
            <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase flex items-center gap-2 mb-2">
              <IoCheckmarkCircleOutline className="text-green-500" />
              Rules Followed ({trade.rules_followed?.length || 0})
            </label>
            <div className="flex flex-wrap gap-2">
              {trade.rules_followed && trade.rules_followed.length > 0 ? (
                trade.rules_followed.map((rule, idx) => (
                  <Tag key={idx} color="green" className="text-xs">
                    {rule}
                  </Tag>
                ))
              ) : (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  No rules recorded
                </p>
              )}
            </div>
          </div>
          <div className="bg-red-50 dark:bg-red-900/10 rounded-lg p-3">
            <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase flex items-center gap-2 mb-2">
              <IoWarningOutline className="text-red-500" />
              Mistakes ({trade.mistakes?.length || 0})
            </label>
            <div className="flex flex-wrap gap-2">
              {trade.mistakes && trade.mistakes.length > 0 ? (
                trade.mistakes.map((mistake, idx) => (
                  <Tag key={idx} color="red" className="text-xs">
                    {mistake}
                  </Tag>
                ))
              ) : (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  No mistakes recorded
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Violation Modes */}
        {trade.violation_modes && trade.violation_modes.length > 0 && (
          <div className="bg-orange-50 dark:bg-orange-900/10 rounded-lg p-3">
            <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase flex items-center gap-2 mb-2">
              <IoWarningOutline className="text-orange-500" />
              Violation Modes ({trade.violation_modes.length})
            </label>
            <div className="flex flex-wrap gap-2">
              {trade.violation_modes.map((mode, idx) => (
                <Tag key={idx} color="orange" className="text-xs">
                  {mode}
                </Tag>
              ))}
            </div>
          </div>
        )}

        {/* Lessons Learned */}
        {trade.lessons_learned && (
          <div>
            <Divider className="my-3" />
            <div>
              <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase flex items-center gap-2">
                <IoDocumentTextOutline />
                Lessons Learned
              </label>
              <div className="mt-2 p-3 bg-blue-50 dark:bg-blue-900/10 rounded-lg">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {trade.lessons_learned}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Screenshots */}
        {trade.screenshot_urls && trade.screenshot_urls.length > 0 && (
          <div>
            <Divider className="my-3" />
            <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-3 block">
              Screenshots ({trade.screenshot_urls.length})
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {trade.screenshot_urls.map((url, idx) => (
                <Image
                  key={idx}
                  src={url}
                  alt={`Screenshot ${idx + 1}`}
                  className="rounded-lg border border-gray-200 dark:border-gray-700 cursor-pointer hover:opacity-90 transition-opacity"
                  width="100%"
                  height={120}
                  style={{ objectFit: "cover" }}
                  preview={{ mask: "Click to preview" }}
                />
              ))}
            </div>
          </div>
        )}

        {/* Discipline Status Badge */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">
              Discipline Status:
            </span>
            <Tag color={trade.is_disciplined ? "green" : "red"}>
              {trade.is_disciplined ? "Disciplined" : "Undisciplined"}
            </Tag>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">
              Review Status:
            </span>
            <Tag color={trade.is_tagged_complete ? "green" : "orange"}>
              {trade.is_tagged_complete ? "Tagged Complete" : "Pending Tagging"}
            </Tag>
          </div>
        </div>

        {/* Meta Information */}
        <Divider className="my-3" />
        <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1 bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg">
          <p>
            <span className="font-semibold">Import Source:</span>{" "}
            {trade.import_source || "Manual"}
          </p>
          {trade.broker_name && (
            <p>
              <span className="font-semibold">Broker:</span> {trade.broker_name}
            </p>
          )}
        </div>
      </div>
    </Modal>
  );
}
