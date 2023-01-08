<script setup lang="ts">
const { isSeconadary } = defineProps<{
  isSeconadary?: boolean;
}>();
</script>

<template>
  <button
    class="button"
    :class="{ button_secondary: isSeconadary, button_primary: !isSeconadary }"
  >
    <slot></slot>
  </button>
</template>

<style scoped lang="scss">
.button {
  width: 100%;
  border-radius: 0.8rem;
  color: $font-color-primary;
  font-size: 1.8rem;
  padding: 1em 2em;

  &_primary {
    background-color: $font-color-primary;
    color: $background-color-primary;
  }

  &_secondary {
    color: $font-color-description;
    border: $border-line $border-color;
  }
}
</style>
