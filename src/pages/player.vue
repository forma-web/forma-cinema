<script setup lang="ts">
definePageMeta({
  layout: 'player',
});

const videoData = {
  name: 'Топ Ган: Мэверик',
  src: 'http://92.125.33.134:9999/movies/18454344-0a83-428d-92e9-061c9e439334.mp4',
};
</script>

<template>
  <Player :name="videoData.name" :src="videoData.src" />
</template>
