import { LogoMark } from "./LogoMark";

export function Footer() {
  return (
    <footer className="pb-16 pt-[52px] font-mono-cust text-[12.5px] tracking-[0.04em] text-[color:var(--color-ink-3)]">
      <div className="wrap grid items-center gap-6 sm:grid-cols-[auto_1fr] sm:gap-8">
        <div className="flex items-center gap-3 text-[color:var(--color-ink-2)]">
          <LogoMark size={16} />
          <span>SharpEleven &nbsp;·&nbsp; © 2026</span>
        </div>
        <div className="flex flex-wrap gap-[22px] sm:justify-self-end">
          <a
            href="#problem"
            className="transition-colors hover:text-[color:var(--color-ink)]"
          >
            Problem
          </a>
          <a
            href="#platform"
            className="transition-colors hover:text-[color:var(--color-ink)]"
          >
            Solution
          </a>
          <a
            href="#deployment"
            className="transition-colors hover:text-[color:var(--color-ink)]"
          >
            Deployment
          </a>
          <a
            href="#contact"
            className="transition-colors hover:text-[color:var(--color-ink)]"
          >
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
