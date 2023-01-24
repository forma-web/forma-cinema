<script setup lang="ts">
import { CheckIcon } from '@heroicons/vue/20/solid';

const { checked } = defineProps<{ checked?: boolean }>();
</script>

<template>
  <div class="checkbox" :class="{ checkbox_checked: checked }">
    <CheckIcon v-if="checked" />
  </div>
</template>

<style scoped lang="scss">
.checkbox {
  width: 1.6rem;
  height: 1.6rem;
  border: var(--border-line) var(--color-input);
  border-radius: 0.2em;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  color: var(--background-color-main);

  &_checked {
    border-color: var(--color-primary);
    background-color: var(--color-primary);
  }
}
</style>
