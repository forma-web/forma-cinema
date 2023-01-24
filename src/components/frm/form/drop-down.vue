<script setup lang="ts">
const { title } = defineProps<{ title: string }>();
const isActive = ref<boolean>(false);
</script>

<template>
  <div class="drop-down">
    <button
      class="drop-down__button"
      type="button"
      @click="isActive = !isActive"
    >
      <span class="drop-down__button-text">{{ title }}</span>
      <FrmFormChevron :isActive="isActive" />
    </button>
    <Transition>
      <div v-show="isActive">
        <slot></slot>
      </div>
    </Transition>
  </div>
</template>

<style scoped lang="scss">
.drop-down {
  width: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 2.2rem;

  &__button {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 1em 0;
    font-size: 1.8rem;
    border-top: var(--border-line) var(--color-border);
    color: var(--color-secondary);
    transition: color var(--animation-duration);
    cursor: pointer;

    &:hover,
    &:active {
      scale: 1;
      color: var(--color-primary);
    }
  }
}
</style>
