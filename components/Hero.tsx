"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { HERO } from "./copy";

/**
 * Full-viewport hero: the mark, rendered, holds the right of the frame while
 * the headline sits top-left against the empty half. The bottom rail carries
 * a centred scroll cue and nothing else.
 *
 * The hero is sticky rather than scrolling away — the next section rides up
 * over it while this one blurs back and fades in place. `--p` is scroll
 * progress across the first ~85% of a viewport, written to the element in a
 * single rAF and consumed by CSS.
 *
 * HERO.lede is intentionally unused here — it is kept in copy.ts so the line
 * is available if it wants a home elsewhere.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const write = () => {
      frame = 0;
      const span = window.innerHeight * 0.85;
      const p = Math.min(1, Math.max(0, window.scrollY / span));
      el.style.setProperty("--p", p.toFixed(4));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(write);
    };

    write();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section id="top" className="hero" ref={ref}>
      <div className="hero-bg">
        <Image
          src="/hero-bg-upscaled.png"
          alt=""
          fill
          priority
          quality={92}
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "50% 50%" }}
        />
      </div>

      <div className="wrap hero-inner">
        <div className="hero-head">
          <h1 className="display-1 hero-title pretty">
            {HERO.titleLead} <em>{HERO.titleAccent}</em> {HERO.titleTail}
          </h1>

          <a className="hero-cta" href="#contact">
            {HERO.cta}
            <span className="hero-cta-arrow" aria-hidden="true">
              →
            </span>
          </a>
        </div>

        <div className="hero-foot">
          <a className="hero-cue" href="#about">
            <span className="hero-cue-label">{HERO.scrollCue}</span>
            <span className="hero-cue-arrow" aria-hidden="true">
              ↓
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
