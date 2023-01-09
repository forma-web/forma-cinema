<template>
  <FrmHeader disabled-profile />
  <div class="wrapper">
    <div class="auth">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss">
@import '@/assets/styles/auth.scss';

.auth {
  margin: auto;
  width: 40rem;
}
</style>
