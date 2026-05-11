"use client";

import { useGetAllLearningHupPublicQuery } from "@/redux/features/learninghubPublic/learninghubPublicApi";

interface Topic {
  id: string;
  module_id: string;
  title: string;
  display_order: number;
  is_visible: boolean;
  created_at: string;
  updated_at: string;
}

interface Module {
  id: string;
  title: string;
  subtitle: string;
  display_order: number;
  is_visible: boolean;
  created_at: string;
  updated_at: string;
  topics: Topic[];
}

const MODULE_COLORS = [
  {
    iconBg: "bg-emerald-100 dark:bg-emerald-900/30",
    iconColor: "text-emerald-600 dark:text-emerald-400",
    dot: "text-emerald-400 dark:text-emerald-500",
    hover: "hover:text-emerald-600 dark:hover:text-emerald-400",
  },
  {
    iconBg: "bg-rose-100 dark:bg-rose-900/30",
    iconColor: "text-rose-600 dark:text-rose-400",
    dot: "text-rose-400 dark:text-rose-500",
    hover: "hover:text-rose-600 dark:hover:text-rose-400",
  },
  {
    iconBg: "bg-purple-100 dark:bg-purple-900/30",
    iconColor: "text-purple-600 dark:text-purple-400",
    dot: "text-purple-400 dark:text-purple-500",
    hover: "hover:text-purple-600 dark:hover:text-purple-400",
  },
  {
    iconBg: "bg-blue-100 dark:bg-blue-900/30",
    iconColor: "text-blue-600 dark:text-blue-400",
    dot: "text-blue-400 dark:text-blue-500",
    hover: "hover:text-blue-600 dark:hover:text-blue-400",
  },
  {
    iconBg: "bg-amber-100 dark:bg-amber-900/30",
    iconColor: "text-amber-600 dark:text-amber-400",
    dot: "text-amber-400 dark:text-amber-500",
    hover: "hover:text-amber-600 dark:hover:text-amber-400",
  },
  {
    iconBg: "bg-indigo-100 dark:bg-indigo-900/30",
    iconColor: "text-indigo-600 dark:text-indigo-400",
    dot: "text-indigo-400 dark:text-indigo-500",
    hover: "hover:text-indigo-600 dark:hover:text-indigo-400",
  },
  {
    iconBg: "bg-cyan-100 dark:bg-cyan-900/30",
    iconColor: "text-cyan-600 dark:text-cyan-400",
    dot: "text-cyan-400 dark:text-cyan-500",
    hover: "hover:text-cyan-600 dark:hover:text-cyan-400",
  },
];

function ModuleBadge({
  index,
  iconBg,
  iconColor,
}: {
  index: number;
  iconBg: string;
  iconColor: string;
}) {
  return (
    <div
      className={`w-10 h-10 rounded-lg ${iconBg} flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-110`}
    >
      <span className={`text-sm font-black tabular-nums ${iconColor}`}>
        {String(index + 1).padStart(2, "0")}
      </span>
    </div>
  );
}

export default function LearningEverything() {
  const {
    data: modules = [],
    isLoading,
    isError,
  } = useGetAllLearningHupPublicQuery({});

  const sorted = [...(modules as Module[])].sort(
    (a, b) => a.display_order - b.display_order,
  );

  return (
    <div className="py-12 bg-white dark:bg-gray-900 transition-colors">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3 transition-colors">
            {"Everything you'll learn inside the Learning Hub"}
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors">
            This is not a course library. It is a structured system for
            understanding risk, execution, and discipline.
          </p>
        </div>

        {isLoading && (
          <div className="space-y-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-8 animate-pulse"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-gray-200 dark:bg-gray-700" />
                  <div className="h-4 w-48 bg-gray-200 dark:bg-gray-700 rounded" />
                </div>

                <div className="grid md:grid-cols-2 gap-x-8 gap-y-3">
                  {[1, 2, 3, 4, 5, 6].map((j) => (
                    <div
                      key={j}
                      className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full"
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {isError && (
          <div className="rounded-2xl border border-dashed border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/10 px-6 py-10 text-center">
            <p className="text-sm text-red-500 dark:text-red-400">
              Failed to load curriculum. Please try again later.
            </p>
          </div>
        )}

        {!isLoading && !isError && (
          <div className="space-y-8">
            {sorted.map((mod, idx) => {
              const color = MODULE_COLORS[idx % MODULE_COLORS.length];
              const visibleTopics = mod.topics
                .filter((t) => t.is_visible)
                .sort((a, b) => a.display_order - b.display_order);

              return (
                <div key={mod.id}>
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-8 hover:shadow-xl transition-all duration-300 hover:scale-[1.01] group">
                    {/* Card header */}
                    <div className="flex items-center gap-3 mb-6">
                      <ModuleBadge
                        index={idx}
                        iconBg={color.iconBg}
                        iconColor={color.iconColor}
                      />
                      <div>
                        <h3 className="text-base font-bold text-gray-900 dark:text-white transition-colors">
                          {mod.title}
                        </h3>
                        {mod.subtitle && (
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                            {mod.subtitle}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Topics grid */}
                    {visibleTopics.length > 0 ? (
                      <div className="grid md:grid-cols-2 gap-x-8 gap-y-3">
                        {visibleTopics.map((topic) => (
                          <div
                            key={topic.id}
                            className={`flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300 ${color.hover} transition-colors cursor-pointer`}
                          >
                            <span className={`${color.dot} mt-1 shrink-0`}>
                              •
                            </span>
                            <span>{topic.title}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-400 dark:text-gray-500 italic">
                        No topics available yet.
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
