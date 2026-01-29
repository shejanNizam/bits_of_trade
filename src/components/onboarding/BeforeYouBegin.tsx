// 03

"use client";

import { useState } from "react";
import { IoMdCheckmark, IoMdClose } from "react-icons/io";
import { MdSecurity } from "react-icons/md";
import CustomPrimaryButton from "../shared/CustomPrimaryButton";

interface BeforeYouBeginProps {
  onContinue: () => void;
}

export function BeforeYouBegin({ onContinue }: BeforeYouBeginProps) {
  const [isChecked, setIsChecked] = useState(false);

  const handleContinue = () => {
    if (isChecked) {
      onContinue();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-3 sm:p-4 md:p-6 lg:p-8 bg-linear-to-br from-gray-50 via-white to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <div className="max-w-sm sm:max-w-md w-full bg-white dark:bg-gray-900 shadow-xl sm:shadow-2xl dark:shadow-gray-900/50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 border border-gray-200 dark:border-gray-800 transition-colors">
        {/* Shield Icon */}
        <div className="text-center mb-4 sm:mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-blue-600 dark:bg-blue-500 rounded-full shadow-lg dark:shadow-blue-500/20 transition-colors">
            <MdSecurity className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-6 sm:mb-8 text-gray-900 dark:text-white transition-colors">
          Before you begin
        </h2>

        {/* What we DON'T do */}
        <div className="bg-blue-50 dark:bg-blue-950/30 rounded-xl sm:rounded-2xl p-4 sm:p-5 mb-4 border border-blue-100 dark:border-blue-900/50 transition-colors">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <IoMdClose className="w-5 h-5 text-red-500 dark:text-red-400 shrink-0 mt-0.5 transition-colors" />
              <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 transition-colors">
                We do not provide buy/sell signals
              </p>
            </div>
            <div className="flex items-start gap-3">
              <IoMdClose className="w-5 h-5 text-red-500 dark:text-red-400 shrink-0 mt-0.5 transition-colors" />
              <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 transition-colors">
                We do not predict markets
              </p>
            </div>
            <div className="flex items-start gap-3">
              <IoMdClose className="w-5 h-5 text-red-500 dark:text-red-400 shrink-0 mt-0.5 transition-colors" />
              <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 transition-colors">
                We do not help you trade more
              </p>
            </div>
          </div>
        </div>

        {/* What we DO */}
        <div className="bg-blue-50 dark:bg-blue-950/30 rounded-xl sm:rounded-2xl p-4 sm:p-5 mb-6 border border-blue-100 dark:border-blue-900/50 transition-colors">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-3 transition-colors">
            What we do:
          </h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <IoMdCheckmark className="w-5 h-5 text-green-500 dark:text-green-400 shrink-0 mt-0.5 transition-colors" />
              <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 transition-colors">
                Identify discipline breakdowns
              </p>
            </div>
            <div className="flex items-start gap-3">
              <IoMdCheckmark className="w-5 h-5 text-green-500 dark:text-green-400 shrink-0 mt-0.5 transition-colors" />
              <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 transition-colors">
                Enforce rules and limits
              </p>
            </div>
            <div className="flex items-start gap-3">
              <IoMdCheckmark className="w-5 h-5 text-green-500 dark:text-green-400 shrink-0 mt-0.5 transition-colors" />
              <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 transition-colors">
                Help you trade less, but better
              </p>
            </div>
          </div>
        </div>

        {/* Checkbox */}
        <label className="flex items-start gap-3 mb-6 cursor-pointer group">
          <div className="relative shrink-0 mt-0.5">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
              className="sr-only"
            />
            <div
              className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                isChecked
                  ? "bg-blue-600 dark:bg-blue-500 border-blue-600 dark:border-blue-500"
                  : "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 group-hover:border-gray-400 dark:group-hover:border-gray-500"
              }`}
            >
              {isChecked && (
                <IoMdCheckmark className="w-3.5 h-3.5 text-white" />
              )}
            </div>
          </div>
          <span className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed transition-colors">
            I understand this is a discipline system, not a signal service
          </span>
        </label>

        {/* Next Button */}
        <CustomPrimaryButton
          onClick={handleContinue}
          disabled={!isChecked}
          className="w-full"
        >
          Continue
        </CustomPrimaryButton>
      </div>
    </div>
  );
}
