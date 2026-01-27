import CustomHeading from "@/components/shared/CustomHeading";
import CustomSecondaryButton from "@/components/shared/CustomSecondaryButton";
import { BsCheckLg } from "react-icons/bs";

interface PricingPlan {
  id: number;
  name: string;
  price: string;
  period: string;
  annualNote?: string;
  includes: string[];
  bestFor: string;
  buttonText: string;
  featured?: boolean;
  badge?: string;
  color: string;
}

export default function Pricing() {
  const plans: PricingPlan[] = [
    {
      id: 1,
      name: "Discipline Tools",
      price: "₹499",
      period: "/ month",
      annualNote: "or ₹4,999 annually (save ₹989)",
      includes: [
        "Discipline Guard",
        "Behavior-first Journal",
        "Session & rule monitoring",
        "Behavior-based reports",
      ],
      bestFor: "Traders who want to control activity and reduce overtrading",
      buttonText: "Activate Discipline Tools",
      color: "blue",
    },
    {
      id: 2,
      name: "Learning Hub",
      price: "₹2,999",
      period: "/ 6 months",
      includes: [
        "Full Learning Hub access",
        "Risk & discipline modules",
        "Strategy frameworks",
        "Structured curriculum",
      ],
      bestFor: "Traders building long-term understanding and process",
      buttonText: "Unlock Learning Hub",
      color: "amber",
    },
    {
      id: 3,
      name: "Complete System",
      price: "₹6,999",
      period: "/ year",
      annualNote: "or ₹7,999 monthly combo",
      includes: [
        "12 months Discipline Tools",
        "6 months Learning Hub (included)",
        "All future updates",
        "Priority support",
      ],
      bestFor: "Traders committed to consistency",
      buttonText: "Commit for a Year",
      featured: true,
      badge: "Best Value",
      color: "blue",
    },
  ];

  return (
    <section className="py-16 px-4 bg-white dark:bg-gray-900 transition-colors">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12">
          <CustomHeading>Choose the structure you need</CustomHeading>
          <p className="text-gray-600 dark:text-gray-400 transition-colors">
            BitsOfTrade is priced by access to systems — not by promises or
            outcomes.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`${
                plan.featured
                  ? "bg-[#0F1829] dark:bg-gray-950 border-blue-500"
                  : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
              } rounded-3xl p-8 border-2 shadow-lg transition-all duration-300 hover:scale-[1.02] relative`}
            >
              {/* Badge */}
              {plan.badge && (
                <div className="absolute -top-3 right-6">
                  <span className="bg-primary text-white text-xs font-bold px-4 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg">
                    <span className="text-lg">✨</span>
                    {plan.badge}
                  </span>
                </div>
              )}

              {/* Plan Name */}
              <div className="mb-6">
                <h3
                  className={`text-sm font-semibold mb-4 ${
                    plan.featured
                      ? "text-white"
                      : plan.color === "blue"
                        ? "text-blue-600 dark:text-blue-400"
                        : "text-amber-600 dark:text-amber-400"
                  } transition-colors`}
                >
                  {plan.name}
                </h3>

                {/* Price */}
                <div className="flex items-baseline gap-2 mb-2">
                  <span
                    className={`text-4xl md:text-5xl font-bold ${
                      plan.featured
                        ? "text-white"
                        : "text-gray-900 dark:text-white"
                    } transition-colors`}
                  >
                    {plan.price}
                  </span>
                  <span
                    className={`text-sm ${
                      plan.featured
                        ? "text-gray-400"
                        : "text-gray-500 dark:text-gray-400"
                    } transition-colors`}
                  >
                    {plan.period}
                  </span>
                </div>

                {/* Annual Note */}
                {plan.annualNote && (
                  <p
                    className={`text-xs ${
                      plan.featured
                        ? "text-gray-500"
                        : "text-gray-400 dark:text-gray-500"
                    } transition-colors`}
                  >
                    {plan.annualNote}
                  </p>
                )}
              </div>

              {/* Includes Section */}
              <div className="mb-6">
                <p
                  className={`text-sm font-semibold mb-4 ${
                    plan.featured
                      ? "text-gray-300"
                      : "text-gray-900 dark:text-white"
                  } transition-colors`}
                >
                  Includes:
                </p>
                <ul className="space-y-3">
                  {plan.includes.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <BsCheckLg
                        className={`w-4 h-4 shrink-0 mt-0.5 ${
                          plan.featured
                            ? "text-blue-400"
                            : "text-emerald-500 dark:text-emerald-400"
                        }`}
                      />
                      <span
                        className={`text-sm ${
                          plan.featured
                            ? "text-gray-300"
                            : "text-gray-700 dark:text-gray-300"
                        } transition-colors`}
                      >
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Best For Section */}
              <div className="mb-6">
                <p
                  className={`text-xs ${
                    plan.featured ? "text-white" : "text-black dark:text-white"
                  } mb-2 transition-colors`}
                >
                  <span className="font-semibold">Best for:</span>{" "}
                  {plan.bestFor}
                </p>
              </div>

              {/* CTA Button */}
              <CustomSecondaryButton className="w-full">
                {plan.buttonText}
              </CustomSecondaryButton>
            </div>
          ))}
        </div>

        {/* Footer Disclaimer */}
        <p className="text-center text-xs text-gray-500 dark:text-gray-400 max-w-4xl mx-auto transition-colors">
          BitsOfTrade does not provide investment advice. All pricing reflects
          access to tools and educational content only.
        </p>
      </div>
    </section>
  );
}
