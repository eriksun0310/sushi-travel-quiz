import type { Scores } from './score';

/** 四軸分數只放在 sessionStorage，結果頁用它畫實際落點。不進後端。 */
const KEY = 'sushi-travel-quiz:scores';
const SEEN_KEY = 'sushi-travel-quiz:seen';

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

/**
 * 上一輪抽到的題號。放 localStorage 而不是 sessionStorage ——
 * 隔天再來測也該換一批題，關掉分頁就忘記就沒意義了。
 * 只存最後一輪，下一輪寫進來時直接覆蓋。
 */
export function saveSeenQuestions(ids: readonly string[]): void {
  try {
    localStorage.setItem(SEEN_KEY, JSON.stringify(ids));
  } catch {
    // 存不了就算了，大不了下一輪抽到重複的題目
  }
}

export function readSeenQuestions(): string[] {
  try {
    const raw = localStorage.getItem(SEEN_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((v): v is string => typeof v === 'string');
  } catch {
    return [];
  }
}
