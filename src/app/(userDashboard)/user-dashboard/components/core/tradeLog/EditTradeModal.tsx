"use client";

import { Input, Modal } from "antd";
import { IoCloseOutline } from "react-icons/io5";
interface TradeData {
  key: string;
  date: string;
  time: string;
  symbol: string;
  market: string;
  direction: "Long" | "Short";
  strategy: string;
  pnl: number;
  pnlPercent: number;
  flags: string[];
  review: "Reviewed" | "Unreviewed";
}

interface EditTradeModalProps {
  open: boolean;
  onClose: () => void;
  trade: TradeData | null;
}

export default function EditTradeModal({
  open,
  onClose,
  trade,
}: EditTradeModalProps) {
  if (!trade) return null;

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      width={600}
      closeIcon={<IoCloseOutline className="text-xl" />}
      title={
        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
          Edit Trade
        </h3>
      }
    >
      <div className="space-y-5 py-4">
        {/* Symbol */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Symbol
          </label>
          <Input
            defaultValue={trade.symbol}
            size="large"
            disabled
            className="bg-gray-100 dark:bg-gray-700"
          />
        </div>

        {/* Market */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Market
          </label>
          <Input
            defaultValue={trade.market}
            size="large"
            disabled
            className="bg-gray-100 dark:bg-gray-700"
          />
        </div>

        {/* Date & Time */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Date
            </label>
            <Input
              defaultValue={trade.date}
              size="large"
              disabled
              className="bg-gray-100 dark:bg-gray-700"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Time
            </label>
            <Input
              defaultValue={trade.time}
              size="large"
              disabled
              className="bg-gray-100 dark:bg-gray-700"
            />
          </div>
        </div>

        {/* Direction */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Direction
          </label>
          <Input
            defaultValue={trade.direction}
            size="large"
            disabled
            className="bg-gray-100 dark:bg-gray-700"
          />
        </div>

        {/* Strategy */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Strategy
          </label>
          <Input defaultValue={trade.strategy} size="large" />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button className="px-6 py-2 bg-green-600 dark:bg-green-500 text-white rounded-lg font-medium hover:bg-green-700 dark:hover:bg-green-600 transition-colors">
            Save Changes
          </button>
        </div>
      </div>
    </Modal>
  );
}
