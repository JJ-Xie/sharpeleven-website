/**
 * PLACEHOLDER COPY — every user-facing string on the page lives here.
 *
 * All of it is provisional. Lengths are set to roughly what the real copy
 * should run so the layout is honest, but none of the wording is final and
 * no claim here should be treated as approved. Replace in place; the
 * components read from this file and nothing else.
 */

export const BRAND = "SharpEleven";

export const HERO = {
  eyebrow: "Placeholder — category and positioning line",
  /* <em> marks the italic accent phrase in the headline */
  titleLead: "Placeholder headline that carries",
  titleAccent: "the primary claim.",
  lede: "Placeholder subheading. Two lines of supporting copy that sit at about the length the final sentence should run, so the measure and the wrap are real.",
  props: [
    { num: "01", label: "First property placeholder" },
    { num: "02", label: "Second property placeholder" },
    { num: "03", label: "Third property placeholder" },
    { num: "04", label: "Fourth property placeholder" },
  ],
};

export const CAPABILITIES = {
  eyebrow: "Section 01 — Placeholder",
  titleLead: "Placeholder section heading for",
  titleAccent: "the capability list.",
  items: [
    {
      num: "01",
      title: "First capability placeholder",
      body: "Placeholder body copy for the first capability. Two to three lines describing what it is and why it matters, at roughly the length the final copy should run.",
    },
    {
      num: "02",
      title: "Second capability placeholder",
      body: "Placeholder body copy for the second capability. Two to three lines describing what it is and why it matters, at roughly the length the final copy should run.",
    },
    {
      num: "03",
      title: "Third capability placeholder",
      body: "Placeholder body copy for the third capability. Two to three lines describing what it is and why it matters, at roughly the length the final copy should run.",
    },
    {
      num: "04",
      title: "Fourth capability placeholder",
      body: "Placeholder body copy for the fourth capability. Two to three lines describing what it is and why it matters, at roughly the length the final copy should run.",
    },
  ],
};

export const FIGURES = {
  eyebrow: "Section 02 — Placeholder",
  titleLead: "Placeholder heading for",
  titleAccent: "the measured figures.",
  caption:
    "Placeholder caption explaining what the table below measures and why the comparison is a fair one.",
  columns: ["Measurement", "This system", "Comparison", "Note"],
  rows: [
    ["Placeholder measurement one", "0.0000", "0.0000", "placeholder note"],
    ["Placeholder measurement two", "0.0000", "0.0000", "placeholder note"],
    ["Placeholder measurement three", "0.0000", "0.0000", "placeholder note"],
    ["Placeholder measurement four", "0.0000", "—", "placeholder note"],
  ],
  footnote:
    "Placeholder footnote for any caveat or precision statement that belongs under the table.",
};

export const CONTACT = {
  eyebrow: "Section 03 — Placeholder",
  titleLead: "Placeholder contact heading for",
  titleAccent: "the closing section.",
  body: "Placeholder paragraph describing who the company is speaking with and what a first conversation looks like.",
  /* TODO: confirm the real address before launch. */
  email: "placeholder@sharp-eleven.com",
};

export const NAV = [
  { href: "#capabilities", label: "Section 01" },
  { href: "#figures", label: "Section 02" },
  { href: "#contact", label: "Contact" },
];

export const FOOTER = `${BRAND} · © 2026`;
