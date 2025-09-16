<template>
  <div>
    <div class="hero">
      <TopNav />
      <div class="hero-body">
        <div class="container">
          <h1 class="title">全国の消防出動情報</h1>
          <p class="subtitle">全国の消防出動を一括表示</p>
        </div>
      </div>
    </div>


    <div v-if="loading" class="container p-2">
      <p>データを読み込み中...</p>
    </div>

    <div v-else-if="error" class="container p-2">
      <p class="has-text-danger">{{ error }}</p>
    </div>

    <div v-else-if="sortedDisasters.length" class="container p-2">
      <div class="notification is-info is-light mb-4">
        <p><strong>{{ statistics.message }}</strong></p>
      </div>
      <div class="columns is-multiline">
        <article v-for="(disaster, index) in sortedDisasters" :key="index" class="disaster column is-3">
          <div class="card">
            <div class="card-header">
              <h2 class="card-header-title">
                {{ disaster.type }}（{{ disaster.source[0].name }}）
              </h2>
            </div>
            <div class="card-content">
              <p>
                自治体: {{ getLocalGovName(disaster.jisx0402) }}（<NuxtLink :to="`/area/${disaster.jisx0402}`" class="has-text-link">出動情報一覧</NuxtLink>）
              </p>
              <p>住所: {{ disaster.address }}</p>
              <p>時刻: {{ disaster.time }}</p>
              <p>ソース消防本部等: {{ disaster.source[0].name }}</p>
              <p>ソースURL: <a :href="disaster.source[0].url" rel="noopener">{{ disaster.source[0].url }}</a></p>
            </div>
          </div>
        </article>
      </div>
    </div>

    <div v-else class="container p-2">
      <p>現在、出動情報はありません。</p>
    </div>

    <CommonFooter />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';

const rawData = ref(null);
const loading = ref(true);
const error = ref(null);
const localGovNames = ref({});
const listData = ref(null);

// 地方公共団体名を取得する関数
const getLocalGovName = (jisx0402) => {
  return localGovNames.value[jisx0402] || jisx0402;
};

// 地方公共団体名を非同期で取得
const fetchLocalGovName = async (jisx0402) => {
  if (localGovNames.value[jisx0402]) return; // すでに取得済み

  try {
    const response = await fetch(`/api/name/${jisx0402}`);
    if (response.ok) {
      const data = await response.json();
      localGovNames.value[jisx0402] = data.name;
    }
  } catch (err) {
    console.warn(`地方公共団体名の取得に失敗: ${jisx0402}`, err);
  }
};

onMounted(async () => {
  try {
    // all.jsonとlist.jsonを並列で取得
    const [allResponse, listResponse] = await Promise.all([
      fetch('/api/all'),
      fetch('/api/list')
    ]);

    if (!allResponse.ok) {
      throw new Error(`出動情報の取得に失敗しました: ${allResponse.status}`);
    }
    if (!listResponse.ok) {
      console.warn('list.jsonの取得に失敗しました:', listResponse.status);
    }

    rawData.value = await allResponse.json();
    if (listResponse.ok) {
      listData.value = await listResponse.json();
    }

    console.log('取得したデータ:', rawData.value);
    console.log('取得したリストデータ:', listData.value);

    // 全ての地方公共団体コードの名前を並列で取得
    const codes = Object.keys(rawData.value);
    await Promise.all(codes.map(code => fetchLocalGovName(code)));
  } catch (err) {
    error.value = err.message;
    console.error('エラー:', err);
  } finally {
    loading.value = false;
  }
});

// データを地方公共団体コード順にソートして返す
const sortedDisasters = computed(() => {
  if (!rawData.value) return [];

  // オブジェクト形式: {地方公共団体コード: {disasters: [...], source: [...]}}
  const allDisasters = [];

  // 地方公共団体コード順にソート
  const sortedCodes = Object.keys(rawData.value).sort();

  for (const jisx0402 of sortedCodes) {
    const areaData = rawData.value[jisx0402];
    if (areaData && areaData.disasters && Array.isArray(areaData.disasters)) {
      // 各災害情報に地方公共団体コードとソース情報を追加
      areaData.disasters.forEach(disaster => {
        allDisasters.push({
          ...disaster,
          jisx0402: jisx0402,
          source: areaData.source // ソース情報も追加
        });
      });
    }
  }

  return allDisasters;
});

// 統計情報を計算
const statistics = computed(() => {
  const currentCount = Object.keys(rawData.value || {}).length;
  const disasterCount = sortedDisasters.value.length;

  if (!listData.value) {
    return {
      disasterCount,
      currentCount,
      totalCount: null,
      message: `${disasterCount}件の出動情報が${currentCount}の地方公共団体から見つかりました`
    };
  }

  // list.jsonのデータ構造に応じて総数を計算
  let totalCount;
  if (Array.isArray(listData.value)) {
    totalCount = listData.value.length;
  } else if (typeof listData.value === 'object' && listData.value !== null) {
    totalCount = Object.keys(listData.value).length;
  } else {
    totalCount = null;
  }

  const message = totalCount
    ? `${disasterCount}件の出動情報が全${totalCount}件中${currentCount}件の消防本部等から見つかりました`
    : `${disasterCount}件の出動情報が${currentCount}の地方公共団体から見つかりました`;

  return {
    disasterCount,
    currentCount,
    totalCount,
    message
  };
});

useSeoMeta({
  title: '全国の消防出動情報',
  description: '全国の消防出動情報を一括表示します',
  twitterCard: 'summary'
});
</script>