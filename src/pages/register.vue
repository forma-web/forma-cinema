<script setup lang="ts">
import { REGISTER_VALIDATION_SCHEMES as validationSchema } from '@/constants/forms';
import { onRegister } from '@/services/forms/auth';

definePageMeta({
  layout: 'auth',
});

const { meta, onSubmit, currentStep, commonError } = useMultiForm<TRegister>(
  onRegister,
  validationSchema
);
</script>

<template>
  <form class="auth-form" @submit="onSubmit">
    <RegisterUsername v-if="currentStep === 0" />
    <RegisterAccount
      v-if="currentStep === 1"
      :error="!meta.dirty && commonError ? commonError : null"
    />
  </form>
</template>
