import { Ref } from 'nuxt/dist/app/compat/capi';

export const useScrubbable = (
  progress: Ref<number>,
  startScrubbing?: () => void,
  finishScrubbing?: () => void
) => {
  const progressElem = ref<HTMLElement>();
  const scrubbing = ref(false);
  const pendingValue = ref(0);

  useEventListener('mouseup', () => (scrubbing.value = false));

  const { elementX, elementWidth, isOutside } = useMouseInElement(progressElem);

  const isHovered = computed(() => !isOutside.value);
  const hoveredProgress = computed(() =>
    Math.max(0, Math.min(1, elementX.value / elementWidth.value))
  );

  watch([scrubbing], () =>
    scrubbing.value ? startScrubbing?.() : finishScrubbing?.()
  );

  watch([scrubbing, hoveredProgress], () => {
    pendingValue.value = hoveredProgress.value;
    if (scrubbing.value) progress.value = pendingValue.value;
  });

  return {
    isActive: isHovered || scrubbing,
    hoveredProgress,
    progressElem,
    scrubbing,
    elementWidth,
  };
};
