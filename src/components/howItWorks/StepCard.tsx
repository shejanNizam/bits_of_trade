import Link from "next/link";

// Step Card Component
interface StepCardProps {
  data: {
    title: string;
    icon?: React.ComponentType<{ className?: string }>;
    description?: string;
    items?: string[];
    note?: string | null;
    link?: { text: string; href: string };
    examples?: { from: string; to: string }[];
  };
  variant: "left" | "right";
}

export default function StepCard({ data, variant }: StepCardProps) {
  const isLeft = variant === "left";
  const hasIcon = !!data.icon;

  return (
    <div
      className={`rounded-xl p-5 max-w-sm w-full transition-all duration-300 ${
        isLeft ? "md:text-right" : "md:text-left"
      } ${
        hasIcon
          ? "bg-transparent"
          : "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg hover:border-blue-200 dark:hover:border-blue-500"
      }`}
    >
      {/* Title with Icon */}
      <div
        className={`flex items-center gap-2 mb-3 ${
          isLeft ? "md:justify-end" : "md:justify-start"
        }`}
      >
        {!isLeft && data.icon && (
          <data.icon className="w-5 h-5 text-[#3B82F6] dark:text-[#60A5FA]" />
        )}
        <h4 className="font-bold text-gray-900 dark:text-white">
          {data.title}
        </h4>
        {isLeft && data.icon && (
          <data.icon className="w-5 h-5 text-[#3B82F6] dark:text-[#60A5FA]" />
        )}
      </div>

      {/* Description */}
      {data.description && (
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
          {data.description}
        </p>
      )}

      {/* List Items */}
      {data.items && (
        <ul className={`space-y-2 mb-3 ${isLeft ? "md:pl-0" : ""}`}>
          {data.items.map((item, index) => (
            <li
              key={index}
              className={`flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 ${
                isLeft ? "md:flex-row-reverse md:text-right" : ""
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] dark:bg-[#60A5FA] shrink-0"></span>
              {item}
            </li>
          ))}
        </ul>
      )}

      {/* Examples */}
      {data.examples && (
        <div className="space-y-2">
          {data.examples.map((example, index) => (
            <div
              key={index}
              className={`flex items-center gap-3 text-sm ${
                isLeft ? "md:justify-end" : ""
              }`}
            >
              <span className="text-gray-600 dark:text-gray-400">
                {example.from}
              </span>
              <span className="text-gray-400 dark:text-gray-500">→</span>
              <span className="font-medium text-gray-900 dark:text-white">
                {example.to}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Note */}
      {data.note && (
        <p className="text-gray-400 dark:text-gray-500 text-xs mt-3 italic">
          {data.note}
        </p>
      )}

      {/* Link */}
      {data.link && (
        <Link
          href={data.link.href}
          className={`inline-flex items-center gap-1 text-[#3B82F6] dark:text-[#60A5FA] text-sm font-medium mt-3 hover:underline ${
            isLeft ? "md:justify-end" : ""
          }`}
        >
          {data.link.text}
          <span>→</span>
        </Link>
      )}
    </div>
  );
}
