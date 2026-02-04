import JournalDiscipline from "./JournalDiscipline";
import MistakeReport from "./MistakeReport";
import PsychologyReport from "./PsychologyReport";
import TriggerAnalysis from "./TriggerAnalysis";

export default function JournalTab() {
  return (
    <div className="space-y-4">
      <PsychologyReport />

      <MistakeReport />

      <TriggerAnalysis />

      <JournalDiscipline />
    </div>
  );
}
