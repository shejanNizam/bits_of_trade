const frequencyData = [
  { id: 1, name: "Premature Exit", count: 13, max: 15 },
  { id: 2, name: "FOMO Entry", count: 12, max: 15 },
  { id: 3, name: "Overtrading", count: 10, max: 15 },
  { id: 4, name: "Revenge Trading", count: 8, max: 15 },
  { id: 5, name: "Oversized Position", count: 5, max: 15 },
  { id: 6, name: "Ignored Stop Loss", count: 3, max: 15 },
];

export default function MistakeFrequency() {
  return (
    <div className="bg-white dark:bg-primary/10 border border-slate-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm h-full">
      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">
        Mistake Frequency (Last 30 Days)
      </h3>
      <div className="space-y-5">
        {frequencyData.map((item) => (
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
                style={{ width: `${(item.count / item.max) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
