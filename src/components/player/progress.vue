<script setup lang="ts">
type TProgressProps = {
  progress: number;
  loaded: number;
  duration: number;
  pause: () => void;
  resume: () => void;
};
const state = defineProps<TProgressProps>();
const { progress, duration, loaded } = toRefs(state);
const currentTime = computed(() =>
  Math.max(0, Math.min(1, progress.value) * duration.value)
);

const emit = defineEmits(['update:progress']);
const progressPercent = useVModel(state, 'progress', emit);
const { progressElem, hoveredProgress, ...scrubbableData } = useScrubbable(
  progressPercent,
  state.pause,
  state.resume
);

const { isHovered, scrubbing, elementWidth } = scrubbableData;
const isActive = computed(() => isHovered.value || scrubbing.value);
</script>

<template>
  <div class="progress" :class="{ progress_hovered: isActive }">
    <div
      ref="progressElem"
      class="progress__bar-container"
      @mousedown="scrubbing = true"
    >
      <div class="progress__bar progress-bar">
        <div
          class="progress-bar__loaded"
          :style="{ transform: `scaleX(${loaded})` }"
        ></div>
        <div
          class="progress-bar__hovered"
          v-if="isActive"
          :style="{ transform: `scaleX(${hoveredProgress})` }"
        ></div>
        <div
          class="progress-bar__line"
          :style="{ transform: `scaleX(${progress})` }"
        ></div>
        <div
          class="progress-bar__point-container"
          :style="{ transform: `translateX(${progress * elementWidth}px)` }"
        >
          <div class="progress-bar__point"></div>
        </div>
      </div>
    </div>
    <div class="progress-bar__time-container">
      <div class="progress-bar__time">{{ formatVideoTime(currentTime) }}</div>
      <div class="progress-bar__time">{{ formatVideoTime(duration) }}</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$progress-bar-bg: change-color($font-color-description, $alpha: 0.12);
$progress-line-bg: change-color($font-color-description, $alpha: 0.8);
$progress-bar-height: 4px;
$progress-container-height: calc($progress-bar-height * 3);
$progress-bar-hovered-height: calc($progress-bar-height * 1.5);

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
  transition: height $animation-time ease;
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
    transition: transform $animation-time ease;
  }

  &__hovered {
    background-color: $progress-bar-bg;
  }

  &__line {
    background-color: $progress-line-bg;
  }

  &__point,
  &__point-container {
    width: $progress-container-height;
    height: $progress-container-height;
  }

  &__point-container {
    position: absolute;
    top: calc($progress-bar-hovered-height / -2);
    left: calc($progress-container-height / -2);
    will-change: translateX;
  }

  &__point {
    scale: 0;
    border-radius: 50%;
    transition: scale $animation-time ease;
    background-color: white;
    will-change: scale;
  }
}

.progress-bar__time-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 0.8rem;
}

.progress {
  position: relative;
  width: 100%;
  user-select: none;

  &_hovered {
    .progress-bar {
      height: $progress-bar-hovered-height;
    }

    .progress-bar__line {
      background-color: white;
    }

    .progress-bar__point {
      scale: 1;
    }
  }
}
</style>
