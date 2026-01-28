interface Method {
  id: number;
  text: string;
}

export default function CanNotRely() {
  const methods: Method[] = [
    { id: 1, text: "Fixed limits" },
    { id: 2, text: "Enforced pauses" },
    { id: 3, text: "Mandatory reviews" },
  ];

  return (
    <div className="py-8">
      <div className="py-8 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:scale-[1.01]">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-4 transition-colors">
          Why discipline cannot rely on willpower
        </h2>

        <p className="text-gray-700 dark:text-gray-300 mb-6 transition-colors">
          Willpower declines under stress, fatigue, and confidence.
        </p>

        <p className="text-gray-700 dark:text-gray-300 mb-4 transition-colors">
          Professional trading environments reduce reliance on willpower by
          introducing:
        </p>

        <div className="space-y-3 mb-6">
          {methods.map((method) => (
            <div
              key={method.id}
              className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 hover:bg-gray-100 dark:hover:bg-gray-700 hover:scale-[1.02] transition-all duration-300 cursor-pointer"
            >
              <div className="flex items-start gap-3">
                <span className="text-gray-400 dark:text-gray-500 mt-1 shrink-0 transition-colors">
                  •
                </span>
                <p className="text-sm text-gray-700 dark:text-gray-300 transition-colors">
                  {method.text}
                </p>
              </div>
            </div>
          ))}
        </div>

        <p className="text-sm text-blue-600 dark:text-blue-400 font-medium transition-all duration-300 hover:scale-[1.01] inline-block">
          BitsOfTrade applies the same principles at a personal level.
        </p>
      </div>
    </div>
  );
}
