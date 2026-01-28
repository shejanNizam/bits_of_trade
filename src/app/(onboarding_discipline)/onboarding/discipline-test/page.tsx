// export default function DisciplineTestPage() {
//   return (
//     <div>
//       <h3 className="flex justify-center items-center h-screen">
//         DisciplineTest comming soon ...
//       </h3>
//     </div>
//   );
// }

"use client";

import { DisciplineTestFlow } from "@/components/onboarding/DisciplineTestFlow";
import { ReportTabs } from "@/components/onboarding/ReportTabs";
import { useSearchParams } from "next/navigation";

export default function DisciplineTestPage() {
  const searchParams = useSearchParams();
  const view = searchParams.get("view");

  if (view === "report") {
    return <ReportTabs />;
  }

  return <DisciplineTestFlow />;
}
