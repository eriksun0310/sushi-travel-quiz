/** 對應壽司日檢 App 既有的主題包（constants/topics.ts）。n = 該主題已標記的單字數。 */
export type TopicKey = 'transport' | 'place' | 'food' | 'household' | 'clothing';

export type Topic = { label: string; emoji: string; wordCount: number };

export const TOPICS: Record<TopicKey, Topic> = {
  transport: { label: "交通", emoji: "🚃", wordCount: 97 },
  place: { label: "地點", emoji: "📍", wordCount: 175 },
  food: { label: "食物飲料", emoji: "🍚", wordCount: 104 },
  household: { label: "日常用品", emoji: "🏠", wordCount: 257 },
  clothing: { label: "衣物", emoji: "👕", wordCount: 80 },
};
