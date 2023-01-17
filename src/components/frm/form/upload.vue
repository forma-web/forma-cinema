<script setup lang="ts">
import { ArrowUpTrayIcon } from '@heroicons/vue/24/solid';
</script>

<template>
  <div class="upload">
    <div class="upload__content">
      <ArrowUpTrayIcon class="upload__icon" />
      <div class="upload__text">
        <div class="upload__title">Выберите фильм или перетащите его сюда</div>
        <div class="upload__description description">
          Максимальный размер файла: 200 Гб
        </div>
      </div>
      <MovieButton is-small> Выбрать файл </MovieButton>
    </div>
  </div>
</template>

<style scoped lang="scss">
.upload {
  width: 100%;
  overflow: hidden;
  background-color: change-color($background-profile, $alpha: 0.6);
  border-radius: $border-radius;
  position: relative;
  transition: background-color $animation-time;

  &::before {
    content: '';
    display: block;
    padding-top: 56.25%;
  }

  &__content {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    row-gap: 2.4em;
  }

  &__icon {
    width: 3.8em;
    height: 3.8em;
    color: $font-color-primary;
  }

  &__text {
    width: 67.7%;
    display: flex;
    flex-direction: column;
    row-gap: 0.6em;
    text-align: center;
    user-select: none;
  }

  &__title {
    font-size: 1.8rem;
    font-weight: 500;
    color: $font-color-primary;
  }

  &__description {
    color: $font-color-description;
  }
}
</style>
