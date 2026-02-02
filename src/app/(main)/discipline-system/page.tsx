import AfterBreach from "@/components/disciplineSystem/AfterBreach";
import CanNotRely from "@/components/disciplineSystem/CanNotRely";
import LayerOneDis from "@/components/disciplineSystem/LayerOneDis";
import LayerThreeDis from "@/components/disciplineSystem/LayerThreeDis";
import LayerTwoDis from "@/components/disciplineSystem/LayerTwoDis";
import SessionBasedDis from "@/components/disciplineSystem/SessionBasedDis";
import CustomBanner from "@/components/shared/CustomBanner";
import CustomPrimaryButton from "@/components/shared/CustomPrimaryButton";
import CustomSecondaryButton from "@/components/shared/CustomSecondaryButton";
import Link from "next/link";

export default function DisciplineSystem() {
  const systemLayers = [
    {
      id: 1,
      number: "1",
      title: "Observation",
      description: "detecting behavioral risk",
      borderColor: "border-l-blue-500",
      numberColor: "text-blue-500",
    },
    {
      id: 2,
      number: "2",
      title: "Intervention",
      description: "introducing friction when risk rises",
      borderColor: "border-l-amber-500",
      numberColor: "text-amber-500",
    },
    {
      id: 3,
      number: "3",
      title: "Review",
      description: "enforcing reflection when limits are breached",
      borderColor: "border-l-rose-500",
      numberColor: "text-rose-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <CustomBanner
        title="Discipline System"
        subtitle="A detailed explanation of how BitsOfTrade observes behavior, introduces friction, and enforces review when trading discipline breaks down."
      >
        <p className="text-gray-400 dark:text-gray-500 text-xs md:text-sm transition-colors">
          This page explains system behavior. It does not provide trading
          advice.
        </p>
      </CustomBanner>

      <div className="container mx-auto max-w-6xl px-4 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-2xl border-2 border-blue-500 dark:border-blue-400 p-8 md:p-10 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.01] mb-8">
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3 transition-colors">
              How the Discipline System works
            </h2>
            <p className="text-gray-600 dark:text-gray-400 transition-colors">
              The Discipline System operates in three continuous layers:
            </p>
          </div>

          <div className="space-y-6 mb-8">
            {systemLayers.map((layer) => (
              <div
                key={layer.id}
                className={`border-l-4 ${layer.borderColor} pl-6 py-2 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-r-lg transition-all duration-300`}
              >
                <div className="flex items-start gap-4">
                  <span
                    className={`text-3xl font-bold ${layer.numberColor} transition-colors`}
                  >
                    {layer.number}
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 transition-colors">
                      {layer.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm transition-colors">
                      {layer.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="text-gray-500 dark:text-gray-400 text-sm transition-colors">
            Each layer operates independently of market direction or P&L.
          </p>
        </div>

        <LayerOneDis />
        <LayerTwoDis />
        <LayerThreeDis />
        <SessionBasedDis />
        <AfterBreach />
        <CanNotRely />

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/discipline-tools">
            <CustomSecondaryButton>View Discipline Tools</CustomSecondaryButton>
          </Link>
          <Link href="/discipline-test">
            <CustomPrimaryButton>View Discipline Tools</CustomPrimaryButton>
          </Link>
        </div>
      </div>
    </div>
  );
}
