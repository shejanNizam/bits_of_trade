import { BsCheckCircleFill } from "react-icons/bs";

interface Gain {
  id: number;
  text: string;
}

export default function WhatActuallyGain() {
  const gains: Gain[] = [
    { id: 1, text: "Market reading skills" },
    { id: 2, text: "Bias creation framework" },
    { id: 3, text: "Institutional perspective" },
    { id: 4, text: "Discipline through structure" },
    { id: 5, text: "A system you can refine for years" },
  ];

  return (
    <div className="py-16 bg-white dark:bg-gray-900 transition-colors">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8 transition-colors">
            What You Actually Gain
          </h2>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {gains.map((gain) => (
              <div
                key={gain.id}
                className="flex items-center gap-3 bg-gray-50 dark:bg-gray-800 px-6 py-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:scale-[1.05] transition-all duration-300 cursor-pointer"
              >
                <BsCheckCircleFill className="w-5 h-5 text-emerald-500 dark:text-emerald-400 shrink-0 transition-colors" />
                <span className="text-sm md:text-base font-medium text-gray-900 dark:text-white transition-colors">
                  {gain.text}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#0F172A] dark:bg-gray-950 rounded-2xl p-8 md:p-12 text-center shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.01]">
          <p className="text-xl md:text-2xl font-semibold text-white mb-4">
            {"Markets don't reward speed. They reward understanding."}
          </p>
          <p className="text-sm md:text-base text-gray-400 dark:text-gray-500 transition-colors">
            This course is about understanding first trading second.
          </p>
        </div>
      </div>
    </div>
  );
}
