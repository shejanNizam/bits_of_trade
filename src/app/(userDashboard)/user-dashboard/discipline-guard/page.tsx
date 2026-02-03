import ActiveSessionRules from "../components/core/disciplineGuard/ActiveSessionRules";
import CurrentStatus from "../components/core/disciplineGuard/CurrentStatus";
import ViolationsTimeline from "../components/core/disciplineGuard/ViolationsTimeline";

export default function DisciplineGuard() {
  return (
    <div className="space-y-6 sm:space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Discipline Guard
        </h1>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
          A system that protects you from your worst day.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[30%_70%] gap-4 sm:gap-6">
        <CurrentStatus />
        <div className="space-y-4 sm:space-y-6">
          <ViolationsTimeline />
          <ActiveSessionRules />
        </div>
      </div>
    </div>
  );
}
