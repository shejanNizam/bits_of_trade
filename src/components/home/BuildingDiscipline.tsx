import CustomPrimaryButton from "../shared/CustomPrimaryButton";
import CustomSecondaryButton from "../shared/CustomSecondaryButton";

interface CTACard {
  id: number;
  title: string;
  subtitle: string;
  buttonText: string;
  featured?: boolean;
}

export default function BuildingDiscipline() {
  const ctaCards: CTACard[] = [
    {
      id: 1,
      title: "Take the Discipline Test",
      subtitle: "No trading data required",
      buttonText: "Start Test",
    },
    {
      id: 2,
      title: "Activate Discipline Tools",
      subtitle: "Designed to reduce overtrading",
      buttonText: "Get Tools",
    },
    {
      id: 3,
      title: "Unlock Learning Hub",
      subtitle: "Risk & discipline focused",
      buttonText: "Start Learning",
    },
    {
      id: 4,
      title: "Get Complete System",
      subtitle: "Best for long-term traders",
      buttonText: "Get Started",
      featured: true,
    },
  ];

  return (
    <section className="py-16 px-4 bg-[#0A0F1E] dark:bg-gray-950 transition-colors">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Start building discipline today
          </h2>
          <p className="text-gray-400 dark:text-gray-500 transition-colors">
            Choose the path that matches your commitment level
          </p>
        </div>

        {/* CTA Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ctaCards.map((card) => (
            <div
              key={card.id}
              className="bg-gray-800/50 dark:bg-gray-900/50 rounded-2xl p-6 border border-gray-700 dark:border-gray-800 transition-all duration-300 hover:scale-[1.02] hover:border-gray-600 dark:hover:border-gray-700"
            >
              {/* Card Content */}
              <div className="mb-6">
                <h3 className="text-white font-bold text-lg mb-2">
                  {card.title}
                </h3>
                <p className="text-gray-400 dark:text-gray-500 text-sm transition-colors">
                  {card.subtitle}
                </p>
              </div>

              {/* CTA Button */}
              {card?.featured ? (
                <>
                  <CustomPrimaryButton className="w-full">
                    {card.buttonText}
                  </CustomPrimaryButton>
                </>
              ) : (
                <>
                  <CustomSecondaryButton className="w-full">
                    {card.buttonText}
                  </CustomSecondaryButton>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
