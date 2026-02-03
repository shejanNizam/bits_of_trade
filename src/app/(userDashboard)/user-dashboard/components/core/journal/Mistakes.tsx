import { Button, Checkbox, Input } from "antd";

const { TextArea } = Input;

export default function Mistakes() {
  const mistakesModes = [
    "Overtrading",
    "Revenge Trading",
    "FOMO",
    "Early Exit",
    "Ignored Stop Loss",
    "Late Exit",
    "No Plan",
    "Oversized Position",
  ];

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

      {/* Select Mistakes Mode */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
          Select Mistakes Mode
        </label>
        <div className="grid grid-cols-2 gap-3">
          {mistakesModes.map((mode) => (
            <label
              key={mode}
              className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <Checkbox />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                {mode}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* What Triggered This? */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          What Triggered This? (Optional)
        </label>
        <TextArea
          placeholder="Describe the trigger..."
          rows={3}
          className="resize-none"
        />
      </div>

      {/* Link to Trade(s) */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Link to Trade(s)
        </label>
        <Input placeholder="Search trades..." size="large" />
      </div>

      {/* Log Mistakes Button */}
      <Button danger size="large" block className="h-12! font-semibold!">
        Log Mistakes
      </Button>
    </div>
  );
}
