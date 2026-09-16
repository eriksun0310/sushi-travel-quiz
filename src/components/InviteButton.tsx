'use client';

import { useState } from 'react';
import type { TypeCode } from '@/content/axes';

/**
 * 邀請連結就是 /r/<你的代碼> 加上 ?from=<你的代碼>，對方測完會落在自己的結果頁，
 * 但頁面最上面會出現你們兩個的組合。全部靠 URL，不需要後端。
 */
export function InviteButton({ code }: { code: TypeCode }) {
  const [state, setState] = useState<'idle' | 'copied' | 'failed'>('idle');

  const share = async () => {
    const url = `${window.location.origin}/?from=${code}`;
    if (navigator.share) {
      try {
        await navigator.share({ title: '壽司旅人測驗', text: '測測你去日本的樣子是哪一種壽司', url });
        return;
      } catch {
        // 使用者取消分享就退回複製
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      setState('copied');
      window.setTimeout(() => setState('idle'), 2000);
    } catch {
      setState('failed');
    }
  };

  return (
    <button
      type="button"
      onClick={share}
      className="block w-full rounded-xl bg-accent px-5 py-[15px] text-base font-bold text-white shadow-[var(--shadow-m)] transition-transform active:scale-[0.985]"
    >
      {state === 'copied' ? '連結已複製 ✓' : state === 'failed' ? '請手動複製網址' : '產生我的旅伴邀請連結'}
    </button>
  );
}
