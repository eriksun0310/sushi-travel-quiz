import type { Scores } from './score';

/** 四軸分數只放在 sessionStorage，結果頁用它畫實際落點。不進後端。 */
const KEY = 'sushi-travel-quiz:scores';

export function saveScores(scores: Scores): void {
  try {
    sessionStorage.setItem(KEY, JSON.stringify(scores));
  } catch {
    // 無痕模式或封鎖 storage 時就算了，結果頁會退回該型的預設落點
  }
}

export function readScores(): Scores | null {
  try {
    const raw = sessionStorage.getItem(KEY);
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    if (typeof parsed !== 'object' || parsed === null) return null;
    const s = parsed as Partial<Scores>;
    if (['p', 'm', 's', 'e'].some((k) => typeof s[k as keyof Scores] !== 'number')) return null;
    return s as Scores;
  } catch {
    return null;
  }
}
