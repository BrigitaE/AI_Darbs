import React from "react";
import { Highlight } from "@/lib/analyze/types";

type Props = {
  text: string;
  highlights: Highlight[];
};

export default function HighlightsText({ text, highlights }: Props) {
  if (!highlights.length) return <span>{text}</span>;

  // Merge and sort highlights
  const sorted = [...highlights].sort((a, b) => a.start - b.start);
  const parts: React.ReactNode[] = [];
  let last = 0;
  sorted.forEach((h, i) => {
    if (h.start > last) {
      parts.push(<span key={`plain-${i}`}>{text.slice(last, h.start)}</span>);
    }
    parts.push(
      <mark
        key={`hl-${i}`}
        className="bg-yellow-200 dark:bg-yellow-700 px-1 rounded"
        title={h.type}
      >
        {text.slice(h.start, h.end)}
      </mark>
    );
    last = h.end;
  });
  if (last < text.length) {
    parts.push(<span key="plain-last">{text.slice(last)}</span>);
  }
  return <span>{parts}</span>;
}
