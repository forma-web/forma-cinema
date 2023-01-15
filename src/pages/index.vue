<script setup lang="ts">
import { TCollection } from '@/types/collection';
import { useSelectionStore } from '@/stores/selections';
import { useGenresStore } from '@/stores/genres';

const data = ref<TCollection[]>([]);
const dataRender = computed(() =>
  data.value.filter((collection) => collection.movieIDs.length > 0)
);

const stores = [useSelectionStore(), useGenresStore()];
const currentStoreIndex = ref<number>(0);
const needCollection = ref<number>(0);
const processedCollection = ref<number>(0);
const isLoading = ref<boolean>(false);
const isFinished = ref<boolean>(false);

const addCollectionToData = ({ id, name, movieIDs }: TCollection) => {
  data.value.push({
    id,
    type: stores[currentStoreIndex.value].type,
    name,
    movieIDs,
  });
};

const initCollectionFromStore = async () => {
  const store = stores[currentStoreIndex.value];
  const newCollections = store.getCollections();
  newCollections.forEach(addCollectionToData);
  processedCollection.value = data.value.length;
};

const updateCollectionList = async () => {
  isLoading.value = true;
  while (needCollection.value > processedCollection.value) {
    if (processedCollection.value === 0) {
      initCollectionFromStore();
    }

    if (processedCollection.value === data.value.length) {
      if (stores[currentStoreIndex.value].isFinished) {
        if (++currentStoreIndex.value === stores.length) {
          isFinished.value = true;
          isLoading.value = false;
          return;
        }
        initCollectionFromStore();
      }

      const store = stores[currentStoreIndex.value];
      const newCollections = (await store.getNewCollections()) ?? [];

      newCollections.forEach(addCollectionToData);
    }

    const collection = data.value[processedCollection.value];
    const store = stores[currentStoreIndex.value];

    console.log('collection', collection);

    const movieIDs =
      (await store.getLastestCollectionMovieIDs(collection.id, 10)) ?? [];
    data.value[processedCollection.value].movieIDs = movieIDs;

    processedCollection.value++;
  }
  isLoading.value = false;
};

useInfiniteScroll(
  document,
  () => {
    needCollection.value += 5;
    if (!isFinished) updateCollectionList();
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
      :key="`${collection.type}-${collection.id}`"
      one-row
      v-for="collection in dataRender"
    />
    <div v-if="isLoading && !isFinished" class="loading">
      <FrmLoading />
    </div>
  </div>
</template>

<style scoped lang="scss">
.content {
  width: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 6rem;
}

.loading {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  padding: 6rem 0;
}
</style>
