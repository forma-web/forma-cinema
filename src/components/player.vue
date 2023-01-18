<script setup lang="ts">
const {
  name,
  src = '',
  poster,
  mutedPlayer = false,
  disabledContol = false,
  coveredScreen = false,
} = defineProps<{
  name?: string;
  src?: string;
  poster?: string;
  mutedPlayer?: boolean;
  disabledContol?: boolean;
  coveredScreen?: boolean;
}>();

if (name) {
  useHead({
    title: name,
  });
}

const {
  video,
  ended,
  playing,
  volume,
  waiting,
  muted,
  isLoadingPoster,
  currentTime,
  currentLoaded,
  duration,
  isFullscreen,
  progressBarElem,
  isActiveProgressBar,
  idle,
  posterVisability,
  togglePlaying,
  restart,
  toggleMute,
  toggleFullscreen,
  rewindBack,
  rewindForward,
} = usePlayer(src, {
  isMuted: mutedPlayer,
  disableContolKey: disabledContol,
  poster,
});
</script>

<template>
  <div class="player" :tabindex="0" autofocus :class="{ plaeyr_idle: idle }">
    <div class="player__video-block" @click="togglePlaying">
      <video
        ref="video"
        class="player__video"
        :class="{ player__video_covered: coveredScreen }"
        autoplay
        :muted="mutedPlayer"
      ></video>
      <Transition name="movie">
        <div class="player__poster" v-show="posterVisability">
          <Transition>
            <img
              class="poster"
              :src="poster"
              loading="eager"
              v-show="!isLoadingPoster"
            />
          </Transition>
        </div>
      </Transition>
      <template v-if="!disabledContol">
        <Transition name="player">
          <div class="player__background" v-show="!idle"></div>
        </Transition>
        <Transition>
          <div class="player__loading" v-show="waiting && playing">
            <FrmLoading />
          </div>
        </Transition>
      </template>
    </div>
    <template v-if="!disabledContol">
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
            <div class="player__control player__control_center" v-if="ended">
              <PlayerControlRestart @restartVideo="restart" />
            </div>
            <div class="player__control player__control_center" v-else>
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
    </template>
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
}

.player__header,
.player__bar {
  position: absolute;
  left: $player-padding;
  width: calc(100% - $player-padding * 2);
}

.player__header {
  top: $player-padding;
}

.player__background,
.player__video,
.player__loading,
.player__poster {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
}

.player__poster {
  background-color: var(--background-color-main);
}

.player__video {
  object-fit: cover;
}

.poster {
  width: 100%;
  height: 100%;
  object-position: top;
  background-color: var(--background-color-main);
}

.player__background {
  background: radial-gradient(
    92vw 92vh at center center,
    transparent,
    rgba(0, 0, 0, 0.8)
  );
}

.player__loading {
  justify-content: center;
  align-items: center;
}

.player__progress {
  transition: transform var(--animation-duration) var(--animation);
  transform: translateY(6.4rem);
}

.player__controls {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-flow: column;
  opacity: 0;
  transform: translateY(120%);
  transition: opacity var(--animation-duration) var(--animation),
    transform var(--animation-duration) var(--animation);
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
  object-fit: contain;
  transition: filter var(--animation-duration) var(--animation);

  &_covered {
    object-fit: cover;
  }
}

.player__video_seeking {
  filter: blur(1rem);
}

.plaeyr_idle {
  cursor: none;
}

.player__bar {
  bottom: $player-padding;
  display: flex;
  flex-direction: column;
  row-gap: 2.8rem;

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
