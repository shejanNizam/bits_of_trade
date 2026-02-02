import PricingCard from "@/components/pricing/PricingCard";
import CustomHeading from "@/components/shared/CustomHeading";

export default function Pricing() {
  return (
    <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <CustomHeading>Choose the structure you need</CustomHeading>
          <p className="text-gray-600 dark:text-gray-400 mt-2 transition-colors">
            BitsOfTrade is priced by access to systems — not by promises or
            outcomes.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Card 1: Discipline Tools - WITH TOGGLE */}
          <PricingCard
            badge="Behavior Control & Prevention"
            title="Discipline Tools"
            description="Traders who want to control activity, reduce overtrading, and introduce structure."
            colorScheme="blue"
            hasToggle={true}
            monthlyOption={{
              price: "₹499",
              period: "/ month",
              features: [
                "Discipline Guard",
                "Behavior-First Journal",
                "Session & Rule Monitoring",
                "Behavior-Based Reports",
                "Strategy Frameworks",
                "AI Based Insights",
              ],
              buttonText: "Activate Discipline Tools",
              note: "Discipline infrastructure only. No learning included.",
            }}
            yearlyOption={{
              price: "₹4,999",
              period: "/ year",
              features: [
                "Discipline Guard",
                "Behavior-First Journal",
                "Session & Rule Monitoring",
                "Behavior-Based Reports",
                "Strategy Frameworks",
                "AI Based Insights",
              ],
              buttonText: "Activate Discipline Tools (Yearly)",
              note: "Discipline infrastructure only. No learning included.",
              savings: "Save ₹989 with yearly plan",
            }}
          />

          {/* Card 2: Learning Hub - NO TOGGLE */}
          <PricingCard
            badge="Structured Trading Education"
            title="Learning Hub"
            description="Traders building long-term understanding and process."
            colorScheme="amber"
            singleOption={{
              price: "₹2,999",
              period: "/ 6 months",
              features: [
                "Full Learning Hub Access",
                "Risk & Discipline Modules",
                "Structured Curriculum",
                "Access for 6 months",
              ],
              buttonText: "Unlock Learning Hub",
              note: "Educational access only. No discipline tools included.",
            }}
          />

          {/* Card 3: Complete System - COMBO CARD */}
          <PricingCard
            badge="Structure + Understanding"
            title="Complete System"
            description="For traders who want both structure and understanding, working together."
            colorScheme="purple"
            isCombo={true}
            comboOptions={{
              monthly: {
                title: "Monthly Combo",
                price: "₹2,799",
                features: ["1 month Discipline Tools", "6 months Learning Hub"],
                buttonText: "Get Complete System",
                note: "Ideal for trying the full system before committing long-term.",
              },
              yearly: {
                title: "Annual Combo",
                price: "₹6,999",
                period: "/yr",
                features: [
                  "12 months Discipline Tools",
                  "6 months Learning Hub",
                ],
                buttonText: "Commit for a Year",
                note: "Best value for traders committed to consistency",
                buttonVariant: "solid",
              },
            }}
          />
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
