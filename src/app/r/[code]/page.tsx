import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ALL_CODES, AXES, isTypeCode, type TypeCode } from '@/content/axes';
import { POLES, type PoleKey } from '@/content/poles';
import { TYPES } from '@/content/types';
import { cautionLine, compatibleLine, inviteLine } from '@/content/pairing';
import { AxisBars } from '@/components/AxisBars';
import { PartnerCard } from '@/components/PartnerCard';
import { SushiWall } from '@/components/SushiWall';
import { TypeCard } from '@/components/TypeCard';
import { InviteButton } from '@/components/InviteButton';
import { StoreLink } from '@/components/StoreLink';
import { ShareCardButton } from '@/components/ShareCardButton';
import { cautionCode, compatibleCode, theoreticalShare } from '@/lib/score';

type Params = { code: string };

export function generateStaticParams(): Params[] {
  return ALL_CODES.map((code) => ({ code }));
}

/** 只有 16 個合法代碼，其餘一律 404 */
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { code } = await params;
  if (!isTypeCode(code)) return {};
  const type = TYPES[code];
  return {
    title: `${type.name}・${type.tag}`,
    description: `${type.line} — ${type.roast.slice(0, 60)}…`,
    openGraph: { title: `我的日本旅遊壽司是「${type.name}」`, description: type.line },
  };
}

const polesFor = (code: TypeCode) =>
  AXES.map((axis, i) => POLES[`${axis.key}${code[i]}` as PoleKey]);

/**
 * 挑口頭禪：用「其餘三軸」的組合當索引，而不是軸的順序。
 * 這樣同一個極端的不同型別會拿到不同句子，
 * 兩型平均重疊從 1.87 句降到 0.27 句，32 句也才全部用得到。
 */
const sayingFor = (code: TypeCode, axisIndex: number) => {
  const rest = code.slice(0, axisIndex) + code.slice(axisIndex + 1);
  return parseInt(rest, 2) % 4;
};

export default async function ResultPage({
  params,
  searchParams,
}: {
  params: Promise<Params>;
  searchParams: Promise<{ from?: string }>;
}) {
  const { code } = await params;
  const { from } = await searchParams;
  if (!isTypeCode(code)) notFound();

  const type = TYPES[code];
  const poles = polesFor(code);
  const inviter = from && isTypeCode(from) ? TYPES[from] : null;

  return (
    <>
      <main className="pb-[30px] pt-[22px]">
        {inviter && (
          <div className="mb-6 rounded-xl border border-accent bg-accent/[0.05] px-[18px] py-4 text-[13px] leading-[1.8] text-ink-2">
            邀請你的人是<strong className="font-bold text-ink">{inviter.name}</strong>型。
            {inviteLine(code, inviter.code)}
          </div>
        )}

        <p className="mb-3.5 text-center text-[11px] tracking-[0.16em] text-muted">
          你的日本旅遊壽司是
        </p>
        <TypeCard type={type} />

        <p className="mx-auto mb-[26px] w-fit rounded-full bg-fill px-4 py-1.5 text-center text-[12.5px] tabular-nums text-ink-2">
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
              {pole.sayings[sayingFor(code, i)]}
            </span>
          ))}
        </div>

        <h2 className="mb-3.5 text-[17px] font-black">你的四個旅遊維度</h2>
        <div className="mb-[30px] grid gap-3">
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
          這只是輕鬆的相處參考。真正的問題通常出在晚餐要吃什麼。
        </p>

        <SushiWall mine={type.slug} />

        <div className="mb-[22px] rounded-xl border border-accent bg-accent/[0.05] px-[18px] py-5">
          <h2 className="mb-2 text-[17px] font-black">分享你這一盤</h2>
          <p className="mb-4 text-[13.5px] leading-[1.8] text-ink-2">
            存成圖片發限動，或把連結丟給下次要一起去日本的人 —— 他測完會看到你們兩個的組合。
          </p>
          <ShareCardButton code={code} />
          <div className="mt-2.5">
            <InviteButton code={code} />
          </div>
        </div>

        <div className="mb-6 grid grid-cols-2 gap-2.5">
          <Link
            href="/types"
            className="block rounded-lg border border-line bg-card py-[13px] text-center text-[13.5px] font-medium text-ink-2"
          >
            查看 {ALL_CODES.length} 種
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
            <div className="text-sm font-bold leading-[1.35]">壽司日檢</div>
            <div className="text-[11.5px] text-muted">背單字，收集壽司</div>
          </div>
          <StoreLink className="shrink-0 rounded-full bg-accent px-3.5 py-2 text-xs font-bold text-white">
            下載
          </StoreLink>
        </div>
      </main>

      <div
        className="fixed inset-x-0 bottom-0 z-20 border-t border-line-2 bg-bg/90 px-[18px] backdrop-blur-md"
        style={{ paddingTop: 10, paddingBottom: 'calc(10px + env(safe-area-inset-bottom, 0px))' }}
      >
        <div className="mx-auto max-w-[430px]">
          <StoreLink className="block rounded-xl bg-accent px-5 py-[15px] text-center text-base font-bold text-white shadow-[var(--shadow-m)]">
            下載壽司日檢 App
          </StoreLink>
        </div>
      </div>
      <div aria-hidden className="h-[86px]" />
    </>
  );
}
