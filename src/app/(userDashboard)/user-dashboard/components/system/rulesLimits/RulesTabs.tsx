/* eslint-disable @typescript-eslint/no-explicit-any */

import { useGetAllRulesQuery } from "@/redux/features/rules/rulesApi";
import { Empty, Spin, Tabs } from "antd";
import RuleCard, { RuleCardProps } from "./RuleCard";

interface RulesTabsProps {
  onEdit: (rule: RuleCardProps) => void;
  onDelete: (rule: RuleCardProps) => void;
}

// Helper function to transform API response to RuleCardProps
const transformApiRuleToCard = (apiRule: any): RuleCardProps => {
  // Transform trigger_condition object to stats format
  const stats: Record<string, string | number> = {};

  if (
    apiRule.trigger_condition &&
    Object.keys(apiRule.trigger_condition).length > 0
  ) {
    Object.entries(apiRule.trigger_condition).forEach(([key, value]) => {
      // Format the key for display (camelCase to readable format)
      const formattedKey = key
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (str) => str.toUpperCase());

      // Format the value
      let formattedValue: string | number = String(value);
      if (typeof value === "number") {
        if (key.toLowerCase().includes("percent")) {
          formattedValue = `${value}%`;
        } else if (
          key.toLowerCase().includes("loss") ||
          key.toLowerCase().includes("profit")
        ) {
          formattedValue = `₹${value.toLocaleString()}`;
        } else {
          formattedValue = value;
        }
      }

      stats[formattedKey] = formattedValue;
    });
  }

  // Add additional stats from other fields
  if (apiRule.trigger_scope) {
    stats["Trigger Scope"] = apiRule.trigger_scope.replace(/_/g, " ");
  }

  if (apiRule.action) {
    let actionText = "";
    switch (apiRule.action) {
      case "lock":
        actionText = "Lock Trading";
        break;
      case "warn":
        actionText = "Show Warning";
        break;
      case "require_journal":
        actionText = "Require Journal Entry";
        break;
      default:
        actionText = apiRule.action;
    }
    stats["Action"] = actionText;
  }

  return {
    id: apiRule.id,
    title: apiRule.rule_name,
    type: apiRule.rule_type === "hard" ? "Hard" : "Soft",
    category:
      apiRule.category.charAt(0).toUpperCase() + apiRule.category.slice(1),
    desc: apiRule.description,
    stats: stats,
    is_active: apiRule.is_active,
    trigger_scope: apiRule.trigger_scope,
    action: apiRule.action,
    trigger_condition: apiRule.trigger_condition,
  };
};

// Group rules by category
const groupRulesByCategory = (rules: RuleCardProps[]) => {
  const grouped: Record<string, RuleCardProps[]> = {
    risk: [],
    process: [],
    psychology: [],
    time: [],
    others: [],
  };

  rules.forEach((rule) => {
    const category = rule.category.toLowerCase();
    if (grouped[category]) {
      grouped[category].push(rule);
    } else {
      grouped.others.push(rule);
    }
  });

  return grouped;
};

export default function RulesTabs({ onEdit, onDelete }: RulesTabsProps) {
  const { data, isLoading, error } = useGetAllRulesQuery({
    page: 1,
    limit: 100,
  });
  console.log(data);

  // Transform and group the data
  const rules: RuleCardProps[] =
    data?.results?.map(transformApiRuleToCard) || [];
  console.log(rules);

  const groupedRules = groupRulesByCategory(rules);

  const renderList = (rulesList: RuleCardProps[]) => {
    if (rulesList.length === 0) {
      return (
        <div className="py-12 text-center">
          <Empty
            description="No rules found in this category"
            className="dark:text-zinc-400"
          />
        </div>
      );
    }

    return (
      <div className="space-y-4 pt-4">
        {rulesList?.map((rule) => (
          <RuleCard
            key={rule.id}
            {...rule}
            onEdit={() => onEdit(rule)}
            onDelete={() => onDelete(rule)}
          />
        ))}
      </div>
    );
  };

  const items = [
    {
      key: "all",
      label: "All Rules",
      children: isLoading ? (
        <div className="flex justify-center py-12">
          <Spin size="large" />
        </div>
      ) : error ? (
        <div className="text-center py-12 text-red-500">
          Failed to load rules. Please try again.
        </div>
      ) : (
        renderList(rules)
      ),
    },
    {
      key: "risk",
      label: "Risk",
      children: renderList(groupedRules.risk),
    },
    {
      key: "process",
      label: "Process",
      children: renderList(groupedRules.process),
    },
    {
      key: "psychology",
      label: "Psychology",
      children: renderList(groupedRules.psychology),
    },
    {
      key: "time",
      label: "Time",
      children: renderList(groupedRules.time),
    },
    {
      key: "other",
      label: "Other",
      children: renderList(groupedRules.others),
    },
  ];

  return (
    <Tabs
      defaultActiveKey="all"
      items={items}
      className="custom-rules-tabs dark:text-white"
      tabBarStyle={{
        borderBottomColor: "rgb(45, 51, 67)",
      }}
    />
  );
}
