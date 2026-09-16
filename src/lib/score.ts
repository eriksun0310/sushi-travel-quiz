import { ALL_CODES, AXES, type AxisKey, type TypeCode } from '@/content/axes';
import { QUESTIONS } from '@/content/questions';

export type Scores = Record<AxisKey, number>;

/** 每軸有幾題 */
const QUESTIONS_PER_AXIS = AXES.map(
  (a) => QUESTIONS.filter((q) => q.axis === a.key).length,
);

/** 單軸理論最大分（每題最多 +2） */
export const AXIS_MAX = Math.max(...QUESTIONS_PER_AXIS) * 2;

/** answers[i] = 第 i 題選了第幾個選項（0–3），-1 表示未作答 */
export function scoreAnswers(answers: readonly number[]): Scores {
  const s: Scores = { p: 0, m: 0, s: 0, e: 0 };
  QUESTIONS.forEach((q, i) => {
    const pick = answers[i];
    if (pick == null || pick < 0) return;
    s[q.axis] += q.options[pick].weight;
  });
  return s;
}

/** 0 分算在 + 端（理論分佈的平手處理，見 theoreticalShare） */
export function codeFromScores(s: Scores): TypeCode {
  return AXES.map((a) => (s[a.key] >= 0 ? '1' : '0')).join('') as TypeCode;
}

/** '1001' → '計爆問集' */
export function codeLabel(code: TypeCode): string {
  return code
    .split('')
    .map((v, i) => (v === '1' ? AXES[i].shortPos : AXES[i].shortNeg))
    .join('');
}

export function flipCode(code: TypeCode, axisIndexes: readonly number[]): TypeCode {
  return code
    .split('')
    .map((v, i) => (axisIndexes.includes(i) ? (v === '1' ? '0' : '1') : v))
    .join('') as TypeCode;
}

/** 合拍的旅伴：動機與消費相同，規劃與社交互補。此關係是對稱的。 */
export const compatibleCode = (code: TypeCode) => flipCode(code, [0, 2]);

/** 要小心的旅伴：四軸全反。 */
export const cautionCode = (code: TypeCode) => flipCode(code, [0, 1, 2, 3]);

/**
 * 理論落點比例（%）。
 * 假設每題四個選項等機率，窮舉單軸所有組合算出落在 + 端的機率，再四軸相乘。
 * 上線接到真實統計後，把這支換掉即可。
 */
function axisPlusProbability(axis: AxisKey): number {
  const weights = QUESTIONS.filter((q) => q.axis === axis).map((q) =>
    q.options.map((o) => o.weight as number),
  );
  let plus = 0;
  let total = 0;
  const walk = (i: number, sum: number) => {
    if (i === weights.length) {
      total += 1;
      if (sum >= 0) plus += 1;
      return;
    }
    for (const w of weights[i]) walk(i + 1, sum + w);
  };
  walk(0, 0);
  return plus / total;
}

const PLUS_PROBABILITY: Record<AxisKey, number> = {
  p: axisPlusProbability('p'),
  m: axisPlusProbability('m'),
  s: axisPlusProbability('s'),
  e: axisPlusProbability('e'),
};

export function theoreticalShare(code: TypeCode): number {
  return (
    AXES.reduce((acc, a, i) => {
      const p = PLUS_PROBABILITY[a.key];
      return acc * (code[i] === '1' ? p : 1 - p);
    }, 1) * 100
  );
}

/** 把 -AXIS_MAX..AXIS_MAX 的分數換成 6%–94%，兩端留白讓圓點不被切掉 */
export function axisPercent(value: number): number {
  const t = (value + AXIS_MAX) / (AXIS_MAX * 2);
  return 6 + Math.min(1, Math.max(0, t)) * 88;
}

export { ALL_CODES };
