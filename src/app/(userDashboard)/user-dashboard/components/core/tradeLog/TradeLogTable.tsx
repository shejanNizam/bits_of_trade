"use client";

import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useState } from "react";
import {
  IoAddOutline,
  IoCopyOutline,
  IoCreateOutline,
  IoDownloadOutline,
  IoEyeOutline,
} from "react-icons/io5";
import { MdInfoOutline } from "react-icons/md";
import AddTradeModal from "./AddTradeModal";
import ImportBrokerModal from "./ImportBrokerModal";

export interface TradeData {
  key: string;
  date: string;
  time: string;
  symbol: string;
  market: string;
  direction: "Long" | "Short";
  qty: number | string;
  entry: number;
  exit: number;
  pnl: number;
  strategy: string;
  rules: string;
  psychology: string;
  mistakes: number | null;
  status: "completed" | "pending";
}

export default function TradeLogTable() {
  const [activeTab, setActiveTab] = useState("all");
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);

  // Unified state for Add/Edit
  const [isTradeModalOpen, setIsTradeModalOpen] = useState(false);
  const [selectedTrade, setSelectedTrade] = useState<TradeData | null>(null);

  const trades: TradeData[] = [
    {
      key: "1",
      date: "2025-01-07",
      time: "09:45:00",
      symbol: "RELIANCE",
      market: "Indian Stocks",
      direction: "Long",
      qty: 50,
      entry: 2450.5,
      exit: 2485.75,
      pnl: 1637,
      strategy: "Momentum Breakout",
      rules: "-",
      psychology: "-",
      mistakes: null,
      status: "completed",
    },
    {
      key: "2",
      date: "2025-01-07",
      time: "11:30:00",
      symbol: "NIFTY 25000 CE",
      market: "Indian Stocks",
      direction: "Long",
      qty: 500,
      entry: 145.25,
      exit: 138.5,
      pnl: -3625,
      strategy: "Options Momentum",
      rules: "-",
      psychology: "-",
      mistakes: 2,
      status: "completed",
    },
    {
      key: "3",
      date: "2025-01-06",
      time: "14:20:00",
      symbol: "EURUSD",
      market: "Forex",
      direction: "Short",
      qty: 10000,
      entry: 1.0845,
      exit: 1.082,
      pnl: 235,
      strategy: "Trend Following",
      rules: "-",
      psychology: "-",
      mistakes: null,
      status: "completed",
    },
    {
      key: "4",
      date: "2025-01-06",
      time: "15:45:00",
      symbol: "BTCUSDT",
      market: "Crypto",
      direction: "Long",
      qty: 0.5,
      entry: 65200,
      exit: 64850,
      pnl: -207.5,
      strategy: "Scalping",
      rules: "-",
      psychology: "-",
      mistakes: 1,
      status: "completed",
    },
  ];

  const tabs = [
    { key: "all", label: "All Trades", count: 5 },
    { key: "wins", label: "Wins" },
    { key: "losses", label: "Losses" },
    { key: "disciplined", label: "Disciplined" },
    { key: "violations", label: "Violations" },
  ];

  // Helper to open modal for adding
  const handleOpenAddModal = () => {
    setSelectedTrade(null);
    setIsTradeModalOpen(true);
  };

  // Helper to open modal for editing
  const handleOpenEditModal = (trade: TradeData) => {
    setSelectedTrade(trade);
    setIsTradeModalOpen(true);
  };

  const columns: ColumnsType<TradeData> = [
    {
      title: "Trade Date",
      dataIndex: "date",
      key: "date",
      render: (_, record) => (
        <div className="text-[12px]">
          <div className="font-bold text-gray-300">{record.date}</div>
          <div className="text-gray-500 text-[10px]">{record.time}</div>
        </div>
      ),
    },
    {
      title: "Symbol",
      dataIndex: "symbol",
      key: "symbol",
      render: (symbol) => (
        <span className="font-bold text-white text-[12px]">{symbol}</span>
      ),
    },
    {
      title: "Market",
      dataIndex: "market",
      key: "market",
      render: (market) => (
        <span className="text-gray-400 text-[12px]">{market}</span>
      ),
    },
    {
      title: "Direction",
      dataIndex: "direction",
      key: "direction",
      render: (direction) => (
        <div
          className={`px-2 py-0.5 rounded text-[10px] font-bold w-fit border ${
            direction === "Long"
              ? "bg-teal-500/10 border-teal-500/50 text-teal-500"
              : "bg-orange-500/10 border-orange-500/50 text-orange-500"
          }`}
        >
          {direction.toUpperCase()}
        </div>
      ),
    },
    {
      title: "Qty",
      dataIndex: "qty",
      key: "qty",
      render: (qty) => <span className="text-gray-300 text-[12px]">{qty}</span>,
    },
    {
      title: "Entry",
      dataIndex: "entry",
      key: "entry",
      render: (val) => (
        <span className="text-gray-300 text-[12px]">
          ₹{val.toLocaleString()}
        </span>
      ),
    },
    {
      title: "Exit",
      dataIndex: "exit",
      key: "exit",
      render: (val) => (
        <span className="text-gray-300 text-[12px]">
          ₹{val.toLocaleString()}
        </span>
      ),
    },
    {
      title: "P&L",
      dataIndex: "pnl",
      key: "pnl",
      render: (pnl) => (
        <span
          className={`font-bold text-[12px] ${pnl >= 0 ? "text-green-500" : "text-red-500"}`}
        >
          {pnl >= 0 ? "+" : ""}₹{pnl.toLocaleString()}
        </span>
      ),
    },
    {
      title: "Strategy",
      dataIndex: "strategy",
      key: "strategy",
      render: (strategy) => (
        <span className="text-gray-400 text-[12px]">{strategy}</span>
      ),
    },
    {
      title: "Rules",
      dataIndex: "rules",
      key: "rules",
      align: "center",
      render: (val) => <span className="text-gray-600 text-[12px]">{val}</span>,
    },
    {
      title: "Psychology",
      dataIndex: "psychology",
      key: "psychology",
      align: "center",
      render: (val) => <span className="text-gray-600 text-[12px]">{val}</span>,
    },
    {
      title: "Mistakes",
      dataIndex: "mistakes",
      key: "mistakes",
      align: "center",
      render: (val) =>
        val ? (
          <div className="bg-red-500 text-white text-[10px] font-bold w-5 h-5 rounded flex items-center justify-center">
            {val}
          </div>
        ) : (
          <span className="text-gray-600">-</span>
        ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      align: "center",
      render: () => (
        <div className="w-3 h-3 rounded-full bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.6)]" />
      ),
    },
    {
      title: "Actions",
      key: "actions",
      align: "right",
      render: (_, record) => (
        <div className="flex items-center justify-end gap-3 text-gray-500">
          <IoEyeOutline className="text-lg cursor-pointer transition-colors" />
          <IoCreateOutline
            className="text-lg cursor-pointer  transition-colors"
            onClick={() => handleOpenEditModal(record)}
          />
          <IoCopyOutline className="text-lg cursor-pointer transition-colors" />
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
            onClick={handleOpenAddModal}
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

      {/* Unified Add/Edit Modal */}
      <AddTradeModal
        open={isTradeModalOpen}
        onClose={() => {
          setIsTradeModalOpen(false);
          setSelectedTrade(null);
        }}
        editData={selectedTrade} // Pass existing trade if editing
      />

      <style jsx global>{`
        .custom-table .ant-table {
          background: transparent;
        }
        .custom-table .ant-table-thead > tr > th {
          background: transparent !important;
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
