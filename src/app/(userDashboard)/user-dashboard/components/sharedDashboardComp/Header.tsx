// /* eslint-disable @typescript-eslint/no-unused-vars */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import ThemeToggle from "@/components/shared/ThemeToggle";
// import { DateRange, MarketType, useFilters } from "@/contexts/FilterContext";
// import { DatePicker, Divider, Dropdown, Select } from "antd";
// import dayjs from "dayjs";
// import { useEffect, useState } from "react";
// import {
//   MdCalendarToday,
//   MdFilterList,
//   MdMenu,
//   MdSearch,
//   MdSettingsInputComponent,
// } from "react-icons/md";
// import AdvancedFiltersModal, { FilterState } from "./AdvancedFiltersModal";

// const { RangePicker } = DatePicker;

// interface HeaderProps {
//   toggleSidebar: () => void;
// }

// export default function Header({ toggleSidebar }: HeaderProps) {
//   const [mounted, setMounted] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
//   const { filters, updateFilters, resetFilters, activeFilterCount } =
//     useFilters();

//   // Quick Filter states
//   const [selectedBroker, setSelectedBroker] = useState(filters.broker || "all");
//   const [selectedMarket, setSelectedMarket] = useState<string>(
//     filters.market_type || "all",
//   );
//   const [selectedPeriod, setSelectedPeriod] = useState<string>(
//     filters.date_range || "all",
//   );
//   const [customDateRange, setCustomDateRange] = useState<
//     [string, string] | null
//   >(() => {
//     if (filters.date_from && filters.date_to) {
//       return [filters.date_from, filters.date_to];
//     }
//     return null;
//   });

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   // Update local state when filters change externally
//   useEffect(() => {
//     setSelectedBroker(filters.broker || "all");
//     setSelectedMarket(filters.market_type || "all");
//     setSelectedPeriod(filters.date_range || "all");

//     if (filters.date_from && filters.date_to) {
//       setCustomDateRange([filters.date_from, filters.date_to]);
//     } else {
//       setCustomDateRange(null);
//     }
//   }, [filters]);

//   // Handle quick filter changes
//   const handleBrokerChange = (value: string) => {
//     setSelectedBroker(value);
//     updateFilters({ broker: value === "all" ? undefined : value });
//   };

//   const handleMarketChange = (value: string) => {
//     setSelectedMarket(value);
//     const marketType = value === "all" ? undefined : (value as MarketType);
//     updateFilters({ market_type: marketType });
//   };

//   const handlePeriodChange = (value: string) => {
//     setSelectedPeriod(value);

//     if (value === "custom") {
//       if (!customDateRange) {
//         updateFilters({
//           date_range: undefined,
//           date_from: undefined,
//           date_to: undefined,
//         });
//       } else {
//         updateFilters({
//           date_range: "custom",
//           date_from: customDateRange[0],
//           date_to: customDateRange[1],
//         });
//       }
//     } else if (value === "all") {
//       updateFilters({
//         date_range: undefined,
//         date_from: undefined,
//         date_to: undefined,
//       });
//     } else {
//       updateFilters({
//         date_range: value as DateRange,
//         date_from: undefined,
//         date_to: undefined,
//       });
//     }
//   };

//   const handleDateRangeChange = (dates: any, dateStrings: [string, string]) => {
//     if (dates && dateStrings[0] && dateStrings[1]) {
//       setCustomDateRange([dateStrings[0], dateStrings[1]]);
//       updateFilters({
//         date_range: "custom",
//         date_from: dateStrings[0],
//         date_to: dateStrings[1],
//       });
//       setSelectedPeriod("custom");
//     } else {
//       setCustomDateRange(null);
//       if (selectedPeriod === "custom") {
//         updateFilters({
//           date_range: undefined,
//           date_from: undefined,
//           date_to: undefined,
//         });
//         setSelectedPeriod("all");
//       }
//     }
//   };

//   const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value;
//     updateFilters({ search: value || undefined });
//   };

//   const handleApplyAdvanced = (advancedFilters: FilterState, count: number) => {
//     const apiFilters: any = {};

//     if (advancedFilters.direction !== "All Directions") {
//       apiFilters.direction =
//         advancedFilters.direction === "Long Only" ? "long" : "short";
//     }

