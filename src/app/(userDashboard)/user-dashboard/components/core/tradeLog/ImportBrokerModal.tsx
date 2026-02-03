"use client";

import { Modal, Upload } from "antd";
import { IoCloseOutline } from "react-icons/io5";
import { MdCloudUpload } from "react-icons/md";
import { SiZerodha } from "react-icons/si";

interface ImportBrokerModalProps {
  open: boolean;
  onClose: () => void;
}

export default function ImportBrokerModal({
  open,
  onClose,
}: ImportBrokerModalProps) {
  const brokers = [
    { name: "Upstox", color: "bg-purple-500", icon: "U" },
    { name: "Dhan", color: "bg-green-500", icon: "D" },
    { name: "Angel One", color: "bg-orange-500", icon: "A" },
    { name: "Kite", color: "bg-blue-500", icon: <SiZerodha /> },
    { name: "Fyers", color: "bg-blue-600", icon: "F" },
  ];

  const { Dragger } = Upload;

  const uploadProps = {
    name: "file",
    multiple: false,
    accept: ".csv,.xlsx,.xls",
    beforeUpload: () => false,
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      width={600}
      closeIcon={<IoCloseOutline className="text-xl" />}
      title={
        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
          Import Broker Trades
        </h3>
      }
    >
      <div className="space-y-6">
        {/* Broker Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            Select Broker
          </label>
          <div className="grid grid-cols-4 gap-3">
            {brokers.map((broker) => (
              <button
                key={broker.name}
                className="flex flex-col items-center gap-2 p-3 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors group"
              >
                <div
                  className={`w-12 h-12 ${broker.color} rounded-full flex items-center justify-center text-white font-bold text-lg`}
                >
                  {broker.icon}
                </div>
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                  {broker.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* File Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            Upload File
          </label>
          <Dragger {...uploadProps}>
            <p className="ant-upload-drag-icon mb-3">
              <MdCloudUpload className="text-4xl text-gray-400 dark:text-gray-500 mx-auto" />
            </p>
            <p className="ant-upload-text text-sm font-medium text-gray-900 dark:text-gray-100">
              Click to browse or drag & drop
            </p>
            <p className="ant-upload-hint text-xs text-gray-500 dark:text-gray-400 mt-1">
              Accepted formats: .csv, .xls, or .xlsx
            </p>
          </Dragger>
          <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-3">
            Max size by file (usually varies with size) {"don't"} worry{" "}
            {"you'll"} get your trades
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button className="px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors">
            Import Trades
          </button>
        </div>
      </div>
    </Modal>
  );
}
