import {
  BsBank,
  BsBarChart,
  BsBook,
  BsLightning,
  BsTrophy,
} from "react-icons/bs";
import { FaBrain } from "react-icons/fa";
import { FiTarget } from "react-icons/fi";

interface Topic {
  id: number;
  text: string;
}

interface SubSection {
  title: string;
  topics: Topic[];
}

interface Module {
  id: number;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description?: string;
  topics?: Topic[];
  subSections?: SubSection[];
  iconBgColor: string;
  iconColor: string;
}

export default function LearningEverything() {
  const marketBasicsTopics: Topic[] = [
    { id: 1, text: "Market Foundations" },
    { id: 2, text: "Structure of Primary and Secondary Markets" },
    { id: 3, text: "Spot Market vs Futures Market" },
    { id: 4, text: "Index Overview: Nifty & Sensex" },
    { id: 5, text: "Introduction to Derivative Instruments" },
    { id: 6, text: "Two Fundamental Ways to Make Money" },
    { id: 7, text: "Intro to TradingView Platform" },
    { id: 8, text: "Understanding the Stock Market" },
    { id: 9, text: "Indian Exchanges: NSE & BSE" },
    { id: 10, text: "Why Futures Carry Higher Risk than Spot" },
    { id: 11, text: "Core Terminology: Bullish, Bearish, Long & Short" },
    { id: 12, text: "Hands-on Practice of Market Basics" },
    { id: 13, text: "Types of Trading Orders Explained" },
  ];

  const modules: Module[] = [
    {
      id: 1,
      icon: BsBook,
      title: "MODULE 1: CORE INTRODUCTION",
      topics: [
        { id: 1, text: "Course Disclaimer & Risk Awareness" },
        { id: 2, text: "Technical Analysis vs Fundamental Analysis" },
        { id: 3, text: "Various Chart Types Explained" },
        { id: 4, text: "Understanding Multiple Timeframes" },
        { id: 5, text: "Why Focus on Price Action" },
        { id: 6, text: "The Mechanics of Price Movement" },
        { id: 7, text: "Candlestick Reading Made Simple" },
        { id: 8, text: "Why 75-Min and 125-Min Charts Matter" },
      ],
      iconBgColor: "bg-emerald-100 dark:bg-emerald-900/30",
      iconColor: "text-emerald-600 dark:text-emerald-400",
    },
    {
      id: 2,
      icon: BsBarChart,
      title: "MODULE 2: MARKET STRUCTURE & PRICE LOGIC",
      subSections: [
        {
          title: "Dow Theory & Market Framework",
          topics: [
            { id: 1, text: "Overview of Dow Theory" },
            { id: 2, text: "Core Logic Behind Dow Theory" },
            { id: 3, text: "What to Do When Market Direction Is Unclear" },
            { id: 4, text: "Concept of Imaginary Pivot Points" },
            { id: 5, text: "Difference Between Major and Minor Pivots" },
            { id: 6, text: "Trade Only in Alignment with Trend" },
          ],
        },
        {
          title: "Support & Resistance Concepts",
          topics: [
            { id: 1, text: "Meaning of Support and Resistance" },
            { id: 2, text: "Correct Method to Plot S&R" },
            { id: 3, text: "Role Reversal Principle (Polarity Rule)" },
            { id: 4, text: "Polarity at Lifetime High Levels" },
            { id: 5, text: "Elements That Act as Support or Resistance" },
            { id: 6, text: "Why Repeated Testing Weakens a Level" },
            { id: 7, text: "Probability Boosters for S&R" },
            { id: 8, text: "Zone-Based Support & Resistance" },
          ],
        },
        {
          title: "Gaps in the Market",
          topics: [
            { id: 1, text: "Understanding Market Gaps" },
            { id: 2, text: "Types of Gaps and How to Read Them" },
            { id: 3, text: "Reasons Behind Gap Formation" },
          ],
        },
      ],
      iconBgColor: "bg-rose-100 dark:bg-rose-900/30",
      iconColor: "text-rose-600 dark:text-rose-400",
    },
    {
      id: 3,
      icon: BsLightning,
      title: "MODULE 3: STRUCTURAL PATTERNS & TREND BEHAVIOR",
      topics: [
        { id: 1, text: "What Is a Trendline" },
        { id: 2, text: "Identifying Reliable Trendlines" },
        { id: 3, text: "Polarity Rule Applied to Trendlines" },
        { id: 4, text: "Triangle, Channel, Rectangle Formations" },
        { id: 5, text: "Head and Shoulder Pattern" },
        { id: 6, text: "Correct Way to Draw Trendlines" },
        { id: 7, text: "Trendline Breaks and Their Meaning" },
        { id: 8, text: "Chart Patterns Introduction" },
        { id: 9, text: "Double/Triple Top & Bottom" },
      ],
      iconBgColor: "bg-purple-100 dark:bg-purple-900/30",
      iconColor: "text-purple-600 dark:text-purple-400",
    },
    {
      id: 4,
      icon: BsBank,
      title: "MODULE 4: INSTITUTIONAL ZONES & ORDER FLOW",
      description: "This is the core of institutional price reading.",
      topics: [
        { id: 1, text: "Concept of Demand and Supply" },
        { id: 2, text: "The Real Reason Behind Price Movement" },
        { id: 3, text: "Base Candle & Leg Candle Identification" },
        { id: 4, text: "Proximal and Distal Line Explanation" },
        { id: 5, text: "Zone Quality & Validation" },
        { id: 6, text: "Support & Resistance vs Demand & Supply Zones" },
        { id: 7, text: "Filled vs Unfilled Institutional Orders" },
        { id: 8, text: "Formation of Demand & Supply Zones" },
        { id: 9, text: "Continuation vs Reversal Zone Patterns" },
        { id: 10, text: "Invisible Candles" },
        { id: 11, text: "Controlling Zones" },
      ],
      iconBgColor: "bg-blue-100 dark:bg-blue-900/30",
      iconColor: "text-blue-600 dark:text-blue-400",
    },
    {
      id: 5,
      icon: BsTrophy,
      title: "MODULE 5: ADVANCED PRICE ACTION THINKING",
      topics: [
        { id: 1, text: "Trend & Structure Logic" },
        { id: 2, text: "Institutional Logic: Why Zones Are Created" },
        { id: 3, text: "Market Psychology: Panic vs Greed" },
        { id: 4, text: "EMA 20 & Confluence" },
        { id: 5, text: "Advanced Trade Scenarios (Crashes, Rallies)" },
        { id: 6, text: "Higher Timeframe vs Lower Timeframe Levels" },
        { id: 7, text: "Wholesale vs Retail Market Concept" },
        { id: 8, text: "Weak vs Healthy Price Movements" },
        { id: 9, text: "Breakouts, Corrections & Viewpoint Building" },
        { id: 10, text: "Time, Cycles & Market Structure" },
      ],
      iconBgColor: "bg-amber-100 dark:bg-amber-900/30",
      iconColor: "text-amber-600 dark:text-amber-400",
    },
    {
      id: 7,
      icon: FaBrain,
      title: "Module 6: Market Psychology in Real Time",
      topics: [
        { id: 1, text: "Panic vs Compression" },
        { id: 2, text: "Why Price Extends Further Than Expected" },
        { id: 3, text: "Emotional Traps Built Into Market Structure" },
        { id: 4, text: "Reading Aggression Through Price" },
        { id: 5, text: "Greed Phases and Late Entries" },
        { id: 6, text: "Wholesale vs Retail Market Concept" },
        { id: 7, text: "Weak vs Healthy Price Movements" },
        { id: 8, text: "Breakouts, Corrections & Viewpoint Building" },
      ],
      iconBgColor: "bg-indigo-100 dark:bg-indigo-900/30",
      iconColor: "text-indigo-600 dark:text-indigo-400",
    },
    {
      id: 8,
      icon: FiTarget,
      title: "Module 7: Execution, Risk & Discipline Frameworks",
      topics: [
        { id: 1, text: "Risk Defined (Beyond % and SL)" },
        { id: 2, text: "Entry Quality vs Outcome" },
        { id: 3, text: "Session-Based Decision Making" },
        { id: 4, text: "Rule Adherence vs Confidence" },
        { id: 5, text: "Journaling as a Performance Tool" },
        { id: 6, text: "Position Sizing as Survival Logic" },
        { id: 7, text: "When Not to Trade" },
        { id: 8, text: "Overtrading and Decision Fatigue" },
        { id: 9, text: "Loss Containment Frameworks" },
        { id: 10, text: "Review Systems That Actually Improve Results" },
      ],
      iconBgColor: "bg-cyan-100 dark:bg-cyan-900/30",
      iconColor: "text-cyan-600 dark:text-cyan-400",
    },
  ];

  return (
    <div className="py-12 bg-white dark:bg-gray-900 transition-colors">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3 transition-colors">
            {"Everything you'll learn inside the Learning Hub"}
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors">
            This is not a course library. It is a structured system for
            understanding risk, execution, and discipline.
          </p>
        </div>

        {/* Market Basics Section */}
        <div className="mb-12">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-8 hover:shadow-xl transition-all duration-300 hover:scale-[1.01]">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <BsBook className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white transition-colors">
                Market Basics & Foundations
              </h3>
            </div>

            <div className="grid md:grid-cols-2 gap-x-8 gap-y-3">
              {marketBasicsTopics.map((topic) => (
                <div
                  key={topic.id}
                  className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
                >
                  <span className="text-gray-400 dark:text-gray-500 mt-1 shrink-0">
                    •
                  </span>
                  <span>{topic.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modules */}
        <div className="space-y-8">
          {modules.map((module) => (
            <div key={module.id}>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-8 hover:shadow-xl transition-all duration-300 hover:scale-[1.01] group">
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className={`w-10 h-10 rounded-lg ${module.iconBgColor} flex items-center justify-center transition-all duration-300 group-hover:scale-110`}
                  >
                    <module.icon
                      className={`w-5 h-5 ${module.iconColor} transition-colors`}
                    />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-gray-900 dark:text-white transition-colors">
                      {module.title}
                    </h3>
                  </div>
                </div>

                {module.description && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 italic">
                    {module.description}
                  </p>
                )}

                {/* If module has subsections */}
                {module.subSections ? (
                  <div className="space-y-6">
                    {module.subSections.map((subSection, index) => (
                      <div key={index}>
                        <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-3">
                          {subSection.title}
                        </h4>
                        <div className="grid md:grid-cols-2 gap-x-8 gap-y-3">
                          {subSection.topics.map((topic) => (
                            <div
                              key={topic.id}
                              className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
                            >
                              <span className="text-gray-400 dark:text-gray-500 mt-1 shrink-0">
                                •
                              </span>
                              <span>{topic.text}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  /* If module has regular topics */
                  <div className="grid md:grid-cols-2 gap-x-8 gap-y-3">
                    {module.topics?.map((topic) => (
                      <div
                        key={topic.id}
                        className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
                      >
                        <span className="text-gray-400 dark:text-gray-500 mt-1 shrink-0">
                          •
                        </span>
                        <span>{topic.text}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
