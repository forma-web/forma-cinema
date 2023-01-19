<script setup lang="ts">
const { data, isLoading, isFinished } = useCollection();
</script>

<template>
  <div class="content">
    <CollectionBlock
      :title="collection.name"
      :movieIDs="collection.movieIDs"
      v-for="collection in data"
      :key="`${collection.type}-${collection.id}`"
      one-row
    />

    <div v-if="isLoading && !isFinished" class="loading">
      <FrmLoading />
    </div>
  </div>
</template>

<style scoped lang="scss">
.content {
  width: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 6rem;
}

.loading {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  padding: 6rem 0;
}
</style>
