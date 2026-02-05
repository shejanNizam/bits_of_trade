import { Col, Input, Modal, Row } from "antd";

interface AddRuleModalProps {
  open: boolean;
  onCancel: () => void;
}

export default function AddRuleModal({ open, onCancel }: AddRuleModalProps) {
  return (
    <Modal
      title={
        <div className="pt-2">
          <h2 className="text-xl font-bold dark:text-white">Add Custom Rule</h2>
          <p className="text-sm font-normal text-slate-500">
            Define a new trading rule or limit
          </p>
        </div>
      }
      open={open}
      onCancel={onCancel}
      footer={null}
      width={600}
      centered
      rootClassName="custom-modal-root"
    >
      <div className="py-6 space-y-5">
        <div>
          <label className="block text-sm font-bold mb-1.5 dark:text-zinc-300">
            Rule Name *
          </label>
          <Input
            placeholder="e.g., Max Trades Per Day"
            className="h-12 rounded-xl dark:bg-zinc-800 dark:border-zinc-700 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-bold mb-1.5 dark:text-zinc-300">
            Description *
          </label>
          <Input.TextArea
            placeholder="Brief description of what this rule protects against..."
            rows={3}
            className="rounded-xl dark:bg-zinc-800 dark:border-zinc-700 dark:text-white"
          />
        </div>

        <Row gutter={16}>
          <Col span={12}>
            <label className="block text-sm font-bold mb-1.5 dark:text-zinc-300">
              Category *
            </label>
            <Input className="h-11 rounded-xl dark:bg-zinc-800 dark:border-zinc-700 dark:text-white" />
          </Col>
          <Col span={12}>
            <label className="block text-sm font-bold mb-1.5 dark:text-zinc-300">
              Rule Type *
            </label>
            <Input className="h-11 rounded-xl dark:bg-zinc-800 dark:border-zinc-700 dark:text-white" />
          </Col>
        </Row>

        <div>
          <label className="block text-sm font-bold mb-1.5 dark:text-zinc-300">
            Trigger Condition *
          </label>
          <Input
            placeholder="e.g., maxTrades: 5 or maxLoss: ₹5000"
            className="h-12 rounded-xl dark:bg-zinc-800 dark:border-zinc-700 dark:text-white"
          />
        </div>

        <div className="flex gap-4 pt-4">
          <button
            onClick={onCancel}
            className="flex-1 h-12 rounded-xl font-bold border border-slate-200 dark:border-zinc-700 dark:text-white hover:bg-slate-50 transition-colors"
          >
            Cancel
          </button>
          <button className="flex-1 h-12 rounded-xl font-bold bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-500/20">
            Add Rule
          </button>
        </div>
      </div>
    </Modal>
  );
}
