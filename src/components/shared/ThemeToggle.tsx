"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-16 h-8 bg-linear-to-r from-blue-400 to-purple-500 rounded-full animate-pulse" />
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={`relative w-16 h-8 rounded-full shadow-lg transition-all duration-500 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
        isDark
          ? "bg-linear-to-r from-slate-700 via-slate-800 to-slate-900 focus:ring-slate-500"
          : "bg-linear-to-r from-blue-400 via-blue-500 to-purple-500 focus:ring-blue-400"
      }`}
      aria-label="Toggle theme"
    >
      {/* Animated background glow */}
      <span
        className={`absolute inset-0 rounded-full blur-md transition-opacity duration-500 ${
          isDark
            ? "bg-linear-to-r from-slate-600 to-slate-800 opacity-50"
            : "bg-linear-to-r from-blue-300 to-purple-400 opacity-60"
        }`}
      />

      {/* Sliding ball */}
      <div
        className={`relative z-10 w-6 h-6 m-1 bg-white rounded-full shadow-md transform transition-all duration-500 flex items-center justify-center ${
          isDark ? "translate-x-8" : "translate-x-0"
        }`}
      >
        {isDark ? (
          <span className="text-xs">🌙</span>
        ) : (
          <span className="text-xs">☀️</span>
        )}
      </div>

      {/* Decorative stars for dark mode */}
      {isDark && (
        <div className="absolute inset-0 flex items-center justify-start pl-2">
          <span className="text-[8px] text-yellow-300 animate-pulse">✨</span>
        </div>
      )}
    </button>
  );
}
