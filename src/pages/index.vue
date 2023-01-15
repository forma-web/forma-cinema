<script setup lang="ts">
import { TCollection } from '@/types/collection';
import { useSelectionStore } from '@/stores/selections';
import { useGenresStore } from '@/stores/genres';

const data = ref<TCollection[]>([]);

const stores = [useSelectionStore(), useGenresStore()];
const currentStoreIndex = ref<number>(0);
const needCollection = ref<number>(0);
const processedCollection = ref<number>(0);

const updateCollectionList = async () => {
  while (needCollection.value > processedCollection.value) {
    if (processedCollection.value === data.value.length) {
      if (stores[currentStoreIndex.value].isFinished) currentStoreIndex.value++;
      if (currentStoreIndex.value >= stores.length) return;

      const store = stores[currentStoreIndex.value];
      const newCollections = (await store.getNewCollections()) ?? [];

      newCollections.forEach(({ id, name, movieIDs }) => {
        data.value.push({
          id,
          type: store.type,
          name,
          movieIDs,
        });
      });
    }

    const collection = data.value[processedCollection.value];
    const store = stores[currentStoreIndex.value];
    processedCollection.value++;
  }
};

useInfiniteScroll(
  document,
  () => {
    needCollection.value += 5;
    updateCollectionList();
  },
  { distance: 0 }
);

onMounted(() => {
  needCollection.value = 5;
  updateCollectionList();
});
</script>

<template>
  <div class="content">
    <CollectionBlock
      :title="collection.name"
      :movieIDs="collection.movieIDs"
      :key="collection.id"
      one-row
      v-for="collection in data.sort((a, b) => a.id - b.id)"
    />
  </div>
</template>

<style scoped lang="scss">
.content {
  width: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 6rem;
}
</style>
