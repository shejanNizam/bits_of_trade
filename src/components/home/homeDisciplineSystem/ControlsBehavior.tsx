import { BsCheckLg, BsExclamationTriangle, BsEye } from "react-icons/bs";
import { HiLightningBolt } from "react-icons/hi";
import { TbRefresh } from "react-icons/tb";

export default function ControlsBehavior() {
  const layers = [
    {
      id: 1,
      label: "Layer 1",
      title: "Observation",
      description:
        "Detecting behavioral risk through trade frequency, loss patterns, and session extensions.",
      icon: BsEye,
      iconBgColor: "bg-blue-100 dark:bg-blue-900/30",
      iconColor: "text-blue-600 dark:text-blue-400",
    },
    {
      id: 2,
      label: "Layer 2",
      title: "Intervention",
      description:
        "Introducing friction when risk rises with warnings and review prompts.",
      icon: BsExclamationTriangle,
      iconBgColor: "bg-amber-100 dark:bg-amber-900/30",
      iconColor: "text-amber-600 dark:text-amber-500",
    },
    {
      id: 3,
      label: "Layer 3",
      title: "Review",
      description:
        "Enforcing reflection and acknowledgement when limits are breached.",
      icon: TbRefresh,
      iconBgColor: "bg-rose-100 dark:bg-rose-900/30",
      iconColor: "text-rose-600 dark:text-rose-400",
    },
  ];

  const metrics = [
    "Discipline Score",
    "Rule Adherence Rate",
    "Session Integrity",
    "Mistake Density",
    "Overtrading Index",
    "Control-to-Outcome Ratio",
  ];

  return (
    <section className="py-16 px-4 bg-white dark:bg-gray-900 transition-colors">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 transition-colors">
            Most tools analyze trades.
            <br />
            BitsOfTrade controls behavior.
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto transition-colors">
            Retail traders are told to {"be disciplined"} — but discipline is
            treated as a mindset problem. Institutions know better. They rely on
            systems, limits, and enforcement.
          </p>
        </div>

        {/* Three Layer Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {layers.map((layer) => (
            <div
              key={layer.id}
              className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
            >
              <span className="text-xs text-gray-500 dark:text-gray-400 font-medium mb-3 block transition-colors">
                {layer.label}
              </span>
              <div
                className={`w-12 h-12 rounded-xl ${layer.iconBgColor} flex items-center justify-center mb-4 transition-colors`}
              >
                <layer.icon className={`w-6 h-6 ${layer.iconColor}`} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 transition-colors">
                {layer.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed transition-colors">
                {layer.description}
              </p>
            </div>
          ))}
        </div>

        {/* Metrics Framework Section */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-3xl p-8 md:p-10 border border-gray-100 dark:border-gray-700 transition-colors">
          {/* Header */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center transition-colors">
              <HiLightningBolt className="w-5 h-5 text-amber-600 dark:text-amber-500" />
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white transition-colors">
              The Metrics Framework
            </h3>
          </div>

          {/* Description */}
          <p className="text-gray-600 dark:text-gray-400 mb-2 transition-colors">
            Most platforms measure results. BitsOfTrade measures permission. Our
            metrics are designed to answer:
          </p>
          <p className="text-gray-700 dark:text-gray-300 font-medium mb-8 transition-colors">
            Should this trade have been allowed?
          </p>

          {/* Metrics Grid */}
          <div className="grid md:grid-cols-3 gap-4">
            {metrics.map((metric, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-700/50 rounded-xl p-4 border border-gray-200 dark:border-gray-600 flex items-center gap-3 transition-colors"
              >
                <BsCheckLg className="w-4 h-4 text-amber-600 dark:text-amber-500 shrink-0" />
                <span className="text-sm font-medium text-gray-900 dark:text-white transition-colors">
                  {metric}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12">
          <p className="text-gray-700 dark:text-gray-300 font-medium transition-colors">
            {
              "BitsOfTrade doesn't help you trade more. It helps you stop at the right time."
            }
          </p>
        </div>
      </div>
    </section>
  );
}
