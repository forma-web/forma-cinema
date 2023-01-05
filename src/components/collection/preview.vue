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
    <div class="preview">
      <div class="background-container">
        <img class="background" loading="lazy" v-if="poster" :src="poster" />
      </div>
      <div class="icons">
        <FrmRating :rating="kinopoisk_rating" v-if="kinopoisk_rating" />
      </div>
    </div>
    <div class="information">
      <h4 class="name">
        {{ name }}
      </h4>
      <div class="description">
        {{ description }}
      </div>
    </div>
  </article>
</template>

<style scoped lang="scss">
$height-preview: calc(
  (100vw - ($movies-in-collection - 1) * 1em) * 9 / ($movies-in-collection * 16)
);
.movie {
  width: 100%;
  font-size: 1.8rem;
  display: flex;
  flex-direction: column;
  row-gap: 0.9em;
}
.preview {
  width: 100%;
  height: $height-preview;
  border-radius: $border-radius;
  overflow: hidden;
  background-color: $background-loading-preview;
  position: relative;
}
.background-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}
.background {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.icons {
  position: relative;
  width: 100%;
  padding: 1em;
  display: flex;
  align-items: center;
  row-gap: 0.375em;
  z-index: 2;
}
.information {
  display: flex;
  flex-direction: column;
  row-gap: 0.375em;
}
</style>
