/**
 * OG 圖用的中文字型。
 * satori 只吃 ttf/otf/woff，所以用舊版 UA 去要 Google Fonts 的 ttf，
 * 並且用 text= 只切出這張圖會用到的字，通常只有幾 KB。
 */
const LEGACY_UA =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_8) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1';

export async function loadNotoSansTC(text: string, weight: 400 | 700 | 900 = 900) {
  const url = `https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@${weight}&text=${encodeURIComponent(
    text,
  )}`;
  const css = await fetch(url, { headers: { 'User-Agent': LEGACY_UA } }).then((r) => r.text());
  const src = /src:\s*url\(([^)]+)\)/.exec(css)?.[1];
  if (!src) throw new Error('找不到 Noto Sans TC 的字型檔網址');
  return fetch(src).then((r) => r.arrayBuffer());
}
