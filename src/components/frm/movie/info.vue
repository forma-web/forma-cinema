<script setup lang="ts">
type TMovieInfo = {
  name: string;
  details?: string | string[];
};

const { name, details } = defineProps<TMovieInfo>();
const detailsData = typeof details === 'string' ? [details] : details;
</script>

<template>
  <div class="information">
    <div class="name">
      <h4 class="name__text">
        {{ name }}
      </h4>
      <div class="features">
        <slot></slot>
      </div>
    </div>
    <div class="description" v-if="details">
      <div
        class="description__text"
        v-for="detail in detailsData"
        :key="detail"
      >
        {{ detail }}
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.information {
  display: flex;
  flex-direction: column;
  row-gap: 0.375em;
}

.description {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 0.325em;

  &__text {
    font-size: 0.875em;
    line-height: 1.5;
    font-weight: 400;
    color: $font-color-description;
  }
}

.name {
  display: flex;
  justify-content: space-between;
  column-gap: 2em;
  align-items: center;

  &__text {
    flex: 1;
  }
}

.features {
  display: flex;
  gap: 0.6rem;
}
</style>
