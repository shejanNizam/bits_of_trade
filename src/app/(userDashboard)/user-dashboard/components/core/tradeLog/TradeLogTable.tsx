/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  useDeleteTradeMutation,
  useGetAllTradeQuery,
} from "@/redux/features/tradelog/tradelogApi";
import { useGetStrategyForTradeQuery } from "@/redux/features/utils/utilsApi";
import { ErrorSwal, SuccessSwal } from "@/utils/allSwal";
import { message, Pagination, Spin, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useState } from "react";
import {
  IoAddOutline,
  IoCopyOutline,
  IoCreateOutline,
  IoDownloadOutline,
} from "react-icons/io5";
import { MdInfoOutline } from "react-icons/md";
import AddTradeModal from "./AddTradeModal";
import ImportBrokerModal from "./ImportBrokerModal";

export interface TradeData {
  id: string;
  trade_date: string;
  trade_time: string;
  symbol: string;
  market_type: string;
  direction: "long" | "short";
  quantity: string;
  entry_price: string;
  exit_price: string;
  fees: string;
  total_pnl: string;
  strategy: string | null;
  entry_confidence: number | null;
  satisfaction_rating: number | null;
  emotional_state: string | null;
  violation_modes: string[];
  lessons_learned: string;
  is_disciplined: boolean;
  is_tagged_complete: boolean;
  import_source: string;
  broker_name: string;
  created_at: string;
  updated_at: string;
}

