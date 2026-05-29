import { LogoMark } from "./LogoMark";

export function Nav() {
  return (
    <header
      className="sticky top-0 z-50 border-b border-[color:var(--color-line)] backdrop-blur-[14px]"
      style={{ background: "rgba(239, 234, 224, 0.78)" }}
    >
      <div className="wrap flex h-[68px] items-center justify-between">
        <a href="#top" className="flex items-center gap-2">
          <LogoMark size={44} />
          <span
            className="text-[18px] font-bold tracking-[-0.035em] text-[color:var(--color-ink)]"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Sharp
            <span
              className="text-[color:var(--color-sage-2)]"
              style={{
                fontFamily: "var(--font-display)",
                fontStyle: "italic",
                fontWeight: 400,
                fontSize: "1.32em",
                marginLeft: 2,
                letterSpacing: 0,
                lineHeight: 1,
              }}
            >
              Eleven
            </span>
          </span>
        </a>
        <nav className="hidden items-center gap-9 sm:flex">
          <a
            href="#problem"
            className="text-[14px] font-medium text-[color:var(--color-ink-2)] transition-colors hover:text-[color:var(--color-ink)]"
            style={{ fontFamily: "var(--font-sans)", letterSpacing: "-0.01em" }}
          >
            Target Problem
          </a>
          <a
            href="#platform"
            className="text-[14px] font-medium text-[color:var(--color-ink-2)] transition-colors hover:text-[color:var(--color-ink)]"
            style={{ fontFamily: "var(--font-sans)", letterSpacing: "-0.01em" }}
          >
            Platform
          </a>
          <a
            href="#deployment"
            className="text-[14px] font-medium text-[color:var(--color-ink-2)] transition-colors hover:text-[color:var(--color-ink)]"
            style={{ fontFamily: "var(--font-sans)", letterSpacing: "-0.01em" }}
          >
            Deployment
          </a>
          <a
            href="#contact"
            className="text-[14px] font-medium text-[color:var(--color-ink-2)] transition-colors hover:text-[color:var(--color-ink)]"
            style={{ fontFamily: "var(--font-sans)", letterSpacing: "-0.01em" }}
          >
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
}
