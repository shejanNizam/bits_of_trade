/* eslint-disable @typescript-eslint/no-explicit-any */
interface SeverityDistributionProps {
  analyticsData?: any;
  isLoading?: boolean;
}

export default function SeverityDistribution({
  analyticsData,
  isLoading,
}: SeverityDistributionProps) {
  if (isLoading) {
    return (
      <div className="bg-white dark:bg-primary/10 border border-slate-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm transition-colors duration-200">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">
          Severity Distribution
        </h3>
        <div className="flex justify-center py-8">
          <div className="animate-pulse text-slate-500">Loading...</div>
        </div>
      </div>
    );
  }

  const severityData = analyticsData?.severity_distribution || {
    high: { count: 0, label: "Critical mistakes to eliminate", range: "8-10" },
    medium: { count: 0, label: "Needs improvement", range: "5-7" },
    low: { count: 0, label: "Minor issues", range: "1-4" },
  };

  const distributionData = [
    {
      label: `High Severity (${severityData.high.range || "8-10"})`,
      count: severityData.high.count,
      subtext: severityData.high.label,
      bgColor: "bg-red-50/50 dark:bg-red-950/20",
      borderColor: "border-red-100 dark:border-red-900/30",
      textColor: "text-red-600 dark:text-red-500",
      subtextColor: "text-red-600/80 dark:text-red-400/70",
    },
    {
      label: `Medium Severity (${severityData.medium.range || "5-7"})`,
      count: severityData.medium.count,
      subtext: severityData.medium.label,
      bgColor: "bg-orange-50/50 dark:bg-orange-950/20",
      borderColor: "border-orange-100 dark:border-orange-900/30",
      textColor: "text-orange-600 dark:text-orange-500",
      subtextColor: "text-orange-600/80 dark:text-orange-400/70",
    },
    {
      label: `Low Severity (${severityData.low.range || "1-4"})`,
      count: severityData.low.count,
      subtext: severityData.low.label,
      bgColor: "bg-blue-50/50 dark:bg-blue-950/20",
      borderColor: "border-blue-100 dark:border-blue-900/30",
      textColor: "text-blue-600 dark:text-blue-500",
      subtextColor: "text-blue-600/80 dark:text-blue-400/70",
    },
  ];

  return (
    <div className="bg-white dark:bg-primary/10 border border-slate-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm transition-colors duration-200">
      {/* Component Title */}
      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">
        Severity Distribution
      </h3>

      {/* Responsive Grid: 1 column on mobile, 3 columns on tablet/desktop */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {distributionData.map((item, index) => (
          <div
            key={index}
            className={`${item.bgColor} ${item.borderColor} border rounded-2xl p-5 transition-all duration-200`}
          >
            {/* Severity Category Label */}
            <p
              className={`text-xs font-bold uppercase tracking-tight mb-2 ${item.subtextColor}`}
            >
              {item.label}
            </p>

            {/* Severity Count */}
            <h4 className={`text-4xl font-black mb-2 ${item.textColor}`}>
              {item.count}
            </h4>

            {/* Description Subtext */}
            <p className={`text-xs font-medium ${item.subtextColor}`}>
              {item.subtext}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
