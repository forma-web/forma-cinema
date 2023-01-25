<script setup lang="ts">
import { useMoviesStore } from '@/stores/movies';
import { allMovies } from '@/services/api/movies';
import { EMoviesMode } from '@/constants/movies';

const moviesStore = useMoviesStore();

const allMovieIDs = ref<number[]>([]);
const isInited = ref(false);
const nextCursor = ref<string | null>(null);

const isFinished = computed(() => isInited.value && nextCursor.value === null);

onMounted(async () => {
  while (!isFinished.value) {
    isInited.value = true;
    const newMovieIDs: number[] = [];

    const { data: newMovies } =
      (await allMovies({
        cursor: nextCursor.value,
        mode: EMoviesMode.PUBLISHED,
      })) ?? {};
    nextCursor.value = newMovies?.value?.next_cursor ?? null;

    if (!newMovies || !newMovies.value) continue;

    newMovies.value.data.forEach((movie) => {
      moviesStore.setMovie(movie);
      newMovieIDs.push(movie.id);
    });

    allMovieIDs.value = [...allMovieIDs.value, ...newMovieIDs];
  }
});
</script>

<template>
  <CollectionBlock
    title="Все фильмы"
    :movieIDs="allMovieIDs"
  ></CollectionBlock>
</template>
