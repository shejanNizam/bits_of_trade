/**
 * SeverityDistribution Component
 * Displays a breakdown of mistakes by their severity levels.
 * Supports Light/Dark modes and is fully responsive.
 */
export default function SeverityDistribution() {
  const distributionData = [
    {
      label: "High Severity (8-10)",
      count: 4,
      subtext: "Critical mistakes to eliminate",
      // Color mapping for Light / Dark modes
      bgColor: "bg-red-50/50 dark:bg-red-950/20",
      borderColor: "border-red-100 dark:border-red-900/30",
      textColor: "text-red-600 dark:text-red-500",
      subtextColor: "text-red-600/80 dark:text-red-400/70",
    },
    {
      label: "Medium Severity (5-7)",
      count: 2,
      subtext: "Needs improvement",
      bgColor: "bg-orange-50/50 dark:bg-orange-950/20",
      borderColor: "border-orange-100 dark:border-orange-900/30",
      textColor: "text-orange-600 dark:text-orange-500",
      subtextColor: "text-orange-600/80 dark:text-orange-400/70",
    },
    {
      label: "Low Severity (1-4)",
      count: 0,
      subtext: "Minor issues",
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
