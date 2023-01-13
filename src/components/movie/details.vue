<script setup lang="ts">
import { TDetail } from '@/types/details';

const { details } = defineProps<{ details: TDetail[] }>();
</script>

<template>
  <div class="movie__details">
    <div
      class="movie__detail detail"
      v-if="details.length"
      v-for="detail in details"
      :key="detail.type"
    >
      <div class="detail__type">{{ detail.label }}</div>
      <div class="detail__value">
        {{ detail.value }}
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.movie__details {
  flex: 1;
  display: flex;
  flex-direction: column;
  font-size: 1.8rem;
}

.movie__detail {
  display: flex;
  align-items: baseline;
  column-gap: 1.6em;
  padding: 1.2em 0;
  border-bottom: $border-line $border-color;
}

.detail__type {
  width: 10em;
  color: $font-color-description;
}

.detail__value {
  flex: 1;
}
</style>
