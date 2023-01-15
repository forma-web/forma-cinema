<script setup lang="ts">
type TProgressProps = {
  progress: number;
  loaded: number;
  duration: number;
  pause?: () => void;
  resume?: () => void;
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
const isActive = computed(
  () => (isHovered.value || scrubbing.value) && duration.value > 0
);
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
      <div class="progress-bar__time">
        {{ formatVideoTime(currentTime - duration) }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/player.scss';

.progress_hovered {
  .progress-bar {
    height: $progress-bar-hovered-height;
    cursor: pointer;
    
    &__point-container {
      top: calc($progress-bar-hovered-height / -2);
    }
  }
}
</style>
