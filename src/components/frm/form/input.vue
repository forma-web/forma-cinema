<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<script setup lang="ts">
import { useField } from 'vee-validate';
import { RuleExpression } from 'vee-validate';

type TInputProps = {
  label?: string;
  name: string;
  rules?: RuleExpression<string>;
};

const { label = '', name, rules } = defineProps<TInputProps>();
const { value, errorMessage: error } = useField<string>(name, rules);
</script>

<template>
  <label class="label">
    <div class="description" v-if="label">
      {{ label }}
    </div>
    <div class="label__block">
      <input
        type="text"
        class="input"
        :class="{ input_error: error }"
        v-model="value"
        v-bind="$attrs"
      />
      <slot></slot>
    </div>
    <div class="description error" v-if="error">
      {{ error }}
    </div>
  </label>
</template>

<style scoped lang="scss">
.label {
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  row-gap: 0.8rem;
}

.label__container {
  position: relative;
  width: 100%;
}
.input {
  width: 100%;
  border-radius: var(--border-radius);
  color: var(--color-primary);
  font-size: 1.8rem;
  padding: 1em;
  background-color: transparent;
  border: var(--border-line) var(--color-input);
  transition: border-color var(--animation-duration);
  outline: none;

  &:hover {
    border-color: var(--color-secondary);
  }

  &:active,
  &:focus {
    border-color: white;
  }

  &_error {
    border-color: var(--color-error);

    &:hover,
    &:active,
    &:focus {
      border-color: var(--color-error);
    }
  }
}

.password-input {
  padding-right: 3em;
}

.description {
  font-size: 0.875em;
  line-height: 1.5;
  font-weight: 400;
  color: gray;
}

.label__block {
  width: 100%;
  position: relative;
}

.error {
  color: var(--color-error);
  margin-bottom: 0.2em;
}
</style>
