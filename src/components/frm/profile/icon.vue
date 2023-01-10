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
  width: $height-header;
  height: $height-header;
  border-radius: 100%;
  background-color: change-color($font-color-description, $alpha: 0.4);
  display: flex;
  opacity: 0.8;
  transition: opacity $animation-time ease;

  &__icon {
    width: calc($height-header / 2.56);
    margin: auto;
    color: $font-color-primary;
  }

  &:hover {
    opacity: 1;
  }
}
</style>
