import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { ImageResponse } from 'next/og';
import { ALL_CODES } from '@/content/axes';
import { TYPES } from '@/content/types';
import { loadNotoSansTC } from '@/lib/og-font';

/**
 * 首頁的連結預覽圖。
 *
 * 結果頁各有自己的一張（那張放你抽到的壽司），這張是「還沒測的人」會看到的：
 * 一排壽司加一句問句，目的是讓人想知道自己是哪一盤。
 *
 * 圖片用 fs 讀進來轉 data URI —— 這支路由拿不到 request，組不出絕對網址。
 */
export const runtime = 'nodejs';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = '壽司旅人｜測測你是哪一種日本旅遊壽司';

/** 挑八盤當封面，深淺交錯，不要一整排都是暗的 */
const COVER = [
  'SU-N1-otoro',
  'SU-N5-tamago',
  'SU-N2-uni-gunkan',
  'SU-N4-salmon',
  'SU-N1-kanimiso-gunkan',
  'SU-N5-inari',
  'SU-N2-ebiko',
  'SU-N4-tempura-shrimp',
];

async function sushiDataUri(slug: string) {
  const file = await readFile(path.join(process.cwd(), 'public', 'sushi-card', `${slug}.png`));
  return `data:image/png;base64,${file.toString('base64')}`;
}

export default async function OgImage() {
  const title = '你是哪一種日本旅遊壽司？';
  const sub = `${ALL_CODES.length} 種壽司旅人，16 題測出你那一盤`;
  const footer = '壽司旅人 · 來自壽司日檢';

  const [font, bold, ...plates] = await Promise.all([
    loadNotoSansTC(sub + footer, 400),
    loadNotoSansTC(title, 900),
    ...COVER.map(sushiDataUri),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(155deg, #fafaf7 0%, #f1ece1 55%, #e8dcc8 100%)',
          color: '#1a1a1a',
          fontFamily: 'NotoBody',
        }}
      >
        {/* 迴轉帶 */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            padding: '18px 26px',
            borderRadius: 999,
            background: '#ffffff',
            boxShadow: '0 12px 34px -18px rgba(0,0,0,0.45)',
          }}
        >
          {plates.map((src) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={src.slice(-24)}
              src={src}
              alt=""
              width={104}
              height={104}
              style={{ width: 104, height: 104, objectFit: 'contain' }}
            />
          ))}
        </div>

        <div style={{ fontSize: 82, fontFamily: 'NotoHeavy', marginTop: 46, letterSpacing: 2 }}>
          {title}
        </div>

        <div style={{ fontSize: 34, marginTop: 22, color: '#4a4a46' }}>{sub}</div>

        <div style={{ fontSize: 24, marginTop: 44, letterSpacing: 5, color: '#8a8a86' }}>
          {footer}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'NotoBody', data: font, weight: 400, style: 'normal' },
        { name: 'NotoHeavy', data: bold, weight: 900, style: 'normal' },
      ],
    },
  );
}
