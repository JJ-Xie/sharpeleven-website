import Image from "next/image";
import { NAV } from "./copy";

export function Nav() {
  return (
    <header className="nav">
      <div className="wrap nav-inner">
        <a href="#top" className="nav-brand" aria-label="SharpEleven, back to top">
          <Image
            src="/logo.png"
            alt=""
            width={26}
            height={26}
            priority
            style={{ display: "block" }}
          />
          <span className="nav-wordmark">
            Sharp<em>Eleven</em>
          </span>
        </a>
        <nav className="nav-links" aria-label="Sections">
          {NAV.map((l) => (
            <a key={l.href} href={l.href} className="nav-link">
              {l.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
