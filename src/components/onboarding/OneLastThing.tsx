// 05

"use client";

import { useRouter } from "next/navigation";
import { FaPlayCircle } from "react-icons/fa";
import CustomPrimaryButton from "../shared/CustomPrimaryButton";
import CustomSecondaryButton from "../shared/CustomSecondaryButton";

export function OneLastThing() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center p-3 sm:p-4 md:p-6 lg:p-8">
      <div className="max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl w-full bg-white dark:bg-gray-900 shadow-xl sm:shadow-2xl dark:shadow-gray-900/50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 border border-gray-200 dark:border-gray-800">
        {/* Icon */}
        <div className="text-center mb-4 sm:mb-6 md:mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 bg-red-500 dark:bg-red-600 rounded-full shadow-lg dark:shadow-red-500/20 transition-all">
            <FaPlayCircle className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-white" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-center mb-3 sm:mb-4 md:mb-5 lg:mb-6 text-gray-900 dark:text-white leading-tight">
          One last thing
        </h2>

        {/* Description */}
        <p className="text-center mb-6 sm:mb-7 md:mb-8 lg:mb-10 text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 dark:text-gray-300 leading-relaxed px-2 sm:px-4 md:px-6">
          Most traders {"don't"} lose money because of bad strategies. They lose
          it when{" "}
          <span className="text-blue-600 dark:text-blue-400 font-semibold">
            discipline collapses
          </span>{" "}
          under specific conditions.
        </p>

        {/* Buttons */}
        <div className="space-y-3 sm:space-y-4">
          {/* Primary Button */}
          <CustomPrimaryButton
            onClick={() => router.push("/onboarding/discipline-test")}
            className="w-full"
          >
            <span className="text-sm sm:text-base md:text-lg">
              Take the Discipline Test (2 mins)
            </span>
          </CustomPrimaryButton>

          {/* Skip Button */}

          <CustomSecondaryButton
            className="w-full"
            onClick={() => router.push("/")}
          >
            Skip for now
          </CustomSecondaryButton>
          {/* <button
            onClick={() => router.push("/")}
            className="w-full text-sm sm:text-base md:text-lg font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors duration-200 py-2 sm:py-3 active:scale-95 touch-manipulation"
          >
            Skip for now
          </button> */}
        </div>
      </div>
    </div>
  );
}
