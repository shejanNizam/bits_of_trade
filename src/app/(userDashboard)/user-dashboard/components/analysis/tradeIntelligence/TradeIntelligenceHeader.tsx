/* eslint-disable @typescript-eslint/no-explicit-any */
// import { Select } from "antd";
// import { FaBrain, FaChevronDown } from "react-icons/fa";

// const TradeIntelligenceHeader = () => {
//   return (
//     <div className="w-full p-4 mb-6 transition-colors duration-200 bg-white border border-gray-100 rounded-xl shadow-sm dark:bg-gray-700 dark:border-gray-700">
//       <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
//         {/* Filters Group */}
//         <div className="flex flex-col w-full gap-4 sm:flex-row sm:items-center md:w-auto">
//           {/* Market Filter */}
//           <div className="flex items-center gap-2">
//             <span className="text-sm font-medium text-gray-400 dark:text-zinc-500 whitespace-nowrap">
//               Market:
//             </span>
//             <Select
//               defaultValue="All Markets"
//               className="w-full sm:w-40"
//               suffixIcon={<FaChevronDown className="text-xs" />}
//               options={[
//                 { value: "all", label: "All Markets" },
//                 { value: "forex", label: "Forex" },
//                 { value: "crypto", label: "Crypto" },
//                 { value: "stocks", label: "Stocks" },
//               ]}
//             />
//           </div>

//           {/* Period Filter */}
//           <div className="flex items-center gap-2">
//             <span className="text-sm font-medium text-gray-400 dark:text-zinc-500 whitespace-nowrap">
//               Period:
//             </span>
//             <Select
//               defaultValue="last-30-days"
//               className="w-full sm:w-48"
//               suffixIcon={<FaChevronDown className="text-xs" />}
//               options={[
//                 { value: "last-7-days", label: "Last 7 Days" },
//                 { value: "last-30-days", label: "Last 30 Days" },
//                 { value: "last-3-months", label: "Last 3 Months" },
//                 { value: "ytd", label: "Year to Date" },
//               ]}
//             />
//           </div>
//         </div>

//         {/* Action Button - Kept Tailwind for specific styling */}
//         <button className="flex items-center justify-center w-full gap-2 px-6 py-2.5 text-sm font-semibold text-white transition-all bg-[#8B2CFF] hover:bg-[#7a25e0] rounded-xl md:w-auto shadow-lg shadow-purple-500/20 active:scale-95">
//           <FaBrain className="w-4 h-4" />
//           Analyze Trading
//         </button>
//       </div>
//     </div>
//   );
// };

// export default TradeIntelligenceHeader;

import { DatePicker, Select, Spin, Tooltip } from "antd";
import dayjs from "dayjs";
import { FaBrain, FaChevronDown, FaInfoCircle } from "react-icons/fa";

const { RangePicker } = DatePicker;

interface TradeIntelligenceHeaderProps {
  onAnalyze: () => void;
  selectedMarket: string;
  selectedBroker: string;
  selectedPeriod: string;
  customDateRange: {
    fromDate: string | null;
    toDate: string | null;
  };
  onMarketChange: (value: string) => void;
  onBrokerChange: (value: string) => void;
  onPeriodChange: (value: string) => void;
  onCustomDateChange: (dates: any, dateStrings: [string, string]) => void;
  isLoading: boolean;
}