//     if (advancedFilters.outcome !== "All Outcomes") {
//       apiFilters.outcome =
//         advancedFilters.outcome === "Wins Only" ? "win" : "loss";
//     }

//     if (advancedFilters.instrument !== "All Instruments") {
//       if (advancedFilters.instrument === "F&O (Options/Futures)") {
//         apiFilters.market_type = "options";
//       } else if (advancedFilters.instrument === "Equities") {
//         apiFilters.market_type = "indian_market";
//       }
//     }

//     if (advancedFilters.strategy !== "All Strategies") {
//       apiFilters.strategy = advancedFilters.strategy;
//     }

//     if (advancedFilters.emotionalState !== "All States") {
//       apiFilters.emotional_state = advancedFilters.emotionalState.toLowerCase();
//     }

//     if (advancedFilters.disciplineStatus !== "All Trades") {
//       apiFilters.discipline_status =
//         advancedFilters.disciplineStatus === "Disciplined"
//           ? "disciplined"
//           : "violations";
//     }

//     if (advancedFilters.reviewStatus !== "All Statuses") {
//       apiFilters.review_status =
//         advancedFilters.reviewStatus === "Reviewed" ? "tagged" : "untagged";
//     }

//     if (advancedFilters.ruleBreaches !== "All Trades") {
//       if (advancedFilters.ruleBreaches === "No Breaches") {
//         apiFilters.discipline_status = "disciplined";
//       } else if (advancedFilters.ruleBreaches === "Has Breaches") {
//         apiFilters.discipline_status = "violations";
//       }
//     }

//     if (
//       advancedFilters.plRange[0] !== -10000 ||
//       advancedFilters.plRange[1] !== 10000
//     ) {
//       apiFilters.pnl_min = advancedFilters.plRange[0];
//       apiFilters.pnl_max = advancedFilters.plRange[1];
//     }

//     if (advancedFilters.mistakes.length > 0) {
//       apiFilters.mistakes = advancedFilters.mistakes.join(",");
//     }

//     if (advancedFilters.tags) {
//       apiFilters.tags = advancedFilters.tags;
//     }

//     // updateFilters(apiFilters);
//     updateFilters({
//       direction: undefined,
//       outcome: undefined,
//       strategy: undefined,
//       emotional_state: undefined,
//       discipline_status: undefined,
//       review_status: undefined,
//       pnl_min: undefined,
//       pnl_max: undefined,
//       mistakes: undefined,
//       tags: undefined,
//       ...apiFilters, // overwrite only the ones that are active
//     });
//     setIsModalOpen(false);
//   };

//   if (!mounted) return null;

//   const mobileFiltersContent = (
//     <div className="bg-white dark:bg-[#111827] rounded-xl shadow-2xl p-4 w-80 space-y-4 border border-gray-100 dark:border-gray-800">
//       <div className="space-y-3">
//         <div>
//           <label className="block text-[11px] font-bold text-gray-400 uppercase mb-1">
//             Broker
//           </label>
//           <Select
//             value={selectedBroker}
//             onChange={handleBrokerChange}
//             options={[
//               { value: "all", label: "All Brokers" },
//               { value: "zerodha", label: "Zerodha" },
//               { value: "upstox", label: "Upstox" },
//               { value: "groww", label: "Groww" },
//               { value: "angelone", label: "Angel One" },
//               { value: "fyers", label: "Fyers" },
//               { value: "dhan", label: "Dhan" },
//               { value: "default", label: "Universal" },
//             ]}
//             className="w-full"
//             size="large"
//           />
//         </div>

//         <div>
//           <label className="block text-[11px] font-bold text-gray-400 uppercase mb-1">
//             Market Type
//           </label>
//           <Select
//             value={selectedMarket}
//             onChange={handleMarketChange}
//             options={[
//               { value: "all", label: "All Markets" },
//               { value: "indian_market", label: "Indian Market" },
//               { value: "forex", label: "Forex" },
//               { value: "crypto", label: "Crypto" },
//               { value: "options", label: "Options" },
//             ]}
//             className="w-full"
//             size="large"
//           />
//         </div>

