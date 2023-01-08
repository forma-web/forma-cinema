<script setup lang="ts">
import { useForm } from 'vee-validate';

const config = useRuntimeConfig();
const { meta, handleSubmit } = useForm<TLogin>();
const commonError = ref('');

definePageMeta({
  layout: 'auth',
});

const onSubmit = handleSubmit(async (values, actions) => {
  const { data, error } = await useFetch('/auth/login', {
    method: 'POST',
    body: values,
    baseURL: config.public.apiURL,
  });

  if (data.value) {
    commonError.value = '';
    console.log(data.value);
  } else if (error.value) {
    const { message, errors } = error.value.data;
    if (errors) {
      actions.setErrors(errors);
    } else {
      commonError.value = message;
      actions.resetForm({ values });
      console.log(meta.value);
    }
  }
});
</script>

<template>
  <form class="auth-form" @submit="onSubmit">
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
    <FrmFormError :error="commonError" v-if="!meta.dirty" />
    <fieldset class="auth-form__fieldset">
      <FrmFormButton type="submit">Войти</FrmFormButton>
      <NuxtLink to="/register"
        ><FrmFormButton is-seconadary type="button">
          Уже есть аккаунт
        </FrmFormButton>
      </NuxtLink>
    </fieldset>
  </form>
</template>

<style scoped lang="scss">
@import '@/assets/styles/auth.scss';
</style>
