<script setup lang="ts">
const { disabledProfile = false } = defineProps<{
  disabledProfile?: boolean;
}>();
</script>

<template>
  <div class="header">
    <NuxtLink class="header__logo header__item" to="/">
      <FrmLogo />
    </NuxtLink>
    <div>
      <FrmProfile class="header__item" v-if="!disabledProfile" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.header {
  position: absolute;
  box-sizing: content-box;
  top: 0;
  left: 0;
  z-index: 2;
  width: calc(100% - 2 * $padding-wrapper);
  height: $height-header;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: $padding-wrapper;
  padding-bottom: $padding-header;
  border-bottom: $border-line $border-color;
}

.header__logo {
  width: 2.4rem;
  color: white;
  opacity: 0.8;
  transition: scale $animation-time ease;

  &:active {
    scale: $scale-down;
  }
}

.header__item {
  transition: opacity $animation-time ease;

  &:hover {
    opacity: 1;
  }
}
</style>
