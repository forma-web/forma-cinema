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
  border: $border-line $input-color;
  border-radius: 0.2em;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  color: $background-color-primary;

  &_checked {
    border-color: $font-color-primary;
    background-color: $font-color-primary;
  }
}
</style>
