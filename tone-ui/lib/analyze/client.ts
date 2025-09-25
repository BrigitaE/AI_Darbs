import { AnalyzeResult, AnalyzeResultSchema } from "./types";

export async function analyzeText(text: string, lang?: string): Promise<AnalyzeResult> {
  const res = await fetch("/api/analyze", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text, lang }),
  });
  if (!res.ok) throw new Error("Failed to analyze text");
  const data = await res.json();
  return AnalyzeResultSchema.parse(data);
}
