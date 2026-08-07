"use client";

import { useState } from "react";
import { TIERS } from "./copy";

/**
 * Concentric tier diagram, ported from the Tier Stack prototype.
 *
 * Five nested rings, one per tier. Because each tier contains the one before
 * it, pointing at tier N lights every ring up to and including N — the
 * lighting is cumulative, not a single selection. The pointed-at tier is the
 * "lead": thicker stroke, a halo, and its description fades in.
 *
 * Nexus is lit on load so the diagram reads as explorable, and the selection
 * is sticky — moving away holds the last tier rather than going dark.
 *
 * Geometry is the prototype's, unchanged:
 *   ring i diameter = (160 + i * 108) / 760 of the square
 *   labels sit on a common anchor circle just outside the largest ring, at
 *   fixed angles, and a leader runs from each ring's edge out to its dot.
 * Label alignment flips off the horizontal component of its angle, so text on
 * the left of the circle is right-aligned into it and vice versa; the vertical
 * anchor flips off the vertical component, so a label always grows away from
 * the rings rather than back across them.
 *
 * The prototype was hover-only. Each label is a real button here, so the
 * diagram is reachable and readable by keyboard — focus lights the same path
 * hover does.
 */

const ANGLES = [200, 272, 340, 40, 112];
const BASE = 760;
const INNER = 160;
const STEP = 108;

const MAX_RAD = ((INNER + 4 * STEP) / BASE) * 50;
const ANCHOR = MAX_RAD + 13;

type Ring = ReturnType<typeof ringFor>;

function ringFor(i: number, active: number) {
  const pct = ((INNER + i * STEP) / BASE) * 100;
  const rad = pct / 2;
  const on = i <= active;
  const isLead = active === i;

  const a = (ANGLES[i] * Math.PI) / 180;
  const cos = Math.cos(a);
  const sin = Math.sin(a);

  return {
    i,
    on,
    isLead,
    pct,
    // where the leader meets this ring's edge
    px: 50 + rad * cos,
    py: 50 - rad * sin,
    rot: -ANGLES[i],
    leadLen: ANCHOR - rad,
    // label anchor, just beyond the outermost ring
    lx: 50 + (ANCHOR + 1) * cos,
    ly: 50 - (ANCHOR + 1) * sin,
    tx: cos < -0.15 ? "-100%" : cos > 0.15 ? "0" : "-50%",
    // The label box is only its header — the description is taken out of
    // layout (see .tier-desc) so a long one can never push the name away
    // from its leader line. The header sits just off the anchor; the
    // description then grows away from the rings rather than across them.
    dir: sin > 0.3 ? "up" : sin < -0.3 ? "down" : "side",
    ty: sin > 0.3 ? "calc(-100% - 10px)" : sin < -0.3 ? "10px" : "-50%",
    align: cos < -0.15 ? "right" : cos > 0.15 ? "left" : "center",
    justify: cos < -0.15 ? "flex-end" : cos > 0.15 ? "flex-start" : "center",
    num: String(i + 1).padStart(2, "0"),
    ...TIERS.items[i],
  };
}

function ringClass(r: Ring) {
  return `tier-ring${r.on ? " is-on" : ""}${r.isLead ? " is-lead" : ""}`;
}

export function Tiers() {
  // Nexus starts lit so the diagram reads as explorable rather than inert,
  // and the selection is sticky — pointing away leaves the last tier lit
  // instead of resetting to nothing.
  const [active, setActive] = useState(0);
  const rings = TIERS.items.map((_, i) => ringFor(i, active));
  // Rings paint largest-first so the smallest ends up on top. Labels stay in
  // natural order — they are absolutely positioned overlays, so their DOM
  // order does not affect the stack, and reversing them would put tab order
  // at 05 -> 01, backwards from the numbering a keyboard user is reading.
  const stacked = [...rings].reverse();

  return (
    <section id="products" className="section section-line">
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow">{TIERS.eyebrow}</span>
          <h2 className="display-2 balance">
            {TIERS.titleLead} <em>{TIERS.titleAccent}</em>
          </h2>
        </div>

        <div className="tier-stage">
          <div className="tier-plot">
            {/* the nested rings */}
            {stacked.map((r) => (
              <span
                key={r.i}
                className={ringClass(r)}
                aria-hidden="true"
                onMouseEnter={() => setActive(r.i)}
                style={{ width: `${r.pct}%`, height: `${r.pct}%` }}
              />
            ))}

            <span className="tier-core" aria-hidden="true">
              core
            </span>

            {/* leaders, dots and labels */}
            {rings.map((r) => (
              <div key={r.i} className="tier-layer">
                <span
                  className={`tier-lead${r.on ? " is-on" : ""}${r.isLead ? " is-lead" : ""}`}
                  aria-hidden="true"
                  style={{
                    left: `${r.px}%`,
                    top: `${r.py}%`,
                    width: `${r.leadLen}%`,
                    transform: `rotate(${r.rot}deg)`,
                  }}
                />
                <span
                  className={`tier-dot${r.on ? " is-on" : ""}${r.isLead ? " is-lead" : ""}`}
                  aria-hidden="true"
                  style={{ left: `${r.px}%`, top: `${r.py}%` }}
                />

                <button
                  type="button"
                  className={`tier-label${r.on ? " is-on" : ""}${r.isLead ? " is-lead" : ""}`}
                  onMouseEnter={() => setActive(r.i)}
                  onFocus={() => setActive(r.i)}
                  aria-pressed={r.isLead}
                  data-dir={r.dir}
                  style={{
                    left: `${r.lx}%`,
                    top: `${r.ly}%`,
                    transform: `translate(${r.tx}, ${r.ty})`,
                    textAlign: r.align as "left" | "right" | "center",
                  }}
                >
                  <span
                    className="tier-meta"
                    style={{ justifyContent: r.justify }}
                  >
                    <span className="tier-num">{r.num}</span>
                    <span className="tier-tick" />
                  </span>
                  <span className="tier-name">{r.name}</span>
                  <span className="tier-chip">{r.chip}</span>
                  <span className="tier-desc">{r.desc}</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
