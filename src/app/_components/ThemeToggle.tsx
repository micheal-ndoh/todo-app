"use client";

import { useEffect, useState } from "react";

function applyTheme(theme: "light" | "dark") {
  const root = document.documentElement;
  if (theme === "dark") {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    // Initialize from localStorage or media query
    const stored = localStorage.getItem("theme") as "light" | "dark" | null;
    const preferredDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initial = stored ?? (preferredDark ? "dark" : "light");
    setTheme(initial);
    applyTheme(initial);
  }, []);

  useEffect(() => {
    applyTheme(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <button
      aria-label="Toggle theme"
      onClick={() => setTheme(t => (t === "light" ? "dark" : "light"))}
      className="fixed right-4 top-4 z-50 rounded-full border border-secondary-200 bg-white/70 px-3 py-2 text-sm shadow backdrop-blur hover:bg-white dark:border-secondary-700 dark:bg-secondary-800 dark:text-secondary-100"
    >
      {theme === "light" ? "Dark" : "Light"} mode
    </button>
  );
}
