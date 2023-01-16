<script setup lang="ts">
const options = ['Гарри Поттер', 'Бурунов', 'Ди Каприо'];
</script>

<template>
  <form class="movie-form">
    <div class="movie-form__mediadata mediadata">
      <FrmFormField
        name="name"
        placeholder="Укажите название"
        label="Название"
        multiline
        :maxlength="100"
      />
      <FrmFormField
        name="logline"
        placeholder="Кратко расскажите о фильме"
        label="Описание"
        multiline
        :maxlength="280"
      />
      <FrmFormSelect
        name="collection"
        label="Коллекции"
        :options="options"
        multiselect
        placeholder="Выберите колекцию"
        is-amount-selected-text
      />
    </div>
    <div class="movie-form__content"></div>
  </form>
</template>

<style scoped lang="scss">
.movie-form {
  width: 100%;
  padding: $padding-wrapper;
  align-self: center;
  justify-content: center;
  display: flex;
  column-gap: 1.6em;
}
.movie-form__mediadata {
  width: $width-column;
  display: flex;
  flex-direction: column;
  row-gap: 1em;
}

.movie-form__content {
  width: calc($width-column * 2 + 1.6rem);
}
</style>
