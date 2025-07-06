import { defineEventHandler, createError } from 'h3';

const cache: Record<string, { data: any; timestamp: number }> = {}; // キャッシュ用オブジェクト
const CACHE_DURATION = 1000 * 60 * 1; // キャッシュの有効期間（1分）

export default defineEventHandler(async (event) => {
  const { jisx0402 } = event.context.params; // 動的ルートパラメータを取得
  const config = useRuntimeConfig();
  const edbotBaseUrl = config.EDBOT_BASE_URL;

  if (!jisx0402) {
    throw createError({ statusCode: 400, statusMessage: 'jisx0402の指定が必要です' });
  }

  // キャッシュの確認
  const now = Date.now();
  if (cache[jisx0402] && now - cache[jisx0402].timestamp < CACHE_DURATION) {
    console.log(`jisx0402: キャッシュデータを返却します`);
    return cache[jisx0402].data;
  }

  try {
    // 外部APIからデータを取得
    const response = await fetch(`${edbotBaseUrl}/${jisx0402}.json`);
    if (!response.ok) {
      throw createError({ statusCode: response.status, statusMessage: `jisx0402: データの取得に問題があります` });
    }

    const data = await response.json();

    // キャッシュを更新
    cache[jisx0402] = {
      data,
      timestamp: now,
    };

    console.log(`jisx0402: 新しいデータを取得し、キャッシュを更新しました`);
    return data;
  } catch (error) {
    console.error(`jisx0402: 取得に問題があります`, error);

    // キャッシュが存在する場合はキャッシュを返す
    if (cache[jisx0402]) {
      console.warn(`jisx0402: 新しいデータの取得に失敗しました。キャッシュを返します`);
      return cache[jisx0402].data;
    }

    // キャッシュもない場合はエラーをスロー
    throw createError({ statusCode: 500, statusMessage: `jisx0402: 新しいデータの取得に失敗しました。またキャッシュも存在しないため、返すデータがありません` });
  }
});