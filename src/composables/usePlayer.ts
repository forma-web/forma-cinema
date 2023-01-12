import { STEP_REWIND } from '@/constants/player';

const usePlayer = (src: string) => {
  const video = ref<HTMLVideoElement | null>(null);
  const currentLoaded = ref<number>(0);

  const { isFullscreen, toggle: toggleFullscreen } = useFullscreen();

  const controls = useMediaControls(video, {
    src: {
      src,
    },
  });
  const { playing, buffered, currentTime, duration } = controls;

  const togglePlaying = () => (playing.value = !playing.value);
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

    let nearestBufferIndex = 0;
    while (nearestBufferIndex < buffered.value.length - 1) {
      if (buffered.value[nearestBufferIndex + 1][0] > currentTime.value) {
        break;
      }
      nearestBufferIndex++;
    }
    currentLoaded.value = buffered.value[nearestBufferIndex][1];
  });

  return {
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
  };
};

export default usePlayer;
