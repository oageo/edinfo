/**
 * 地方公共団体のリストをキャッシュするための変数
 * サーバー起動後、最初のリクエストでデータを取得し、以降はキャッシュを返します。
 *
 * データ構造: { code: string; name: string; } の配列
 */
type JointAll = { code: string; name: string };
let codeAndName: JointAll[] | null = null;

export default defineEventHandler(async (event) => {
  const jisx0402 = getRouterParam(event, 'jisx0402');

  if (!jisx0402) {
    throw createError({
      statusCode: 400,
      statusMessage: '必須パラメータである「jisx0402」がありません。'
    });
  }

  // キャッシュがなければ、外部からJSONデータを取得する
  if (!codeAndName) {
    const config = useRuntimeConfig(event);
    const jmcJsonBaseUrl = config.public.JMCJSON_BASE_URL;

    try {
      const url = `${jmcJsonBaseUrl}/joint_all.json`;
      codeAndName = await $fetch<JointAll[]>(url);
    } catch (error) {
      console.error('JMCJSONからデータを取得することが出来ませんでした:', error);
      throw createError({
        statusCode: 500,
        statusMessage: 'JMCJSONからデータを取得することが出来ませんでした'
      });
    }
  }

  // 配列から該当するコードを持つオブジェクトを検索
  const found = codeAndName.find((item) => item.code === jisx0402);
  const name = found?.name;

  if (!name) {
    throw createError({
      statusCode: 404,
      statusMessage: `JMCJSONには指定された地方公共団体コード「"${jisx0402}"」のデータはありません`
    });
  }

  return { code: jisx0402, name: name };
});