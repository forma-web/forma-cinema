<script setup lang="ts">
import { STEP_REWIND } from '@/constants/player';

const { name, src } = defineProps<{
  name?: string;
  src: string;
}>();

useHead({
  title: name,
});

const video = ref<HTMLVideoElement | null>(null);
const currentLoaded = ref<number>(0);

const { toggle } = useFullscreen();

const controls = useMediaControls(video, {
  src: {
    src,
  },
});
const { playing, buffered, currentTime, duration } = controls;

const changePlaying = () => (playing.value = !playing.value);
const rewindBack = () => {
  if (currentTime.value - STEP_REWIND > 0) {
    currentTime.value -= STEP_REWIND;
  } else {
    currentTime.value = 0;
  }
};
const rewindForward = () => {
  if (currentTime.value + STEP_REWIND < duration.value) {
    currentTime.value += STEP_REWIND;
  } else {
    currentTime.value = duration.value;
  }
};

watch(buffered, () => {
  if (buffered.value.length == 0) return;
  console.log(buffered.value);

  let nearestBufferIndex = 0;
  while (nearestBufferIndex < buffered.value.length - 1) {
    if (buffered.value[nearestBufferIndex + 1][0] > currentTime.value) {
      break;
    }
    nearestBufferIndex++;
  }
  currentLoaded.value = buffered.value[nearestBufferIndex][1];
});
</script>

<template>
  <div
    class="player"
    :tabindex="0"
    autofocus
    @keydown.prevent.space="changePlaying"
    @keydown.right="rewindForward"
    @keydown.left="rewindBack"
    @keydown.f="toggle"
    @keydown.а="toggle"
  >
    <div class="player__video-block" @click="changePlaying">
      <video ref="video" class="player__video"></video>
    </div>
    <div class="player__header">
      <div class="player__title">{{ name }}</div>
      <div class="player__control player__control_right"></div>
    </div>
    <div class="player__bar">
      <PlayerProgress
        class="player__progress"
        :duration="duration"
        :progress="currentTime / duration"
        :loaded="currentLoaded / duration"
        :pause="() => (playing = false)"
        :resume="() => (playing = true)"
        @update:progress="(value: number) => (currentTime = value * duration)"
      />
      <div class="player__controls">
        <div class="player__control player__control_left"></div>
        <div class="player__control player__control_center"></div>
        <div class="player__control player__control_right"></div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$player-padding: 7rem;
$buttons-gap: 1.2rem;

.player,
.player__video-block {
  width: 100%;
  height: 100%;
  background-color: black;
  position: absolute;
  overflow: hidden;
  top: 0;
  left: 0;
  z-index: 1;
}

.player__header,
.player__bar {
  position: absolute;
  left: $player-padding;
  width: calc(100% - $player-padding * 2);
  z-index: 2;
}

.player__header {
  top: $player-padding;
}

.player__bar {
  bottom: $player-padding;
}

.player__controls {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-flow: column;
}

.player__control {
  display: flex;
  align-self: center;
  align-items: center;
  column-gap: $buttons-gap;
}

.player__control_left {
  justify-content: flex-start;
}

.player__control_center {
  justify-content: center;
}

.player__control_right {
  justify-content: flex-end;
}

.player__title {
  font-size: 2.4rem;
  font-weight: 500;
}

.player__video {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
</style>
