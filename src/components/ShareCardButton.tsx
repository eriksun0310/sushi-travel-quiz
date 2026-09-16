'use client';

import { useState } from 'react';
import type { TypeCode } from '@/content/axes';
import { TYPES } from '@/content/types';

type State = 'idle' | 'loading' | 'opened' | 'failed';

/**
 * 產生 1080×1350 的分享卡並叫出系統分享面板（存到相簿、發限動、丟 LINE）。
 *
 * iOS Safari 對 <a download> 很不可靠，所以優先走 Web Share Level 2（帶檔案），
 * 不支援的瀏覽器就開新分頁讓使用者長按儲存 —— 那是行動端最通用的退路。
 */
export function ShareCardButton({ code }: { code: TypeCode }) {
  const [state, setState] = useState<State>('idle');
  const type = TYPES[code];

  const run = async () => {
    const url = `/api/card/${code}`;
    setState('loading');

    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(String(res.status));
      const blob = await res.blob();
      const file = new File([blob], `壽司旅人-${type.name}.png`, { type: 'image/png' });

      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({
          files: [file],
          text: `我的日本旅遊壽司是「${type.name}」${type.line}`,
        });
        setState('idle');
        return;
      }
      throw new Error('no-web-share');
    } catch (err) {
      // 使用者按取消不算失敗，安靜回到原狀
      if (err instanceof DOMException && err.name === 'AbortError') {
        setState('idle');
        return;
      }
      const opened = window.open(url, '_blank', 'noopener');
      setState(opened ? 'opened' : 'failed');
    }
  };

  return (
    <div>
      <button
        type="button"
        onClick={run}
        disabled={state === 'loading'}
        className="block w-full rounded-xl bg-accent px-5 py-[15px] text-base font-bold text-white shadow-[var(--shadow-m)] transition-transform active:scale-[0.985] disabled:opacity-60"
      >
        {state === 'loading' ? '製作中…' : '儲存型卡圖片'}
      </button>
      {state === 'opened' && (
        <p className="mt-2 text-center text-[11.5px] text-muted">圖片開在新分頁了，長按就能存到相簿</p>
      )}
      {state === 'failed' && (
        <p className="mt-2 text-center text-[11.5px] text-warn">
          瀏覽器擋住了新分頁，請允許彈出視窗後再試一次
        </p>
      )}
    </div>
  );
}
