/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useImportTradeManuallyMutation,
  useUpdateTradeManuallyMutation,
  useUploadScreenshotsMutation,
} from "@/redux/features/tradelog/tradelogApi";
import { ErrorSwal, SuccessSwal } from "@/utils/allSwal";
import { PlusOutlined } from "@ant-design/icons";
import type { FormInstance, UploadProps } from "antd";
import { Form, Image, Input, Modal, Select, Slider, Tabs, Upload } from "antd";
import type { UploadFile } from "antd/es/upload/interface";
import { useEffect, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import type { TradeData } from "./TradeLogTable";

interface AddTradeModalProps {
  open: boolean;
  onClose: () => void;
  editData?: TradeData | null;
  strategiesData?: { id: number; strategy_name: string }[] | null;
  rulesData?: {
    count: number;
    next: string | null;
    previous: string | null;
    results: RuleOption[];
  } | null;
  mistakesData?: {
    count: number;
    next: string | null;
    previous: string | null;
    results: MistakeOption[];
  } | null;
}

interface RuleOption {
  id: string;
  rule_name: string;
  is_system_rule: boolean;
}

interface MistakeOption {
  id: string;
  mistake_name: string;
}

type TradeFormValues = {
  market_type?: string;
  symbol?: string;
  entry_price?: number | null;
  quantity?: number | null;
  exit_price?: number | null;
  fees?: number | null;
  direction?: string;
  trade_date?: string;
  stop_loss?: number | null;
  target?: number | null;
  strategy?: string | null;
  outcome_summary?: string;
  trade_analysis?: string;
  entry_confidence?: number;
  satisfaction_rating?: number;
  emotional_state?: string;
  violation_modes?: string[];
  lessons_learned?: string;
  rules?: string[];
  mistakes?: string[];
};

const VIOLATION_MODES_LIST = [
  "Standard Mode",
  "Overtrading",
  "Exited Too Late",
  "Entered Too Late",
  "Exited Too Early",
  "FOMO Entry",
  "No Clear Entry",
];

// Helper function to format time in HH:MM:SS format
const formatTime = (date: Date): string => {
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
};

// Helper function to get base64 preview
const getBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

export default function AddTradeModal({
  open,
  onClose,
  editData,
  strategiesData,
  rulesData,
  mistakesData,
}: AddTradeModalProps) {
  const [activeTab, setActiveTab] = useState("general");
  const [form] = Form.useForm<TradeFormValues>();

  // Screenshot state
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  const [importTradeManually, { isLoading: isCreating }] =
    useImportTradeManuallyMutation();
  const [updateTradeManually, { isLoading: isUpdating }] =
    useUpdateTradeManuallyMutation();
  const [uploadScreenshots, { isLoading: isUploading }] =
    useUploadScreenshotsMutation();

  const isLoading = isCreating || isUpdating || isUploading;

  useEffect(() => {
    if (open) {
      if (editData) {
        form.setFieldsValue({
          market_type: editData.market_type,
          symbol: editData.symbol,
          entry_price: editData.entry_price
            ? parseFloat(editData.entry_price)
            : null,
          quantity: editData.quantity ? parseInt(editData.quantity) : null,
          exit_price: editData.exit_price
            ? parseFloat(editData.exit_price)
            : null,
          fees: editData.fees ? parseFloat(editData.fees) : null,
          direction: editData.direction,
          trade_date: editData.trade_date,
          stop_loss: editData.stop_loss ? parseFloat(editData.stop_loss) : null,
          target: editData.target ? parseFloat(editData.target) : null,
          strategy: editData.strategy,
          outcome_summary: editData.outcome_summary,
          trade_analysis: editData.trade_analysis,
          entry_confidence: editData.entry_confidence || 50,
          satisfaction_rating: editData.satisfaction_rating || 50,
          emotional_state: editData.emotional_state ?? undefined,
          violation_modes: editData.violation_modes || [],
          lessons_learned: editData.lessons_learned,
          rules: Array.isArray(editData.rules) ? editData.rules : [],
          mistakes: Array.isArray(editData.mistakes) ? editData.mistakes : [],
        });

        // Load existing screenshots if any
        if (
          editData.screenshot_urls &&
          Array.isArray(editData.screenshot_urls)
        ) {
          const existingFiles = editData.screenshot_urls.map(
            (url: string, index: number) => ({
              uid: `existing-${index}`,
              name: `screenshot-${index}.png`,
              status: "done" as const,
              url: url,
            }),
          );
          setFileList(existingFiles);
        } else {
          setFileList([]);
        }
      } else {
        form.resetFields();
        form.setFieldsValue({
          entry_confidence: 50,
          satisfaction_rating: 50,
          violation_modes: [],
          quantity: 1,
          rules: [],
          mistakes: [],
        });
        setFileList([]);
      }
    }
  }, [editData, open, form]);

  const handleFinish = async (values: TradeFormValues) => {
    try {
      let screenshotUrls: string[] = [];

      // Upload screenshots if there are new files
      const newFiles = fileList.filter((file) => file.originFileObj);
      if (newFiles.length > 0) {
        const formData = new FormData();
        newFiles.forEach((file) => {
          if (file.originFileObj) {
            formData.append("images", file.originFileObj);
          }
        });

        const uploadResponse = await uploadScreenshots(formData).unwrap();
        screenshotUrls = uploadResponse.urls;
      }

      // Get existing URLs from already uploaded files
      const existingUrls = fileList
        .filter((file) => !file.originFileObj && file.url)
        .map((file) => file.url as string);

      const allScreenshotUrls = [...existingUrls, ...screenshotUrls];

      // Format current time in HH:MM:SS format
      const currentTime = formatTime(new Date());

      const payload = {
        trade_date: values.trade_date,
        trade_time: currentTime,
        symbol: values.symbol,
        market_type: values.market_type,
        direction: values.direction,
        quantity: values.quantity?.toString() || "0",
        entry_price: values.entry_price?.toString() || "0",
        exit_price: values.exit_price?.toString() || "0",
        fees: values.fees?.toString() || "0",
        stop_loss: values.stop_loss?.toString() || null,
        target: values.target?.toString() || null,
        strategy: values.strategy,
        outcome_summary: values.outcome_summary || null,
        trade_analysis: values.trade_analysis || "",
        entry_confidence: values.entry_confidence,
        satisfaction_rating: values.satisfaction_rating,
        emotional_state: values.emotional_state,
        violation_modes: values.violation_modes || [],
        lessons_learned: values.lessons_learned,
        rules: values.rules || [],
        mistakes: values.mistakes || [],
        rules_followed: [],
        is_disciplined: values.violation_modes?.length === 0,
        is_tagged_complete: true,
        import_source: "manual",
        screenshot_urls: allScreenshotUrls,
      };

      if (editData?.id) {
        // Update existing trade
        await updateTradeManually({
          id: editData.id,
          payload,
        }).unwrap();
        SuccessSwal({
          title: "Success!",
          text: "Trade updated successfully!",
        });
      } else {
        // Create new trade
        await importTradeManually(payload).unwrap();
        SuccessSwal({
          title: "Success!",
          text: "Trade added successfully!",
        });
      }

      onClose();
    } catch (error: any) {
      console.error("Failed to save trade:", error);

      // Handle validation errors
      if (error?.data) {
        const errorMessages = Object.values(error.data).flat();
        ErrorSwal({
          title: "Error!",
          text:
            errorMessages.join(", ") ||
            "Failed to save trade. Please try again.",
        });
      } else {
        ErrorSwal({
          title: "Error!",
          text: "Failed to save trade. Please try again.",
        });
      }
    }
  };

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as File);
    }
    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const handleRemove = (file: UploadFile) => {
    setFileList(fileList.filter((item) => item.uid !== file.uid));
    return true;
  };

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

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
          quantity: 1,
          rules: [],
          mistakes: [],
        }}
      >
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          items={[
            {
              key: "general",
              label: "General",
              children: (
                <GeneralTab
                  editData={editData}
                  strategiesData={strategiesData}
                  rulesData={rulesData}
                  mistakesData={mistakesData}
                />
              ),
            },
            {
              key: "psychology",
              label: "Psychology",
              children: <PsychologyTab form={form} />,
            },
            {
              key: "screenshots",
              label: "Screenshots",
              children: (
                <ScreenshotsTab
                  fileList={fileList}
                  onPreview={handlePreview}
                  onChange={handleChange}
                  onRemove={handleRemove}
                  uploadButton={uploadButton}
                />
              ),
            },
          ]}
        />

        {/* Image Preview Modal */}
        {previewImage && (
          <Image
            alt=""
            wrapperStyle={{ display: "none" }}
            preview={{
              visible: previewOpen,
              onVisibleChange: (visible) => setPreviewOpen(visible),
              afterOpenChange: (visible) => !visible && setPreviewImage(""),
            }}
            src={previewImage}
          />
        )}

        <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-200 dark:border-gray-700 mt-4">
          <button
            type="button"
            onClick={() => {
              form.resetFields();
              form.setFieldsValue({
                entry_confidence: 50,
                satisfaction_rating: 50,
                violation_modes: [],
                quantity: 1,
                rules: [],
                mistakes: [],
              });
              setFileList([]);
            }}
            className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors text-sm font-medium"
          >
            Reset
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading
              ? editData
                ? "Updating..."
                : "Saving..."
              : editData
                ? "Update Trade"
                : "Save Trade"}
          </button>
        </div>
      </Form>
    </Modal>
  );
}

