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
    return <div className="rounded-full animate-pulse" />;
  }

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={`cursor-pointer p-2`}
      aria-label="Toggle theme"
    >
      {isDark ? (
        <span className="text-sm">☀️</span>
      ) : (
        <span className="text-sm">🌙</span>
      )}
    </button>
  );
}
