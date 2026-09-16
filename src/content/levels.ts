/** 沿用壽司日檢 App 的 levelColors（constants/tokens.ts）。 */
export type Level = 'N1' | 'N2' | 'N3' | 'N4' | 'N5';

export type LevelColor = { fill: string; stroke: string; ink: string };

export const LEVEL_COLORS: Record<Level, LevelColor> = {
  N5: { fill: '#FBEBC8', stroke: '#D9B27A', ink: '#7A5E2E' },
  N4: { fill: '#F6D2A2', stroke: '#C68A4F', ink: '#7A4A1E' },
  N3: { fill: '#F3B19E', stroke: '#C56E55', ink: '#7A2E1E' },
  N2: { fill: '#C7726C', stroke: '#8E3F39', ink: '#FFF0EE' },
  N1: { fill: '#3E3A48', stroke: '#1F1B27', ink: '#F0EAFB' },
};
