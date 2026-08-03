import Image from "next/image";
import { HERO } from "./copy";

export function Hero() {
  return (
    <section id="top" className="hero">
      {/* Full-bleed artwork. Its own upper field is nearly empty, so the
          headline sits on clean ground; the mask below fades what little is
          up there so nothing competes with the type. Anchored to the bottom
          so the crop takes from the empty sky, never from the horizon. */}
      <div className="hero-backdrop">
        <Image
          src="/hero-bg.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "50% 100%" }}
        />
      </div>

      <div className="wrap">
        <div className="hero-head">
          <div className="hero-eyebrow">
            <span className="eyebrow">{HERO.eyebrow}</span>
          </div>

          <h1 className="display-1 hero-title balance">
            {HERO.titleLead} <em>{HERO.titleAccent}</em>
          </h1>

          <p className="lede hero-lede pretty">{HERO.lede}</p>

          <ul className="hero-props">
            {HERO.props.map((p) => (
              <li key={p.num} className="hero-prop">
                <span className="hero-prop-num">{p.num}</span>
                <span className="hero-prop-label">{p.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
