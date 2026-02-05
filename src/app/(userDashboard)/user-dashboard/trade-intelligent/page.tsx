import { DisciplineHealthSummary } from "../components/analysis/tradeIntelligence/DisciplineHealthSummary";
import FixesForNext from "../components/analysis/tradeIntelligence/FixesForNext";
import { PatternsWeSeeRepeating } from "../components/analysis/tradeIntelligence/PatternsWeSeeRepeating";
import TradeIntelligence from "../components/analysis/tradeIntelligence/TradeIntelligence";
import TradeIntelligenceHeader from "../components/analysis/tradeIntelligence/TradeIntelligenceHeader";
import { WhatHoldingYouBack } from "../components/analysis/tradeIntelligence/WhatHoldingYouBack";
import { WhatYouDoingWell } from "../components/analysis/tradeIntelligence/WhatYouDoingWell";

export default function TradeIntelligentPage() {
  return (
    <div className="space-y-4">
      <TradeIntelligenceHeader />

      <TradeIntelligence />

      <WhatYouDoingWell />

      <WhatHoldingYouBack />

      <PatternsWeSeeRepeating />

      <DisciplineHealthSummary />

      <FixesForNext />
    </div>
  );
}
