"use client";
import { useState } from "react";
import { AnalyzeResult } from "@/lib/analyze/types";
import ScoreBar from "@/components/tone/ScoreBar";
import ToneBadge from "@/components/tone/ToneBadge";
import HighlightsText from "@/components/tone/HighlightsText";
import ConfidenceGauge from "@/components/tone/ConfidenceGauge";

type Props = {
  result: AnalyzeResult;
};

export default function ResultPanel({ result }: Props) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(result.summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  }

  function handleExport() {
    const blob = new Blob([JSON.stringify(result, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "tone-analysis.json";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="bg-gray-50 dark:bg-zinc-900 rounded-lg shadow p-6 w-full max-w-xl mt-8">
      <div className="flex items-center gap-3 mb-4">
        <span className="font-semibold">Sentiment:</span>
        <span>
          <ToneBadge label={result.sentiment} />
        </span>
      </div>
      <div className="mb-4">
        <span className="font-semibold">Top emotions:</span>
        <div className="flex flex-col gap-2 mt-2">
          {result.emotions.slice(0, 3).map(e => (
            <ScoreBar key={e.label} label={e.label} score={e.score} />
          ))}
        </div>
      </div>
      <div className="mb-4 flex gap-2">
        {result.badges.map(b => (
          <ToneBadge key={b.label} label={b.label} value={b.value} />
        ))}
      </div>
      <div className="mb-4">
        <span className="font-semibold">Highlights:</span>
        <HighlightsText text={result.summary} highlights={result.highlights} />
      </div>
      <div className="mb-4">
        <ConfidenceGauge value={result.confidence} />
      </div>
      <div className="flex gap-2">
        <button
          className="bg-gray-200 dark:bg-zinc-700 px-3 py-1 rounded text-sm"
          onClick={handleCopy}
        >
          {copied ? "Copied!" : "Copy summary"}
        </button>
        <button
          className="bg-gray-200 dark:bg-zinc-700 px-3 py-1 rounded text-sm"
          onClick={handleExport}
        >
          Export JSON
        </button>
      </div>
    </div>
  );
}
