/**
 * 沿用壽司日檢 App 的 levelColors。
 * 等級不會顯示在畫面上，它只決定卡片顏色 —— 也就是這盤壽司看起來多貴。
 * 敢花的型別拿 N1/N2（深色、高級），省的型別拿 N4/N5（淺色、樸素）。
 */
export type Level = 'N1' | 'N2' | 'N3' | 'N4' | 'N5';
export type LevelColor = { fill: string; stroke: string; ink: string };

export const LEVEL_COLORS: Record<Level, LevelColor> = {
  N5: { fill: '#FBEBC8', stroke: '#D9B27A', ink: '#7A5E2E' },
  N4: { fill: '#F6D2A2', stroke: '#C68A4F', ink: '#7A4A1E' },
  N3: { fill: '#F3B19E', stroke: '#C56E55', ink: '#7A2E1E' },
  N2: { fill: '#C7726C', stroke: '#8E3F39', ink: '#FFF0EE' },
  N1: { fill: '#3E3A48', stroke: '#1F1B27', ink: '#F0EAFB' },
};
