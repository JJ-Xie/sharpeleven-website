import Link from "next/link";

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: "72vh",
        display: "grid",
        placeItems: "center",
        textAlign: "center",
        padding: "var(--space-8)",
      }}
    >
      <div>
        <p className="eyebrow" style={{ marginBottom: "var(--space-6)" }}>
          404 · Not found
        </p>
        <h1 className="display-2 balance" style={{ marginBottom: "var(--space-8)" }}>
          This page doesn&apos;t <em>exist.</em>
        </h1>
        <Link className="mailto" href="/">
          <span className="mailto-arrow" aria-hidden="true">
            ←
          </span>
          Back to home
        </Link>
      </div>
    </main>
  );
}
