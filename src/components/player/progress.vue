<script setup lang="ts">
type TProgressProps = {
  progress: number;
  duration: number;
};
const state = defineProps<TProgressProps>();

const emit = defineEmits(['update:progress']);
const progress = useVModel(state, 'progress', emit);

const progressElem = ref<HTMLElement>();
const scrubbing = ref(false);
const pendingValue = ref(0);

useEventListener('mouseup', () => (scrubbing.value = false));

const { elementX, elementWidth, isOutside } = useMouseInElement(progressElem);

const isHovered = computed(() => !isOutside.value);
const hoveredProgress = computed(() =>
  Math.max(0, Math.min(1, elementX.value / elementWidth.value))
);

watch([scrubbing, hoveredProgress], () => {
  pendingValue.value = hoveredProgress.value;
  if (scrubbing.value) progress.value = pendingValue.value;
});
</script>

<template>
  <div class="progress" :class="{ progress_hovered: isHovered }">
    <div
      ref="progressElem"
      class="progress__bar-container"
      @mousedown="scrubbing = true"
    >
      <div class="progress__bar progress-bar">
        <div class="progress-bar__loaded"></div>
        <div
          class="progress-bar__hovered"
          v-if="isHovered"
          :style="{ transform: `scaleX(${hoveredProgress})` }"
        ></div>
        <div
          class="progress-bar__line"
          :style="{ transform: `scaleX(${progress})` }"
        ></div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$progress-bar-bg: change-color($font-color-description, $alpha: 0.24);
$progress-bar-height: 4px;
$progress-container-height: calc($progress-bar-height * 3);

.progress__bar-container {
  position: relative;
  width: 100%;
  height: $progress-container-height;
  display: flex;
  align-items: center;
}

.progress-bar {
  position: relative;
  height: $progress-bar-height;
  transition: $animation-time ease;
  width: 100%;
  background-color: $progress-bar-bg;
  will-change: height;
  cursor: pointer;

  &__loaded,
  &__line,
  &__hovered {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    will-change: width;
    transform-origin: 0 center;
  }

  &__loaded {
    background-color: $progress-bar-bg;
  }

  &__hovered {
    background-color: $progress-bar-bg;
  }

  &__line {
    background-color: white;

    /* &::before {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      width: $progress-container-height;
      height: $progress-container-height;
      background-color: white;
      border-radius: 50%;
      transition: $animation-time ease;
      will-change: transform;
    } */
  }
}

.progress {
  position: relative;
  width: 100%;

  &_hovered {
    .progress-bar {
      height: calc($progress-bar-height * 1.5);
    }
  }
}
</style>
