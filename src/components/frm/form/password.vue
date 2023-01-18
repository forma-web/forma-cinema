<script setup lang="ts">
import { EyeIcon, EyeSlashIcon } from '@heroicons/vue/24/outline';
import { TInputProps } from '@/types/form';

const hidePassword = ref(true);
const { name } = defineProps<{ name: string }>();
</script>

<template>
  <FrmFormInput
    :name="name"
    class="password-input"
    :type="hidePassword ? 'password' : 'text'"
  >
    <button
      class="password-input__button"
      @click="hidePassword = !hidePassword"
      type="button"
    >
      <EyeIcon v-if="hidePassword" />
      <EyeSlashIcon v-else />
    </button>
  </FrmFormInput>
</template>

<style scoped lang="scss">
.password-input__button {
  position: absolute;
  right: 1em;
  top: 50%;
  transform: translateY(-50%);
  width: 1.5em;
  height: 1.5em;
  color: var(--color-input);
}
</style>