// Number Input Component with native up/down arrows
function NumberInput({
  value,
  onChange,
  min = 0,
  max,
  step = 1,
  placeholder = "0",
  integer = false,
  ...props
}: {
  value?: any;
  onChange?: (value: any) => void;
  min?: number;
  max?: number;
  step?: number;
  placeholder?: string;
  integer?: boolean;
  [key: string]: any;
}) {
  const [localValue, setLocalValue] = useState<string>(() => {
    if (value !== undefined && value !== null) {
      if (integer) {
        return Math.floor(Number(value)).toString();
      }
      return value.toString();
    }
    return "";
  });

  useEffect(() => {
    if (value !== undefined && value !== null) {
      if (integer) {
        setLocalValue(Math.floor(Number(value)).toString());
      } else {
        const numValue = Number(value);
        setLocalValue(numValue.toString());
      }
    } else {
      setLocalValue("");
    }
  }, [value, integer]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    // Allow empty string
    if (inputValue === "") {
      setLocalValue("");
      if (onChange) onChange(null);
      return;
    }

    // Validate input based on integer flag
    const regex = integer ? /^\d*$/ : /^\d*\.?\d*$/;

    if (regex.test(inputValue)) {
      setLocalValue(inputValue);

      // Convert to number if valid
      const numValue = integer
        ? parseInt(inputValue, 10)
        : parseFloat(inputValue);

      if (!isNaN(numValue)) {
        let finalValue = numValue;

        // Apply min/max constraints
        if (min !== undefined && finalValue < min) finalValue = min;
        if (max !== undefined && finalValue > max) finalValue = max;

        // Apply integer rounding
        if (integer) {
          finalValue = Math.floor(finalValue);
        }

        // Round to avoid floating point issues
        if (!integer) {
          finalValue = parseFloat(finalValue.toFixed(4));
        }

        if (onChange) onChange(finalValue);

        // Update display if value was adjusted
        const displayValue = integer
          ? Math.floor(finalValue).toString()
          : finalValue.toString();
        if (displayValue !== localValue) {
          setLocalValue(displayValue);
        }
      } else if (onChange) {
        onChange(null);
      }
    }
  };

  const handleBlur = () => {
    if (localValue === "") {
      setLocalValue("");
      if (onChange) onChange(null);
    } else {
      const numValue = integer
        ? parseInt(localValue, 10)
        : parseFloat(localValue);
      if (!isNaN(numValue)) {
        let finalValue = numValue;

        // Apply min/max constraints
        if (min !== undefined && finalValue < min) finalValue = min;
        if (max !== undefined && finalValue > max) finalValue = max;

        // Apply integer rounding
        if (integer) {
          finalValue = Math.floor(finalValue);
        }

        // Round to avoid floating point issues
        if (!integer) {
          finalValue = parseFloat(finalValue.toFixed(4));
        }

        const displayValue = integer
          ? Math.floor(finalValue).toString()
          : finalValue.toString();
        setLocalValue(displayValue);
        if (onChange) onChange(finalValue);
      }
    }
  };

  return (
    <Input
      {...props}
      type="number"
      value={localValue}
      onChange={handleChange}
      onBlur={handleBlur}
      placeholder={placeholder}
      size="large"
      min={min}
      max={max}
      step={step}
      className="[&::-webkit-inner-spin-button]:opacity-100 [&::-webkit-outer-spin-button]:opacity-100"
    />
  );
}

