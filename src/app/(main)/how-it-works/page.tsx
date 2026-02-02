import ActuallyDoesForWorks from "@/components/howItWorks/ActuallyDoesForWorks";
import LearnMoreAbout from "@/components/howItWorks/LearnMoreAbout";
import WhatItIsOrNot from "@/components/howItWorks/WhatItIsOrNot";
import CustomBanner from "@/components/shared/CustomBanner";

export default function HowItWorks() {
  return (
    <>
      {/* banner section */}
      <CustomBanner
        title="How BitsOfTrade Works"
        subtitle="BitsOfTrade is a discipline and learning system that operates around your trading — not inside your broker."
      >
        {/* Mobile: Stacked vertically */}
        <div className="flex flex-col items-center gap-2 md:hidden">
          <span className="px-4 py-1.5 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-xs text-gray-600 dark:text-gray-400">
            No signals
          </span>
          <span className="px-4 py-1.5 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-xs text-gray-600 dark:text-gray-400">
            No predictions
          </span>
          <span className="px-4 py-1.5 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-xs text-gray-600 dark:text-gray-400">
            No broker integration required
          </span>
        </div>

        {/* Desktop: Single pill with dots */}
        <div className="hidden md:inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-600 dark:text-gray-400">
          <span>No signals</span>
          <span className="w-1 h-1 rounded-full bg-gray-400 dark:bg-gray-600"></span>
          <span>No predictions</span>
          <span className="w-1 h-1 rounded-full bg-gray-400 dark:bg-gray-600"></span>
          <span>No broker integration required</span>
        </div>
      </CustomBanner>

      {/* Actually Does For Works Section */}
      <ActuallyDoesForWorks />

      {/* What it is or not  */}
      <WhatItIsOrNot />

      {/* learning more about */}
      <LearnMoreAbout />
    </>
  );
}
