import { Col, Input, Modal, Row } from "antd";
import { RuleCardProps } from "./RuleCard";

interface AddRuleModalProps {
  open: boolean;
  onCancel: () => void;
  initialData?: RuleCardProps | null;
}

export default function AddRuleModal({
  open,
  onCancel,
  initialData,
}: AddRuleModalProps) {
  const isEdit = !!initialData;
  return (
    <Modal
      title={
        <div className="pt-2">
          <h2 className="text-xl font-bold dark:text-white">
            {isEdit ? "Edit Rule" : "Add Custom Rule"}
          </h2>
          <p className="text-sm font-normal text-slate-500">
            Define rule parameters
          </p>
        </div>
      }
      open={open}
      onCancel={onCancel}
      footer={null}
      width={600}
      centered
    >
      <div className="py-6 space-y-5">
        <div>
          <label className="block text-sm font-bold mb-1.5 dark:text-zinc-300">
            Rule Name *
          </label>
          <Input
            defaultValue={initialData?.title}
            className="h-12 rounded-xl dark:bg-zinc-800 dark:border-zinc-700 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-bold mb-1.5 dark:text-zinc-300">
            Description *
          </label>
          <Input.TextArea
            defaultValue={initialData?.desc}
            rows={3}
            className="rounded-xl dark:bg-zinc-800 dark:border-zinc-700 dark:text-white"
          />
        </div>

        <Row gutter={16}>
          <Col span={12}>
            <label className="block text-sm font-bold mb-1.5 dark:text-zinc-300">
              Category
            </label>
            <Input
              defaultValue={initialData?.category}
              className="h-11 rounded-xl dark:bg-zinc-800 dark:border-zinc-700 dark:text-white"
            />
          </Col>
          <Col span={12}>
            <label className="block text-sm font-bold mb-1.5 dark:text-zinc-300">
              Rule Type
            </label>
            <Input
              defaultValue={initialData?.type}
              className="h-11 rounded-xl dark:bg-zinc-800 dark:border-zinc-700 dark:text-white"
            />
          </Col>
        </Row>

        <div className="flex gap-4 pt-4">
          <button
            onClick={onCancel}
            className="flex-1 h-12 rounded-xl font-bold border dark:text-white dark:border-zinc-700"
          >
            Cancel
          </button>
          <button
            className={`flex-1 h-12 rounded-xl font-bold text-white ${isEdit ? "bg-amber-600" : "bg-blue-600"}`}
          >
            {isEdit ? "Update Rule" : "Create Rule"}
          </button>
        </div>
      </div>
    </Modal>
  );
}
