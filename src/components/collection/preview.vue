<script setup lang="ts">
import { TMovie } from '@/types/collection';

const { movie } = defineProps<{ movie: TMovie }>();
const { name, year, genres, isSerial, kinopoisk_rating, poster } = movie;
</script>

<template>
  <article class="preview-movie">
    <FrmPreview :poster="poster" />
  </article>
</template>

<style scoped lang="scss"></style>
