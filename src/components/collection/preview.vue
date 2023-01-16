<script setup lang="ts">
import { TMovie } from '@/types/movie';

const { movie } = defineProps<{ movie: TMovie }>();
const { name, year, genres, isSerial, kinopoisk_rating, poster } = movie;

const description = formatMovieDetails(
  formatYearDetail(year, isSerial),
  genres
);
</script>

<template>
  <article class="promo">
    <MoviePreview :poster="poster" class="movie__preview">
      <FrmRating :rating="kinopoisk_rating" v-if="kinopoisk_rating" />
    </MoviePreview>
    <MovieInfo :name="name" :details="description" />
  </article>
</template>

<style scoped lang="scss">
.promo {
  position: absolute;
  top: 0;
  left: 0;
  width: $width-column;
  font-size: 1.8rem;
  display: flex;
  flex-direction: column;
  row-gap: 0.9em;
}

.movie__preview {
  border-radius: $border-radius;
}
</style>
