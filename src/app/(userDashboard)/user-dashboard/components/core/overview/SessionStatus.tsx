interface SessionStatusProps {
  sessionHealth?: {
    status: string;
    color: string;
    tradesToday: number;
    rulesViolated: number;
    mistakesLogged: number;
    journalCompleted: boolean;
  };
}

export default function SessionStatus({ sessionHealth }: SessionStatusProps) {
  const statusColor = sessionHealth?.color?.toLowerCase() || "green";

  const statusConfig = {
    green: {
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

  const config =
    statusConfig[statusColor as keyof typeof statusConfig] ||
    statusConfig.green;

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

// interface SessionStatusProps {
//   sessionHealth?: {
//     status: string;
//     color: string;
//     tradesToday: number;
//     maxTradesPerDay?: number;
//     rulesViolated: number;
//     mistakesLogged: number;
//     journalCompleted: boolean;
//     dailyLossLimitExceeded?: boolean;
//     lossAmount?: number;
//   };
// }

// export default function SessionStatus({ sessionHealth }: SessionStatusProps) {
//   const statusColor = sessionHealth?.color?.toLowerCase() || "green";

//   const statusConfig = {
//     green: {
//       bgColor: "bg-green-950/20 border-green-900/50",
//       iconBg: "border-green-800/50",
//       iconColor: "text-green-500",
//       badgeBg: "bg-black/40 border border-green-900/50",
//       badgeText: "text-green-500",
//       title: "Session Status: Normal",
//       description: "No active restrictions. Keep journaling and reviewing.",
//       buttonText: "Start Review",
//       secondaryButtonText: "View Guidelines",
//       label: "GREEN",
//     },
//     yellow: {
//       bgColor: "bg-yellow-950/20 border-yellow-900/50",
//       iconBg: "border-yellow-800/50",
//       iconColor: "text-yellow-500",
//       badgeBg: "bg-black/40 border border-yellow-900/50",
//       badgeText: "text-yellow-500",
//       title: "Session Status: Caution",
//       description:
//         "Before your next trade, complete a Quick Check to stay aligned.",
//       buttonText: "Complete Quick Check",
//       secondaryButtonText: "See reasons",
//       label: "YELLOW",
//       details: [
//         `${sessionHealth?.rulesViolated || 2} consecutive rule breaches detected`,
//         `Mistake cluster spike in last 3 trades`,
//       ],
//     },
//     red: {
//       bgColor: "bg-red-950/20 border-red-900/50",
//       iconBg: "border-red-800/50",
//       iconColor: "text-red-500",
//       badgeBg: "bg-black/40 border border-red-900/50",
//       badgeText: "text-red-500",
//       title: "Session Status: Restricted",
//       description:
//         "Trading is paused for today. Review and reset to protect capital.",
//       buttonText: "Begin Reset",
//       secondaryButtonText: "See reasons",
//       label: "RED",
//       details: [
//         `Daily loss limit exceeded (-₹${sessionHealth?.lossAmount?.toLocaleString() || "10,500"})`,
//         `Max trades per day breached (${sessionHealth?.tradesToday || 8}/${sessionHealth?.maxTradesPerDay || 5})`,
//       ],
//     },
//   };

//   const config =
//     statusConfig[statusColor as keyof typeof statusConfig] ||
//     statusConfig.green;

//   return (
//     <div
//       className={`${config.bgColor} rounded-lg p-4 border transition-all duration-300`}
//     >
//       <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
//         {/* Left Section */}
//         <div className="flex items-start gap-4 flex-1">
//           {/* Icon Box */}
//           <div
//             className={`border ${config.iconBg} rounded-lg p-2 shrink-0 mt-1`}
//           >
//             {statusColor === "green" ? (
//               <svg
//                 className={`${config.iconColor} w-5 h-5`}
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M5 13l4 4L19 7"
//                 />
//               </svg>
//             ) : (
//               <svg
//                 className={`${config.iconColor} w-5 h-5`}
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
//                 />
//               </svg>
//             )}
//           </div>

//           <div className="flex-1 min-w-0">
//             <h3 className={`${config.iconColor} text-base font-bold mb-1`}>
//               {config.title}
//             </h3>
//             <p className="text-gray-400 text-sm mb-2">{config.description}</p>

//             {/* Conditional Details for Yellow/Red */}
//             {config.details && (
//               <ul className="space-y-1">
//                 {config.details.map((detail, i) => (
//                   <li
//                     key={i}
//                     className="text-gray-500 text-xs flex items-center gap-2"
//                   >
//                     <span className="w-1 h-1 bg-gray-600 rounded-full" />{" "}
//                     {detail}
//                   </li>
//                 ))}
//               </ul>
//             )}

//             {/* Buttons */}
//             <div className="flex gap-3 mt-4">
//               <button className="px-4 py-1.5 bg-[#f59e0b] hover:bg-[#d97706] text-black text-sm font-bold rounded-md transition-colors">
//                 {config.buttonText}
//               </button>
//               <button className="px-4 py-1.5 border border-gray-700 hover:bg-gray-800 text-gray-300 text-sm font-medium rounded-md transition-colors">
//                 {config.secondaryButtonText}
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Right Section Badge */}
//         <div
//           className={`${config.badgeBg} ${config.badgeText} px-4 py-2 rounded text-xs font-black tracking-widest`}
//         >
//           {config.label}
//         </div>
//       </div>
//     </div>
//   );
// }

// interface SessionStatusProps {
//   sessionHealth?: {
//     status: string;
//     color: string;
//     tradesToday: number;
//     maxTradesPerDay?: number;
//     rulesViolated: number;
//     mistakesLogged: number;
//     journalCompleted: boolean;
//     dailyLossLimitExceeded?: boolean;
//     lossAmount?: number;
//   };
// }

// export default function SessionStatus({ sessionHealth }: SessionStatusProps) {
//   const statusColor = sessionHealth?.color?.toLowerCase() || "green";

//   const statusConfig = {
//     green: {
//       bgColor: "bg-green-950/10 dark:bg-green-950/20",
//       borderColor: "border-green-900/30 dark:border-green-900/50",
//       hoverBorderColor: "hover:border-green-800/50",
//       iconBg: "bg-green-900/30 dark:bg-green-900/50",
//       iconBorder: "border-green-800/40 dark:border-green-800/50",
//       iconColor: "text-green-500 dark:text-green-400",
//       badgeBg: "bg-black/30 dark:bg-black/40",
//       badgeBorder: "border-green-900/40 dark:border-green-900/50",
//       badgeText: "text-green-500 dark:text-green-400",
//       title: "Session Status: Normal",
//       description: "No active restrictions. Keep journaling and reviewing.",
//       buttonText: "Start Review",
//       secondaryButtonText: "View Guidelines",
//       label: "GREEN",
//       buttonPrimary: "bg-green-600 hover:bg-green-700 text-white",
//       buttonSecondary:
//         "border-green-700/50 hover:bg-green-950/30 text-green-400",
//     },
//     yellow: {
//       bgColor: "bg-yellow-950/10 dark:bg-yellow-950/20",
//       borderColor: "border-yellow-900/30 dark:border-yellow-900/50",
//       hoverBorderColor: "hover:border-yellow-800/50",
//       iconBg: "bg-yellow-900/30 dark:bg-yellow-900/50",
//       iconBorder: "border-yellow-800/40 dark:border-yellow-800/50",
//       iconColor: "text-yellow-500 dark:text-yellow-400",
//       badgeBg: "bg-black/30 dark:bg-black/40",
//       badgeBorder: "border-yellow-900/40 dark:border-yellow-900/50",
//       badgeText: "text-yellow-500 dark:text-yellow-400",
//       title: "Session Status: Caution",
//       description:
//         "Before your next trade, complete a Quick Check to stay aligned.",
//       buttonText: "Complete Quick Check",
//       secondaryButtonText: "See reasons",
//       label: "YELLOW",
//       buttonPrimary: "bg-yellow-600 hover:bg-yellow-700 text-black",
//       buttonSecondary:
//         "border-yellow-700/50 hover:bg-yellow-950/30 text-yellow-400",
//       details: [
//         `${sessionHealth?.rulesViolated || 2} consecutive rule breaches detected`,
//         `Mistake cluster spike in last 3 trades`,
//       ],
//     },
//     red: {
//       bgColor: "bg-red-950/10 dark:bg-red-950/20",
//       borderColor: "border-red-900/30 dark:border-red-900/50",
//       hoverBorderColor: "hover:border-red-800/50",
//       iconBg: "bg-red-900/30 dark:bg-red-900/50",
//       iconBorder: "border-red-800/40 dark:border-red-800/50",
//       iconColor: "text-red-500 dark:text-red-400",
//       badgeBg: "bg-black/30 dark:bg-black/40",
//       badgeBorder: "border-red-900/40 dark:border-red-900/50",
//       badgeText: "text-red-500 dark:text-red-400",
//       title: "Session Status: Restricted",
//       description:
//         "Trading is paused for today. Review and reset to protect capital.",
//       buttonText: "Begin Reset",
//       secondaryButtonText: "See reasons",
//       label: "RED",
//       buttonPrimary: "bg-red-600 hover:bg-red-700 text-white",
//       buttonSecondary: "border-red-700/50 hover:bg-red-950/30 text-red-400",
//       details: [
//         `Daily loss limit exceeded (-₹${Math.abs(sessionHealth?.lossAmount || 10500).toLocaleString()})`,
//         `Max trades per day breached (${sessionHealth?.tradesToday || 8}/${sessionHealth?.maxTradesPerDay || 5})`,
//       ],
//     },
//   };

//   const config =
//     statusConfig[statusColor as keyof typeof statusConfig] ||
//     statusConfig.green;

//   return (
//     <div
//       className={`${config.bgColor} ${config.borderColor} ${config.hoverBorderColor} rounded-xl p-5 border transition-all duration-300 shadow-sm`}
//     >
//       <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-5">
//         {/* Left Section */}
//         <div className="flex items-start gap-4 flex-1">
//           {/* Icon Box */}
//           <div
//             className={`${config.iconBg} ${config.iconBorder} border rounded-xl p-2.5 shrink-0`}
//           >
//             {statusColor === "green" ? (
//               <svg
//                 className={`${config.iconColor} w-5 h-5`}
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//                 strokeWidth={2}
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M5 13l4 4L19 7"
//                 />
//               </svg>
//             ) : statusColor === "yellow" ? (
//               <svg
//                 className={`${config.iconColor} w-5 h-5`}
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//                 strokeWidth={2}
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
//                 />
//               </svg>
//             ) : (
//               <svg
//                 className={`${config.iconColor} w-5 h-5`}
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//                 strokeWidth={2}
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//                 />
//               </svg>
//             )}
//           </div>

//           <div className="flex-1 min-w-0">
//             <h3 className={`${config.iconColor} text-lg font-bold mb-1.5`}>
//               {config.title}
//             </h3>
//             <p className="text-gray-400 text-sm mb-3">{config.description}</p>

//             {/* Conditional Details for Yellow/Red */}
//             {config.details && (
//               <ul className="space-y-1.5 mb-4">
//                 {config.details.map((detail, i) => (
//                   <li
//                     key={i}
//                     className="text-gray-500 text-xs flex items-center gap-2"
//                   >
//                     <span
//                       className={`w-1.5 h-1.5 rounded-full ${config.iconColor}`}
//                     />
//                     {detail}
//                   </li>
//                 ))}
//               </ul>
//             )}

//             {/* Buttons */}
//             <div className="flex flex-wrap gap-3 mt-2">
//               <button
//                 className={`${config.buttonPrimary} px-5 py-2 text-sm font-semibold rounded-lg transition-all duration-200 transform hover:scale-[1.02] shadow-sm`}
//               >
//                 {config.buttonText}
//               </button>
//               <button
//                 className={`${config.buttonSecondary} px-5 py-2 border text-sm font-medium rounded-lg transition-all duration-200 hover:bg-opacity-10`}
//               >
//                 {config.secondaryButtonText}
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Right Section Badge */}
//         <div
//           className={`${config.badgeBg} ${config.badgeBorder} ${config.badgeText} px-4 py-2 rounded-lg border text-xs font-black tracking-wider text-center lg:text-right`}
//         >
//           {config.label}
//         </div>
//       </div>
//     </div>
//   );
// }
