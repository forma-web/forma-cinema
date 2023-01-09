<script setup lang="ts">
import { LOGIN_VALIDATION_SCHEMES as validationSchema } from '@/constants/forms';
import { onLogin } from '@/services/forms/auth';

definePageMeta({
  layout: 'auth',
});

const { meta, onSubmit, commonError } = useMultiForm<TLogin>(
  onLogin,
  validationSchema
);
</script>

<template>
  <form class="auth-form" @submit="onSubmit">
    <h3>Вход</h3>
    <fieldset class="auth-form__fieldset">
      <FrmFormInput placeholder="Email" name="email" />
      <FrmFormPassword placeholder="Пароль" name="password" />
    </fieldset>
    <FrmFormError :error="commonError" v-if="!meta.dirty" />
    <fieldset class="auth-form__fieldset">
      <FrmFormButton type="submit">Войти</FrmFormButton>
      <NuxtLink to="/register"
        ><FrmFormButton is-seconadary type="button">
          Создать аккаунт
        </FrmFormButton>
      </NuxtLink>
    </fieldset>
  </form>
</template>
