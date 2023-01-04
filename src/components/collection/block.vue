<script setup lang="ts">
import { TCollectionItem } from '@/types/collection';

type TCollection = {
  title: string;
  movies: TCollectionItem[];
};

const { title, movies } = defineProps<TCollection>();
</script>

<template>
  <div class="block">
    <h3 class="title" v-if="title">{{ title }}</h3>
    <div class="list">
      <CollectionItem
        v-for="movie in movies"
        :key="movie.title"
        :movie="movie"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.block {
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  row-gap: 4.4rem;
  font-size: 1.8rem;
}

.title {
  width: 100%;
  padding: 0 $padding-collection;
}

.list {
  width: 100%;
  display: grid;
  padding: 0 $padding-collection;
  grid-template-columns: repeat(
    $movies-in-collection,
    calc((100% - ($movies-in-collection - 1) * 1em) / $movies-in-collection)
  );
  grid-column-gap: 1em;
  grid-row-gap: 2.5em;
}
</style>
