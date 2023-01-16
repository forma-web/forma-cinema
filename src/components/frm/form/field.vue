<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<script setup lang="ts">
import { useField } from 'vee-validate';
import { RuleExpression } from 'vee-validate';

type TfiledProps = {
  label?: string;
  name: string;
  rules?: RuleExpression<string>;
  multiline?: boolean;
};

const { label = '', name, rules, multiline } = defineProps<TfiledProps>();
const { value, errorMessage: error } = useField<string>(name, rules);

const { textarea, input } = useTextareaAutosize({
  input: multiline ? value : undefined,
});
</script>

<template>
  <label class="label">
    <div class="description" v-if="label">
      {{ label }}
    </div>
    <div class="label__block">
      <textarea
        ref="textarea"
        class="filed filed_textarea"
        :class="{ filed_error: error }"
        v-model="input"
        v-bind="$attrs"
        v-if="multiline"
      ></textarea>
      <input
        type="text"
        class="filed"
        :class="{ filed_error: error }"
        v-model="value"
        v-bind="$attrs"
        v-else
      />
      <slot></slot>
    </div>
    <div class="description error" v-if="error">
      {{ error }}
    </div>
  </label>
</template>

<style scoped lang="scss">
@import '@/assets/styles/_field.scss';
</style>
