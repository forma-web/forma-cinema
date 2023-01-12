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
  volume,
  muted,
  currentTime,
  currentLoaded,
  duration,
  isFullscreen,
  idle,
  togglePlaying,
  toggleMute,
  toggleFullscreen,
  rewindBack,
  rewindForward,
} = usePlayer(src);

const progressBarElem = ref<HTMLElement | null>(null);
const isActiveProgressBar = useElementHover(progressBarElem);
</script>

<template>
  <div class="player" :tabindex="0" autofocus :class="{ plaeyr_idle: idle }">
    <div class="player__video-block" @click="togglePlaying">
      <video ref="video" class="player__video"></video>
      <Transition name="player">
        <div class="player__background" v-show="!idle"></div>
      </Transition>
    </div>
    <Transition name="player">
      <div class="player__header" v-show="!idle">
        <div class="player__title">{{ name }}</div>
        <div class="player__control player__control_right"></div>
      </div>
    </Transition>
    <Transition name="player">
      <div
        class="player__bar"
        :class="{ player__bar_active: isActiveProgressBar }"
        ref="progressBarElem"
        v-show="!idle"
      >
        <!-- <div class="player__setting setting"></div> -->
        <PlayerProgress
          class="player__progress"
          :duration="duration"
          :progress="currentTime / duration"
          :loaded="currentLoaded / duration"
          @update:progress="(value: number) => (currentTime = value * duration)"
        />
        <div class="player__controls">
          <div class="player__control player__control_left">
            <PlayerVolume
              :volume="volume"
              :muted="muted"
              @update:volume="(value: number) => (volume = value)"
              @toggleMute="toggleMute"
            />
          </div>
          <div class="player__control player__control_center">
            <PlayerControlRewind @rewind="rewindBack" />
            <PlayerControlPlaying
              :playing="playing"
              @togglePlaying="togglePlaying"
            />
            <PlayerControlRewind @rewind="rewindForward" is-forward />
          </div>
          <div class="player__control player__control_right">
            <PlayerControlFullscreen
              :fullscreen="isFullscreen"
              @toggleFullscreen="toggleFullscreen"
            />
          </div>
        </div>
      </div>
    </Transition>
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
  z-index: 2;
}

.player__header {
  top: $player-padding;
  left: $player-padding;
  width: calc(100% - $player-padding * 2);
}

.player__background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(80vw 80vh at center center, transparent, #000000);
}

.player__progress {
  transition: transform $animation-time $animation;
  transform: translateY(6.4rem);
}

.player__controls {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-flow: column;
  opacity: 0;
  transform: translateY(120%);
  transition: opacity $animation-time $animation,
    transform $animation-time $animation;
}

.player__control {
  display: flex;
  align-self: center;
  align-items: center;
  column-gap: $buttons-gap;
  height: 100%;
  position: relative;
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

.plaeyr_idle {
  cursor: none;
}

.player__bar {
  bottom: 0;
  display: flex;
  flex-direction: column;
  row-gap: 2.8rem;
  width: 100%;
  padding: $player-padding;

  &_active {
    .player__controls {
      transform: translateY(0);
      opacity: 1;
    }

    .player__progress {
      transform: translateY(0);
    }
  }
}

/* .player__setting {
  align-self: flex-end;
  width: 30%;
  height: 300px;
  background-color: white;
} */
</style>
