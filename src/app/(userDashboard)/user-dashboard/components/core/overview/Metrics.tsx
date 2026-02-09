import { IoInformationCircleOutline } from "react-icons/io5";

export default function Metrics() {
  // This data will come from backend later
  const metricsData = [
    {
      code: "DI",
      value: "94%",
      label: "Discipline Integrity",
      status: "green",
    },
    {
      code: "VMI",
      value: "Low",
      label: "Violation Momentum",
      status: "red",
    },
    {
      code: "DRT",
      value: "1.2s",
      label: "Recovery Time",
      status: "gray",
    },
    {
      code: "TPR",
      value: "88%",
      label: "Permission Ratio",
      status: "green",
    },
    {
      code: "FIE",
      value: "₹12k",
      label: "Loss Prevented",
      status: "green",
    },
    {
      code: "OVR",
      value: "8.5",
      label: "Resistance Score",
      status: "green",
    },
    {
      code: "ECI",
      value: "-₹2k",
      label: "Emotion Cost",
      status: "red",
    },
    {
      code: "CAS",
      value: "76%",
      label: "Confidence Acc.",
      status: "green",
    },
    {
      code: "DAE",
      value: "1.8R",
      label: "Disc. Expectancy",
      status: "green",
    },
    {
      code: "SMI",
      value: "Dev",
      label: "Strategy Maturity",
      status: "gray",
    },
    {
      code: "DDR",
      value: "High",
      label: "Disc. Dependency",
      status: "gray",
    },
    {
      code: "CPI",
      value: "98%",
      label: "Capital Protection",
      status: "green",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "green":
        return "bg-green-500 dark:bg-green-400";
      case "red":
        return "bg-red-500 dark:bg-red-400";
      default:
        return "bg-gray-800 dark:bg-gray-500";
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl lg:rounded-2xl p-5 sm:p-6 lg:p-8 border border-gray-200 dark:border-gray-700">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-8 sm:mb-10">
        <div className="flex-1">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">
            BitsOfTrade Exclusive Metrics
          </h2>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
            Proprietary metrics you {"won't"} find anywhere else
          </p>
        </div>

        {/* Understand Metrics Link */}
        <button className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors text-sm sm:text-base font-medium group">
          <span>Understand Metrics</span>
          <IoInformationCircleOutline className="text-xl group-hover:scale-110 transition-transform" />
        </button>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3 sm:gap-4 mb-6 sm:mb-8">
        {metricsData.map((metric, index) => (
          <div
            key={index}
            className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-4 sm:p-5 border border-gray-200 dark:border-gray-700 hover:shadow-md dark:hover:shadow-gray-900/50 transition-all hover:scale-105"
          >
            {/* Header with Code and Status Dot */}
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <span className="text-xs sm:text-sm font-bold text-gray-700 dark:text-gray-300">
                {metric.code}
              </span>
              <div
                className={`w-2 h-2 rounded-full ${getStatusColor(metric.status)}`}
              ></div>
            </div>

            {/* Value */}
            <h4 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1 sm:mb-2">
              {metric.value}
            </h4>

            {/* Label */}
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              {metric.label}
            </p>
          </div>
        ))}
      </div>

      {/* Footer Quote */}
      <div className="text-center">
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 italic">
          These metrics measure control, not luck. Competitors show results — we
          enforce discipline.
        </p>
      </div>
    </div>
  );
}
