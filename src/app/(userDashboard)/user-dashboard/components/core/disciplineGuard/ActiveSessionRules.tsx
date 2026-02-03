export default function ActiveSessionRules() {
  // This data will come from backend later
  const rules = [
    {
      title: "Max Daily Loss",
      description: "Stop trading if daily loss exceeds ₹5,000",
      limit: "₹5,000",
      type: "HARD",
      typeColor: "bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300",
    },
    {
      title: "Max Trades Per Day",
      description: "Maximum 3 trades allowed per session",
      limit: "3 Trades",
      type: "SOFT",
      typeColor:
        "bg-yellow-100 dark:bg-yellow-900/50 text-yellow-700 dark:text-yellow-300",
    },
    {
      title: "Mandatory Review",
      description: "Must review all trades before next session",
      limit: null,
      type: "HARD",
      typeColor: "bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300",
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl lg:rounded-2xl p-5 sm:p-6 border border-gray-200 dark:border-gray-700">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex-1">
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 mb-1">
            Active Session Rules
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
            Breaching these will trigger locks
          </p>
        </div>
        <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium transition-colors">
          Edit Rules
        </button>
      </div>

      {/* Rules Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        {rules.map((rule, index) => (
          <div
            key={index}
            className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-4 sm:p-5 border border-gray-200 dark:border-gray-700 hover:shadow-md dark:hover:shadow-gray-900/50 transition-all"
          >
            {/* Header with Title and Type Badge */}
            <div className="flex items-start justify-between mb-3">
              <h4 className="text-sm sm:text-base font-bold text-gray-900 dark:text-gray-100 flex-1">
                {rule.title}
              </h4>
              <div
                className={`${rule.typeColor} px-2 py-1 rounded text-xs font-bold uppercase`}
              >
                {rule.type}
              </div>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-3">
              {rule.description}
            </p>

            {/* Limit */}
            {rule.limit && (
              <div className="flex items-center gap-2 text-xs">
                <span className="text-gray-500 dark:text-gray-500">Limit:</span>
                <span className="font-semibold text-gray-900 dark:text-gray-100">
                  {rule.limit}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
