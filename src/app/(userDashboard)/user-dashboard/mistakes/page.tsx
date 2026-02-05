import MistakeFrequency from "../components/system/mistakes/MistakeFrequency";
import MistakeImpact from "../components/system/mistakes/MistakeImpact";
import MistakeOverview from "../components/system/mistakes/MistakeOverview";
import SeverityDistribution from "../components/system/mistakes/SeverityDistribution";

export default function MistakesPage() {
  return (
    <div className="space-y-4">
      <MistakeOverview />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <MistakeFrequency />
        <MistakeImpact />
      </div>

      <SeverityDistribution />
    </div>
  );
}
