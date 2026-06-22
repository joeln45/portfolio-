import { clsx, type ClassValue } from "clsx";

/** Tiny class-name joiner used across components. */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

/**
 * Scroll the window to an absolute Y.
 *
 * We target the window explicitly (never `scrollIntoView`, which walks scroll
 * ancestors and can pick the wrong one when `overflow` makes <body> a scroll
 * container) and we guard against native smooth scroll silently no-opping: if
 * the page hasn't started moving shortly after the smooth request, we force the
 * final position with an instant scroll. This is the failure that left nav
 * links updating the hash but never moving the page.
 */
export function scrollWindowTo(targetY: number, instant: boolean) {
  const maxY = Math.max(
    0,
    document.documentElement.scrollHeight - window.innerHeight
  );
  const destY = Math.max(0, Math.min(targetY, maxY));
  const startY = window.scrollY;

  if (instant || Math.abs(destY - startY) < 2) {
    window.scrollTo({ top: destY, behavior: "instant" });
    return;
  }

  window.scrollTo({ top: destY, behavior: "smooth" });

  // Fallback: if smooth scroll didn't begin (some overflow / scroll-container
  // setups, or browsers that ignore the request), jump to the target so the
  // page always moves.
  window.setTimeout(() => {
    if (Math.abs(window.scrollY - startY) < 2) {
      window.scrollTo({ top: destY, behavior: "instant" });
    }
  }, 120);
}
