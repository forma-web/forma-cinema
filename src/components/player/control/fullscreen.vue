<script setup lang="ts">
import { ArrowsPointingInIcon, ArrowsPointingOutIcon } from '@heroicons/vue/24/solid';

const { fullscreen, toggleFullscreen } = defineProps<{
  fullscreen: boolean;
  toggleFullscreen: () => void;
}>();
</script>

<template>
  <PlayerControlBtn @click="toggleFullscreen">
    <ArrowsPointingInIcon v-if="fullscreen" />
    <ArrowsPointingOutIcon v-else />
  </PlayerControlBtn>
</template>
