/* eslint-disable @typescript-eslint/no-explicit-any */

import { useUpdateRulesMutation } from "@/redux/features/rules/rulesApi";
import { Switch, Tooltip, message } from "antd";
import { useState } from "react";
import { FiEdit3, FiTrash2 } from "react-icons/fi";

export interface RuleStats {
  [key: string]: string | number;
}

// RuleCard.tsx
export interface RuleCardProps {
  id?: string;
  title: string;
  type: "Hard" | "Soft";
  category: string;
  desc: string;
  stats: RuleStats;
  is_active?: boolean;
  trigger_scope?: string;
  action?: string;
  trigger_condition?: Record<string, any>;
  onEdit?: () => void;
  onDelete?: () => void;
  isSystemRule?: boolean;
}

export default function RuleCard({
  id,
  title,
  type,
  category,
  desc,
  stats,
  is_active = true,
  onEdit,
  onDelete,
  isSystemRule = false,
}: RuleCardProps) {
  const [updateRules] = useUpdateRulesMutation();
  const [active, setActive] = useState(is_active);
  const [updating, setUpdating] = useState(false);

  const handleToggleActive = async (checked: boolean) => {
    if (!id) return;

    setUpdating(true);
    try {
      await updateRules({
        id: id,
        payload: { is_active: checked },
      }).unwrap();
      setActive(checked);
      message.success(`Rule ${checked ? "enabled" : "disabled"} successfully`);
    } catch (error: any) {
      message.error(error?.data?.message || "Failed to update rule status");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div
      className={`bg-white dark:bg-primary/10 border rounded-2xl p-5 shadow-sm transition-all ${
        !active
          ? "border-gray-200 dark:border-zinc-800 opacity-60"
          : "border-slate-200 dark:border-zinc-800 hover:border-slate-300 dark:hover:border-zinc-700"
      }`}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          {/* Status Indicator Dot */}
          <div
            className={`w-2.5 h-2.5 rounded-full ${
              active
                ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"
                : "bg-gray-400"
            }`}
          />

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-bold text-lg text-slate-900 dark:text-white leading-tight">
                {title}
              </h3>
              <div className="flex gap-1.5">
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                    type === "Hard"
                      ? "bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400"
                      : "bg-yellow-50 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400"
                  }`}
                >
                  {type}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider bg-slate-100 dark:bg-zinc-800 text-slate-500 dark:text-zinc-400">
                  {category}
                </span>
                {!active && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                    Disabled
                  </span>
                )}
                {isSystemRule && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                    System Rule
                  </span>
                )}
              </div>
            </div>
            <p className="text-sm text-slate-500 dark:text-zinc-400 mt-1">
              {desc}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-1 text-slate-400">
          <Tooltip title="Edit Rule">
            <button
              onClick={onEdit}
              className="p-2 hover:bg-slate-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
            >
              <FiEdit3 size={18} />
            </button>
          </Tooltip>

          {/* Only show delete button for non-system rules */}
          {!isSystemRule && (
            <Tooltip title="Delete Rule">
              <button
                onClick={onDelete}
                className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
              >
                <FiTrash2 size={18} className="hover:text-red-500" />
              </button>
            </Tooltip>
          )}
        </div>
      </div>

      {/* Stats Grid */}
      {Object.keys(stats).length > 0 && (
        <div className="bg-slate-50 dark:bg-zinc-800/40 rounded-xl p-4 grid grid-cols-1 sm:grid-cols-2 gap-4 border border-transparent dark:border-zinc-800/50">
          {Object.entries(stats).map(([label, value]) => (
            <div key={label}>
              <p className="text-[10px] uppercase font-bold text-slate-400 dark:text-zinc-500 tracking-widest mb-1">
                {label}
              </p>
              <p className="font-mono text-sm font-semibold text-slate-700 dark:text-zinc-200">
                {value}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Active Toggle - Show for both system and custom rules */}
      {id && (
        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-zinc-800 flex items-center justify-between">
          <span className="text-xs text-slate-500 dark:text-zinc-400">
            Rule Status
          </span>
          <Switch
            checked={active}
            onChange={handleToggleActive}
            loading={updating}
            size="small"
            className={active ? "bg-green-500" : ""}
          />
        </div>
      )}
    </div>
  );
}
