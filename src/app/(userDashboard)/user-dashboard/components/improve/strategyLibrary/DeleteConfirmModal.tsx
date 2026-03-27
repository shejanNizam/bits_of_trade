import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Button, Modal } from "antd";
import React from "react";

interface DeleteConfirmModalProps {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  strategyName?: string;
}

const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  open,
  onCancel,
  onConfirm,
  strategyName,
}) => {
  return (
    <Modal
      title={
        <div className="flex items-center gap-2">
          <ExclamationCircleOutlined className="text-red-500" />
          <span>Delete Strategy</span>
        </div>
      }
      open={open}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="delete" type="primary" danger onClick={onConfirm}>
          Delete
        </Button>,
      ]}
    >
      <p>Are you sure you want to delete {strategyName || "this strategy"}?</p>
      <p className="text-sm text-gray-500 mt-2">
        This action cannot be undone.
      </p>
    </Modal>
  );
};

export default DeleteConfirmModal;
