import { BsExclamationTriangle, BsEye } from "react-icons/bs";
import { TbRefresh } from "react-icons/tb";

interface LayerCard {
  id: number;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  iconBgColor: string;
  iconColor: string;
}

export default function DisciplineSystemWorks() {
  const layers: LayerCard[] = [
    {
      id: 1,
      title: "1. Observation",
      description:
        "Continuous monitoring of trading frequency, sizing, and loss patterns.",
      icon: BsEye,
      iconBgColor: "bg-blue-100 dark:bg-blue-900/30",
      iconColor: "text-blue-600 dark:text-blue-400",
    },
    {
      id: 2,
      title: "2. Intervention",
      description:
        "Real-time warnings and friction introduced when risk thresholds are approached.",
      icon: BsExclamationTriangle,
      iconBgColor: "bg-yellow-100 dark:bg-yellow-900/30",
      iconColor: "text-yellow-600 dark:text-yellow-500",
    },
    {
      id: 3,
      title: "3. Review",
      description:
        "Mandatory pause and reflection required when limits are breached.",
      icon: TbRefresh,
      iconBgColor: "bg-emerald-100 dark:bg-emerald-900/30",
      iconColor: "text-emerald-600 dark:text-emerald-500",
    },
  ];

  return (
    <div>
      {/* How it Works Section */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 mb-12 relative shadow-sm transition-colors">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6 transition-colors">
            How the Discipline System works
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-base md:text-lg leading-relaxed transition-colors">
            The Discipline System operates in three continuous layers:{" "}
            <span className="font-semibold text-gray-900 dark:text-white transition-colors">
              Observation
            </span>{" "}
            – detecting behavioral risk,{" "}
            <span className="font-semibold text-gray-900 dark:text-white transition-colors">
              Intervention
            </span>{" "}
            – introducing friction when risk rises, and{" "}
            <span className="font-semibold text-gray-900 dark:text-white transition-colors">
              Review
            </span>{" "}
            – enforcing reflection when limits are breached. Each layer operates
            independently of market direction or P&L.
          </p>
        </div>
      </div>

      {/* Three Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        {layers.map((layer) => (
          <div
            key={layer.id}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:shadow-xl hover:scale-[1.02] cursor-pointer group"
          >
            <div
              className={`w-12 h-12 rounded-xl ${layer.iconBgColor} flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110`}
            >
              <layer.icon className={`w-6 h-6 ${layer.iconColor}`} />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 transition-colors">
              {layer.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm transition-colors">
              {layer.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
