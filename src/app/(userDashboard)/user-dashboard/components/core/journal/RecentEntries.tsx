import { useGetAllLearningNotesQuery } from "@/redux/features/journal/journalApi";

interface LearningNote {
  id: string;
  lesson_source: string;
  key_takeaway: string;
  application_plan: string;
  linked_type: "mistake" | "rule" | "strategy" | "none";
  created_at: string;
  user: number;
}

export default function RecentEntries() {
  const { data, isLoading } = useGetAllLearningNotesQuery({});
  const notes = data?.results || [];

  const getBorderColor = (linkedType: string) => {
    switch (linkedType) {
      case "mistake":
        return "#ef4444"; // Red
      case "rule":
        return "#3b82f6"; // Blue
      case "strategy":
        return "#8b5cf6"; // Purple
      default:
        return "#f59e0b"; // Orange for none
    }
  };

  const getTagColor = (linkedType: string) => {
    switch (linkedType) {
      case "mistake":
        return "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300";
      case "rule":
        return "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300";
      case "strategy":
        return "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300";
      default:
        return "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Get only the 5 most recent entries
  const recentNotes = [...notes]
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    )
    .slice(0, 5);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 sm:p-6">
      <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
        Recent Entries
      </h3>

      {isLoading ? (
        <div className="text-center py-8">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Loading recent entries...
          </p>
        </div>
      ) : recentNotes.length > 0 ? (
        <div className="space-y-4">
          {recentNotes.map((note: LearningNote) => (
            <div
              key={note.id}
              className="border-l-4 pl-3"
              style={{
                borderColor: getBorderColor(note.linked_type || "none"),
              }}
            >
              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">
                {formatDate(note.created_at)}
              </p>
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-1">
                {note.lesson_source}
              </p>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                {note.key_takeaway}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                {note.application_plan}
              </p>
              {note.linked_type && note.linked_type !== "none" && (
                <div className="flex flex-wrap gap-2">
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium uppercase ${getTagColor(
                      note.linked_type,
                    )}`}
                  >
                    {note.linked_type}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            No learning notes yet. Start by adding your first note!
          </p>
        </div>
      )}

      <p className="text-xs text-gray-500 dark:text-gray-400 text-center italic mt-6">
        Our journal {"doesn't"} store thoughts. It trains behavior.
      </p>
    </div>
  );
}
