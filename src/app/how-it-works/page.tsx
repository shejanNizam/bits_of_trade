import CustomBanner from "@/components/shared/CustomBanner";

export default function HowItWorks() {
  return (
    <>
      <CustomBanner
        title="How BitsOfTrade Works"
        subtitle="BitsOfTrade is a discipline and learning system that operates around your trading — not inside your broker."
      >
        {/* Tags Pill */}
        <div className="inline-flex items-center gap-2 md:gap-3 px-5 py-2.5 rounded-full border border-gray-200 bg-white text-xs md:text-sm text-gray-600">
          <span>No signals</span>
          <span className="w-1 h-1 rounded-full bg-gray-400"></span>
          <span>No predictions</span>
          <span className="w-1 h-1 rounded-full bg-gray-400"></span>
          <span>No broker integration required</span>
        </div>
      </CustomBanner>
    </>
  );
}
