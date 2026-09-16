/** 作答結果只放在 sessionStorage，不進後端。結果頁用它畫四軸的實際落點。 */
export const ANSWERS_STORAGE_KEY = 'sushi-travel-quiz:answers';

export function readAnswers(): number[] | null {
  try {
    const raw = sessionStorage.getItem(ANSWERS_STORAGE_KEY);
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return null;
    return parsed.filter((v): v is number => typeof v === 'number');
  } catch {
    return null;
  }
}
