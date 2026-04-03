// "use client";

// import { Modal, Tabs } from "antd";
// import { useState } from "react";
// import {
//   FaBolt,
//   FaBrain,
//   FaBullseye,
//   FaChartArea,
//   FaChartLine,
//   FaClock,
//   FaHeart,
//   FaLock,
//   FaShieldAlt,
//   FaSuitcase,
//   FaUserShield,
// } from "react-icons/fa";
// import { IoGrid } from "react-icons/io5";
// import { MdPsychology } from "react-icons/md";
// import { RiEmotionLine } from "react-icons/ri";
// import CapitalProtectionIndexModal from "./CapitalProtectionIndexModal";
// import ConfidenceAccuracyModal from "./ConfidenceAccuracyModal";
// import DisciplineAdjustedExpectancyModal from "./DisciplineAdjustedExpectancyModal";
// import DisciplineDependencyRatioModal from "./DisciplineDependencyRatioModal";
// import DisciplineIntegrityModal from "./DisciplineIntegrityModal";
// import DisciplineRecoveryTimeModal from "./DisciplineRecoveryTimeModal";
// import EmotionCostIndexModal from "./EmotionCostIndexModal";
// import ForcedInactivityModal from "./ForcedInactivityModal";
// import OverrideResistanceModal from "./OverrideResistanceModal";
// import StrategyMaturityIndexModal from "./StrategyMaturityIndexModal";
// import TradingPermissionRatioModal from "./TradingPermissionRatioModal";
// import ViolationMomentumModal from "./ViolationMomentumModal";

// // Import detail modals

// interface MetricsModalProps {
//   open: boolean;
//   onClose: () => void;
// }

// interface MetricCardProps {
//   icon: React.ReactNode;
//   iconBg: string;
//   title: string;
//   subtitle: string;
//   value: string | React.ReactNode;
//   abbreviation: string;
//   linkColor: string;
//   onViewDetails: () => void;
// }

// const MetricCard: React.FC<MetricCardProps> = ({
//   icon,
//   iconBg,
//   title,
//   subtitle,
//   value,
//   abbreviation,
//   linkColor,
//   onViewDetails,
// }) => {
//   return (
//     <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 hover:shadow-lg transition-all">
//       <div className="flex items-start justify-between mb-4">
//         <div className={`${iconBg} p-3 rounded-xl`}>{icon}</div>
//         <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">
//           {abbreviation}
//         </span>
//       </div>

//       <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
//         {title}
//       </h3>
//       <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
//         {subtitle}
//       </p>

//       <div className="text-3xl font-bold text-slate-900 dark:text-white mb-3">
//         {value}
//       </div>

//       <button
//         onClick={onViewDetails}
//         className={`text-sm font-semibold ${linkColor} hover:underline flex items-center gap-1`}
//       >
//         View details →
//       </button>
//     </div>
//   );
// };

// export default function MetricsModal({ open, onClose }: MetricsModalProps) {
//   const [activeDetailModal, setActiveDetailModal] = useState<string | null>(
//     null,
//   );

//   const handleCloseDetailModal = () => {
//     setActiveDetailModal(null);
//   };

//   const tabItems = [
//     {
//       key: "1",
//       label: (
//         <div className="flex items-center gap-2 px-2">
//           <FaBullseye className="w-4 h-4" />
//           <div className="text-left">
//             <div className="font-semibold">Discipline & Behaviour</div>
//           </div>
//           <span className="ml-2 bg-slate-200 dark:bg-slate-700 px-2 py-0.5 rounded text-xs">
//             3
//           </span>
//         </div>
//       ),
//       children: (
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
//           <MetricCard
//             icon={<FaBullseye className="w-6 h-6 text-purple-600" />}
//             iconBg="bg-purple-100 dark:bg-purple-900/30"
//             title="Discipline Integrity Score (DIS™)"
//             subtitle="How consistently you follow your own rules — regardless of profit."
//             value="76.5%"
//             abbreviation="DIS™"
//             linkColor="text-purple-600 dark:text-purple-400"
//             onViewDetails={() => setActiveDetailModal("discipline-integrity")}
//           />

