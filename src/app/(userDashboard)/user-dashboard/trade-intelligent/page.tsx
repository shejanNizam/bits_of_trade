/* eslint-disable @typescript-eslint/no-explicit-any */
// import { DisciplineHealthSummary } from "../components/analysis/tradeIntelligence/DisciplineHealthSummary";
// import FixesForNext from "../components/analysis/tradeIntelligence/FixesForNext";
// import { PatternsWeSeeRepeating } from "../components/analysis/tradeIntelligence/PatternsWeSeeRepeating";
// import TradeIntelligence from "../components/analysis/tradeIntelligence/TradeIntelligence";
// import TradeIntelligenceHeader from "../components/analysis/tradeIntelligence/TradeIntelligenceHeader";
// import { WhatHoldingYouBack } from "../components/analysis/tradeIntelligence/WhatHoldingYouBack";
// import { WhatYouDoingWell } from "../components/analysis/tradeIntelligence/WhatYouDoingWell";

// export default function TradeIntelligentPage() {
//   return (
//     <div className="space-y-4">
//       <TradeIntelligenceHeader />

//       <TradeIntelligence />

//       <WhatYouDoingWell />

//       <WhatHoldingYouBack />

//       <PatternsWeSeeRepeating />

//       <DisciplineHealthSummary />

//       <FixesForNext />
//     </div>
//   );
// }

"use client";

import { useCreateAnalyzeMutation } from "@/redux/features/tradeIntelligence/tradeIntelligenceApi";
import { message, Spin } from "antd";
import { useState } from "react";
import { DisciplineHealthSummary } from "../components/analysis/tradeIntelligence/DisciplineHealthSummary";
// import FixesForNext from "../components/analysis/tradeIntelligence/FixesForNext";
import { PatternsWeSeeRepeating } from "../components/analysis/tradeIntelligence/PatternsWeSeeRepeating";
import TradeIntelligence from "../components/analysis/tradeIntelligence/TradeIntelligence";
import TradeIntelligenceHeader from "../components/analysis/tradeIntelligence/TradeIntelligenceHeader";
import { WhatHoldingYouBack } from "../components/analysis/tradeIntelligence/WhatHoldingYouBack";
import { WhatYouDoingWell } from "../components/analysis/tradeIntelligence/WhatYouDoingWell";

export default function TradeIntelligentPage() {
  const [createAnalyze, { isLoading }] = useCreateAnalyzeMutation();
  const [intelligenceData, setIntelligenceData] = useState<any>(null);

  // Filter states
  const [selectedMarket, setSelectedMarket] = useState<string>("all");
  const [selectedBroker, setSelectedBroker] = useState<string>("all");
  const [selectedPeriod, setSelectedPeriod] = useState<string>("all");
  const [customDateRange, setCustomDateRange] = useState<{
    fromDate: string | null;
    toDate: string | null;
  }>({
    fromDate: null,
    toDate: null,
  });

  const handleAnalyze = async () => {
    // Build payload according to API spec
    const payload: any = {
      timeRange: selectedPeriod,
    };

    // For custom range, both fromDate and toDate are REQUIRED
    if (selectedPeriod === "custom") {
      if (!customDateRange.fromDate || !customDateRange.toDate) {
        message.error(
          "Both start date and end date are required for custom range",
        );
        return;
      }
      payload.fromDate = customDateRange.fromDate;
      payload.toDate = customDateRange.toDate;
    }

    // Add market filter if provided (not empty string)
    if (selectedMarket && selectedMarket !== "") {
      payload.market = selectedMarket;
    }

    // Add broker filter if provided (not empty string)
    if (selectedBroker && selectedBroker !== "") {
      payload.broker = selectedBroker;
    }

    try {
      const result = await createAnalyze(payload).unwrap();
      setIntelligenceData(result);

      if (result.total_trades === 0) {
        message.info(
          result.message || "No trades found in the selected period.",
        );
      } else {
        message.success("Trade intelligence analysis completed!");
      }
    } catch (error: any) {
      message.error(
        error?.data?.message || "Failed to analyze trade intelligence",
      );
      console.error("Analysis failed:", error);
    }
  };

  const handlePeriodChange = (value: string) => {
    setSelectedPeriod(value);
    // Reset custom dates when switching away from custom
    if (value !== "custom") {
      setCustomDateRange({ fromDate: null, toDate: null });
    }
  };

  const handleCustomDateChange = (
    dates: any,
    dateStrings: [string, string],
  ) => {
    if (dates) {
      setCustomDateRange({
        fromDate: dateStrings[0],
        toDate: dateStrings[1],
      });
    } else {
      setCustomDateRange({ fromDate: null, toDate: null });
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center gap-3 min-h-100">
        <Spin size="large" />
        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
          Analyzing your trading data...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <TradeIntelligenceHeader
        onAnalyze={handleAnalyze}
        selectedMarket={selectedMarket}
        selectedBroker={selectedBroker}
        selectedPeriod={selectedPeriod}
        customDateRange={customDateRange}
        onMarketChange={setSelectedMarket}
        onBrokerChange={setSelectedBroker}
        onPeriodChange={handlePeriodChange}
        onCustomDateChange={handleCustomDateChange}
        isLoading={isLoading}
      />

      {intelligenceData ? (
        intelligenceData.total_trades === 0 ? (
          <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-12 text-center">
            <p className="text-gray-500 dark:text-gray-400">
              {intelligenceData.message ||
                "No trades found in the selected period."}
            </p>
          </div>
        ) : (
          <>
            <TradeIntelligence data={intelligenceData} />
            <WhatYouDoingWell doingWell={intelligenceData.doing_well || []} />
            <WhatHoldingYouBack
              holdingBack={intelligenceData.holding_back || []}
            />
            <PatternsWeSeeRepeating
              repeatingPatterns={intelligenceData.repeating_patterns || []}
              totalTrades={intelligenceData.total_trades}
            />
            <DisciplineHealthSummary
              disciplineHealth={intelligenceData.discipline_health}
            />
            {/* <FixesForNext /> */}
          </>
        )
      ) : (
        <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-12 text-center">
          <p className="text-gray-500 dark:text-gray-400">
            {
              "Click 'Analyze Trading' to generate your trade intelligence report"
            }
          </p>
        </div>
      )}
    </div>
  );
}
