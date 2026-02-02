import CustomHeading from "@/components/shared/CustomHeading";
import ChasingOutcomes from "./ChasingOutcomes";
import DisciplineSystemWorks from "./DisciplineSystemWorks";
import LayerTwo from "./LayerTwo";
import NotAnotherTradingTools from "./NotAnotherTradingTools";

export default function HomeDisciplineSystem() {
  return (
    <>
      <NotAnotherTradingTools />

      {/* Discipline System Section */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900 transition-colors">
        <div className="container mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-8">
            <CustomHeading>Discipline System</CustomHeading>
            <p className="text-gray-600 dark:text-gray-400 max-w-3xl mb-6 transition-colors">
              A detailed explanation of how BitsOfTrade observes behavior,
              introduces friction, and enforces review when trading discipline
              breaks down.
            </p>

            {/* Info Notice */}
            {/* <div className="flex items-start gap-3 p-4 bg-white dark:bg-gray-800 border-l-4 border-gray-300 dark:border-gray-600 rounded-r-lg max-w-3xl transition-colors shadow-sm">
              <div className="text-gray-500 dark:text-gray-400 text-sm transition-colors">
                This page explains system behavior. It does not provide trading
                advice.
              </div>
            </div> */}
          </div>

          <DisciplineSystemWorks />
        </div>
      </section>

      {/* <LayerOne /> */}
      <LayerTwo />
      {/* <LayerThree /> */}
      {/* <ControlsBehavior /> */}
      <ChasingOutcomes />
    </>
  );
}
