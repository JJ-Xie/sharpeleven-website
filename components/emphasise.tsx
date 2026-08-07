import type { ReactNode } from "react";

/** Render `{braced}` runs in a copy string as <em>. */
export function emphasise(text: string): ReactNode[] {
  return text
    .split(/(\{[^}]*\})/)
    .map((part, i) =>
      part.startsWith("{") && part.endsWith("}") ? (
        <em key={i}>{part.slice(1, -1)}</em>
      ) : (
        part
      )
    );
}
