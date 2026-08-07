"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { BRAND, NAV } from "./copy";

/**
 * Horizontal header, fixed to the top.
 *
 * Brand and links sit at constant pixel offsets rather than inside the page
 * container, so neither drifts inward as the window widens.
 *
 * Two pieces of state, both from IntersectionObserver rather than a scroll
 * handler — observers fire only on threshold crossings, so this costs nothing
 * per frame:
 *   - which section is in view, which sets the active link
 *   - whether the page has moved off the very top, which decides if the bar
 *     carries a surface. Solid from the first pixel of scroll, so it stays
 *     dominant over the hero as well as over content.
 */

const IDS = NAV.map((l) => l.href.slice(1));

export function SiteHeader() {
  const [active, setActive] = useState<string | null>(null);
  const [stuck, setStuck] = useState(false);

  useEffect(() => {
    const sections = IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null
    );

    // active when a section crosses the middle band of the viewport
    const spy = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((el) => spy.observe(el));

    // A 1px marker at the very top of the document. The moment it leaves the
    // viewport the bar takes its surface, so it becomes solid as soon as the
    // page moves at all rather than waiting for the hero to clear.
    const sentinel = document.getElementById("top-sentinel");
    const surface = new IntersectionObserver(([e]) => setStuck(!e.isIntersecting));
    if (sentinel) surface.observe(sentinel);

    return () => {
      spy.disconnect();
      surface.disconnect();
    };
  }, []);

  return (
    <header className="site-header" data-stuck={stuck || undefined}>
      <a className="brand" href="#top" aria-label={`${BRAND}, back to top`}>
        <Image src="/logo.png" alt="" width={26} height={26} priority />
        <span className="brand-word">
          Sharp<em>Eleven</em>
        </span>
      </a>

      <nav className="site-nav" aria-label="Sections">
        {NAV.map((l) => {
          const isActive = active === l.href.slice(1);
          return (
            <a
              key={l.href}
              href={l.href}
              aria-current={isActive ? "true" : undefined}
            >
              {l.label}
            </a>
          );
        })}
      </nav>
    </header>
  );
}
