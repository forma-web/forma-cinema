import { STEP_REWIND, STEP_VOLUME } from '@/constants/player';
import { onKeyDown } from '@vueuse/core';

const usePlayer = (src: string) => {
  const video = ref<HTMLVideoElement | null>(null);
  const currentLoaded = ref<number>(0);

  const { isFullscreen, toggle: toggleFullscreen } = useFullscreen();
  const { idle } = useIdle(5000);

  const controls = useMediaControls(video, {
    src: {
      src,
    },
  });
  const { playing, volume, muted, buffered, currentTime, duration } = controls;

  const togglePlaying = () => {
    playing.value = !playing.value;
  };
  const toggleMute = () => {
    muted.value = !muted.value;
    if (!muted.value && volume.value == 0) {
      volume.value = 0.5;
    }
  };
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
  const volumeDown = () => {
    if (volume.value - STEP_VOLUME > 0) {
      volume.value -= STEP_VOLUME;
    } else {
      volume.value = 0;
    }
  };
  const volumeUp = () => {
    if (volume.value + STEP_VOLUME < 1) {
      volume.value += STEP_VOLUME;
    } else {
      volume.value = 1;
    }
  };

  watch(buffered, () => {
    if (buffered.value.length == 0) return;

    let nearestBufferIndex = 0;
    while (nearestBufferIndex < buffered.value.length - 1) {
      if (buffered.value[nearestBufferIndex + 1][0] > currentTime.value) {
        break;
      }
      nearestBufferIndex++;
    }
    currentLoaded.value = buffered.value[nearestBufferIndex][1];
  });

  onKeyDown(['а', 'А', 'f', 'F'], (e) => {
    e.preventDefault();
    toggleFullscreen();
  });

  onKeyDown(['ArrowLeft', 'MediaTrackPrevious'], (e) => {
    e.preventDefault();
    rewindBack();
  });

  onKeyDown(['ArrowRight', 'MediaTrackNext'], (e) => {
    e.preventDefault();
    rewindForward();
  });

  onKeyDown(['ArrowUp'], (e) => {
    e.preventDefault();
    volumeUp();
  });

  onKeyDown(['ArrowDown'], (e) => {
    e.preventDefault();
    volumeDown();
  });

  onKeyDown([' '], (e) => {
    e.preventDefault();
    togglePlaying();
  });

  onKeyDown(['m', 'M', 'ь', 'Ь'], (e) => {
    toggleMute();
  });

  return {
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
    volumeDown,
    volumeUp,
  };
};

export default usePlayer;