<script setup lang="ts">
definePageMeta({
  layout: 'player',
});

const videoData = {
  name: 'Топ Ган: Мэверик',
  src: 'http://92.125.33.134:9999/movies/5a4cb7de-1003-44a2-af9f-365f8b313057.mp4',
};
</script>

<template>
  <PlayerBlock :name="videoData.name" :src="videoData.src" />
</template>
