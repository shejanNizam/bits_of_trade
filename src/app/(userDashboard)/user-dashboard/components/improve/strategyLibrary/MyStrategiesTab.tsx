// import StrategyCard from "./StrategyCard";

// interface StrategyData {
//   title: string;
//   status: "Mature" | "Developing" | "Testing";
//   progress: number;
//   color: string;
//   segment: string;
//   tags: string[];
//   stats: {
//     "Win Rate": string;
//     Trades: string;
//     "Total P&L": string;
//     "Avg Return": string;
//   };
// }

// export default function MyStrategiesTab() {
//   const data: StrategyData[] = [
//     {
//       title: "Momentum Breakout",
//       status: "Developing",
//       progress: 93,
//       color: "bg-green-500",
//       segment: "Indian Stocks",
//       tags: ["breakout", "volume", "resistance"],
//       stats: {
//         "Win Rate": "68.5%",
//         Trades: "28",
//         "Total P&L": "+₹5,000",
//         "Avg Return": "2.4%",
//       },
//     },
//     {
//       title: "Trend Following",
//       status: "Mature",
//       progress: 90,
//       color: "bg-green-500",
//       segment: "Forex",
//       tags: ["trend", "pullback", "moving average"],
//       stats: {
//         "Win Rate": "56.2%",
//         Trades: "45",
//         "Total P&L": "+₹10,000",
//         "Avg Return": "1.8%",
//       },
//     },
//     {
//       title: "Mean Reversion",
//       status: "Testing",
//       progress: 68,
//       color: "bg-orange-500",
//       segment: "Options",
//       tags: ["RSI", "oversold", "range"],
//       stats: {
//         "Win Rate": "72.1%",
//         Trades: "34",
//         "Total P&L": "+₹3,000",
//         "Avg Return": "1.5%",
//       },
//     },
//   ];

//   return (
//     <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 py-4">
//       {data.map((item, idx) => (
//         <StrategyCard key={idx} {...item} />
//       ))}
//     </div>
//   );
// }

// MyStrategiesTab.tsx

"use client";

import {
  useDeleteStrategyMutation,
  useGetAllStrategyQuery,
} from "@/redux/features/strategy/strategyApi";
import { Strategy } from "@/types/strategy";
import { Empty, message, Spin } from "antd";
import { useEffect, useState } from "react";
import DeleteConfirmModal from "./DeleteConfirmModal";
import StrategyCard from "./StrategyCard";

interface MyStrategiesTabProps {
  onEditStrategy?: (strategy: Strategy) => void;
}

export default function MyStrategiesTab({
  onEditStrategy,
}: MyStrategiesTabProps) {
  const [strategies, setStrategies] = useState<Strategy[]>([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedStrategy, setSelectedStrategy] = useState<Strategy | null>(
    null,
  );

  const { data, isLoading, isError, refetch } = useGetAllStrategyQuery({
    page: 1,
    limit: 100,
  });
  const [deleteStrategy] = useDeleteStrategyMutation();

  useEffect(() => {
    if (data?.data) {
      setStrategies(data.data);
    } else if (data && Array.isArray(data)) {
      setStrategies(data);
    }
  }, [data]);

  const handleEdit = (strategy: Strategy) => {
    // Only call the parent's edit handler - no local modal
    if (onEditStrategy) {
      onEditStrategy(strategy);
    }
  };

  const handleDelete = (strategy: Strategy) => {
    setSelectedStrategy(strategy);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedStrategy) return;

    try {
      await deleteStrategy(selectedStrategy.id).unwrap();
      message.success("Strategy deleted successfully");
      refetch();
      setDeleteModalOpen(false);
      setSelectedStrategy(null);
    } catch (error) {
      message.error("Failed to delete strategy");
      console.error("Delete error:", error);
    }
  };

  const getStatusColor = (maturityStatus: string) => {
    switch (maturityStatus?.toLowerCase()) {
      case "mature":
        return "bg-green-500";
      case "developing":
        return "bg-yellow-500";
      case "testing":
        return "bg-blue-500";
      default:
        return "bg-purple-500";
    }
  };

  const getStatus = (
    maturityStatus: string,
  ): "Mature" | "Developing" | "Testing" => {
    switch (maturityStatus?.toLowerCase()) {
      case "mature":
        return "Mature";
      case "developing":
        return "Developing";
      case "testing":
        return "Testing";
      default:
        return "Testing";
    }
  };

  const calculateProgress = (strategy: Strategy) => {
    if (strategy.sample_size_threshold === 0) return 0;
    const progress =
      ((strategy.sample_size_progress || 0) / strategy.sample_size_threshold) *
      100;
    return Math.min(Math.round(progress), 100);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spin size="large" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-64">
        <Empty description="Failed to load strategies" />
      </div>
    );
  }

  if (!strategies || strategies.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <Empty description="No strategies found. Create your first strategy!" />
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 py-4">
        {strategies.map((strategy) => (
          <StrategyCard
            key={strategy.id}
            id={strategy.id}
            title={strategy.strategy_name}
            description={strategy.description}
            status={getStatus(strategy.maturity_status)}
            progress={calculateProgress(strategy)}
            color={getStatusColor(strategy.maturity_status)}
            segment={strategy.market_types?.[0] || "General"}
            tags={strategy.tags || []}
            stats={{
              "Win Rate": `${strategy.win_rate || 0}%`,
              Trades: `${strategy.total_trades || 0}`,
              "Total P&L": `${strategy.total_pnl || 0 >= 0 ? "+" : ""}₹${Math.abs(strategy.total_pnl || 0).toLocaleString()}`,
              "Avg Return": `${((strategy.total_pnl || 0) / (strategy.total_trades || 1)).toFixed(2)}%`,
            }}
            tradeType={strategy.trade_type}
            onEdit={() => handleEdit(strategy)}
            onDelete={() => handleDelete(strategy)}
          />
        ))}
      </div>

      <DeleteConfirmModal
        open={deleteModalOpen}
        onCancel={() => setDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        strategyName={selectedStrategy?.strategy_name}
      />
    </>
  );
}
