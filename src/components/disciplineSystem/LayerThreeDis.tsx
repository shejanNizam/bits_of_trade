import { BsShield } from "react-icons/bs";

interface Mechanism {
  id: number;
  text: string;
}

export default function LayerThreeDis() {
  const interventionMechanisms: Mechanism[] = [
    { id: 1, text: "Persistent warning banners" },
    { id: 2, text: "Session-level review prompts" },
    { id: 3, text: "Cooldown recommendations" },
    { id: 4, text: "Mandatory acknowledgement after breaches" },
  ];

  return (
    <div className="py-8">
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:scale-[1.01]">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center transition-all duration-300 hover:scale-110">
            <BsShield className="w-5 h-5 text-blue-600 dark:text-blue-400 transition-colors" />
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white transition-colors">
            Layer 3 — Intervention & Friction
          </h2>
        </div>

        <p className="text-gray-700 dark:text-gray-300 mb-8 transition-colors">
          When behavioral risk increases, the Discipline System introduces
          friction, not advice.
        </p>

        <h3 className="text-base font-bold text-gray-900 dark:text-white mb-4 transition-colors">
          Intervention mechanisms:
        </h3>

        <div className="space-y-3 mb-8">
          {interventionMechanisms.map((mechanism) => (
            <div
              key={mechanism.id}
              className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 hover:bg-gray-100 dark:hover:bg-gray-700 hover:scale-[1.02] transition-all duration-300 cursor-pointer"
            >
              <div className="flex items-start gap-3">
                <span className="text-gray-400 dark:text-gray-500 mt-1 shrink-0 transition-colors">
                  •
                </span>
                <p className="text-sm text-gray-700 dark:text-gray-300 transition-colors">
                  {mechanism.text}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-900/50 rounded-xl p-6 hover:scale-[1.02] hover:shadow-md transition-all duration-300">
          <h4 className="text-base font-bold text-amber-900 dark:text-amber-300 mb-3 transition-colors">
            What this is NOT
          </h4>
          <p className="text-sm text-amber-800 dark:text-amber-200 transition-colors">
            The Discipline System does not block broker trades or place orders.
            It controls process access, not market execution.
          </p>
        </div>
      </div>
    </div>
  );
}
