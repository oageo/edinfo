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
            <div v-for="(code, index) in codes" :key="index" class="column is-3">
                <NuxtLink :to="`/area/${code}`">
                    <div class="card">
                        <div class="card-content">
                            {{ code }}
                        </div>
                    </div>
                </NuxtLink>
            </div>
        </div>
    </div>
    <div v-if="!codes.length">
      <p>list.jsonの取得を試みています。長時間表示される場合は失敗した可能性があります。コンソールをご確認ください。</p>
    </div>
    <CommonFooter />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const codes = ref([]);

onMounted(async () => {
  try {
    const response = await fetch('/api/list');
    codes.value = await response.json();
  } catch (error) {
    console.error('list.jsonの取得に失敗しました:', error);
  }
});
</script>
