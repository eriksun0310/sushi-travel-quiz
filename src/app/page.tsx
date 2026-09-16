import Image from 'next/image';
import Link from 'next/link';
import { AXES, isTypeCode } from '@/content/axes';
import { QUESTIONS } from '@/content/questions';
import { TYPES } from '@/content/types';

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

export default async function IntroPage({
  searchParams,
}: {
  searchParams: Promise<{ from?: string }>;
}) {
  const { from } = await searchParams;
  const inviter = from && isTypeCode(from) ? TYPES[from] : null;

  return (
    <main className="pb-11 pt-[34px]">
      {/* 迴轉帶 */}
      <div className="relative mb-[26px] h-[104px] overflow-hidden rounded-md border-y border-line bg-line-2">
        <div className="absolute inset-x-0 bottom-4 h-px bg-line" />
        <div className="animate-[roll_22s_linear_infinite] absolute bottom-4 left-0 flex items-end gap-[26px]">
          {[...BELT, ...BELT].map((slug, i) => (
            <Image
              key={`${slug}-${i}`}
              src={`/sushi/${slug}.webp`}
              alt=""
              width={58}
              height={58}
              className="h-[58px] w-[58px] object-contain drop-shadow-[0_4px_6px_rgba(0,0,0,0.12)]"
              priority={i < 4}
            />
          ))}
        </div>
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'linear-gradient(90deg, var(--bg) 0%, transparent 14%, transparent 86%, var(--bg) 100%)',
          }}
        />
      </div>

      {inviter && (
        <div className="mb-6 rounded-xl border border-accent bg-accent/[0.05] px-[18px] py-4 text-[13px] leading-[1.8] text-ink-2">
          有一位<strong className="font-bold text-ink">{inviter.name}</strong>
          型的旅人邀請你測。你測完之後，會看到你們兩個一起去日本會發生什麼事。
        </div>
      )}

      <p className="mb-[9px] text-[13px] font-medium tracking-[0.1em] text-muted">
        壽司日檢 · 旅人測驗
      </p>
      <h1 className="mb-2.5 text-[29px] font-black leading-[1.3] tracking-[-0.01em] text-balance">
        你去日本的樣子
        <br />
        其實是一種壽司
      </h1>
      <p className="mb-[18px] text-[14.5px] text-ink-2">
        {QUESTIONS.length} 個在日本一定會遇到的情境，算出你的旅遊人格——以及你每次都卡在哪幾個字。
      </p>

      <div className="mb-[22px] flex flex-wrap gap-2">
        {[`${QUESTIONS.length} 道題`, '約 2 分鐘', '16 種壽司旅人'].map((c) => (
          <span
            key={c}
            className="rounded-full border border-line bg-card px-3 py-[5px] text-xs font-medium text-ink-2"
          >
            {c}
          </span>
        ))}
      </div>

      <p className="mb-[26px] rounded-lg border border-dashed border-line px-4 py-3.5 text-[13px] leading-[1.75] text-muted">
        還沒去過日本也可以測。想像你下個月就要出發，憑直覺選最像你會做的那一個。
      </p>

      <ul className="mb-[30px] grid gap-[9px]">
        {AXES.map((a) => (
          <li
            key={a.key}
            className="grid grid-cols-[auto_1fr_auto] items-center gap-2.5 text-[12.5px] text-muted"
          >
            <span>{a.pos}</span>
            <span className="h-px bg-line-2" />
            <span>{a.neg}</span>
          </li>
        ))}
      </ul>

      <Link
        href={inviter ? `/quiz?from=${inviter.code}` : '/quiz'}
        className="block rounded-xl bg-accent px-5 py-[15px] text-center text-base font-bold tracking-[0.02em] text-white shadow-[var(--shadow-m)] transition-transform active:scale-[0.985]"
      >
        開始測驗
      </Link>
      <p className="mt-[18px] text-center text-[11.5px] leading-[1.7] text-muted">
        結果不會上傳，全部在你的手機裡算完。
      </p>
    </main>
  );
}
