/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  useAddToMineStrategyMutation,
  useGetAllStrategyForTemplatesQuery,
} from "@/redux/features/strategy/strategyApi";
import { Strategy } from "@/types/strategy";
import { ErrorSwal, SuccessSwal } from "@/utils/allSwal";
import { Button } from "antd";
import { FaCopy } from "react-icons/fa";
import { IoMdTrendingUp } from "react-icons/io";

export default function TemplatesTab({ searchTerm }: { searchTerm: string }) {
  const { data, isLoading, error } = useGetAllStrategyForTemplatesQuery({
    search: searchTerm,
  });
  const strategies: Strategy[] = data || [];

  const [addToMine] = useAddToMineStrategyMutation();

  const handleAddToMine = async (id: string) => {
    try {
      const response = await addToMine(id).unwrap();

      SuccessSwal({
        title: "Success!",
        text:
          response?.message ||
          "Strategy template added to your collection successfully!",
      });
    } catch (error: any) {
      // Handle different error cases
      const errorMessage =
        error?.data?.message || error?.message || "Add to mine failed!";

      // Check for specific error cases
      if (
        errorMessage.toLowerCase().includes("not found") ||
        errorMessage.toLowerCase().includes("not public")
      ) {
        ErrorSwal({
          title: "Cannot Add Strategy",
          text: "This strategy template is no longer available or has been removed from public templates.",
        });
      } else if (errorMessage.toLowerCase().includes("already")) {
        ErrorSwal({
          title: "Already Added",
          text: "You have already added this strategy to your collection.",
        });
      } else {
        ErrorSwal({
          title: "Add to Mine Failed",
          text: errorMessage,
        });
      }

      console.error("Add to mine error:", error);
    }
  };

  const getStatusBadge = (status: string) => {
    const statusColors: Record<string, string> = {
      mature: "bg-green-600",
      testing: "bg-yellow-600",
      draft: "bg-gray-600",
    };
    return statusColors[status] || "bg-purple-600";
  };

  const getMaturityStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      mature: "MATURE",
      testing: "TESTING",
      draft: "DRAFT",
    };
    return labels[status] || status.toUpperCase();
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <p className="text-slate-500">Loading strategy templates...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center py-12">
        <p className="text-red-500">
          Error loading strategy templates. Please try again.
        </p>
      </div>
    );
  }

  if (!strategies || strategies.length === 0) {
    return (
      <div className="min-h-100 flex flex-col items-center justify-center text-center p-8 bg-white dark:bg-primary/10 rounded-3xl border-2 border-dashed border-slate-200 dark:border-zinc-800 mt-4">
        <div className="w-16 h-16 bg-slate-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mb-4">
          <IoMdTrendingUp className="text-slate-400" size={32} />
        </div>
        <h3 className="text-xl font-bold dark:text-white">
          Strategy Templates
        </h3>
        <p className="text-slate-500 dark:text-zinc-400 mt-2 mb-6 max-w-xs">
          Start with proven strategy templates and customize them to your style.
        </p>
        <Button
          type="primary"
          size="large"
          className="bg-blue-600 px-8 rounded-xl h-12 font-bold"
        >
          Browse Templates
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 py-4">
      {strategies.map((strategy) => (
        <div
          key={strategy.id}
          className="bg-white dark:bg-primary/10 p-6 rounded-2xl border border-slate-200 dark:border-zinc-800 flex flex-col lg:flex-row justify-between gap-6 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <h3 className="font-bold text-lg dark:text-white">
                {strategy.strategy_name}
              </h3>
              {strategy.maturity_status && (
                <span
                  className={`${getStatusBadge(strategy.maturity_status)} text-[10px] text-white px-1.5 py-0.5 rounded font-bold uppercase`}
                >
                  {getMaturityStatusLabel(strategy.maturity_status)}
                </span>
              )}
              {strategy.is_template && (
                <span className="bg-purple-600 text-[10px] text-white px-1.5 py-0.5 rounded font-bold">
                  TEMPLATE
                </span>
              )}
              {strategy.total_trades === 0 && (
                <span className="bg-blue-600 text-[10px] text-white px-1.5 py-0.5 rounded font-bold">
                  NEW
                </span>
              )}
            </div>

            {strategy.description && (
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-2">
                {strategy.description}
              </p>
            )}

            <div className="flex flex-wrap gap-8">
              <div>
                <p className="text-xs text-slate-400">Win Rate</p>
                <p
                  className={`font-bold text-lg ${strategy.win_rate > 0 ? "text-teal-500" : "text-slate-500"}`}
                >
                  {strategy.win_rate > 0
                    ? `${strategy.win_rate.toFixed(1)}%`
                    : "N/A"}
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-400">Trades</p>
                <p className="font-bold dark:text-white text-lg">
                  {strategy.total_trades}
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-400">Segment</p>
                <p className="font-bold dark:text-white text-lg">
                  {strategy.market_types && strategy.market_types.length > 0
                    ? strategy.market_types
                        .map((type) =>
                          type === "all"
                            ? "All Markets"
                            : type === "indian_market"
                              ? "Indian Market"
                              : type === "options"
                                ? "F&O"
                                : type.charAt(0).toUpperCase() + type.slice(1),
                        )
                        .join(", ")
                    : "All Markets"}
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-400">Trade Type</p>
                <p className="font-bold dark:text-white text-lg capitalize">
                  {strategy.trade_type || "Intraday"}
                </p>
              </div>
              {strategy.total_pnl !== undefined && strategy.total_pnl !== 0 && (
                <div>
                  <p className="text-xs text-slate-400">Total P&L</p>
                  <p
                    className={`font-bold text-lg ${strategy.total_pnl >= 0 ? "text-green-500" : "text-red-500"}`}
                  >
                    ₹{Math.abs(strategy.total_pnl).toLocaleString()}
                    {strategy.total_pnl < 0 ? " (Loss)" : " (Profit)"}
                  </p>
                </div>
              )}
            </div>

            {/* Entry Rules Section */}
            {strategy.entry_rules && strategy.entry_rules.length > 0 && (
              <div className="mt-4">
                <p className="text-xs text-slate-400 font-semibold mb-1">
                  Entry Rules
                </p>
                <div className="flex gap-1 flex-wrap">
                  {strategy.entry_rules.slice(0, 3).map((rule, idx) => (
                    <span
                      key={idx}
                      className="text-xs bg-slate-100 dark:bg-zinc-800 px-2 py-0.5 rounded"
                    >
                      {rule}
                    </span>
                  ))}
                  {strategy.entry_rules.length > 3 && (
                    <span className="text-xs text-slate-500">
                      +{strategy.entry_rules.length - 3}
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Tags Section */}
            {strategy.tags && strategy.tags.length > 0 && (
              <div className="mt-3">
                <p className="text-xs text-slate-400 font-semibold mb-1">
                  Tags
                </p>
                <div className="flex gap-1 flex-wrap">
                  {strategy.tags.slice(0, 3).map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-xs bg-slate-100 dark:bg-zinc-800 px-2 py-0.5 rounded"
                    >
                      {tag.trim()}
                    </span>
                  ))}
                  {strategy.tags.length > 3 && (
                    <span className="text-xs text-slate-500">
                      +{strategy.tags.length - 3}
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Sample Size Progress */}
            <div className="mt-4">
              <div className="flex justify-between text-xs text-slate-500 mb-1">
                <span>Sample Size Progress</span>
                <span>
                  {strategy.sample_size_progress || 0} /{" "}
                  {strategy.sample_size_threshold || 30}
                </span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-zinc-700 rounded-full h-1.5">
                <div
                  className="bg-purple-600 h-1.5 rounded-full transition-all duration-300"
                  style={{
                    width: `${Math.min(100, ((strategy.sample_size_progress || 0) / (strategy.sample_size_threshold || 30)) * 100)}%`,
                  }}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 justify-center min-w-50">
            <Button
              type="primary"
              className="bg-purple-600 h-11 font-semibold hover:bg-purple-700"
            >
              View Template
            </Button>
            <Button
              icon={<FaCopy size={16} />}
              className="h-11 dark:bg-zinc-800 dark:text-white dark:border-zinc-700 hover:border-purple-500"
              onClick={() => handleAddToMine(strategy.id)}
            >
              Use Template
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