const TradeIntelligenceHeader = ({
  onAnalyze,
  selectedMarket,
  selectedBroker,
  selectedPeriod,
  customDateRange,
  onMarketChange,
  onBrokerChange,
  onPeriodChange,
  onCustomDateChange,
  isLoading,
}: TradeIntelligenceHeaderProps) => {
  const marketOptions = [
    { value: "all", label: "All" },
    { value: "indian_stocks", label: "Indian Stocks" },
    { value: "forex", label: "Forex" },
    { value: "crypto", label: "Crypto" },
    { value: "options", label: "Options" },
  ];

  const brokerOptions = [
    { value: "all", label: "All" },
    { value: "zerodha", label: "zerodha" },
    { value: "upstox", label: "upstox" },
    { value: "groww", label: "groww" },
    { value: "dhan", label: "dhan" },
    { value: "fyers", label: "fyers" },
    { value: "angelone", label: "angelone" },
  ];

  // Time range options matching API exactly
  const timeRangeOptions = [
    { value: "all", label: "All Time" },
    { value: "last7", label: "Last 7 Days" },
    { value: "last30", label: "Last 30 Days", default: true },
    { value: "last90", label: "Last 3 Months" },
    { value: "last365", label: "Last 365 Days" },
    { value: "custom", label: "Custom Range" },
  ];

  const isAnalyzeDisabled = () => {
    if (isLoading) return true;
    if (selectedPeriod === "custom") {
      return !customDateRange.fromDate || !customDateRange.toDate;
    }
    return false;
  };

  const getAnalyzeTooltip = () => {
    if (
      selectedPeriod === "custom" &&
      (!customDateRange.fromDate || !customDateRange.toDate)
    ) {
      return "Please select both start and end dates for custom range";
    }
    return "Analyze your trading data to get intelligence insights";
  };

  return (
    <div className="w-full p-5 mb-6 transition-colors duration-200 bg-white border border-gray-100 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700">
      <div className="flex flex-col gap-5">
        {/* Title Row */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              Trade Intelligence
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              AI-powered analysis of your trading behavior and performance
            </p>
          </div>
          <Tooltip title="Based on your trade logs, discipline sessions, psychology journals, violations, and rule data">
            <FaInfoCircle className="text-gray-400 cursor-help" />
          </Tooltip>
        </div>

        {/* Filters Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* Market Filter */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-600 dark:text-gray-400">
              Market Filter
            </label>
            <Select
              value={selectedMarket}
              onChange={onMarketChange}
              className="w-full"
              suffixIcon={<FaChevronDown className="text-xs" />}
              options={marketOptions}
              placeholder=" Select a Market"
              allowClear
              disabled={isLoading}
            />
          </div>

          {/* Broker Filter */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-600 dark:text-gray-400">
              Broker Filter
            </label>
            <Select
              value={selectedBroker}
              onChange={onBrokerChange}
              className="w-full"
              suffixIcon={<FaChevronDown className="text-xs" />}
              options={brokerOptions}
              placeholder="Select a Brokers"
              showSearch
              allowClear
              disabled={isLoading}
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
            />
          </div>

          {/* Time Range */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-600 dark:text-gray-400">
              Time Range <span className="text-red-500">*</span>
            </label>
            <Select
              value={selectedPeriod}
              onChange={onPeriodChange}
              className="w-full"
              placeholder="Select a Time Range"
              suffixIcon={<FaChevronDown className="text-xs" />}
              options={timeRangeOptions}
              disabled={isLoading}
            />
          </div>

          {/* Custom Date Range - Only shows when custom is selected */}
          {selectedPeriod === "custom" && (
            <div className="flex flex-col gap-1.5 sm:col-span-2 lg:col-span-1">
              <label className="text-xs font-semibold text-gray-600 dark:text-gray-400">
                Date Range <span className="text-red-500">*</span>
              </label>
              <RangePicker
                value={
                  customDateRange.fromDate && customDateRange.toDate
                    ? [
                        dayjs(customDateRange.fromDate),
                        dayjs(customDateRange.toDate),
                      ]
                    : null
                }
                onChange={onCustomDateChange}
                className="w-full"
                placeholder={["Start Date", "End Date"]}
                disabled={isLoading}
                format="YYYY-MM-DD"
              />
            </div>
          )}
        </div>

        {/* Action Button */}
        <div className="flex justify-end pt-2">
          <Tooltip title={getAnalyzeTooltip()}>
            <button
              onClick={onAnalyze}
              disabled={isAnalyzeDisabled()}
              className="flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-semibold text-white transition-all bg-[#8B2CFF] hover:bg-[#7a25e0] rounded-xl shadow-lg shadow-purple-500/20 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <Spin size="small" />
              ) : (
                <FaBrain className="w-4 h-4" />
              )}
              {isLoading ? "Analyzing..." : "Analyze Trading"}
            </button>
          </Tooltip>
        </div>

        {/* API Info Note */}
        <div className="text-[10px] text-gray-400 dark:text-gray-500 border-t border-gray-100 dark:border-gray-700 pt-3 mt-1">
          <p>
            Analysis includes: Trade logs, discipline sessions, psychology
            journals, violations, and rule data.
            {selectedPeriod === "custom" &&
              customDateRange.fromDate &&
              customDateRange.toDate && (
                <span className="ml-2 text-blue-500">
                  Analyzing from {customDateRange.fromDate} to{" "}
                  {customDateRange.toDate}
                </span>
              )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TradeIntelligenceHeader;
