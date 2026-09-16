'use client';

import { Suspense, useCallback, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { isTypeCode } from '@/content/axes';
import { QUESTIONS } from '@/content/questions';
import { ANSWERS_STORAGE_KEY } from '@/lib/storage';
import { codeFromScores, scoreAnswers } from '@/lib/score';

const KEYS = ['A', 'B', 'C', 'D'];

export default function QuizPage() {
  return (
    <Suspense fallback={<main className="pt-10 text-center text-muted">載入中…</main>}>
      <Quiz />
    </Suspense>
  );
}

function Quiz() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const fromParam = searchParams.get('from');
  const from = fromParam && isTypeCode(fromParam) ? fromParam : null;
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>(() => QUESTIONS.map(() => -1));

  const finish = useCallback(
    (final: number[]) => {
      try {
        sessionStorage.setItem(ANSWERS_STORAGE_KEY, JSON.stringify(final));
      } catch {
        // 無痕模式或封鎖 storage 時就算了，結果頁會用型別的預設值
      }
      const code = codeFromScores(scoreAnswers(final));
      router.push(from ? `/r/${code}?from=${from}` : `/r/${code}`);
    },
    [router, from],
  );

  const choose = (option: number) => {
    const next = [...answers];
    next[index] = option;
    setAnswers(next);
    window.setTimeout(() => {
      if (index < QUESTIONS.length - 1) {
        setIndex(index + 1);
        window.scrollTo(0, 0);
      } else {
        finish(next);
      }
    }, 180);
  };

  const question = QUESTIONS[index];

  return (
    <main className="pb-10 pt-[18px]">
      <div
        className="sticky z-10 mb-2 bg-bg pb-3.5 pt-3"
        style={{ top: 'env(safe-area-inset-top, 0px)' }}
      >
        <div className="mb-2.5 flex items-center justify-between">
          <button
            type="button"
            onClick={() => index > 0 && setIndex(index - 1)}
            className="text-[13px] text-muted"
            style={{ visibility: index === 0 ? 'hidden' : 'visible' }}
          >
            ← 上一題
          </button>
          <span className="text-xs tabular-nums tracking-[0.06em] text-muted">
            {String(index + 1).padStart(2, '0')} / {QUESTIONS.length}
          </span>
        </div>
        <div className="flex gap-[3px]">
          {QUESTIONS.map((_, i) => (
            <i
              key={i}
              className={`h-1 flex-1 rounded-full transition-colors ${
                i < index ? 'bg-accent' : i === index ? 'bg-ink' : 'bg-line-2'
              }`}
            />
          ))}
        </div>
      </div>

      <h1 className="mb-[22px] mt-5 text-[21px] font-bold leading-[1.55] text-balance">
        {question.text}
      </h1>

      <div className="grid gap-2.5">
        {question.options.map((option, i) => {
          const picked = answers[index] === i;
          return (
            <button
              key={option.label}
              type="button"
              onClick={() => choose(i)}
              className={`flex w-full items-start gap-3 rounded-lg border px-4 py-[15px] text-left text-[15px] leading-[1.6] shadow-[var(--shadow-s)] transition active:scale-[0.99] ${
                picked ? 'border-accent bg-accent/[0.07]' : 'border-line bg-card hover:border-ink-2'
              }`}
            >
              <span
                className={`mt-0.5 grid h-[22px] w-[22px] shrink-0 place-items-center rounded-full text-[11px] font-bold ${
                  picked ? 'bg-accent text-white' : 'bg-fill text-muted'
                }`}
              >
                {KEYS[i]}
              </span>
              <span>{option.label}</span>
            </button>
          );
        })}
      </div>
    </main>
  );
}
