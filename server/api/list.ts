let cachedData: any = null; // メモリ内キャッシュ
let cacheTimestamp: number = 0; // キャッシュのタイムスタンプ
const CACHE_DURATION = 1000 * 60 * 5; // キャッシュの有効期間

export default defineEventHandler(async () => {
  const config = useRuntimeConfig();
  const edbotBaseUrl = config.EDBOT_BASE_URL;

  // 現在のタイムスタンプを取得
  const now = Date.now();

  // キャッシュが有効であればキャッシュを返す
  if (cachedData && now - cacheTimestamp < CACHE_DURATION) {
    console.log('list.json: キャッシュデータを返却します');
    return cachedData;
  }

  try {
    // 外部APIからデータを取得
    const response = await $fetch(`${edbotBaseUrl}/list.json`);
    
    // レスポンス全体をキャッシュに保存
    cachedData = response;
    cacheTimestamp = now;

    console.log('list.json: 新しいデータを取得し、キャッシュを更新しました', cachedData);
    return cachedData;
  } catch (error) {
    console.error('list.jsonの取得に問題があります:', error);

    // キャッシュが存在する場合はキャッシュを返す
    if (cachedData) {
      console.warn('list.json: 新しいデータの取得に失敗しました。キャッシュを返します');
      return cachedData;
    }

    // キャッシュもない場合はエラーをスロー
    throw createError({ statusCode: 500, statusMessage: 'list.json: 新しいデータの取得に失敗しました。またキャッシュも存在しないため、返すデータがありません' });
  }
});