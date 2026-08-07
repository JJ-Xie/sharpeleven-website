import Image from "next/image";
import { FOOTER, NAV } from "./copy";

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-inner">
        <span style={{ display: "inline-flex", alignItems: "center", gap: 12 }}>
          <Image src="/logo.png" alt="" width={15} height={15} />
          {FOOTER}
        </span>
        <div className="footer-links">
          {NAV.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
