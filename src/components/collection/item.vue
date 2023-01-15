<script setup lang="ts">
import { TMovie } from '@/types/movie';
import { useMoviesStore } from '@/stores/movies';

const movieStore = useMoviesStore();

const movieProps = defineProps<{ movieID: number }>();

const movie = await movieStore.getMovieById(movieProps.movieID);
const { poster, name, kinopoisk_rating } = movie ?? {};

const description = formatMovieDetails(String(movie?.year));
</script>

<template>
  <article class="movie">
    <MoviePreview :poster="poster" class="movie__preview">
      <FrmRating :rating="kinopoisk_rating" v-if="kinopoisk_rating" />
    </MoviePreview>
    <MovieInfo :name="name ?? ''" :details="description" />
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
  border-radius: $border-radius;
}
</style>