//         <div>
//           <label className="block text-[11px] font-bold text-gray-400 uppercase mb-1">
//             Time Period
//           </label>
//           <Select
//             value={selectedPeriod}
//             onChange={handlePeriodChange}
//             suffixIcon={<MdCalendarToday />}
//             options={[
//               { value: "all", label: "All Time" },
//               { value: "today", label: "Today" },
//               { value: "this_week", label: "This Week" },
//               { value: "this_month", label: "This Month" },
//               { value: "custom", label: "Custom Range" },
//             ]}
//             className="w-full"
//             size="large"
//           />
//         </div>

//         {selectedPeriod === "custom" && (
//           <div>
//             <label className="block text-[11px] font-bold text-gray-400 uppercase mb-1">
//               Date Range
//             </label>
//             <RangePicker
//               className="w-full"
//               size="large"
//               value={
//                 customDateRange
//                   ? [dayjs(customDateRange[0]), dayjs(customDateRange[1])]
//                   : null
//               }
//               onChange={handleDateRangeChange}
//               format="YYYY-MM-DD"
//               placeholder={["Start Date", "End Date"]}
//             />
//           </div>
//         )}
//       </div>

//       <Divider className="my-2 dark:border-gray-800" />

//       <button
//         onClick={() => {
//           setMobileFiltersOpen(false);
//           setIsModalOpen(true);
//         }}
//         className="flex items-center justify-between w-full px-3 py-2.5 bg-gray-50 dark:bg-gray-800/50 hover:bg-teal-50 dark:hover:bg-teal-500/10 border border-gray-200 dark:border-gray-700 rounded-lg transition-all"
//       >
//         <div className="flex items-center gap-2">
//           <MdSettingsInputComponent className="text-xl text-teal-500" />
//           <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">
//             Advanced Filters
//           </span>
//         </div>
//         {activeFilterCount > 0 && (
//           <span className="bg-teal-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
//             {activeFilterCount}
//           </span>
//         )}
//       </button>

//       <button
//         onClick={() => {
//           resetFilters();
//           setSelectedPeriod("all");
//           setCustomDateRange(null);
//           setMobileFiltersOpen(false);
//         }}
//         className="w-full py-3 bg-teal-500 hover:bg-teal-600 text-white rounded-lg font-bold transition-all text-sm shadow-lg shadow-teal-500/20"
//       >
//         Reset All Filters
//       </button>
//     </div>
//   );

//   return (
//     <header className="bg-white dark:bg-[#0B0F1A] border-b border-gray-200 dark:border-gray-800 px-4 py-3 sticky top-0 z-10">
//       <div className="flex items-center justify-between gap-4">
//         <div className="flex items-center gap-3 flex-1 min-w-0">
//           <button
//             onClick={toggleSidebar}
//             className="lg:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg shrink-0"
//           >
//             <MdMenu className="w-6 h-6 dark:text-gray-300" />
//           </button>

//           {/* Desktop Filter Row */}
//           <div className="hidden lg:flex items-center gap-2">
//             <Select
//               value={selectedBroker}
//               onChange={handleBrokerChange}
//               options={[
//                 { value: "all", label: "All Brokers" },
//                 { value: "zerodha", label: "Zerodha" },
//                 { value: "upstox", label: "Upstox" },
//                 { value: "groww", label: "Groww" },
//                 { value: "dhan", label: "Dhan" },
//                 { value: "fyers", label: "Fyers" },
//                 { value: "angelone", label: "Angel One" },
//                 { value: "default", label: "Universal" },
//               ]}
//               className="w-32"
//             />
//             <Select
//               value={selectedMarket}
//               onChange={handleMarketChange}
//               options={[
//                 { value: "all", label: "All Markets" },
//                 { value: "indian_market", label: "Indian Market" },
//                 { value: "forex", label: "Forex" },
//                 { value: "crypto", label: "Crypto" },
//                 { value: "options", label: "Options" },
//               ]}
//               className="w-36"
//             />
//             <Select
//               value={selectedPeriod}
//               onChange={handlePeriodChange}
//               suffixIcon={<MdCalendarToday className="text-xs" />}
//               options={[
//                 { value: "all", label: "All Time" },
//                 { value: "today", label: "Today" },
//                 { value: "this_week", label: "This Week" },
//                 { value: "this_month", label: "This Month" },
//                 { value: "custom", label: "Custom Range" },
//               ]}
//               className="w-36"
//             />

