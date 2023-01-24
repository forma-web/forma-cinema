<script setup lang="ts">
import { useImage } from '@vueuse/core';

type TPreview = {
  poster?: string;
};

const { poster } = defineProps<TPreview>();

const { isLoading } = useImage({ src: poster ?? '' });
</script>

<template>
  <div class="preview">
    <div class="preview__content">
      <div class="background-container">
        <Transition>
          <img class="background" v-show="!isLoading" :src="poster" />
        </Transition>
      </div>
      <div class="icons">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.preview {
  width: 100%;
  overflow: hidden;
  background-color: var(--background-color-preview);
  position: relative;

  &::before {
    content: '';
    display: block;
    padding-top: 56.25%;
  }

  &__content {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}

.background-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}
.icons {
  position: relative;
  width: 100%;
  padding: 1em;
  display: flex;
  align-items: center;
  row-gap: 0.375em;
  z-index: 2;
}
</style>
