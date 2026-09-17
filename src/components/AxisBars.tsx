'use client';

import { useEffect, useState } from 'react';
import { AXES, type TypeCode } from '@/content/axes';
import { AXIS_MAX, axisPercent, type Scores } from '@/lib/score';
import { readScores } from '@/lib/storage';

/**
 * 自己測完的人看到真實落點；從分享連結進來的人沒有作答紀錄，
 * 就用該型每個軸的中間值，一樣看得出偏哪一邊。
 */
function fallbackScores(code: TypeCode): Scores {
  const half = Math.round(AXIS_MAX / 2);
  const out = {} as Scores;
  AXES.forEach((axis, i) => {
    out[axis.key] = code[i] === '1' ? half : -half;
  });
  return out;
}

export function AxisBars({ code }: { code: TypeCode }) {
  const [scores, setScores] = useState<Scores>(() => fallbackScores(code));

  useEffect(() => {
    const saved = readScores();
    if (saved) setScores(saved);
  }, []);

  return (
    <div className="mb-[34px] grid gap-4">
      {AXES.map((axis) => {
        const value = scores[axis.key];
        const positive = value >= 0;
        // 條子從中線往圓點的方向長出來：偏得越多越長，正中間就是空的
        const percent = axisPercent(value);
        return (
          <div key={axis.key} className="grid gap-[7px]">
            <div className="flex justify-between text-[11.5px] text-muted">
              <span className={positive ? 'font-bold text-ink' : undefined}>{axis.pos}</span>
              <span className={!positive ? 'font-bold text-ink' : undefined}>{axis.neg}</span>
            </div>
            <div className="relative h-1.5 rounded-full bg-line-2">
              <span className="absolute -top-1 bottom-[-4px] left-1/2 w-px bg-line" />
              <span
                className="absolute inset-y-0 rounded-full bg-accent transition-all duration-500"
                style={{
                  left: `${Math.min(50, percent).toFixed(1)}%`,
                  width: `${Math.abs(percent - 50).toFixed(1)}%`,
                }}
              />
              <span
                className="absolute top-1/2 h-[13px] w-[13px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[2.5px] border-card bg-accent shadow-[var(--shadow-s)] transition-[left] duration-500"
                style={{ left: `${percent.toFixed(1)}%` }}
                aria-label={`${axis.pos} 到 ${axis.neg}：${value}`}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