//           <MetricCard
//             icon={<FaClock className="w-6 h-6 text-cyan-600" />}
//             iconBg="bg-cyan-100 dark:bg-cyan-900/30"
//             title="Discipline Recovery Time (DRT)"
//             subtitle="How long you take to recover discipline after a violation."
//             value="3.2 sessions"
//             abbreviation="DRT"
//             linkColor="text-cyan-600 dark:text-cyan-400"
//             onViewDetails={() => setActiveDetailModal("discipline-recovery")}
//           />

//           <MetricCard
//             icon={<FaChartLine className="w-6 h-6 text-yellow-600" />}
//             iconBg="bg-yellow-100 dark:bg-yellow-900/30"
//             title="Violation Momentum Index (VMI)"
//             subtitle="Are your mistakes isolated — or snowballing?"
//             value="24"
//             abbreviation="VMI"
//             linkColor="text-yellow-600 dark:text-yellow-400"
//             onViewDetails={() => setActiveDetailModal("violation-momentum")}
//           />
//         </div>
//       ),
//     },
//     {
//       key: "2",
//       label: (
//         <div className="flex items-center gap-2 px-2">
//           <IoGrid className="w-4 h-4" />
//           <div className="text-left">
//             <div className="font-semibold">Session & Control</div>
//           </div>
//           <span className="ml-2 bg-slate-200 dark:bg-slate-700 px-2 py-0.5 rounded text-xs">
//             3
//           </span>
//         </div>
//       ),
//       children: (
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
//           <MetricCard
//             icon={<FaLock className="w-6 h-6 text-blue-600" />}
//             iconBg="bg-blue-100 dark:bg-blue-900/30"
//             title="Trading Permission Ratio (TPR)"
//             subtitle="How often you are trusted to trade freely."
//             value="38%"
//             abbreviation="TPR"
//             linkColor="text-blue-600 dark:text-blue-400"
//             onViewDetails={() => setActiveDetailModal("trading-permission")}
//           />

//           <MetricCard
//             icon={<FaSuitcase className="w-6 h-6 text-green-600" />}
//             iconBg="bg-green-100 dark:bg-green-900/30"
//             title="Forced Inactivity Effectiveness (FIE)"
//             subtitle="Did forced breaks actually save you money?"
//             value="₹42,600"
//             abbreviation="FIE"
//             linkColor="text-green-600 dark:text-green-400"
//             onViewDetails={() => setActiveDetailModal("forced-inactivity")}
//           />

//           <MetricCard
//             icon={<FaUserShield className="w-6 h-6 text-red-600" />}
//             iconBg="bg-red-100 dark:bg-red-900/30"
//             title="Override Resistance Score"
//             subtitle="How often you tried to fight the system."
//             value="8.5/10"
//             abbreviation="Override"
//             linkColor="text-red-600 dark:text-red-400"
//             onViewDetails={() => setActiveDetailModal("override-resistance")}
//           />
//         </div>
//       ),
//     },
//     {
//       key: "3",
//       label: (
//         <div className="flex items-center gap-2 px-2">
//           <MdPsychology className="w-4 h-4" />
//           <div className="text-left">
//             <div className="font-semibold">Psychology × Performance</div>
//           </div>
//           <span className="ml-2 bg-slate-200 dark:bg-slate-700 px-2 py-0.5 rounded text-xs">
//             3
//           </span>
//         </div>
//       ),
//       children: (
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
//           <MetricCard
//             icon={<FaHeart className="w-6 h-6 text-pink-600" />}
//             iconBg="bg-pink-100 dark:bg-pink-900/30"
//             title="Emotion Cost Index (ECI)"
//             subtitle="How much each emotion costs you in real money."
//             value="-₹14,850"
//             abbreviation="ECI"
//             linkColor="text-pink-600 dark:text-pink-400"
//             onViewDetails={() => setActiveDetailModal("emotion-cost")}
//           />

//           <MetricCard
//             icon={<RiEmotionLine className="w-6 h-6 text-orange-600" />}
//             iconBg="bg-orange-100 dark:bg-orange-900/30"
//             title="Confidence Accuracy Score (CAS)"
//             subtitle="Is your confidence aligned with reality?"
//             value="62%"
//             abbreviation="CAS"
//             linkColor="text-orange-600 dark:text-orange-400"
//             onViewDetails={() => setActiveDetailModal("confidence-accuracy")}
//           />

