import Link from "next/link";

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: "calc(100vh - 200px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 16,
        padding: 32,
        textAlign: "center",
      }}
    >
      <p
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "var(--color-sage-2)",
        }}
      >
        404 · Not Found
      </p>
      <h1
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(32px, 4vw, 52px)",
          lineHeight: 1.06,
          letterSpacing: "-0.015em",
          margin: 0,
          color: "var(--color-ink)",
        }}
      >
        This page doesn&apos;t exist.
      </h1>
      <Link
        href="/"
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: 14,
          fontWeight: 500,
          color: "var(--color-sage-2)",
          marginTop: 8,
        }}
      >
        ← Back to home
      </Link>
    </main>
  );
}
