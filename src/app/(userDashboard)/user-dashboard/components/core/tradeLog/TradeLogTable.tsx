"use client";

import { Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useState } from "react";
import {
  IoAddOutline,
  IoCreateOutline,
  IoDownloadOutline,
  IoTrashOutline,
} from "react-icons/io5";
import { MdInfoOutline } from "react-icons/md";
import AddTradeModal from "./AddTradeModal";
import EditTradeModal from "./EditTradeModal";
import ImportBrokerModal from "./ImportBrokerModal";

interface TradeData {
  key: string;
  date: string;
  time: string;
  symbol: string;
  market: string;
  direction: "Long" | "Short";
  strategy: string;
  pnl: number;
  pnlPercent: number;
  flags: string[];
  review: "Reviewed" | "Unreviewed";
}

export default function TradeLogTable() {
  const [activeTab, setActiveTab] = useState("all");
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedTrade, setSelectedTrade] = useState<TradeData | null>(null);

  // This data will come from backend later
  const trades: TradeData[] = [
    {
      key: "1",
      date: "2025-01-07",
      time: "14:30",
      symbol: "RELIANCE",
      market: "Indian Stocks",
      direction: "Long",
      strategy: "Momentum Breakout",
      pnl: 1637,
      pnlPercent: 2.4,
      flags: ["clean"],
      review: "Reviewed",
    },
    {
      key: "2",
      date: "2025-01-07",
      time: "11:00",
      symbol: "NIFTY 25000 CE",
      market: "Indian Stocks",
      direction: "Long",
      strategy: "Options Momentum",
      pnl: -3625,
      pnlPercent: -3.4,
      flags: ["2-mistakes", "rule-breach"],
      review: "Unreviewed",
    },
    {
      key: "3",
      date: "2025-01-06",
      time: "06:00",
      symbol: "EURUSD",
      market: "Forex",
      direction: "Short",
      strategy: "Trend Following",
      pnl: 1235,
      pnlPercent: 1.8,
      flags: ["clean"],
      review: "Reviewed",
    },
    {
      key: "4",
      date: "2025-01-06",
      time: "14:30",
      symbol: "BTCUSDT",
      market: "Crypto",
      direction: "Long",
      strategy: "Scalping",
      pnl: -207.5,
      pnlPercent: -0.5,
      flags: ["1-mistake"],
      review: "Unreviewed",
    },
    {
      key: "5",
      date: "2025-01-05",
      time: "14:00",
      symbol: "TCS",
      market: "Indian Stocks",
      direction: "Long",
      strategy: "Support Bounce",
      pnl: 1677.5,
      pnlPercent: 2.2,
      flags: ["clean"],
      review: "Reviewed",
    },
  ];

  const tabs = [
    { key: "all", label: "All Trades", count: 5 },
    { key: "wins", label: "Wins" },
    { key: "losses", label: "Losses" },
    { key: "disciplined", label: "Disciplined" },
    { key: "violations", label: "Violations" },
  ];

  const handleEdit = (trade: TradeData) => {
    setSelectedTrade(trade);
    setIsEditModalOpen(true);
  };

  const handleDelete = (key: string) => {
    console.log("Delete trade:", key);
  };

  const columns: ColumnsType<TradeData> = [
    {
      title: "DATE/TIME",
      dataIndex: "date",
      key: "date",
      render: (_, record) => (
        <div className="text-xs sm:text-sm">
          <div className="font-medium text-gray-900 dark:text-gray-100">
            {record.date}
          </div>
          <div className="text-gray-500 dark:text-gray-400">{record.time}</div>
        </div>
      ),
    },
    {
      title: "SYMBOL",
      dataIndex: "symbol",
      key: "symbol",
      render: (_, record) => (
        <div className="text-xs sm:text-sm">
          <div className="font-bold text-gray-900 dark:text-gray-100">
            {record.symbol}
          </div>
          <div className="text-gray-500 dark:text-gray-400">
            {record.market}
          </div>
        </div>
      ),
    },
    {
      title: "DIRECTION",
      dataIndex: "direction",
      key: "direction",
      render: (direction: string) => (
        <Tag
          color={direction === "Long" ? "green" : "orange"}
          className="text-xs font-medium"
        >
          {direction}
        </Tag>
      ),
    },
    {
      title: "STRATEGY",
      dataIndex: "strategy",
      key: "strategy",
      render: (strategy: string) => (
        <span className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
          {strategy}
        </span>
      ),
    },
    {
      title: "P&L",
      dataIndex: "pnl",
      key: "pnl",
      render: (_, record) => (
        <div className="text-xs sm:text-sm">
          <div
            className={`font-bold ${
              record.pnl >= 0
                ? "text-green-600 dark:text-green-400"
                : "text-red-600 dark:text-red-400"
            }`}
          >
            {record.pnl >= 0 ? "+" : ""}₹{record.pnl.toLocaleString()}
          </div>
          <div
            className={`text-xs ${
              record.pnl >= 0
                ? "text-green-600 dark:text-green-400"
                : "text-red-600 dark:text-red-400"
            }`}
          >
            {record.pnlPercent >= 0 ? "+" : ""}
            {record.pnlPercent}%
          </div>
        </div>
      ),
    },
    {
      title: "FLAGS",
      dataIndex: "flags",
      key: "flags",
      render: (flags: string[]) => (
        <div className="flex flex-col gap-1">
          {flags.includes("clean") && (
            <Tag color="green" className="text-xs font-medium w-fit">
              Clean
            </Tag>
          )}
          {flags.includes("2-mistakes") && (
            <Tag color="red" className="text-xs font-medium w-fit">
              2 mistakes
            </Tag>
          )}
          {flags.includes("1-mistake") && (
            <Tag color="red" className="text-xs font-medium w-fit">
              1 mistake
            </Tag>
          )}
          {flags.includes("rule-breach") && (
            <Tag color="red" className="text-xs font-medium w-fit">
              Rule breach
            </Tag>
          )}
        </div>
      ),
    },
    {
      title: "REVIEW",
      dataIndex: "review",
      key: "review",
      render: (review: string) => (
        <Tag
          color={review === "Reviewed" ? "green" : "default"}
          className="text-xs font-medium"
        >
          {review}
        </Tag>
      ),
    },
    {
      title: "ACTIONS",
      key: "actions",
      render: (_, record) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleDelete(record.key)}
            className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors"
          >
            <IoTrashOutline className="text-lg" />
          </button>
          <button
            onClick={() => handleEdit(record)}
            className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
          >
            <IoCreateOutline className="text-lg" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div className="flex-1">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Trade Log
          </h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
            Clean tagging = clean insights.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsImportModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium text-sm"
          >
            <IoDownloadOutline className="text-lg" />
            <span>Import</span>
          </button>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors font-semibold text-sm"
          >
            <IoAddOutline className="text-lg" />
            <span>Add Trade</span>
          </button>
        </div>
      </div>

      {/* Warning Banner */}
      <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <MdInfoOutline className="text-yellow-600 dark:text-yellow-400 text-xl shrink-0 mt-0.5" />
          <p className="text-sm text-yellow-800 dark:text-yellow-200">
            Complete Quick Check before logging new trades.
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm text-gray-600 dark:text-gray-400 mr-2">
            Filter by:
          </span>
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab.key
                  ? "bg-blue-600 dark:bg-blue-500 text-white"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              {tab.label} {tab.count ? `(${tab.count})` : ""}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <Table
          columns={columns}
          dataSource={trades}
          pagination={false}
          scroll={{ x: 1000 }}
          className="custom-table"
        />
      </div>

      {/* Modals */}
      <ImportBrokerModal
        open={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
      />
      <AddTradeModal
        open={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
      <EditTradeModal
        open={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        trade={selectedTrade}
      />

      <style jsx global>{`
        .custom-table .ant-table {
          background: transparent;
        }
        .custom-table .ant-table-thead > tr > th {
          background: transparent;
          color: rgb(107 114 128);
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          border-bottom: 1px solid rgb(229 231 235);
        }
        .dark .custom-table .ant-table-thead > tr > th {
          color: rgb(156 163 175);
          border-bottom: 1px solid rgb(55 65 81);
        }
        .custom-table .ant-table-tbody > tr > td {
          border-bottom: 1px solid rgb(243 244 246);
        }
        .dark .custom-table .ant-table-tbody > tr > td {
          border-bottom: 1px solid rgb(31 41 55);
        }
        .custom-table .ant-table-tbody > tr:hover > td {
          background: rgb(249 250 251) !important;
        }
        .dark .custom-table .ant-table-tbody > tr:hover > td {
          background: rgb(31 41 55) !important;
        }
      `}</style>
    </div>
  );
}
