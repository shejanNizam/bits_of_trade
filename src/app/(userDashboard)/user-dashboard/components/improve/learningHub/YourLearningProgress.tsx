export default function YourLearningProgress() {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
      <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-8">
        Your Learning Progress
      </h2>

      <div className="space-y-8">
        {/* Progress Bar 1 */}
        <div className="space-y-3">
          <div className="flex justify-between items-end">
            <span className="text-sm font-medium text-slate-500">
              Courses Completed
            </span>
            <span className="text-sm font-bold text-slate-900 dark:text-white">
              7 / 12
            </span>
          </div>
          <div className="h-2.5 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
            <div className="h-full w-[58%] bg-blue-500" />
          </div>
        </div>

        {/* Progress Bar 2 */}
        <div className="space-y-3">
          <div className="flex justify-between items-end">
            <span className="text-sm font-medium text-slate-500">
              Learning Streak
            </span>
            <span className="text-sm font-bold text-slate-900 dark:text-white">
              12 days
            </span>
          </div>
          <div className="h-2.5 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
            <div className="h-full w-[80%] bg-linear-to-r from-purple-500 to-pink-500" />
          </div>
        </div>

        {/* Recently Completed */}
        <div className="pt-4">
          <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-3">
            Recently Completed
          </h4>
          <div className="space-y-2">
            {["Stop Loss Placement Mastery", "Reading Price Action Basics"].map(
              (item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400"
                >
                  <div className="flex h-5 w-5 items-center justify-center rounded-full border border-emerald-500 text-[10px] text-emerald-500">
                    ✓
                  </div>
                  {item}
                </div>
              ),
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
