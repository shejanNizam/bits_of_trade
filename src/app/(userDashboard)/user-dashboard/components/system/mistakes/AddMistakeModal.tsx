import { Col, Input, Modal, Row } from "antd";

interface Props {
  open: boolean;
  onCancel: () => void;
}

export default function AddMistakeModal({ open, onCancel }: Props) {
  return (
    <Modal
      title={
        <div className="pt-2">
          <h2 className="text-xl font-bold dark:text-white">
            Add Custom Mistake
          </h2>
          <p className="text-sm font-normal text-slate-500">
            Define a new mistake type to track
          </p>
        </div>
      }
      open={open}
      onCancel={onCancel}
      footer={null}
      width={600}
      centered
      className="custom-modal"
    >
      <div className="py-6 space-y-6">
        <div>
          <label className="block text-sm font-bold mb-2 dark:text-zinc-300">
            Mistake Name *
          </label>
          <Input
            placeholder="e.g., Premature Exit, FOMO Entry"
            className="h-12 rounded-xl dark:bg-zinc-800 dark:border-zinc-700 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-bold mb-2 dark:text-zinc-300">
            Description *
          </label>
          <Input.TextArea
            placeholder="Brief description of this mistake..."
            rows={4}
            className="rounded-xl dark:bg-zinc-800 dark:border-zinc-700 dark:text-white"
          />
        </div>

        <Row gutter={16}>
          <Col span={12}>
            <label className="block text-sm font-bold mb-2 dark:text-zinc-300">
              Category *
            </label>
            <Input className="h-12 rounded-xl dark:bg-zinc-800 dark:border-zinc-700 dark:text-white" />
          </Col>
          <Col span={12}>
            <label className="block text-sm font-bold mb-2 dark:text-zinc-300">
              Default Severity (1-10) *
            </label>
            <Input
              defaultValue="8"
              className="h-12 rounded-xl dark:bg-zinc-800 dark:border-zinc-700 dark:text-white text-center font-bold"
            />
          </Col>
        </Row>

        <div className="flex gap-4 pt-4">
          <button
            onClick={onCancel}
            className="flex-1 h-12 rounded-xl font-bold border border-slate-200 dark:border-zinc-700 dark:text-white hover:bg-slate-50 transition-colors"
          >
            Cancel
          </button>
          <button className="flex-1 h-12 rounded-xl font-bold bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-500/20">
            Add Mistake
          </button>
        </div>
      </div>
    </Modal>
  );
}
