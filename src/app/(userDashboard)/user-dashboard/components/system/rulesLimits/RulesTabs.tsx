import { Tabs } from "antd";
import RuleCard, { RuleCardProps } from "./RuleCard";

// Define the data structure for the entire ruleset
type RulesData = {
  [key in "risk" | "process" | "psychology"]: RuleCardProps[];
};

const rulesData: RulesData = {
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
      desc: "Limit position size to percentage of capital",
      stats: { "Per Trade": "maxPositionPercent: 2", Warn: "-" },
    },
  ],
  process: [
    {
      title: "Max Trades Per Day",
      type: "Hard",
      category: "Process",
      desc: "Prevent overtrading by limiting daily trades",
      stats: { "Per-Day": "maxTrades: 5", "Lock Testing": "-" },
    },
  ],
  psychology: [
    {
      title: "Consecutive Loss Limit",
      type: "Soft",
      category: "Psychology",
      desc: "Pause and reflect after losing streak",
      stats: {
        "Post-Trigger": "consecutiveLosses: 3",
        Action: "requiresJournal",
      },
    },
  ],
};

export default function RulesTabs() {
  // Properly typed render helper
  const renderList = (data: RuleCardProps[]) => (
    <div className="space-y-4 pt-4">
      {data.map((rule, idx) => (
        <RuleCard key={`${rule.title}-${idx}`} {...rule} />
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
        <div className="p-12 text-center text-zinc-400 dark:text-zinc-600 border-2 border-dashed border-slate-100 dark:border-zinc-800 rounded-2xl mt-4">
          No time rules set.
        </div>
      ),
    },
    {
      key: "other",
      label: "Other",
      children: (
        <div className="p-12 text-center text-zinc-400 dark:text-zinc-600 border-2 border-dashed border-slate-100 dark:border-zinc-800 rounded-2xl mt-4">
          No other rules set.
        </div>
      ),
    },
  ];

  return (
    <Tabs defaultActiveKey="all" items={items} className="custom-rules-tabs" />
  );
}
