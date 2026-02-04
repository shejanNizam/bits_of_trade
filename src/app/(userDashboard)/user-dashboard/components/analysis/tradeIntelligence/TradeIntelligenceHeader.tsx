import { Select } from "antd";
import { FaBrain, FaChevronDown } from "react-icons/fa";

const TradeIntelligenceHeader = () => {
  return (
    <div className="w-full p-4 mb-6 transition-colors duration-200 bg-white border border-gray-100 rounded-xl shadow-sm dark:bg-gray-700 dark:border-gray-700">
      <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
        {/* Filters Group */}
        <div className="flex flex-col w-full gap-4 sm:flex-row sm:items-center md:w-auto">
          {/* Market Filter */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-400 dark:text-zinc-500 whitespace-nowrap">
              Market:
            </span>
            <Select
              defaultValue="All Markets"
              className="w-full sm:w-40"
              suffixIcon={<FaChevronDown className="text-xs" />}
              options={[
                { value: "all", label: "All Markets" },
                { value: "forex", label: "Forex" },
                { value: "crypto", label: "Crypto" },
                { value: "stocks", label: "Stocks" },
              ]}
            />
          </div>

          {/* Period Filter */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-400 dark:text-zinc-500 whitespace-nowrap">
              Period:
            </span>
            <Select
              defaultValue="last-30-days"
              className="w-full sm:w-48"
              suffixIcon={<FaChevronDown className="text-xs" />}
              options={[
                { value: "last-7-days", label: "Last 7 Days" },
                { value: "last-30-days", label: "Last 30 Days" },
                { value: "last-3-months", label: "Last 3 Months" },
                { value: "ytd", label: "Year to Date" },
              ]}
            />
          </div>
        </div>

        {/* Action Button - Kept Tailwind for specific styling */}
        <button className="flex items-center justify-center w-full gap-2 px-6 py-2.5 text-sm font-semibold text-white transition-all bg-[#8B2CFF] hover:bg-[#7a25e0] rounded-xl md:w-auto shadow-lg shadow-purple-500/20 active:scale-95">
          <FaBrain className="w-4 h-4" />
          Analyze Trading
        </button>
      </div>
    </div>
  );
};

export default TradeIntelligenceHeader;
