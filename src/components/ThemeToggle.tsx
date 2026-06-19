"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

type Theme = "light" | "dark";

/** Light/dark toggle. The actual theme is set on <html data-theme> before
 *  paint by the inline script in layout.tsx — this just reads/flips it. */
export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const current = document.documentElement.getAttribute("data-theme");
    setTheme(current === "light" ? "light" : "dark");
  }, []);

  function toggle() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* localStorage unavailable — ignore */
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      className="inline-flex items-center gap-2 rounded-full border border-border bg-bg-soft px-3.5 py-2 text-sm font-medium text-foreground shadow-sm transition-colors hover:border-accent hover:text-accent"
    >
      {mounted ? (
        theme === "dark" ? (
          <Sun size={16} />
        ) : (
          <Moon size={16} />
        )
      ) : (
        <span className="block h-4 w-4" />
      )}
      <span className="hidden sm:inline">
        {mounted ? (theme === "dark" ? "Light" : "Dark") : "Theme"}
      </span>
    </button>
  );
}
