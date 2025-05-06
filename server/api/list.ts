export default defineEventHandler(async () => {
  const config = useRuntimeConfig();
  const edbotBaseUrl = config.EDBOT_BASE_URL; 

  const response = await fetch(`${edbotBaseUrl}/list.json`);
  if (!response.ok) {
    throw createError({ statusCode: 500, statusMessage: 'list.jsonの取得に失敗しました' });
  }
  return await response.json();
});