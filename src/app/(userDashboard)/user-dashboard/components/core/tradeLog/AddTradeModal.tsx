import { useImportTradeManuallyMutation } from "@/redux/features/tradelog/tradelogApi";
import { ErrorSwal, SuccessSwal } from "@/utils/allSwal";
import type { FormInstance } from "antd";
import { Form, Input, Modal, Select, Slider, Tabs } from "antd";
import { useEffect, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import type { TradeData } from "./TradeLogTable";

interface AddTradeModalProps {
  open: boolean;
  onClose: () => void;
  editData?: TradeData | null;
}

type TradeFormValues = Partial<TradeData> & {
  emotional_state?: string;
  violation_modes?: string[];
};

// 1. Define list outside to prevent re-reference issues
const VIOLATION_MODES_LIST = [
  "Standard Mode",
  "Overtrading",
  "Exited Too Late",
  "Entered Too Late",
  "Exited Too Early",
  "FOMO Entry",
  "No Clear Entry",
];

export default function AddTradeModal({
  open,
  onClose,
  editData,
}: AddTradeModalProps) {
  const [activeTab, setActiveTab] = useState("general");
  const [form] = Form.useForm<TradeFormValues>();

  const [importTradeManually, { isLoading }] = useImportTradeManuallyMutation();

  useEffect(() => {
    if (open) {
      if (editData) {
        form.setFieldsValue({
          ...editData,
          violation_modes: editData.violation_modes || [],
        });
      } else {
        form.resetFields();
      }
    }
  }, [editData, open, form]);

  // const handleFinish = (values: TradeFormValues) => {
  //   console.log("Submitted Form Values:", values);
  //   onClose();
  // };

  const handleFinish = async (values: TradeFormValues) => {
    try {
      // const payload = {
      //   market_type: values.market_type,
      //   symbol: values.symbol,
      //   entry_price: values.entry_price,
      //   quantity: values.quantity,
      //   exit_price: values.exit_price,
      //   fees: values.fees,
      //   direction: values.direction,
      //   trade_date: values.trade_date,
      //   stop_loss: values.stop_loss,
      //   target: values.target,
      //   strategy: values.strategy,
      //   // Psychology fields
      //   entry_confidence: values.entry_confidence,
      //   satisfaction_rating: values.satisfaction_rating,
      //   emotional_state: values.emotional_state,
      //   violation_modes: values.violation_modes,
      //   lessons_learned: values.lessons_learned,
      //   // If editing, include the ID
      //   ...(editData && { id: editData.id }),
      // };

      const payload = values;

      // Call the mutation
      const result = await importTradeManually(payload).unwrap();
      console.log(result);

      SuccessSwal({
        title: "",
        text: "manual import successfully!",
      });

      onClose();
    } catch (error) {
      console.error("Failed to save trade:", error);

      ErrorSwal({
        title: "",
        text: "",
      });
    }
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      width={650}
      destroyOnHidden
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
        initialValues={{
          entry_confidence: 50,
          satisfaction_rating: 50,
          violation_modes: [],
        }}
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
          name="market_type"
          label={
            <span className="text-gray-700 dark:text-gray-300 text-xs font-semibold">
              Market Type*
            </span>
          }
          rules={[{ required: true, message: "Please select a market type" }]}
          className="mb-0"
        >
          <Select
            placeholder="Select Market"
            className="w-full"
            size="large"
            options={[
              { value: "indian_stocks", label: "Indian Stocks" },
              { value: "forex", label: "Forex" },
              { value: "crypto", label: "Crypto" },
              { value: "options", label: "Options" },
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
          rules={[
            { required: true, message: "Please enter a symbol" },
            { whitespace: true, message: "Symbol cannot be empty" },
          ]}
          className="mb-0"
        >
          <Input placeholder="Symbol" size="large" />
        </Form.Item>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Form.Item
          name="entry_price"
          label={
            <span className="text-gray-700 dark:text-gray-300 text-xs font-semibold">
              Entry Price (₹)*
            </span>
          }
          rules={[{ required: true, message: "Please enter the entry price" }]}
          className="mb-0"
        >
          <Input placeholder="0.00" size="large" type="number" />
        </Form.Item>
        <Form.Item
          name="quantity"
          label={
            <span className="text-gray-700 dark:text-gray-300 text-xs font-semibold">
              Quantity*
            </span>
          }
          rules={[{ required: true, message: "Please enter the quantity" }]}
          className="mb-0"
        >
          <Input placeholder="0" size="large" type="number" />
        </Form.Item>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Form.Item
          name="exit_price"
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
          rules={[
            { required: true, message: "Please select a trade direction" },
          ]}
          className="mb-0"
        >
          <Select
            placeholder="Long/Short"
            size="large"
            options={[
              { value: "long", label: "Long" },
              { value: "short", label: "Short" },
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
          name="trade_date"
          label={
            <span className="text-gray-700 dark:text-gray-300 text-xs font-semibold">
              Entry Date*
            </span>
          }
          rules={[{ required: true, message: "Please select the entry date" }]}
          className="mb-0"
        >
          <Input type="date" size="large" />
        </Form.Item>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Form.Item
          name="stop_loss"
          label={
            <span className="text-gray-700 dark:text-gray-300 text-xs font-semibold">
              Stop Loss
            </span>
          }
          className="mb-0"
        >
          <Input placeholder="0.00" size="large" type="number" min={0} />
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
          <Input placeholder="0.00" size="large" type="number" min={0} />
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
    </div>
  );
}

function PsychologyTab({ form }: { form: FormInstance<TradeFormValues> }) {
  return (
    <div className="space-y-6 py-4">
      {/* Hidden Form.Item to capture violation_modes in form submission */}
      <Form.Item name="violation_modes" noStyle>
        <input type="hidden" />
      </Form.Item>

      <Form.Item
        name="entry_confidence"
        label={
          <span className="text-gray-700 dark:text-gray-300 text-xs font-semibold">
            Entry Confidence
          </span>
        }
      >
        <Slider marks={{ 0: "Low", 50: "Medium", 100: "High" }} />
      </Form.Item>

      <Form.Item
        name="satisfaction_rating"
        label={
          <span className="text-gray-700 dark:text-gray-300 text-xs font-semibold">
            Satisfaction Rating
          </span>
        }
      >
        <Slider marks={{ 0: "Low", 50: "Avg", 100: "High" }} />
      </Form.Item>

      <Form.Item
        name="emotional_state"
        label={
          <span className="text-gray-700 dark:text-gray-300 text-xs font-semibold">
            Emotional State
          </span>
        }
      >
        <Select
          placeholder="How did you feel?"
          size="large"
          options={[
            { value: "calm", label: "Calm" },
            { value: "anxious", label: "Anxious" },
            { value: "confident", label: "Confident" },
            { value: "fearful", label: "Fearful" },
            { value: "fomo", label: "Fomo" },
            { value: "angry", label: "Angry" },
            { value: "overconfident", label: "Overconfident" },
            { value: "uncertain", label: "Uncertain" },
          ]}
        />
      </Form.Item>

      <div>
        <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-3">
          Violation Modes (Select Multiple)
        </label>
        {/* The shouldUpdate ensures the render prop triggers when violation_modes changes */}
        <Form.Item
          noStyle
          shouldUpdate={(prev, curr) =>
            prev.violation_modes !== curr.violation_modes
          }
        >
          {({ getFieldValue, setFieldsValue }) => {
            const selectedModes = getFieldValue("violation_modes") || [];

            const toggleMode = (mode: string) => {
              const currentValues = Array.isArray(selectedModes)
                ? selectedModes
                : [];
              const nextValue = currentValues.includes(mode)
                ? currentValues.filter((m) => m !== mode)
                : [...currentValues, mode];

              setFieldsValue({ violation_modes: nextValue });
            };

            return (
              <div className="grid grid-cols-2 gap-2">
                {VIOLATION_MODES_LIST.map((mode) => {
                  const isActive = selectedModes.includes(mode);
                  return (
                    <button
                      key={mode}
                      type="button"
                      onClick={() => toggleMode(mode)}
                      className={`px-3 py-2 text-xs rounded-lg transition-all text-left border ${
                        isActive
                          ? "bg-blue-600 border-blue-600 text-white shadow-sm"
                          : "bg-gray-100 dark:bg-gray-700 border-transparent text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                      }`}
                    >
                      <span>{mode}</span>
                      {isActive && <span className="float-right">✓</span>}
                    </button>
                  );
                })}
              </div>
            );
          }}
        </Form.Item>
      </div>

      <Form.Item
        name="lessons_learned"
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
