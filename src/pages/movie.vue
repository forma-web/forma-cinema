<script setup lang="ts">
import { TMovie } from '../types/movie';

const movie: TMovie = {
  id: 1,
  name: 'Джентельмены',
  isSerial: false,
  logline:
    'Наркобарон хочет уйти на&nbsp;покой, но&nbsp;криминальный мир не&nbsp;отпускает. Успешное возвращение Гая Ричи к&nbsp;корням',
  duration: 6180,
  genres: ['боевик', 'комедия', 'драма'],
  country: 'США',
  year: 2019,
};

type TDetail = {
  type: string;
  label: string;
  convert?: (value: any) => string;
};

const DETAILS_DATA: TDetail[] = [
  {
    type: 'duration',
    label: 'Время',
    convert: (value: number) => {
      const totalMinutes = Math.floor(value / 60);
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;
      return `${totalMinutes} мин / ${hours} ч ${minutes} мин`;
    },
  },
  {
    type: 'genres',
    label: 'Жанры',
    convert: (value: string[]) => value.join(', '),
  },
  {
    type: 'country',
    label: 'Страна',
  },
  {
    type: 'year',
    label: 'Год производства',
  },
];

const details = computed(() =>
  DETAILS_DATA.filter((detail) => movie.hasOwnProperty(detail.type)).map(
    ({ type, label, convert }) => {
      const movieValue = movie[type as keyof TMovie];
      const value =
        convert && movieValue ? convert(movieValue) : String(movieValue);
      return {
        type,
        label,
        value,
      };
    }
  )
);
</script>

<template>
  <div class="movie">
    <div class="movie__content">
      <h1 class="movie__title">Джентельмены</h1>
      <div class="movie__information">
        <div class="movie__meta">
          <div class="movie__features"></div>
          <div class="movie__logline">
            Наркобарон хочет уйти на&nbsp;покой, но&nbsp;криминальный мир
            не&nbsp;отпускает. Успешное возвращение Гая Ричи к&nbsp;корням
          </div>
        </div>
        <div class="movie__details">
          <div
            class="movie__detail detail"
            v-for="detail in details"
            :key="detail.type"
          >
            <div class="detail__type">{{ detail.label }}</div>
            <div class="detail__value">
              {{ detail.value }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="movie__control"></div>
    <div class="movie__trailer">
      <img
        src="https://avatars.mds.yandex.net/get-ott/1648503/2a000001711b57abb795e9276957168f83e9/1344x756"
      />
      <div class="movie_background"></div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.movie {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 3.2rem;
  padding: $padding-wrapper;
}

.movie__title {
  font-size: 6.4rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  line-height: 1.2;
}

.movie__title,
.movie__meta,
.movie__logline {
  width: 61.7%;
}

.movie__logline {
  font-size: 2.8rem;
  font-weight: 300;
  line-height: 1.5;
}

.movie__content {
  position: relative;
  flex: 1;
  z-index: 2;
  display: flex;
  flex-direction: column;
  row-gap: 3.2em;
}

.movie__information {
  position: relative;
  display: flex;
  justify-content: space-between;
  column-gap: 3.2em;
}

.movie__details {
  width: 30%;
  display: flex;
  flex-direction: column;
  row-gap: 0.8em;
  font-size: 1.8rem;
}

.movie__detail {
  display: flex;
  align-items: baseline;
  column-gap: 1.6em;
}

.detail__type {
  width: 10em;
  color: $font-color-description;
}

.detail__value {
  flex: 1;
}

.movie__trailer,
.movie_background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #000;
}

.movie__trailer {
  opacity: 0.5;
  z-index: 1;
}

.movie_background {
  background: radial-gradient(
    circle farthest-corner at 50% 50%,
    change-color($background-color-primary, $alpha: 0.2) 0%,
    change-color($background-color-primary, $alpha: 1) 100%
  );
  z-index: 2;
}

img {
  z-index: 1;
}
</style>
