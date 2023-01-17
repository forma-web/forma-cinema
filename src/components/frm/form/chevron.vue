<script setup lang="ts">
import { ChevronDownIcon } from '@heroicons/vue/24/outline';

const { isActive } = defineProps<{ isActive: boolean }>();
</script>

<template>
  <ChevronDownIcon class="chevron" :class="{ chevron_active: isActive }" />
</template>

<style scoped lang="scss">
.chevron {
  width: 1.2em;
  transition: rotate $animation-time;
  position: relative;
  top: 0.1em;

  &_active {
    rotate: 180deg;
  }
}
</style>
