"use client";
import { useState } from "react";
import { analyzeText } from "@/lib/analyze/client";
import { AnalyzeResult } from "@/lib/analyze/types";

type Props = {
  onResult: (result: AnalyzeResult) => void;
};

export default function InputCard({ onResult }: Props) {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const charLimit = 10000;

  async function handleAnalyze() {
    setLoading(true);
    setError(null);
    try {
      const result = await analyzeText(text);
      onResult(result);
    } catch (e) {
      const message = e instanceof Error ? e.message : "Analysis failed";
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white dark:bg-black rounded-lg shadow p-6 w-full max-w-xl">
      <textarea
        className="w-full border rounded p-2 min-h-[120px] font-mono"
        maxLength={charLimit}
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Paste or type your text here (max 10,000 chars)"
        disabled={loading}
      />
      <div className="flex justify-between items-center mt-2 text-sm">
        <span
          className={
            text.length > charLimit
              ? "text-red-500"
              : text.length > charLimit - 100
              ? "text-yellow-600"
              : "text-gray-500"
          }
        >
          {text.length}/{charLimit}
        </span>
        <button
          className="bg-blue-600 text-white px-4 py-1.5 rounded disabled:opacity-50"
          onClick={handleAnalyze}
          disabled={loading || text.length < 3 || text.length > charLimit}
        >
          {loading ? "Analyzing..." : "Analyze"}
        </button>
      </div>
      {error && (
        <div className="mt-3 text-red-600 text-sm" role="alert">
          {error}
        </div>
      )}
    </div>
  );
}
