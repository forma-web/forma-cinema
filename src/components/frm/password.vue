<script setup lang="ts">
import { EyeIcon, EyeSlashIcon } from '@heroicons/vue/24/outline';

const hidePassword = ref(true);
</script>

<template>
  <FrmInput class="password-input" :type="hidePassword ? 'password' : 'text'">
    <button
      class="password-input__button"
      @click="hidePassword = !hidePassword"
    >
      <EyeIcon v-if="hidePassword" />
      <EyeSlashIcon v-else />
    </button>
  </FrmInput>
</template>

<style scoped lang="scss">
.password-input {
  padding-right: 3em;

  &__button {
    position: absolute;
    right: 1em;
    top: 50%;
    transform: translateY(-50%);
    width: 1.5em;
    height: 1.5em;
    color: $input-color;
  }
}
</style>
