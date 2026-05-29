export function Contact() {
  return (
    <section id="contact" className="py-24 sm:py-32">
      <div className="wrap">
        <div
          className="brackets relative overflow-hidden rounded-[18px] border border-[color:var(--color-line)] p-11 sm:p-[60px] sm:py-[72px]"
          style={{
            background:
              "radial-gradient(ellipse at top right, rgba(74,149,201,0.22), transparent 50%), radial-gradient(ellipse at bottom left, rgba(194,103,74,0.12), transparent 55%), var(--color-bg-2)",
          }}
        >
          <div className="mb-7 flex items-center gap-[14px] font-mono-cust text-[11px] uppercase tracking-[0.18em] text-[color:var(--color-sage-2)]">
            <span
              aria-hidden
              className="inline-block h-px w-6 bg-[color:var(--color-sage)]"
            />
            <span>Contact</span>
          </div>
          <h2
            className="mb-5 max-w-[740px] text-balance"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 400,
              fontSize: "clamp(32px, 4vw, 56px)",
              lineHeight: 1.06,
              letterSpacing: "-0.015em",
              color: "var(--color-ink)",
            }}
          >
            Currently engaging with{" "}
            <span
              style={{
                fontStyle: "italic",
                color: "var(--color-sage-2)",
              }}
            >
              select organizations.
            </span>
          </h2>
          <p
            className="mb-9 max-w-[580px] text-[17px] text-[color:var(--color-ink-2)]"
            style={{ lineHeight: 1.6 }}
          >
            SharpEleven is in pilot with a small set of partners for technical
            demonstrations, deployments, and strategic collaborations. To
            begin a conversation:
          </p>

          <div className="flex flex-wrap items-center gap-3">
            {/* TODO: replace with the real contact address before launch */}
            <a
              href="mailto:research@sharp-eleven.com"
              className="inline-flex items-center gap-[10px] rounded-full border border-[color:var(--color-line-2)] bg-[color:var(--color-bg)] px-[18px] py-3 font-mono-cust text-[14px] text-[color:var(--color-ink)] transition-colors duration-200 hover:border-[color:var(--color-ink-2)] hover:bg-[color:var(--color-bg-3)]"
            >
              <span className="text-[color:var(--color-sage-2)]">→</span>
              research@sharp-eleven.com
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
