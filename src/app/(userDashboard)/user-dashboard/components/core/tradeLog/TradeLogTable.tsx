// /* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useFilters } from "@/contexts/FilterContext";
import {
  useBulkDeleteTradesMutation,
  useDeleteTradeMutation,
  useGetAllTradeQuery,
} from "@/redux/features/tradelog/tradelogApi";
import { useGetStrategyForTradeQuery } from "@/redux/features/utils/utilsApi";
import { ErrorSwal, SuccessSwal } from "@/utils/allSwal";
import { message, Pagination, Spin, Table } from "antd";
import type { ColumnsType, TableRowSelection } from "antd/es/table/interface";
import { Key, useEffect, useState } from "react";
import {
  IoAddOutline,
  IoCreateOutline,
  IoDownloadOutline,
  IoTrashOutline,
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
  strategy_name?: string;
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
  screenshot_urls?: string[];
  rules_followed?: string[];
  mistakes?: string[];
}

export default function TradeLogTable() {
  const [activeTab, setActiveTab] = useState("all");
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isTradeModalOpen, setIsTradeModalOpen] = useState(false);
  const [selectedTrade, setSelectedTrade] = useState<TradeData | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);

  // Get filters from context
  const { filters } = useFilters();

  // Build query params with filters
  const buildQueryParams = () => {
    const params: any = {
      page: currentPage,
      limit: pageSize,
    };

    // Date Range
    if (filters.date_range) {
      params.date_range = filters.date_range;
    }
    if (filters.date_from) {
      params.date_from = filters.date_from;
    }
    if (filters.date_to) {
      params.date_to = filters.date_to;
    }

    // Instrument & Account
    if (filters.broker) {
      params.broker = filters.broker;
    }
    if (filters.market_type) {
      params.market_type = filters.market_type;
    }
    if (filters.direction) {
      params.direction = filters.direction;
    }
    if (filters.strategy) {
      params.strategy = filters.strategy;
    }

    // Outcome & P&L
    if (filters.outcome) {
      params.outcome = filters.outcome;
    }
    if (filters.filter) {
      params.filter = filters.filter;
    }
    if (filters.pnl_min !== undefined) {
      params.pnl_min = filters.pnl_min;
    }
    if (filters.pnl_max !== undefined) {
      params.pnl_max = filters.pnl_max;
    }

    // Psychology & Discipline
    if (filters.emotional_state) {
      params.emotional_state = filters.emotional_state;
    }
    if (filters.discipline_status) {
      params.discipline_status = filters.discipline_status;
    }
    if (filters.review_status) {
      params.review_status = filters.review_status;
    }

    // JSON Array Fields
    if (filters.rule_breach) {
      params.rule_breach = filters.rule_breach;
    }
    if (filters.mistakes) {
      params.mistakes = filters.mistakes;
    }
    if (filters.tags) {
      params.tags = filters.tags;
    }

    // Search
    if (filters.search) {
      params.search = filters.search;
    }

    return params;
  };

  const { data, isLoading, error, refetch } =
    useGetAllTradeQuery(buildQueryParams());

  const { data: strategiesData } = useGetStrategyForTradeQuery({
    page: 1,
    limit: 100,
  });

  const [deleteTrade] = useDeleteTradeMutation();
  const [bulkDeleteTrades] = useBulkDeleteTradesMutation();

  const trades = data?.results || [];
  const totalCount = data?.count || 0;

  // Refetch when filters or pagination changes
  useEffect(() => {
    refetch();
  }, [filters, currentPage, pageSize, refetch]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  // Calculate statistics for tabs based on filtered data
  const calculateTabCounts = () => {
    const total = totalCount;
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

  // Filter trades based on active tab (client-side filtering on current page)
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
        setSelectedRowKeys([]);
        refetch();
      } catch (error: any) {
        ErrorSwal({
          title: "Error!",
          text: error?.data?.message || "Failed to delete trade.",
        });
      }
    }
  };

  const handleBulkDelete = async (type: "selected" | "all" | "filtered") => {
    let confirmText = "";
    let payload: any = {};

    switch (type) {
      case "selected":
        if (selectedRowKeys.length === 0) {
          message.warning("Please select trades to delete");
          return;
        }
        confirmText = `Are you sure you want to delete ${selectedRowKeys.length} selected trade(s)?`;
        payload = { ids: selectedRowKeys };
        break;
      case "all":
        confirmText =
          "Are you sure you want to delete ALL trades? This action cannot be undone!";
        payload = { delete_all: true };
        break;
      case "filtered":
        confirmText = `Are you sure you want to delete all ${activeTab === "all" ? "" : activeTab} trades?`;
        payload = { delete_all: true };
        if (activeTab === "wins") {
          payload.outcome = "win";
        } else if (activeTab === "losses") {
          payload.outcome = "loss";
        } else if (activeTab === "disciplined") {
          payload.discipline_status = "disciplined";
        } else if (activeTab === "violations") {
          payload.rule_breach = true;
        }
        break;
    }

    const result = await ErrorSwal({
      title: "Bulk Delete Trades?",
      text: confirmText,
    });

    if (result.isConfirmed) {
      try {
        const response = await bulkDeleteTrades(payload).unwrap();

        let successMessage = response.message;
        if (response.not_found) {
          successMessage += `\n${response.note}`;
        }

        SuccessSwal({
          title: "Deleted!",
          text: successMessage,
        });

        setSelectedRowKeys([]);
        refetch();
      } catch (error: any) {
        ErrorSwal({
          title: "Error!",
          text:
            error?.data?.error ||
            error?.data?.message ||
            "Failed to delete trades.",
        });
      }
    }
  };

  // Row selection configuration
  const rowSelection: TableRowSelection<TradeData> = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys: Key[]) => {
      setSelectedRowKeys(newSelectedRowKeys);
    },
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
    ],
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
          {market?.replace("_", " ")}
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
          {direction?.toUpperCase()}
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
      title: "Rules Followed",
      dataIndex: "rules_followed",
      key: "rules_followed",
      align: "center",
      render: (rules_followed: string[]) => (
        <div className="flex gap-1 flex-wrap justify-center">
          {rules_followed && rules_followed.length > 0 ? (
            <span className="text-green-500 text-[10px] font-medium">
              {rules_followed.length}
            </span>
          ) : (
            <span className="text-gray-400">-</span>
          )}
        </div>
      ),
    },
    {
      title: "Mistakes",
      dataIndex: "mistakes",
      key: "mistakes",
      align: "center",
      render: (mistakes: string[]) => (
        <div className="flex gap-1 flex-wrap justify-center">
          {mistakes && mistakes.length > 0 ? (
            <span className="text-red-500 text-[10px] font-medium">
              {mistakes.length}
            </span>
          ) : (
            <span className="text-gray-400">-</span>
          )}
        </div>
      ),
    },
    {
      title: "Violations",
      dataIndex: "violation_modes",
      key: "violation_modes",
      align: "center",
      render: (violations) => (
        <div className="flex gap-1 flex-wrap justify-center">
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
          <IoCreateOutline
            className="text-lg cursor-pointer hover:text-green-500 transition-colors"
            onClick={() => handleOpenEditModal(record)}
          />
          <IoTrashOutline
            className="text-lg cursor-pointer hover:text-red-500 transition-colors"
            onClick={() => handleDeleteTrade(record)}
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

      {/* Filter Tabs with Delete All Button */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm text-gray-600 dark:text-gray-400 mr-2">
              Filter by:
            </span>
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => {
                  setActiveTab(tab.key);
                  setSelectedRowKeys([]);
                }}
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

          {/* Delete Buttons Group */}
          <div className="flex items-center gap-2">
            {selectedRowKeys.length > 0 && (
              <button
                onClick={() => handleBulkDelete("selected")}
                className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors flex items-center gap-2"
              >
                <IoTrashOutline className="text-base" />
                Delete Selected ({selectedRowKeys.length})
              </button>
            )}

            {activeTab !== "all" && (
              <button
                onClick={() => handleBulkDelete("filtered")}
                className="px-4 py-2 bg-orange-600 text-white rounded-lg text-sm font-medium hover:bg-orange-700 transition-colors flex items-center gap-2"
              >
                <IoTrashOutline className="text-base" />
                Delete Filtered
              </button>
            )}

            <button
              onClick={() => handleBulkDelete("all")}
              className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors flex items-center gap-2"
            >
              <IoTrashOutline className="text-base" />
              Delete All
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <Table
          rowSelection={rowSelection}
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
              setSelectedRowKeys([]);
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
