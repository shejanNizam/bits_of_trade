import { AiOutlineWarning } from "react-icons/ai";
import { BsGearFill } from "react-icons/bs";
import { FaBrain, FaLaptop } from "react-icons/fa";
import { HiOutlineShieldCheck } from "react-icons/hi";
import { MdOutlineVisibility } from "react-icons/md";
import CustomHeading from "../shared/CustomHeading";
import StepCard from "./StepCard";

export default function ActuallyDoesForWorks() {
  const tags = [
    "Observe behavior",
    "Introduce structure",
    "Prevent harmful repetition",
  ];

  const steps = [
    {
      number: 1,
      left: {
        title: "User Action",
        items: [
          "Select market segment",
          "Define session limits (max trades, loss limit)",
          "Set time window",
        ],
        note: null,
      },
      right: {
        title: "Start with Structure",
        icon: HiOutlineShieldCheck,
        description:
          "Activates session boundaries and tracks behavior against predefined limits.",
        note: "Discipline begins before the first trade.",
      },
    },
    {
      number: 2,
      left: {
        title: "Trade Anywhere",
        icon: FaLaptop,
        description:
          "Trade normally at your broker. No need to keep BitsOfTrade open.",
        note: "BitsOfTrade never touches your broker account.",
      },
      right: {
        title: "System Action",
        items: [
          "Does not place trades",
          "Does not interfere with execution",
          "Silent observation mode",
        ],
        note: null,
      },
    },
    {
      number: 3,
      left: {
        title: "System Observations",
        items: [
          "Trade frequency changes",
          "Loss sequence continuation",
          "Session duration creep",
          "Rapid re-entries after losses",
        ],
        note: null,
      },
      right: {
        title: "Behavior is Observed",
        icon: MdOutlineVisibility,
        description:
          "Behavioral patterns are detected in real-time as you log your trades.",
        note: "The system watches behavior, not price.",
      },
    },
    {
      number: 4,
      left: {
        title: "Friction is Introduced",
        icon: AiOutlineWarning,
        description:
          "Warnings appear when limits are approached. Review prompts appear when behavior escalates.",
        note: "This is not advice. It is interruption.",
      },
      right: {
        title: "Interventions",
        items: [
          "Risk threshold warnings",
          "Mandatory cooldown recommendations",
          "Pattern escalation alerts",
        ],
        note: null,
      },
    },
    {
      number: 5,
      left: {
        title: "User Requirements",
        items: [
          "Review what changed",
          "Write a short reflection",
          "Acknowledge deviation",
        ],
        note: null,
      },
      right: {
        title: "Review After Breaches",
        icon: BsGearFill,
        description:
          "Review is required when limits break or consecutive losses continue.",
        note: "Trading continuation is earned through review.",
      },
    },
    {
      number: 6,
      left: {
        title: "Learning is Recommended",
        icon: FaBrain,
        description:
          "System links behavior to relevant lessons. Learning is contextual, not generic.",
        link: { text: "Explore Learning Hub", href: "/learning-hub" },
      },
      right: {
        title: "Contextual Examples",
        examples: [
          { from: "Overtrading", to: "Session fatigue lesson" },
          { from: "Revenge trading", to: "Loss-streak handling" },
        ],
        note: null,
      },
    },
  ];

  return (
    <section className="py-16 px-4 bg-white dark:bg-gray-900">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <CustomHeading>What BitsOfTrade actually does</CustomHeading>

          <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto mb-6">
            {/* You trade wherever you want — Zerodha, Binance, MT4, anywhere.
            BitsOfTrade works before, during, and after your trading session to: */}
            “Trade with any broker of your choice.BitsofTrade works before,
            during, and after your trading session to:”
          </p>

          <div className="flex flex-wrap justify-center gap-3 mb-4">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="px-4 py-2 rounded-full border border-blue-200 dark:border-blue-700 bg-blue-50 dark:bg-blue-900/30 text-[#3B82F6] dark:text-[#60A5FA] text-sm font-medium"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* <p className="text-gray-400 dark:text-gray-500 text-sm">
            It does not try to predict markets.            
          </p> */}
        </div>

        <div className="relative">
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700 -translate-x-1/2"></div>

          <div className="space-y-8 md:space-y-0">
            {steps?.map((step) => (
              <div key={step.number} className="relative">
                <div className="md:hidden space-y-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-white dark:bg-gray-900 border-2 border-[#3B82F6] text-[#3B82F6] font-bold flex items-center justify-center">
                      {step.number}
                    </div>
                    <div className="h-0.5 flex-1 bg-gray-200 dark:bg-gray-700"></div>
                  </div>

                  <StepCard data={step.left} variant="left" />

                  <StepCard data={step.right} variant="right" />
                </div>

                <div className="hidden md:grid md:grid-cols-[1fr_60px_1fr] items-center gap-4 py-6">
                  <div className="flex justify-end">
                    <StepCard data={step.left} variant="left" />
                  </div>

                  <div className="flex justify-center">
                    <div className="w-10 h-10 rounded-full bg-white dark:bg-gray-900 border-2 border-[#3B82F6] text-[#3B82F6] font-bold flex items-center justify-center z-10">
                      {step.number}
                    </div>
                  </div>

                  <div className="flex justify-start">
                    <StepCard data={step.right} variant="right" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
