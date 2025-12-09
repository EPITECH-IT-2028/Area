"use client";

import { useState, useEffect, useEffectEvent } from "react";

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  const setupMatches = useEffectEvent(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    return media;
  });

  useEffect(() => {
    const media = setupMatches();

    const listener = () => setMatches(media.matches);
    window.addEventListener("resize", listener);

    return () => window.removeEventListener("resize", listener);
  }, [matches, query]);

  return matches;
}
