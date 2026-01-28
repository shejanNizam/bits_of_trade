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

interface Module {
  id: number;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  subtitle?: string;
  topics: Topic[];
  iconBgColor: string;
  iconColor: string;
}

export default function LearningEverything() {
  const marketBasicsTopics: Topic[] = [
    { id: 1, text: "Market Dynamics" },
    { id: 2, text: "Structure of Primary and Secondary Waves" },
    { id: 3, text: "Spot Indicators of Market Mood" },
    { id: 4, text: "Supply, Demand, and Smart Money" },
    { id: 5, text: "Introduction to Mechanical Constructs" },
    { id: 6, text: "The Foundations of Macro Price Sweep" },
    { id: 7, text: "Session Correlation Logistics" },
    { id: 8, text: "Understanding the Brick Model" },
    { id: 9, text: "Linear Continuity: Void & Exit" },
    { id: 10, text: "The Individual Price Range: EAR & ENA" },
    { id: 11, text: "Trade Structure Map: Mapping Moves Inside Range" },
    { id: 12, text: "Liquidity Threshold of Balanced Zones" },
    { id: 13, text: "Range Ur Trading on Short Moves" },
  ];

  const modules: Module[] = [
    {
      id: 1,
      icon: BsBook,
      title: "MODULE 1: CORE INTRODUCTION",
      topics: [
        { id: 1, text: "Understanding Market Participants" },
        { id: 2, text: "Technical Analysis vs Fundamental Analysis" },
        { id: 3, text: "Session Plan | Forex Correlation" },
        { id: 4, text: "Understanding Money Distribution" },
        { id: 5, text: "Why Multiple Order Block Applied" },
        { id: 6, text: "High Structure of Price Movement" },
        { id: 7, text: "Conditional Inducement Money Driving" },
        { id: 8, text: "How To Use High Ref. With Order Types" },
      ],
      iconBgColor: "bg-emerald-100 dark:bg-emerald-900/30",
      iconColor: "text-emerald-600 dark:text-emerald-400",
    },
    {
      id: 2,
      icon: BsBarChart,
      title: "MODULE 2: MARKET STRUCTURE & PRICE LOGIC",
      subtitle: "Support & Resistance Concepts",
      topics: [
        { id: 1, text: "Why Markets Move Up and Down" },
        { id: 2, text: "Expansion of Sub Trends" },
        { id: 3, text: "Cant see Hidden Zone Theory" },
        { id: 4, text: "What Is The Major Impact Related to Us High" },
        { id: 5, text: "Duration of Diagonal Price Points" },
        { id: 6, text: "Continuous Reversal Point with Zones" },
        { id: 7, text: "Trade Only A Relevant with Trend" },
        { id: 8, text: "Movement Support and Resistance" },
        { id: 9, text: "How September Zones Validation" },
        { id: 10, text: "The Individual Session Start Candle" },
        { id: 11, text: "Anatomy of HTS High Lakes" },
        { id: 12, text: "Only Support A MITIGATION" },
      ],
      iconBgColor: "bg-rose-100 dark:bg-rose-900/30",
      iconColor: "text-rose-600 dark:text-rose-400",
    },
    {
      id: 3,
      icon: BsLightning,
      title: "MODULE 3: STRUCTURAL PATTERNING & TREND BEHAVIOR",
      topics: [
        { id: 1, text: "Liquidity Grab" },
        { id: 2, text: "Understanding Market Gaps" },
        { id: 3, text: "Look at Gaps and Right Supply Gaps" },
        { id: 4, text: "Reaction Block Label Positioned" },
        { id: 5, text: "Which is Fair Gap" },
        { id: 6, text: "Absolutely Monthly Techniques" },
        { id: 7, text: "Finding Area Against On Five Waves" },
        { id: 8, text: "Liquidity Using Movement" },
        { id: 9, text: "Valid and Doubtful Market" },
        { id: 10, text: "Order Flow Money Structures" },
        { id: 11, text: "Transfer Relation with EME Running" },
        { id: 12, text: "Create Original Market Grid" },
        { id: 13, text: "Identify Chart Patterns Zones" },
      ],
      iconBgColor: "bg-purple-100 dark:bg-purple-900/30",
      iconColor: "text-purple-600 dark:text-purple-400",
    },
    {
      id: 4,
      icon: BsBank,
      title: "MODULE 4: INSTITUTIONAL ZONES & ORDER FLOW",
      topics: [
        { id: 1, text: "The Importance of Institutional Loading" },
        { id: 2, text: "Concept of Market Gaps Easily" },
        { id: 3, text: "Measurement Gaps Money Distribution" },
        { id: 4, text: "Block Inside A Liquidity Healthy Gaps" },
        { id: 5, text: "Reversal on Breaks into Deceleration" },
        { id: 6, text: "The Structure of Unloading" },
        { id: 7, text: "Applying Structure Consolidation To Supply Zones" },
        { id: 8, text: "How to Upload Gap Money Orders" },
        { id: 9, text: "Probability of Specific Money Moves" },
        { id: 10, text: "How to Recognize The Sweep" },
        { id: 11, text: "Only Multiple on Previous Flow Structure" },
        { id: 12, text: "Liquidity Unload" },
        { id: 13, text: "Decelerating Zone" },
      ],
      iconBgColor: "bg-blue-100 dark:bg-blue-900/30",
      iconColor: "text-blue-600 dark:text-blue-400",
    },
    {
      id: 5,
      icon: BsTrophy,
      title: "MODULE 5: ADVANCED PRICE ACTION THINKING",
      topics: [
        { id: 1, text: "Smart Execution Logic" },
        { id: 2, text: "Manipulated High Ref. Zone Inside Analysis" },
        { id: 3, text: "Market Deceleration Points of Zones" },
        { id: 4, text: "Buy Back Confirmation" },
        { id: 5, text: "Real Time Price Action Theory" },
        { id: 6, text: "Liquidity Mechanics on Lower Timeframe Levels" },
        { id: 7, text: "Momentum to Build Serious Concept" },
        { id: 8, text: "Real Time Candlestick Patterns" },
        { id: 9, text: "How to Use Specific to Maximize Routing" },
        { id: 10, text: "Fibonacci vs Market Structure" },
      ],
      iconBgColor: "bg-amber-100 dark:bg-amber-900/30",
      iconColor: "text-amber-600 dark:text-amber-400",
    },
    {
      id: 6,
      icon: FaBrain,
      title: "Module 6: Mental Psychology in Real-Time",
      topics: [
        { id: 1, text: "Keep It As Motivation" },
        { id: 2, text: "The Price System To Save Your Overnight" },
        { id: 3, text: "Emotional The Best Meditation Exercise" },
        { id: 4, text: "Managing Behavior in Trends Days" },
        { id: 5, text: "Mental Process and Structure Mind Frame" },
        { id: 6, text: "Is Motivation or Social Behavior Concept" },
        { id: 7, text: "How To Use Daily Time Parameters" },
        { id: 8, text: "Psychology Tendency to Displaced Routing" },
      ],
      iconBgColor: "bg-indigo-100 dark:bg-indigo-900/30",
      iconColor: "text-indigo-600 dark:text-indigo-400",
    },
    {
      id: 7,
      icon: FiTarget,
      title: "Module 7: Execution, Risk & Situation Frameworks",
      topics: [
        { id: 1, text: "Risk-Based Routing To Watch" },
        { id: 2, text: "Entry Inside In HTS GAPS" },
        { id: 3, text: "When Good and Forceful Taking" },
        { id: 4, text: "Best Element on A Momentum" },
        { id: 5, text: "Converting As A Mechanism Pad" },
        { id: 6, text: "Trade Long Is To Tools" },
        { id: 7, text: "Combining and Entries Structure" },
        { id: 8, text: "Initial Movement Parameters" },
        { id: 9, text: "How To Use Good Stop Loss and Framework Position" },
      ],
      iconBgColor: "bg-cyan-100 dark:bg-cyan-900/30",
      iconColor: "text-cyan-600 dark:text-cyan-400",
    },
  ];

  return (
    <div className="py-12 bg-white dark:bg-gray-900 transition-colors">
      <div className="container mx-auto max-w-6xl px-4">
        {/* ==================== HEADER ==================== */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3 transition-colors">
            {"Everything you'll learn inside the Learning Hub"}
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors">
            This is not a course library. It is a structured system for
            understanding risk, execution, and discipline.
          </p>
        </div>

        {/* ==================== MARKET BASICS & FOUNDATIONS ==================== */}
        <div className="mb-12">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-8 hover:shadow-xl transition-all duration-300 hover:scale-[1.01]">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-6 bg-blue-600 dark:bg-blue-400 rounded transition-colors"></div>
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

        {/* ==================== MODULES ==================== */}
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
                    {module.subtitle && (
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 transition-colors">
                        {module.subtitle}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-x-8 gap-y-3">
                  {module.topics.map((topic) => (
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
          ))}
        </div>
      </div>
    </div>
  );
}
