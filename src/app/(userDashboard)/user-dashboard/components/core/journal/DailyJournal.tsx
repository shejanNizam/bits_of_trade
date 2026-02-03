import { Button, Input } from "antd";

const { TextArea } = Input;

export default function DailyJournal() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-1">
            Daily Journal
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Macro reflection & habit formation
          </p>
        </div>
        <span className="px-3 py-1 bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 rounded-lg text-xs font-bold uppercase">
          GREEN Session
        </span>
      </div>

      {/* Daily Prompt */}
      <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Daily Prompt (System Generated)
        </p>
        <p className="text-base text-gray-900 dark:text-gray-100">
          What went well in your process today?
        </p>
      </div>

      {/* Reflection */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Reflection
        </label>
        <TextArea
          placeholder="Write your honest reflection..."
          rows={4}
          className="resize-none"
        />
      </div>

      {/* Intention for Next Session */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Intention for Next Session
        </label>
        <TextArea
          placeholder="What's your focus for the next session?"
          rows={3}
          className="resize-none"
        />
      </div>

      {/* Limits Followed */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
          Limits Followed?
        </label>
        <div className="grid grid-cols-3 gap-3">
          <button className="px-4 py-2.5 bg-green-100 dark:bg-green-900/30 border-2 border-green-500 dark:border-green-400 text-green-700 dark:text-green-300 rounded-lg font-medium hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors">
            Yes
          </button>
          <button className="px-4 py-2.5 bg-gray-100 dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
            Mostly
          </button>
          <button className="px-4 py-2.5 bg-gray-100 dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
            No
          </button>
        </div>
      </div>

      {/* Save Button */}
      <Button
        type="primary"
        size="large"
        block
        className="h-12! bg-blue-600! hover:bg-blue-700! dark:bg-blue-500! dark:hover:bg-blue-600! font-semibold!"
      >
        Save Entry
      </Button>
    </div>
  );
}
