import { Tabs } from "antd";
import RuleCard, { RuleCardProps } from "./RuleCard";

interface RulesTabsProps {
  onEdit: (rule: RuleCardProps) => void;
  onDelete: (rule: RuleCardProps) => void;
}

type RulesDataStore = Record<string, RuleCardProps[]>;

const rulesData: RulesDataStore = {
  risk: [
    {
      title: "Max Daily Loss Limit",
      type: "Hard",
      category: "Risk",
      desc: "Protect capital with daily loss limit",
      stats: {
        "Per-Day": "maxLoss: ₹5000",
        "Lock Testing": "maxDailyPercent: 3",
      },
    },
    {
      title: "Position Size Limit",
      type: "Hard",
      category: "Risk",
      desc: "Limit position size",
      stats: { "Per Trade": "maxPositionPercent: 2", Warn: "-" },
    },
  ],
  process: [
    {
      title: "Max Trades Per Day",
      type: "Hard",
      category: "Process",
      desc: "Prevent overtrading",
      stats: { "Per-Day": "maxTrades: 5", "Lock Testing": "-" },
    },
  ],
  psychology: [
    {
      title: "Consecutive Loss Limit",
      type: "Soft",
      category: "Psychology",
      desc: "Pause after losing streak",
      stats: {
        "Post-Trigger": "consecutiveLosses: 3",
        Action: "requiresJournal",
      },
    },
  ],
  time: [],
  others: [],
};

export default function RulesTabs({ onEdit, onDelete }: RulesTabsProps) {
  const renderList = (data: RuleCardProps[]) => (
    <div className="space-y-4 pt-4">
      {data.map((rule, idx) => (
        <RuleCard
          key={`${rule.title}-${idx}`}
          {...rule}
          onEdit={() => onEdit(rule)}
          onDelete={() => onDelete(rule)}
        />
      ))}
    </div>
  );

  const items = [
    {
      key: "all",
      label: "All",
      children: renderList([
        ...rulesData.risk,
        ...rulesData.process,
        ...rulesData.psychology,
      ]),
    },
    { key: "risk", label: "Risk", children: renderList(rulesData.risk) },
    {
      key: "process",
      label: "Process",
      children: renderList(rulesData.process),
    },
    {
      key: "psychology",
      label: "Psychology",
      children: renderList(rulesData.psychology),
    },
    {
      key: "time",
      label: "Time",
      children: (
        <div className="p-8 text-center text-zinc-500">No time rules set.</div>
      ),
    },
    {
      key: "other",
      label: "Other",
      children: (
        <div className="p-8 text-center text-zinc-500">No other rules set.</div>
      ),
    },
  ];

  return (
    <Tabs
      defaultActiveKey="all"
      items={items}
      className="custom-rules-tabs dark:text-white"
    />
  );
}
