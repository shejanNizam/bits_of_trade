import CustomBanner from "@/components/shared/CustomBanner";

export default function DisciplineSystem() {
  return (
    <div>
      <CustomBanner
        title="Discipline System"
        subtitle="A detailed explanation of how BitsOfTrade observes behavior, introduces friction, and enforces review when trading discipline breaks down."
      >
        {/* Disclaimer Note */}
        <p className="text-gray-400 text-xs md:text-sm">
          This page explains system behavior. It does not provide trading
          advice.
        </p>
      </CustomBanner>
    </div>
  );
}
