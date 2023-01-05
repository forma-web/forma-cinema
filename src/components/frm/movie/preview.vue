<script setup lang="ts">
type TPreview = {
  poster?: string;
};

const { poster } = defineProps<TPreview>();
</script>

<template>
  <div class="preview">
    <div class="background-container">
      <img class="background" loading="lazy" v-if="poster" :src="poster" />
    </div>
    <div class="icons">
      <slot />
    </div>
  </div>
</template>

<style scoped lang="scss">
$height-preview: calc(
  (100vw - ($movies-in-collection - 1) * 1em) * 9 / ($movies-in-collection * 16)
);
.preview {
  width: 100%;
  height: $height-preview;
  overflow: hidden;
  background-color: $background-loading-preview;
  position: relative;
}
.background-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}
.background {
  width: 100%;
  height: 100%;
  object-fit: cover;
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
