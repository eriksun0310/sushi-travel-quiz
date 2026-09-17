import type { Metadata, Viewport } from 'next';
import { Noto_Sans_TC } from 'next/font/google';
import './globals.css';

const notoSansTC = Noto_Sans_TC({
  subsets: ['latin'],
  weight: ['400', '500', '700', '900'],
  variable: '--font-noto-sans-tc',
  display: 'swap',
});

/**
 * OG 圖用的絕對網址。沒有它，分享出去的連結預覽會指到 localhost，圖就不會出現。
 * Vercel 在 build 時就有 VERCEL_PROJECT_PRODUCTION_URL，所以即使忘了設環境變數也不會壞。
 */
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : undefined) ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined) ??
  'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: '壽司旅人｜測測你是哪一種日本旅遊壽司',
    template: '%s｜壽司旅人',
  },
  description: '16 個在日本一定會遇到的瞬間，看看你是在迴轉帶的哪一種壽司。來自壽司日檢。',
  openGraph: { type: 'website', siteName: '壽司旅人', locale: 'zh_TW' },
  twitter: { card: 'summary_large_image' },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fafaf7' },
    { media: '(prefers-color-scheme: dark)', color: '#141412' },
  ],
  viewportFit: 'cover',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-Hant-TW" className={notoSansTC.variable}>
      <body className="font-sans antialiased">
        <div className="mx-auto w-full max-w-[430px] px-[18px]">{children}</div>
      </body>
    </html>
  );
}
