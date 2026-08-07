"use client";

import { useEffect, useLayoutEffect } from "react";

/**
 * Gives every body section the same entrance the hero gets.
 *
 * Renders nothing — it observes `main > section` (and the footer) and marks
 * each one as it first enters the viewport. Anything already on screen at
 * load fades in immediately, which is the hero-adjacent case; anything below
 * the fold fades when you reach it, because a load-time animation on a
 * section three screens down finishes long before anyone sees it.
 *
 * The hidden state is gated behind `data-reveal="on"`, set in a layout effect
 * before paint. Without JS the attribute never lands and every section stays
 * plainly visible, so the page never depends on this to be readable.
 */

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export function RevealSections() {
  useIsomorphicLayoutEffect(() => {
    const root = document.documentElement;
    const targets = [
      ...document.querySelectorAll<HTMLElement>("main > section:not(#top)"),
      ...document.querySelectorAll<HTMLElement>("footer"),
    ];
    if (!targets.length) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    root.dataset.reveal = "on";

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -12% 0px" }
    );
    targets.forEach((el) => io.observe(el));

    return () => {
      io.disconnect();
      delete root.dataset.reveal;
    };
  }, []);

  return null;
}
