import { BsJournalBookmark } from "react-icons/bs";
import { HiOutlineShieldCheck } from "react-icons/hi";
import { IoBookOutline } from "react-icons/io5";
import CustomHeading from "../shared/CustomHeading";

export default function ActuallyDoes() {
  const journalPoints = [
    "Decision context",
    "Rule adherence",
    "Emotional triggers",
    "Session discipline",
  ];

  const learningHubPoints = [
    "Market structure",
    "Risk and positioning",
    "Discipline systems",
    "Strategy frameworks",
  ];

  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-10">
          <CustomHeading>What BitsOfTrade actually does</CustomHeading>
          <p className="text-gray-600 max-w-2xl">
            Most tools analyze trades after damage is done. BitsOfTrade focuses
            on behavior before mistakes repeat.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1 - Discipline Guard */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col transition-all duration-300 hover:shadow-xl hover:scale-[1.02] hover:border-[#8B5CF6]/30 cursor-pointer group">
            <div className="w-12 h-12 rounded-xl bg-[#8B5CF6] flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110">
              <HiOutlineShieldCheck className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-[#8B5CF6] transition-colors duration-300">
              Discipline Guard
            </h3>
            <p className="text-[#8B5CF6] text-sm font-medium mb-3">
              Detects behavioral risk early
            </p>
            <p className="text-gray-600 text-sm mb-4 grow">
              Discipline Guard continuously observes patterns that usually lead
              to overtrading such as increased trade frequency, loss-streak
              escalation, session fatigue, and rule drift after profits.
            </p>
            <p className="text-gray-800 text-sm font-semibold">
              It does not predict markets. It observes how you behave inside
              them.
            </p>
          </div>

          {/* Card 2 - Journal */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col transition-all duration-300 hover:shadow-xl hover:scale-[1.02] hover:border-[#3B82F6]/30 cursor-pointer group">
            <div className="w-12 h-12 rounded-xl bg-[#3B82F6] flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110">
              <BsJournalBookmark className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-[#3B82F6] transition-colors duration-300">
              Journal
            </h3>
            <p className="text-[#3B82F6] text-sm font-medium mb-3">
              Reflection before results
            </p>
            <p className="text-gray-600 text-sm mb-3">
              Instead of focusing only on P&L, the journal forces structured
              reflection on:
            </p>
            <ul className="space-y-2 mb-4 grow">
              {journalPoints.map((point, index) => (
                <li
                  key={index}
                  className="flex items-center gap-2 text-sm text-gray-700"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] transition-transform duration-300 group-hover:scale-150"></span>
                  {point}
                </li>
              ))}
            </ul>
            <p className="text-gray-800 text-sm font-semibold">
              Trades are inputs. Behavior is the primary signal.
            </p>
          </div>

          {/* Card 3 - Learning Hub */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col transition-all duration-300 hover:shadow-xl hover:scale-[1.02] hover:border-[#10B981]/30 cursor-pointer group">
            <div className="w-12 h-12 rounded-xl bg-[#10B981] flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110">
              <IoBookOutline className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-[#10B981] transition-colors duration-300">
              Learning Hub
            </h3>
            <p className="text-[#10B981] text-sm font-medium mb-3">
              Risk-first education
            </p>
            <p className="text-gray-600 text-sm mb-3">
              The Learning Hub focuses on:
            </p>
            <ul className="space-y-2 mb-4 grow">
              {learningHubPoints.map((point, index) => (
                <li
                  key={index}
                  className="flex items-center gap-2 text-sm text-gray-700"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] transition-transform duration-300 group-hover:scale-150"></span>
                  {point}
                </li>
              ))}
            </ul>
            <p className="text-gray-800 text-sm font-semibold">
              Learning supports your process — it does not override it with
              predictions.
            </p>
          </div>
        </div>

        {/* Bottom Text */}
        <p className="text-center text-gray-500 text-sm mt-10">
          BitsOfTrade is a discipline and learning system built around capital
          protection.
        </p>
      </div>
    </section>
  );
}
