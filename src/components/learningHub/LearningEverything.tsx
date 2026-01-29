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
    { id: 1, text: "Understanding the Stock Market" },
    { id: 2, text: "Structure of Primary and Secondary Markets" },
    { id: 3, text: "Indian Exchanges: NSE & BSE" },
    { id: 4, text: "Spot Market vs Futures Market" },
    { id: 5, text: "Why Futures Carry Higher Risk than Spot" },
    { id: 6, text: "Index Overview: Nifty & Sensex" },
    { id: 7, text: "Core Terminology: Bullish, Bearish, Long & Short" },
    { id: 8, text: "Introduction to Derivative Instruments" },
    { id: 9, text: "Hands-on Practice of Market Basics" },
    { id: 10, text: "Two Fundamental Ways to Make Money in Markets" },
    { id: 11, text: "Types of Trading Orders Explained" },
    { id: 12, text: "Introduction to the TradingView Platform" },
  ];

  const modules: Module[] = [
    {
      id: 1,
      icon: BsBook,
      title: "MODULE 1: CORE INTRODUCTION",
      topics: [
        { id: 1, text: "Course Disclaimer & Risk Awareness" },
        { id: 2, text: "Why Focus on Price Action" },
        { id: 3, text: "Technical Analysis vs Fundamental Analysis" },
        { id: 4, text: "The Mechanics of Price Movement" },
        { id: 5, text: "Various Chart Types Explained" },
        { id: 6, text: "Candlestick Reading Made Simple" },
        { id: 7, text: "Understanding Multiple Timeframes" },
        {
          id: 8,
          text: "Why 75-Minute and 125-Minute Charts Matter in Indian Markets",
        },
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
            { id: 2, text: "Concept of Imaginary Pivot Points" },
            { id: 3, text: "Core Logic Behind Dow Theory" },
            { id: 4, text: "Difference Between Major and Minor Pivots" },
            { id: 5, text: "What to Do When Market Direction Is Unclear" },
            {
              id: 6,
              text: "Trade Only in Alignment with Your Timeframe Trend",
            },
          ],
        },
        {
          title: "Support & Resistance Concepts",
          topics: [
            { id: 1, text: "Meaning of Support and Resistance" },
            { id: 2, text: "Elements That Act as Support or Resistance" },
            { id: 3, text: "Correct Method to Plot Support & Resistance" },
            { id: 4, text: "Why Repeated Testing Weakens a Level" },
            { id: 5, text: "Role Reversal Principle (Polarity Rule)" },
            { id: 6, text: "Probability Boosters for Support & Resistance" },
            { id: 7, text: "Polarity at Lifetime High Levels" },
            { id: 8, text: "Importance of Connecting Maximum Pivot Points" },
            { id: 9, text: "Multiple-Tested vs Fresh Support & Resistance" },
            { id: 10, text: "Breakouts with Gaps at Key Levels" },
            { id: 11, text: "Zone-Based Support & Resistance" },
            { id: 12, text: "How to Draw Support & Resistance Zones" },
          ],
        },
        {
          title: "Gaps in the Market",
          topics: [
            { id: 1, text: "Understanding Market Gaps" },
            { id: 2, text: "Reasons Behind Gap Formation" },
            { id: 3, text: "Types of Gaps and How to Read Them" },
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
      subSections: [
        {
          title: "Trendlines",
          topics: [
            { id: 1, text: "What Is a Trendline" },
            { id: 2, text: "Correct Way to Draw Trendlines" },
            { id: 3, text: "Identifying Reliable Trendlines" },
            { id: 4, text: "Trendline Breaks and Their Meaning" },
            { id: 5, text: "Polarity Rule Applied to Trendlines" },
            { id: 6, text: "Assessing Trendline Strength" },
            { id: 7, text: "Practical Application of Trendlines" },
          ],
        },
        {
          title: "Chart Patterns",
          topics: [
            { id: 1, text: "Introduction to Chart Patterns" },
            { id: 2, text: "Triangle Formation" },
            { id: 3, text: "Channel Formation" },
            { id: 4, text: "Rectangle Formation" },
            { id: 5, text: "Double Top & Double Bottom" },
            { id: 6, text: "Triple Top & Triple Bottom" },
            { id: 7, text: "Practical Study of Double & Triple Patterns" },
            { id: 8, text: "Head and Shoulder Pattern" },
          ],
        },
      ],
      iconBgColor: "bg-purple-100 dark:bg-purple-900/30",
      iconColor: "text-purple-600 dark:text-purple-400",
    },
    {
      id: 4,
      icon: BsBank,
      title: "MODULE 4: INSTITUTIONAL ZONES & ORDER FLOW",
      subSections: [
        {
          title: "Demand & Supply Mechanics",
          topics: [
            { id: 1, text: "Concept of Demand and Supply" },
            { id: 2, text: "Filled vs Unfilled Institutional Orders" },
            { id: 3, text: "The Real Reason Behind Price Movement" },
            { id: 4, text: "Common Mistakes Made by Retail Traders" },
            { id: 5, text: "Formation of Demand & Supply Zones" },
            { id: 6, text: "Two Types of Demand Zone Structures" },
            { id: 7, text: "Two Types of Supply Zone Structures" },
            { id: 8, text: "Base Candle Identification" },
            { id: 9, text: "Leg Candle Identification" },
            { id: 10, text: "Three Essential Components of a Zone" },
            { id: 11, text: "Continuation vs Reversal Zone Patterns" },
            { id: 12, text: "Benefits of Using Demand & Supply Zones" },
            { id: 13, text: "Step-by-Step Zone Plotting Process" },
            { id: 14, text: "Proximal and Distal Line Explanation" },
          ],
        },
        {
          title: "Invisible Candles",
          topics: [
            { id: 1, text: "What Are Invisible Candles" },
            { id: 2, text: "How to Mark Invisible Candles" },
            { id: 3, text: "Impact of Invisible Candles on Zone Drawing" },
          ],
        },
        {
          title: "Zone Quality & Validation",
          topics: [
            { id: 1, text: "Fresh, Tested & Broken Zones" },
            { id: 2, text: "How to Spot Valid Zones" },
            { id: 3, text: "Identifying Demand Zones" },
            { id: 4, text: "Identifying Supply Zones" },
            { id: 5, text: "Practical Sessions on Demand & Supply Zones" },
          ],
        },
        {
          title: "Controlling Zones",
          topics: [
            { id: 1, text: "Meaning of Controlling Zones" },
            { id: 2, text: "Key Characteristics of Controlling Zones" },
            { id: 3, text: "Probability Enhancers for Controlling Zones" },
            { id: 4, text: "Practical Examples of Controlling Zones" },
            { id: 5, text: "Support & Resistance vs Demand & Supply Zones" },
          ],
        },
      ],
      iconBgColor: "bg-blue-100 dark:bg-blue-900/30",
      iconColor: "text-blue-600 dark:text-blue-400",
    },
    {
      id: 5,
      icon: BsTrophy,
      title: "MODULE 5: ADVANCED PRICE ACTION THINKING",
      subSections: [
        {
          title: "Trend & Structure Logic",
          topics: [
            { id: 1, text: "Two Approaches to Trend Identification" },
            { id: 2, text: "Probability Enhancers in Support & Resistance" },
            { id: 3, text: "Higher Timeframe vs Lower Timeframe Levels" },
            { id: 4, text: "Recent Levels vs Historical Levels" },
            { id: 5, text: "Price Reaction at Key Levels" },
          ],
        },
        {
          title: "Institutional Logic",
          topics: [
            { id: 1, text: "Core Logic Behind Demand & Supply" },
            { id: 2, text: "Why Zones Are Created" },
            { id: 3, text: "Why Institutions Cannot Hide Their Footprints" },
            { id: 4, text: "Six Base Candle Logic Explained" },
            { id: 5, text: "Importance of Base Candle Count" },
            { id: 6, text: "Understanding Institutional Unfilled Orders" },
            { id: 7, text: "Why Institutional Decisions Remain Fixed" },
            { id: 8, text: "Wholesale vs Retail Market Concept" },
            { id: 9, text: "HTF vs LTF Institutional Activity" },
            { id: 10, text: "Who Buys or Sells During Leg-Out Moves" },
            { id: 11, text: "Zone Behavior Across Timeframes" },
            { id: 12, text: "Fresh Zones vs Older Zones" },
            { id: 13, text: "Demand & Supply Q&A Session" },
          ],
        },
        {
          title: "Breakouts, Corrections & Viewpoint Building",
          topics: [
            { id: 1, text: "Importance of Price Holding After Breakouts" },
            {
              id: 2,
              text: "Why Time Correction Is Stronger Than Price Correction",
            },
            { id: 3, text: "Significance of Closing Price Near Key Levels" },
            { id: 4, text: "Viewpoint Creation During Flat Openings" },
            { id: 5, text: "Viewpoint Creation During Gap-Up Openings" },
            { id: 6, text: "Viewpoint Creation During Gap-Down Openings" },
            { id: 7, text: "Practical Sessions for Above Scenarios" },
          ],
        },
        {
          title: "Advanced Trade Scenarios",
          topics: [
            { id: 1, text: "Identifying Breaks After Multiple Tests" },
            { id: 2, text: "Entry Logic During Market Crashes" },
            { id: 3, text: "Entry Logic During One-Sided Rallies" },
            { id: 4, text: "Breakout vs Breakdown Trade Differences" },
            { id: 5, text: "Creating Short Bias in One-Sided Up Markets" },
            { id: 6, text: "Creating Long Bias in One-Sided Down Markets" },
          ],
        },
        {
          title: "Time, Cycles & Market Structure",
          topics: [
            { id: 1, text: "Market Timing: First Half vs Second Half" },
            { id: 2, text: "How to Judge Zone Violation Probability" },
          ],
        },
        {
          title: "Additional Learning Sessions",
          topics: [
            { id: 1, text: "Understanding the Two-Year Market Cycle" },
            { id: 2, text: "Impact of F&O Trading on Spot Charts" },
          ],
        },
      ],
      iconBgColor: "bg-amber-100 dark:bg-amber-900/30",
      iconColor: "text-amber-600 dark:text-amber-400",
    },
    {
      id: 6,
      icon: FaBrain,
      title: "MODULE 6: MARKET PSYCHOLOGY IN REAL TIME",
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
      id: 7,
      icon: FiTarget,
      title: "MODULE 7: EXECUTION, RISK & DISCIPLINE FRAMEWORKS",
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
