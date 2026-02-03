export default function SessionStatus() {
  // This will come from backend later - for now showing green
  // Can be: "green", "yellow", "red"
  const status = "green";
  //   const status = "yellow";
  //   const status = "red";

  const statusConfig = {
    green: {
      // Light mode
      bgColor: "bg-green-50 dark:bg-green-950/30",
      iconBg: "bg-green-100 dark:bg-green-900/50",
      iconColor: "text-green-600 dark:text-green-400",
      badgeBg: "bg-green-100 dark:bg-green-900/50",
      badgeText: "text-green-700 dark:text-green-300",
      title: "Session Status: Normal",
      description:
        "No active restrictions. Keep journaling and reviewing your trades.",
      label: "Green",
    },
    yellow: {
      bgColor: "bg-yellow-50 dark:bg-yellow-950/30",
      iconBg: "bg-yellow-100 dark:bg-yellow-900/50",
      iconColor: "text-yellow-600 dark:text-yellow-400",
      badgeBg: "bg-yellow-100 dark:bg-yellow-900/50",
      badgeText: "text-yellow-700 dark:text-yellow-300",
      title: "Session Status: Warning",
      description:
        "Some restrictions may apply. Review your guidelines carefully.",
      label: "Yellow",
    },
    red: {
      bgColor: "bg-red-50 dark:bg-red-950/30",
      iconBg: "bg-red-100 dark:bg-red-900/50",
      iconColor: "text-red-600 dark:text-red-400",
      badgeBg: "bg-red-100 dark:bg-red-900/50",
      badgeText: "text-red-700 dark:text-red-300",
      title: "Session Status: Restricted",
      description:
        "Active restrictions in place. Please review guidelines before trading.",
      label: "Red",
    },
  };

  const config = statusConfig[status as keyof typeof statusConfig];

  return (
    <div
      className={`${config.bgColor} rounded-xl lg:rounded-2xl p-4 sm:p-5 lg:p-6 border border-gray-200 dark:border-gray-700/50`}
    >
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 lg:gap-4">
        {/* Left Section - Icon and Text */}
        <div className="flex items-start sm:items-center gap-3 sm:gap-4 flex-1 min-w-0">
          {/* Shield Icon */}
          <div
            className={`${config.iconBg} rounded-full p-2.5 sm:p-3 shrink-0`}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={`${config.iconColor} w-5 h-5 sm:w-6 sm:h-6`}
            >
              <path
                d="M12 2L4 6V11C4 16.55 7.84 21.74 12 23C16.16 21.74 20 16.55 20 11V6L12 2Z"
                fill="currentColor"
                fillOpacity="0.2"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9 12L11 14L15 10"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Text Content */}
          <div className="flex-1 min-w-0">
            <h3 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-gray-100 mb-0.5 sm:mb-1">
              {config.title}
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              {config.description}
            </p>
          </div>
        </div>

        {/* Right Section - Badge and Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 lg:shrink-0">
          {/* Status Badge */}
          <div
            className={`${config.badgeBg} ${config.badgeText} px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium text-center sm:text-left whitespace-nowrap`}
          >
            {config.label}
          </div>

          {/* Buttons Container */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            {/* View Guidelines Button */}
            <button className="px-4 sm:px-5 py-2 sm:py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors whitespace-nowrap">
              View Guidelines
            </button>

            {/* Start Review Button */}
            <button className="px-4 sm:px-5 py-2 sm:py-2.5 bg-blue-600 dark:bg-blue-500 text-white rounded-lg text-xs sm:text-sm font-medium hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors flex items-center justify-center gap-2 whitespace-nowrap">
              Start Review
              <svg
                width="14"
                height="14"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-3.5 h-3.5 sm:w-4 sm:h-4"
              >
                <path
                  d="M6 12L10 8L6 4"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
