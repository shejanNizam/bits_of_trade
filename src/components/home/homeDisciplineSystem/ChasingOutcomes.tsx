import CustomHeading from "@/components/shared/CustomHeading";
import CustomPrimaryButton from "@/components/shared/CustomPrimaryButton";
import Link from "next/link";
import { BsCheckCircleFill, BsXCircleFill } from "react-icons/bs";

export default function ChasingOutcomes() {
  const tags = [
    "Foundations",
    "Market Structure",
    "Risk and Positioning",
    "Discipline Systems",
    "Strategy Frameworks",
  ];

  const forYouList = [
    "You want structure over impulse",
    "You care about longevity, not excitement",
    "You are willing to review behavior honestly",
    "You believe discipline should be enforced by systems",
  ];

  const notForYouList = [
    "You want buy/sell signals",
    "You chase daily profits",
    "You dislike limits on trading behavior",
    "You believe overtrading is unavoidable",
  ];

  return (
    <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="container mx-auto max-w-7xl">
        {/* Hero Section */}
        <div className="bg-[#0A0F1E] dark:bg-gray-950 rounded-3xl p-8 md:p-12 mb-16 text-center transition-colors">
          <CustomHeading>Learn trading without chasing outcomes</CustomHeading>

          <p className="text-gray-400 dark:text-gray-500 max-w-3xl mx-auto mb-8 transition-colors">
            This is not a course library. It is a structured system for
            understanding risk, execution, and discipline.
          </p>

          {/* Tags */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-gray-800/50 dark:bg-gray-900/50 text-gray-300 dark:text-gray-400 text-sm rounded-full border border-gray-700 dark:border-gray-800 transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* CTA Button */}
          <Link href="/learning-hub">
            <CustomPrimaryButton>Explore The Learning Hub</CustomPrimaryButton>
          </Link>

          {/* Subtitle */}
          <p className="text-gray-500 dark:text-gray-600 text-xs transition-colors py-2">
            Paid access • Designed for serious traders
          </p>
        </div>

        {/* Who BitsOfTrade is designed for */}
        <div className="mb-12">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-8 transition-colors">
            Who BitsOfTrade is designed for
          </h3>

          <div className="grid md:grid-cols-2 gap-6">
            {/* This is for you if */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border-2 border-emerald-200 dark:border-emerald-900/30 transition-colors">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center">
                  <BsCheckCircleFill className="w-5 h-5 text-white" />
                </div>
                <h4 className="text-lg font-bold text-gray-900 dark:text-white transition-colors">
                  This is for you if:
                </h4>
              </div>

              <ul className="space-y-3">
                {forYouList.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 text-gray-700 dark:text-gray-300 transition-colors"
                  >
                    <BsCheckCircleFill className="w-4 h-4 text-emerald-500 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* This is not for you if */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border-2 border-rose-200 dark:border-rose-900/30 transition-colors">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-rose-500 flex items-center justify-center">
                  <BsXCircleFill className="w-5 h-5 text-white" />
                </div>
                <h4 className="text-lg font-bold text-gray-900 dark:text-white transition-colors">
                  This is not for you if:
                </h4>
              </div>

              <ul className="space-y-3">
                {notForYouList.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 text-gray-700 dark:text-gray-300 transition-colors"
                  >
                    <BsXCircleFill className="w-4 h-4 text-rose-500 dark:text-rose-400 shrink-0 mt-0.5" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Footer Message */}
        <div className="text-center">
          <p className="text-gray-700 dark:text-gray-300 italic font-medium transition-colors">
            BitsOfTrade helps traders stop earlier, trade less, and think
            clearer.
          </p>
        </div>
      </div>
    </section>
  );
}
