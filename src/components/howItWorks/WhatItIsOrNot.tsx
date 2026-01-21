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
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* What it IS Card */}
          <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-200 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-blue-200">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
              <HiOutlineShieldCheck className="w-6 h-6 text-[#3B82F6]" />
              <h3 className="text-lg font-bold text-gray-900">What it IS</h3>
            </div>

            {/* List */}
            <ul className="space-y-4">
              {whatItIs.map((item, index) => (
                <li key={index} className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#3B82F6] shrink-0"></span>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* What it is NOT Card */}
          <div className="bg-[#F8FAFC] rounded-2xl p-6 md:p-8 border border-gray-200 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-gray-300">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
              <IoCloseCircleOutline className="w-6 h-6 text-gray-400" />
              <h3 className="text-lg font-bold text-gray-900">
                What it is NOT
              </h3>
            </div>

            {/* List */}
            <ul className="space-y-4 mb-6">
              {whatItIsNot.map((item, index) => (
                <li key={index} className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-gray-400 shrink-0"></span>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>

            <hr className="text-gray-300 py-2" />

            {/* Footer Note */}
            <p className="text-gray-400 text-sm text-center italic">
              Execution remains your responsibility.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
