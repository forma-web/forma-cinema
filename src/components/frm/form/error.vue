<script setup lang="ts">
const { error } = defineProps<{ error: string }>();
</script>

<template>
  <div class="error" v-if="error">
    {{ error }}
  </div>
</template>

<style scoped lang="scss">
.error {
  color: $error-color;
  font-size: 1.4rem;
  margin-bottom: 0.4em;
}
</style>