//           <MetricCard
//             icon={<FaChartArea className="w-6 h-6 text-cyan-600" />}
//             iconBg="bg-cyan-100 dark:bg-cyan-900/30"
//             title="Discipline-Adjusted Expectancy (DAE)"
//             subtitle="Your true edge after removing undisciplined trades."
//             value={
//               <span>
//                 ₹2,450 <span className="text-lg">vs</span> ₹890
//               </span>
//             }
//             abbreviation="DAE"
//             linkColor="text-cyan-600 dark:text-cyan-400"
//             onViewDetails={() =>
//               setActiveDetailModal("discipline-adjusted-expectancy")
//             }
//           />
//         </div>
//       ),
//     },
//     {
//       key: "4",
//       label: (
//         <div className="flex items-center gap-2 px-2">
//           <FaBrain className="w-4 h-4" />
//           <div className="text-left">
//             <div className="font-semibold">System Intelligence</div>
//           </div>
//           <span className="ml-2 bg-slate-200 dark:bg-slate-700 px-2 py-0.5 rounded text-xs">
//             3
//           </span>
//         </div>
//       ),
//       children: (
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
//           <MetricCard
//             icon={<IoGrid className="w-6 h-6 text-indigo-600" />}
//             iconBg="bg-indigo-100 dark:bg-indigo-900/30"
//             title="Strategy Maturity Index (SMI)"
//             subtitle="Is your strategy real — or noise?"
//             value="72/100"
//             abbreviation="SMI"
//             linkColor="text-indigo-600 dark:text-indigo-400"
//             onViewDetails={() => setActiveDetailModal("strategy-maturity")}
//           />

//           <MetricCard
//             icon={<FaBolt className="w-6 h-6 text-yellow-600" />}
//             iconBg="bg-yellow-100 dark:bg-yellow-900/30"
//             title="Discipline Dependency Ratio (DDR)"
//             subtitle="How dependent your profitability is on discipline."
//             value="78%"
//             abbreviation="DDR"
//             linkColor="text-yellow-600 dark:text-yellow-400"
//             onViewDetails={() => setActiveDetailModal("discipline-dependency")}
//           />

//           <MetricCard
//             icon={<FaShieldAlt className="w-6 h-6 text-green-600" />}
//             iconBg="bg-green-100 dark:bg-green-900/30"
//             title="Capital Protection Index (CPI)"
//             subtitle="How well the system protects your downside."
//             value="31%"
//             abbreviation="CPI"
//             linkColor="text-green-600 dark:text-green-400"
//             onViewDetails={() => setActiveDetailModal("capital-protection")}
//           />
//         </div>
//       ),
//     },
//   ];

//   return (
//     <>
//       <Modal
//         open={open}
//         onCancel={onClose}
//         footer={null}
//         width={1200}
//         centered
//         className="metrics-modal"
//       >
//         <div className="py-4">
//           <div className="mb-6">
//             <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
//               Understanding BitsOfTrade Metrics
//             </h2>
//             <p className="text-slate-600 dark:text-slate-400">
//               12 exclusive metrics you {"won't"} find anywhere else
//             </p>
//           </div>

//           <Tabs
//             defaultActiveKey="1"
//             items={tabItems}
//             className="metrics-tabs"
//             size="large"
//           />

//           <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
//             <p className="text-sm text-slate-600 dark:text-slate-400 text-center">
//               These metrics are exclusive to BitsOfTrade. They measure{" "}
//               <span className="font-semibold text-purple-600 dark:text-purple-400">
//                 control
//               </span>{" "}
//               — not luck. Competitors can copy features — they cannot copy
//               enforcement.
//             </p>
//           </div>
//         </div>
//       </Modal>

