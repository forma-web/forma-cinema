<script setup lang="ts">
const { isSmall = false, isSecondary = false } = defineProps<{
  isSmall?: boolean;
  isSecondary?: boolean;
}>();
</script>

<template>
  <button
    class="movie__button"
    :class="{
      movie__button_small: isSmall,
      movie__button_secondary: isSecondary,
    }"
    type="button"
  >
    <slot></slot>
  </button>
</template>

<style scoped lang="scss">
.movie__button {
  background-color: var(--color-primary);
  color: var(--background-color-main);
  padding: 1.2em 1.8em;
  border-radius: 100rem;
  display: flex;
  line-height: 1;
  font-weight: 500;
  column-gap: 1rem;
  user-select: none;

  &:hover {
    scale: var(--scale-up);
  }

  &:active {
    scale: var(--scale-down);
  }

  &_small {
    padding: 1em 1.6em 1.1em;
    font-size: 1.6rem;
  }

  &_secondary {
    font-weight: 400;
    background-color: var(--background-color-main-6);
    color: var(--color-primary);
  }
}
</style>
