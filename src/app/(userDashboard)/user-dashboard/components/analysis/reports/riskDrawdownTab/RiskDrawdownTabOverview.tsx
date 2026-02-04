"use client";

import {
  AlertOutlined,
  FallOutlined,
  SafetyCertificateOutlined,
} from "@ant-design/icons";

const riskStats = [
  {
    label: "Max Drawdown",
    value: "₹3,240 (5.2%)",
    icon: <FallOutlined />,
    color: "bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400",
  },
  {
    label: "Average Drawdown",
    value: "₹1,580 (2.5%)",
    icon: <AlertOutlined />,
    color:
      "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400",
  },
  {
    label: "Worst Losing Day",
    value: "₹-1,600",
    icon: <FallOutlined />,
    color: "bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400",
  },
  {
    label: "Recovery Time",
    value: "3 sessions",
    icon: <SafetyCertificateOutlined />,
    color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
  },
  {
    label: "Return Volatility",
    value: "12.3%",
    icon: <AlertOutlined />,
    color:
      "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400",
  },
];

export default function RiskDrawdownTabOverview() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
      {riskStats.map((item, index) => (
        <div
          key={index}
          className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-5 shadow-sm"
        >
          <div
            className={`w-8 h-8 rounded-lg flex items-center justify-center mb-4 ${item.color}`}
          >
            {item.icon}
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
            {item.label}
          </p>
          <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
            {item.value}
          </h3>
        </div>
      ))}
    </div>
  );
}
