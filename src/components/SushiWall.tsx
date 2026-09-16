import Image from 'next/image';
import { CATALOG } from '@/content/catalog';
import { StoreLink } from './StoreLink';

/**
 * 「你的迴轉帶」：App 裡的 26 種壽司，測到的那盤是彩色，其餘只剩剪影。
 *
 * 這裡的格子**不能點開**。剪影本身就是訊息 ——「你只有一盤，其他都還沒有」，
 * 一旦可以翻開看，那個「還沒有」就消失了，收集的理由也跟著沒了。
 * 想看其他盤的唯一方法是下載 App。
 */
export function SushiWall({ mine }: { mine: string }) {
  return (
    <section className="mb-[30px] rounded-xl border border-line bg-card px-4 py-5 shadow-[var(--shadow-s)]">
      <h2 className="mb-1 text-center text-[17px] font-black">你的迴轉帶</h2>
      <p className="mb-[18px] text-center text-[12.5px] text-muted">
        壽司日檢裡有 {CATALOG.length} 種壽司
      </p>

      <div className="mb-5 grid grid-cols-6 gap-[9px]">
        {CATALOG.map((item) => {
          const owned = item.slug === mine;
          return (
            <div
              key={item.slug}
              title={owned ? item.name : '還沒收集'}
              className={`grid aspect-square place-items-center rounded-md ${
                owned ? 'shadow-[0_0_0_2px_var(--accent)]' : 'bg-fill'
              }`}
            >
              <Image
                src={`/sushi/${item.slug}.webp`}
                alt={owned ? item.name : ''}
                width={56}
                height={56}
                className={`object-contain ${owned ? 'h-[88%] w-[88%]' : 'silhouette h-[76%] w-[76%]'}`}
              />
            </div>
          );
        })}
      </div>

      <p className="mb-4 text-center text-[13px] text-ink-2">
        你的迴轉帶上只有 <b className="text-[17px] font-black text-accent">1</b> 盤
      </p>

      <StoreLink className="block rounded-xl bg-accent px-5 py-[15px] text-center text-base font-bold text-white shadow-[var(--shadow-m)] transition-transform active:scale-[0.985]">
        去收集其他 {CATALOG.length - 1} 種 →
      </StoreLink>
    </section>
  );
}
