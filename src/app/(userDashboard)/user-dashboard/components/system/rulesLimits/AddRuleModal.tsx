/* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import { Col, Input, Modal, Row, Select } from "antd";
// import { useEffect, useState } from "react";
// import { FiAlertTriangle } from "react-icons/fi";
// import { HiOutlinePlusSm } from "react-icons/hi";
// import { IoShieldCheckmarkOutline } from "react-icons/io5";
// import { RuleCardProps } from "./RuleCard";

// interface AddRuleModalProps {
//   open: boolean;
//   onCancel: () => void;
//   initialData?: RuleCardProps | null;
// }

// export default function AddRuleModal({
//   open,
//   onCancel,
//   initialData,
// }: AddRuleModalProps) {
//   const isEdit = !!initialData;
//   const [ruleType, setRuleType] = useState<"Hard" | "Soft">("Hard");

//   // Sync state if initialData is provided
//   useEffect(() => {
//     if (initialData?.type) {
//       setRuleType(initialData.type as "Hard" | "Soft");
//     }
//   }, [initialData]);

//   return (
//     <Modal
//       title={
//         <div className="flex items-center gap-2 pt-2">
//           <IoShieldCheckmarkOutline className="text-teal-400 text-xl" />
//           <h2 className="text-lg font-bold text-white">
//             {isEdit ? "Edit Rule" : "Add Custom Rule"}
//           </h2>
//         </div>
//       }
//       open={open}
//       onCancel={onCancel}
//       footer={null}
//       width={500}
//       centered
//       className="dark-modal"
//       closeIcon={<span className="text-gray-500">×</span>}
//     >
//       <div className="py-4 space-y-5">
//         {/* Rule Title */}
//         <div>
//           <label className="block text-xs font-semibold mb-1.5 text-zinc-300">
//             Rule Title <span className="text-red-500">*</span>
//           </label>
//           <Input
//             placeholder="e.g., Max Position Size Limit"
//             defaultValue={initialData?.title}
//             className="h-10 rounded bg-[#1a1f2e] border-[#2d3343] text-white placeholder:text-gray-600 hover:border-[#3d4455] focus:border-teal-500"
//           />
//         </div>

//         {/* Category and Rule Type */}
//         <Row gutter={16}>
//           <Col span={12}>
//             <label className="block text-xs font-semibold mb-1.5 text-zinc-300">
//               Category <span className="text-red-500">*</span>
//             </label>
//             <Select
//               placeholder="Select Category"
//               className="w-full custom-select"
//               defaultValue={initialData?.category}
//               options={[{ value: "risk", label: "Risk Management" }]}
//             />
//           </Col>
//           <Col span={12}>
//             <label className="block text-xs font-semibold mb-1.5 text-zinc-300">
//               Rule Type
//             </label>
//             <div className="flex p-1 rounded border">
//               <button
//                 onClick={() => setRuleType("Hard")}
//                 className={`flex-1 py-1.5 text-xs font-bold rounded transition-all ${
//                   ruleType === "Hard"
//                     ? "bg-[#3e2329] text-[#ff4d4f]"
//                     : "text-zinc-500 hover:text-zinc-300"
//                 }`}
//               >
//                 Hard
//               </button>
//               <button
//                 onClick={() => setRuleType("Soft")}
//                 className={`flex-1 py-1.5 text-xs font-bold rounded transition-all ${
//                   ruleType === "Soft"
//                     ? "bg-[#3a301a] text-[#ffc53d]"
//                     : "text-zinc-500 hover:text-zinc-300"
//                 }`}
//               >
//                 Soft
//               </button>
//             </div>
//           </Col>
//         </Row>

//         {/* Description */}
//         <div>
//           <label className="block text-xs font-semibold mb-1.5 text-zinc-300">
//             Description <span className="text-red-500">*</span>
//           </label>
//           <Input.TextArea
//             placeholder="What does this rule protect against?"
//             defaultValue={initialData?.desc}
//             rows={3}
//             className="rounded bg-[#1a1f2e] border-[#2d3343] text-white placeholder:text-gray-600 hover:border-[#3d4455] focus:border-teal-500"
//           />
//         </div>

