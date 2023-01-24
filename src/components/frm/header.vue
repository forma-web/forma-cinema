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
  width: calc(100% - 2 * var(--padding-wrapper));
  height: var(--height-header);
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: var(--padding-wrapper);
  padding-bottom: var(--padding-header);
  border-bottom: #{var(--border-line)} var(--color-border);
}

.header__logo {
  width: 2.4rem;
  color: white;
  opacity: 0.8;
  transition: scale var(--animation-duration) ease;

  &:active {
    scale: var(--scale-down);
  }
}

.header__item {
  transition: opacity var(--animation-duration) ease;

  &:hover {
    opacity: 1;
  }
}
</style>
