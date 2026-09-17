'use client';

import { useEffect, useState, type ReactNode } from 'react';
import type { TypeCode } from '@/content/axes';
import { codeFromScores } from '@/lib/score';
import { readScores } from '@/lib/storage';

/**
 * 判斷這一頁「是不是你自己測出來的」，然後決定要渲染哪一份。
 *
 * 依據是 sessionStorage 裡這次的作答分數，而不是網址參數 —— 網址會被複製轉傳，
 * 一旦寫進網址，任何人拿到連結都會變成「他的結果」。
 *
 * 靜態 HTML 一律先出 other，等 hydrate 完才換成 mine。方向刻意選這邊：
 * 給爬蟲、連結預覽、以及任何沒作答的人看到的是不能分享的那份，
 * 剛測完的人只會看到一瞬間的差別。
 */
export function MineSwitch({
  code,
  mine,
  other,
}: {
  code: TypeCode;
  mine: ReactNode;
  other: ReactNode;
}) {
  const [isMine, setIsMine] = useState(false);

  useEffect(() => {
    const scores = readScores();
    if (scores && codeFromScores(scores) === code) setIsMine(true);
  }, [code]);

  return <>{isMine ? mine : other}</>;
}
