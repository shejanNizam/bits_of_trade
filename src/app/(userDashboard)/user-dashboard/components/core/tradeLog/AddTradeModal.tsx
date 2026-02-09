"use client";

import type { FormInstance } from "antd";
import { Form, Input, Modal, Select, Slider, Tabs } from "antd";
import { useEffect, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { MdCloudUpload } from "react-icons/md";
import type { TradeData } from "./TradeLogTable";

interface AddTradeModalProps {
  open: boolean;
  onClose: () => void;
  editData?: TradeData | null;
}

// Define form values type to match your TradeData structure
type TradeFormValues = Partial<TradeData> & {
  emotions?: string[];
  violationMode?: string;
};

export default function AddTradeModal({
  open,
  onClose,
  editData,
}: AddTradeModalProps) {
  const [activeTab, setActiveTab] = useState("general");
  const [form] = Form.useForm<TradeFormValues>();

  // Sync form whenever editData changes or modal opens
  useEffect(() => {
    if (open) {
      if (editData) {
        // Map table data to form fields
        form.setFieldsValue({
          ...editData,
          // Ensure arrays or specific fields are formatted if needed
        });
      } else {
        form.resetFields();
      }
    }
  }, [editData, open, form]);

  const handleFinish = (values: TradeFormValues) => {
    console.log("Submitted Form Values:", values);
    // Here you would call your API for either update (if editData exists) or create
    onClose();
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      width={650}
      destroyOnClose
      closeIcon={
        <IoCloseOutline className="text-xl text-gray-500 hover:text-gray-700 dark:text-gray-400" />
      }
      title={
        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
          {editData ? "Edit Trade" : "Add New Trade"}
        </h3>
      }
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        preserve={true}
        initialValues={{ entryConfidence: 50, satisfaction: 50 }}
      >
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          items={[
            {
              key: "general",
              label: "General",
              children: <GeneralTab editData={editData} />,
            },
            {
              key: "psychology",
              label: "Psychology",
              children: <PsychologyTab form={form} />,
            },
          ]}
        />

        {/* Unified Footer Buttons */}
        <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-200 dark:border-gray-700 mt-4">
          <button
            type="button"
            onClick={() => form.resetFields()}
            className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors text-sm font-medium"
          >
            Reset
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors text-sm"
          >
            {editData ? "Update Trade" : "Save Trade"}
          </button>
        </div>
      </Form>
    </Modal>
  );
}

function GeneralTab({ editData }: { editData?: TradeData | null }) {
  return (
    <div className="space-y-5 py-4">
      <div className="grid grid-cols-2 gap-4">
        <Form.Item
          name="market"
          label={
            <span className="text-gray-700 dark:text-gray-300 text-xs font-semibold">
              Market Type*
            </span>
          }
          className="mb-0"
        >
          <Select
            placeholder="Select Market"
            className="w-full"
            size="large"
            options={[
              { value: "Indian Stocks", label: "Indian Stocks" },
              { value: "Forex", label: "Forex" },
              { value: "Crypto", label: "Crypto" },
            ]}
          />
        </Form.Item>
        <Form.Item
          name="symbol"
          label={
            <span className="text-gray-700 dark:text-gray-300 text-xs font-semibold">
              Symbol*
            </span>
          }
          className="mb-0"
        >
          <Input placeholder="Symbol" size="large" />
        </Form.Item>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Form.Item
          name="entry"
          label={
            <span className="text-gray-700 dark:text-gray-300 text-xs font-semibold">
              Entry Price (₹)*
            </span>
          }
          className="mb-0"
        >
          <Input placeholder="0.00" size="large" type="numb er" />
        </Form.Item>
        <Form.Item
          name="title"
          label={
            <span className="text-gray-700 dark:text-gray-300 text-xs font-semibold">
              Title*
            </span>
          }
          className="mb-0"
        >
          <Input placeholder="e.g. Lot 1" size="large" />
        </Form.Item>
        <Form.Item
          name="qty"
          label={
            <span className="text-gray-700 dark:text-gray-300 text-xs font-semibold">
              Quantity*
            </span>
          }
          className="mb-0"
        >
          <Input placeholder="0" size="large" type="number" />
        </Form.Item>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Form.Item
          name="exit"
          label={
            <span className="text-gray-700 dark:text-gray-300 text-xs font-semibold">
              Exit Price*
            </span>
          }
          className="mb-0"
        >
          <Input placeholder="0.00" size="large" type="number" />
        </Form.Item>
        <Form.Item
          name="fees"
          label={
            <span className="text-gray-700 dark:text-gray-300 text-xs font-semibold">
              Fees (₹)*
            </span>
          }
          className="mb-0"
        >
          <Input placeholder="0.00" size="large" type="number" />
        </Form.Item>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Form.Item
          name="direction"
          label={
            <span className="text-gray-700 dark:text-gray-300 text-xs font-semibold">
              Direction*
            </span>
          }
          className="mb-0"
        >
          <Select
            placeholder="Long/Short"
            size="large"
            options={[
              { value: "Long", label: "Long" },
              { value: "Short", label: "Short" },
            ]}
          />
        </Form.Item>
        <Form.Item
          name="pnl"
          label={
            <span className="text-gray-700 dark:text-gray-300 text-xs font-semibold">
              Total P&L (₹)
            </span>
          }
          className="mb-0"
        >
          <Input
            placeholder="Auto calculated"
            size="large"
            disabled={!editData}
          />
        </Form.Item>
        <Form.Item
          name="date"
          label={
            <span className="text-gray-700 dark:text-gray-300 text-xs font-semibold">
              Entry Date*
            </span>
          }
          className="mb-0"
        >
          <Input type="date" size="large" />
        </Form.Item>
      </div>

      <Form.Item
        name="leverage"
        label={
          <span className="text-gray-700 dark:text-gray-300 text-xs font-semibold">
            Leverage
          </span>
        }
        className="mb-0"
      >
        <Input placeholder="1x" size="large" />
      </Form.Item>

      <div className="grid grid-cols-3 gap-4">
        <Form.Item
          name="sl"
          label={
            <span className="text-gray-700 dark:text-gray-300 text-xs font-semibold">
              Stop Loss
            </span>
          }
          className="mb-0"
        >
          <Input placeholder="0.00" size="large" type="number" />
        </Form.Item>
        <Form.Item
          name="target"
          label={
            <span className="text-gray-700 dark:text-gray-300 text-xs font-semibold">
              Target
            </span>
          }
          className="mb-0"
        >
          <Input placeholder="0.00" size="large" type="number" />
        </Form.Item>
        <Form.Item
          name="strategy"
          label={
            <span className="text-gray-700 dark:text-gray-300 text-xs font-semibold">
              Strategy*
            </span>
          }
          className="mb-0"
        >
          <Input placeholder="Strategy" size="large" />
        </Form.Item>
      </div>

      <Form.Item
        name="analysis"
        label={
          <span className="text-gray-700 dark:text-gray-300 text-xs font-semibold">
            Trade Analysis
          </span>
        }
        className="mb-0"
      >
        <Input.TextArea placeholder="Why did you take this trade?" rows={3} />
      </Form.Item>

      <Form.Item
        name="rules"
        label={
          <span className="text-gray-700 dark:text-gray-300 text-xs font-semibold">
            Rules Followed
          </span>
        }
        className="mb-0"
      >
        <Select mode="multiple" placeholder="Select rules..." size="large" />
      </Form.Item>

      <div>
        <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Screenshots
        </label>
        <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center hover:border-blue-500 transition-colors cursor-pointer">
          <MdCloudUpload className="text-3xl text-gray-400 mx-auto mb-2" />
          <p className="text-xs text-gray-500">
            Click or drag to upload (Max 10MB)
          </p>
        </div>
      </div>
    </div>
  );
}

function PsychologyTab({ form }: { form: FormInstance<TradeFormValues> }) {
  const violationModes = [
    "Standard Mode",
    "Overtrading",
    "Exited Too Late",
    "Entered Too Late",
    "Exited Too Early",
    "FOMO Entry",
    "No Clear Entry",
  ];

  return (
    <div className="space-y-6 py-4">
      <Form.Item
        name="entryConfidence"
        label={
          <span className="text-gray-700 dark:text-gray-300 text-xs font-semibold">
            Entry Confidence
          </span>
        }
      >
        <Slider marks={{ 0: "Low", 50: "Medium", 100: "High" }} />
      </Form.Item>

      <Form.Item
        name="satisfaction"
        label={
          <span className="text-gray-700 dark:text-gray-300 text-xs font-semibold">
            Satisfaction Rating
          </span>
        }
      >
        <Slider marks={{ 0: "Low", 50: "Avg", 100: "High" }} />
      </Form.Item>

      <Form.Item
        name="emotions"
        label={
          <span className="text-gray-700 dark:text-gray-300 text-xs font-semibold">
            Emotional State
          </span>
        }
      >
        <Select
          mode="multiple"
          placeholder="How did you feel?"
          size="large"
          options={[
            { value: "calm", label: "Calm" },
            { value: "anxious", label: "Anxious" },
            { value: "confident", label: "Confident" },
            { value: "fearful", label: "Fearful" },
          ]}
        />
      </Form.Item>

      <div>
        <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-3">
          Violation Modes
        </label>
        <div className="grid grid-cols-2 gap-2">
          {violationModes.map((mode) => (
            <button
              key={mode}
              type="button"
              onClick={() => form.setFieldsValue({ violationMode: mode })}
              className="px-3 py-2 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-left focus:ring-2 focus:ring-blue-500"
            >
              {mode}
            </button>
          ))}
        </div>
        <Form.Item name="violationMode" noStyle>
          <Input type="hidden" />
        </Form.Item>
      </div>

      <Form.Item
        name="psychology"
        label={
          <span className="text-gray-700 dark:text-gray-300 text-xs font-semibold">
            Lessons Learned
          </span>
        }
      >
        <Input.TextArea placeholder="Notes on psychology..." rows={4} />
      </Form.Item>
    </div>
  );
}
