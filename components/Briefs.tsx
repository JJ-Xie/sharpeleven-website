"use client";

import { useState } from "react";
import { BRIEFS } from "./copy";
import { emphasise } from "./emphasise";

/**
 * The browser-chrome brief viewer, moved across from the main branch.
 *
 * Two deliberate changes from main's version:
 *
 *   - No global hash-link interception. Main attached a document-level click
 *     listener that hijacked every `a[href^="#"]`, so the nav's "#problem"
 *     and "#platform" links pointed at IDs that existed nowhere and drove
 *     these tabs instead. The nav here links to real sections, so the tabs
 *     are self-contained and the section has one honest anchor, `#about`.
 *   - Copy lives in copy.ts, not inline.
 *
 * Colours are this branch's tokens; the type is this branch's faces. The
 * layout, the chrome and the log-line treatment are main's.
 */

type Tone = "critical" | "enabled" | "proven" | "scoped";
type PanelId = keyof typeof BRIEFS.panels;

function LogList({
  items,
  status,
  tone,
}: {
  items: { num: string; label: string }[];
  status: string;
  tone: Tone;
}) {
  return (
    <div className="log-list">
      {items.map((it) => (
        <div className="log-line" key={it.num + it.label}>
          <span className="log-num">[{it.num}]</span>
          <span className="log-label">{it.label}</span>
          <span className="log-leader" aria-hidden="true" />
          <span className={`log-status log-status-${tone}`}>{status}</span>
        </div>
      ))}
    </div>
  );
}

export function Briefs() {
  const [active, setActive] = useState<PanelId>("problem");

  return (
    <section id="about" className="section section-line">
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow">{BRIEFS.eyebrow}</span>
          <h2 className="display-2 balance">
            {BRIEFS.titleLead} <em>{BRIEFS.titleAccent}</em>
          </h2>
        </div>

        <div className="tab-doc">
          <div className="doc-tabs" role="tablist" aria-label="Briefs">
            <span className="chrome-dots" aria-hidden="true">
              <span className="chrome-dot" />
              <span className="chrome-dot" />
              <span className="chrome-dot" />
            </span>
            {BRIEFS.tabs.map((t) => (
              <button
                key={t.id}
                type="button"
                role="tab"
                id={`tab-${t.id}`}
                aria-selected={active === t.id}
                aria-controls={`panel-${t.id}`}
                className={`doc-tab${active === t.id ? " active" : ""}`}
                onClick={() => setActive(t.id as PanelId)}
              >
                {t.label}
              </button>
            ))}
          </div>

          <article className="brief-page">
            {(Object.keys(BRIEFS.panels) as PanelId[]).map((id) => {
              const panel = BRIEFS.panels[id];
              const twoCol = panel.columns.length > 1;
              return (
                <div
                  key={id}
                  role="tabpanel"
                  id={`panel-${id}`}
                  aria-labelledby={`tab-${id}`}
                  hidden={active !== id}
                  className={`doc-panel${active === id ? " is-active" : ""}`}
                >
                  <div className="doc-header">
                    <span className="doc-label">{panel.docLabel}</span>
                    <span className="doc-page">{panel.docPage}</span>
                  </div>

                  <p className="doc-intro">{emphasise(panel.intro)}</p>
                  {panel.body && <p className="doc-body">{panel.body}</p>}

                  {twoCol ? (
                    <div className="brief-two-col">
                      {panel.columns.map((c) => (
                        <div key={c.head}>
                          {c.head && <div className="col-head">{c.head}</div>}
                          <LogList
                            items={c.items}
                            status={c.status}
                            tone={c.tone}
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    panel.columns.map((c) => (
                      <div key={c.status}>
                        {c.head && <div className="col-head">{c.head}</div>}
                        <LogList
                          items={c.items}
                          status={c.status}
                          tone={c.tone}
                        />
                      </div>
                    ))
                  )}

                  <div className="doc-footer">
                    <span className="doc-meta">{panel.footMeta}</span>
                    <span className="doc-page">{panel.footPage}</span>
                  </div>
                </div>
              );
            })}
          </article>
        </div>
      </div>
    </section>
  );
}
