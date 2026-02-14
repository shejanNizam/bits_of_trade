"use client";

import { Modal, Upload } from "antd";
import { IoCloseOutline, IoInformationCircleOutline } from "react-icons/io5";
import { MdOutlineFileUpload } from "react-icons/md";

interface ImportBrokerModalProps {
  open: boolean;
  onClose: () => void;
}

export default function ImportBrokerModal({
  open,
  onClose,
}: ImportBrokerModalProps) {
  const { Dragger } = Upload;

  const uploadProps = {
    name: "file",
    multiple: false,
    accept: ".csv",
    beforeUpload: () => false,
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      centered
      width={550}
      className="responsive-modal"
      closeIcon={
        <IoCloseOutline className="text-2xl text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors" />
      }
      title={null}
    >
      <div className="transition-colors duration-200">
        {/* Header */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Import Trades from CSV
          </h3>
        </div>

        <div className="space-y-5">
          {/* Important Notice Box */}
          <div className="bg-blue-50 dark:bg-[#151F34] border border-blue-100 dark:border-blue-900/50 rounded-lg p-4 sm:p-5">
            <div className="flex items-start gap-3">
              <IoInformationCircleOutline className="text-blue-600 dark:text-blue-400 text-2xl shrink-0 mt-0.5" />
              <div className="space-y-3">
                <h4 className="text-blue-600 dark:text-blue-400 font-bold text-sm tracking-wide">
                  Important
                </h4>
                <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                  Imported trades are raw. To generate accurate reports and
                  insights, please tag each trade with:
                </p>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 text-sm space-y-1 ml-1">
                  <li>Strategy used</li>
                  <li>Rules followed / violated</li>
                  <li>Journal context (psychology + mistakes)</li>
                </ul>
                <p className="text-gray-500 dark:text-gray-500 text-xs italic">
                  You can do this from Trade Log → Edit Trade.
                </p>
              </div>
            </div>
          </div>

          {/* Custom Dragger Section */}
          <div className="relative group dark:bg-[#151F34]">
            <Dragger {...uploadProps}>
              <div className="py-6 sm:py-8 flex flex-col items-center justify-center">
                <MdOutlineFileUpload className="text-4xl sm:text-5xl text-gray-400 dark:text-gray-500 mb-4 " />
                <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base mb-4">
                  Click to upload or drag and drop
                </p>
                <button className="bg-gray-100 dark:bg-[#151F34] border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 px-4 sm:px-6 py-2 rounded-md text-sm font-medium hover:bg-gray-200 dark:hover:bg-[#1e2a47] transition-colors">
                  Choose CSV File
                </button>
              </div>
            </Dragger>
          </div>

          {/* CSV Format Requirements Section */}
          <div className="bg-gray-50 dark:bg-[#0f172a] rounded-lg p-4 sm:p-5 space-y-3">
            <h4 className="text-gray-500 dark:text-gray-400 font-bold text-[10px] sm:text-xs uppercase tracking-wider">
              CSV Format Requirements:
            </h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                <span className="w-1.5 h-1.5 bg-gray-400 dark:bg-gray-600 rounded-full shrink-0" />
                Include headers in first row
              </li>
              <li className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                <span className="w-1.5 h-1.5 bg-gray-400 dark:bg-gray-600 rounded-full shrink-0" />
                Required: symbol, entry_price, exit_price, quantity, segment
              </li>
              <li className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                <span className="w-1.5 h-1.5 bg-gray-400 dark:bg-gray-600 rounded-full shrink-0" />
                Date format: YYYY-MM-DD HH:MM:SS
              </li>
            </ul>
            <div className="pt-2 text-center">
              <a
                href="#"
                className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-500 text-xs sm:text-sm font-medium underline underline-offset-4 "
              >
                Download Sample CSV Template
              </a>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-4 border-t border-gray-100 dark:border-gray-800">
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-8 py-2.5 bg-gray-100 dark:bg-[#151F34] text-gray-800 dark:text-white rounded-md text-sm font-semibold hover:bg-gray-200 dark:hover:bg-[#1e2a47] transition-colors order-2 sm:order-1"
            >
              Cancel
            </button>
            <button
              disabled
              className="w-full sm:w-auto px-8 py-2.5 bg-gray-200 dark:bg-gray-800 text-gray-400 dark:text-gray-500 rounded-md text-sm font-semibold cursor-not-allowed order-1 sm:order-2"
            >
              Import Trades
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
