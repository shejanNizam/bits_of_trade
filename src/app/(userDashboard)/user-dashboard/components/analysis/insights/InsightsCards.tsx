// "use client";

// import { useState } from "react";
// import EmotionsModal from "./cardsModals/EmotionsModal";
// import JournalModal from "./cardsModals/JournalModal";
// import LessonsModal from "./cardsModals/LessonsModal";
// import RulesModal from "./cardsModals/RulesModal";
// const detailedMetrics = [
//   {
//     id: "DIS*",
//     value: "76.5%",
//     label: "Discipline Integrity Score",
//     status: "Improving",
//     statusColor: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30",
//     meaning: "You follow your rule 76.5% of the time",
//     evidence: "10 rule breaches in last 30 days",
//     action: "Review Rules & Limits",
//     type: "rules",
//   },
//   {
//     id: "VMI*",
//     value: "24%",
//     label: "Violation Momentum Index",
//     status: "warning",
//     statusColor: "text-amber-600 bg-amber-50 dark:bg-amber-950/30",
//     meaning: "Your mistakes are slightly clustering",
//     evidence: "3 mistakes in last 5 trades",
//     action: "Complete Quick Journal",
//     type: "journal",
//   },
//   {
//     id: "DRT*",
//     value: "3.2%",
//     label: "Discipline Recovery Time",
//     status: "stable",
//     statusColor: "text-blue-600 bg-blue-50 dark:bg-blue-950/30",
//     meaning: "You recover discipline in 3.2 sessions after violations",
//     evidence: "You traders recover under 2 sessions",
//     action: "Watch Quick Recovery Lesson",
//     type: "lessons",
//   },
//   {
//     id: "ECI*",
//     value: "-2850%",
//     label: "Emotion Cost Index",
//     status: "critical",
//     statusColor: "text-red-600 bg-red-50 dark:bg-red-950/30",
//     meaning: "FOMO and Overconfidence cost you ₹2,850",
//     evidence: "Calm trades profit 2.4x more",
//     action: "Review emotional patterns",
//     type: "emotions",
//   },
// ];

// export default function InsightsCards() {
//   const [activeModal, setActiveModal] = useState<string | null>(null);

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mx-auto">
//       {detailedMetrics.map((item, idx) => (
//         <div
//           key={idx}
//           className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-4xl p-6 shadow-sm flex flex-col gap-4 transition-all hover:shadow-md"
//         >
//           {/* Card Header & Content (Same as your provided code) */}
//           <div className="flex justify-between items-start">
//             <span
//               className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter ${item.statusColor}`}
//             >
//               {item.id}
//             </span>
//             <span
//               className={`px-3 py-1 rounded-full text-[10px] font-medium capitalize ${item.statusColor}`}
//             >
//               {item.status}
//             </span>
//           </div>
//           <div>
//             <h2 className="text-4xl font-bold text-slate-900 dark:text-white">
//               {item.value}
//             </h2>
//             <p className="text-sm text-slate-500 mt-1">{item.label}</p>
//           </div>
//           <div className="space-y-3 mt-2">
//             <div className="bg-purple-50/50 dark:bg-purple-900/10 border border-purple-100 dark:border-purple-900/30 p-4 rounded-2xl">
//               <p className="text-[10px] font-bold text-purple-600 uppercase mb-1">
//                 What it means
//               </p>
//               <p className="text-sm text-slate-700 dark:text-slate-300">
//                 {item.meaning}
//               </p>
//             </div>
//             <div className="bg-emerald-50/50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-900/30 p-4 rounded-2xl">
//               <p className="text-[10px] font-bold text-emerald-600 uppercase mb-1">
//                 Evidence
//               </p>
//               <p className="text-sm text-slate-700 dark:text-slate-300">
//                 {item.evidence}
//               </p>
//             </div>
//           </div>

//           <button
//             onClick={() => setActiveModal(item.type)}
//             className="w-full mt-2 py-3 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors active:scale-95"
//           >
//             {item.action}
//           </button>
//         </div>
//       ))}

//       {/* Modals */}
//       <RulesModal
//         open={activeModal === "rules"}
//         onCancel={() => setActiveModal(null)}
//       />
//       <JournalModal
//         open={activeModal === "journal"}
//         onCancel={() => setActiveModal(null)}
//       />
//       <LessonsModal
//         open={activeModal === "lessons"}
//         onCancel={() => setActiveModal(null)}
//       />
//       <EmotionsModal
//         open={activeModal === "emotions"}
//         onCancel={() => setActiveModal(null)}
//       />
//     </div>
//   );
// }

// "use client";

// import { useState } from "react";
// import EmotionsModal from "./cardsModals/EmotionsModal";
// import JournalModal from "./cardsModals/JournalModal";
// import LessonsModal from "./cardsModals/LessonsModal";
// import RulesModal from "./cardsModals/RulesModal";

