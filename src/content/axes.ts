// 四個人格軸。+ 端為 pos，- 端為 neg。
export type AxisKey = 'p' | 'm' | 's' | 'e';

export type Axis = {
  key: AxisKey;
  /** 結果頁維度卡的標題 */
  title: string;
  /** + 端名稱 */
  pos: string;
  /** - 端名稱 */
  neg: string;
  /** 型別代碼用的單字（+ / -） */
  shortPos: string;
  shortNeg: string;
};

export const AXES: readonly Axis[] = [
  { key: 'p', title: "你怎麼決定去哪", pos: "表格派", neg: "隨便走派", shortPos: "計", shortNeg: "隨" },
  { key: 'm', title: "你的錢花在哪", pos: "克制", neg: "失手", shortPos: "省", shortNeg: "爆" },
  { key: 's', title: "你怎麼跟人互動", pos: "敢開口", neg: "比手畫腳", shortPos: "問", shortNeg: "比" },
  { key: 'e', title: "你想從旅行帶走什麼", pos: "打卡收集", neg: "體驗沉浸", shortPos: "集", shortNeg: "沉" },
] as const;

/** 型別代碼：四碼，每碼 '1' = 該軸的 + 端，'0' = - 端。順序同 AXES。 */
export type TypeCode = '0000' | '0001' | '0010' | '0011' | '0100' | '0101' | '0110' | '0111' | '1000' | '1001' | '1010' | '1011' | '1100' | '1101' | '1110' | '1111';

export const ALL_CODES: readonly TypeCode[] = ['0000', '0001', '0010', '0011', '0100', '0101', '0110', '0111', '1000', '1001', '1010', '1011', '1100', '1101', '1110', '1111'] as const;

export const isTypeCode = (v: string): v is TypeCode =>
  (ALL_CODES as readonly string[]).includes(v);
