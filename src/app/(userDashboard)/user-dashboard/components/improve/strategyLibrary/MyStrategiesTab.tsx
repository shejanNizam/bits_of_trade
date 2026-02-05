import StrategyCard from "./StrategyCard";

interface StrategyData {
  title: string;
  status: "Mature" | "Developing" | "Testing";
  progress: number;
  color: string;
  segment: string;
  tags: string[];
  stats: {
    "Win Rate": string;
    Trades: string;
    "Total P&L": string;
    "Avg Return": string;
  };
}

export default function MyStrategiesTab() {
  const data: StrategyData[] = [
    {
      title: "Momentum Breakout",
      status: "Developing",
      progress: 93,
      color: "bg-green-500",
      segment: "Indian Stocks",
      tags: ["breakout", "volume", "resistance"],
      stats: {
        "Win Rate": "68.5%",
        Trades: "28",
        "Total P&L": "+₹5,000",
        "Avg Return": "2.4%",
      },
    },
    {
      title: "Trend Following",
      status: "Mature",
      progress: 90,
      color: "bg-green-500",
      segment: "Forex",
      tags: ["trend", "pullback", "moving average"],
      stats: {
        "Win Rate": "56.2%",
        Trades: "45",
        "Total P&L": "+₹10,000",
        "Avg Return": "1.8%",
      },
    },
    {
      title: "Mean Reversion",
      status: "Testing",
      progress: 68,
      color: "bg-orange-500",
      segment: "Options",
      tags: ["RSI", "oversold", "range"],
      stats: {
        "Win Rate": "72.1%",
        Trades: "34",
        "Total P&L": "+₹3,000",
        "Avg Return": "1.5%",
      },
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 py-4">
      {data.map((item, idx) => (
        <StrategyCard key={idx} {...item} />
      ))}
    </div>
  );
}
