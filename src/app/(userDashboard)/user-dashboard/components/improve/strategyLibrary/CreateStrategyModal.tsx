/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useCreateStrategyMutation,
  useUpdateStrategyMutation,
} from "@/redux/features/strategy/strategyApi";
import { Strategy } from "@/types/strategy";
import {
  Button,
  Form,
  Input,
  InputNumber,
  message,
  Modal,
  Select,
  Switch,
} from "antd";
import React, { useEffect, useState } from "react";

const { TextArea } = Input;
const { Option } = Select;

interface CreateStrategyModalProps {
  open: boolean;
  onCancel: () => void;
  initialData?: Strategy | null;
  isEditMode?: boolean;
  onSuccess?: () => void;
}

const CreateStrategyModal: React.FC<CreateStrategyModalProps> = ({
  open,
  onCancel,
  initialData,
  isEditMode = false,
  onSuccess,
}) => {
  const [form] = Form.useForm();
  const [createStrategy] = useCreateStrategyMutation();
  const [updateStrategy] = useUpdateStrategyMutation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData && isEditMode) {
      form.setFieldsValue({
        strategy_name: initialData.strategy_name,
        description: initialData.description,
        tags: initialData.tags,
        market_types: initialData.market_types,
        entry_rules: initialData.entry_rules,
        exit_rules: initialData.exit_rules,
        risk_management_rules: initialData.risk_management_rules,
        trade_type: initialData.trade_type,
        is_public: initialData.is_public,
        sample_size_threshold: initialData.sample_size_threshold,
        maturity_status: initialData.maturity_status,
      });
    } else {
      form.resetFields();
      form.setFieldsValue({
        is_public: false,
        is_template: false,
        sample_size_threshold: 30,
        maturity_status: "testing",
        trade_type: "intraday",
        tags: [],
        market_types: [],
        entry_rules: [],
        exit_rules: [],
        risk_management_rules: [],
      });
    }
  }, [initialData, isEditMode, form, open]);

  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      if (isEditMode && initialData) {
        // Update existing strategy
        await updateStrategy({
          id: initialData.id,
          payload: values,
        }).unwrap();
        message.success("Strategy updated successfully");
      } else {
        // Create new strategy
        await createStrategy(values).unwrap();
        message.success("Strategy created successfully");
      }
      form.resetFields();
      // Call onSuccess before onCancel to trigger refetch
      onSuccess?.();
      onCancel();
    } catch (error: any) {
      console.error("Error:", error);
      message.error(
        error?.data?.message ||
          `Failed to ${isEditMode ? "update" : "create"} strategy`,
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title={isEditMode ? "Edit Strategy" : "Create New Strategy"}
      open={open}
      onCancel={onCancel}
      width={800}
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        className="mt-4"
      >
        <Form.Item
          name="strategy_name"
          label="Strategy Name"
          rules={[{ required: true, message: "Please enter strategy name" }]}
        >
          <Input placeholder="e.g., Opening Range Breakout" />
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: "Please enter description" }]}
        >
          <TextArea rows={3} placeholder="Describe your strategy..." />
        </Form.Item>

        <div className="grid grid-cols-2 gap-4">
          <Form.Item
            name="tags"
            label="Tags"
            rules={[{ required: true, message: "Please add at least one tag" }]}
          >
            <Select
              mode="tags"
              placeholder="Add tags (press Enter after each tag)"
              tokenSeparators={[","]}
            />
          </Form.Item>

          <Form.Item
            name="market_types"
            label="Market Types"
            rules={[{ required: true, message: "Please select market types" }]}
          >
            <Select
              mode="multiple"
              placeholder="Select market types"
              tokenSeparators={[","]}
            >
              <Option value="all">All Brokers</Option>
              <Option value="Indian Markets">Indian Markets</Option>
              <Option value="Options">Options</Option>
              <Option value="Forex">Forex</Option>
              <Option value="Commodities">Commodities</Option>
              <Option value="Crypto">Crypto</Option>
            </Select>
          </Form.Item>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Form.Item
            name="entry_rules"
            label="Entry Rules"
            rules={[{ required: true, message: "Please add entry rules" }]}
          >
            <Select
              mode="tags"
              placeholder="Add entry rules (press Enter after each rule)"
              tokenSeparators={[","]}
            />
          </Form.Item>

          <Form.Item
            name="exit_rules"
            label="Exit Rules"
            rules={[{ required: true, message: "Please add exit rules" }]}
          >
            <Select
              mode="tags"
              placeholder="Add exit rules (press Enter after each rule)"
              tokenSeparators={[","]}
            />
          </Form.Item>
        </div>

        <Form.Item
          name="risk_management_rules"
          label="Risk Management Rules"
          rules={[
            { required: true, message: "Please add risk management rules" },
          ]}
        >
          <Select
            mode="tags"
            placeholder="Add risk management rules (press Enter after each rule)"
            tokenSeparators={[","]}
          />
        </Form.Item>

        <div className="grid grid-cols-2 gap-4">
          <Form.Item
            name="trade_type"
            label="Trade Type"
            rules={[{ required: true, message: "Please select trade type" }]}
          >
            <Select>
              <Option value="intraday">Intraday</Option>
              <Option value="swing">Swing</Option>
              <Option value="positional">Positional</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="maturity_status"
            label="Maturity Status"
            rules={[
              { required: true, message: "Please select maturity status" },
            ]}
          >
            <Select>
              <Option value="testing">Testing</Option>
              <Option value="developing">Developing</Option>
              <Option value="mature">Mature</Option>
            </Select>
          </Form.Item>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <Form.Item
            name="sample_size_threshold"
            label="Sample Size Threshold"
            rules={[
              { required: true, message: "Please enter sample size threshold" },
            ]}
          >
            <InputNumber min={1} max={100} className="w-full" />
          </Form.Item>

          <Form.Item
            name="is_public"
            label="Make Community"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>
          <Form.Item
            name="is_template"
            label="Make Template"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <Button onClick={onCancel}>Cancel</Button>
          <Button type="primary" htmlType="submit" loading={loading}>
            {isEditMode ? "Update" : "Create"}
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default CreateStrategyModal;
