import CustomHeading from "@/components/shared/CustomHeading";
import { BsEye } from "react-icons/bs";

export default function LayerOne() {
  const observedSignals = [
    "Trade frequency acceleration",
    "Consecutive loss continuation",
    "Session duration extension beyond plan",
    "Rapid re-entries after losses",
    "Rule overrides after profitable streaks",
  ];

  return (
    <section className="py-16 px-4 bg-white dark:bg-gray-900 transition-colors">
      <div className="container mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <div className="mb-4">
              <span className="text-blue-600 dark:text-blue-400 text-sm font-semibold transition-colors">
                Layer 1
              </span>
            </div>
            <CustomHeading>What the system observes</CustomHeading>

            <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed transition-colors">
              BitsOfTrade does not evaluate what you trade here. It evaluates
              how your behavior changes during a session.
            </p>

            <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 transition-colors">
              <h3 className="text-base font-bold text-gray-900 dark:text-white mb-4 transition-colors">
                Observed Signals
              </h3>
              <ul className="space-y-3 mb-6">
                {observedSignals?.map((signal, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 text-gray-700 dark:text-gray-300 transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary dark:bg-blue-400 mt-2"></span>
                    </span>
                    <span className="text-sm">{signal}</span>
                  </li>
                ))}
              </ul>
              <p className="text-xs text-gray-400 dark:text-gray-500 italic transition-colors">
                These signals are behavioral — not predictive.
              </p>
            </div>
          </div>

          <div className="bg-[#0F172A] dark:bg-gray-950 rounded-3xl p-12 flex flex-col items-center justify-center min-h-80 md:min-h-130 transition-colors">
            <div className="w-20 h-20 rounded-full bg-blue-900/50 dark:bg-blue-900/30 flex items-center justify-center mb-6 transition-all">
              <BsEye className="w-10 h-10 text-primary dark:text-primary" />
            </div>
            <p className="text-gray-400 dark:text-gray-500 text-sm font-mono transition-colors">
              Monitoring Session Behavior...
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