//             {/* Custom Date Range Picker - shown only when custom is selected */}
//             {selectedPeriod === "custom" && (
//               <RangePicker
//                 size="middle"
//                 value={
//                   customDateRange
//                     ? [dayjs(customDateRange[0]), dayjs(customDateRange[1])]
//                     : null
//                 }
//                 onChange={handleDateRangeChange}
//                 format="YYYY-MM-DD"
//                 placeholder={["Start", "End"]}
//                 className="w-64"
//                 allowClear
//               />
//             )}

//             <button
//               onClick={() => setIsModalOpen(true)}
//               className="flex items-center gap-2 px-3 py-1.5 border border-gray-200 dark:border-gray-700 rounded-lg text-[13px] font-medium text-gray-700 dark:text-gray-200 hover:border-teal-500 transition-all bg-white dark:bg-transparent"
//             >
//               <MdFilterList className="text-lg text-teal-500" />
//               <span>More Filters</span>
//               {activeFilterCount > 0 && (
//                 <span className="flex items-center justify-center bg-teal-500 text-white text-[10px] font-bold w-5 h-5 rounded-md">
//                   {activeFilterCount}
//                 </span>
//               )}
//             </button>
//           </div>

//           {/* Mobile Filter Trigger */}
//           <div className="lg:hidden">
//             <Dropdown
//               // dropdownRender={() => mobileFiltersContent}
//               popupRender={() => mobileFiltersContent}
//               trigger={["click"]}
//               open={mobileFiltersOpen}
//               onOpenChange={setMobileFiltersOpen}
//               placement="bottomLeft"
//             >
//               <button className="flex items-center gap-2 px-3 py-2 bg-gray-50 dark:bg-[#111827] border border-gray-200 dark:border-gray-800 rounded-lg text-sm font-medium">
//                 <MdFilterList className="w-5 h-5 text-teal-500" />
//                 <span className="hidden sm:inline dark:text-gray-200">
//                   Filters
//                 </span>
//                 {activeFilterCount > 0 && (
//                   <span className="bg-teal-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded ml-1">
//                     {activeFilterCount}
//                   </span>
//                 )}
//               </button>
//             </Dropdown>
//           </div>
//         </div>

//         {/* Right Section */}
//         <div className="flex items-center gap-3">
//           <div className="relative hidden md:block">
//             <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
//             <input
//               type="text"
//               placeholder="Search trades..."
//               value={filters.search || ""}
//               onChange={handleSearch}
//               className="pl-10 pr-4 py-2 w-44 xl:w-72 border border-gray-200 dark:border-gray-800 rounded-lg text-sm bg-gray-50 dark:bg-[#111827] dark:text-gray-100 focus:ring-1 focus:ring-teal-500 outline-none"
//             />
//           </div>
//           <ThemeToggle />
//         </div>
//       </div>

//       <AdvancedFiltersModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         onApply={handleApplyAdvanced}
//         initialFilters={filters}
//       />
//     </header>
//   );
// }

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import ThemeToggle from "@/components/shared/ThemeToggle";
import { DateRange, MarketType, useFilters } from "@/contexts/FilterContext";
import { DatePicker, Divider, Dropdown, Select } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import {
  MdCalendarToday,
  MdFilterList,
  MdMenu,
  MdSearch,
  MdSettingsInputComponent,
} from "react-icons/md";
import AdvancedFiltersModal, { FilterState } from "./AdvancedFiltersModal";

const { RangePicker } = DatePicker;

interface HeaderProps {
  toggleSidebar: () => void;
}

const ADVANCED_FILTER_CLEAR = {
  direction: undefined,
  outcome: undefined,
  strategy: undefined,
  emotional_state: undefined,
  discipline_status: undefined,
  review_status: undefined,
  pnl_min: undefined,
  pnl_max: undefined,
  mistakes: undefined,
  tags: undefined,
} as const;

