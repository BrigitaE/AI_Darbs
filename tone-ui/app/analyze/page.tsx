import { useState } from "react";
import InputCard from "@/components/tone/InputCard";
import ResultPanel from "@/components/tone/ResultPanel";
import { AnalyzeResult } from "@/lib/analyze/types";

export default function AnalyzePage() {
  const [result, setResult] = useState<AnalyzeResult | null>(null);

  return (
    <div className="flex flex-col items-center min-h-screen py-12 px-4">
      <h1 className="text-2xl font-bold mb-6">Analyze Tone</h1>
      <InputCard onResult={setResult} />
      {result && <ResultPanel result={result} />}
    </div>
  );
}
"use client";

import { useState } from "react";

"use client";
git add tone-ui/app/analyze/page.tsx
git commit -m "fix: add 'use client' directive to analyze page"
git push
