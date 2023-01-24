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
  border-radius: var(--border-radius);
  color: var(--color-primary);
  font-size: 1.8rem;
  padding: 1em 2em;

  &_primary {
    background-color: var(--color-primary);
    color: var(--background-color-main);
  }

  &_secondary {
    color: var(--color-secondary);
    border: var(--border-line) var(--color-border);
  }
}
</style>
