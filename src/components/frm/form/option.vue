<script setup lang="ts">
const {
  isActive,
  isDisabled = false,
  checkboxVisible = false,
  label,
  value,
} = defineProps<{
  isActive: boolean;
  isDisabled?: boolean;
  checkboxVisible?: boolean;
  label: string | number;
  value?: string | number;
}>();

const emit = defineEmits(['change']);
</script>

<template>
  <label
    class="option"
    :class="{
      option_active: isActive,
      option_disabled: isDisabled,
    }"
  >
    <button
      class="option__button"
      type="button"
      @click="emit('change', value)"
      :disabled="isDisabled"
    >
      <div class="select__text">
        {{ label }}
      </div>
      <FrmFormCheckbox :checked="isActive" v-if="checkboxVisible" />
    </button>
  </label>
</template>

<style scoped lang="scss">
.option {
  width: 100%;
  position: relative;
  text-align: left;
  font-size: 1.8rem;
  cursor: pointer;
  user-select: none;

  &__button {
    padding: 0.8em 1em;
    width: 100%;
    text-align: left;
    display: flex;
    align-items: center;
    justify-content: space-between;
    column-gap: 0.8em;
    height: var(--height-select);
    transition: scale var(--animation-duration),
      opacity var(--animation-duration);

    &:hover {
      scale: 1.01;
    }

    &:active {
      scale: 0.99;
    }

    &:disabled {
      opacity: 0.5;
      cursor: default;

      &:hover {
        background-color: transparent;
        scale: 1;
      }
    }
  }

  &_active {
    background-color: var(--color-secondary-1);
  }

  &:hover,
  &:active {
    background-color: var(--color-input);
    scale: none;
  }

  &_disabled:hover {
    background-color: transparent;
  }
}
</style>
