import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ALL_CODES, AXES, isTypeCode, type TypeCode } from '@/content/axes';
import { POLES, type PoleKey } from '@/content/poles';
import { TOPICS } from '@/content/topics';
import { TYPES } from '@/content/types';
import { cautionLine, compatibleLine, inviteLine } from '@/content/pairing';
import { AxisBars } from '@/components/AxisBars';
import { PartnerCard } from '@/components/PartnerCard';
import { TypeCard } from '@/components/TypeCard';
import { InviteButton } from '@/components/InviteButton';
import { cautionCode, compatibleCode, theoreticalShare } from '@/lib/score';

type Params = { code: string };
type Search = { from?: string };

export function generateStaticParams(): Params[] {
  return ALL_CODES.map((code) => ({ code }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { code } = await params;
  if (!isTypeCode(code)) return {};
  const type = TYPES[code];
  return {
    title: `${type.name}・${type.tag}`,
    description: `${type.line} — ${type.roast.slice(0, 60)}…`,
    openGraph: { title: `我的日本旅遊人格是「${type.name}」`, description: type.line },
  };
}

const polesFor = (code: TypeCode) =>
  AXES.map((axis, i) => POLES[`${axis.key}${code[i]}` as PoleKey]);

export default async function ResultPage({
  params,
  searchParams,
}: {
  params: Promise<Params>;
  searchParams: Promise<Search>;
}) {
  const { code } = await params;
  const { from } = await searchParams;
  if (!isTypeCode(code)) notFound();

  const type = TYPES[code];
  const topic = TYPES[code].topic;
  const poles = polesFor(code);
  const inviter = from && isTypeCode(from) ? TYPES[from] : null;

  return (
    <>
      <main className="pb-[30px] pt-[26px]">
        {inviter && (
          <div className="mb-6 rounded-xl border border-accent bg-accent/[0.05] px-[18px] py-4">
            <p className="m-0 text-[13px] leading-[1.8] text-ink-2">
              邀請你的人是<strong className="font-bold text-ink">{inviter.name}</strong>型。
              {inviteLine(code, inviter.code)}
            </p>
          </div>
        )}

        <p className="mb-3.5 text-center text-[11px] font-medium tracking-[0.16em] text-muted">
          你的日本旅遊人格是
        </p>
        <TypeCard type={type} />

        <p className="mx-auto mb-7 w-fit rounded-full bg-fill px-4 py-1.5 text-center text-[12.5px] tabular-nums text-ink-2">
          理論上約 {theoreticalShare(code).toFixed(1)}% 的人和你一樣
        </p>

        <p className="mb-[30px] border-l-[3px] border-accent pl-4 text-[15.5px] leading-[1.95]">
          {type.roast}
        </p>

        <h2 className="mb-3.5 text-[17px] font-black">這型的口頭禪</h2>
        <div className="mb-[34px] flex flex-wrap gap-2">
          {poles.map((pole, i) => (
            <span
              key={i}
              className="rounded-full border border-dashed border-line px-[13px] py-[5px] text-[12.5px] text-ink-2"
            >
              {pole.sayings[i % 2]}
            </span>
          ))}
        </div>

        <h2 className="mb-3.5 text-[17px] font-black">你的四個旅遊維度</h2>
        <div className="mb-[34px] grid gap-3">
          {AXES.map((axis, i) => (
            <section
              key={axis.key}
              className="rounded-xl border border-line-2 bg-card px-[18px] pb-5 pt-[18px] shadow-[var(--shadow-s)]"
            >
              <h3 className="mb-3 text-base font-black">
                {axis.title}
                <span className="ml-2 text-xs font-medium text-muted">
                  {code[i] === '1' ? axis.pos : axis.neg}
                </span>
              </h3>
              <span className="mb-[13px] block rounded-md bg-fill px-[13px] py-[9px] text-[13px] font-bold text-accent">
                {poles[i].quote}
              </span>
              <p className="m-0 text-[14.5px] leading-[1.95] text-ink-2">{poles[i].body}</p>
            </section>
          ))}
        </div>

        <AxisBars code={code} />

        <div className="mb-9 rounded-xl bg-fill px-5 pb-[22px] pt-5">
          <span className="mb-3 inline-flex items-center gap-[7px] text-xs tracking-[0.04em] text-muted">
            你最該補的是 ·&nbsp;
            <em className="not-italic font-bold text-accent">
              {TOPICS[topic].label} {TOPICS[topic].emoji} · {TOPICS[topic].wordCount} 字
            </em>
          </span>
          <p className="mb-4 text-[15px] leading-[1.85]">{type.bridge}</p>
          <a
            href={process.env.NEXT_PUBLIC_APP_STORE_URL ?? '#'}
            className="block rounded-xl bg-accent px-5 py-[15px] text-center text-base font-bold text-white shadow-[var(--shadow-m)] transition-transform active:scale-[0.985]"
          >
            打開壽司日檢的〈{TOPICS[topic].label}〉主題包 →
          </a>
        </div>

        <h2 className="mb-3.5 text-[17px] font-black">旅伴參考座標</h2>
        <div className="mb-3 grid grid-cols-2 gap-2.5">
          <PartnerCard
            type={TYPES[compatibleCode(code)]}
            label="合拍的旅伴"
            tone="good"
            line={compatibleLine(code)}
          />
          <PartnerCard
            type={TYPES[cautionCode(code)]}
            label="要小心的旅伴"
            tone="caution"
            line={cautionLine(code)}
          />
        </div>
        <p className="mb-[34px] text-center text-[11.5px] leading-[1.7] text-muted">
          這只是輕鬆的相處參考，不代表你們不能一起去日本。真正的問題通常出在晚餐要吃什麼。
        </p>

        <div className="mb-[22px] rounded-xl border border-accent bg-accent/[0.05] px-[18px] py-5">
          <h2 className="mb-2 text-[17px] font-black">找你的旅伴一起測</h2>
          <p className="mb-4 text-[13.5px] leading-[1.8] text-ink-2">
            把連結丟給下次要一起去日本的人。他測完之後，會直接看到你們兩個的組合。
          </p>
          <InviteButton code={code} />
        </div>

        <div className="mb-6 grid grid-cols-2 gap-2.5">
          <Link
            href="/types"
            className="block rounded-lg border border-line bg-card py-[13px] text-center text-[13.5px] font-medium text-ink-2"
          >
            查看 16 種類型
          </Link>
          <Link
            href="/quiz"
            className="block rounded-lg border border-line bg-card py-[13px] text-center text-[13.5px] font-medium text-ink-2"
          >
            再測一次
          </Link>
        </div>

        <p className="mb-[22px] text-center text-[11.5px] text-muted">以上測驗來自壽司日檢 App</p>

        <div className="flex items-center gap-3 border-t border-line-2 pt-5">
          <Image
            src="/appicon.png"
            alt="壽司日檢"
            width={52}
            height={52}
            className="h-[52px] w-[52px] rounded-xl shadow-[var(--shadow-s)]"
          />
          <div className="min-w-0 flex-1">
            <div className="text-sm font-bold leading-[1.35]">壽司日檢 — 5 分鐘背日文單字</div>
            <div className="text-[11.5px] text-muted">N5–N1 單字．主題包．例句發音</div>
          </div>
          <a
            href={process.env.NEXT_PUBLIC_APP_STORE_URL ?? '#'}
            className="shrink-0 rounded-full bg-accent px-3.5 py-2 text-xs font-bold text-white"
          >
            下載
          </a>
        </div>
      </main>

      {/* 固定底部下載列 */}
      <div
        className="fixed inset-x-0 bottom-0 z-20 border-t border-line-2 bg-bg/90 px-[18px] backdrop-blur-md"
        style={{ paddingTop: 10, paddingBottom: 'calc(10px + env(safe-area-inset-bottom, 0px))' }}
      >
        <div className="mx-auto max-w-[430px]">
          <a
            href={process.env.NEXT_PUBLIC_APP_STORE_URL ?? '#'}
            className="block rounded-xl bg-accent px-5 py-[15px] text-center text-base font-bold text-white shadow-[var(--shadow-m)]"
          >
            下載壽司日檢 App
          </a>
        </div>
      </div>
      <div aria-hidden className="h-[86px]" />
    </>
  );
}

/** 只有 16 個合法代碼，其餘一律 404 */
export const dynamicParams = false;