function GeneralTab({
  editData,
  strategiesData,
  rulesData,
  mistakesData,
}: {
  editData?: TradeData | null;
  strategiesData?: { id: number; strategy_name: string }[] | null;
  rulesData?: {
    count: number;
    next: string | null;
    previous: string | null;
    results: RuleOption[];
  } | null;
  mistakesData?: {
    count: number;
    next: string | null;
    previous: string | null;
    results: MistakeOption[];
  } | null;
}) {
  const rules = rulesData?.results || [];
  const mistakes = mistakesData?.results || [];

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
              { value: "indian_market", label: "Indian Market" },
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
          <NumberInput placeholder="0" step={1} min={0} integer={false} />
        </Form.Item>
        <Form.Item
          name="quantity"
          label={
            <span className="text-gray-700 dark:text-gray-300 text-xs font-semibold">
              Quantity*
            </span>
          }
          rules={[
            { required: true, message: "Please enter the quantity" },
            {
              validator: async (_, value) => {
                if (value && Number(value) < 1) {
                  throw new Error("Quantity must be at least 1");
                }
                if (value && !Number.isInteger(Number(value))) {
                  throw new Error("Quantity must be a whole number");
                }
              },
            },
          ]}
          className="mb-0"
        >
          <NumberInput placeholder="1" step={1} min={1} integer={true} />
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
          <NumberInput placeholder="0" step={1} min={0} integer={true} />
        </Form.Item>
        <Form.Item
          name="fees"
          label={
            <span className="text-gray-700 dark:text-gray-300 text-xs font-semibold">
              Fees (₹)
            </span>
          }
          className="mb-0"
        >
          <NumberInput placeholder="0" step={1} min={0} integer={true} />
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
        <div className="col-span-1">
          <Form.Item
            name="outcome_summary"
            label={
              <span className="text-gray-700 dark:text-gray-300 text-xs font-semibold">
                Outcome Summary
              </span>
            }
            tooltip="Categorizes the final financial or strategic result of the trade"
            className="mb-0"
          >
            <Select
              placeholder="Select outcome..."
              size="large"
              allowClear
              options={[
                { value: "target_hit", label: "Target Hit" },
                { value: "stop_loss_hit", label: "Stop Loss Hit" },
                { value: "breakeven", label: "Breakeven" },
                { value: "partial_exit", label: "Partial Exit" },
              ]}
            />
          </Form.Item>
        </div>
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
          <NumberInput placeholder="0" step={1} min={0} integer={true} />
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
          <NumberInput placeholder="0" step={1} min={0} integer={true} />
        </Form.Item>

        <Form.Item
          name="strategy"
          label={
            <span className="text-gray-700 dark:text-gray-300 text-xs font-semibold">
              Strategy
            </span>
          }
          className="mb-0"
        >
          <Select
            placeholder="Select a strategy"
            size="large"
            options={strategiesData?.map((strategy) => ({
              label: strategy.strategy_name,
              value: strategy.id,
            }))}
            showSearch
            notFoundContent="No strategies found"
            allowClear
          />
        </Form.Item>
      </div>

      {/* Rules and Mistakes Select Boxes */}
      <div className="grid grid-cols-2 gap-4">
        <Form.Item
          name="rules"
          label={
            <span className="text-gray-700 dark:text-gray-300 text-xs font-semibold">
              Rules Violated
            </span>
          }
          className="mb-0"
        >
          <Select
            placeholder="Select rules violated"
            size="large"
            // mode="multiple"
            showSearch
            optionFilterProp="children"
            allowClear
            options={rules
              .filter((rule: RuleOption) => !rule.is_system_rule)
              .map((rule: RuleOption) => ({
                label: rule.rule_name,
                value: rule.id,
              }))}
            notFoundContent="No rules available"
          />
        </Form.Item>

        <Form.Item
          name="mistakes"
          label={
            <span className="text-gray-700 dark:text-gray-300 text-xs font-semibold">
              Mistakes Made
            </span>
          }
          className="mb-0"
        >
          <Select
            placeholder="Select mistakes made"
            size="large"
            // mode="multiple"
            showSearch
            optionFilterProp="children"
            allowClear
            options={mistakes.map((mistake: MistakeOption) => ({
              label: mistake.mistake_name,
              value: mistake.id,
            }))}
            notFoundContent="No mistakes available"
          />
        </Form.Item>
      </div>

      {/* Trade Analysis Field */}
      <Form.Item
        name="trade_analysis"
        label={
          <span className="text-gray-700 dark:text-gray-300 text-xs font-semibold">
            Trade Analysis
          </span>
        }
        tooltip="Why did you take this trade? What was your analysis?"
      >
        <Input.TextArea
          placeholder="Document your technical, fundamental, or psychological rationale here..."
          rows={4}
          showCount
          maxLength={500}
        />
      </Form.Item>
    </div>
  );
}

function PsychologyTab({ form }: { form: FormInstance<TradeFormValues> }) {
  return (
    <div className="space-y-6 py-4">
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
          allowClear
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

function ScreenshotsTab({
  fileList,
  onPreview,
  onChange,
  onRemove,
  uploadButton,
}: {
  fileList: UploadFile[];
  onPreview: (file: UploadFile) => void;
  onChange: UploadProps["onChange"];
  onRemove: (file: UploadFile) => void;
  uploadButton: React.ReactNode;
}) {
  return (
    <div className="space-y-5 py-4">
      <div>
        <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-3">
          Trade Screenshots
        </label>
        <Upload
          listType="picture-card"
          fileList={fileList}
          onPreview={onPreview}
          onChange={onChange}
          onRemove={onRemove}
          beforeUpload={() => false}
          accept="image/*"
          multiple
          maxCount={8}
        >
          {fileList.length >= 8 ? null : uploadButton}
        </Upload>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
          Upload up to 8 screenshots. Supported formats: JPG, PNG, GIF
        </p>
      </div>
    </div>
  );
}
