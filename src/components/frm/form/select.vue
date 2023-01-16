<script setup lang="ts">
import { RuleExpression, useField } from 'vee-validate';
import { plural } from '@/utils/plural';
import { ChevronDownIcon } from '@heroicons/vue/24/outline';

type TSelectProps = {
  label?: string;
  name: string;
  multiselect?: boolean;
  rules?: RuleExpression<string[]>;
  initialValue?: string[];
  isAmountSelectedText?: boolean;
  options: (
    | {
        value: string;
        label: string;
      }
    | string
  )[];
  placeholder?: string;
};

const {
  label = '',
  name,
  rules,
  options,
  multiselect = false,
  initialValue = [],
  placeholder = 'Выберите значение',
  isAmountSelectedText,
} = defineProps<TSelectProps>();

const optionList = computed(() => {
  if (options.length === 0) return [];

  return options.map((option) => {
    if (typeof option === 'string') {
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

onClickOutside(selectContainer, (event) => {
  event.stopPropagation();
  isActive.value = false;
});

const { value, errorMessage: error } = useField<string[]>(name, rules, {
  initialValue,
});

const changeValue = (option: string) => {
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
  if (!multiselect || value.value.length === 1) return value.value[0];
  if (isAmountSelectedText)
    return `${value.value.length} ${plural(value.value.length, [
      'выбран',
      'выбрано',
      'выбрано',
    ])}`;
  return value.value.join(', ');
});
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
        type="button"
        @click="isActive = !isActive"
      >
        <div class="select__text">
          {{ selectText }}
        </div>
        <ChevronDownIcon
          class="chevron"
          :class="{ chevron_active: isActive }"
        />
      </button>
      <div class="select__content" ref="selectContainer" v-if="isActive">
        <ul class="select__options options">
          <li
            class="options__item"
            :key="option.value"
            v-for="option in optionList"
          >
            <label
              class="option"
              :class="{
                option_active: value.includes(option.value),
              }"
            >
              <button
                class="option__button"
                type="button"
                @click="changeValue(option.value)"
              >
                <div class="select__text">
                  {{ option.label }}
                </div>
                <FrmFormCheckbox
                  :checked="value.includes(option.value)"
                  v-if="multiselect"
                />
              </button>
            </label>
          </li>
        </ul>
      </div>
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
    display: flex;
    flex-direction: column;
    width: 100%;
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

.options__item {
  width: 100%;
  position: relative;
  display: inline-flex;
  border-bottom: $border-line $input-color;

  &:last-child {
    border-bottom: none;
  }
}

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

    &:hover {
      scale: 1.01;
    }

    &:active {
      scale: 0.99;
    }
  }

  &_active {
    background-color: change-color($input-color, $alpha: 0.2);
  }

  &:hover,
  &:active {
    background-color: $input-color;
    scale: none;
  }
}

.chevron {
  width: 1.2em;
  transition: rotate $animation-time;
  position: relative;
  top: 0.1em;

  &_active {
    rotate: 180deg;
  }
}
</style>
