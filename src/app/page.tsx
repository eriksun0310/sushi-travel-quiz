import Image from 'next/image';
import Link from 'next/link';
import { ALL_CODES, AXES, isTypeCode } from '@/content/axes';
import { QUESTIONS_PER_AXIS } from '@/content/questions';
import { TYPES } from '@/content/types';
import { TypeFlipGrid } from '@/components/TypeFlipGrid';

const BELT = [
  'SU-N4-salmon',
  'SU-N2-uni-gunkan',
  'SU-N1-otoro',
  'SU-N5-inari',
  'SU-N3-beef',
  'SU-N4-tempura-shrimp',
  'SU-N2-tako',
  'SU-N5-kappa-maki',
];

const QUESTION_COUNT = QUESTIONS_PER_AXIS * AXES.length;

export default async function IntroPage({
  searchParams,
}: {
  searchParams: Promise<{ from?: string }>;
}) {
  const { from } = await searchParams;
  const inviter = from && isTypeCode(from) ? TYPES[from] : null;

  return (
    <main className="pb-11 pt-[30px]">
      <div className="relative mb-6 h-[152px] overflow-hidden rounded-md border-y border-line bg-belt">
        <div className="animate-[roll_24s_linear_infinite] absolute bottom-[20px] left-0 flex gap-[20px]">
          {[...BELT, ...BELT].map((slug, i) => (
            <Image
              key={`${slug}-${i}`}
              src={`/sushi/${slug}.webp`}
              alt=""
              width={96}
              height={96}
              className="h-[96px] w-[96px] object-contain drop-shadow-[0_8px_12px_rgba(0,0,0,0.22)]"
              priority={i < 4}
            />
          ))}
        </div>
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'linear-gradient(90deg, var(--bg), transparent 14%, transparent 86%, var(--bg))',
          }}
        />
      </div>

      {inviter && (
        <div className="mb-6 rounded-xl border border-accent bg-accent/[0.05] px-[18px] py-4 text-[13px] leading-[1.8] text-ink-2">
          有一位<strong className="font-bold text-ink">{inviter.name}</strong>
          型的旅人邀請你測。你測完之後，會看到你們兩個一起去日本會發生什麼事。
        </div>
      )}

      <p className="mb-[9px] text-[12.5px] font-medium tracking-[0.14em] text-muted">壽司旅人</p>
      <h1 className="mb-2.5 text-[30px] font-black leading-[1.3] text-balance">
        測測你是哪一種
        <br />
        日本旅遊壽司
      </h1>
      <p className="mb-[18px] text-[14.5px] text-ink-2">
        {QUESTION_COUNT} 個在日本一定會遇到的瞬間，看看你是在迴轉帶的哪一種壽司。
      </p>

      <div className="mb-6 flex flex-wrap gap-2">
        {[`${QUESTION_COUNT} 道題`, '約 2 分鐘', `${ALL_CODES.length} 種壽司旅人`].map((c) => (
          <span
            key={c}
            className="rounded-full border border-line bg-card px-3 py-[5px] text-xs font-medium text-ink-2"
          >
            {c}
          </span>
        ))}
      </div>

      <p className="mb-7 rounded-lg border border-dashed border-line px-4 py-3.5 text-[13px] leading-[1.75] text-muted">
        還沒去過日本也可以測。憑直覺選最像你會做的那一個，沒有正確答案。
      </p>

      <Link
        href={inviter ? `/quiz?from=${inviter.code}` : '/quiz'}
        className="block rounded-xl bg-accent px-5 py-[15px] text-center text-base font-bold text-white shadow-[var(--shadow-m)] transition-transform active:scale-[0.985]"
      >
        開始測驗
      </Link>

      {/* 還沒測就先看到有 16 種可以拿 —— 收集的念頭提早發生 */}
      <TypeFlipGrid />

      <Link
        href="/types"
        className="mt-5 block text-center text-[12.5px] text-muted underline underline-offset-4"
      >
        看 16 型的完整說明 →
      </Link>
    </main>
  );
}
