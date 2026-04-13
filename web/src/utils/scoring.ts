import type { Question, DimKey } from "../data/questions";
import { findPersonality, personalities, type Personality } from "../data/personalities";

export type DimensionKey = DimKey;
export type Level = "H" | "M" | "L";

export interface DimensionScore {
  raw: number;
  standard: number;
  level: Level;
}

export interface DBTIResult {
  personality: Personality;
  scores: Record<DimensionKey, DimensionScore>;
  isAdmin: boolean;
}

function toLevel(standard: number): Level {
  if (standard >= 67) return "H";
  if (standard >= 34) return "M";
  return "L";
}

function normalize(raw: number): number {
  const clamped = Math.max(-18, Math.min(18, raw));
  return Math.round(((clamped + 18) / 36) * 100);
}

function isExtreme(level: Level): boolean {
  return level === "H" || level === "L";
}

export function calculateResult(
  questions: Question[],
  answers: Record<string, string>
): DBTIResult {
  const rawScores: Record<DimensionKey, number> = { D: 0, E: 0, S: 0, C: 0, G: 0 };

  let hiddenTriggered = false;

  for (const q of questions) {
    const selectedId = answers[q.id];
    if (!selectedId) continue;

    const option = q.options.find((o) => o.id === selectedId);
    if (!option) continue;

    if (option.hiddenTrigger) {
      hiddenTriggered = true;
    }

    for (const [dim, val] of Object.entries(option.scores)) {
      rawScores[dim as DimensionKey] += val;
    }
  }

  const scores: Record<DimensionKey, DimensionScore> = {} as Record<DimensionKey, DimensionScore>;
  for (const key of ["D", "E", "S", "C", "G"] as DimensionKey[]) {
    const standard = normalize(rawScores[key]);
    scores[key] = { raw: rawScores[key], standard, level: toLevel(standard) };
  }

  const extremeCount = (["D", "E", "S", "C", "G"] as DimensionKey[]).filter(
    (k) => isExtreme(scores[k].level)
  ).length;

  const isAdmin = hiddenTriggered && extremeCount >= 4;

  const personality = isAdmin
    ? personalities.find((p) => p.code === "ADMIN")!
    : findPersonality(scores.D.level, scores.E.level, scores.S.level);

  return { personality, scores, isAdmin };
}

export const dimensionNames: Record<DimensionKey, { name: string; label: string; levels: Record<Level, string> }> = {
  D: { name: "酒势", label: "Drive", levels: { H: "猛", M: "稳", L: "避" } },
  E: { name: "酒能", label: "Energy", levels: { H: "燥", M: "衡", L: "静" } },
  S: { name: "酒魂", label: "Soul", levels: { H: "真", M: "摇", L: "铁" } },
  C: { name: "酒量", label: "Capacity", levels: { H: "绝对海量", M: "马马虎虎", L: "一碰就倒" } },
  G: { name: "酒德", label: "Grace", levels: { H: "照顾全场", M: "自得其乐", L: "制造混乱" } },
};
