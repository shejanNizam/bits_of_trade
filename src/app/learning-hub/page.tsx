import LearningEverything from "@/components/learningHub/LearningEverything";
import WhatActuallyGain from "@/components/learningHub/WhatActuallyGain";
import WhyDifferent from "@/components/learningHub/WhyDifferent";
import CustomBanner from "@/components/shared/CustomBanner";
import CustomPrimaryButton from "@/components/shared/CustomPrimaryButton";

import Link from "next/link";
import { BsBook, BsShield } from "react-icons/bs";
import { FiTrendingUp } from "react-icons/fi";

interface LearningFeature {
  id: number;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  iconBgColor: string;
  iconColor: string;
}

export default function LearningHub() {
  const learningFeatures: LearningFeature[] = [
    {
      id: 1,
      icon: BsShield,
      title: "Risk-first education",
      description:
        "Every concept is taught through the lens of capital protection, drawdown control, and execution discipline.",
      iconBgColor: "bg-blue-100 dark:bg-blue-900/30",
      iconColor: "text-blue-600 dark:text-blue-400",
    },
    {
      id: 2,
      icon: FiTrendingUp,
      title: "Market Logic over Setups",
      description:
        "We don't teach 'strategies' to copy. We teach how to read institutional order flow, structure, and price action logic.",
      iconBgColor: "bg-emerald-100 dark:bg-emerald-900/30",
      iconColor: "text-emerald-600 dark:text-emerald-400",
    },
    {
      id: 3,
      icon: BsBook,
      title: "Built to support your process",
      description:
        "Learning integrates directly with your journal, discipline rules, and performance insights.",
      iconBgColor: "bg-purple-100 dark:bg-purple-900/30",
      iconColor: "text-purple-600 dark:text-purple-400",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <CustomBanner
        badge="Learning Hub"
        title="Learn trading the way professionals do"
        subtitle="Risk, execution, and behavioral control."
      />

      <div className="container mx-auto max-w-7xl px-2">
        {/* ==================== LEARNING FEATURES ==================== */}
        <div className="py-12">
          <div className="grid md:grid-cols-3 gap-6">
            {learningFeatures.map((feature) => (
              <div
                key={feature.id}
                className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:scale-[1.02] cursor-pointer group"
              >
                {/* Icon */}
                <div
                  className={`w-12 h-12 rounded-xl ${feature.iconBgColor} flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110`}
                >
                  <feature.icon
                    className={`w-6 h-6 ${feature.iconColor} transition-colors`}
                  />
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 transition-colors">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed transition-colors">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <LearningEverything />

        <WhyDifferent />

        <WhatActuallyGain />

        {/* ==================== BUTTON SECTION ==================== */}
        <div className="py-12 flex justify-center">
          <Link href="/learning-hub/explore">
            <CustomPrimaryButton>Explore The Learning Hub</CustomPrimaryButton>
          </Link>
        </div>
      </div>
    </div>
  );
}
