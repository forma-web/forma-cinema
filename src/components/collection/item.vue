<script setup lang="ts">
import { TMovie } from '@/types/movie';
import { useMoviesStore } from '@/stores/movies';

const movieStore = useMoviesStore();

const movieProps = defineProps<{ movieID: number }>();
const movie = ref<TMovie | null>();

onMounted(async () => {
  movie.value = await movieStore.getMovieById(movieProps.movieID);
});

const description = computed(() =>
  formatMovieDetails(String(movie.value?.year))
);
</script>

<template>
  <article class="movie" v-if="movie">
    <MoviePreview :poster="movie.poster" class="movie__preview">
      <FrmRating
        :rating="movie.kinopoisk_rating"
        v-if="movie.kinopoisk_rating"
      />
    </MoviePreview>
    <MovieInfo :name="movie.name ?? ''" :details="description" />
  </article>
</template>

<style scoped lang="scss">
.movie {
  width: 100%;
  font-size: 1.8rem;
  display: flex;
  flex-direction: column;
  row-gap: 0.9em;
}

.movie__preview {
  border-radius: var(--border-radius);
}
</style>
