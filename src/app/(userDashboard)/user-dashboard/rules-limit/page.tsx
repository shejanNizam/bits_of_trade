/* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import { Button } from "antd";
// import { useState } from "react";
// import { HiOutlinePlus } from "react-icons/hi";
// import { IoWarningOutline } from "react-icons/io5";
// import AddRuleModal from "../components/system/rulesLimits/AddRuleModal";
// import DeleteConfirmationModal from "../components/system/rulesLimits/DeleteConfirmationModal";
// import { RuleCardProps } from "../components/system/rulesLimits/RuleCard";
// import RulesLimitOverview from "../components/system/rulesLimits/RulesLimitOverview";
// import RulesTabs from "../components/system/rulesLimits/RulesTabs";

// export default function RulesLimitPage() {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isDeleteOpen, setIsDeleteOpen] = useState(false);
//   const [selectedRule, setSelectedRule] = useState<RuleCardProps | null>(null);

//   const handleEdit = (rule: RuleCardProps) => {
//     setSelectedRule(rule);
//     setIsModalOpen(true);
//   };

//   const handleDeleteTrigger = (rule: RuleCardProps) => {
//     setSelectedRule(rule);
//     setIsDeleteOpen(true);
//   };

//   const handleOpenAdd = () => {
//     setSelectedRule(null);
//     setIsModalOpen(true);
//   };

//   return (
//     <div className="min-h-screen transition-colors duration-300 space-y-4">
//       <div className="w-full mx-auto">
//         {/* Header */}
//         <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
//           <div>
//             <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
//               Rules & Limits
//             </h1>
//             <p className="text-slate-500 dark:text-zinc-400">
//               Protect your capital when emotions kick in.
//             </p>
//           </div>
//           <Button
//             type="primary"
//             icon={<HiOutlinePlus size={18} />}
//             onClick={handleOpenAdd}
//           >
//             Add Custom Rule
//           </Button>
//         </div>

//         {/* Warning Banner */}
//         <div className="mb-8 p-4 rounded-2xl border border-red-100 bg-red-50/50 dark:bg-red-900/10 dark:border-red-900/20 flex gap-4">
//           <IoWarningOutline className="text-red-600 shrink-0" size={24} />
//           <div>
//             <h4 className="font-bold text-red-800 dark:text-red-400 uppercase text-sm tracking-tight">
//               IMPORTANT: Rules Override Emotion
//             </h4>
//             <p className="text-red-700 dark:text-red-300/80 text-sm mt-1">
//               Disabling rules overrides your safety net. This should be a
//               deliberate action.
//             </p>
//           </div>
//         </div>

//         {/* Tab System */}
//         <RulesTabs onEdit={handleEdit} onDelete={handleDeleteTrigger} />

//         {/* Modals */}
//         <AddRuleModal
//           open={isModalOpen}
//           initialData={selectedRule}
//           onCancel={() => {
//             setIsModalOpen(false);
//             setSelectedRule(null);
//           }}
//         />

//         <DeleteConfirmationModal
//           open={isDeleteOpen}
//           title={selectedRule?.title}
//           onCancel={() => setIsDeleteOpen(false)}
//           onConfirm={() => setIsDeleteOpen(false)}
//         />
//       </div>

//       {/* overview  */}
//       <RulesLimitOverview />
//     </div>
//   );
// }

"use client";

import { useGetAllRulesQuery } from "@/redux/features/rules/rulesApi";
import { Button, Spin } from "antd";
import { useState } from "react";
import { HiOutlinePlus } from "react-icons/hi";
import { IoWarningOutline } from "react-icons/io5";
import AddRuleModal from "../components/system/rulesLimits/AddRuleModal";
import DeleteConfirmationModal from "../components/system/rulesLimits/DeleteConfirmationModal";
import { RuleCardProps } from "../components/system/rulesLimits/RuleCard";
import RulesLimitOverview from "../components/system/rulesLimits/RulesLimitOverview";
import RulesTabs from "../components/system/rulesLimits/RulesTabs";

