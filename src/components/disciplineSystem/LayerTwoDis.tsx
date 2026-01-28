import { FiTarget } from "react-icons/fi";

interface RiskState {
  id: number;
  title: string;
  items: string[];
  bgColor: string;
  titleColor: string;
}

export default function LayerTwoDis() {
  const riskStates: RiskState[] = [
    {
      id: 1,
      title: "Normal",
      items: ["Behavior within defined limits", "No system intervention"],
      bgColor: "bg-emerald-50 dark:bg-emerald-900/20",
      titleColor: "text-emerald-700 dark:text-emerald-400",
    },
    {
      id: 2,
      title: "Caution",
      items: [
        "One or more limits are being approached",
        "System introduces warnings and review prompts",
      ],
      bgColor: "bg-amber-50 dark:bg-amber-900/20",
      titleColor: "text-amber-700 dark:text-amber-400",
    },
    {
      id: 3,
      title: "Breached",
      items: [
        "One or more limits are exceeded",
        "Review becomes mandatory before continuation",
      ],
      bgColor: "bg-rose-50 dark:bg-rose-900/20",
      titleColor: "text-rose-700 dark:text-rose-400",
    },
  ];

  return (
    <div className="py-8">
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:scale-[1.01]">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center transition-colors group-hover:scale-110">
            <FiTarget className="w-5 h-5 text-amber-600 dark:text-amber-400 transition-colors" />
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white transition-colors">
            Layer 2 — Risk States
          </h2>
        </div>

        <p className="text-gray-700 dark:text-gray-300 mb-8 transition-colors">
          Based on observed behavior, each session is continuously classified
          into one of three risk states.
        </p>

        <div className="space-y-6 mb-8">
          {riskStates.map((state) => (
            <div
              key={state.id}
              className={`${state.bgColor} rounded-xl p-6 border border-gray-200 dark:border-gray-700/50 hover:scale-[1.02] hover:shadow-md transition-all duration-300 cursor-pointer`}
            >
              {/* State Title */}
              <h3
                className={`text-lg font-bold ${state.titleColor} mb-4 transition-colors`}
              >
                {state.title}
              </h3>

              <ul className="space-y-2">
                {state.items.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 text-gray-700 dark:text-gray-300 transition-colors"
                  >
                    <span className="text-gray-400 dark:text-gray-500 mt-1 shrink-0 transition-colors">
                      •
                    </span>
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="text-xs text-gray-500 dark:text-gray-400 italic transition-colors">
          Risk states describe behavior, not performance.
        </p>
      </div>
    </div>
  );
}
