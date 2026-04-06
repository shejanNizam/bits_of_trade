// /* eslint-disable @typescript-eslint/no-explicit-any */

// import { useGetAllSystemRulesQuery } from "@/redux/features/rules/rulesApi";
// import { Empty, Spin } from "antd";
// import { useState } from "react";
// import AddRuleModal from "./AddRuleModal";
// import RuleCard, { RuleCardProps } from "./RuleCard";

// // Helper function to transform system rule API response to RuleCardProps
// const transformSystemRuleToCard = (apiRule: any): RuleCardProps => {
//   // Transform trigger_condition object to stats format
//   const stats: Record<string, string | number> = {};

//   if (
//     apiRule.trigger_condition &&
//     Object.keys(apiRule.trigger_condition).length > 0
//   ) {
//     Object.entries(apiRule.trigger_condition).forEach(([key, value]) => {
//       // Format the key for display
//       const formattedKey = key
//         .replace(/([A-Z])/g, " $1")
//         .replace(/^./, (str) => str.toUpperCase());

//       // Format the value
//       let formattedValue: string | number = String(value);
//       if (typeof value === "number") {
//         if (key.toLowerCase().includes("percent")) {
//           formattedValue = `${value}%`;
//         } else if (
//           key.toLowerCase().includes("loss") ||
//           key.toLowerCase().includes("profit")
//         ) {
//           formattedValue = `₹${value.toLocaleString()}`;
//         } else {
//           formattedValue = value;
//         }
//       }

//       stats[formattedKey] = formattedValue;
//     });
//   }

//   // Add additional stats from other fields
//   if (apiRule.trigger_scope) {
//     stats["Trigger Scope"] = apiRule.trigger_scope.replace(/_/g, " ");
//   }

//   if (apiRule.action) {
//     let actionText = "";
//     switch (apiRule.action) {
//       case "lock":
//         actionText = "Lock Trading";
//         break;
//       case "warn":
//         actionText = "Show Warning";
//         break;
//       case "require_journal":
//         actionText = "Require Journal Entry";
//         break;
//       default:
//         actionText = apiRule.action;
//     }
//     stats["Action"] = actionText;
//   }

//   return {
//     id: apiRule.id,
//     title: apiRule.rule_name,
//     type: apiRule.rule_type === "hard" ? "Hard" : "Soft",
//     category:
//       apiRule.category.charAt(0).toUpperCase() + apiRule.category.slice(1),
//     desc: apiRule.description,
//     stats: stats,
//     is_active: apiRule.is_active,
//     trigger_scope: apiRule.trigger_scope,
//     action: apiRule.action,
//     trigger_condition: apiRule.trigger_condition,
//   };
// };

// export default function SystemDefaultRules() {
//   const { data, isLoading, error, refetch } = useGetAllSystemRulesQuery({});
//   const [selectedRule, setSelectedRule] = useState<RuleCardProps | null>(null);
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);

//   const handleEdit = (rule: RuleCardProps) => {
//     setSelectedRule(rule);
//     setIsEditModalOpen(true);
//   };

//   const handleModalClose = () => {
//     setIsEditModalOpen(false);
//     setSelectedRule(null);
//     refetch(); // Refresh the list after update
//   };

//   if (isLoading) {
//     return (
//       <div className="flex justify-center py-8">
//         <Spin size="large" />
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="text-center py-8 text-red-500">
//         Failed to load system rules. Please try again.
//       </div>
//     );
//   }

//   const systemRules = data?.results || [];

//   if (systemRules.length === 0) {
//     return (
//       <div className="mb-8">
//         <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
//           <span className="w-1 h-6 bg-teal-500 rounded-full"></span>
//           System Default Rules
//         </h2>
//         <Empty description="No system rules found" />
//       </div>
//     );
//   }

//   return (
//     <>
//       <div className="mb-8">
//         <div className="flex items-center justify-between mb-4">
//           <h2 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
//             <span className="w-1 h-6 bg-teal-500 rounded-full"></span>
//             System Default Rules
//             <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded-full">
//               Pre-configured
//             </span>
//           </h2>
//           <p className="text-xs text-slate-500 dark:text-zinc-400">
//             These rules come pre-configured. Edit the values to match your
//             trading style.
//           </p>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
//           {systemRules.map((rule: any) => (
//             <RuleCard
//               key={rule.id}
//               {...transformSystemRuleToCard(rule)}
//               onEdit={() => handleEdit(transformSystemRuleToCard(rule))}
//               // System rules cannot be deleted
//             />
//           ))}
//         </div>
//       </div>

