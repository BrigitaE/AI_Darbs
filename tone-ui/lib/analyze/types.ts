import { z } from "zod";

export const ToneBadgeSchema = z.object({
  label: z.enum(["formality", "politeness", "urgency"]),
  value: z.number().min(0).max(1),
});

export const EmotionScoreSchema = z.object({
  label: z.string(),
  score: z.number().min(0).max(1),
});

export const HighlightSchema = z.object({
  start: z.number().int().min(0),
  end: z.number().int().min(0),
  type: z.string(),
  text: z.string(),
});

export const AnalyzeResultSchema = z.object({
  sentiment: z.enum(["positive", "neutral", "negative"]),
  emotions: z.array(EmotionScoreSchema),
  summary: z.string(),
  highlights: z.array(HighlightSchema),
  badges: z.array(ToneBadgeSchema),
  confidence: z.number().min(0).max(1),
});

export type AnalyzeResult = z.infer<typeof AnalyzeResultSchema>;
export type ToneBadge = z.infer<typeof ToneBadgeSchema>;
export type EmotionScore = z.infer<typeof EmotionScoreSchema>;
export type Highlight = z.infer<typeof HighlightSchema>;
