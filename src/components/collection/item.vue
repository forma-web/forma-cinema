<script setup lang="ts">
import { TCollectionItem } from '@/types/collection';

const { movie } = defineProps<{ movie: TCollectionItem }>();
const { title, year, genres, isSerial, rating, poster } = movie;

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
    <div class="preview"></div>
    <div class="information">
      <h4 class="title">
        {{ title }}
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
  padding: 1em;
  border-radius: $border-radius;
  overflow: hidden;
  background-color: $background-loading-preview;
}
.information {
  display: flex;
  flex-direction: column;
  row-gap: 0.375em;
}
</style>