//       {/* Detail Modals */}
//       <DisciplineIntegrityModal
//         open={activeDetailModal === "discipline-integrity"}
//         onCancel={handleCloseDetailModal}
//       />
//       <DisciplineRecoveryTimeModal
//         open={activeDetailModal === "discipline-recovery"}
//         onCancel={handleCloseDetailModal}
//       />
//       <ViolationMomentumModal
//         open={activeDetailModal === "violation-momentum"}
//         onCancel={handleCloseDetailModal}
//       />
//       <TradingPermissionRatioModal
//         open={activeDetailModal === "trading-permission"}
//         onCancel={handleCloseDetailModal}
//       />
//       <ForcedInactivityModal
//         open={activeDetailModal === "forced-inactivity"}
//         onCancel={handleCloseDetailModal}
//       />
//       <OverrideResistanceModal
//         open={activeDetailModal === "override-resistance"}
//         onCancel={handleCloseDetailModal}
//       />
//       <EmotionCostIndexModal
//         open={activeDetailModal === "emotion-cost"}
//         onCancel={handleCloseDetailModal}
//       />
//       <ConfidenceAccuracyModal
//         open={activeDetailModal === "confidence-accuracy"}
//         onCancel={handleCloseDetailModal}
//       />
//       <DisciplineAdjustedExpectancyModal
//         open={activeDetailModal === "discipline-adjusted-expectancy"}
//         onCancel={handleCloseDetailModal}
//       />
//       <StrategyMaturityIndexModal
//         open={activeDetailModal === "strategy-maturity"}
//         onCancel={handleCloseDetailModal}
//       />
//       <DisciplineDependencyRatioModal
//         open={activeDetailModal === "discipline-dependency"}
//         onCancel={handleCloseDetailModal}
//       />
//       <CapitalProtectionIndexModal
//         open={activeDetailModal === "capital-protection"}
//         onCancel={handleCloseDetailModal}
//       />
//     </>
//   );
// }

"use client";

import { Modal, Tabs } from "antd";
import { useState } from "react";
import {
  FaBolt,
  FaBrain,
  FaBullseye,
  FaChartArea,
  FaChartLine,
  FaClock,
  FaHeart,
  FaLock,
  FaShieldAlt,
  FaSuitcase,
  FaUserShield,
} from "react-icons/fa";
import { IoGrid } from "react-icons/io5";
import { MdPsychology } from "react-icons/md";
import { RiEmotionLine } from "react-icons/ri";
import CapitalProtectionIndexModal from "./CapitalProtectionIndexModal";
import ConfidenceAccuracyModal from "./ConfidenceAccuracyModal";
import DisciplineAdjustedExpectancyModal from "./DisciplineAdjustedExpectancyModal";
import DisciplineDependencyRatioModal from "./DisciplineDependencyRatioModal";
import DisciplineIntegrityModal from "./DisciplineIntegrityModal";
import DisciplineRecoveryTimeModal from "./DisciplineRecoveryTimeModal";
import EmotionCostIndexModal from "./EmotionCostIndexModal";
import ForcedInactivityModal from "./ForcedInactivityModal";
import OverrideResistanceModal from "./OverrideResistanceModal";
import StrategyMaturityIndexModal from "./StrategyMaturityIndexModal";
import TradingPermissionRatioModal from "./TradingPermissionRatioModal";
import ViolationMomentumModal from "./ViolationMomentumModal";

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

interface MetricsModalProps {
  open: boolean;
  onClose: () => void;
  scorecard?: ScorecardItem[];
}

