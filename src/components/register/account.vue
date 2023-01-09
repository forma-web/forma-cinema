<script setup lang="ts">
const { error } = defineProps<{ error: string | null }>();
</script>

<template>
  <h3>Введите почту и пароль</h3>
  <fieldset class="auth-form__fieldset">
    <FrmFormInput placeholder="Email" name="email" />
    <FrmFormPassword placeholder="Пароль" name="password" />
  </fieldset>
  <FrmFormError :error="error" v-if="error" />
  <fieldset class="auth-form__fieldset">
    <FrmFormButton type="submit">Зарегистрироваться</FrmFormButton>
    <NuxtLink to="/login"
      ><FrmFormButton is-seconadary type="button">
        Уже есть аккаунт
      </FrmFormButton>
    </NuxtLink>
  </fieldset>
</template>
