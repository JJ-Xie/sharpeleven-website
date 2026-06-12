"use client";

import { useEffect, useState } from "react";

type Tab = "problem" | "platform" | "deployment";

const TABS: { id: Tab; meta: string; label: string }[] = [
  { id: "problem", meta: "01 · 5 constraints", label: "Target Problems" },
  { id: "platform", meta: "02 · capabilities + advantage", label: "Solution" },
  { id: "deployment", meta: "03 · today + transfer", label: "Deployment" },
];

type LogItem = { num: string; label: string };

const PROBLEM_ITEMS: LogItem[] = [
  { num: "01", label: "inference cost eroding frontier-lab margins" },
  { num: "02", label: "serving cost rising rapidly with scale" },
  { num: "03", label: "slow, expensive, inaccurate long context" },
  { num: "04", label: "context windows that can't run long enough" },
  { num: "05", label: "no inherent explanation or interpretability of answers" },
];

const CAPABILITIES: LogItem[] = [
  { num: "A1", label: "substantially lower annual inference cost" },
  { num: "A2", label: "longer context, faster and more accurate" },
  { num: "A3", label: "answers explained inherently" },
];

const ADVANTAGES: LogItem[] = [
  { num: "B1", label: "processes more tokens than any model" },
  { num: "B2", label: "cheaper per token at long context" },
  { num: "B3", label: "faster long-context inference" },
  { num: "B4", label: "more accurate as inputs grow" },
];

const DEPLOYMENT_NOW: LogItem[] = [
  { num: "01", label: "deployed as a retrieval system" },
  { num: "02", label: "tested on real long-context workloads" },
];

const DEPLOYMENT_EXIT: LogItem[] = [
  { num: "03", label: "full proprietary architecture" },
  { num: "04", label: "transferred to a single acquirer" },
];

function LogList({
  items,
  status,
  variant,
}: {
  items: LogItem[];
  status: string;
  variant: "critical" | "enabled" | "scoped" | "compliant" | "fixed";
}) {
  return (
    <div className="log-list">
      {items.map((it) => (
        <div className="log-line" key={it.label}>
          <span className="log-num">[{it.num}]</span>
          <span className="log-label">{it.label}</span>
          <span className="log-leader" aria-hidden />
          <span className={`log-status log-status-${variant}`}>{status}</span>
        </div>
      ))}
    </div>
  );
}

const TAB_IDS = new Set<Tab>(["problem", "platform", "deployment"]);

export function Briefs() {
  const [active, setActive] = useState<Tab>("problem");

  useEffect(() => {
    const hash = window.location.hash.slice(1) as Tab;
    if (TAB_IDS.has(hash)) setActive(hash);

    const onClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement | null)?.closest(
        'a[href^="#"]'
      ) as HTMLAnchorElement | null;
      if (!link) return;
      const id = link.getAttribute("href")?.slice(1) as Tab;
      if (!id || !TAB_IDS.has(id)) return;
      e.preventDefault();
      setActive(id);
      const briefs = document.getElementById("briefs");
      if (briefs) {
        window.scrollTo({
          top: briefs.getBoundingClientRect().top + window.scrollY - 60,
          behavior: "smooth",
        });
      }
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return (
    <section
      id="briefs"
      className="border-b border-[color:var(--color-line)] pt-6 pb-24 sm:pt-10 sm:pb-32"
    >
      <div className="wrap">
        <div className="tab-doc">
          <div className="doc-tabs" role="tablist" aria-label="Briefs">
            <div className="chrome-dots" aria-hidden>
              <span className="chrome-dot" />
              <span className="chrome-dot" />
              <span className="chrome-dot" />
            </div>
            {TABS.map((t) => (
              <button
                key={t.id}
                role="tab"
                aria-selected={active === t.id}
                aria-controls={`panel-${t.id}`}
                id={`tab-${t.id}`}
                className={`doc-tab ${active === t.id ? "active" : ""}`}
                onClick={() => setActive(t.id)}
                title={t.meta}
              >
                <span className="doc-tab-label">{t.label}</span>
              </button>
            ))}
          </div>

          <div className="brief-page-stack">
            <article className="brief-page">
              <div
                role="tabpanel"
                aria-labelledby="tab-problem"
                id="panel-problem"
                className={`doc-panel-item ${
                  active === "problem" ? "is-active" : ""
                }`}
              >
                <div className="doc-header">
                  <span className="doc-label">Target Problems</span>
                  <span className="doc-page">5 constraints</span>
                </div>
                <p className="doc-intro">
                  Frontier AI is hitting three limits at once —{" "}
                  <em>inference cost</em>, <em>long context</em>, and{" "}
                  <em>interpretability</em>.
                </p>
                <p className="doc-body">
                  As models scale, today&apos;s architectures stay constrained on
                  every front:
                </p>
                <LogList
                  items={PROBLEM_ITEMS}
                  status="UNRESOLVED"
                  variant="critical"
                />

                <div className="doc-footer">
                  <span className="doc-meta">SharpEleven · Target Problems</span>
                  <span className="doc-page">doc 01 / 03</span>
                </div>
              </div>

              <div
                role="tabpanel"
                aria-labelledby="tab-platform"
                id="panel-platform"
                className={`doc-panel-item ${
                  active === "platform" ? "is-active" : ""
                }`}
              >
                <div className="doc-header">
                  <span className="doc-label">Solution</span>
                  <span className="doc-page">capabilities + advantage</span>
                </div>
                <p className="doc-intro">
                  SharpEleven is a <em>high-performance architecture</em> that
                  resolves all three at once.
                </p>
                <div className="brief-two-col">
                  <div>
                    <div className="col-head">The architecture delivers:</div>
                    <LogList
                      items={CAPABILITIES}
                      status="ENABLED"
                      variant="enabled"
                    />
                  </div>
                  <div>
                    <div className="col-head">Against other models:</div>
                    <LogList
                      items={ADVANTAGES}
                      status="BENCHMARKED"
                      variant="fixed"
                    />
                  </div>
                </div>
                <div className="doc-footer">
                  <span className="doc-meta">SharpEleven · Solution</span>
                  <span className="doc-page">doc 02 / 03</span>
                </div>
              </div>

              <div
                role="tabpanel"
                aria-labelledby="tab-deployment"
                id="panel-deployment"
                className={`doc-panel-item ${
                  active === "deployment" ? "is-active" : ""
                }`}
              >
                <div className="doc-header">
                  <span className="doc-label">Deployment</span>
                  <span className="doc-page">today + transfer</span>
                </div>
                <p className="doc-intro">
                  Deployed for testing as a <em>retrieval system</em>.
                  Architecture transfers in full to a <em>single acquirer</em>.
                </p>
                <div className="brief-two-col">
                  <div>
                    <div className="col-head">In market today:</div>
                    <LogList
                      items={DEPLOYMENT_NOW}
                      status="LIVE"
                      variant="fixed"
                    />
                  </div>
                  <div>
                    <div className="col-head">On acquisition:</div>
                    <LogList
                      items={DEPLOYMENT_EXIT}
                      status="ON EXIT"
                      variant="scoped"
                    />
                  </div>
                </div>
                <div className="doc-footer">
                  <span className="doc-meta">SharpEleven · Deployment</span>
                  <span className="doc-page">doc 03 / 03</span>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
