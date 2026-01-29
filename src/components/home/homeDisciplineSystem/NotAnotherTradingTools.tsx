// import CustomHeading from "@/components/shared/CustomHeading";
// import { ReactNode } from "react";
// import {
//   IoCheckmarkCircle,
//   IoCloseCircle,
//   IoStatsChart,
// } from "react-icons/io5";

// interface FeatureCardProps {
//   icon: ReactNode;
//   title: string;
//   iconBgColor: string;
//   bulletColor?: string;
//   children: ReactNode;
// }

// interface FeatureListProps {
//   items: string[];
//   bulletColor: string;
//   subtitle?: string;
// }

// function FeatureCard({ icon, title, iconBgColor, children }: FeatureCardProps) {
//   return (
//     <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 shadow-sm transition-all duration-300 hover:shadow-xl hover:scale-[1.02] cursor-pointer group">
//       <div className="flex items-center gap-3 mb-6">
//         <div
//           className={`w-12 h-12 rounded-xl ${iconBgColor} flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}
//         >
//           {icon}
//         </div>
//         <h3 className="text-xl font-semibold text-gray-900 dark:text-white transition-colors duration-300">
//           {title}
//         </h3>
//       </div>
//       {children}
//     </div>
//   );
// }

// function FeatureList({ items, bulletColor, subtitle }: FeatureListProps) {
//   return (
//     <>
//       {subtitle && (
//         <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">
//           {subtitle}
//         </p>
//       )}
//       <ul className="space-y-3">
//         {items.map((item, index) => (
//           <li
//             key={index}
//             className="flex items-start gap-3 text-gray-700 dark:text-gray-300"
//           >
//             <span
//               className={`w-1.5 h-1.5 rounded-full ${bulletColor} mt-2 shrink-0`}
//             ></span>
//             <span>{item}</span>
//           </li>
//         ))}
//       </ul>
//     </>
//   );
// }

// export default function NotAnotherTradingTools() {
//   const ObservesIcon: ReactNode = (
//     <IoStatsChart className="w-6 h-6 text-white" />
//   );
//   const DoesIcon: ReactNode = (
//     <IoCheckmarkCircle className="w-6 h-6 text-white" />
//   );
//   const DoesNotIcon: ReactNode = (
//     <IoCloseCircle className="w-6 h-6 text-white" />
//   );

//   const observesItems: string[] = [
//     "Trade frequency spikes",
//     "Consecutive loss escalation",
//     "Session duration creep",
//     "Rule overrides after wins",
//   ];

//   const doesNotItems: string[] = [
//     "It does not give advice",
//     "It does not predict outcomes",
//   ];

//   return (
//     <div className="py-16 px-4 bg-white dark:bg-gray-900 transition-colors">
//       <div className="max-w-7xl mx-auto">
//         <div className="text-center mb-16">
//           <CustomHeading>
//             A discipline system not another trading tool
//           </CustomHeading>
//           <p className="text-base md:text-lg text-gray-600 dark:text-gray-400">
//             Most platforms optimize for activity. BitsOfTrade is designed to
//             reduce it.
//           </p>
//         </div>

//         <div className="grid md:grid-cols-3 gap-6">
//           {/* What it observes Card */}
//           <FeatureCard
//             icon={ObservesIcon}
//             title="What it observes"
//             iconBgColor="bg-purple-500"
//           >
//             <FeatureList
//               subtitle="Discipline Guard monitors:"
//               items={observesItems}
//               bulletColor="bg-purple-500"
//             />
//           </FeatureCard>

//           {/* What it does Card */}
//           <FeatureCard
//             icon={DoesIcon}
//             title="What it does"
//             iconBgColor="bg-emerald-500"
//           >
//             <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
//               When behavioral risk increases, the system prompts reflection and
//               recommends slowing down or stopping.
//             </p>
//           </FeatureCard>

//           {/* What it does NOT do Card */}
//           <FeatureCard
//             icon={DoesNotIcon}
//             title="What it does NOT do"
//             iconBgColor="bg-gray-400 dark:bg-gray-600"
//           >
//             <FeatureList
//               items={doesNotItems}
//               bulletColor="bg-gray-400 dark:bg-gray-500"
//             />
//           </FeatureCard>
//         </div>
//       </div>

//       <h3 className="text-center text-black dark:text-white">
//         Replaca with dashboard video
//       </h3>
//     </div>
//   );
// }

export default function NotAnotherTradingTools() {
  return (
    <div>
      <h3 className=" font-bold text-4xl text-center text-black dark:text-white py-20">
        Replace with dashboard video
      </h3>
    </div>
  );
}
