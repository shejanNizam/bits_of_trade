/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import ThemeToggle from "@/components/shared/ThemeToggle";
import { DateRange, MarketType, useFilters } from "@/contexts/FilterContext";
import { DatePicker, Divider, Dropdown, Select } from "antd";
import dayjs from "dayjs";
import { useEffect, useRef, useState } from "react";
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
  const [tempDateRange, setTempDateRange] = useState<
    [dayjs.Dayjs, dayjs.Dayjs] | null
  >(null);

  // ✅ No rangePickerOpen state — let antd manage open/close internally
  const pickerRef = useRef<any>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setSelectedBroker(filters.broker || "all");
    setSelectedMarket(filters.market_type || "all");
    setSelectedPeriod(filters.date_range || "all");
    if (filters.date_from && filters.date_to) {
      setCustomDateRange([filters.date_from, filters.date_to]);
      setTempDateRange([dayjs(filters.date_from), dayjs(filters.date_to)]);
    } else {
      setCustomDateRange(null);
      setTempDateRange(null);
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
      setMobileFiltersOpen(false);
      updateFilters({
        date_range: "custom",
        date_from: undefined,
        date_to: undefined,
      });
      // After the RangePicker renders, focus it so it opens naturally
      setTimeout(() => {
        pickerRef.current?.focus();
      }, 50);
    } else if (value === "all") {
      setCustomDateRange(null);
      setTempDateRange(null);
      updateFilters({
        date_range: undefined,
        date_from: undefined,
        date_to: undefined,
      });
    } else {
      setCustomDateRange(null);
      setTempDateRange(null);
      updateFilters({
        date_range: value as DateRange,
        date_from: undefined,
        date_to: undefined,
      });
    }
  };

  const handleDateRangeChange = (dates: any, dateStrings: [string, string]) => {
    if (dates && dates[0] && dates[1] && dateStrings[0] && dateStrings[1]) {
      // Both dates selected — update everything
      setTempDateRange(dates);
      setCustomDateRange([dateStrings[0], dateStrings[1]]);
      setSelectedPeriod("custom");
      updateFilters({
        date_range: "custom",
        date_from: dateStrings[0],
        date_to: dateStrings[1],
      });
    } else if (!dates) {
      // User hit the clear (×) button
      setTempDateRange(null);
      setCustomDateRange(null);
      setSelectedPeriod("all");
      updateFilters({
        date_range: undefined,
        date_from: undefined,
        date_to: undefined,
      });
    }
    // If only dates[0] is set (mid-selection), do nothing — antd handles UI internally
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
    if (advancedFilters.strategy !== "All Strategies")
      apiFilters.strategy = advancedFilters.strategy;
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
    if (advancedFilters.mistakes.length > 0)
      apiFilters.mistakes = advancedFilters.mistakes.join(",");
    if (advancedFilters.tags) apiFilters.tags = advancedFilters.tags;
    updateFilters({ ...ADVANCED_FILTER_CLEAR, ...apiFilters });
    setIsModalOpen(false);
  };

  const handleResetAll = () => {
    resetFilters();
    setSelectedBroker("all");
    setSelectedMarket("all");
    setSelectedPeriod("all");
    setCustomDateRange(null);
    setTempDateRange(null);
    setMobileFiltersOpen(false);
  };

  if (!mounted) return null;

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

            {/* Desktop RangePicker — ✅ NO controlled `open` prop */}
            {selectedPeriod === "custom" && (
              <RangePicker
                ref={pickerRef}
                key="desktop-range-picker"
                size="middle"
                value={tempDateRange}
                onChange={handleDateRangeChange}
                format="YYYY-MM-DD"
                placeholder={["Start Date", "End Date"]}
                allowClear
                getPopupContainer={() => document.body}
                className="w-64"
                popupClassName="custom-range-picker"
              />
            )}

            {/* Advanced Filters Button - Desktop */}
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

          {/* Mobile: Dropdown trigger + RangePicker side by side */}
          <div className="lg:hidden flex items-center gap-2">
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

            {/* Mobile RangePicker — ✅ NO controlled `open` prop */}
            {selectedPeriod === "custom" && (
              <RangePicker
                key="mobile-range-picker"
                size="small"
                value={tempDateRange}
                onChange={handleDateRangeChange}
                format="MM/DD/YY"
                placeholder={["Start", "End"]}
                allowClear
                getPopupContainer={() => document.body}
                className="w-48"
              />
            )}
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
