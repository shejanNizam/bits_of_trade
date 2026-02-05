import { Col, Input, Modal, Row } from "antd";

interface CreateStrategyModalProps {
  open: boolean;
  onCancel: () => void;
}

export default function CreateStrategyModal({
  open,
  onCancel,
}: CreateStrategyModalProps) {
  return (
    <Modal
      title={
        <div className="pt-2">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white transition-colors">
            Create New Strategy
          </h2>
          <p className="text-sm font-normal text-slate-500 dark:text-zinc-400">
            Define your trading strategy framework
          </p>
        </div>
      }
      open={open}
      onCancel={onCancel}
      footer={null}
      width={600}
      centered
      rootClassName="custom-strategy-modal"
      styles={{
        mask: {
          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(4px)",
        },
        body: {
          padding: "4px 0px",
        },
      }}
    >
      <div className="py-4 space-y-5">
        <div>
          <label className="block text-sm font-semibold mb-1.5 text-slate-700 dark:text-zinc-300">
            Strategy Name *
          </label>
          <Input
            placeholder="e.g., Momentum Breakout, Trend Following"
            className="h-11 rounded-xl border-slate-200 dark:bg-primary/10 dark:border-zinc-700 dark:text-white dark:placeholder:text-zinc-500"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1.5 text-slate-700 dark:text-zinc-300">
            Description *
          </label>
          <Input.TextArea
            placeholder="Brief description of your strategy..."
            rows={3}
            className="rounded-xl border-slate-200 dark:bg-zinc-800 dark:border-zinc-700 dark:text-white dark:placeholder:text-zinc-500"
          />
        </div>

        <Row gutter={16}>
          <Col xs={24} sm={12}>
            <label className="block text-sm font-semibold mb-1.5 text-slate-700 dark:text-zinc-300">
              Market Type *
            </label>
            <Input
              placeholder="e.g., Indian Stocks"
              className="h-11 rounded-xl dark:bg-zinc-800 dark:border-zinc-700 dark:text-white"
            />
          </Col>
          <Col xs={24} sm={12} className="mt-4 sm:mt-0">
            <label className="block text-sm font-semibold mb-1.5 text-slate-700 dark:text-zinc-300">
              Target Sample Size *
            </label>
            <Input
              defaultValue="30"
              className="h-11 rounded-xl dark:bg-zinc-800 dark:border-zinc-700 dark:text-white"
            />
          </Col>
        </Row>

        <Row gutter={16}>
          <Col xs={24} sm={12}>
            <label className="block text-sm font-semibold mb-1.5 text-slate-700 dark:text-zinc-300">
              Tags (comma-separated)
            </label>
            <Input
              placeholder="e.g., breakout, volume"
              className="h-11 rounded-xl dark:bg-zinc-800 dark:border-zinc-700 dark:text-white"
            />
          </Col>
          <Col xs={24} sm={12} className="mt-4 sm:mt-0">
            <label className="block text-sm font-semibold mb-1.5 text-slate-700 dark:text-zinc-300">
              Risk:Reward Ratio
            </label>
            <Input
              placeholder="1:2.5"
              className="h-11 rounded-xl dark:bg-zinc-800 dark:border-zinc-700 dark:text-white"
            />
          </Col>
        </Row>

        <div className="flex gap-4 pt-6">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 h-12 rounded-xl font-bold border border-slate-200 text-slate-600 hover:bg-slate-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800 transition-all"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 h-12 rounded-xl font-bold bg-teal-600 text-white hover:bg-teal-700 shadow-lg shadow-teal-900/10 active:scale-[0.98] transition-all"
          >
            Create Strategy
          </button>
        </div>
      </div>
    </Modal>
  );
}
