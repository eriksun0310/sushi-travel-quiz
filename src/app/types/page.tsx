import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ALL_CODES } from '@/content/axes';
import { LEVEL_COLORS } from '@/content/levels';
import { TYPES } from '@/content/types';
import { theoreticalShare } from '@/lib/score';

export const metadata: Metadata = { title: '16 種壽司旅人' };

export default function TypesPage() {
  return (
    <main className="pb-12 pt-[26px]">
      <h1 className="mb-2 text-[26px] font-black leading-[1.3]">{ALL_CODES.length} 種壽司旅人</h1>
      <p className="mb-7 text-[14px] text-ink-2">
        越敢花的型別，拿到的壽司越高級。括號裡是理論落點比例。
      </p>

      <div className="grid grid-cols-2 gap-2.5">
        {ALL_CODES.map((code) => {
          const type = TYPES[code];
          const color = LEVEL_COLORS[type.level];
          return (
            <Link
              key={code}
              href={`/r/${code}`}
              className="rounded-lg border border-line bg-card px-3 py-3 text-center shadow-[var(--shadow-s)]"
            >
              <Image
                src={`/sushi/${type.slug}.webp`}
                alt={type.name}
                width={46}
                height={46}
                className="mx-auto mb-[5px] h-[46px] w-[46px] object-contain"
              />
              <div className="text-sm font-bold leading-[1.3]">{type.name}</div>
              <div
                className="mt-[3px] text-[10.5px] tracking-[0.1em]"
                style={{ color: color.stroke }}
              >
                {type.tag}
              </div>
              <div className="mt-1.5 text-[11px] leading-[1.5] text-ink-2">{type.line}</div>
              <div className="mt-1.5 text-[10.5px] tabular-nums text-muted">
                {theoreticalShare(code).toFixed(1)}%
              </div>
            </Link>
          );
        })}
      </div>

      <Link
        href="/quiz"
        className="mt-7 block rounded-xl bg-accent px-5 py-[15px] text-center text-base font-bold text-white shadow-[var(--shadow-m)]"
      >
        測測我是哪一種
      </Link>
    </main>
  );
}
