/* eslint-disable @typescript-eslint/no-unused-vars */
import { useGetAllJournalStreakQuery } from "@/redux/features/journal/journalApi";
import { useEffect, useState } from "react";

const INITIAL_MONTH = 0;
const INITIAL_YEAR = 1970;

export default function JournalStreak() {
  const { data, isLoading } = useGetAllJournalStreakQuery({});
  const [calendarData, setCalendarData] = useState<boolean[]>(
    Array(31).fill(false),
  );
  const [currentMonth, setCurrentMonth] = useState(INITIAL_MONTH);
  const [currentYear, setCurrentYear] = useState(INITIAL_YEAR);

  useEffect(() => {
    const now = new Date();

    setCurrentMonth(now.getMonth());
    setCurrentYear(now.getFullYear());
  }, []);

  useEffect(() => {
    if (data?.this_month_active_dates) {
      // Get the current month and year
      const now = new Date();
      const year = now.getFullYear();
      const month = now.getMonth();

      setCurrentMonth(month);
      setCurrentYear(year);

      // Create an array for all days in the current month
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      const activeDates = new Array(daysInMonth).fill(false);

      // Mark active dates
      data.this_month_active_dates.forEach((dateString: string) => {
        const date = new Date(dateString);
        if (date.getMonth() === month && date.getFullYear() === year) {
          const dayOfMonth = date.getDate();
          activeDates[dayOfMonth - 1] = true;
        }
      });

      setCalendarData(activeDates);
    }
  }, [data]);

  const streak = data?.current_streak || 0;
  const activeDates = data?.this_month_active_dates || [];

  // Get month name
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const currentMonthName = monthNames[currentMonth];
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  // Day labels for calendar header
  const dayLabels = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  // Get first day of month (0 = Sunday, 1 = Monday, etc.)
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 sm:p-6">
      <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
        Journal Streak
      </h3>
      <div className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-1">
        {streak}
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        Consecutive days
      </p>

      {/* Calendar Grid */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
            {currentMonthName} {currentYear}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {activeDates.length} days journaled
          </p>
        </div>

        {/* Day Labels */}
        <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-2">
          {dayLabels.map((day, index) => (
            <div
              key={index}
              className="text-center text-xs font-medium text-gray-500 dark:text-gray-400"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1 sm:gap-2">
          {/* Empty cells for days before the first day of month */}
          {Array.from({ length: firstDayOfMonth }).map((_, index) => (
            <div
              key={`empty-${index}`}
              className="aspect-square rounded bg-transparent"
            />
          ))}

          {/* Actual days of the month */}
          {calendarData.map((hasEntry, index) => (
            <div
              key={index}
              className={`aspect-square rounded transition-all duration-200 ${
                hasEntry
                  ? "bg-green-500 dark:bg-green-400 shadow-sm"
                  : "bg-gray-200 dark:bg-gray-700"
              }`}
              title={
                hasEntry
                  ? `Journaled on ${currentMonthName} ${index + 1}`
                  : `No entry on ${currentMonthName} ${index + 1}`
              }
            />
          ))}
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Loading streak data...
          </p>
        </div>
      )}

      {/* Legend */}
      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-green-500 dark:bg-green-400"></div>
            <span className="text-xs text-gray-600 dark:text-gray-400">
              Journaled
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-gray-200 dark:bg-gray-700"></div>
            <span className="text-xs text-gray-600 dark:text-gray-400">
              No entry
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
