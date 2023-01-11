<script setup lang="ts">
definePageMeta({
  layout: 'player',
});

const videoData = {
  name: 'Топ Ган: Мэверик',
  src: 'http://92.125.33.134:9999/movies/c332ae49-b39c-4e2e-8819-ae5eef5a551d.mp4',
};
</script>

<template>
  <PlayerBlock :name="videoData.name" :src="videoData.src" />
</template>
