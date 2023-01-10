<script setup lang="ts">
const contolVisible = ref(false);
const contolElement = ref(null);

onClickOutside(contolElement, () => (contolVisible.value = false));
</script>

<template>
  <div class="profile">
    <FrmProfileIcon @click="contolVisible = true" />
    <Transition name="opacity">
      <FrmProfileControl v-if="contolVisible" ref="contolElement" />
    </Transition>
  </div>
</template>

<style scoped lang="scss">
.profile {
  position: relative;
}
</style>
