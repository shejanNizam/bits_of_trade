"use client";

import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  MinusOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import { Button } from "antd";
import React from "react";
import AddMistakeModal from "./AddMistakeModal";

export default function MistakeOverview() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const mistakes = [
    {
      title: "Premature Exit",
      category: "Execution",
      usage: 13,
      severity: 6,
      trend: "Increasing",
      desc: "Exiting a winning trade too early out of fear",
    },
    {
      title: "FOMO Entry",
      category: "Psychology",
      usage: 12,
      severity: 8,
      trend: "Increasing",
      desc: "Entering a trade due to fear of missing out",
    },
    {
      title: "Overtrading",
      category: "Process",
      usage: 10,
      severity: 7,
      trend: "Stable",
      desc: "Taking more trades than planned or necessary",
    },
    {
      title: "Revenge Trading",
      category: "Psychology",
      usage: 8,
      severity: 9,
      trend: "Decreasing",
      desc: "Trading impulsively immediately after a losing trade",
    },
    {
      title: "Oversized Position",
      category: "Risk",
      usage: 5,
      severity: 10,
      trend: "Stable",
      desc: "Position size exceeding defined risk limits",
    },
    {
      title: "Ignored Stop Loss",
      category: "Risk",
      usage: 3,
      severity: 10,
      trend: "Decreasing",
      desc: "Moving or ignoring predetermined stop loss",
    },
  ];

  return (
    <div className=" transition-colors">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Mistakes
          </h1>
          <p className="text-slate-500 dark:text-zinc-400">
            Tag, track, and reduce. Mistakes are data — use them.
          </p>
        </div>
        <Button type="primary" onClick={() => setIsModalOpen(true)}>
          + Add Custom Mistake
        </Button>
      </div>

      {/* Warning Banner */}
      <div className="mb-8 p-4 rounded-xl border border-orange-100 bg-orange-50/50 dark:bg-orange-900/10 dark:border-orange-900/20 flex gap-4 items-center">
        <div className="bg-orange-100 dark:bg-orange-900/30 p-2 rounded-lg text-orange-600">
          ⚠️
        </div>
        <div className="flex-1">
          <h4 className="font-bold text-orange-900 dark:text-orange-400 text-sm">
            Mistake Clustering Detected
          </h4>
          <p className="text-orange-800/80 dark:text-orange-300/70 text-sm">
            {"You've"} logged <span className="font-bold">4 mistakes</span> in
            your last 5 trades. This is above your average.
          </p>
        </div>
        <button className="bg-orange-600 text-white px-4 py-1.5 rounded-lg text-sm font-bold hover:bg-orange-700">
          Review Pattern
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mistakes?.map((m, i) => (
          <div
            key={i}
            className="bg-white dark:bg-primary/10 border border-slate-200 dark:border-zinc-800 p-5 rounded-2xl shadow-sm hover:shadow-md transition-all"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-slate-900 dark:bg-white" />
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-zinc-800 text-slate-500 uppercase tracking-wider">
                  {m.category}
                </span>
              </div>
              <MoreOutlined className="text-slate-400 cursor-pointer" />
            </div>

            <h3 className="font-bold text-lg text-slate-900 dark:text-white">
              {m.title}
            </h3>
            <p className="text-sm text-slate-500 dark:text-zinc-400 mb-6">
              {m.desc}
            </p>

            <div className="flex justify-between items-end">
              <div>
                <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-1">
                  Usage Count
                </p>
                <p className="text-3xl font-bold dark:text-white">{m.usage}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-1">
                  Severity
                </p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">
                  <span className="text-orange-600">{m.severity}</span>/10
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-zinc-800 flex justify-between items-center text-xs">
              <span className="text-slate-400 uppercase font-bold tracking-tighter">
                Trend
              </span>
              <span
                className={`flex items-center gap-1 font-bold ${
                  m.trend === "Increasing"
                    ? "text-red-500"
                    : m.trend === "Decreasing"
                      ? "text-green-500"
                      : "text-slate-400"
                }`}
              >
                {m.trend === "Increasing" && <ArrowUpOutlined />}
                {m.trend === "Decreasing" && <ArrowDownOutlined />}
                {m.trend === "Stable" && <MinusOutlined />}
                {m.trend}
              </span>
            </div>
          </div>
        ))}
      </div>

      <AddMistakeModal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
      />
    </div>
  );
}
