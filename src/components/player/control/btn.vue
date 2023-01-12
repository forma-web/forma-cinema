<script setup lang="ts">
const { isBigButton } = defineProps<{
  isBigButton?: boolean;
}>();
</script>

<template>
  <button
    :tabindex="-1"
    :class="['player__button', isBigButton && 'player__button_big']"
  >
    <slot> </slot>
  </button>
</template>

<style lang="scss" scoped>
.player__button {
  position: relative;
  width: 2.8rem;
  height: 2.8rem;
  outline: none; // DELETE PLS!!!

  &:hover {
    scale: 1.1;
  }

  &:active {
    scale: 0.92;
  }
}

.player__button_big {
  width: 3.6rem;
  height: 3.6rem;
}
</style>
