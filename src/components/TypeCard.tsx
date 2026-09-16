import Image from 'next/image';
import { LEVEL_COLORS } from '@/content/levels';
import type { SushiType } from '@/content/types';
import { codeLabel } from '@/lib/score';

export function TypeCard({ type }: { type: SushiType }) {
  const color = LEVEL_COLORS[type.level];
  return (
    <div className="mb-3.5 overflow-hidden rounded-xl shadow-[var(--shadow-m)]">
      <div
        className="relative px-[22px] pb-[26px] pt-[30px] text-center"
        style={{
          background: `linear-gradient(168deg, ${color.fill} 0%, ${color.stroke} 100%)`,
          color: color.ink,
        }}
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(120% 80% at 50% 12%, rgba(255,255,255,0.34), transparent 62%)',
          }}
        />
        <Image
          src={`/sushi/${type.slug}.webp`}
          alt={type.name}
          width={132}
          height={132}
          priority
          className="mx-auto mb-3 h-[132px] w-[132px] object-contain drop-shadow-[0_10px_18px_rgba(0,0,0,0.22)]"
        />
        <p className="m-0 text-[32px] font-black leading-[1.2] tracking-[-0.01em]">{type.name}</p>
        <span
          className="mt-[9px] inline-block rounded-full px-[13px] py-[3px] text-xs font-bold tracking-[0.14em]"
          style={{ background: 'rgba(0,0,0,0.14)', color: color.ink }}
        >
          {type.tag}
        </span>
        <p className="mt-3 text-sm font-medium opacity-85">{type.line}</p>
      </div>
      <div
        className="flex items-center justify-between gap-3.5 whitespace-nowrap px-[18px] py-[11px] text-[11.5px] font-bold tracking-[0.14em]"
        style={{ background: color.stroke, color: color.ink }}
      >
        <span>
          {type.level} · {codeLabel(type.code)}
        </span>
        <small className="text-[10.5px] font-medium tracking-[0.08em] opacity-70">
          壽司日檢 · 旅人測驗
        </small>
      </div>
    </div>
  );
}
