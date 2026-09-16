'use client';

import { useEffect, useState } from 'react';
import { STORE } from '@/content/store';

/**
 * 下載按鈕。SSR 先給 App Store（安全的預設），掛載後若是 Android 就換成 Google Play。
 * 不開新分頁 —— 商店連結在手機上會直接交棒給商店 App，開新分頁反而多一層。
 */
export function StoreLink({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const [href, setHref] = useState<string>(STORE.appStore);

  useEffect(() => {
    if (/android/i.test(navigator.userAgent)) setHref(STORE.googlePlay);
  }, []);

  return (
    <a href={href} className={className} rel="noopener">
      {children}
    </a>
  );
}
