<template>
  <button class="movie__button">
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
}
</style>
