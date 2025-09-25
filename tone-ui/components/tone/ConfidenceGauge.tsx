import React from "react";

type Props = {
  value: number;
};

export default function ConfidenceGauge({ value }: Props) {
  const pct = Math.round(value * 100);
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-gray-500">Confidence</span>
      <div className="relative w-32 h-3 bg-gray-200 dark:bg-zinc-800 rounded">
        <div
          className="absolute left-0 top-0 h-3 rounded bg-green-500"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-xs font-mono">{pct}%</span>
    </div>
  );
}
