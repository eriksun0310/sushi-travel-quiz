import type { AxisKey } from './axes';

/** 選項權重固定 +2 / +1 / −1 / −2；A 最極端的 + 端，D 最極端的 − 端（笑點在 D）。 */
export type OptionWeight = 2 | 1 | -1 | -2;
export type Option = { label: string; weight: OptionWeight };
export type Question = { axis: AxisKey; text: string; options: Option[] };

/** 每次作答從每軸抽 QUESTIONS_PER_AXIS 題，所以重測會看到不同題目。 */
export const QUESTIONS_PER_AXIS = 4;

export const QUESTION_POOL: readonly Question[] = [
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
    axis: 'p',
    text: "你要搭的那班電車在你眼前關門開走",
    options: [
      { label: "沒事，我排的時候就抓了兩班的緩衝", weight: 2 },
      { label: "立刻查下一班幾分到", weight: 1 },
      { label: "先去旁邊便利商店買個東西，等一下", weight: -1 },
      { label: "那就下一班。又不是最後一班", weight: -2 },
    ],
  },
  {
    axis: 'p',
    text: "出門前發現下大雨，今天排的是戶外行程",
    options: [
      { label: "把備案那一欄叫出來，照著走", weight: 2 },
      { label: "花十分鐘重查附近有什麼室內的", weight: 1 },
      { label: "先去吃早餐，邊吃邊想", weight: -1 },
      { label: "還是去啊，下雨的版本也不錯", weight: -2 },
    ],
  },
  {
    axis: 'm',
    text: "藥妝店，看一下你的購物籃",
    options: [
      { label: "帶著清單來，買完就走", weight: 2 },
      { label: "清單以外多了兩三樣", weight: 1 },
      { label: "籃子換過一次，換成大的", weight: -1 },
      { label: "已經在算要不要寄回台灣", weight: -2 },
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
    axis: 'm',
    text: "你很想要那個東西，但台灣好像也買得到",
    options: [
      { label: "查了，台灣有，而且比較便宜。放回去", weight: 2 },
      { label: "記下來，回台灣再說", weight: 1 },
      { label: "台灣有，但這裡的包裝比較好看", weight: -1 },
      { label: "台灣有，但我現在就想要", weight: -2 },
    ],
  },
  {
    axis: 'm',
    text: "同事丟了一張指定清單給你",
    options: [
      { label: "先問清楚型號、數量、預算上限", weight: 2 },
      { label: "幫買，但講好買不到就算了", weight: 1 },
      { label: "幫買，順便自己也各買一份", weight: -1 },
      { label: "幫買。自己那份買得比他的多", weight: -2 },
    ],
  },
  {
    axis: 'm',
    text: "你已經有一個了，但這裡的花色不一樣",
    options: [
      { label: "買了才會後悔。放回去", weight: 2 },
      { label: "只買一個，回去把舊的換掉", weight: 1 },
      { label: "不買才會後悔吧？應該吧？", weight: -1 },
      { label: "先買。抽屜關不關得起來，回國再說", weight: -2 },
    ],
  },
  {
    axis: 'm',
    text: "結帳金額 4,700 円，免稅門檻是 5,000",
    options: [
      { label: "4,700 就 4,700，那點稅我付", weight: 2 },
      { label: "算了一下，省的稅還不夠那 300", weight: 1 },
      { label: "再拿一個 300 円的，剛好", weight: -1 },
      { label: "再拿一個 1,200 円的。都要湊了", weight: -2 },
    ],
  },
  {
    axis: 'm',
    text: "晚上十一點，你站在唐吉訶德門口",
    options: [
      { label: "明天早上再來，現在該睡了", weight: 2 },
      { label: "進去，只買清單上的", weight: 1 },
      { label: "進去。一小時後你還在三樓", weight: -1 },
      { label: "進去。出來是兩點，隔天行程往後延", weight: -2 },
    ],
  },
  {
    axis: 'm',
    text: "你打開匯率換算，發現現在比上次來便宜",
    options: [
      { label: "那是錯覺，我的預算沒有變", weight: 2 },
      { label: "心情變好，但買的一樣多", weight: 1 },
      { label: "換算完覺得這根本半價", weight: -1 },
      { label: "匯率好就是要多買，這叫避險", weight: -2 },
    ],
  },
  {
    axis: 'm',
    text: "東西裝不下了，你站在賣行李箱的那一區",
    options: [
      { label: "不用，我用寄的", weight: 2 },
      { label: "買最小的，回去還能收納", weight: 1 },
      { label: "買了，而且裡面先裝滿才走", weight: -1 },
      { label: "買了。它也算戰利品之一", weight: -2 },
    ],
  },
  {
    axis: 's',
    text: "店員用日文問你這個要幾個",
    options: [
      { label: "講得出來，而且數量講對", weight: 2 },
      { label: "講得出來，但講完偷看店員的表情", weight: 1 },
      { label: "比二", weight: -1 },
      { label: "比二。店員又問一次。你又比了一次", weight: -2 },
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
    axis: 's',
    text: "出站後你發現方向反了",
    options: [
      { label: "去問站務員", weight: 2 },
      { label: "問路人，英文加手勢", weight: 1 },
      { label: "站在原地轉手機轉三分鐘", weight: -1 },
      { label: "順著人群走，總會到", weight: -2 },
    ],
  },
  {
    axis: 's',
    text: "結帳時店員講了一串，你只確定他在問你問題",
    options: [
      { label: "猜是在問要不要袋子，直接回答", weight: 2 },
      { label: "請他再講一次", weight: 1 },
      { label: "掏出手機翻譯", weight: -1 },
      { label: "點頭說「はい」。然後一路はい到結束", weight: -2 },
    ],
  },
  {
    axis: 's',
    text: "店員端上一道你沒點的東西",
    options: [
      { label: "直接跟他說我沒點這個", weight: 2 },
      { label: "指著菜單跟他確認一下", weight: 1 },
      { label: "先吃，等結帳再看金額對不對", weight: -1 },
      { label: "吃掉。可能是招待吧", weight: -2 },
    ],
  },
  {
    axis: 's',
    text: "居酒屋隔壁桌的日本人跟你搭話",
    options: [
      { label: "聊起來了，還交換了 IG", weight: 2 },
      { label: "講得零零落落，但撐完了", weight: 1 },
      { label: "笑，點頭，然後低頭吃東西", weight: -1 },
      { label: "假裝沒聽到", weight: -2 },
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
    axis: 'e',
    text: "回國後朋友問這趟最喜歡哪裡",
    options: [
      { label: "打開相簿一個一個講", weight: 2 },
      { label: "講了三個點，都是有名的", weight: 1 },
      { label: "講一家連名字都不太確定的店", weight: -1 },
      { label: "講一個下午，而不是一個地點", weight: -2 },
    ],
  },
  {
    axis: 'e',
    text: "你走進一間神社",
    options: [
      { label: "先去買御守。家裡那些是家裡那些", weight: 2 },
      { label: "抽個籤，拍張照，走", weight: 1 },
      { label: "繞到後面沒什麼人的地方待一下", weight: -1 },
      { label: "坐在台階上，坐到腳麻", weight: -2 },
    ],
  },
  {
    axis: 'e',
    text: "巷子裡一家沒有招牌的店，看不出來賣什麼",
    options: [
      { label: "拍張照繼續走，行程還有六個點", weight: 2 },
      { label: "查一下評論，沒資料，算了", weight: 1 },
      { label: "在門口猶豫兩分鐘", weight: -1 },
      { label: "推門進去", weight: -2 },
    ],
  },
] as const;
