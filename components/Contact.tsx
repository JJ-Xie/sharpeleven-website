import { CONTACT } from "./copy";

export function Contact() {
  return (
    <section id="contact" className="section section-line">
      <div className="wrap">
        <div className="contact-card">
          <span
            className="eyebrow"
            style={{ display: "block", marginBottom: "var(--space-6)" }}
          >
            {CONTACT.eyebrow}
          </span>

          <h2
            className="display-2 balance"
            style={{ marginBottom: "var(--space-8)" }}
          >
            {CONTACT.titleLead} <em>{CONTACT.titleAccent}</em>
          </h2>

          <p
            className="prose measure pretty"
            style={{ marginBottom: "var(--space-12)" }}
          >
            {CONTACT.body}
          </p>

          <a className="mailto" href={`mailto:${CONTACT.email}`}>
            <span className="mailto-arrow" aria-hidden="true">
              →
            </span>
            {CONTACT.email}
          </a>
        </div>
      </div>
    </section>
  );
}
