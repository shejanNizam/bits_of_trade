import CustomHeading from "@/components/shared/CustomHeading";
import { BsCheckLg } from "react-icons/bs";

export default function Pricing() {
  return (
    <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <CustomHeading>Choose the structure you need</CustomHeading>
          <p className="text-gray-600 dark:text-gray-400 mt-2 transition-colors">
            BitsOfTrade is priced by access to systems — not by promises or
            outcomes.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Discipline Tools */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-lg">
            {/* Badge */}
            <div className="mb-6">
              <span className="inline-block bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs font-medium px-3 py-1.5 rounded-md transition-colors">
                Behavior control & prevention
              </span>
            </div>

            {/* Plan Name & Price */}
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 transition-colors">
              Discipline Tools
            </h3>
            <div className="flex items-baseline gap-1 mb-4">
              <span className="text-5xl font-bold text-gray-900 dark:text-white transition-colors">
                ₹499
              </span>
              <span className="text-gray-500 dark:text-gray-400 text-sm transition-colors">
                / month
              </span>
            </div>

            {/* Description */}
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 transition-colors">
              Traders who want to control activity, reduce overtrading, and
              introduce structure.
            </p>

            {/* Includes */}
            <ul className="space-y-3 mb-8">
              {[
                "Discipline Guard",
                "Behavior-first Journal",
                "Session & rule monitoring",
                "Behavior-based reports",
                "Strategy frameworks",
                "AI Based Insights",
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <BsCheckLg className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5 transition-colors" />
                  <span className="text-sm text-gray-700 dark:text-gray-300 transition-colors">
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            {/* Button */}
            <button className="w-full py-3.5 border-2 border-blue-600 dark:border-blue-500 text-blue-600 dark:text-blue-400 rounded-lg font-medium hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors mb-4">
              Activate Discipline Tools
            </button>

            {/* Note */}
            <p className="text-xs text-center text-gray-400 dark:text-gray-500 mb-4 transition-colors">
              Discipline infrastructure only. No learning included.
            </p>

            {/* Annual Option */}
            <div className="text-center pt-4 border-t border-gray-100 dark:border-gray-700 transition-colors">
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-1 transition-colors">
                Or <span className="font-semibold">₹4,999 annually</span>
              </p>
              <p className="text-xs text-green-600 dark:text-green-400 font-medium transition-colors">
                Save ₹989
              </p>
            </div>
          </div>

          {/* Learning Hub */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-lg">
            {/* Badge */}
            <div className="mb-6">
              <span className="inline-block bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 text-xs font-medium px-3 py-1.5 rounded-md transition-colors">
                Structured trading education
              </span>
            </div>

            {/* Plan Name & Price */}
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 transition-colors">
              Learning Hub
            </h3>
            <div className="flex items-baseline gap-1 mb-4">
              <span className="text-5xl font-bold text-gray-900 dark:text-white transition-colors">
                ₹2,999
              </span>
              <span className="text-gray-500 dark:text-gray-400 text-sm transition-colors">
                / 6 months
              </span>
            </div>

            {/* Description */}
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 transition-colors">
              Traders building long-term understanding and process.
            </p>

            {/* Includes */}
            <ul className="space-y-3 mb-8">
              {[
                "Full Learning Hub access",
                "Risk & discipline modules",
                "Structured curriculum",
                "Access for 6 months",
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <BsCheckLg className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5 transition-colors" />
                  <span className="text-sm text-gray-700 dark:text-gray-300 transition-colors">
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            {/* Button */}
            <button className="w-full py-3.5 border-2 border-amber-600 dark:border-amber-500 text-amber-700 dark:text-amber-400 rounded-lg font-medium hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-colors mb-4">
              Unlock Learning Hub
            </button>

            {/* Note */}
            <p className="text-xs text-center text-gray-400 dark:text-gray-500 transition-colors">
              Educational access only. No discipline tools included.
            </p>
          </div>

          {/* Complete System */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-lg">
            {/* Badge */}
            <div className="mb-6">
              <span className="inline-block bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 text-xs font-medium px-3 py-1.5 rounded-md transition-colors">
                Structure + Understanding
              </span>
            </div>

            {/* Plan Name */}
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 transition-colors">
              Complete System
            </h3>

            {/* Description */}
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-8 transition-colors">
              For traders who want both structure and understanding, working
              together.
            </p>

            {/* Monthly Combo */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-base font-semibold text-gray-900 dark:text-white transition-colors">
                  Monthly Combo
                </h4>
                <span className="text-lg font-bold text-gray-900 dark:text-white transition-colors">
                  ₹2,799
                </span>
              </div>

              <ul className="space-y-2 mb-4">
                <li className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300 transition-colors">
                  <BsCheckLg className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0 mt-0.5 transition-colors" />
                  1 month Discipline Tools
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300 transition-colors">
                  <BsCheckLg className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0 mt-0.5 transition-colors" />
                  6 months Learning Hub
                </li>
              </ul>

              <button className="w-full py-3.5 border-2 border-purple-600 dark:border-purple-500 text-purple-600 dark:text-purple-400 rounded-lg font-medium hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors">
                Get Complete System
              </button>

              <p className="text-xs text-center text-gray-400 dark:text-gray-500 mt-3 transition-colors">
                Ideal for trying the full system before committing long-term.
              </p>
            </div>

            {/* Annual Combo */}
            <div className="pt-6 border-t border-gray-100 dark:border-gray-700 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-base font-semibold text-gray-900 dark:text-white transition-colors">
                  Annual Combo
                </h4>
                <div className="text-right">
                  <span className="text-lg font-bold text-gray-900 dark:text-white transition-colors">
                    ₹6,999
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400 transition-colors">
                    /yr
                  </span>
                </div>
              </div>

              <ul className="space-y-2 mb-4">
                <li className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300 transition-colors">
                  <BsCheckLg className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0 mt-0.5 transition-colors" />
                  12 months Discipline Tools
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300 transition-colors">
                  <BsCheckLg className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0 mt-0.5 transition-colors" />
                  6 months Learning Hub
                </li>
              </ul>

              <button className="w-full py-3.5 bg-purple-600 dark:bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 dark:hover:bg-purple-700 transition-colors">
                Commit for a Year
              </button>

              <p className="text-xs text-center text-purple-600 dark:text-purple-400 mt-3 font-medium transition-colors">
                Best value for traders committed to consistency
              </p>
            </div>
          </div>
        </div>

        {/* Footer Disclaimer */}
        <p className="text-center text-xs text-gray-500 dark:text-gray-400 max-w-4xl mx-auto transition-colors">
          BitsOfTrade does not provide investment advice. All pricing reflects
          access to tools and educational content only.
        </p>
      </div>
    </section>
  );
}
