// import { useGetAllJournalQuery } from "@/redux/features/reports/reportsApi";
// import JournalDiscipline from "./JournalDiscipline";
// import MistakeReport from "./MistakeReport";
// import PsychologyReport from "./PsychologyReport";
// import TriggerAnalysis from "./TriggerAnalysis";

// export default function JournalTab() {
//   const { data, isLoading, error } = useGetAllJournalQuery({});

//   if (isLoading) {
//     return (
//       <div className="flex justify-center py-12">
//         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500"></div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="text-center py-12 text-red-500">
//         Failed to load journal data. Please try again.
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-4">
//       <PsychologyReport psychologyReport={data?.psychology_report} />
//       <MistakeReport mistakeReport={data?.mistake_report} />
//       <TriggerAnalysis triggerAnalysis={data?.trigger_analysis} />
//       <JournalDiscipline journalDiscipline={data?.journal_discipline} />
//     </div>
//   );
// }

// JournalTab.tsx
import { useFilters } from "@/contexts/FilterContext";
import { useReportFilters } from "@/hooks/useReportFilters";
import { useGetAllJournalQuery } from "@/redux/features/reports/reportsApi";
import JournalDiscipline from "./JournalDiscipline";
import MistakeReport from "./MistakeReport";
import PsychologyReport from "./PsychologyReport";
import TriggerAnalysis from "./TriggerAnalysis";

export default function JournalTab() {
  const { filters } = useFilters();
  const { data, isLoading, error, refetch } = useGetAllJournalQuery(filters);

  // Refetch when filters change
  useReportFilters(refetch);

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 text-red-500">
        Failed to load journal data. Please try again.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <PsychologyReport psychologyReport={data?.psychology_report} />
      <MistakeReport mistakeReport={data?.mistake_report} />
      <TriggerAnalysis triggerAnalysis={data?.trigger_analysis} />
      <JournalDiscipline journalDiscipline={data?.journal_discipline} />
    </div>
  );
}
