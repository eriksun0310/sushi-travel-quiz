import { ImageResponse } from 'next/og';
import { AXES, isTypeCode } from '@/content/axes';
import { LEVEL_COLORS } from '@/content/levels';
import { TYPES } from '@/content/types';
import { loadNotoSansTC } from '@/lib/og-font';

/**
 * 社群分享卡，1080×1350（IG／Threads 版面最大的 4:5）。
 * 跟 opengraph-image 不一樣：那張是連結預覽用的橫式 1200×630，
 * 這張是給人存下來發限動的直式海報，所以吐槽整段都放進去。
 */
export const runtime = 'nodejs';

const SIZE = { width: 1080, height: 1350 };

export async function GET(
  request: Request,
  { params }: { params: Promise<{ code: string }> },
) {
  const { code } = await params;
  if (!isTypeCode(code)) return new Response('Not found', { status: 404 });

  const type = TYPES[code];
  const color = LEVEL_COLORS[type.level];

  const eyebrow = '你的日本旅遊壽司是';
  const axisLine = AXES.map((a, i) => (code[i] === '1' ? a.pos : a.neg)).join('　·　');
  const footer = '壽司旅人';

  const heavyText = eyebrow + type.name + type.tag;
  const bodyText = type.line + type.roast + axisLine + footer;

  const [heavy, body] = await Promise.all([
    loadNotoSansTC(heavyText, 900),
    loadNotoSansTC(bodyText, 400),
  ]);

  const sushi = new URL(`/sushi-card/${type.slug}.png`, request.url).toString();

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '72px 72px 60px',
          background: `linear-gradient(158deg, ${color.fill} 0%, ${color.stroke} 100%)`,
          color: color.ink,
          fontFamily: 'NotoBody',
        }}
      >
        <div style={{ fontSize: 30, opacity: 0.65, letterSpacing: 8, fontFamily: 'NotoHeavy' }}>
          {eyebrow}
        </div>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={sushi}
          alt=""
          width={400}
          height={400}
          style={{ width: 400, height: 400, objectFit: 'contain', marginTop: 20 }}
        />

        <div style={{ fontSize: 124, lineHeight: 1.1, fontFamily: 'NotoHeavy', marginTop: 4 }}>
          {type.name}
        </div>

        <div
          style={{
            display: 'flex',
            marginTop: 20,
            padding: '8px 30px',
            borderRadius: 999,
            background: 'rgba(0,0,0,0.16)',
            fontSize: 28,
            letterSpacing: 12,
            fontFamily: 'NotoHeavy',
          }}
        >
          {type.tag}
        </div>

        <div style={{ fontSize: 34, marginTop: 26, opacity: 0.88 }}>{type.line}</div>

        <div
          style={{
            width: 120,
            height: 2,
            background: color.ink,
            opacity: 0.25,
            marginTop: 38,
            marginBottom: 34,
          }}
        />

        <div
          style={{
            fontSize: 31,
            lineHeight: 1.75,
            textAlign: 'center',
            opacity: 0.92,
            display: 'flex',
          }}
        >
          {type.roast}
        </div>

        <div style={{ display: 'flex', flexGrow: 1 }} />

        <div style={{ fontSize: 25, letterSpacing: 2, opacity: 0.6 }}>{axisLine}</div>
        <div style={{ fontSize: 25, letterSpacing: 4, opacity: 0.45, marginTop: 20 }}>{footer}</div>
      </div>
    ),
    {
      ...SIZE,
      fonts: [
        { name: 'NotoHeavy', data: heavy, weight: 900, style: 'normal' },
        { name: 'NotoBody', data: body, weight: 400, style: 'normal' },
      ],
      headers: { 'Cache-Control': 'public, max-age=31536000, immutable' },
    },
  );
}
