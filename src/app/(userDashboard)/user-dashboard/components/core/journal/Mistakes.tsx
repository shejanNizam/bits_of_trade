/* eslint-disable @typescript-eslint/no-explicit-any */
// import { Button, Input } from "antd";

// const { TextArea } = Input;

// export default function Mistakes() {
//   // const mistakesModes = [
//   //   "Overtrading",
//   //   "Revenge Trading",
//   //   "FOMO",
//   //   "Early Exit",
//   //   "Ignored Stop Loss",
//   //   "Late Exit",
//   //   "No Plan",
//   //   "Oversized Position",
//   // ];

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div>
//         <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-1">
//           Mistake Breakdown
//         </h2>
//         <p className="text-sm text-gray-600 dark:text-gray-400">
//           Convert mistakes into analyzable data
//         </p>
//       </div>

//       {/* Select Mistakes Mode */}
//       {/* <div>
//         <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
//           Select Mistakes Mode
//         </label>
//         <div className="grid grid-cols-2 gap-3">
//           {mistakesModes.map((mode) => (
//             <label
//               key={mode}
//               className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
//             >
//               <Checkbox />
//               <span className="text-sm text-gray-700 dark:text-gray-300">
//                 {mode}
//               </span>
//             </label>
//           ))}
//         </div>
//       </div> */}

//       {/* What Triggered This? */}
//       <div>
//         <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
//           What Triggered This? (Optional)
//         </label>
//         <TextArea
//           placeholder="Describe the trigger..."
//           rows={3}
//           className="resize-none"
//         />
//       </div>

//       {/* Link to Trade(s) */}
//       <div>
//         <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
//           Select a Mistake
//         </label>
//         <Input placeholder="Search trades..." size="large" />
//       </div>

//       {/* Link to Trade(s) */}
//       <div>
//         <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
//           Link to Trade(s)
//         </label>
//         <Input placeholder="Search trades..." size="large" />
//       </div>

//       {/* Log Mistakes Button */}
//       <Button danger size="large" block className="h-12! font-semibold!">
//         Log Mistakes
//       </Button>
//     </div>
//   );
// }

"use client";

import { useTradeLinkWithMistakeMutation } from "@/redux/features/journal/journalApi";
import { useGetMistakeQuery } from "@/redux/features/mistake/mistakeApi";
import { useGetTradeQuery } from "@/redux/features/tradelog/tradelogApi";
import { Button, Select, message } from "antd";
import { useState } from "react";

const { Option } = Select;

interface TradeOption {
  id: string;
  symbol: string;
}

interface MistakeOption {
  id: string;
  mistake_name: string;
}

export default function Mistakes() {
  const [selectedMistake, setSelectedMistake] = useState<string | null>(null);
  const [selectedTrade, setSelectedTrade] = useState<string | null>(null);

  // API hooks
  const [tradeLinkWithMistake, { isLoading: isLinking }] =
    useTradeLinkWithMistakeMutation();
  const { data: tradesData, isLoading: isLoadingTrades } = useGetTradeQuery({});
  const { data: mistakesData, isLoading: isLoadingMistakes } =
    useGetMistakeQuery({});

  const trades = tradesData || [];
  const mistakes = mistakesData?.results || [];

  const handleSubmit = async () => {
    // Validate required fields
    if (!selectedMistake) {
      message.error("Please select a mistake");
      return;
    }

    if (!selectedTrade) {
      message.error("Please select a trade to link");
      return;
    }

    const payload = {
      trade: selectedTrade,
      mistake: selectedMistake,
    };

    try {
      await tradeLinkWithMistake(payload).unwrap();
      message.success("Mistake linked successfully!");

      setSelectedMistake(null);
      setSelectedTrade(null);
    } catch (error: any) {
      message.error(error?.data?.message || "Failed to link mistake");
      console.error("Failed to link mistake:", error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-1">
          Mistake Breakdown
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Convert mistakes into analyzable data
        </p>
      </div>

      {/* Select a Mistake */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Select a Mistake <span className="text-red-500">*</span>
        </label>
        <Select
          size="large"
          className="w-full"
          placeholder="Select a mistake type..."
          value={selectedMistake}
          onChange={setSelectedMistake}
          loading={isLoadingMistakes}
          disabled={isLinking}
          showSearch
          optionFilterProp="children"
          allowClear
        >
          {mistakes.map((mistake: MistakeOption) => (
            <Option key={mistake.id} value={mistake.id}>
              {mistake.mistake_name}
            </Option>
          ))}
        </Select>
      </div>

      {/* Link to Trade(s) */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Link to Trade(s) <span className="text-red-500">*</span>
        </label>
        <Select
          size="large"
          className="w-full"
          placeholder="Search trades to link..."
          value={selectedTrade}
          onChange={setSelectedTrade}
          loading={isLoadingTrades}
          disabled={isLinking}
          showSearch
          optionFilterProp="children"
          allowClear
        >
          {trades.map((trade: TradeOption) => (
            <Option key={trade.id} value={trade.id}>
              {trade.symbol}
            </Option>
          ))}
        </Select>
      </div>

      {/* Log Mistakes Button */}
      <Button
        danger
        size="large"
        block
        onClick={handleSubmit}
        loading={isLinking}
        className="h-12! font-semibold!"
      >
        {isLinking ? "Linking..." : "Log Mistake"}
      </Button>
    </div>
  );
}
