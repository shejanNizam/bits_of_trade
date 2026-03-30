/* eslint-disable @typescript-eslint/no-explicit-any */
interface MistakeFrequencyProps {
  analyticsData?: any;
  isLoading?: boolean;
}

export default function MistakeFrequency({
  analyticsData,
  isLoading,
}: MistakeFrequencyProps) {
  // Transform API data to match the component's expected format
  const getFrequencyData = () => {
    if (
      !analyticsData?.mistake_frequency_last_30 ||
      analyticsData.mistake_frequency_last_30.length === 0
    ) {
      return [];
    }

    // Map the API response to the component format
    const frequencyData = analyticsData.mistake_frequency_last_30.map(
      (item: any) => ({
        id: item.rank,
        name: item.label,
        count: item.count,
        max: Math.max(
          ...analyticsData.mistake_frequency_last_30.map((i: any) => i.count),
          1,
        ),
      }),
    );

    return frequencyData;
  };

  const frequencyData = getFrequencyData();
  const maxCount =
    frequencyData.length > 0
      ? Math.max(
          ...frequencyData.map(
            (item: { id: number; name: string; count: number; max: number }) =>
              item.count,
          ),
        )
      : 1;

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-primary/10 border border-slate-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm h-full">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">
          Mistake Frequency (Last 30 Days)
        </h3>
        <div className="flex justify-center py-8">
          <div className="animate-pulse text-slate-500">Loading...</div>
        </div>
      </div>
    );
  }

  if (frequencyData.length === 0) {
    return (
      <div className="bg-white dark:bg-primary/10 border border-slate-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm h-full">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">
          Mistake Frequency (Last 30 Days)
        </h3>
        <div className="flex justify-center py-8">
          <p className="text-slate-500 dark:text-zinc-400">
            No mistakes recorded in the last 30 days
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-primary/10 border border-slate-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm h-full">
      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">
        Mistake Frequency (Last 30 Days)
      </h3>
      <div className="space-y-5">
        {frequencyData.map(
          (item: { id: number; name: string; count: number; max: number }) => (
            <div key={item.id} className="space-y-2">
              <div className="flex justify-between items-center text-sm font-semibold">
                <span className="text-slate-500 dark:text-zinc-400">
                  #{item.id} {item.name}
                </span>
                <span className="text-slate-900 dark:text-white">
                  {item.count}
                </span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-zinc-800 rounded-full h-2.5 overflow-hidden">
                <div
                  className="bg-red-600 h-full rounded-full transition-all duration-500"
                  style={{ width: `${(item.count / maxCount) * 100}%` }}
                />
              </div>
            </div>
          ),
        )}
      </div>
    </div>
  );
}
