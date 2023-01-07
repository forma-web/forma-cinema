<script setup lang="ts">
const route = useRoute();
const isAuth = computed(() => route.name === 'auth');
</script>

<template>
  <FrmHeader :disabled-profile="isAuth" />
  <div class="wrapper">
    <slot></slot>
  </div>
</template>
