import { useEffect, useState } from "react";

/**
 * Match a CSS media query at runtime. SSR-safe (defaults false until mounted).
 */
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);
    onChange();
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}

/** Disable heavy effects on small/touch devices. */
export const useIsMobile = () => useMediaQuery("(max-width: 768px)");

/** Respect the user's reduced-motion OS setting. */
export const usePrefersReducedMotion = () =>
  useMediaQuery("(prefers-reduced-motion: reduce)");
