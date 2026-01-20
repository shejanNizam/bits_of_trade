import { FaExclamationTriangle } from "react-icons/fa";
import { HiShieldCheck } from "react-icons/hi";
import { IoAnalytics } from "react-icons/io5";
import CustomHeading from "../shared/CustomHeading";

export default function DisciplineFails() {
  const realityPoints = [
    "Limits",
    "Controls",
    "Risk desks",
    "Forced stop mechanisms",
  ];

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="container mx-auto max-w-7xl">
        <CustomHeading>Why discipline fails for most traders</CustomHeading>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1 - The Myth */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-xl hover:scale-[1.02] hover:border-red-200 cursor-pointer group">
            <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110">
              <FaExclamationTriangle className="w-5 h-5 text-red-500" />
            </div>
            <h3 className="text-lg font-bold mb-2 group-hover:text-red-500 transition-colors duration-300">
              The Myth
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Retail traders are told:
            </p>
            <div className="border-l-4 border-red-400 pl-4 py-1 transition-all duration-300 group-hover:border-red-500 group-hover:bg-red-50 group-hover:rounded-r-lg">
              <p className="text-xl w-[90%] font-bold">
                {"If you lose money, you lack discipline."}
              </p>
            </div>
          </div>

          {/* Card 2 - The Reality */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-xl hover:scale-[1.02] hover:border-purple-200 cursor-pointer group">
            <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110">
              <HiShieldCheck className="w-6 h-6 text-purple-500" />
            </div>
            <h3 className="text-lg font-bold mb-2 group-hover:text-purple-500 transition-colors duration-300">
              The Reality
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              {"Institutions don't rely on willpower. They rely on:"}
            </p>
            <ul className="space-y-2">
              {realityPoints.map((point, index) => (
                <li
                  key={index}
                  className="flex items-center gap-2 text-sm text-gray-700"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500 transition-transform duration-300 group-hover:scale-150"></span>
                  {point}
                </li>
              ))}
            </ul>
          </div>

          {/* Card 3 - The Gap */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col transition-all duration-300 hover:shadow-xl hover:scale-[1.02] hover:border-blue-200 cursor-pointer group">
            <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110">
              <IoAnalytics className="w-6 h-6 text-blue-500" />
            </div>
            <h3 className="text-lg font-bold mb-2 group-hover:text-blue-500 transition-colors duration-300">
              The Gap
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Retail traders were given charts, indicators, and strategies but
              no system to stop themselves.
            </p>
            <div className="mt-auto bg-blue-50 rounded-xl p-4 transition-all duration-300 group-hover:bg-blue-100 group-hover:shadow-md">
              <p className="text-md font-bold">
                {
                  "Discipline was treated as a personal flaw. It's actually a system problem."
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
