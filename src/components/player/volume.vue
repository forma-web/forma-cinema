<script setup lang="ts">
import { SpeakerWaveIcon, SpeakerXMarkIcon } from '@heroicons/vue/24/outline';

const state = defineProps<{
  volume: number;
  muted: boolean;
}>();
const volumeElem = ref<HTMLElement>();
const isHovered = useElementHover(volumeElem);

const { volume, muted } = toRefs(state);

const emit = defineEmits(['update:volume', 'toggleMute']);

const volumePercent = useVModel(state, 'volume', emit);
const {
  progressElem: volumeBarElem,
  hoveredProgress,
  ...scrubbableData
} = useScrubbable(volumePercent);

const { elementWidth, scrubbing } = scrubbableData;
const isActive = computed(() => isHovered.value || scrubbing.value);

const currentVolume = computed(() => {
  if (muted.value) return 0;
  return volume.value;
});
</script>

<template>
  <div class="volume" ref="volumeElem" :class="{ progress_hovered: isActive }">
    <PlayerControlBtn @click="emit('toggleMute')">
      <SpeakerXMarkIcon v-if="muted || volume === 0" />
      <FrmIconVolumeMin v-else-if="volume < 0.5" />
      <SpeakerWaveIcon v-else />
    </PlayerControlBtn>
    <div class="volume__bar" @mousedown="scrubbing = true">
      <div class="volume__bar-container progress-bar" ref="volumeBarElem">
        <div
          class="volume__bar-line progress-bar__line"
          :style="{ transform: `scaleX(${currentVolume})` }"
        ></div>
        <div
          class="volume__bar-point progress-bar__point-container"
          :style="{
            transform: `translateX(${currentVolume * elementWidth}px)`,
          }"
        >
          <div class="progress-bar__point"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/styles/player.scss';
$volume-bar-height: 10rem;

.volume {
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
  column-gap: 1.8rem;
  user-select: none;
}

.volume__bar {
  cursor: pointer;
  width: 0;
  height: 100%;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  transition: width $animation-time $animation;
}

.volume__bar-container {
  position: absolute;
  width: $volume-bar-height;
  top: 50%;
  left: calc($progress-container-height / 2);
  transform: translateY(-50%);
}

.progress_hovered {
  .volume__bar {
    width: calc($volume-bar-height + $progress-container-height);
  }
}
</style>
