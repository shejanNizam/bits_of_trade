import Link from "next/link";

export default function LearnMoreAbout() {
  const cards = [
    {
      title: "Discipline System",
      description: "Deep walkthrough of enforcement logic",
      href: "/discipline-system",
    },
    {
      title: "Learning Hub",
      description: "Structured education & frameworks",
      href: "/learning-hub",
    },
    {
      title: "Pricing",
      description: "Access levels & plans",
      href: "/pricing",
    },
  ];

  return (
    <section className="py-16 px-4 bg-white dark:bg-gray-900">
      <div className="container mx-auto max-w-5xl">
        <p className="text-center text-primary dark:text-[#60A5FA] font-medium mb-8">
          Learn more about
        </p>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {cards.map((card, index) => (
            <Link
              key={index}
              href={card.href}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-blue-200 dark:hover:border-blue-500 group"
            >
              <h3 className="font-bold text-gray-900 dark:text-white mb-2 group-hover:text-[#3B82F6] dark:group-hover:text-[#60A5FA] transition-colors duration-300">
                {card.title}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                {card.description}
              </p>
            </Link>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <Link
            href="/discipline-system"
            className="w-full sm:w-auto px-6 py-3 rounded-full border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white font-medium text-center transition-all duration-300 hover:border-gray-900 dark:hover:border-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            Explore Discipline System
          </Link>
          <Link
            href="/onboarding/discipline-test"
            className="w-full sm:w-auto px-6 py-3 rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-medium text-center transition-all duration-300 hover:bg-gray-800 dark:hover:bg-gray-100"
          >
            Take the Discipline Test
          </Link>
        </div>

        <p className="text-center text-gray-400 dark:text-gray-500 text-sm">
          Discipline is not motivation. It is structure.
        </p>
      </div>
    </section>
  );
}
