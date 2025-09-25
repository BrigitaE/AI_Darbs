import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { AnalyzeResultSchema } from "@/lib/analyze/types";

const RequestSchema = z.object({
  text: z.string().min(3).max(10000),
  lang: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
  const { text } = RequestSchema.parse(body);

    // MOCK data
    const mock = {
      sentiment: "positive",
      emotions: [
        { label: "joy", score: 0.85 },
        { label: "trust", score: 0.7 },
        { label: "anticipation", score: 0.5 },
      ],
      summary: "The text expresses a positive and enthusiastic tone.",
      highlights: [
        { start: 0, end: 12, type: "positive", text: text.slice(0, 12) },
      ],
      badges: [
        { label: "formality", value: 0.7 },
        { label: "politeness", value: 0.9 },
        { label: "urgency", value: 0.2 },
      ],
      confidence: 0.93,
    };
    const result = AnalyzeResultSchema.parse(mock);
    return NextResponse.json(result);
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
