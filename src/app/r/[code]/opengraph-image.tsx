import { ImageResponse } from 'next/og';
import { isTypeCode } from '@/content/axes';
import { LEVEL_COLORS } from '@/content/levels';
import { TYPES } from '@/content/types';
import { loadNotoSansTC } from '@/lib/og-font';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = '你的日本旅遊人格';

export default async function OgImage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  // 路由層已用 dynamicParams = false 擋掉非法代碼，這裡只是型別收斂
  const type = TYPES[isTypeCode(code) ? code : '0000'];
  const color = LEVEL_COLORS[type.level];

  const eyebrow = '你的日本旅遊人格是';
  const footer = '壽司日檢 · 旅人測驗';
  const font = await loadNotoSansTC(eyebrow + type.name + type.tag + type.line + footer);

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
          background: `linear-gradient(150deg, ${color.fill} 0%, ${color.stroke} 100%)`,
          color: color.ink,
          fontFamily: 'Noto Sans TC',
        }}
      >
        <div style={{ fontSize: 30, opacity: 0.7, letterSpacing: 6 }}>{eyebrow}</div>
        <div style={{ fontSize: 150, lineHeight: 1.15, marginTop: 8 }}>{type.name}</div>
        <div
          style={{
            display: 'flex',
            marginTop: 18,
            padding: '8px 30px',
            borderRadius: 999,
            background: 'rgba(0,0,0,0.16)',
            fontSize: 30,
            letterSpacing: 10,
          }}
        >
          {type.tag}
        </div>
        <div style={{ fontSize: 36, marginTop: 26, opacity: 0.85 }}>{type.line}</div>
        <div style={{ fontSize: 24, marginTop: 52, opacity: 0.55, letterSpacing: 4 }}>{footer}</div>
      </div>
    ),
    { ...size, fonts: [{ name: 'Noto Sans TC', data: font, weight: 900, style: 'normal' }] },
  );
}
