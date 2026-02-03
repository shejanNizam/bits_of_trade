"use client";

import ThemeToggle from "@/components/shared/ThemeToggle";
import { Dropdown, Select } from "antd";
import { useEffect, useState } from "react";
import {
  MdCalendarToday,
  MdFilterList,
  MdMenu,
  MdSearch,
} from "react-icons/md";

interface HeaderProps {
  toggleSidebar: () => void;
}

export default function Header({ toggleSidebar }: HeaderProps) {
  const [mounted, setMounted] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Filter states
  const [selectedBroker, setSelectedBroker] = useState("all");
  const [selectedStock, setSelectedStock] = useState("indian");
  const [selectedPeriod, setSelectedPeriod] = useState("today");
  const [selectedFilter, setSelectedFilter] = useState("none");

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Dropdown options
  const brokerOptions = [
    { value: "all", label: "All Brokers" },
    { value: "zerodha", label: "Zerodha" },
    { value: "upstox", label: "Upstox" },
    { value: "oanda", label: "OANDA" },
    { value: "binance", label: "Binance" },
  ];

  const stockOptions = [
    { value: "indian-stocks", label: "Indian Stocks" },
    { value: "forex", label: "Forex" },
    { value: "crypto", label: "Crypto" },
    { value: "all-segments", label: "All Segments" },
  ];

  const periodOptions = [
    { value: "today", label: "Today" },
    { value: "thisWeek", label: "This Week" },
    { value: "thisMonth", label: "This Month" },
    { value: "lastThirtyDays", label: "Last 30 Days" },
    { value: "lastNintyDays", label: "Last 90 Days" },
    { value: "thisYear", label: "This Year" },
    { value: "customRange", label: "Custom Range" },
  ];

  const moreFilterOptions = [
    { value: "none", label: "More Filters" },
    { value: "profit", label: "Profit Trades" },
    { value: "loss", label: "Loss Trades" },
    { value: "highWin", label: "Win Rate > 60%" },
    { value: "lowWin", label: "Win Rate < 40%" },
  ];

  // Mobile Filters Dropdown Content
  const mobileFiltersContent = (
    <div className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-4 w-[320px] space-y-3">
      {/* Broker Select */}
      <div>
        <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
          Broker
        </label>
        <Select
          value={selectedBroker}
          onChange={setSelectedBroker}
          options={brokerOptions}
          className="w-full"
          size="large"
        />
      </div>

      {/* Stock Select */}
      <div>
        <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
          Stock Type
        </label>
        <Select
          value={selectedStock}
          onChange={setSelectedStock}
          options={stockOptions}
          className="w-full"
          size="large"
        />
      </div>

      {/* Period Select */}
      <div>
        <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
          Time Period
        </label>
        <Select
          value={selectedPeriod}
          onChange={setSelectedPeriod}
          options={periodOptions}
          className="w-full"
          size="large"
          suffixIcon={<MdCalendarToday className="w-4 h-4 text-gray-400" />}
        />
      </div>

      {/* More Filters Select */}
      <div>
        <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
          Additional Filters
        </label>
        <Select
          value={selectedFilter}
          onChange={setSelectedFilter}
          options={moreFilterOptions}
          className="w-full"
          size="large"
          suffixIcon={<MdFilterList className="w-4 h-4 text-gray-400" />}
        />
      </div>

      {/* Apply Button */}
      <button
        onClick={() => setMobileFiltersOpen(false)}
        className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors mt-2"
      >
        Apply Filters
      </button>
    </div>
  );

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-3 sm:px-4 md:px-6 py-3 md:py-4 sticky top-0 z-10">
      <div className="flex items-center justify-between gap-2 md:gap-4">
        {/* Left: Menu Toggle + Filters */}
        <div className="flex items-center gap-2 md:gap-3 flex-1 min-w-0">
          {/* Menu Toggle (Mobile) */}
          <button
            onClick={toggleSidebar}
            className="lg:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-gray-700 dark:text-gray-300 shrink-0"
          >
            <MdMenu className="w-5 h-5 md:w-6 md:h-6" />
          </button>

          {/* Filters - Desktop (4 Select Fields) */}
          <div className="hidden xl:flex items-center gap-3 flex-wrap">
            {/* Broker Select */}
            <Select
              value={selectedBroker}
              onChange={setSelectedBroker}
              options={brokerOptions}
              className="md:w-32"
              size="large"
            />

            {/* Stock Select */}
            <Select
              value={selectedStock}
              onChange={setSelectedStock}
              options={stockOptions}
              className="md:w-32"
              size="large"
            />

            {/* Period Select */}
            <Select
              value={selectedPeriod}
              onChange={setSelectedPeriod}
              options={periodOptions}
              className="md:w-32"
              size="large"
              suffixIcon={<MdCalendarToday className="w-4 h-4 text-gray-400" />}
            />

            {/* More Filters Select */}
            <Select
              value={selectedFilter}
              onChange={setSelectedFilter}
              options={moreFilterOptions}
              className="md:w-32"
              size="large"
              suffixIcon={<MdFilterList className="w-4 h-4 text-gray-400" />}
            />
          </div>

          {/* Filters Dropdown - Mobile/Tablet */}
          <div className="xl:hidden">
            <Dropdown
              dropdownRender={() => mobileFiltersContent}
              trigger={["click"]}
              open={mobileFiltersOpen}
              onOpenChange={setMobileFiltersOpen}
              placement="bottomLeft"
            >
              <button className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600">
                <MdFilterList className="w-5 h-5" />
                <span className="hidden sm:inline">Filters</span>
              </button>
            </Dropdown>
          </div>
        </div>

        {/* Right: Search, Theme Toggle & User */}
        <div className="flex items-center gap-2 md:gap-3 shrink-0">
          {/* Search - Desktop */}
          <div className=" relative">
            <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search trades, symbols, tags..."
              className="pl-10 pr-4 py-2 w-40 md:w-64 xl:w-80 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
            />
          </div>

          {/* Theme Toggle */}
          {mounted && <ThemeToggle />}
        </div>
      </div>
    </header>
  );
}
