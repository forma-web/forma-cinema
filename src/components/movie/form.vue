<script setup lang="ts">
import { TMovieForm } from '@/types/movie';
import countries from '@/constants/countries';
import { MOVIE_VALIDATION_SCHEMES } from '@/constants/forms';
import { AGES_OPTIONS } from '@/constants/ages';
import { useSelectionStore } from '@/stores/selections';
import { useGenresStore } from '@/stores/genres';
import { TOption } from '@/types/select';

const selectionOptions = ref<TOption[]>([]);
const genreOptions = ref<TOption[]>([]);

const onMovieFormSubmit = (data: TMovieForm) => {
  console.log(data);
};

const { onSubmit } = useMultiForm<TMovieForm>(
  onMovieFormSubmit,
  MOVIE_VALIDATION_SCHEMES
);

onMounted(async () => {
  selectionOptions.value = await useSelectionStore().getOptions();
  genreOptions.value = await useGenresStore().getOptions();
});
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
          :options="selectionOptions"
          multiselect
          placeholder="Выберите колекцию"
          is-amount-selected-text
        />
      </div>
      <FrmFormDropDown title="Дополнительно">
        <div class="mediadata__fieldset">
          <FrmFormField name="year" placeholder="Укажите год" label="Год" />
          <FrmFormSelect
            name="genres"
            label="Жанры"
            :options="genreOptions"
            :max="3"
            multiselect
            placeholder="Выберите жанры (максимум 3)"
          />
          <FrmFormSelect
            name="age_restriction"
            label="Возрастое ограничение"
            :options="AGES_OPTIONS"
            :required="false"
            placeholder="Выберите возрастное ограничение"
          />
          <FrmFormSelect
            name="countries"
            label="Страны"
            :options="countries"
            :max="3"
            multiselect
            placeholder="Выберите страны (максимум 3)"
          />
        </div>
      </FrmFormDropDown>
      <div class="mediadata__fieldset">
        <FrmFormButton type="submit">Сохранить</FrmFormButton>
        <FrmFormButton is-seconadary>Отменить</FrmFormButton>
      </div>
    </div>
    <div class="movie-form__content">
      <FrmFormUpload />
    </div>
  </form>
</template>

<style scoped lang="scss">
.movie-form {
  width: 100%;
  padding: $padding-wrapper;
  align-self: center;
  justify-content: center;
  display: flex;
  column-gap: 6.4em;
}

.movie-form__mediadata,
.mediadata__fieldset {
  width: $width-column;
  display: flex;
  flex-direction: column;
  row-gap: 4em;
}

.mediadata__fieldset {
  width: 100%;
  row-gap: 1.2em;
}

.movie-form__content {
  width: calc($width-column * 2 + 1.6rem);
}
</style>
