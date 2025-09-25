import React from "react";

type Props =
  | { label: "positive" | "neutral" | "negative"; value?: undefined }
  | { label: "formality" | "politeness" | "urgency"; value: number };

export default function ToneBadge(props: Props) {
  if (props.value === undefined) {
    // sentiment
    const color =
      props.label === "positive"
        ? "bg-green-500"
        : props.label === "neutral"
        ? "bg-gray-400"
        : "bg-red-500";
    return (
      <span className={`inline-block px-3 py-1 rounded-full text-white text-xs font-bold ${color}`}>
        {props.label}
      </span>
    );
  }
  // tone badge
  const color =
    props.label === "formality"
      ? "bg-blue-400"
      : props.label === "politeness"
      ? "bg-purple-400"
      : "bg-orange-400";
  return (
    <span className={`inline-block px-3 py-1 rounded-full text-white text-xs font-bold ${color}`}>
      {props.label}: {Math.round(props.value * 100)}%
    </span>
  );
}
