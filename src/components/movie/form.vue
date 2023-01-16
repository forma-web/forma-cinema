<script setup lang="ts">
import { TMovieForm } from '@/types/movie';
import countries from '@/constants/countries';
import { MOVIE_VALIDATION_SCHEMES } from '@/constants/forms';

const options = ['Гарри Поттер', 'Бурунов', 'Ди Каприо'];

const onMovieFormSubmit = (data: TMovieForm) => {
  console.log(data);
};

const { onSubmit } = useMultiForm<TMovieForm>(
  onMovieFormSubmit,
  MOVIE_VALIDATION_SCHEMES
);
</script>

<template>
  <form class="movie-form" @submit="onSubmit">
    <div class="movie-form__mediadata mediadata">
      <div class="mediadata__fieldset">
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
          name="collections"
          label="Коллекции"
          :options="options"
          multiselect
          placeholder="Выберите колекцию"
          is-amount-selected-text
        />
      </div>
      <div class="mediadata__fieldset">
        <FrmFormField name="year" placeholder="Укажите год" label="Год" />
        <FrmFormSelect
          name="genres"
          label="Жанры"
          :options="options"
          multiselect
          placeholder="Выберите жанр"
        />
        <FrmFormSelect
          name="countries"
          label="Страны"
          :options="countries"
          multiselect
          placeholder="Выберите страну"
        />
      </div>
      <div class="mediadata__fieldset">
        <FrmFormButton type="submit">Сохранить</FrmFormButton>
        <FrmFormButton is-seconadary>Отменить</FrmFormButton>
      </div>
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

.movie-form__mediadata,
.mediadata__fieldset {
  width: $width-column;
  display: flex;
  flex-direction: column;
  row-gap: 3.6em;
}

.mediadata__fieldset {
  width: 100%;
  row-gap: 1em;
}

.movie-form__content {
  width: calc($width-column * 2 + 1.6rem);
}
</style>
