import { AiOutlineFileText } from "react-icons/ai";
import { BsJournalBookmark } from "react-icons/bs";
import { FaBrain, FaGlobe, FaMobileAlt } from "react-icons/fa";
import { HiOutlineShieldCheck } from "react-icons/hi";
import { IoBookOutline, IoCloudUploadOutline } from "react-icons/io5";
import { MdOutlineAnalytics, MdSecurity } from "react-icons/md";
import CustomHeading from "../shared/CustomHeading";

export default function Capabilities() {
  const features = [
    {
      id: 1,
      title: "Trade Journal",
      subtitle: "Behavior-First Trade Logging",
      description:
        "Log trades with context — not just numbers. Entry, exit, size, market, decision context, and emotional state. Trade data exists to explain behavior.",
      icon: BsJournalBookmark,
      bgColor: "bg-[#3B82F6]",
      textColor: "text-[#3B82F6] dark:text-[#60A5FA]",
    },
    {
      id: 2,
      title: "Trade Import & Entry",
      subtitle: "Flexible Trade Loading",
      description:
        "Supports manual trade entry (simple & detailed/batch) and bulk trade upload (CSV). Designed to reduce friction without encouraging overtrading.",
      icon: IoCloudUploadOutline,
      bgColor: "bg-[#10B981]",
      textColor: "text-[#10B981] dark:text-[#34D399]",
    },
    {
      id: 3,
      title: "Reports & Insights",
      subtitle: "Behavioral Reports",
      description:
        "Analytics focus on when and why mistakes repeat. Rule adherence over time, loss-streak behavior, and activity after green days.",
      icon: MdOutlineAnalytics,
      bgColor: "bg-[#F59E0B]",
      textColor: "text-[#F59E0B] dark:text-[#FBBF24]",
    },
    {
      id: 4,
      title: "Psychology & Behavior",
      subtitle: "Pattern Recognition",
      description:
        "Highlights emotional escalation zones, confidence shifts after losses, and fatigue-related errors. You don't guess your psychology. You observe it.",
      icon: FaBrain,
      bgColor: "bg-[#F43F5E]",
      textColor: "text-[#F43F5E] dark:text-[#FB7185]",
    },
    {
      id: 5,
      title: "Strategy Frameworks",
      subtitle: "Structured Strategy Playbooks",
      description:
        "Study and document strategies as frameworks, not signals. Required conditions, risk assumptions, and invalidation logic.",
      icon: AiOutlineFileText,
      bgColor: "bg-[#6366F1]",
      textColor: "text-[#6366F1] dark:text-[#818CF8]",
    },
    {
      id: 6,
      title: "Learning Hub",
      subtitle: "Risk-First Education",
      description:
        "Learn trading the way professional desks think: Market structure, risk & position sizing, and discipline systems.",
      icon: IoBookOutline,
      bgColor: "bg-[#06B6D4]",
      textColor: "text-[#06B6D4] dark:text-[#22D3EE]",
    },
    {
      id: 7,
      title: "Multi-Market Support",
      subtitle: "Trade Every Market",
      description:
        "Use one system for Indian equities & F&O, Forex, and Crypto. Same discipline rules. Same behavior tracking.",
      icon: FaGlobe,
      bgColor: "bg-[#14B8A6]",
      textColor: "text-[#14B8A6] dark:text-[#2DD4BF]",
    },
    {
      id: 8,
      title: "Data Security",
      subtitle: "Your Data, Protected",
      description:
        "Encrypted storage, secure authentication, private access only. No data selling. No third-party analytics on your behavior.",
      icon: MdSecurity,
      bgColor: "bg-[#64748B]",
      textColor: "text-[#64748B] dark:text-[#94A3B8]",
    },
    {
      id: 9,
      title: "Access Anywhere",
      subtitle: "Work From Any Device",
      description:
        "Fully responsive web app. Desktop & mobile optimized. Designed for review, not constant checking.",
      icon: FaMobileAlt,
      bgColor: "bg-[#A855F7]",
      textColor: "text-[#A855F7] dark:text-[#C084FC]",
    },
  ];

  return (
    <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-10">
          <CustomHeading>
            Capabilities built for disciplined trading
          </CustomHeading>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl">
            BitsOfTrade includes the core capabilities traders expect, but every
            feature is designed to reduce harmful behavior, not increase
            activity.
          </p>
        </div>

        {/* Featured Card - Discipline Guard */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 md:p-8 shadow-md border border-[#8B5CF6] dark:border-[#8B5CF6]/50 mb-8 transition-all duration-300 hover:shadow-sm  hover:border-[#8B5CF6]/30 dark:hover:border-[#8B5CF6]/70 group">
          <div className="flex flex-col md:flex-row md:items-start gap-6">
            <div className="w-14 h-14 rounded-xl bg-[#8B5CF6] flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
              <HiOutlineShieldCheck className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-2">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
                  Discipline Guard
                </h3>
                <span className="w-fit px-4 py-1.5 rounded-full bg-[#8B5CF6] text-white text-xs font-semibold">
                  Key Focus
                </span>
              </div>
              <p className="text-[#8B5CF6] dark:text-[#A78BFA] font-medium text-sm mb-3">
                Behavioral Risk Monitoring
              </p>
              <p className="text-gray-600 dark:text-gray-400 text-sm max-w-3xl">
                Instead of tracking more trades, BitsOfTrade tracks how your
                behavior changes. Monitors trade frequency spikes, consecutive
                loss escalation, session fatigue, and rule overrides.
              </p>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:shadow-xl hover:scale-[1.02] cursor-pointer group"
            >
              <div
                className={`w-12 h-12 rounded-xl ${feature.bgColor} flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110`}
              >
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3
                className={`text-lg font-bold text-gray-900 dark:text-white mb-1 transition-colors duration-300`}
              >
                {feature.title}
              </h3>
              <p className={`${feature.textColor} text-sm font-medium mb-3`}>
                {feature.subtitle}
              </p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
