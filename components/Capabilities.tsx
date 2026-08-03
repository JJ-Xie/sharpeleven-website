import { CAPABILITIES } from "./copy";

export function Capabilities() {
  return (
    <section id="capabilities" className="section section-line">
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow">{CAPABILITIES.eyebrow}</span>
          <h2 className="display-2 balance">
            {CAPABILITIES.titleLead} <em>{CAPABILITIES.titleAccent}</em>
          </h2>
        </div>

        <div className="capabilities">
          {CAPABILITIES.items.map((c) => (
            <article key={c.num} className="capability">
              <span className="capability-num">{c.num}</span>
              <h3 className="display-3">{c.title}</h3>
              <p className="capability-body pretty">{c.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
