<script setup lang="ts">
const currentTime = ref<number>(0);
const duration = ref<number>(80);

const { pause, resume } = useIntervalFn(() => {
  currentTime.value += 1 / 60;
}, 1000 / 60);

watch(
  () => currentTime.value,
  (value) => {
    if (value >= duration.value) {
      pause();
    }
  }
);
</script>

<template>
  <div class="player">
    <div class="player__video-block"></div>
    <div class="player__header">
      <div class="player__title">Джентельмены</div>
      <div class="player__control player__control_right"></div>
    </div>
    <div class="player__bar">
      <PlayerProgress
        class="player__progress"
        :duration="duration"
        :progress="currentTime / duration"
        :pause="pause"
        :resume="resume"
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
</style>
