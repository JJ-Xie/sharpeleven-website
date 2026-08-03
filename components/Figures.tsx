import { FIGURES } from "./copy";

export function Figures() {
  return (
    <section id="figures" className="section section-line">
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow">{FIGURES.eyebrow}</span>
          <h2 className="display-2 balance">
            {FIGURES.titleLead} <em>{FIGURES.titleAccent}</em>
          </h2>
        </div>

        <div className="figures-scroll">
          <table className="figures">
            <caption className="prose measure pretty">
              {FIGURES.caption}
            </caption>
            <thead>
              <tr>
                {FIGURES.columns.map((c) => (
                  <th key={c} scope="col">
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {FIGURES.rows.map((row) => (
                <tr key={row[0]}>
                  <td>{row[0]}</td>
                  <td className="fig fig-accent">{row[1]}</td>
                  <td className="fig">{row[2]}</td>
                  <td>{row[3]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p
          className="prose measure pretty"
          style={{ marginTop: "var(--space-12)" }}
        >
          {FIGURES.footnote}
        </p>
      </div>
    </section>
  );
}
