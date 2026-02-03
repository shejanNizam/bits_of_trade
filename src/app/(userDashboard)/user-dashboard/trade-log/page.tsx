import TradeLogFooter from "../components/core/tradeLog/TradeLogFooter";
import TradeLogTable from "../components/core/tradeLog/TradeLogTable";

export default function TradeLogPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="w-full mx-auto">
        <TradeLogTable />
        <TradeLogFooter />
      </div>
    </div>
  );
}