// interface ScorecardItem {
//   code: string;
//   label: string;
//   value: number | null;
//   unit: string;
//   data_state: string;
//   status: string;
//   trend: string;
//   what_it_means: string;
//   evidence: string;
//   cta?: {
//     label: string;
//     type: string;
//   };
// }

// interface InsightsCardsProps {
//   scorecard: ScorecardItem[];
// }

// const getStatusColor = (status: string) => {
//   const colors: Record<string, string> = {
//     good: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30",
//     improving: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30",
//     warning: "text-amber-600 bg-amber-50 dark:bg-amber-950/30",
//     critical: "text-red-600 bg-red-50 dark:bg-red-950/30",
//     stable: "text-blue-600 bg-blue-50 dark:bg-blue-950/30",
//     neutral: "text-gray-600 bg-gray-50 dark:bg-gray-950/30",
//   };
//   return colors[status] || colors.neutral;
// };

// const formatCardValue = (item: ScorecardItem) => {
//   if (item.value === null || item.value === undefined) {
//     return "N/A";
//   }

//   if (item.code === "FIE") {
//     return `₹${(item.value / 1000).toFixed(1)}k`;
//   }

//   if (item.code === "ECI" && item.value < 0) {
//     return `-₹${Math.abs(item.value / 1000).toFixed(1)}k`;
//   }

//   if (
//     item.unit === "%" ||
//     item.code === "CPI" ||
//     item.code === "DDR" ||
//     item.code === "CAS"
//   ) {
//     return `${item.value}%`;
//   }

//   if (item.code === "OVR") {
//     return `${item.value}/10`;
//   }

//   if (item.code === "DRT" && item.value) {
//     return `${item.value} sessions`;
//   }

//   if (item.code === "DAE") {
//     return `₹${item.value.toLocaleString("en-IN")}`;
//   }

//   return item.value.toString();
// };

// export default function InsightsCards({ scorecard }: InsightsCardsProps) {
//   const [activeModal, setActiveModal] = useState<string | null>(null);
//   const [selectedMetric, setSelectedMetric] = useState<ScorecardItem | null>(
//     null,
//   );

//   // Select specific metrics for cards
//   const cardMetrics = ["DIS", "VMI", "DRT", "ECI"];
//   const displayMetrics = scorecard.filter((metric) =>
//     cardMetrics.includes(metric.code),
//   );

//   const handleOpenModal = (type: string, metric: ScorecardItem) => {
//     setSelectedMetric(metric);
//     setActiveModal(type);
//   };

//   if (displayMetrics.length === 0) {
//     return (
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mx-auto">
//         <p className="text-center text-gray-500 col-span-2">
//           No insights data available
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mx-auto">
//       {displayMetrics.map((item, idx) => (
//         <div
//           key={idx}
//           className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-4xl p-6 shadow-sm flex flex-col gap-4 transition-all hover:shadow-md"
//         >
//           {/* Card Header & Content */}
//           <div className="flex justify-between items-start">
//             <span
//               className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter ${getStatusColor(item.status)}`}
//             >
//               {item.code}
//             </span>
//             <span
//               className={`px-3 py-1 rounded-full text-[10px] font-medium capitalize ${getStatusColor(item.status)}`}
//             >
//               {item.trend || item.status}
//             </span>
//           </div>
//           <div>
//             <h2 className="text-4xl font-bold text-slate-900 dark:text-white">
//               {formatCardValue(item)}
//             </h2>
//             <p className="text-sm text-slate-500 mt-1">{item.label}</p>
//           </div>
//           <div className="space-y-3 mt-2">
//             <div className="bg-purple-50/50 dark:bg-purple-900/10 border border-purple-100 dark:border-purple-900/30 p-4 rounded-2xl">
//               <p className="text-[10px] font-bold text-purple-600 uppercase mb-1">
//                 What it means
//               </p>
//               <p className="text-sm text-slate-700 dark:text-slate-300">
//                 {item.what_it_means}
//               </p>
//             </div>
//             <div className="bg-emerald-50/50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-900/30 p-4 rounded-2xl">
//               <p className="text-[10px] font-bold text-emerald-600 uppercase mb-1">
//                 Evidence
//               </p>
//               <p className="text-sm text-slate-700 dark:text-slate-300">
//                 {item.evidence}
//               </p>
//             </div>
//           </div>

//           <button
//             onClick={() => handleOpenModal(item.cta?.type || "rules", item)}
//             className="w-full mt-2 py-3 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors active:scale-95"
//           >
//             {item.cta?.label || "View Details"}
//           </button>
//         </div>
//       ))}

