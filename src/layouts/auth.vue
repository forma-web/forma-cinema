<template>
  <FrmHeader disabled-profile />
  <div class="wrapper">
    <div class="auth">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
.auth {
  margin: auto;
  width: 40rem;
}
</style>
