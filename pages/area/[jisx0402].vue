<template>
  <div>
    <div class="hero">
      <TopNav />
      <div class="hero-body">
        <div class="container">
          <h1 class="title">{{ jisx0402 }}の消防出動情報</h1>
          <p class="subtitle">地方公共団体コード: {{ jisx0402 }}</p>
        </div>
      </div>
    </div>
    <div v-if="disasters.length">
      <div class="container p-2">
        <div class="columns is-multiline">
          <div v-for="(disaster, index) in disasters" :key="index" class="disaster">
            <div class="column is-3">
              <div class="card">
                <div class="card-header">
                  <h2 class="card-header-title">
                    {{ disaster.type }}
                  </h2>
                </div>
                <div class="card-content">
                  <p>住所: {{ disaster.address }}</p>
                  <p>時刻: {{ disaster.time }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr>
    </div>
    <div v-else-if="source.length">
      <p>現在、消防出動情報はありません。</p>
      <hr>
    </div>
    <div v-if="source.length" class="container m-2">
      <div v-for="(src, index) in source" :key="index">
        <p>消防本部等: {{ src.name }}</p>
        <p>ソース: <a :href="src.url" rel="noopener">{{ src.url }}</a></p>
      </div>
    </div>
    <div v-else>
      <p>指定された地方公共団体コードの消防本部等に、emergency-dispatchが対応していないか、誤った値が入力された可能性があります。</p>
      <p>指定された地方公共団体コード（<span class="has-text-weight-bold">{{ route.params.jisx0402 }}</span>）が存在するかどうかと共にお確かめください。</p>
    </div>
    <CommonFooter />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const disasters = ref([]);
const source = ref([]);
const route = useRoute();
const jisx0402 = route.params.jisx0402;

onMounted(async () => {
  if (!jisx0402) {
    console.error('jisx0402 is undefined');
    return;
  }

  try {
    // サーバーサイドのAPIを経由してデータを取得
    const response = await fetch(`/api/${jisx0402}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch data for jisx0402: ${jisx0402}`);
    }

    const data = await response.json();
    console.log('data:', data);

    disasters.value = data.disasters || [];
    source.value = data.source || [];
  } catch (error) {
    console.error(error);
  }
});
</script>

