import React from "react";

type Props = {
  label: string;
  score: number;
};

export default function ScoreBar({ label, score }: Props) {
  return (
    <div className="flex items-center gap-2">
      <span className="w-24 text-xs font-mono">{label}</span>
      <div className="flex-1 bg-gray-200 dark:bg-zinc-800 rounded h-3 relative">
        <div
          className="bg-blue-500 h-3 rounded"
          style={{ width: `${Math.round(score * 100)}%` }}
        />
      </div>
      <span className="w-10 text-xs text-right font-mono">{Math.round(score * 100)}%</span>
    </div>
  );
}
