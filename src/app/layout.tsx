import type { Metadata, Viewport } from 'next';
import { Noto_Sans_TC } from 'next/font/google';
import './globals.css';

const notoSansTC = Noto_Sans_TC({
  subsets: ['latin'],
  weight: ['400', '500', '700', '900'],
  variable: '--font-noto-sans-tc',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
  title: {
    default: '壽司旅人測驗｜你去日本的樣子其實是一種壽司',
    template: '%s｜壽司旅人測驗',
  },
  description:
    '16 個在日本一定會遇到的情境，算出你的旅遊人格，以及你每次都卡在哪幾個字。來自壽司日檢。',
  openGraph: {
    type: 'website',
    siteName: '壽司旅人測驗',
    locale: 'zh_TW',
  },
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
