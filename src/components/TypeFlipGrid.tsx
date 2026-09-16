'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ALL_CODES, type TypeCode } from '@/content/axes';
import { LEVEL_COLORS } from '@/content/levels';
import { TYPES } from '@/content/types';

/**
 * 首頁的 16 格：預設是剪影，點一下翻開看到彩色壽司和型名。
 *
 * 這裡可以翻，結果頁的收集牆不能翻 —— 首頁是菜單，結果頁是集點卡。
 * 看菜單不會破壞懸念（人格測驗的懸念在「我是哪一個」，不在「有哪些」），
 * 但集點卡一旦能點開就沒有收集的理由了。
 *
 * 也刻意不記錄翻過幾張：收集這件事只該發生在 App 裡。
 */
export function TypeFlipGrid() {
  const [flipped, setFlipped] = useState<ReadonlySet<TypeCode>>(new Set());

  const toggle = (code: TypeCode) =>
    setFlipped((prev) => {
      const next = new Set(prev);
      if (next.has(code)) next.delete(code);
      else next.add(code);
      return next;
    });

  return (
    <section className="mt-9">
      <p className="mb-1 text-center text-[12.5px] text-muted">
        {ALL_CODES.length} 種壽司旅人，你是哪一盤？
      </p>
      <p className="mb-3.5 text-center text-[11px] text-muted opacity-70">點一下翻開</p>

      <div className="grid grid-cols-4 gap-2">
        {ALL_CODES.map((code) => {
          const type = TYPES[code];
          const color = LEVEL_COLORS[type.level];
          const isOpen = flipped.has(code);
          return (
            <button
              key={code}
              type="button"
              aria-pressed={isOpen}
              aria-label={isOpen ? type.name : '翻開這一盤'}
              onClick={() => toggle(code)}
              className="flip-card aspect-square"
            >
              <span className="flip-inner" data-flipped={isOpen || undefined}>
                <span className="flip-face rounded-md bg-fill">
                  <Image
                    src={`/sushi/${type.slug}.webp`}
                    alt=""
                    width={72}
                    height={72}
                    className="silhouette h-[74%] w-[74%] object-contain"
                  />
                </span>
                <span
                  className="flip-face flip-back rounded-md"
                  style={{
                    background: `linear-gradient(160deg, ${color.fill}, ${color.stroke})`,
                    color: color.ink,
                  }}
                >
                  <Image
                    src={`/sushi/${type.slug}.webp`}
                    alt={type.name}
                    width={72}
                    height={72}
                    className="h-[56%] w-[56%] object-contain drop-shadow-[0_3px_5px_rgba(0,0,0,0.25)]"
                  />
                  <span className="mt-0.5 px-0.5 text-[9.5px] font-bold leading-[1.2]">
                    {type.name}
                  </span>
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
