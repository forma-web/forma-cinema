<template>
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
