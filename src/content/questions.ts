import type { AxisKey } from './axes';

/** 每題四個選項，權重固定 +2 / +1 / -1 / -2，加總後看正負決定該軸落在哪一端。 */
export type OptionWeight = 2 | 1 | -1 | -2;

export type Option = { label: string; weight: OptionWeight };
export type Question = { axis: AxisKey; text: string; options: Option[] };

export const QUESTIONS: readonly Question[] = [
  {
    axis: 'p',
    text: "飛機落地，你第一件事是",
    options: [
      { label: "開網路、確認交通、按表操課", weight: 2 },
      { label: "打開 Google Map，才發現忘記查飯店怎麼去", weight: 1 },
      { label: "先拍一張機場的照片", weight: -1 },
      { label: "找廁所", weight: -2 },
    ],
  },
  {
    axis: 'm',
    text: "你站在店裡，東西拿在手上，猶豫要不要買",
    options: [
      { label: "拍照存起來，回飯店查完評價再說", weight: 2 },
      { label: "放回去，走兩圈，還想著就回來拿", weight: 1 },
      { label: "問同行的人「這個好看嗎」，但你已經走向櫃檯了", weight: -1 },
      { label: "買。想那麼多幹嘛", weight: -2 },
    ],
  },
  {
    axis: 's',
    text: "你想問這道菜有沒有推薦的吃法",
    options: [
      { label: "直接問，講得不好也問", weight: 2 },
      { label: "先在手機打好草稿再開口", weight: 1 },
      { label: "指菜單，然後微笑", weight: -1 },
      { label: "算了，吃就對了", weight: -2 },
    ],
  },
  {
    axis: 'e',
    text: "想吃的店排了 40 分鐘的隊",
    options: [
      { label: "直接走，行程還有八個點", weight: 2 },
      { label: "拍張照，順便查隔壁有沒有替代方案", weight: 1 },
      { label: "我不排隊，我一開始就訂位了", weight: -1 },
      { label: "排。來都來了", weight: -2 },
    ],
  },
  {
    axis: 'm',
    text: "同行的朋友在猶豫要不要買，轉頭問你意見",
    options: [
      { label: "「你先拍照，回程還想要再買」", weight: 2 },
      { label: "「你有預算嗎？超過就別」", weight: 1 },
      { label: "「買啦，日本欸」", weight: -1 },
      { label: "「是我我就買了。」（然後你也拿了一個）", weight: -2 },
    ],
  },
  {
    axis: 'p',
    text: "你的行程表長什麼樣子",
    options: [
      { label: "有時間欄位、有備案、有共編連結", weight: 2 },
      { label: "記事本列了幾個想去的點", weight: 1 },
      { label: "存了一堆 IG 限動，出發那天再看", weight: -1 },
      { label: "行程表是什麼", weight: -2 },
    ],
  },
  {
    axis: 's',
    text: "出站後你發現方向反了",
    options: [
      { label: "問站務員，用日文", weight: 2 },
      { label: "問路人，英文加手勢", weight: 1 },
      { label: "站在原地轉手機轉三分鐘", weight: -1 },
      { label: "順著人群走，總會到", weight: -2 },
    ],
  },
  {
    axis: 'e',
    text: "到了一個很美的地方",
    options: [
      { label: "拍完發限動，定位打好", weight: 2 },
      { label: "拍個三五張存著", weight: 1 },
      { label: "拍一張，然後坐下來", weight: -1 },
      { label: "手機收起來", weight: -2 },
    ],
  },
  {
    axis: 'p',
    text: "同行的人臨時說想改行程",
    options: [
      { label: "「那晚餐訂位怎麼辦」", weight: 2 },
      { label: "「可以，但我要重排一下」", weight: 1 },
      { label: "「好啊」（心裡開始算原本那個點要不要放掉）", weight: -1 },
      { label: "「本來要去哪？」", weight: -2 },
    ],
  },
  {
    axis: 'm',
    text: "回程行李超重 3 公斤",
    options: [
      { label: "早就預留了，我托運買到 30 公斤", weight: 2 },
      { label: "拆開重新分配，我很會", weight: 1 },
      { label: "現場把東西穿在身上", weight: -1 },
      { label: "付錢。冷靜付錢", weight: -2 },
    ],
  },
  {
    axis: 's',
    text: "結帳時店員快速講了一串，你只聽到「税抜」",
    options: [
      { label: "拿出護照，我知道這是要免稅", weight: 2 },
      { label: "反問一句「もう一度？」", weight: 1 },
      { label: "掏出手機翻譯", weight: -1 },
      { label: "はい。（然後繼續はい）", weight: -2 },
    ],
  },
  {
    axis: 'e',
    text: "最後一天早上多出兩小時",
    options: [
      { label: "補一個還沒去的點", weight: 2 },
      { label: "去車站附近晃一晃", weight: 1 },
      { label: "回昨天那家咖啡店", weight: -1 },
      { label: "在飯店慢慢吃早餐", weight: -2 },
    ],
  },
  {
    axis: 'p',
    text: "出發前一天晚上",
    options: [
      { label: "行李兩週前就打包好了", weight: 2 },
      { label: "邊看清單邊裝，十一點前睡", weight: 1 },
      { label: "凌晨兩點還在滑「XX 必買」", weight: -1 },
      { label: "隔天早上才開始收", weight: -2 },
    ],
  },
  {
    axis: 's',
    text: "店員端上一道你沒點的東西",
    options: [
      { label: "「これ、頼んでないです」", weight: 2 },
      { label: "指著菜單跟他確認一下", weight: 1 },
      { label: "先吃，等結帳再看金額對不對", weight: -1 },
      { label: "吃掉。可能是招待吧", weight: -2 },
    ],
  },
  {
    axis: 'm',
    text: "限定商品，只有這個縣有，而且你不確定會不會再來",
    options: [
      { label: "查了一下，網路上買得到，放回去", weight: 2 },
      { label: "買一個，不買兩個", weight: 1 },
      { label: "買兩個，一個自己用一個送人（都自己用）", weight: -1 },
      { label: "整排掃下來，這種機會不會有第二次", weight: -2 },
    ],
  },
  {
    axis: 'e',
    text: "回國後朋友問這趟最喜歡哪裡",
    options: [
      { label: "打開相簿一個一個講", weight: 2 },
      { label: "講了三個點，都是有名的", weight: 1 },
      { label: "講一家連名字都不太確定的店", weight: -1 },
      { label: "講一個下午，而不是一個地點", weight: -2 },
    ],
  },
] as const;
