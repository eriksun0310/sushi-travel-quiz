import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ALL_CODES, AXES } from '@/content/axes';
import { LEVEL_COLORS } from '@/content/levels';
import { TYPES } from '@/content/types';
import { QUESTION_POOL } from '@/content/questions';
import { cautionCode, compatibleCode, theoreticalShare } from '@/lib/score';

/** 開發用的跳板頁，不給搜尋引擎、站上也沒有任何連結指過來 */
export const metadata: Metadata = {
  title: 'Dev',
  robots: { index: false, follow: false },
};

const readable = (code: string) =>
  AXES.map((a, i) => (code[i] === '1' ? a.pos : a.neg)).join(' · ');

const poolByAxis = AXES.map((a) => ({
  axis: a,
  count: QUESTION_POOL.filter((q) => q.axis === a.key).length,
}));

export default function DevPage() {
  return (
    <main className="pb-16 pt-[26px]">
      <h1 className="mb-1 text-[24px] font-black">Dev</h1>
      <p className="mb-6 text-[13px] text-muted">
        直接跳到任何一型的畫面。這頁沒有被任何地方連到，也設了 noindex。
      </p>

      <section className="mb-7 rounded-lg border border-line bg-card p-4">
        <h2 className="mb-2.5 text-[13px] font-bold">主要路由</h2>
        <div className="flex flex-wrap gap-2">
          {[
            ['首頁', '/'],
            ['測驗', '/quiz'],
            ['16 型一覽', '/types'],
            ['被邀請的首頁', '/?from=0000'],
          ].map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className="rounded-full border border-line px-3 py-1 text-xs text-ink-2"
            >
              {label}
            </Link>
          ))}
        </div>
        <p className="mt-3 text-[11.5px] leading-[1.7] text-muted">
          題庫 {QUESTION_POOL.length} 題（
          {poolByAxis.map((p) => `${p.axis.title.replace('你', '')} ${p.count}`).join('、')}
          ），每軸抽 4 題。
        </p>
      </section>

      <h2 className="mb-3 text-[15px] font-bold">16 型</h2>
      <div className="grid gap-2.5">
        {ALL_CODES.map((code) => {
          const type = TYPES[code];
          const color = LEVEL_COLORS[type.level];
          return (
            <div
              key={code}
              className="rounded-lg border border-line bg-card p-3 shadow-[var(--shadow-s)]"
            >
              <div className="flex items-center gap-3">
                <div
                  className="grid h-12 w-12 shrink-0 place-items-center rounded-md"
                  style={{ background: `linear-gradient(160deg, ${color.fill}, ${color.stroke})` }}
                >
                  <Image
                    src={`/sushi/${type.slug}.webp`}
                    alt=""
                    width={40}
                    height={40}
                    className="h-10 w-10 object-contain"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[15px] font-bold leading-tight">
                    {type.name}
                    <span className="ml-2 text-[11px] font-normal text-muted">{type.tag}</span>
                  </div>
                  <div className="mt-0.5 font-mono text-[10.5px] text-muted">
                    {code} · {type.level} · {theoreticalShare(code).toFixed(1)}%
                  </div>
                </div>
              </div>

              <div className="mt-2 text-[11.5px] leading-[1.6] text-ink-2">{readable(code)}</div>

              <div className="mt-2 text-[11px] text-muted">
                合拍 {TYPES[compatibleCode(code)].name} ／ 小心 {TYPES[cautionCode(code)].name}
              </div>

              <div className="mt-2.5 flex flex-wrap gap-1.5">
                <Link
                  href={`/r/${code}`}
                  className="rounded-full bg-accent px-3 py-1 text-[11px] font-bold text-white"
                >
                  結果頁
                </Link>
                <a
                  href={`/api/card/${code}`}
                  className="rounded-full border border-line px-3 py-1 text-[11px] text-ink-2"
                >
                  分享卡
                </a>
                <a
                  href={`/r/${code}/opengraph-image`}
                  className="rounded-full border border-line px-3 py-1 text-[11px] text-ink-2"
                >
                  OG 圖
                </a>
                <Link
                  href={`/r/${code}?from=1111`}
                  className="rounded-full border border-line px-3 py-1 text-[11px] text-ink-2"
                >
                  被邀請版
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
