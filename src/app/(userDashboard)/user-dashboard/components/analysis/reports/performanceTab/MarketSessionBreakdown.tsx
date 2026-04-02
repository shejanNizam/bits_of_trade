"use client";

interface MarketSessionBreakdownProps {
  marketSessionBreakdown: Array<{
    session: string;
    percent_trades: number;
  }>;
}

export default function MarketSessionBreakdown({
  marketSessionBreakdown,
}: MarketSessionBreakdownProps) {
  if (!marketSessionBreakdown || marketSessionBreakdown.length === 0)
    return null;

  const getSessionTime = (session: string) => {
    switch (session) {
      case "Early Morning":
        return "9:15-11:00";
      case "Late Morning":
        return "11:00-12:30";
      case "Midday":
        return "12:30-1:30";
      case "Afternoon":
        return "1:30-2:30";
      case "Closing":
        return "2:30-3:30";
      default:
        return "";
    }
  };

  return (
    <div className="w-full bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-3xl p-6 shadow-sm mt-6">
      <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-6">
        Market Session Breakdown
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {marketSessionBreakdown.map((session, idx) => (
          <div
            key={idx}
            className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-2xl border border-gray-50 dark:border-gray-800"
          >
            <p className="text-xs font-bold text-gray-900 dark:text-gray-100">
              {session.session}
            </p>
            <p className="text-[10px] text-gray-400 dark:text-gray-500 mb-4">
              {getSessionTime(session.session)}
            </p>
            <div className="relative inline-block">
              <span className="text-3xl font-bold text-[#14b8a6]">
                {session.percent_trades}
              </span>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-[#14b8a6]">%</span>
                <span className="text-[8px] text-gray-400 uppercase tracking-tighter -mt-1">
                  trades
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
