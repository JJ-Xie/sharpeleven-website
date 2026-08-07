/**
 * All user-facing strings.
 *
 * Hero, Briefs and Contact carry the real copy, moved across from the main
 * branch. Tiers carries the copy from the Tier Stack prototype.
 *
 * `{braces}` mark an emphasised run. Components render them as <em>; see
 * `emphasise()` in Briefs.tsx. Keep the markers in the copy rather than
 * splitting sentences across props — it keeps the wording readable here.
 */

export const BRAND = "SharpEleven";

/* No eyebrow: the hero opens on the headline. */
export const HERO = {
  titleLead: "High Performance architecture",
  titleAccent: "for frontier",
  titleTail: "AI systems.",
  lede: "Architecting the next paradigm shift for {high performance} AI systems.",
  cta: "Start a conversation",
  scrollCue: "Scroll to explore",
};

/* The tabbed brief viewer. Content is main's, verbatim. */
export const BRIEFS = {
  eyebrow: "About",
  titleLead: "Our",
  titleAccent: "Vision.",
  tabs: [
    { id: "problem", label: "Target Problems" },
    { id: "platform", label: "Solution" },
    { id: "deployment", label: "Deployment" },
  ],
  panels: {
    problem: {
      docLabel: "Target Problems",
      docPage: "6 constraints",
      intro:
        "Frontier AI is hitting three limits at once — {inference cost}, {long context}, and {interpretability}.",
      body: "As models scale, today's architectures stay constrained on major fronts:",
      columns: [
        {
          head: null,
          status: "Unresolved",
          tone: "critical" as const,
          items: [
            { num: "01", label: "enterprise AI costs continue to rise" },
            { num: "02", label: "inference cost eroding frontier-lab margins" },
            { num: "03", label: "serving cost rising rapidly with scale" },
            { num: "04", label: "slow, expensive, inaccurate long context" },
            { num: "05", label: "context windows that can't run long enough" },
            {
              num: "06",
              label: "no inherent explanation or interpretability of answers",
            },
          ],
        },
      ],
      footMeta: "SharpEleven · Target Problems",
      footPage: "doc 01 / 03",
    },
    platform: {
      docLabel: "Solution",
      docPage: "capabilities + advantage",
      intro:
        "SharpEleven is a {high-performance architecture} that resolves all three at once.",
      body: null,
      columns: [
        {
          head: "The architecture delivers:",
          status: "Enabled",
          tone: "enabled" as const,
          items: [
            { num: "A1", label: "substantially lower annual inference cost" },
            { num: "A2", label: "longer context, faster and more accurate" },
            { num: "A3", label: "answers explained inherently" },
            { num: "A4", label: "frontier multimodal capabilities" },
            {
              num: "A5",
              label: "ever-expanding multilingual and code understanding",
            },
          ],
        },
        {
          head: "Against other models:",
          status: "Benchmarked",
          tone: "proven" as const,
          items: [
            { num: "B1", label: "processes more tokens than any model" },
            { num: "B2", label: "cheaper per token at long context" },
            { num: "B3", label: "faster long-context inference" },
            { num: "B4", label: "more accurate as inputs grow" },
          ],
        },
      ],
      footMeta: "SharpEleven · Solution",
      footPage: "doc 02 / 03",
    },
    deployment: {
      docLabel: "Deployment",
      docPage: "In pilot/production",
      intro:
        "Deploying in pilot and production in a {multitude of applications}.",
      body: null,
      columns: [
        {
          head: "In market today:",
          status: "Live",
          tone: "proven" as const,
          items: [
            { num: "01", label: "tested in real and extreme long-context workloads" },
            {
              num: "02",
              label: "deployed as retrieval system with capabilities far exceeding standard RAG",
            },
            {
              num: "03",
              label: "available for heavy workloads in code, agentic, legal, financial, and applications beyond",
            },
            {
              num: "04",
              label: "extreme system agnostic design for flexibility of integration",
            },
            {
              num: "05",
              label: "available in API and licensing for on-premise or off-premise applications",
            },
          ],
        },
      ],
      footMeta: "SharpEleven · Deployment",
      footPage: "doc 03 / 03",
    },
  },
};

/* Model tiers — the concentric ring diagram. Each tier wraps the one before
   it, so hovering tier N lights every tier up to and including N. */
export const TIERS = {
  eyebrow: "Products",
  titleLead: "Growing Our",
  titleAccent: "Capabilities.",
  items: [
    {
      name: "Nexus",
      chip: "[ Base Text ]",
      desc: "Foundational model with efficient, long-context, interpretable text capabilities.",
    },
    {
      name: "Prism",
      chip: "[ Text + Multimodal v1 ]",
      desc: "Adds multimodal reasoning to the foundational model, allowing for image, video, and cross-doc processing.",
    },
    {
      name: "Echo",
      chip: "[ Text + Multilingual and Code ]",
      desc: "New base model with increased capacity for multilingual and code.",
    },
    {
      name: "Harmony",
      chip: "[ + Multimodal v2 ]",
      desc: "Appends multimodal skills to the multilingual and code capable model.",
    },
    {
      name: "Serenity",
      chip: "[ + Streaming ]",
      desc: "Flagship model with special efficiency and optimization features.",
    },
  ],
};

export const CONTACT = {
  eyebrow: "Contact",
  titleLead: "Currently engaging with",
  titleAccent: "select organizations.",
  body: "SharpEleven is in contact with a small set of partners for technical demonstrations, deployments, and strategic collaborations. To begin a conversation:",
  /* TODO: confirm the real address before launch. main shipped a mailto for
     research@ behind a label reading victor@; this is the label's value. */
  email: "victor@sharp-eleven.com",
};

export const NAV = [
  { href: "#about", label: "About" },
  { href: "#products", label: "Products" },
  { href: "#contact", label: "Contact" },
];

export const FOOTER = `${BRAND} · © 2026`;