export default function Header({ toggleSidebar }: HeaderProps) {
  const [mounted, setMounted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const { filters, updateFilters, resetFilters, activeFilterCount } =
    useFilters();

  const [selectedBroker, setSelectedBroker] = useState("all");
  const [selectedMarket, setSelectedMarket] = useState("all");
  const [selectedPeriod, setSelectedPeriod] = useState("all");
  const [customDateRange, setCustomDateRange] = useState<
    [string, string] | null
  >(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Sync local UI state whenever context filters change (reset, external updates)
  useEffect(() => {
    setSelectedBroker(filters.broker || "all");
    setSelectedMarket(filters.market_type || "all");
    setSelectedPeriod(filters.date_range || "all");
    if (filters.date_from && filters.date_to) {
      setCustomDateRange([filters.date_from, filters.date_to]);
    } else {
      setCustomDateRange(null);
    }
  }, [filters]);

  const handleBrokerChange = (value: string) => {
    setSelectedBroker(value);
    updateFilters({ broker: value === "all" ? undefined : value });
  };

  const handleMarketChange = (value: string) => {
    setSelectedMarket(value);
    updateFilters({
      market_type: value === "all" ? undefined : (value as MarketType),
    });
  };

  const handlePeriodChange = (value: string) => {
    setSelectedPeriod(value);
    if (value === "custom") {
      // Show the picker — only apply to filters once user picks actual dates
      if (customDateRange) {
        updateFilters({
          date_range: "custom",
          date_from: customDateRange[0],
          date_to: customDateRange[1],
        });
      } else {
        updateFilters({
          date_range: undefined,
          date_from: undefined,
          date_to: undefined,
        });
      }
    } else if (value === "all") {
      setCustomDateRange(null);
      updateFilters({
        date_range: undefined,
        date_from: undefined,
        date_to: undefined,
      });
    } else {
      setCustomDateRange(null);
      updateFilters({
        date_range: value as DateRange,
        date_from: undefined,
        date_to: undefined,
      });
    }
  };

  const handleDateRangeChange = (dates: any, dateStrings: [string, string]) => {
    if (dates && dateStrings[0] && dateStrings[1]) {
      setCustomDateRange([dateStrings[0], dateStrings[1]]);
      updateFilters({
        date_range: "custom",
        date_from: dateStrings[0],
        date_to: dateStrings[1],
      });
      setSelectedPeriod("custom");
    } else {
      setCustomDateRange(null);
      updateFilters({
        date_range: undefined,
        date_from: undefined,
        date_to: undefined,
      });
      setSelectedPeriod("all");
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFilters({ search: e.target.value || undefined });
  };

  const handleApplyAdvanced = (advancedFilters: FilterState, count: number) => {
    const apiFilters: any = {};

    if (advancedFilters.direction !== "All Directions") {
      apiFilters.direction =
        advancedFilters.direction === "Long Only" ? "long" : "short";
    }
    if (advancedFilters.outcome !== "All Outcomes") {
      apiFilters.outcome =
        advancedFilters.outcome === "Wins Only" ? "win" : "loss";
    }
    if (advancedFilters.instrument !== "All Instruments") {
      if (advancedFilters.instrument === "F&O (Options/Futures)")
        apiFilters.market_type = "options";
      else if (advancedFilters.instrument === "Equities")
        apiFilters.market_type = "indian_market";
    }
    if (advancedFilters.strategy !== "All Strategies") {
      apiFilters.strategy = advancedFilters.strategy;
    }
    if (advancedFilters.emotionalState !== "All States") {
      apiFilters.emotional_state = advancedFilters.emotionalState.toLowerCase();
    }
    const discipline =
      advancedFilters.ruleBreaches !== "All Trades"
        ? advancedFilters.ruleBreaches
        : advancedFilters.disciplineStatus;
    if (discipline === "Disciplined" || discipline === "No Breaches") {
      apiFilters.discipline_status = "disciplined";
    } else if (
      discipline === "Undisciplined" ||
      discipline === "Has Breaches"
    ) {
      apiFilters.discipline_status = "violations";
    }
    if (advancedFilters.reviewStatus !== "All Statuses") {
      apiFilters.review_status =
        advancedFilters.reviewStatus === "Reviewed" ? "tagged" : "untagged";
    }
    if (
      advancedFilters.plRange[0] !== -100000 ||
      advancedFilters.plRange[1] !== 100000
    ) {
      apiFilters.pnl_min = advancedFilters.plRange[0];
      apiFilters.pnl_max = advancedFilters.plRange[1];
    }
    if (advancedFilters.mistakes.length > 0) {
      apiFilters.mistakes = advancedFilters.mistakes.join(",");
    }
    if (advancedFilters.tags) {
      apiFilters.tags = advancedFilters.tags;
    }

    updateFilters({ ...ADVANCED_FILTER_CLEAR, ...apiFilters });
    setIsModalOpen(false);
  };

  const handleResetAll = () => {
    resetFilters();
    // Explicitly reset local UI state — don't rely solely on the useEffect
    // because resetFilters sets date_range: undefined which maps to "all"
    setSelectedBroker("all");
    setSelectedMarket("all");
    setSelectedPeriod("all");
    setCustomDateRange(null);
    setMobileFiltersOpen(false);
  };

  if (!mounted) return null;

  // Shared RangePicker used in both mobile dropdown and desktop bar
  const rangePicker = (size: "middle" | "large") => (
    <RangePicker
      size={size}
      value={
        customDateRange
          ? [dayjs(customDateRange[0]), dayjs(customDateRange[1])]
          : null
      }
      onChange={handleDateRangeChange}
      format="YYYY-MM-DD"
      placeholder={["Start", "End"]}
      allowClear
      // Render into body so it is never clipped by overflow:hidden parents
      getPopupContainer={() => document.body}
      style={{ width: "100%" }}
    />
  );

  const mobileFiltersContent = (
    <div className="bg-white dark:bg-[#111827] rounded-xl shadow-2xl p-4 w-80 space-y-4 border border-gray-100 dark:border-gray-800">
      <div className="space-y-3">
        <div>
          <label className="block text-[11px] font-bold text-gray-400 uppercase mb-1">
            Broker
          </label>
          <Select
            value={selectedBroker}
            onChange={handleBrokerChange}
            options={[
              { value: "all", label: "All Brokers" },
              { value: "zerodha", label: "Zerodha" },
              { value: "upstox", label: "Upstox" },
              { value: "groww", label: "Groww" },
              { value: "angelone", label: "Angel One" },
              { value: "fyers", label: "Fyers" },
              { value: "dhan", label: "Dhan" },
              { value: "default", label: "Universal" },
            ]}
            className="w-full"
            size="large"
            getPopupContainer={() => document.body}
          />
        </div>

        <div>
          <label className="block text-[11px] font-bold text-gray-400 uppercase mb-1">
            Market Type
          </label>
          <Select
            value={selectedMarket}
            onChange={handleMarketChange}
            options={[
              { value: "all", label: "All Markets" },
              { value: "indian_market", label: "Indian Market" },
              { value: "forex", label: "Forex" },
              { value: "crypto", label: "Crypto" },
              { value: "options", label: "Options" },
            ]}
            className="w-full"
            size="large"
            getPopupContainer={() => document.body}
          />
        </div>

        <div>
          <label className="block text-[11px] font-bold text-gray-400 uppercase mb-1">
            Time Period
          </label>
          <Select
            value={selectedPeriod}
            onChange={handlePeriodChange}
            suffixIcon={<MdCalendarToday />}
            options={[
              { value: "all", label: "All Time" },
              { value: "today", label: "Today" },
              { value: "this_week", label: "This Week" },
              { value: "this_month", label: "This Month" },
              { value: "custom", label: "Custom Range" },
            ]}
            className="w-full"
            size="large"
            getPopupContainer={() => document.body}
          />
        </div>

        {/*
          Use conditional rendering (not CSS hide) here because
          getPopupContainer={() => document.body} handles the clipping issue.
          Conditional rendering avoids the RangePicker registering event
          listeners when it isn't needed.
        */}
        {selectedPeriod === "custom" && (
          <div>
            <label className="block text-[11px] font-bold text-gray-400 uppercase mb-1">
              Date Range
            </label>
            {rangePicker("large")}
          </div>
        )}
      </div>

      <Divider className="my-2 dark:border-gray-800" />

      <button
        onClick={() => {
          setMobileFiltersOpen(false);
          setIsModalOpen(true);
        }}
        className="flex items-center justify-between w-full px-3 py-2.5 bg-gray-50 dark:bg-gray-800/50 hover:bg-teal-50 dark:hover:bg-teal-500/10 border border-gray-200 dark:border-gray-700 rounded-lg transition-all"
      >
        <div className="flex items-center gap-2">
          <MdSettingsInputComponent className="text-xl text-teal-500" />
          <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">
            Advanced Filters
          </span>
        </div>
        {activeFilterCount > 0 && (
          <span className="bg-teal-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
            {activeFilterCount}
          </span>
        )}
      </button>

      <button
        onClick={handleResetAll}
        className="w-full py-3 bg-teal-500 hover:bg-teal-600 text-white rounded-lg font-bold transition-all text-sm shadow-lg shadow-teal-500/20"
      >
        Reset All Filters
      </button>
    </div>
  );

  return (
    <header className="bg-white dark:bg-[#0B0F1A] border-b border-gray-200 dark:border-gray-800 px-4 py-3 sticky top-0 z-10">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <button
            onClick={toggleSidebar}
            className="lg:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg shrink-0"
          >
            <MdMenu className="w-6 h-6 dark:text-gray-300" />
          </button>

          {/* Desktop Filter Row */}
          <div className="hidden lg:flex items-center gap-2">
            <Select
              value={selectedBroker}
              onChange={handleBrokerChange}
              options={[
                { value: "all", label: "All Brokers" },
                { value: "zerodha", label: "Zerodha" },
                { value: "upstox", label: "Upstox" },
                { value: "groww", label: "Groww" },
                { value: "dhan", label: "Dhan" },
                { value: "fyers", label: "Fyers" },
                { value: "angelone", label: "Angel One" },
                { value: "default", label: "Universal" },
              ]}
              className="w-32"
            />
            <Select
              value={selectedMarket}
              onChange={handleMarketChange}
              options={[
                { value: "all", label: "All Markets" },
                { value: "indian_market", label: "Indian Market" },
                { value: "forex", label: "Forex" },
                { value: "crypto", label: "Crypto" },
                { value: "options", label: "Options" },
              ]}
              className="w-36"
            />
            <Select
              value={selectedPeriod}
              onChange={handlePeriodChange}
              suffixIcon={<MdCalendarToday className="text-xs" />}
              options={[
                { value: "all", label: "All Time" },
                { value: "today", label: "Today" },
                { value: "this_week", label: "This Week" },
                { value: "this_month", label: "This Month" },
                { value: "custom", label: "Custom Range" },
              ]}
              className="w-36"
            />

            {/* Desktop: conditional render is safe here — no overflow:hidden clipping */}
            {selectedPeriod === "custom" && (
              <div className="w-64">{rangePicker("middle")}</div>
            )}

            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 border border-gray-200 dark:border-gray-700 rounded-lg text-[13px] font-medium text-gray-700 dark:text-gray-200 hover:border-teal-500 transition-all bg-white dark:bg-transparent"
            >
              <MdFilterList className="text-lg text-teal-500" />
              <span>More Filters</span>
              {activeFilterCount > 0 && (
                <span className="flex items-center justify-center bg-teal-500 text-white text-[10px] font-bold w-5 h-5 rounded-md">
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Filter Trigger */}
          <div className="lg:hidden">
            <Dropdown
              popupRender={() => mobileFiltersContent}
              trigger={["click"]}
              open={mobileFiltersOpen}
              onOpenChange={setMobileFiltersOpen}
              placement="bottomLeft"
            >
              <button className="flex items-center gap-2 px-3 py-2 bg-gray-50 dark:bg-[#111827] border border-gray-200 dark:border-gray-800 rounded-lg text-sm font-medium">
                <MdFilterList className="w-5 h-5 text-teal-500" />
                <span className="hidden sm:inline dark:text-gray-200">
                  Filters
                </span>
                {activeFilterCount > 0 && (
                  <span className="bg-teal-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded ml-1">
                    {activeFilterCount}
                  </span>
                )}
              </button>
            </Dropdown>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          <div className="relative hidden md:block">
            <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
            <input
              type="text"
              placeholder="Search trades..."
              value={filters.search || ""}
              onChange={handleSearch}
              className="pl-10 pr-4 py-2 w-44 xl:w-72 border border-gray-200 dark:border-gray-800 rounded-lg text-sm bg-gray-50 dark:bg-[#111827] dark:text-gray-100 focus:ring-1 focus:ring-teal-500 outline-none"
            />
          </div>
          <ThemeToggle />
        </div>
      </div>

      <AdvancedFiltersModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onApply={handleApplyAdvanced}
        initialFilters={filters}
      />
    </header>
  );
}
