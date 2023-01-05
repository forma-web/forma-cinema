<template>
  <div class="wrapper">
    <slot></slot>
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  width: 100%;
  padding: $padding-wrapper * 1.2 0 $padding-wrapper * 1.6;
  display: flex;
  flex-direction: column;
  row-gap: $padding-wrapper * 1.12;
}
</style>
