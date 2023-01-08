<script setup lang="ts">
import { Form } from 'vee-validate';

definePageMeta({
  layout: 'auth',
});

const onSubmit = (values: any) => {
  console.log(values);
};
</script>

<template>
  <Form class="auth-form" @submit="onSubmit">
    <h3>Вход</h3>
    <fieldset class="auth-form__fieldset">
      <FrmFormInput
        placeholder="Email"
        name="email"
        :rules="{ required: true, email: true, max: 255 }"
      />
      <FrmFormPassword
        placeholder="Пароль"
        name="password"
        :rules="{ required: true, min: 8, max: 255 }"
      />
    </fieldset>
    <fieldset class="auth-form__fieldset">
      <FrmFormButton type="submit">Войти</FrmFormButton>
      <NuxtLink to="/register"
        ><FrmFormButton is-seconadary type="button">
          Уже есть аккаунт
        </FrmFormButton></NuxtLink
      >
    </fieldset>
  </Form>
</template>

<style scoped lang="scss">
@import '@/assets/styles/auth.scss';
</style>
