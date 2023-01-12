<script setup lang="ts">
definePageMeta({
  layout: 'player',
});

const videoData = {
  name: 'Казино «Рояль»',
  src: 'http://92.125.33.134:9999/movies/6102b13f-cb0b-46ea-b030-874e79901ac7.mp4',
};
</script>

<template>
  <Player :name="videoData.name" :src="videoData.src" />
</template>
