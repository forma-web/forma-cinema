<script setup lang="ts">
import { useUserStore } from '@/stores/user';

const contolVisible = ref(false);
const contolElement = ref(null);

onClickOutside(contolElement, (event) => {
  event.stopPropagation();
  contolVisible.value = false;
});

const store = useUserStore();
onMounted(async () => await store.getUserData());
</script>

<template>
  <div class="profile">
    <FrmProfileIcon @click="contolVisible = !contolVisible" />
    <Transition>
      <FrmProfileControl v-if="contolVisible" ref="contolElement" />
    </Transition>
  </div>
</template>

<style scoped lang="scss">
.profile {
  position: relative;
}
</style>
