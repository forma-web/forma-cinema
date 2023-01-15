<script setup lang="ts">
import {
  ArrowUturnLeftIcon,
  ArrowUturnRightIcon,
} from '@heroicons/vue/24/outline';
const { isForward } = defineProps<{
  isForward?: boolean;
}>();

const emit = defineEmits(['rewind']);
</script>

<template>
  <PlayerControlBtn @click="emit('rewind')">
    <ArrowUturnRightIcon v-if="isForward" />
    <ArrowUturnLeftIcon v-else />
  </PlayerControlBtn>
</template>
