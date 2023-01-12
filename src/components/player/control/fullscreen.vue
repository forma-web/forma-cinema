<script setup lang="ts">
import {
  ArrowsPointingInIcon,
  ArrowsPointingOutIcon,
} from '@heroicons/vue/24/solid';

const { fullscreen } = defineProps<{
  fullscreen: boolean;
}>();

const emit = defineEmits(['toggleFullscreen']);
</script>

<template>
  <PlayerControlBtn @click="emit('toggleFullscreen')">
    <ArrowsPointingInIcon v-if="fullscreen" />
    <ArrowsPointingOutIcon v-else />
  </PlayerControlBtn>
</template>
