import { IconType } from "react-icons";
import { BsJournalBookmark } from "react-icons/bs";
import { HiOutlineShieldCheck } from "react-icons/hi";
import { IoBookOutline } from "react-icons/io5";
import CustomHeading from "../shared/CustomHeading";

type ColorScheme = "purple" | "blue" | "green";

interface CardProps {
  icon: IconType;
  title: string;
  subtitle: string;
  description: string;
  listItems?: string[];
  bottomText: string;
  colorScheme: ColorScheme;
}

interface ColorClasses {
  iconBg: string;
  hoverBorder: string;
  hoverTitle: string;
  subtitleText: string;
  bulletColor: string;
}

// Reusable Card Component
function Card({
  icon: Icon,
  title,
  subtitle,
  description,
  listItems,
  bottomText,
  colorScheme,
}: CardProps) {
  const colorClasses: Record<ColorScheme, ColorClasses> = {
    purple: {
      iconBg: "bg-[#8B5CF6]",
      hoverBorder: "hover:border-[#8B5CF6]/30 dark:hover:border-[#8B5CF6]/50",
      hoverTitle: "group-hover:text-[#8B5CF6]",
      subtitleText: "text-[#8B5CF6] dark:text-[#A78BFA]",
      bulletColor: "bg-[#8B5CF6] dark:bg-[#A78BFA]",
    },
    blue: {
      iconBg: "bg-[#3B82F6]",
      hoverBorder: "hover:border-[#3B82F6]/30 dark:hover:border-[#3B82F6]/50",
      hoverTitle: "group-hover:text-[#3B82F6]",
      subtitleText: "text-[#3B82F6] dark:text-[#60A5FA]",
      bulletColor: "bg-[#3B82F6] dark:bg-[#60A5FA]",
    },
    green: {
      iconBg: "bg-[#10B981]",
      hoverBorder: "hover:border-[#10B981]/30 dark:hover:border-[#10B981]/50",
      hoverTitle: "group-hover:text-[#10B981]",
      subtitleText: "text-[#10B981] dark:text-[#34D399]",
      bulletColor: "bg-[#10B981] dark:bg-[#34D399]",
    },
  };

  const colors = colorClasses[colorScheme];

  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col transition-all duration-300 hover:shadow-xl hover:scale-[1.02] ${colors.hoverBorder} cursor-pointer group`}
    >
      <div
        className={`w-12 h-12 rounded-xl ${colors.iconBg} flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110`}
      >
        <Icon className="w-6 h-6 text-white" />
      </div>
      <h3
        className={`text-lg font-bold text-gray-900 dark:text-white mb-1 ${colors.hoverTitle} transition-colors duration-300`}
      >
        {title}
      </h3>
      <p className={`${colors.subtitleText} text-sm font-medium mb-3`}>
        {subtitle}
      </p>
      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 grow">
        {description}
      </p>

      {listItems && (
        <ul className="space-y-2 mb-4 grow">
          {listItems.map((point: string, index: number) => (
            <li
              key={index}
              className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300"
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${colors.bulletColor} transition-transform duration-300 group-hover:scale-150`}
              ></span>
              {point}
            </li>
          ))}
        </ul>
      )}

      <p className="text-gray-800 dark:text-gray-200 text-sm font-semibold">
        {bottomText}
      </p>
    </div>
  );
}

export default function ActuallyDoes() {
  const journalPoints: string[] = [
    "Decision context",
    "Rule adherence",
    "Emotional triggers",
    "Session discipline",
  ];

  const learningHubPoints: string[] = [
    "Market structure",
    "Risk and positioning",
    "Discipline systems",
    "Strategy frameworks",
  ];

  return (
    <section className="py-16 px-4 bg-white dark:bg-gray-900">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-10">
          <CustomHeading>What BitsOfTrade actually does</CustomHeading>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl">
            Most tools analyze trades after damage is done. BitsOfTrade focuses
            on behavior before mistakes repeat.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1 - Discipline Guard */}
          <Card
            icon={HiOutlineShieldCheck}
            title="Discipline Guard"
            subtitle="Detects behavioral risk early"
            description="Discipline Guard continuously observes patterns that usually lead to overtrading such as increased trade frequency, loss-streak escalation, session fatigue, and rule drift after profits."
            bottomText="It does not predict markets. It observes how you behave inside them."
            colorScheme="purple"
          />

          {/* Card 2 - Journal */}
          <Card
            icon={BsJournalBookmark}
            title="Journal"
            subtitle="Reflection before results"
            description="Instead of focusing only on P&L, the journal forces structured reflection on:"
            listItems={journalPoints}
            bottomText="Trades are inputs. Behavior is the primary signal."
            colorScheme="blue"
          />

          {/* Card 3 - Learning Hub */}
          <Card
            icon={IoBookOutline}
            title="Learning Hub"
            subtitle="Risk-first education"
            description="The Learning Hub focuses on:"
            listItems={learningHubPoints}
            bottomText="Learning supports your process — it does not override it with predictions."
            colorScheme="green"
          />
        </div>

        {/* Bottom Text */}
        <p className="text-center text-gray-500 dark:text-gray-400 text-sm mt-10">
          BitsOfTrade is a discipline and learning system built around capital
          protection.
        </p>
      </div>
    </section>
  );
}