//       {/* Reuse AddRuleModal for editing system rules */}
//       <AddRuleModal
//         open={isEditModalOpen}
//         initialData={selectedRule}
//         onCancel={handleModalClose}
//         isSystemRule={true}
//       />
//     </>
//   );
// }

/* eslint-disable @typescript-eslint/no-explicit-any */

import { useGetAllSystemRulesQuery } from "@/redux/features/rules/rulesApi";
import { Empty, Spin } from "antd";
import { useState } from "react";
import AddRuleModal from "./AddRuleModal";
import RuleCard, { RuleCardProps } from "./RuleCard";

// Helper function to transform system rule API response to RuleCardProps
const transformSystemRuleToCard = (apiRule: any): RuleCardProps => {
  // Transform trigger_condition object to stats format
  const stats: Record<string, string | number> = {};

  if (
    apiRule.trigger_condition &&
    Object.keys(apiRule.trigger_condition).length > 0
  ) {
    Object.entries(apiRule.trigger_condition).forEach(([key, value]) => {
      // Format the key for display
      const formattedKey = key
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (str) => str.toUpperCase());

      // Format the value
      let formattedValue: string | number = String(value);
      if (typeof value === "number") {
        if (key.toLowerCase().includes("percent")) {
          formattedValue = `${value}%`;
        } else if (
          key.toLowerCase().includes("loss") ||
          key.toLowerCase().includes("profit")
        ) {
          formattedValue = `₹${value.toLocaleString()}`;
        } else {
          formattedValue = value;
        }
      }

      stats[formattedKey] = formattedValue;
    });
  }

  // Add additional stats from other fields
  if (apiRule.trigger_scope) {
    stats["Trigger Scope"] = apiRule.trigger_scope.replace(/_/g, " ");
  }

  if (apiRule.action) {
    let actionText = "";
    switch (apiRule.action) {
      case "lock":
        actionText = "Lock Trading";
        break;
      case "warn":
        actionText = "Show Warning";
        break;
      case "require_journal":
        actionText = "Require Journal Entry";
        break;
      default:
        actionText = apiRule.action;
    }
    stats["Action"] = actionText;
  }

  return {
    id: apiRule.id,
    title: apiRule.rule_name,
    type: apiRule.rule_type === "hard" ? "Hard" : "Soft",
    category:
      apiRule.category.charAt(0).toUpperCase() + apiRule.category.slice(1),
    desc: apiRule.description,
    stats: stats,
    is_active: apiRule.is_active,
    trigger_scope: apiRule.trigger_scope,
    action: apiRule.action,
    trigger_condition: apiRule.trigger_condition,
  };
};

export default function SystemDefaultRules() {
  const { data, isLoading, error, refetch } = useGetAllSystemRulesQuery({});
  const [selectedRule, setSelectedRule] = useState<RuleCardProps | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleEdit = (rule: RuleCardProps) => {
    setSelectedRule(rule);
    setIsEditModalOpen(true);
  };

  const handleModalClose = () => {
    setIsEditModalOpen(false);
    setSelectedRule(null);
    refetch(); // Refresh the list after update
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-500">
        Failed to load system rules. Please try again.
      </div>
    );
  }

  const systemRules = data?.results || [];

  if (systemRules.length === 0) {
    return (
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
          <span className="w-1 h-6 bg-teal-500 rounded-full"></span>
          System Default Rules
        </h2>
        <Empty description="No system rules found" />
      </div>
    );
  }

  return (
    <>
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
            <span className="w-1 h-6 bg-teal-500 rounded-full"></span>
            System Default Rules
            <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded-full">
              Pre-configured
            </span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-zinc-400">
            These rules come pre-configured. Edit the values to match your
            trading style.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {systemRules.map((rule: any) => (
            <RuleCard
              key={rule.id}
              {...transformSystemRuleToCard(rule)}
              onEdit={() => handleEdit(transformSystemRuleToCard(rule))}
              isSystemRule={true} // Pass this flag to hide delete button and show system badge
            />
          ))}
        </div>
      </div>

      {/* Reuse AddRuleModal for editing system rules */}
      <AddRuleModal
        open={isEditModalOpen}
        initialData={selectedRule}
        onCancel={handleModalClose}
        isSystemRule={true}
      />
    </>
  );
}