interface MetricCardProps {
  icon: React.ReactNode;
  iconBg: string;
  title: string;
  subtitle: string;
  value: string | React.ReactNode;
  abbreviation: string;
  linkColor: string;
  onViewDetails: () => void;
  dataState?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({
  icon,
  iconBg,
  title,
  subtitle,
  value,
  abbreviation,
  linkColor,
  onViewDetails,
  dataState,
}) => {
  return (
    <div
      className={`bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 hover:shadow-lg transition-all ${dataState === "not_enough_data" ? "opacity-70" : ""}`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`${iconBg} p-3 rounded-xl`}>{icon}</div>
        <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">
          {abbreviation}
        </span>
      </div>

      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
        {title}
      </h3>
      <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
        {subtitle}
      </p>

      <div className="text-3xl font-bold text-slate-900 dark:text-white mb-3">
        {value}
      </div>

      <button
        onClick={onViewDetails}
        className={`text-sm font-semibold ${linkColor} hover:underline flex items-center gap-1`}
        disabled={dataState === "not_enough_data"}
      >
        View details →
      </button>
    </div>
  );
};

const formatModalValue = (item: ScorecardItem) => {
  if (item.value === null || item.value === undefined) {
    return "N/A";
  }

  if (item.code === "FIE") {
    return `₹${(item.value / 1000).toFixed(1)}k`;
  }

  if (item.code === "ECI" && item.value < 0) {
    return `-₹${Math.abs(item.value / 1000).toFixed(1)}k`;
  }

  if (item.code === "OVR") {
    return `${item.value}/10`;
  }

  if (
    item.unit === "%" ||
    item.code === "CPI" ||
    item.code === "DDR" ||
    item.code === "CAS"
  ) {
    return `${item.value}%`;
  }

  if (item.code === "DRT" && item.value) {
    return `${item.value} sessions`;
  }

  if (item.code === "DAE") {
    return `₹${item.value.toLocaleString("en-IN")}`;
  }

  return item.value.toString();
};

export default function MetricsModal({
  open,
  onClose,
  scorecard = [],
}: MetricsModalProps) {
  const [activeDetailModal, setActiveDetailModal] = useState<string | null>(
    null,
  );

  const handleCloseDetailModal = () => {
    setActiveDetailModal(null);
  };

  // Helper to get metric by code
  const getMetricByCode = (code: string) => {
    return scorecard.find((m) => m.code === code);
  };

  // Get values from API or use defaults
  const disMetric = getMetricByCode("DIS");
  const vmiMetric = getMetricByCode("VMI");
  const drtMetric = getMetricByCode("DRT");
  const tprMetric = getMetricByCode("TPR");
  const fieMetric = getMetricByCode("FIE");
  const ovrMetric = getMetricByCode("OVR");
  const eciMetric = getMetricByCode("ECI");
  const casMetric = getMetricByCode("CAS");
  const daeMetric = getMetricByCode("DAE");
  const smiMetric = getMetricByCode("SMI");
  const ddrMetric = getMetricByCode("DDR");
  const cpiMetric = getMetricByCode("CPI");

  const tabItems = [
    {
      key: "1",
      label: (
        <div className="flex items-center gap-2 px-2">
          <FaBullseye className="w-4 h-4" />
          <div className="text-left">
            <div className="font-semibold">Discipline & Behaviour</div>
          </div>
          <span className="ml-2 bg-slate-200 dark:bg-slate-700 px-2 py-0.5 rounded text-xs">
            3
          </span>
        </div>
      ),
      children: (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
          <MetricCard
            icon={<FaBullseye className="w-6 h-6 text-purple-600" />}
            iconBg="bg-purple-100 dark:bg-purple-900/30"
            title="Discipline Integrity Score (DIS™)"
            subtitle="How consistently you follow your own rules — regardless of profit."
            value={disMetric ? formatModalValue(disMetric) : "N/A"}
            abbreviation="DIS™"
            linkColor="text-purple-600 dark:text-purple-400"
            onViewDetails={() => setActiveDetailModal("discipline-integrity")}
            dataState={disMetric?.data_state}
          />

          <MetricCard
            icon={<FaClock className="w-6 h-6 text-cyan-600" />}
            iconBg="bg-cyan-100 dark:bg-cyan-900/30"
            title="Discipline Recovery Time (DRT)"
            subtitle="How long you take to recover discipline after a violation."
            value={drtMetric ? formatModalValue(drtMetric) : "N/A"}
            abbreviation="DRT"
            linkColor="text-cyan-600 dark:text-cyan-400"
            onViewDetails={() => setActiveDetailModal("discipline-recovery")}
            dataState={drtMetric?.data_state}
          />

          <MetricCard
            icon={<FaChartLine className="w-6 h-6 text-yellow-600" />}
            iconBg="bg-yellow-100 dark:bg-yellow-900/30"
            title="Violation Momentum Index (VMI)"
            subtitle="Are your mistakes isolated — or snowballing?"
            value={vmiMetric ? formatModalValue(vmiMetric) : "N/A"}
            abbreviation="VMI"
            linkColor="text-yellow-600 dark:text-yellow-400"
            onViewDetails={() => setActiveDetailModal("violation-momentum")}
            dataState={vmiMetric?.data_state}
          />
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <div className="flex items-center gap-2 px-2">
          <IoGrid className="w-4 h-4" />
          <div className="text-left">
            <div className="font-semibold">Session & Control</div>
          </div>
          <span className="ml-2 bg-slate-200 dark:bg-slate-700 px-2 py-0.5 rounded text-xs">
            3
          </span>
        </div>
      ),
      children: (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
          <MetricCard
            icon={<FaLock className="w-6 h-6 text-blue-600" />}
            iconBg="bg-blue-100 dark:bg-blue-900/30"
            title="Trading Permission Ratio (TPR)"
            subtitle="How often you are trusted to trade freely."
            value={tprMetric ? formatModalValue(tprMetric) : "N/A"}
            abbreviation="TPR"
            linkColor="text-blue-600 dark:text-blue-400"
            onViewDetails={() => setActiveDetailModal("trading-permission")}
            dataState={tprMetric?.data_state}
          />

          <MetricCard
            icon={<FaSuitcase className="w-6 h-6 text-green-600" />}
            iconBg="bg-green-100 dark:bg-green-900/30"
            title="Forced Inactivity Effectiveness (FIE)"
            subtitle="Did forced breaks actually save you money?"
            value={fieMetric ? formatModalValue(fieMetric) : "N/A"}
            abbreviation="FIE"
            linkColor="text-green-600 dark:text-green-400"
            onViewDetails={() => setActiveDetailModal("forced-inactivity")}
            dataState={fieMetric?.data_state}
          />

          <MetricCard
            icon={<FaUserShield className="w-6 h-6 text-red-600" />}
            iconBg="bg-red-100 dark:bg-red-900/30"
            title="Override Resistance Score"
            subtitle="How often you tried to fight the system."
            value={ovrMetric ? formatModalValue(ovrMetric) : "N/A"}
            abbreviation="Override"
            linkColor="text-red-600 dark:text-red-400"
            onViewDetails={() => setActiveDetailModal("override-resistance")}
            dataState={ovrMetric?.data_state}
          />
        </div>
      ),
    },
    {
      key: "3",
      label: (
        <div className="flex items-center gap-2 px-2">
          <MdPsychology className="w-4 h-4" />
          <div className="text-left">
            <div className="font-semibold">Psychology × Performance</div>
          </div>
          <span className="ml-2 bg-slate-200 dark:bg-slate-700 px-2 py-0.5 rounded text-xs">
            3
          </span>
        </div>
      ),
      children: (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
          <MetricCard
            icon={<FaHeart className="w-6 h-6 text-pink-600" />}
            iconBg="bg-pink-100 dark:bg-pink-900/30"
            title="Emotion Cost Index (ECI)"
            subtitle="How much each emotion costs you in real money."
            value={eciMetric ? formatModalValue(eciMetric) : "N/A"}
            abbreviation="ECI"
            linkColor="text-pink-600 dark:text-pink-400"
            onViewDetails={() => setActiveDetailModal("emotion-cost")}
            dataState={eciMetric?.data_state}
          />

          <MetricCard
            icon={<RiEmotionLine className="w-6 h-6 text-orange-600" />}
            iconBg="bg-orange-100 dark:bg-orange-900/30"
            title="Confidence Accuracy Score (CAS)"
            subtitle="Is your confidence aligned with reality?"
            value={casMetric ? formatModalValue(casMetric) : "N/A"}
            abbreviation="CAS"
            linkColor="text-orange-600 dark:text-orange-400"
            onViewDetails={() => setActiveDetailModal("confidence-accuracy")}
            dataState={casMetric?.data_state}
          />

          <MetricCard
            icon={<FaChartArea className="w-6 h-6 text-cyan-600" />}
            iconBg="bg-cyan-100 dark:bg-cyan-900/30"
            title="Discipline-Adjusted Expectancy (DAE)"
            subtitle="Your true edge after removing undisciplined trades."
            value={daeMetric ? formatModalValue(daeMetric) : "N/A"}
            abbreviation="DAE"
            linkColor="text-cyan-600 dark:text-cyan-400"
            onViewDetails={() =>
              setActiveDetailModal("discipline-adjusted-expectancy")
            }
            dataState={daeMetric?.data_state}
          />
        </div>
      ),
    },
    {
      key: "4",
      label: (
        <div className="flex items-center gap-2 px-2">
          <FaBrain className="w-4 h-4" />
          <div className="text-left">
            <div className="font-semibold">System Intelligence</div>
          </div>
          <span className="ml-2 bg-slate-200 dark:bg-slate-700 px-2 py-0.5 rounded text-xs">
            3
          </span>
        </div>
      ),
      children: (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
          <MetricCard
            icon={<IoGrid className="w-6 h-6 text-indigo-600" />}
            iconBg="bg-indigo-100 dark:bg-indigo-900/30"
            title="Strategy Maturity Index (SMI)"
            subtitle="Is your strategy real — or noise?"
            value={smiMetric ? formatModalValue(smiMetric) : "N/A"}
            abbreviation="SMI"
            linkColor="text-indigo-600 dark:text-indigo-400"
            onViewDetails={() => setActiveDetailModal("strategy-maturity")}
            dataState={smiMetric?.data_state}
          />

          <MetricCard
            icon={<FaBolt className="w-6 h-6 text-yellow-600" />}
            iconBg="bg-yellow-100 dark:bg-yellow-900/30"
            title="Discipline Dependency Ratio (DDR)"
            subtitle="How dependent your profitability is on discipline."
            value={ddrMetric ? formatModalValue(ddrMetric) : "N/A"}
            abbreviation="DDR"
            linkColor="text-yellow-600 dark:text-yellow-400"
            onViewDetails={() => setActiveDetailModal("discipline-dependency")}
            dataState={ddrMetric?.data_state}
          />

          <MetricCard
            icon={<FaShieldAlt className="w-6 h-6 text-green-600" />}
            iconBg="bg-green-100 dark:bg-green-900/30"
            title="Capital Protection Index (CPI)"
            subtitle="How well the system protects your downside."
            value={cpiMetric ? formatModalValue(cpiMetric) : "N/A"}
            abbreviation="CPI"
            linkColor="text-green-600 dark:text-green-400"
            onViewDetails={() => setActiveDetailModal("capital-protection")}
            dataState={cpiMetric?.data_state}
          />
        </div>
      ),
    },
  ];

  return (
    <>
      <Modal
        open={open}
        onCancel={onClose}
        footer={null}
        width={1200}
        centered
        className="metrics-modal"
      >
        <div className="py-4">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
              Understanding BitsOfTrade Metrics
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              12 exclusive metrics you {"won't"} find anywhere else
            </p>
          </div>

          <Tabs
            defaultActiveKey="1"
            items={tabItems}
            className="metrics-tabs"
            size="large"
          />

          <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
            <p className="text-sm text-slate-600 dark:text-slate-400 text-center">
              These metrics are exclusive to BitsOfTrade. They measure{" "}
              <span className="font-semibold text-purple-600 dark:text-purple-400">
                control
              </span>{" "}
              — not luck. Competitors can copy features — they cannot copy
              enforcement.
            </p>
          </div>
        </div>
      </Modal>

      {/* Detail Modals - Pass API data to each modal */}
      <DisciplineIntegrityModal
        open={activeDetailModal === "discipline-integrity"}
        onCancel={handleCloseDetailModal}
        metricData={disMetric}
      />
      <DisciplineRecoveryTimeModal
        open={activeDetailModal === "discipline-recovery"}
        onCancel={handleCloseDetailModal}
        metricData={drtMetric}
      />
      <ViolationMomentumModal
        open={activeDetailModal === "violation-momentum"}
        onCancel={handleCloseDetailModal}
        metricData={vmiMetric}
      />
      <TradingPermissionRatioModal
        open={activeDetailModal === "trading-permission"}
        onCancel={handleCloseDetailModal}
        metricData={tprMetric}
      />
      <ForcedInactivityModal
        open={activeDetailModal === "forced-inactivity"}
        onCancel={handleCloseDetailModal}
        metricData={fieMetric}
      />
      <OverrideResistanceModal
        open={activeDetailModal === "override-resistance"}
        onCancel={handleCloseDetailModal}
        metricData={ovrMetric}
      />
      <EmotionCostIndexModal
        open={activeDetailModal === "emotion-cost"}
        onCancel={handleCloseDetailModal}
        metricData={eciMetric}
      />
      <ConfidenceAccuracyModal
        open={activeDetailModal === "confidence-accuracy"}
        onCancel={handleCloseDetailModal}
        metricData={casMetric}
      />
      <DisciplineAdjustedExpectancyModal
        open={activeDetailModal === "discipline-adjusted-expectancy"}
        onCancel={handleCloseDetailModal}
        metricData={daeMetric}
      />
      <StrategyMaturityIndexModal
        open={activeDetailModal === "strategy-maturity"}
        onCancel={handleCloseDetailModal}
        metricData={smiMetric}
      />
      <DisciplineDependencyRatioModal
        open={activeDetailModal === "discipline-dependency"}
        onCancel={handleCloseDetailModal}
        metricData={ddrMetric}
      />
      <CapitalProtectionIndexModal
        open={activeDetailModal === "capital-protection"}
        onCancel={handleCloseDetailModal}
        metricData={cpiMetric}
      />
    </>
  );
}
