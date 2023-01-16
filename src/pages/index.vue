<script setup lang="ts">
import { TCollection } from '@/types/collection';
import { useSelectionStore } from '@/stores/selections';
import { useGenresStore } from '@/stores/genres';
import { COLLECTION_ITEMS_PER_PAGE } from '@/constants/collection';

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

const getCollections = async (isInit = false) => {
  const store = stores[currentStoreIndex.value];
  const newCollections =
    (isInit ? store.getCollections() : await store.getNewCollections()) ?? [];

  newCollections.forEach(addCollectionToData);
};

const updateCollectionList = async () => {
  isLoading.value = true;

  if (processedCollection.value === 0) {
    await getCollections(true);
  }

  while (
    needCollection.value > processedCollection.value &&
    !isFinished.value
  ) {
    if (processedCollection.value === data.value.length) {
      if (stores[currentStoreIndex.value].isFinished) {
        if (++currentStoreIndex.value === stores.length) {
          isFinished.value = true;
          break;
        }
        await getCollections(true);
      } else {
        await getCollections();
      }
    }

    const collection = data.value[processedCollection.value];
    const store = stores[currentStoreIndex.value];

    if (collection.movieIDs.length < COLLECTION_ITEMS_PER_PAGE) {
      const movieIDs =
        (await store.getLastestCollectionMovieIDs(
          collection.id,
          COLLECTION_ITEMS_PER_PAGE
        )) ?? [];
      data.value[processedCollection.value].movieIDs = movieIDs;
    }

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
