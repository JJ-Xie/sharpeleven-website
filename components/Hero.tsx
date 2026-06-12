import { ContextBar } from "./ContextBar";

export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden pt-20 pb-10 sm:pt-[100px] sm:pb-12"
    >
      <div className="wrap">
        <div className="max-w-[820px]">
          <h1
            className="rise rise-1 mb-7 text-balance"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 400,
              fontSize: "clamp(40px, 6vw, 80px)",
              lineHeight: 1.02,
              letterSpacing: "-0.025em",
              color: "var(--color-ink)",
            }}
          >
            High Performance architecture{" "}
            <span
              style={{
                fontStyle: "italic",
                color: "var(--color-sage-2)",
              }}
            >
              for frontier
            </span>{" "}
            <span style={{ color: "var(--color-ink)" }}>AI systems.</span>
          </h1>

          <p
            className="rise rise-2 max-w-[560px] text-pretty"
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(19px, 1.55vw, 22px)",
              lineHeight: 1.5,
              color: "var(--color-ink-2)",
              letterSpacing: "-0.003em",
              fontVariationSettings: '"opsz" 28',
            }}
          >
            Architecting the next paradigm shift for <em>high performance</em> AI systems.
          </p>

          <ContextBar />
        </div>
      </div>
    </section>
  );
}
