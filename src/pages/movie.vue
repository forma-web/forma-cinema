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
      <div class="movie__information">
        <h1 class="movie__title">Джентельмены</h1>
        <div class="movie__meta">
          <div class="movie__features"></div>
          <div class="movie__logline">
            Наркобарон хочет уйти на&nbsp;покой, но&nbsp;криминальный мир
            не&nbsp;отпускает. Успешное возвращение Гая Ричи к&nbsp;корням
          </div>
        </div>
        <div class="movie__control"></div>
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
  justify-content: flex-end;
  row-gap: 3.2rem;
  padding: $padding-wrapper;
}

.movie__content {
  position: relative;
  z-index: 2;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  column-gap: 3.2em;
}

.movie__information {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  row-gap: 3.2em;
}

.movie__title {
  font-size: 6.4rem;
  font-weight: 500;
  line-height: 1.2;
}

.movie__meta,
.movie__information {
  width: 61.7%;
}

.movie__logline {
  font-size: 2.4rem;
  font-weight: 300;
  line-height: 1.5;
}

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
  border-bottom: 1px solid change-color($font-color-description, $alpha: 0.2);
}

.detail__type {
  width: 10em;
  color: $font-color-description;
}

.detail__value {
  flex: 1;
}

.movie__trailer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 80%;
  background-color: #000;
}

.movie__trailer {
  opacity: 0.6;
  z-index: 1;
  mask-image: radial-gradient(100vw 80vh at top center, #000000, transparent);
}

.movie_background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
}

img {
  object-position: top;
  z-index: 1;
}
</style>
