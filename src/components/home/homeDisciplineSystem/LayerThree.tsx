import CustomHeading from "@/components/shared/CustomHeading";
import {
  BsArrowRepeat,
  BsClock,
  BsExclamationTriangle,
  BsShieldExclamation,
  BsSlashCircle,
} from "react-icons/bs";

export default function LayerThree() {
  const interventionMechanisms = [
    "Persistent warning banners",
    "Session-level review prompts",
    "Cooldown recommendations",
    "Mandatory acknowledgement after breaches",
  ];

  const sessionControls = [
    {
      id: 1,
      name: "Max Trades",
      icon: BsSlashCircle,
    },
    {
      id: 2,
      name: "Max Loss",
      icon: BsExclamationTriangle,
    },
    {
      id: 3,
      name: "Consecutive Loss",
      icon: BsArrowRepeat,
    },
    {
      id: 4,
      name: "Time Window",
      icon: BsClock,
    },
  ];

  const reviewSteps = [
    "1. Summary of limits",
    "2. Reflection on changes",
    "3. Explicit acknowledgement",
  ];

  return (
    <section className="py-16 px-4 bg-white dark:bg-gray-900 transition-colors">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-12">
          <span className="text-rose-600 dark:text-rose-400 text-sm font-semibold transition-colors">
            Layer 3
          </span>
          <CustomHeading>How the system intervenes</CustomHeading>
          <p className="text-gray-600 dark:text-gray-400 max-w-3xl transition-colors">
            When behavioral risk increases, the Discipline System introduces
            friction, not advice.
          </p>
        </div>

        {/* Intervention Mechanisms & What this is NOT */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          <div className="bg-rose-50 dark:bg-rose-900/10 rounded-2xl p-6 border border-rose-100 dark:border-rose-900/30 transition-colors">
            <div className="flex items-center gap-2 mb-4">
              <BsShieldExclamation className="w-5 h-5 text-rose-600 dark:text-rose-400" />
              <h3 className="text-lg font-bold text-gray-900 dark:text-white transition-colors">
                Intervention Mechanisms
              </h3>
            </div>
            <ul className="space-y-3">
              {interventionMechanisms.map((mechanism, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 text-gray-700 dark:text-gray-300 transition-colors"
                >
                  <span className="flex items-center gap-1.5 mt-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 dark:bg-rose-400"></span>
                  </span>
                  <span className="text-sm">{mechanism}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* What this is NOT */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 transition-colors">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 transition-colors">
              What this is NOT
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed transition-colors">
              The Discipline System does not block broker trades or place
              orders. It controls process access, not market execution.
            </p>
          </div>
        </div>

        {/* Session-based discipline */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 transition-colors">
            Session-based discipline
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {sessionControls.map((control) => (
              <div
                key={control.id}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm transition-all duration-300 hover:shadow-md hover:scale-[1.02] cursor-pointer group"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center mb-3 transition-all duration-300 group-hover:scale-110">
                    <control.icon className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                  </div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white transition-colors">
                    {control.name}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Review Process Section */}
        <div className="bg-[#0F172A] dark:bg-gray-950 rounded-3xl p-8 md:p-12 transition-colors">
          <div className="text-center max-w-3xl mx-auto mb-8">
            <p className="text-gray-300 dark:text-gray-400 text-base md:text-lg mb-8 transition-colors">
              When a session exceeds critical limits, the system requires a
              structured review before proceeding.
            </p>

            <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-12">
              {reviewSteps.map((step, index) => (
                <div
                  key={index}
                  className="bg-gray-800/50 dark:bg-gray-900/50 rounded-xl px-6 py-3 border border-gray-700 dark:border-gray-800 transition-colors"
                >
                  <p className="text-gray-300 dark:text-gray-400 text-sm transition-colors">
                    {step}
                  </p>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-700 dark:border-gray-800 mb-8"></div>

            <p className="text-white dark:text-gray-200 font-semibold text-lg transition-colors">
              Trading is treated as a privilege earned through process, not
              impulse.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
