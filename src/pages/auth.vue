<script setup lang="ts">
const isLogin = ref(true);
</script>

<template>
  <div class="auth">
    <FrmInput placeholder="Логин" error="" />
    <FrmPassword placeholder="Пароль" />
    <FrmButton @click="isLogin = !isLogin">
      {{ isLogin ? 'Создать аккаунт' : 'Уже есть аккаунт' }}
    </FrmButton>
    <FrmButton is-seconadary> Просто кнопка </FrmButton>
  </div>
</template>

<style scoped lang="scss">
.auth {
  display: flex;
  margin: auto;
  flex-direction: column;
  align-items: center;
  width: 32rem;
  row-gap: 0.8em;
}
</style>
