/**
 * 壽司日檢 App 裡的 26 種壽司（SUSHI_CATALOG）。
 * 結果頁的「你的迴轉帶」用這份清單畫收集牆：抽到的那盤是彩色，其餘灰掉。
 * 測驗只用到其中 16 種 —— N3 那一排永遠抽不到，只有 App 裡有。
 */
export type CatalogItem = { slug: string; name: string };

export const CATALOG: readonly CatalogItem[] = [
  { slug: 'SU-N5-inari', name: "豆皮壽司" },
  { slug: 'SU-N5-tamago', name: "玉子燒" },
  { slug: 'SU-N5-natto-cucumber-hosomaki', name: "納豆細卷" },
  { slug: 'SU-N5-kappa-maki', name: "黃瓜卷" },
  { slug: 'SU-N5-corn-gunkan', name: "玉米軍艦" },
  { slug: 'SU-N4-salmon', name: "生鮭魚" },
  { slug: 'SU-N4-amaebi', name: "甜蝦" },
  { slug: 'SU-N4-tempura-shrimp', name: "炸蝦天婦羅" },
  { slug: 'SU-N4-kani-kamaboko', name: "蟹風味棒" },
  { slug: 'SU-N4-natto-gunkan', name: "納豆軍艦" },
  { slug: 'SU-N3-nishin', name: "黃金鯡魚" },
  { slug: 'SU-N3-hamburg', name: "漢堡排" },
  { slug: 'SU-N3-saba', name: "鯖魚" },
  { slug: 'SU-N3-hokkigai', name: "北寄貝" },
  { slug: 'SU-N3-beef', name: "牛肉壽司" },
  { slug: 'SU-N2-kani', name: "螃蟹" },
  { slug: 'SU-N2-tako', name: "章魚" },
  { slug: 'SU-N2-hokkaido-scallop', name: "帆立貝" },
  { slug: 'SU-N2-ebiko', name: "魚卵軍艦" },
  { slug: 'SU-N2-uni-gunkan', name: "海膽軍艦" },
  { slug: 'SU-N1-tuna-duo', name: "黑鮪魚二種" },
  { slug: 'SU-N1-otoro', name: "大トロ" },
  { slug: 'SU-N1-anago', name: "蒲燒星鰻" },
  { slug: 'SU-N1-engawa', name: "緣側" },
  { slug: 'SU-N1-buri', name: "鰤魚" },
  { slug: 'SU-N1-kanimiso-gunkan', name: "蟹膏軍艦" },
] as const;
