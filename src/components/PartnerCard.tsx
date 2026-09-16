import Image from 'next/image';
import { LEVEL_COLORS } from '@/content/levels';
import type { SushiType } from '@/content/types';
import { codeLabel } from '@/lib/score';

export function PartnerCard({
  type,
  label,
  tone,
  line,
}: {
  type: SushiType;
  label: string;
  tone: 'good' | 'caution';
  line: string;
}) {
  const color = LEVEL_COLORS[type.level];
  return (
    <div className="rounded-xl border border-line bg-card px-3 pb-4 pt-3.5 text-center shadow-[var(--shadow-s)]">
      <span
        className={`mb-2.5 block text-[11px] font-bold tracking-[0.08em] ${
          tone === 'good' ? 'text-good' : 'text-warn'
        }`}
      >
        {label}
      </span>
      <div
        className="mx-auto mb-[9px] grid h-[76px] w-[76px] place-items-center rounded-full"
        style={{ background: `linear-gradient(160deg, ${color.fill}, ${color.stroke})` }}
      >
        <Image
          src={`/sushi/${type.slug}.webp`}
          alt={type.name}
          width={58}
          height={58}
          className="h-[58px] w-[58px] object-contain"
        />
      </div>
      <div className="text-base font-black leading-[1.3]">{type.name}</div>
      <div className="mt-0.5 text-[10.5px] tracking-[0.14em] text-muted">
        {codeLabel(type.code)}
      </div>
      <div className="mt-[9px] text-xs leading-[1.65] text-ink-2">{line}</div>
    </div>
  );
}
