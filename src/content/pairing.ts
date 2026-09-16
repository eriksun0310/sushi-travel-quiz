import type { TypeCode } from './axes';

/**
 * 旅伴配對的說明文案。
 * 目前是依「動機軸／規劃軸」生成的公版句，16 型會共用到同一句。
 * 真的要傳播的話這裡該換成手寫的 16×2 句 — 這是全站最該加工的一塊。
 */
export function compatibleLine(code: TypeCode): string {
  return code[3] === '1'
    ? '你們都想把清單走完，一個負責排路線，一個負責開口問。'
    : '你們都願意為一個地方待到最後，只是節奏剛好互補。';
}

export function cautionLine(code: TypeCode): string {
  return code[0] === '1'
    ? '四個維度全部相反。你的行程表和他的「看心情」會在第二天正面對決。'
    : '四個維度全部相反。不是不能一起去，是要先講好誰決定晚餐。';
}

/** 有人帶著 ?from= 進來時，結果頁最上面那句。 */
export function inviteLine(mine: TypeCode, theirs: TypeCode): string {
  if (mine === theirs) return '你們是同一型。這趟不會吵架，但也不會有人踩煞車。';
  const differing = mine.split('').filter((v, i) => v !== theirs[i]).length;
  if (differing >= 3) return '你們幾乎每個維度都相反。先講好誰決定晚餐。';
  if (differing === 2) return '兩個維度互補，兩個一致。這是最好帶的組合。';
  return '你們很像，只差一個地方——而那個地方就是會吵的地方。';
}
