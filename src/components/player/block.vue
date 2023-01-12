<script setup lang="ts">
const { name, src } = defineProps<{
  name?: string;
  src: string;
}>();

useHead({
  title: name,
});

const {
  video,
  playing,
  currentTime,
  currentLoaded,
  duration,
  isFullscreen,
  togglePlaying,
  toggleFullscreen,
  rewindBack,
  rewindForward,
} = usePlayer(src);
</script>

<template>
  <div
    class="player"
    :tabindex="0"
    autofocus
    @keydown.prevent.space="togglePlaying"
    @keydown.right="rewindForward"
    @keydown.left="rewindBack"
    @keydown.f="toggleFullscreen"
    @keydown.а="toggleFullscreen"
  >
    <div class="player__video-block" @click="togglePlaying">
      <video ref="video" class="player__video"></video>
      <div class="player__background"></div>
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
        <div class="player__control player__control_center">
          <PlayerControlRewind :rewind="rewindBack" />
          <PlayerControlPlaying
            :playing="playing"
            :togglePlaying="togglePlaying"
          />
          <PlayerControlRewind :rewind="rewindForward" is-forward />
        </div>
        <div class="player__control player__control_right">
          <PlayerControlFullscreen
            :fullscreen="isFullscreen"
            :toggleFullscreen="toggleFullscreen"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$player-padding: 7rem;
$buttons-gap: 2.4rem;

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

.player__background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(80vw 80vh at center center, transparent, #000000);
  opacity: 0.6;
}

.player__bar {
  bottom: $player-padding;
  display: flex;
  flex-direction: column;
  row-gap: 2.8rem;
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