//         {/* Thresholds */}
//         <div>
//           <div className="flex justify-between items-center mb-1.5">
//             <label className="text-xs font-semibold text-zinc-300">
//               Thresholds (Optional)
//             </label>
//             <button className="flex items-center gap-1 px-2 py-1 text-[10px] bg-[#1a1f2e] border border-[#2d3343] text-zinc-300 rounded hover:bg-[#2d3343]">
//               <HiOutlinePlusSm /> Add
//             </button>
//           </div>
//           <div className="flex gap-2">
//             <Input
//               placeholder="e.g., maxTrades"
//               className="flex-3 h-9 bg-[#1a1f2e] border-[#2d3343] text-white rounded"
//             />
//             <Input
//               placeholder="Value"
//               className="flex-1 h-9 bg-[#1a1f2e] border-[#2d3343] text-white rounded"
//             />
//           </div>
//           <p className="text-[10px] text-zinc-500 mt-1.5">
//             Define numeric thresholds that trigger this rule
//           </p>
//         </div>

//         {/* Dynamic Footer Alert */}
//         <div
//           className={`flex items-start gap-2 p-3 rounded border text-[11px] leading-relaxed transition-colors duration-300 ${
//             ruleType === "Hard"
//               ? "bg-red/10 text-[#ff7875]"
//               : "bg-yellow-300/10 text-[#ffd666]"
//           }`}
//         >
//           {ruleType === "Hard" ? (
//             <div className="w-3.5 h-3.5 bg-red-500 text-white rounded-full flex items-center justify-center shrink-0 text-[10px] font-bold">
//               -
//             </div>
//           ) : (
//             <FiAlertTriangle className="text-sm shrink-0" />
//           )}
//           <p>
//             {ruleType === "Hard"
//               ? "Hard rules completely block trading when triggered. Use for critical safety limits."
//               : "Soft rules show warnings and may require acknowledgment. Use for guidance limits."}
//           </p>
//         </div>

//         {/* Action Buttons */}
//         <div className="flex justify-end gap-3 pt-2">
//           <button
//             onClick={onCancel}
//             className="px-6 py-2 rounded text-sm font-semibold text-zinc-400 hover:bg-[#2d3343] transition-colors"
//           >
//             Cancel
//           </button>
//           <button className="px-6 py-2 rounded bg-[#00d1b2] hover:bg-[#00b89c] text-[#0a0f1d] font-bold text-sm flex items-center gap-2 transition-colors">
//             {isEdit ? (
//               "Update Rule"
//             ) : (
//               <>
//                 <IoShieldCheckmarkOutline className="text-lg" />
//                 Create Rule
//               </>
//             )}
//           </button>
//         </div>
//       </div>
//     </Modal>
//   );
// }

"use client";

import {
  useCreateCustomRulesMutation,
  useUpdateRulesMutation,
} from "@/redux/features/rules/rulesApi";
import { Col, Input, Modal, Row, Select, Switch, message } from "antd";
import { useEffect, useState } from "react";
import { FiAlertTriangle } from "react-icons/fi";
import { HiOutlinePlusSm } from "react-icons/hi";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import { RuleCardProps } from "./RuleCard";

interface AddRuleModalProps {
  open: boolean;
  onCancel: () => void;
  initialData?: RuleCardProps | null;
}

interface Threshold {
  key: string;
  value: string;
}

