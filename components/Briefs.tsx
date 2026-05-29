"use client";

import { useEffect, useState } from "react";

type Tab = "problem" | "platform" | "deployment";

const TABS: { id: Tab; meta: string; label: string }[] = [
  { id: "problem", meta: "01 · 5 constraints", label: "Target Problem" },
  { id: "platform", meta: "02 · capabilities + applications", label: "Platform" },
  { id: "deployment", meta: "03 · 4 properties", label: "Deployment" },
];

type LogItem = { num: string; label: string };

const PROBLEM_ITEMS: LogItem[] = [
  { num: "01", label: "inference cost" },
  { num: "02", label: "latency" },
  { num: "03", label: "memory utilization" },
  { num: "04", label: "response reliability" },
  { num: "05", label: "deployment privacy" },
];

const CAPABILITIES: LogItem[] = [
  { num: "A1", label: "support large-context document environments" },
  { num: "A2", label: "reduce memory and compute overhead" },
  { num: "A3", label: "integrate with existing model stacks" },
  { num: "A4", label: "operate within customer-controlled infrastructure" },
];

const APPLICATIONS: LogItem[] = [
  { num: "B1", label: "large and multi document analysis" },
  { num: "B2", label: "enterprise knowledge systems" },
  { num: "B3", label: "diligence workflows" },
  { num: "B4", label: "research and compliance environments" },
];

const DEPLOYMENT_ITEMS: LogItem[] = [
  { num: "01", label: "On-premise compatible" },
  { num: "02", label: "Customer-controlled infrastructure" },
  { num: "03", label: "No external document transfer required" },
  { num: "04", label: "Compatible with existing enterprise AI workflows" },
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
                  <span className="doc-label">Target Problem</span>
                  <span className="doc-page">5 constraints</span>
                </div>
                <p className="doc-intro">
                  Modern AI systems scale poorly across large-context
                  environments.
                </p>
                <p className="doc-body">
                  Organizations handling large proprietary datasets require
                  systems capable of operating efficiently at extreme context
                  lengths within secure environments.
                </p>
                <p className="doc-body">
                  As enterprise document workloads grow, current architectures
                  face increasing constraints in:
                </p>
                <LogList
                  items={PROBLEM_ITEMS}
                  status="UNRESOLVED"
                  variant="critical"
                />
                
                <div className="doc-footer">
                  <span className="doc-meta">SharpEleven · Target Problem</span>
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
                  <span className="doc-label">Platform</span>
                  <span className="doc-page">capabilities + applications</span>
                </div>
                <p className="doc-intro">
                  SharpEleven develops <em>scalable long-context infrastructure </em> 
                  for <em>enterprise AI</em> workflows.
                </p>
                <div className="brief-two-col">
                  <div>
                    <div className="col-head">The platform is designed to:</div>
                    <LogList
                      items={CAPABILITIES}
                      status="ENABLED"
                      variant="enabled"
                    />
                  </div>
                  <div>
                    <div className="col-head">Target applications include:</div>
                    <LogList
                      items={APPLICATIONS}
                      status="SCOPED"
                      variant="scoped"
                    />
                  </div>
                </div>
                <div className="doc-footer">
                  <span className="doc-meta">SharpEleven · Platform</span>
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
                  <span className="doc-page">4 properties</span>
                </div>
                <p className="doc-intro">
                  Designed for <em>private deployment environments</em>.
                </p>
                <LogList
                  items={DEPLOYMENT_ITEMS}
                  status="COMPLIANT"
                  variant="compliant"
                />
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
