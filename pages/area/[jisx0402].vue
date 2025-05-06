<template>
  <div>
    <div v-if="disasters.length">
      <div v-for="(disaster, index) in disasters" :key="index" class="disaster">
        <p>住所: {{ disaster.address }}</p>
        <p>出動時刻: {{ disaster.time }}</p>
        <p>出動種別: {{ disaster.type }}</p>
      </div>
      <hr>
    </div>
    <div v-else-if="source.length">
      <p>現在、消防出動情報はありません。</p>
      <hr>
    </div>
    <div v-if="source.length">
      <div v-for="(src, index) in source" :key="index">
        <p>{{ src.name }}</p>
        <p><a :href="src.url" rel="noopener">{{ src.url }}</a></p>
      </div>
    </div>
    <div v-else>
      <p>指定された地方公共団体コードの消防本部等に、emergency-dispatchが対応していないか、誤った値が入力された可能性があります。</p>
      <p>指定された地方公共団体コード（<span class="has-text-weight-bold">{{ route.params.jisx0402 }}</span>）が存在するかどうかと共にお確かめください。</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const disasters = ref([]);
const source = ref([]);
const route = useRoute();

onMounted(async () => {
  const jisx0402 = route.params.jisx0402;

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