export default function AddRuleModal({
  open,
  onCancel,
  initialData,
}: AddRuleModalProps) {
  const isEdit = !!initialData;
  const [ruleType, setRuleType] = useState<"Hard" | "Soft">("Hard");
  const [ruleName, setRuleName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [thresholds, setThresholds] = useState<Threshold[]>([
    { key: "", value: "" },
  ]);
  const [triggerScope, setTriggerScope] = useState("per_day");
  const [action, setAction] = useState<"lock" | "warn" | "require_journal">(
    "lock",
  );
  const [isActive, setIsActive] = useState(true);

  const [createCustomRules, { isLoading: isCreating }] =
    useCreateCustomRulesMutation();
  const [updateRules, { isLoading: isUpdating }] = useUpdateRulesMutation();

  // Sync state if initialData is provided
  useEffect(() => {
    if (initialData) {
      setRuleName(initialData.title || "");
      setCategory(initialData.category?.toLowerCase() || "");
      setDescription(initialData.desc || "");
      setRuleType(initialData.type as "Hard" | "Soft");
      setTriggerScope(initialData.trigger_scope || "per_day");
      setAction(
        (initialData.action as "lock" | "warn" | "require_journal") || "lock",
      );
      setIsActive(
        initialData.is_active !== undefined ? initialData.is_active : true,
      );

      // Parse thresholds from trigger_condition if available
      if (
        initialData.trigger_condition &&
        Object.keys(initialData.trigger_condition).length > 0
      ) {
        const parsedThresholds = Object.entries(
          initialData.trigger_condition,
        ).map(([key, value]) => ({
          key,
          value: String(value),
        }));
        setThresholds(parsedThresholds);
      } else {
        setThresholds([{ key: "", value: "" }]);
      }
    } else {
      // Reset form
      setRuleName("");
      setCategory("");
      setDescription("");
      setRuleType("Hard");
      setTriggerScope("per_day");
      setAction("lock");
      setIsActive(true);
      setThresholds([{ key: "", value: "" }]);
    }
  }, [initialData, open]);

  // Update action based on rule type
  useEffect(() => {
    if (ruleType === "Hard") {
      setAction("lock");
    }
  }, [ruleType]);

  const handleAddThreshold = () => {
    setThresholds([...thresholds, { key: "", value: "" }]);
  };

  const handleRemoveThreshold = (index: number) => {
    const newThresholds = thresholds.filter((_, i) => i !== index);
    setThresholds(
      newThresholds.length ? newThresholds : [{ key: "", value: "" }],
    );
  };

  const handleThresholdChange = (
    index: number,
    field: keyof Threshold,
    value: string,
  ) => {
    const newThresholds = [...thresholds];
    newThresholds[index][field] = value;
    setThresholds(newThresholds);
  };

  const handleSubmit = async () => {
    // Validation
    if (!ruleName.trim()) {
      message.error("Please enter a rule title");
      return;
    }
    if (!category.trim()) {
      message.error("Please select a category");
      return;
    }
    if (!description.trim()) {
      message.error("Please enter a description");
      return;
    }

    // Build trigger_condition from thresholds
    const triggerCondition: Record<string, any> = {};
    thresholds.forEach((threshold) => {
      if (threshold.key && threshold.value) {
        // Convert value to number if it's numeric
        const numValue = parseFloat(threshold.value);
        triggerCondition[threshold.key] = isNaN(numValue)
          ? threshold.value
          : numValue;
      }
    });

    const payload = {
      rule_name: ruleName,
      description: description,
      category: category,
      rule_type: ruleType.toLowerCase(),
      trigger_scope: triggerScope,
      trigger_condition: triggerCondition,
      action: action,
      is_active: isActive,
    };

    try {
      if (isEdit && initialData?.id) {
        // Update existing rule
        await updateRules({
          id: initialData.id,
          payload,
        }).unwrap();
        message.success("Rule updated successfully!");
      } else {
        // Create new rule
        await createCustomRules(payload).unwrap();
        message.success("Rule created successfully!");
      }
      onCancel();
    } catch (error: any) {
      console.error("Failed to save rule:", error);
      message.error(
        error?.data?.message || "Failed to save rule. Please try again.",
      );
    }
  };

  // Get action options based on rule type
  const getActionOptions = () => {
    if (ruleType === "Hard") {
      return [{ value: "lock", label: "Lock Trading" }];
    } else {
      return [
        { value: "warn", label: "Show Warning" },
        { value: "require_journal", label: "Require Journal Entry" },
      ];
    }
  };

  // Get action description based on selected action
  const getActionDescription = () => {
    switch (action) {
      case "lock":
        return "Completely blocks trading when triggered.";
      case "warn":
        return "Shows a warning message but allows trading.";
      case "require_journal":
        return "Requires a journal entry before continuing trading.";
      default:
        return "";
    }
  };

  return (
    <Modal
      title={
        <div className="flex items-center gap-2 pt-2">
          <IoShieldCheckmarkOutline className="text-teal-400 text-xl" />
          <h2 className="text-lg font-bold text-white">
            {isEdit ? "Edit Rule" : "Add Custom Rule"}
          </h2>
        </div>
      }
      open={open}
      onCancel={onCancel}
      footer={null}
      width={500}
      centered
      className="dark-modal"
      closeIcon={<span className="text-gray-500">×</span>}
    >
      <div className="py-4 space-y-5">
        {/* Rule Title */}
        <div>
          <label className="block text-xs font-semibold mb-1.5 text-zinc-300">
            Rule Title <span className="text-red-500">*</span>
          </label>
          <Input
            placeholder="e.g., Max Position Size Limit"
            value={ruleName}
            onChange={(e) => setRuleName(e.target.value)}
            className="h-10 rounded bg-[#1a1f2e] border-[#2d3343] text-white placeholder:text-gray-600 hover:border-[#3d4455] focus:border-teal-500"
          />
        </div>

        {/* Category and Rule Type */}
        <Row gutter={16}>
          <Col span={12}>
            <label className="block text-xs font-semibold mb-1.5 text-zinc-300">
              Category <span className="text-red-500">*</span>
            </label>
            <Select
              placeholder="Select Category"
              className="w-full custom-select"
              value={category || undefined}
              onChange={setCategory}
              options={[
                { value: "risk", label: "Risk Management" },
                { value: "process", label: "Process" },
                { value: "psychology", label: "Psychology" },
                { value: "time", label: "Time Limits" },
              ]}
            />
          </Col>
          <Col span={12}>
            <label className="block text-xs font-semibold mb-1.5 text-zinc-300">
              Rule Type
            </label>
            <div className="flex p-1 rounded border border-[#2d3343]">
              <button
                type="button"
                onClick={() => setRuleType("Hard")}
                className={`flex-1 py-1.5 text-xs font-bold rounded transition-all ${
                  ruleType === "Hard"
                    ? "bg-[#3e2329] text-[#ff4d4f]"
                    : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                Hard
              </button>
              <button
                type="button"
                onClick={() => setRuleType("Soft")}
                className={`flex-1 py-1.5 text-xs font-bold rounded transition-all ${
                  ruleType === "Soft"
                    ? "bg-[#3a301a] text-[#ffc53d]"
                    : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                Soft
              </button>
            </div>
          </Col>
        </Row>

        {/* Trigger Scope */}
        <div>
          <label className="block text-xs font-semibold mb-1.5 text-zinc-300">
            Trigger Scope
          </label>
          <Select
            placeholder="Select Trigger Scope"
            className="w-full custom-select"
            value={triggerScope}
            onChange={setTriggerScope}
            options={[
              { value: "per_day", label: "Per Day" },
              { value: "per_trade", label: "Per Trade" },
              { value: "per_session", label: "Per Session" },
            ]}
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs font-semibold mb-1.5 text-zinc-300">
            Description <span className="text-red-500">*</span>
          </label>
          <Input.TextArea
            placeholder="What does this rule protect against?"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="rounded bg-[#1a1f2e] border-[#2d3343] text-white placeholder:text-gray-600 hover:border-[#3d4455] focus:border-teal-500"
          />
        </div>

        {/* Action */}
        <div>
          <label className="block text-xs font-semibold mb-1.5 text-zinc-300">
            Action When Triggered <span className="text-red-500">*</span>
          </label>
          <Select
            placeholder="Select Action"
            className="w-full custom-select"
            value={action}
            onChange={setAction}
            options={getActionOptions()}
            disabled={ruleType === "Hard"}
          />
          <p className="text-[10px] text-zinc-500 mt-1.5">
            {getActionDescription()}
          </p>
        </div>

        {/* Thresholds */}
        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label className="text-xs font-semibold text-zinc-300">
              Thresholds (Optional)
            </label>
            <button
              type="button"
              onClick={handleAddThreshold}
              className="flex items-center gap-1 px-2 py-1 text-[10px] bg-[#1a1f2e] border border-[#2d3343] text-zinc-300 rounded hover:bg-[#2d3343]"
            >
              <HiOutlinePlusSm /> Add
            </button>
          </div>
          <div className="space-y-2">
            {thresholds.map((threshold, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  placeholder="e.g., maxLoss, maxTrades"
                  value={threshold.key}
                  onChange={(e) =>
                    handleThresholdChange(index, "key", e.target.value)
                  }
                  className="flex-3 h-9 bg-[#1a1f2e] border-[#2d3343] text-white rounded"
                />
                <Input
                  placeholder="Value"
                  value={threshold.value}
                  onChange={(e) =>
                    handleThresholdChange(index, "value", e.target.value)
                  }
                  className="flex-1 h-9 bg-[#1a1f2e] border-[#2d3343] text-white rounded"
                />
                {thresholds.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveThreshold(index)}
                    className="px-2 text-red-500 hover:text-red-400"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
          </div>
          <p className="text-[10px] text-zinc-500 mt-1.5">
            Define numeric thresholds that trigger this rule
          </p>
        </div>

        {/* Active Status */}
        <div className="flex items-center justify-between p-3 rounded-lg bg-[#1a1f2e] border border-[#2d3343]">
          <div>
            <label className="text-xs font-semibold text-zinc-300">
              Rule Status
            </label>
            <p className="text-[10px] text-zinc-500 mt-0.5">
              {"Disabled rules won't be enforced"}
            </p>
          </div>
          <Switch
            checked={isActive}
            onChange={setIsActive}
            className={isActive ? "bg-green-500" : ""}
          />
        </div>

        {/* Dynamic Footer Alert */}
        <div
          className={`flex items-start gap-2 p-3 rounded border text-[11px] leading-relaxed transition-colors duration-300 ${
            ruleType === "Hard"
              ? "bg-red-500/10 border-red-500/20 text-[#ff7875]"
              : "bg-yellow-500/10 border-yellow-500/20 text-[#ffd666]"
          }`}
        >
          {ruleType === "Hard" ? (
            <div className="w-3.5 h-3.5 bg-red-500 text-white rounded-full flex items-center justify-center shrink-0 text-[10px] font-bold">
              !
            </div>
          ) : (
            <FiAlertTriangle className="text-sm shrink-0" />
          )}
          <p>
            {ruleType === "Hard"
              ? "Hard rules completely block trading when triggered. Use for critical safety limits."
              : "Soft rules provide warnings or require journal entries. Use for guidance and discipline."}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 rounded text-sm font-semibold text-zinc-400 hover:bg-[#2d3343] transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isCreating || isUpdating}
            className={`px-6 py-2 rounded bg-[#00d1b2] hover:bg-[#00b89c] text-[#0a0f1d] font-bold text-sm flex items-center gap-2 transition-colors ${
              isCreating || isUpdating ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <IoShieldCheckmarkOutline className="text-lg" />
            {isCreating || isUpdating
              ? isEdit
                ? "Updating..."
                : "Creating..."
              : isEdit
                ? "Update Rule"
                : "Create Rule"}
          </button>
        </div>
      </div>
    </Modal>
  );
}
