<script setup lang="ts">
import { TMovie } from '@/types/collection';

const { movie } = defineProps<{ movie: TMovie }>();
const { name, year, genres, isSerial, kinopoisk_rating, poster } = movie;

const description = computed(() => {
  const params = [];
  if (year !== undefined) {
    const yearParam = isSerial ? `c ${year}` : year;
    params.push(yearParam);
  }
  if (genres !== undefined) {
    params.push(...genres.map((genre) => genre.toLowerCase()));
  }
  return params.join(', ');
});
</script>

<template>
  <article class="movie">
    <FrmMoviePreview :poster="poster" class="movie__preview">
      <FrmRating :rating="kinopoisk_rating" v-if="kinopoisk_rating" />
    </FrmMoviePreview>
    <FrmMovieInfo :name="name" :details="description" />
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
