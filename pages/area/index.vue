<template>
  <div>
    <div class="hero">
        <div class="hero-body">
            <h1 class="title">対応している市区町村等の一覧</h1>
            <p class="subtitle">edinfoにおいて対応している市区町村等ごとのページへのリンク一覧</p>
        </div>
    </div>
    <div class="container p-2">
        <div class="columns is-multiline">
            <div v-for="(cn, index) in codeAndName" :key="index" class="column is-3">
                <NuxtLink :to="`/area/${cn.code}`">
                    <div class="card">
                        <div class="card-header">
                          <h2 class="card-header-title">
                            {{ cn.name }}
                          </h2>
                        </div>
                        <div class="card-content">
                            地方公共団体コード: {{ cn.code }}
                        </div>
                    </div>
                </NuxtLink>
            </div>
        </div>
    </div>
    <div v-if="!codeAndName.length">
      <p>対応市区町村等の一覧を取得しています。長時間このメッセージが表示される場合は、取得に失敗した可能性があります。</p>
    </div>
    <CommonFooter />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const codeAndName = ref([]);

onMounted(async () => {
  try {
    const codesResponse = await fetch('/api/list');
    if (!codesResponse.ok) {
      console.error('/api/listの取得に失敗しました');
    }
    const codes = await codesResponse.json();

    // 各コードに対応する地方公共団体名を並列で取得します
    const promises = codes.map(async (code) => {
      try {
        const nameResponse = await fetch(`/api/name/${code}`);
        // 名称が取得できなくてもコードは表示できるようにフォールバックします
        if (!nameResponse.ok) return { code: code, name: code };
        return await nameResponse.json(); // APIは { code, name } を返します
      } catch (e) {
        console.error('地方公共団体名の取得に失敗しました', error);
        return { code: code, name: code }; // エラー時もフォールバック
      }
    });

    codeAndName.value = await Promise.all(promises);
  } catch (error) {
    console.error('取得プロセスのどこかで失敗しました', error);
  }
});

useSeoMeta({
  title: '対応している市区町村等の一覧',
  description: 'edinfoが対応している地方公共団体の一覧を表示しています',
  twitterCard: 'summary'
})

</script>
