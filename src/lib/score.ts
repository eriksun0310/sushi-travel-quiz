import { ALL_CODES, AXES, type AxisKey, type TypeCode } from '@/content/axes';
import { QUESTION_POOL, QUESTIONS_PER_AXIS, type Question } from '@/content/questions';

export type Scores = Record<AxisKey, number>;

/** 單軸理論最大分：每題最多 +2 */
export const AXIS_MAX = QUESTIONS_PER_AXIS * 2;

function shuffle<T>(items: readonly T[]): T[] {
  const out = [...items];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/** 每軸抽 QUESTIONS_PER_AXIS 題再整份打散。重測會拿到不同題目。 */
export function drawQuestions(): Question[] {
  return shuffle(
    AXES.flatMap((axis) =>
      shuffle(QUESTION_POOL.filter((q) => q.axis === axis.key)).slice(0, QUESTIONS_PER_AXIS),
    ),
  );
}

/** answers[i] 對應 questions[i] 選了第幾個選項（0–3），-1 表示未作答 */
export function scoreAnswers(questions: readonly Question[], answers: readonly number[]): Scores {
  const scores: Scores = { p: 0, m: 0, s: 0, e: 0 };
  questions.forEach((q, i) => {
    const pick = answers[i];
    if (pick == null || pick < 0) return;
    scores[q.axis] += q.options[pick].weight;
  });
  return scores;
}

/** 0 分算在 + 端 */
export function codeFromScores(scores: Scores): TypeCode {
  return AXES.map((a) => (scores[a.key] >= 0 ? '1' : '0')).join('') as TypeCode;
}

function flip(code: TypeCode, axisIndexes: readonly number[]): TypeCode {
  return code
    .split('')
    .map((v, i) => (axisIndexes.includes(i) ? (v === '1' ? '0' : '1') : v))
    .join('') as TypeCode;
}

/** 合拍：動機與消費相同，規劃與社交互補（對稱關係） */
export const compatibleCode = (code: TypeCode) => flip(code, [0, 2]);

/** 要小心：四軸全反 */
export const cautionCode = (code: TypeCode) => flip(code, [0, 1, 2, 3]);

/**
 * 理論落點比例（%）。假設每題四個選項等機率，窮舉單軸所有組合。
 * 接到真實統計後換掉這支就好。
 */
const PLUS_PROBABILITY = (() => {
  const weights = [2, 1, -1, -2];
  let plus = 0;
  let total = 0;
  const walk = (depth: number, sum: number) => {
    if (depth === QUESTIONS_PER_AXIS) {
      total += 1;
      if (sum >= 0) plus += 1;
      return;
    }
    for (const w of weights) walk(depth + 1, sum + w);
  };
  walk(0, 0);
  return plus / total;
})();

export function theoreticalShare(code: TypeCode): number {
  return (
    code.split('').reduce((acc, v) => acc * (v === '1' ? PLUS_PROBABILITY : 1 - PLUS_PROBABILITY), 1) *
    100
  );
}

/** 分數換成 6%–94%，兩端留白讓圓點不被切掉 */
export function axisPercent(value: number): number {
  const t = (value + AXIS_MAX) / (AXIS_MAX * 2);
  return 6 + Math.min(1, Math.max(0, t)) * 88;
}

export { ALL_CODES };
