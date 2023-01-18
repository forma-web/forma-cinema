<script setup lang="ts">
import { UserIcon } from '@heroicons/vue/24/solid';
</script>

<template>
  <button class="profile-button">
    <UserIcon class="profile-button__icon" />
  </button>
</template>

<style scoped lang="scss">
.profile-button {
  width: var(--height-header);
  height: var(--height-header);
  border-radius: 100%;
  background-color: var(--color-secondary-4);
  display: flex;
  opacity: 0.8;
  transition: opacity var(--animation-duration) ease;

  &__icon {
    width: calc(var(--height-header) / 2.56);
    margin: auto;
    color: var(--color-primary);
  }

  &:hover {
    opacity: 1;
  }
}
</style>
