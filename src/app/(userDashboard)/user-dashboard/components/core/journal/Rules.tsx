/* eslint-disable @typescript-eslint/no-explicit-any */
// import { useGetRulesQuery } from "@/redux/features/utils/utilsApi";

// export default function Rules() {
//   const { data: rulesData, isLoading: isLoadingRules } = useGetRulesQuery({});
//   console.log(rulesData);

//   return <div>Rules</div>;
// }

"use client";

import { useTradeLinkWithRulesMutation } from "@/redux/features/journal/journalApi";
import {
  useGetRulesQuery,
  useGetTradeQuery,
} from "@/redux/features/utils/utilsApi";
import { Button, Input, Select, message } from "antd";
import { useState } from "react";

const { TextArea } = Input;
const { Option } = Select;

interface TradeOption {
  id: string;
  symbol: string;
}

interface RuleOption {
  id: string;
  rule_name: string;
  is_system_rule: boolean;
}

export default function Mistakes() {
  const [selectedRule, setSelectedRule] = useState<string | null>(null);
  //   const [selectedRule, setSelectedRule] = useState<string[]>([]);
  const [selectedTrade, setSelectedTrade] = useState<string | null>(null);
  const [description, setDescription] = useState<string>("");

  // API hooks
  const [tradeLinkWithRules, { isLoading: isLinking }] =
    useTradeLinkWithRulesMutation();
  const { data: tradesData, isLoading: isLoadingTrades } = useGetTradeQuery({});

  const { data: rulesData, isLoading: isLoadingRules } = useGetRulesQuery({});

  const trades = tradesData || [];
  const rules = rulesData?.results || [];

  const handleSubmit = async () => {
    // Validate required fields
    if (!selectedRule) {
      message.error("Please select a rule");
      return;
    }

    if (!selectedTrade) {
      message.error("Please select a trade to link");
      return;
    }

    const payload = {
      trade: selectedTrade,
      rule: selectedRule,
    };

    try {
      await tradeLinkWithRules(payload).unwrap();
      message.success("Rule  linked successfully!");

      setSelectedRule(null);
      setSelectedTrade(null);
      setDescription("");
    } catch (error: any) {
      if (error?.data?.non_field_errors) {
        message.error(error.data.non_field_errors[0]);
      } else if (error?.data?.trade) {
        message.error(error.data.trade[0]);
      } else if (error?.data?.mistake) {
        message.error(error.data.mistake[0]);
      } else if (error?.data?.message) {
        message.error(error.data.message);
      } else {
        message.error("Failed to link mistake");
      }
      console.error("Failed to link mistake:", error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-1">
          Rules Breakdown
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Convert rules violations into analyzable data
        </p>
      </div>

      {/* Select a Rule */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Select a Rule <span className="text-red-500">*</span>
        </label>
        <Select
          size="large"
          className="w-full"
          placeholder="Select a rule..."
          value={selectedRule}
          onChange={setSelectedRule}
          loading={isLoadingRules}
          disabled={isLinking}
          showSearch
          optionFilterProp="children"
          allowClear
        >
          {rules
            .filter((rule: RuleOption) => !rule.is_system_rule)
            .map((rule: RuleOption) => (
              <Option key={rule.id} value={rule.id}>
                {rule.rule_name}
              </Option>
            ))}
        </Select>
      </div>

      {/* <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Select Rules <span className="text-red-500">*</span>
        </label>
        <Select
          size="large"
          className="w-full"
          placeholder="Select rules..."
          value={selectedRule}
          onChange={setSelectedRule}
          loading={isLoadingRules}
          disabled={isLinking}
          showSearch
          optionFilterProp="children"
          allowClear
          mode="multiple"
        >
          {rules
            .filter((rule: RuleOption) => !rule.is_system_rule)
            .map((rule: RuleOption) => (
              <Option key={rule.id} value={rule.id}>
                {rule.rule_name}
              </Option>
            ))}
        </Select>
      </div> */}
      {/* Link to Trade(s) */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Link to Trade(s) <span className="text-red-500">*</span>
        </label>
        <Select
          size="large"
          className="w-full"
          placeholder="Search trades to link..."
          value={selectedTrade}
          onChange={setSelectedTrade}
          loading={isLoadingTrades}
          disabled={isLinking}
          showSearch
          optionFilterProp="children"
          allowClear
        >
          {trades.map((trade: TradeOption) => (
            <Option key={trade.id} value={trade.id}>
              {trade.symbol}
            </Option>
          ))}
        </Select>
      </div>

      {/* What Triggered This? */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          What Triggered This? (Optional)
        </label>
        <TextArea
          placeholder="Describe the trigger or context for this mistake..."
          rows={4}
          className="resize-none"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={isLinking}
          showCount
          maxLength={500}
        />
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Add notes about what led to this mistake
        </p>
      </div>

      {/* Log Mistakes Button */}
      <Button
        danger
        size="large"
        block
        onClick={handleSubmit}
        loading={isLinking}
        className="h-12! font-semibold!"
      >
        {isLinking ? "Linking..." : "Log Rules"}
      </Button>
    </div>
  );
}