//       {/* Modals */}
//       <RulesModal
//         open={activeModal === "rules"}
//         onCancel={() => setActiveModal(null)}
//         metricData={selectedMetric || undefined}
//       />
//       <JournalModal
//         open={activeModal === "journal"}
//         onCancel={() => setActiveModal(null)}
//         metricData={selectedMetric || undefined}
//       />
//       <LessonsModal
//         open={activeModal === "learn" || activeModal === "lessons"}
//         onCancel={() => setActiveModal(null)}
//         metricData={selectedMetric || undefined}
//       />
//       <EmotionsModal
//         open={activeModal === "emotions"}
//         onCancel={() => setActiveModal(null)}
//         metricData={selectedMetric || undefined}
//       />
//     </div>
//   );
// }

"use client";

import Link from "next/link";

interface ScorecardItem {
  code: string;
  label: string;
  value: number | null;
  unit: string;
  data_state: string;
  status: string;
  trend: string;
  what_it_means: string;
  evidence: string;
  cta?: {
    label: string;
    type: string;
  };
}

interface InsightsCardsProps {
  scorecard: ScorecardItem[];
}

const getStatusColor = (status: string) => {
  const colors: Record<string, string> = {
    good: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30",
    improving: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30",
    warning: "text-amber-600 bg-amber-50 dark:bg-amber-950/30",
    critical: "text-red-600 bg-red-50 dark:bg-red-950/30",
    stable: "text-blue-600 bg-blue-50 dark:bg-blue-950/30",
    neutral: "text-gray-600 bg-gray-50 dark:bg-gray-950/30",
  };
  return colors[status] || colors.neutral;
};

const formatCardValue = (item: ScorecardItem) => {
  if (item.value === null || item.value === undefined) {
    return "N/A";
  }

  if (item.code === "FIE") {
    return `₹${(item.value / 1000).toFixed(1)}k`;
  }

  if (item.code === "ECI" && item.value < 0) {
    return `-₹${Math.abs(item.value / 1000).toFixed(1)}k`;
  }

  if (
    item.unit === "%" ||
    item.code === "CPI" ||
    item.code === "DDR" ||
    item.code === "CAS"
  ) {
    return `${item.value}%`;
  }

  if (item.code === "OVR") {
    return `${item.value}/10`;
  }

  if (item.code === "DRT" && item.value) {
    return `${item.value} sessions`;
  }

  if (item.code === "DAE") {
    return `₹${item.value.toLocaleString("en-IN")}`;
  }

  return item.value.toString();
};

// Helper function to get navigation path based on modal type
const getNavigationPath = (type: string): string => {
  switch (type) {
    case "rules":
      return "/user-dashboard/rules-limit";
    case "journal":
      return "/user-dashboard/journal";
    case "learn":
    case "lessons":
      return "/user-dashboard/learning-hub";
    case "emotions":
      return "/user-dashboard/trade-intelligent";
    default:
      return "/user-dashboard";
  }
};

export default function InsightsCards({ scorecard }: InsightsCardsProps) {
  // Remove modal-related state since we're using navigation
  const cardMetrics = ["DIS", "VMI", "DRT", "ECI"];
  const displayMetrics = scorecard.filter((metric) =>
    cardMetrics.includes(metric.code),
  );

  if (displayMetrics.length === 0) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mx-auto">
        <p className="text-center text-gray-500 col-span-2">
          No insights data available
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mx-auto">
      {displayMetrics.map((item, idx) => (
        <div
          key={idx}
          className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-4xl p-6 shadow-sm flex flex-col gap-4 transition-all hover:shadow-md"
        >
          {/* Card Header & Content */}
          <div className="flex justify-between items-start">
            <span
              className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter ${getStatusColor(item.status)}`}
            >
              {item.code}
            </span>
            <span
              className={`px-3 py-1 rounded-full text-[10px] font-medium capitalize ${getStatusColor(item.status)}`}
            >
              {item.trend || item.status}
            </span>
          </div>
          <div>
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white">
              {formatCardValue(item)}
            </h2>
            <p className="text-sm text-slate-500 mt-1">{item.label}</p>
          </div>
          <div className="space-y-3 mt-2">
            <div className="bg-purple-50/50 dark:bg-purple-900/10 border border-purple-100 dark:border-purple-900/30 p-4 rounded-2xl">
              <p className="text-[10px] font-bold text-purple-600 uppercase mb-1">
                What it means
              </p>
              <p className="text-sm text-slate-700 dark:text-slate-300">
                {item.what_it_means}
              </p>
            </div>
            <div className="bg-emerald-50/50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-900/30 p-4 rounded-2xl">
              <p className="text-[10px] font-bold text-emerald-600 uppercase mb-1">
                Evidence
              </p>
              <p className="text-sm text-slate-700 dark:text-slate-300">
                {item.evidence}
              </p>
            </div>
          </div>

          {/* Use Next.js Link for navigation */}
          <Link
            href={getNavigationPath(item.cta?.type || "rules")}
            className="w-full mt-2 py-3 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors active:scale-95 text-center"
          >
            {item.cta?.label || "View Details"}
          </Link>
        </div>
      ))}
    </div>
  );
}
