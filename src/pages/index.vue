<script setup lang="ts">
import { TCollection } from '@/types/collection';
import { useGenresStore } from '@/stores/genres';
import { useMoviesStore } from '@/stores/movies';

const data = ref<TCollection[]>([]);
const el = ref<HTMLElement | null>(null);
const genresStore = useGenresStore();
const moviesStore = useMoviesStore();

const getNewCollections = async () => {
  if (genresStore.isFinished) return;
  const newGenreIDs = await genresStore.getNewGenres();
  newGenreIDs.forEach(async (genreID) => {
    const genre = genresStore.getGenre(genreID);
    if (genre === null) return;
    const movieIDs = await moviesStore.getCollectionMovies({
      type: 'genres',
      id: genre.id,
    });
    if (!movieIDs.length) return;
    data.value.push({
      ...genre,
      movieIDs,
    });
  });
};

useInfiniteScroll(el, getNewCollections, { distance: 0 });

onMounted(getNewCollections);
</script>

<template>
  <div class="content" ref="el">
    <CollectionBlock
      :title="collection.name"
      :movieIDs="collection.movieIDs"
      :key="collection.id"
      one-row
      v-for="collection in data"
    />
  </div>
</template>

<style scoped lang="scss">
.content {
  width: 100%;
  height: 400px;

  display: flex;
  flex-direction: column;
  row-gap: 2rem;
  overflow-y: auto;
}
</style>
