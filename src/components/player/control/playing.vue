<script setup lang="ts">
import { PlayIcon, PauseIcon } from '@heroicons/vue/24/solid';

const { playing, togglePlaying } = defineProps<{
  playing: boolean;
  togglePlaying: () => void;
}>();
</script>

<template>
  <PlayerControlBtn @click="togglePlaying" is-big-button>
    <PauseIcon v-if="playing" />
    <PlayIcon class="play-icon" v-else />
  </PlayerControlBtn>
</template>

<style scoped lang="scss">
.play-icon {
    width: 100%;
    height: 100%;
    margin-left: 0.2rem;
}
</style>
