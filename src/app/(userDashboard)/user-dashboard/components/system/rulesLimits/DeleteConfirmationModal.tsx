/* eslint-disable @typescript-eslint/no-explicit-any */
// import { Modal } from "antd";
// import { FiTrash2 } from "react-icons/fi";

// interface DeleteConfirmationModalProps {
//   open: boolean;
//   onCancel: () => void;
//   onConfirm: () => void;
//   title?: string;
// }

// export default function DeleteConfirmationModal({
//   open,
//   onCancel,
//   onConfirm,
//   title,
// }: DeleteConfirmationModalProps) {
//   return (
//     <Modal
//       open={open}
//       onCancel={onCancel}
//       footer={null}
//       centered
//       width={400}
//       closable={false}
//     >
//       <div className="py-4 text-center">
//         <div className="mx-auto flex items-center justify-center h-14 w-14 rounded-full bg-red-100 dark:bg-red-900/20 mb-4">
//           <FiTrash2 className="text-red-600" size={28} />
//         </div>
//         <h3 className="text-xl font-bold dark:text-white">
//           Delete {title || "Rule"}?
//         </h3>
//         <p className="text-slate-500 dark:text-zinc-400 mt-2 px-4">
//           This action cannot be undone.
//         </p>
//         <div className="flex gap-3 mt-8">
//           <button
//             onClick={onCancel}
//             className="flex-1 h-11 rounded-xl font-semibold border dark:text-white dark:border-zinc-700"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={onConfirm}
//             className="flex-1 h-11 rounded-xl font-semibold bg-red-600 text-white"
//           >
//             Delete
//           </button>
//         </div>
//       </div>
//     </Modal>
//   );
// }

import { useDeleteRulesMutation } from "@/redux/features/rules/rulesApi";
import { Modal, message } from "antd";
import { FiTrash2 } from "react-icons/fi";

interface DeleteConfirmationModalProps {
  open: boolean;
  onCancel: () => void;
  onConfirm?: () => void;
  title?: string;
  ruleId?: string;
}

export default function DeleteConfirmationModal({
  open,
  onCancel,
  onConfirm,
  title,
  ruleId,
}: DeleteConfirmationModalProps) {
  const [deleteRules, { isLoading }] = useDeleteRulesMutation();

  const handleDelete = async () => {
    if (!ruleId) {
      message.error("Rule ID not found");
      return;
    }

    try {
      await deleteRules(ruleId).unwrap();
      message.success("Rule deleted successfully!");
      if (onConfirm) {
        onConfirm();
      }
      onCancel();
    } catch (error: any) {
      console.error("Failed to delete rule:", error);
      message.error(
        error?.data?.message || "Failed to delete rule. Please try again.",
      );
    }
  };

  return (
    <Modal
      open={open}
      onCancel={onCancel}
      footer={null}
      centered
      width={400}
      closable={false}
    >
      <div className="py-4 text-center">
        <div className="mx-auto flex items-center justify-center h-14 w-14 rounded-full bg-red-100 dark:bg-red-900/20 mb-4">
          <FiTrash2 className="text-red-600" size={28} />
        </div>
        <h3 className="text-xl font-bold dark:text-white">
          Delete {title || "Rule"}?
        </h3>
        <p className="text-slate-500 dark:text-zinc-400 mt-2 px-4">
          This action cannot be undone.
        </p>
        <div className="flex gap-3 mt-8">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 h-11 rounded-xl font-semibold border dark:text-white dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleDelete}
            disabled={isLoading}
            className={`flex-1 h-11 rounded-xl font-semibold bg-red-600 text-white hover:bg-red-700 transition-colors ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </Modal>
  );
}
