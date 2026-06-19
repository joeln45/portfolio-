"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";

type Theme = "light" | "dark";

/** Light/dark toggle. The actual theme is set on <html data-theme> before
 *  paint by the inline script in layout.tsx; this reads that attribute via an
 *  external store (no setState-in-effect) and flips it on click. */
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return () => observer.disconnect();
}

function getSnapshot(): Theme {
  return document.documentElement.getAttribute("data-theme") === "light"
    ? "light"
    : "dark";
}

function getServerSnapshot(): Theme {
  // Matches the default on <html> in layout.tsx.
  return "dark";
}

export default function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const next: Theme = theme === "dark" ? "light" : "dark";

  function toggle() {
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
      aria-label={`Switch to ${next} mode`}
      title={`Switch to ${next} mode`}
      className="inline-flex items-center gap-2 rounded-full border border-border bg-bg-soft px-3.5 py-2 text-sm font-medium text-foreground shadow-sm transition-colors hover:border-accent hover:text-accent"
    >
      {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
      <span className="hidden sm:inline">
        {theme === "dark" ? "Light" : "Dark"}
      </span>
    </button>
  );
}