export default function RulesLimitPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedRule, setSelectedRule] = useState<RuleCardProps | null>(null);

  const { data, isLoading, error, refetch } = useGetAllRulesQuery({
    page: 1,
    limit: 100,
  });

  // Calculate statistics from the API data
  const calculateStats = () => {
    const rules = data?.results || [];

    const activeRules = rules.filter(
      (rule: any) => rule.is_active === true,
    ).length;
    const hardRules = rules.filter(
      (rule: any) => rule.rule_type === "hard",
    ).length;
    const softRules = rules.filter(
      (rule: any) => rule.rule_type === "soft",
    ).length;
    const totalRules = rules.length;

    return {
      activeRules,
      hardRules,
      softRules,
      totalRules,
    };
  };

  const stats = calculateStats();

  const handleEdit = (rule: RuleCardProps) => {
    // Ensure the rule has all the necessary fields for editing
    setSelectedRule({
      ...rule,
      id: rule.id,
      title: rule.title,
      type: rule.type,
      category: rule.category,
      desc: rule.desc,
      trigger_condition: rule.trigger_condition,
      trigger_scope: rule.trigger_scope,
      action: rule.action,
      is_active: rule.is_active,
    });
    setIsModalOpen(true);
  };

  const handleDeleteTrigger = (rule: RuleCardProps) => {
    setSelectedRule(rule);
    setIsDeleteOpen(true);
  };

  const handleOpenAdd = () => {
    setSelectedRule(null);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedRule(null);
    // Refetch rules after modal closes to update the list
    refetch();
  };

  const handleDeleteClose = () => {
    setIsDeleteOpen(false);
    setSelectedRule(null);
    // Refetch rules after delete modal closes to update the list
    refetch();
  };

  const handleDeleteConfirm = () => {
    // This will be called after successful deletion
    console.log("Rule deleted successfully");
    // Refetch will be called in handleDeleteClose
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 text-red-500">
        Failed to load rules. Please try again.
      </div>
    );
  }

  return (
    <div className="min-h-screen transition-colors duration-300 space-y-4">
      <div className="w-full mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              Rules & Limits
            </h1>
            <p className="text-slate-500 dark:text-zinc-400">
              Protect your capital when emotions kick in.
            </p>
          </div>
          <Button
            type="primary"
            icon={<HiOutlinePlus size={18} />}
            onClick={handleOpenAdd}
            className="bg-teal-500 hover:bg-teal-600"
          >
            Add Custom Rule
          </Button>
        </div>

        {/* Warning Banner */}
        <div className="mb-8 p-4 rounded-2xl border border-red-100 bg-red-50/50 dark:bg-red-900/10 dark:border-red-900/20 flex gap-4">
          <IoWarningOutline className="text-red-600 shrink-0" size={24} />
          <div>
            <h4 className="font-bold text-red-800 dark:text-red-400 uppercase text-sm tracking-tight">
              IMPORTANT: Rules Override Emotion
            </h4>
            <p className="text-red-700 dark:text-red-300/80 text-sm mt-1">
              Disabling rules overrides your safety net. This should be a
              deliberate action.
            </p>
          </div>
        </div>

        {/* Tab System */}
        <RulesTabs onEdit={handleEdit} onDelete={handleDeleteTrigger} />

        {/* Modals */}
        <AddRuleModal
          open={isModalOpen}
          initialData={selectedRule}
          onCancel={handleModalClose}
        />

        <DeleteConfirmationModal
          open={isDeleteOpen}
          title={selectedRule?.title}
          ruleId={selectedRule?.id}
          onCancel={handleDeleteClose}
          onConfirm={handleDeleteConfirm}
        />
      </div>

      {/* overview  */}
      <RulesLimitOverview stats={stats} />
    </div>
  );
}
