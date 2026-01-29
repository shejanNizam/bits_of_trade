// 02

"use client";

import { IoMdTrendingDown } from "react-icons/io";
import CustomPrimaryButton from "../shared/CustomPrimaryButton";

interface WelcomeCardProps {
  onContinue: () => void;
}

export function WelcomeCard({ onContinue }: WelcomeCardProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-3 sm:p-4 md:p-6 lg:p-8">
      <div className="max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl w-full shadow-xl sm:shadow-2xl dark:shadow-gray-900/50 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10">
        {/* App Icon */}
        <div className="text-center mb-4 sm:mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-primary dark:bg-blue-500 rounded-full shadow-lg dark:shadow-blue-500/20">
            <IoMdTrendingDown className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-white" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-center mb-3 sm:mb-4 md:mb-6 text-gray-900 dark:text-white leading-tight">
          Welcome to BitsofTrade
        </h2>

        {/* Info Box */}
        <div className="bg-blue-50 dark:bg-blue-950/30 rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6 border border-blue-100 dark:border-blue-900/50">
          <p className="text-center mb-0 mt-1 sm:mt-2 font-medium text-sm sm:text-base md:text-lg text-gray-900 dark:text-gray-100">
            “BitsofTrade is the only tool you need for your Longevity in
            Trading”
          </p>
        </div>

        {/* Description */}
        <p className="text-center mb-6 sm:mb-8 text-sm sm:text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed px-2 sm:px-0">
          It is a{" "}
          <span className="text-primary dark:text-blue-400 font-medium">
            discipline and behavior system
          </span>{" "}
          designed to help traders reduce overtrading, enforce limits, and
          understand when and why their process breaks down.
        </p>

        {/* Continue Button */}
        <CustomPrimaryButton onClick={onContinue} className="w-full">
          Continue
        </CustomPrimaryButton>
      </div>
    </div>
  );
}
