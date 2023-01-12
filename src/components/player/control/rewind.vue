<script setup lang="ts">
import {
  ArrowUturnLeftIcon,
  ArrowUturnRightIcon,
} from '@heroicons/vue/24/outline';
const { rewind, isForward } = defineProps<{
  rewind: () => void;
  isForward?: boolean;
}>();
</script>

<template>
  <PlayerControlBtn @click="rewind">
    <ArrowUturnRightIcon v-if="isForward" />
    <ArrowUturnLeftIcon v-else />
  </PlayerControlBtn>
</template>
