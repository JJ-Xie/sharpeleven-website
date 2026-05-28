const TICKS = [
  { label: "4K", pct: 0 },
  { label: "32K", pct: 33.333 },
  { label: "128K", pct: 66.666 },
  { label: "1M+", pct: 100 },
];

export function ContextBar() {
  return (
    <div className="ctx-bar rise rise-3">
      <div className="ctx-bar-eyebrow">// context length</div>
      <div className="ctx-bar-track">
        <div className="ctx-bar-fill">
          <svg
            className="ctx-bar-arrow"
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="currentColor"
            aria-hidden
          >
            <path d="M0 0 L11 6 L0 12 Z" />
          </svg>
        </div>
        {TICKS.map((t) => (
          <span
            key={t.label}
            className="ctx-bar-tick"
            style={{ left: `${t.pct}%` }}
          />
        ))}
      </div>
      <div className="ctx-bar-labels">
        {TICKS.map((t) => (
          <span
            key={t.label}
            className="ctx-bar-label"
            style={{ left: `${t.pct}%` }}
          >
            {t.label}
          </span>
        ))}
      </div>
    </div>
  );
}
