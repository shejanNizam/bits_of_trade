import { BsJournalBookmark } from "react-icons/bs";
import { HiOutlineLightBulb } from "react-icons/hi";
import { IoBookOutline, IoLayersOutline } from "react-icons/io5";
import CustomHeading from "../shared/CustomHeading";

export default function HowWorks() {
  const steps = [
    {
      number: 1,
      title: "Awareness",
      subtitle: "Understand when discipline breaks",
      description:
        "BitsOfTrade helps you identify behavioral patterns that usually precede overtrading and emotional mistakes.",
      icon: HiOutlineLightBulb,
      color: "[#8B5CF6]",
      bgColor: "bg-[#8B5CF6]",
      textColor: "text-[#8B5CF6] dark:text-[#A78BFA]",
      lightBg: "bg-[#8B5CF6]",
      position: "left",
    },
    {
      number: 2,
      title: "Structure",
      subtitle: "Set limits before emotions take over",
      description:
        "Define rules around trade count, losses, and session duration. These limits act as guardrails — not punishments.",
      icon: IoLayersOutline,
      color: "[#3B82F6]",
      bgColor: "bg-[#3B82F6]",
      textColor: "text-[#3B82F6] dark:text-[#60A5FA]",
      lightBg: "bg-[#3B82F6]",
      position: "right",
    },
    {
      number: 3,
      title: "Reflection",
      subtitle: "Review behavior, not just outcomes",
      description:
        "Structured journaling highlights decision quality, rule adherence, and repeat mistakes — before P&L narratives take over.",
      icon: BsJournalBookmark,
      color: "[#10B981]",
      bgColor: "bg-[#10B981]",
      textColor: "text-[#10B981] dark:text-[#34D399]",
      lightBg: "bg-[#10B981]",
      position: "left",
    },
    {
      number: 4,
      title: "Learning",
      subtitle: "Strengthen discipline with understanding",
      description:
        "Learning content reinforces risk management, behavioral awareness, and process consistency — not shortcuts or signals.",
      icon: IoBookOutline,
      color: "[#F59E0B]",
      bgColor: "bg-[#F59E0B]",
      textColor: "text-[#F59E0B] dark:text-[#FBBF24]",
      lightBg: "bg-[#F59E0B]",
      position: "right",
    },
  ];

  return (
    <section className="py-16 px-4 bg-white dark:bg-gray-900">
      <div className="container mx-auto max-w-6xl">
        <CustomHeading>How BitsOfTrade works</CustomHeading>

        {/* Steps */}
        <div className="space-y-12 md:space-y-16">
          {steps?.map((step) => (
            <div
              key={step.number}
              className={`flex flex-col md:flex-row items-center gap-8 md:gap-12 ${
                step.position === "right" ? "md:flex-row-reverse" : ""
              }`}
            >
              <div
                className={`flex-1 ${
                  step.position === "right" ? "md:text-right" : "md:text-left"
                }`}
              >
                <div
                  className={`flex items-center gap-3 mb-3 ${
                    step.position === "right" ? "md:justify-end" : ""
                  }`}
                >
                  <span
                    className={`w-7 h-7 rounded-full ${step.bgColor} text-white text-sm font-bold flex items-center justify-center`}
                  >
                    {step.number}
                  </span>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {step.title}
                  </h3>
                </div>

                {/* Subtitle */}
                <p className={`${step.textColor} font-medium mb-2`}>
                  {step.subtitle}
                </p>

                {/* Description */}
                <p
                  className={`text-gray-600 dark:text-gray-400 text-sm max-w-md ${
                    step.position === "right" ? "md:ml-auto" : ""
                  }`}
                >
                  {step.description}
                </p>
              </div>

              {/* Icon Card */}
              <div
                className={`hidden md:flex w-28 h-28 rounded-3xl ${step.bgColor} items-center justify-center shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl`}
              >
                <step.icon className="w-12 h-12 md:w-14 md:h-14 text-white" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
