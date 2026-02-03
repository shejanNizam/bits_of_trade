import ActiveSessionRules from "../components/core/disciplineGuard/ActiveSessionRules";
import CurrentStatus from "../components/core/disciplineGuard/CurrentStatus";
import ViolationsTimeline from "../components/core/disciplineGuard/ViolationsTimeline";

export default function DisciplineGuard() {
  return (
    <div className="flex justify-center items-center gap-2">
      <CurrentStatus />
      <div>
        <ViolationsTimeline />
        <ActiveSessionRules />
      </div>
    </div>
  );
}
