<script setup lang="ts">
import { useForm } from 'vee-validate';

const validationSchema = [
  {
    first_name: { required: true },
  },
  {
    email: { required: true, email: true, max: 255 },
    password: { required: true, min: 8, max: 255 },
  },
];
const currentStep = ref(0);

const currentSchema = computed(() => {
  return validationSchema[currentStep.value];
});

const { meta, handleSubmit } = useForm<TRegister>({
  validationSchema: currentSchema,
  keepValuesOnUnmount: true,
});
const commonError = ref('');

definePageMeta({
  layout: 'auth',
});

const onSubmit = handleSubmit(async (values, actions) => {
  if (currentStep.value === validationSchema.length - 1) {
    console.log(values);
  } else {
    currentStep.value += 1;
  }
});
</script>

<template>
  <form class="auth-form" @submit="onSubmit">
    <template v-if="currentStep === 0">
      <h3>Как вас зовут?</h3>
      <fieldset class="auth-form__fieldset">
        <FrmFormInput placeholder="Имя" name="first_name" />
        <FrmFormInput placeholder="Фамилия" name="second_name" />
      </fieldset>
      <fieldset class="auth-form__fieldset">
        <FrmFormButton type="submit">Дальше</FrmFormButton>
        <NuxtLink to="/login"
          ><FrmFormButton is-seconadary type="button">
            Уже есть аккаунт
          </FrmFormButton>
        </NuxtLink>
      </fieldset>
    </template>
    <template v-if="currentStep === 1">
      <h3>Введите почту и пароль</h3>
      <fieldset class="auth-form__fieldset">
        <FrmFormInput placeholder="Email" name="email" />
        <FrmFormPassword placeholder="Пароль" name="password" />
      </fieldset>
      <FrmFormError :error="commonError" v-if="!meta.dirty" />
      <fieldset class="auth-form__fieldset">
        <FrmFormButton type="submit">Зарегистрироваться</FrmFormButton>
        <NuxtLink to="/login"
          ><FrmFormButton is-seconadary type="button">
            Уже есть аккаунт
          </FrmFormButton>
        </NuxtLink>
      </fieldset>
    </template>
  </form>
</template>

<style scoped lang="scss">
@import '@/assets/styles/auth.scss';
</style>