export default function TradeLogTable() {
  const [activeTab, setActiveTab] = useState("all");
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isTradeModalOpen, setIsTradeModalOpen] = useState(false);
  const [selectedTrade, setSelectedTrade] = useState<TradeData | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { data, isLoading, error, refetch } = useGetAllTradeQuery({
    page: currentPage,
    limit: pageSize,
  });
  console.log(data);

  const { data: strategiesData } = useGetStrategyForTradeQuery({
    page: 1,
    limit: 100,
  });
  console.log(strategiesData);

  const [deleteTrade] = useDeleteTradeMutation();

  const trades = data?.results || [];
  const totalCount = data?.count || 0;

  // Calculate statistics for tabs
  const calculateTabCounts = () => {
    const total = trades.length;
    const wins = trades.filter(
      (trade: TradeData) => parseFloat(trade.total_pnl) > 0,
    ).length;
    const losses = trades.filter(
      (trade: TradeData) => parseFloat(trade.total_pnl) < 0,
    ).length;
    const disciplined = trades.filter(
      (trade: TradeData) => trade.is_disciplined,
    ).length;
    const violations = trades.filter(
      (trade: TradeData) => trade.violation_modes?.length > 0,
    ).length;

    return { total, wins, losses, disciplined, violations };
  };

  const tabCounts = calculateTabCounts();

  const tabs = [
    { key: "all", label: "All Trades", count: tabCounts.total },
    { key: "wins", label: "Wins", count: tabCounts.wins },
    { key: "losses", label: "Losses", count: tabCounts.losses },
    { key: "disciplined", label: "Disciplined", count: tabCounts.disciplined },
    { key: "violations", label: "Violations", count: tabCounts.violations },
  ];

  // Filter trades based on active tab
  const getFilteredTrades = () => {
    switch (activeTab) {
      case "wins":
        return trades.filter(
          (trade: TradeData) => parseFloat(trade.total_pnl) > 0,
        );
      case "losses":
        return trades.filter(
          (trade: TradeData) => parseFloat(trade.total_pnl) < 0,
        );
      case "disciplined":
        return trades.filter((trade: TradeData) => trade.is_disciplined);
      case "violations":
        return trades.filter(
          (trade: TradeData) => trade.violation_modes?.length > 0,
        );
      default:
        return trades;
    }
  };

  const filteredTrades = getFilteredTrades();

  const handleOpenAddModal = () => {
    setSelectedTrade(null);
    setIsTradeModalOpen(true);
  };

  const handleOpenEditModal = (trade: TradeData) => {
    setSelectedTrade(trade);
    setIsTradeModalOpen(true);
  };

  const handleDeleteTrade = async (trade: TradeData) => {
    const result = await ErrorSwal({
      title: "Delete Trade?",
      text: `Are you sure you want to delete trade for ${trade.symbol}? This action cannot be undone.`,
    });

    if (result.isConfirmed) {
      try {
        await deleteTrade(trade.id).unwrap();
        SuccessSwal({
          title: "Deleted!",
          text: "Trade has been deleted successfully.",
        });
        refetch();
      } catch (error: any) {
        ErrorSwal({
          title: "Error!",
          text: error?.data?.message || "Failed to delete trade.",
        });
      }
    }
  };

  const handleCopyTrade = (trade: TradeData) => {
    // Copy trade data to clipboard or create a new trade with same details
    navigator.clipboard.writeText(JSON.stringify(trade, null, 2));
    message.success("Trade details copied to clipboard!");
  };

  const columns: ColumnsType<TradeData> = [
    {
      title: "Trade Date",
      dataIndex: "trade_date",
      key: "trade_date",
      render: (_, record) => (
        <div className="text-[12px]">
          <div className="font-bold text-gray-900 dark:text-gray-100">
            {record.trade_date}
          </div>
          <div className="text-gray-500 text-[10px]">{record.trade_time}</div>
        </div>
      ),
    },
    {
      title: "Symbol",
      dataIndex: "symbol",
      key: "symbol",
      render: (symbol) => (
        <span className="font-bold text-gray-900 dark:text-white text-[12px]">
          {symbol}
        </span>
      ),
    },
    {
      title: "Market",
      dataIndex: "market_type",
      key: "market_type",
      render: (market) => (
        <span className="text-gray-600 dark:text-gray-400 text-[12px] capitalize">
          {market.replace("_", " ")}
        </span>
      ),
    },
    {
      title: "Direction",
      dataIndex: "direction",
      key: "direction",
      render: (direction) => (
        <div
          className={`px-2 py-0.5 rounded text-[10px] font-bold w-fit border ${
            direction === "long"
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
      dataIndex: "quantity",
      key: "quantity",
      render: (qty) => (
        <span className="text-gray-700 dark:text-gray-300 text-[12px]">
          {parseFloat(qty).toLocaleString()}
        </span>
      ),
    },
    {
      title: "Entry",
      dataIndex: "entry_price",
      key: "entry_price",
      render: (val) => (
        <span className="text-gray-700 dark:text-gray-300 text-[12px]">
          ₹{parseFloat(val).toLocaleString()}
        </span>
      ),
    },
    {
      title: "Exit",
      dataIndex: "exit_price",
      key: "exit_price",
      render: (val) => (
        <span className="text-gray-700 dark:text-gray-300 text-[12px]">
          ₹{parseFloat(val).toLocaleString()}
        </span>
      ),
    },
    {
      title: "P&L",
      dataIndex: "total_pnl",
      key: "total_pnl",
      render: (pnl) => {
        const pnlNum = parseFloat(pnl);
        return (
          <span
            className={`font-bold text-[12px] ${pnlNum >= 0 ? "text-green-500" : "text-red-500"}`}
          >
            {pnlNum >= 0 ? "+" : ""}₹{pnlNum.toLocaleString()}
          </span>
        );
      },
    },
    {
      title: "Strategy",
      dataIndex: "strategy_name",
      key: "strategy_name",
      render: (strategy_name) => (
        <span className="text-gray-500 dark:text-gray-400 text-[12px]">
          {strategy_name || "-"}
        </span>
      ),
    },
    {
      title: "Violations",
      dataIndex: "violation_modes",
      key: "violation_modes",
      align: "center",
      render: (violations) => (
        <div className="flex gap-1 flex-wrap">
          {violations?.length > 0 ? (
            <span className="text-red-500 text-[10px] font-medium">
              {violations.length}
            </span>
          ) : (
            <span className="text-gray-400">-</span>
          )}
        </div>
      ),
    },
    {
      title: "Status",
      key: "status",
      align: "center",
      render: (_, record) => (
        <div
          className={`w-3 h-3 rounded-full ${
            record.is_tagged_complete
              ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"
              : "bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.6)]"
          }`}
          title={
            record.is_tagged_complete ? "Tagged Complete" : "Pending Tagging"
          }
        />
      ),
    },
    {
      title: "Actions",
      key: "actions",
      align: "right",
      render: (_, record) => (
        <div className="flex items-center justify-end gap-3 text-gray-500">
          {/* <IoEyeOutline className="text-lg cursor-pointer hover:text-blue-500 transition-colors" /> */}
          <IoCreateOutline
            className="text-lg cursor-pointer hover:text-green-500 transition-colors"
            onClick={() => handleOpenEditModal(record)}
          />
          <IoCopyOutline
            className="text-lg cursor-pointer hover:text-purple-500 transition-colors"
            onClick={() => handleCopyTrade(record)}
          />
        </div>
      ),
    },
  ];

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 text-red-500">
        Failed to load trades. Please try again.
      </div>
    );
  }

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
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <Table
          columns={columns}
          dataSource={filteredTrades}
          pagination={false}
          scroll={{ x: 1200 }}
          className="custom-table"
          rowKey="id"
        />
      </div>

      {/* Pagination */}
      {totalCount > 0 && (
        <div className="flex justify-end py-4">
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={totalCount}
            onChange={(page, size) => {
              setCurrentPage(page);
              if (size !== pageSize) setPageSize(size);
            }}
            showSizeChanger
            showTotal={(total) => `Total ${total} trades`}
            className="dark:text-gray-300"
          />
        </div>
      )}

      {/* Modals */}
      <ImportBrokerModal
        open={isImportModalOpen}
        onClose={() => {
          setIsImportModalOpen(false);
          refetch();
        }}
      />

      <AddTradeModal
        open={isTradeModalOpen}
        onClose={() => {
          setIsTradeModalOpen(false);
          setSelectedTrade(null);
          refetch();
        }}
        editData={selectedTrade}
        strategiesData={strategiesData}
      />
    </div>
  );
}
