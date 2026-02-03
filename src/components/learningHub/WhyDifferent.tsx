interface DifferenceCard {
  id: number;
  number: string;
  title: string;
  description: string;
  hasBadge?: boolean;
}

export default function WhyDifferent() {
  const differences: DifferenceCard[] = [
    {
      id: 1,
      number: "1",
      title: "Not Indicator-Driven. Price-Driven.",
      description:
        "Indicators react. Price leads. We focus on raw price behavior, market structure, and institutional footprints.",
    },
    {
      id: 2,
      number: "2",
      title: "Built on Market Logic, Not Setups",
      description:
        "You won't be given 'ready-made setups' to blindly copy. You'll learn why a level matters and why price reverses.",
    },
    {
      id: 3,
      number: "3",
      title: "Institutions First, Retail Last",
      description:
        "Retail traders chase breakouts. We teach you to read unfilled institutional orders and Demand & Supply zones.",
    },
    {
      id: 4,
      number: "4",
      title: "Timeframe-Aligned Thinking",
      description:
        "Stop mixing 5-minute entries with weekly bias. Learn to respect one timeframe at a time and trade clarity, not noise.",
      hasBadge: true,
    },
    {
      id: 5,
      number: "5",
      title: "No Signal Dependency",
      description:
        "This is not a signal group. It is a decision-making framework. You leave with independent thinking.",
    },
    {
      id: 6,
      number: "6",
      title: "Risk & Psychology Included",
      description:
        "We cover crash-logic, rally-logic, and emotional decision errors. Why patience often beats activity.",
    },
    {
      id: 7,
      number: "7",
      title: "Built for Longevity",
      description:
        "Designed for traders who want consistency and value process over profits. Not for quick wins.",
    },
  ];

  return (
    <div className="py-16 bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 transition-colors">
            Why This Course Is Different
          </h2>
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-4xl mx-auto leading-relaxed transition-colors">
            Most trading courses teach what to buy. This course teaches how
            markets actually move. The difference {"isn't"} in indicators or
            strategies — {"it's"} in how price is understood, framed, and
            respected.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {differences.map((card) => (
            <div
              key={card.id}
              className={`bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:scale-[1.02] cursor-pointer relative ${
                card.id === 7
                  ? "md:col-span-2 lg:col-span-1 lg:col-start-2"
                  : ""
              }`}
            >
              {/* Card Content */}
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 transition-colors">
                {card.number}. {card.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed transition-colors">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
