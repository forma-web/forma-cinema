<script setup lang="ts">
import { ArrowPathIcon } from '@heroicons/vue/24/solid';

const emit = defineEmits(['restartVideo']);
</script>

<template>
  <PlayerControlBtn @click="emit('restartVideo')" is-big-button>
    <ArrowPathIcon />
  </PlayerControlBtn>
</template>
