<script setup lang="ts">
import { TCollection, TCollectionStore } from '@/types/collection';
import { useSelectionStore } from '@/stores/selections';
import { TSelection } from '@/types/selection';

const store = useSelectionStore();
const route = useRoute();
const selection = ref<(TSelection & TCollectionStore) | null>(null);

onBeforeMount(async () => {
  const selectionData = await store.getLastestCollectionMovieIDs(
    Number(route.params.id)
  );
  if (selectionData) {
    selection.value = await store.getCollection(Number(route.params.id));
  } else {
    showError({ statusCode: 404, message: 'Selection not found' });
  }
});
</script>

<template>
  <CollectionBlock
    v-if="selection"
    :title="selection.name"
    :movieIDs="selection.movieIDs"
  ></CollectionBlock>
</template>
