import { HiOutlineShieldCheck } from "react-icons/hi";
import { IoCloseCircleOutline } from "react-icons/io5";

export default function WhatItIsOrNot() {
  const whatItIs = [
    "A discipline layer",
    "A behavioral risk system",
    "A structured learning environment",
  ];

  const whatItIsNot = [
    "A trading platform",
    "A signal provider",
    "A prediction engine",
    "A broker controller",
  ];

  return (
    <section className="py-16 px-4 bg-white dark:bg-gray-900">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* What it IS Card */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 md:p-8 border border-gray-200 dark:border-gray-700 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-blue-200 dark:hover:border-blue-500">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
              <HiOutlineShieldCheck className="w-6 h-6 text-[#3B82F6] dark:text-[#60A5FA]" />
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                What it IS
              </h3>
            </div>

            {/* List */}
            <ul className="space-y-4">
              {whatItIs.map((item, index) => (
                <li key={index} className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#3B82F6] dark:bg-[#60A5FA] shrink-0"></span>
                  <span className="text-gray-700 dark:text-gray-300">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* What it is NOT Card */}
          <div className="bg-[#F8FAFC] dark:bg-gray-800 rounded-2xl p-6 md:p-8 border border-gray-200 dark:border-gray-700 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-gray-300 dark:hover:border-gray-600">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
              <IoCloseCircleOutline className="w-6 h-6 text-gray-400 dark:text-gray-500" />
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                What it is NOT
              </h3>
            </div>

            {/* List */}
            <ul className="space-y-4 mb-6">
              {whatItIsNot.map((item, index) => (
                <li key={index} className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500 shrink-0"></span>
                  <span className="text-gray-700 dark:text-gray-300">
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            <hr className="border-gray-300 dark:border-gray-600 my-4" />

            {/* Footer Note */}
            <p className="text-gray-400 dark:text-gray-500 text-sm text-center italic">
              Execution remains your responsibility.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
