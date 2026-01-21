import { ReactNode } from "react";

interface CustomBannerProps {
  badge?: string;
  title: string;
  subtitle?: string;
  children?: ReactNode;
}

export default function CustomBanner({
  badge,
  title,
  subtitle,
  children,
}: CustomBannerProps) {
  return (
    <section className="py-12 md:py-16 px-4 bg-[#F8FAFC]">
      <div className="container mx-auto max-w-4xl text-center">
        {/* Badge */}
        {badge && (
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#E0E7FF] text-[#3B82F6] text-xs font-semibold mb-4">
            {badge}
          </span>
        )}

        {/* Title */}
        <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-3">
          {title}
        </h2>

        {/* Subtitle */}
        {subtitle && (
          <p className="text-gray-500 text-sm md:text-base">{subtitle}</p>
        )}

        {/* Optional Children */}
        {children && <div className="mt-6">{children}</div>}
      </div>
    </section>
  );
}
