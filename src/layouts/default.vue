<template>
  <div class="wrapper">
    <slot></slot>
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  width: 100%;
  min-height: 100%;
  position: relative;
  padding: $padding-wrapper 0;
  display: flex;
  flex-direction: column;
  row-gap: $padding-wrapper * 1.12;
}
</style>
