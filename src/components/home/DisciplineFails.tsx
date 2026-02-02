import { IconType } from "react-icons";
import { FaExclamationTriangle } from "react-icons/fa";
import { HiShieldCheck } from "react-icons/hi";
import { IoAnalytics } from "react-icons/io5";
import CustomHeading from "../shared/CustomHeading";

type ColorScheme = "red" | "purple" | "blue";

interface CardProps {
  icon: IconType;
  title: string;
  description: string;
  children: React.ReactNode;
  colorScheme: ColorScheme;
}

interface ColorClasses {
  iconBg: string;
  iconColor: string;
  hoverBorder: string;
}

// Reusable Card Component
function Card({
  icon: Icon,
  title,
  description,
  children,
  colorScheme,
}: CardProps) {
  const colorClasses: Record<ColorScheme, ColorClasses> = {
    red: {
      iconBg: "bg-red-50 dark:bg-red-200",
      iconColor: "text-red-500",
      hoverBorder: "hover:border-red-200 dark:hover:border-red-400",
    },
    purple: {
      iconBg: "bg-purple-50 dark:bg-purple-200",
      iconColor: "text-purple-500",
      hoverBorder: "hover:border-purple-200 dark:hover:border-purple-400",
    },
    blue: {
      iconBg: "bg-blue-50 dark:bg-blue-200",
      iconColor: "text-blue-500",
      hoverBorder: "hover:border-blue-200 dark:hover:border-blue-400",
    },
  };

  const colors = colorClasses[colorScheme];

  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:shadow-xl hover:scale-[1.02] ${colors.hoverBorder} cursor-pointer group flex flex-col`}
    >
      <div
        className={`w-12 h-12 rounded-xl ${colors.iconBg} flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110`}
      >
        <Icon className={`w-5 h-5 ${colors.iconColor}`} />
      </div>
      <h3
        className={`text-lg font-bold mb-2 text-gray-900 dark:text-white transition-colors duration-300`}
      >
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
        {description}
      </p>
      {children}
    </div>
  );
}

export default function DisciplineFails() {
  const realityPoints: string[] = [
    "Limits",
    "Controls",
    "Risk desks",
    "Forced stop mechanisms",
  ];

  return (
    <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto max-w-7xl">
        <CustomHeading>Why discipline fails for most traders</CustomHeading>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1 - The Myth */}
          <Card
            icon={FaExclamationTriangle}
            title="The Myth"
            description="Retail traders are told:"
            colorScheme="red"
          >
            <div className="mt-auto border-l-4 border-red-400 pl-4 py-1 transition-all duration-300 group-hover:border-red-500 group-hover:bg-red-50 dark:group-hover:bg-red-500/20 group-hover:rounded-r-lg">
              {/* ✅ Added mt-auto to align with Card 3 */}
              <p className="text-xl w-[90%] font-bold text-gray-900 dark:text-white">
                {"If you lose money, you lack discipline."}
              </p>
            </div>
          </Card>

          {/* Card 2 - The Reality */}
          <Card
            icon={HiShieldCheck}
            title="The Reality"
            description="Institutions don't rely on willpower. They rely on:"
            colorScheme="purple"
          >
            <ul className="space-y-2 mt-auto">
              {realityPoints.map((point: string, index: number) => (
                <li
                  key={index}
                  className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500 transition-transform duration-300 group-hover:scale-150"></span>
                  {point}
                </li>
              ))}
            </ul>
          </Card>

          {/* Card 3 - The Gap */}
          <Card
            icon={IoAnalytics}
            title="The Gap"
            description="Retail traders were given charts, indicators, and strategies but no system to stop themselves."
            colorScheme="blue"
          >
            <div className="mt-auto bg-blue-50 dark:bg-blue-900/20 rounded-xl px-2 py-1 transition-all duration-300 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/40 group-hover:shadow-md">
              <p className="text-xl font-bold text-gray-900 dark:text-white">
                {
                  "Discipline was treated as a personal flaw. It's actually a system problem."
                }
              </p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
