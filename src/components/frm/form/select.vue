<script setup lang="ts">
import { useField } from 'vee-validate';
import { plural } from '@/utils/plural';
import { RuleExpression } from 'vee-validate';

type TSelectProps = {
  label?: string;
  name: string;
  multiselect?: boolean;
  rules?: RuleExpression<(string | number)[]>;
  initialValue?: (string | number)[];
  isAmountSelectedText?: boolean;
  max?: number;
  required?: boolean;

  options: (
    | {
        value: string | number;
        label: string | number;
      }
    | string
    | number
  )[];
  placeholder?: string;
};

const props = defineProps<TSelectProps>();

const {
  label = '',
  name,
  rules,
  multiselect = false,
  placeholder = 'Выберите значение',
  isAmountSelectedText,
  max,
  required = false,
} = props;

const { options, initialValue } = toRefs(props);

const optionList = computed(() => {
  if (options.value.length === 0) return [];

  return options.value.map((option) => {
    if (typeof option === 'string' || typeof option === 'number') {
      return {
        value: option,
        label: option,
      };
    }
    return option;
  });
});

const selectContainer = ref<HTMLElement | null>(null);
const isActive = ref(false);

onClickOutside(selectContainer, () => {
  isActive.value = false;
});

const { value, errorMessage: error } = useField<(string | number)[]>(
  name,
  rules,
  {
    initialValue: initialValue?.value ?? [],
  }
);

const maxReached = computed(
  () => max !== undefined && max === value.value.length
);

const changeValue = (option: string | number) => {
  if (option === '') {
    value.value = [];
    return;
  }
  if (!multiselect) {
    value.value = [option];
    isActive.value = false;
    return;
  }
  if (value.value.includes(option)) {
    value.value = value.value.filter((item) => item !== option);
  } else {
    value.value.push(option);
  }
};

const selectText = computed(() => {
  if (value.value.length === 0) return placeholder;
  const selected = optionList.value
    .filter((option) => value.value.includes(option.value))
    .map((option) => option.label);
  if (!multiselect || selected.length === 1) return selected[0];
  if (isAmountSelectedText)
    return `${selected.length} ${plural(selected.length, [
      'выбран',
      'выбрано',
      'выбрано',
    ])}`;
  return selected.join(', ');
});

const isActiveOption = (option: string | number) => {
  if (!multiselect) return value.value[0] === option;
  return value.value.includes(option);
};
</script>

<template>
  <div
    class="select label"
    :class="{
      select_active: isActive,
      select_multiselect: multiselect,
      select_fill: value.length > 0,
    }"
  >
    <div class="description" v-if="label">
      {{ label }}
    </div>
    <div class="select__container">
      <button
        class="field field_select"
        :class="{ field_error: error }"
        type="button"
        @click="isActive = !isActive"
      >
        <div class="select__text">
          {{ selectText }}
        </div>
        <FrmFormChevron :isActive="isActive" />
      </button>
      <div class="select__content" ref="selectContainer" v-show="isActive">
        <div class="select__options">
          <ul class="options">
            <li
              class="options__item options__item_empty"
              v-if="!multiselect && !required"
            >
              <FrmFormOption
                value=""
                label="Не выбрано"
                :is-active="value.length === 0"
                @change="changeValue"
              />
            </li>
            <li
              class="options__item"
              :key="option.value"
              v-for="option in optionList"
            >
              <FrmFormOption
                :label="option.label"
                :value="option.value"
                :is-active="isActiveOption(option.value)"
                :checkboxVisible="multiselect"
                :is-disabled="maxReached && !isActiveOption(option.value)"
                @change="changeValue"
              />
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="description error" v-if="error && !isActive">
      {{ error }}
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/styles/_field.scss';

.select {
  &__content {
    display: flex;
    flex-direction: column;
    width: 100%;
    border: $border-line $font-color-primary;
    border-top: none;
    border-bottom-left-radius: $border-radius;
    border-bottom-right-radius: $border-radius;
  }

  &__options {
    max-height: calc($height-select * $count-options);
    overflow-x: hidden;
    overflow-y: auto;
  }

  &_active {
    .field_select {
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
      border-color: $font-color-primary;
    }
  }

  &__text {
    flex: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &_fill {
    .field_select {
      color: $font-color-primary;
    }
  }
}

.options {
  display: flex;
  flex-direction: column;
  width: 100%;

  &__item {
    width: 100%;
    position: relative;
    display: inline-flex;
    border-bottom: $border-line $input-color;

    &_empty .option {
      opacity: 0.36;
    }

    &:last-child {
      border-bottom: none;
    }
  }
}
</style>
