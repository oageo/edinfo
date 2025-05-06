import { defineEventHandler, createError } from 'h3';

export default defineEventHandler(async (event) => {
  const { jisx0402 } = event.context.params; // 動的ルートパラメータを取得
  const config = useRuntimeConfig();
  const edbotBaseUrl = config.EDBOT_BASE_URL;

  if (!jisx0402) {
    throw createError({ statusCode: 400, statusMessage: 'jisx0402 is required' });
  }

  try {
    // 外部APIからデータを取得
    const response = await fetch(`${edbotBaseUrl}/${jisx0402}.json`);
    if (!response.ok) {
      throw createError({ statusCode: response.status, statusMessage: `Failed to fetch data for jisx0402: ${jisx0402}` });
    }

    const data = await response.json();
    return data; // クライアントにデータを返す
  } catch (error) {
    console.error(error);
    throw createError({ statusCode: 500, statusMessage: 'Failed to fetch data from external API' });
  }
});