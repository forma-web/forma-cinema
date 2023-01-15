<script setup lang="ts">
import { TCollection } from '@/types/collection';
import { useSelectionStore } from '../stores/selections';

const el = ref<HTMLElement | null>(null);
const selectionStore = useSelectionStore();

const data = ref<TCollection[]>([]);

const getNewCollections = async () => {
  if (selectionStore.isFinished) return;
  const newSelectioIDs = await selectionStore.getNewSelections();

  if (!newSelectioIDs) return;

  newSelectioIDs.forEach(async (selectionID) => {
    const selection = await selectionStore.getSelection(selectionID);

    if (selection === null) return;

    const movieIDs = await selectionStore.getNewSelectionMovieIDs(selection.id);
    if (!movieIDs) return;

    data.value.push({
      id: selection.id,
      type: 'selection',
      name: selection.name,
      movieIDs,
    });
  });
};

useInfiniteScroll(document, getNewCollections, { distance: 100 });

onMounted(getNewCollections);
</script>

<template>
  <div class="content" ref="el">
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
  overflow-y: auto;
}
</style>
