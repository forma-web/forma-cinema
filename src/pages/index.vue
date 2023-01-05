<script setup lang="ts">
import { TMovie } from '@/types/collection';

const data: TMovie[] = [
  {
    id: 1,
    name: 'Ходячие мертвецы',
    isSerial: true,
    year: 2010,
    kinopoisk_rating: 8.0,
    poster:
      'https://www.soyuz.ru/public/uploads/files/2/7456048/202102021713434bf4c8a1a0.jpg',
    genres: ['Драма', 'Ужасы', 'Боевик'],
    country: 'США',
    age_restriction: 18,
    logline:
      'Жизнь в постапокалиптическом мире, где люди превратились в зомби.',
  },
  {
    id: 2,
    name: 'Мстители: Финал',
    isSerial: false,
    year: 2019,
    kinopoisk_rating: 7.8,
    poster:
      'https://www.film.ru/sites/default/files/filefield_paths/avengersendgame.jpg',
    genres: ['Фантастика', 'Боевик', 'Приключения'],
  },
  {
    id: 3,
    name: 'Пятьдесят оттенков серого',
    isSerial: false,
    year: 2015,
    kinopoisk_rating: 4.4,
    poster: 'https://www.kino-teatr.ru/news/5489/58742.jpg',
    genres: ['Драма', 'Мелодрама', 'Романтика'],
  },
  {
    id: 4,
    name: 'Титаник',
    isSerial: false,
    year: 1997,
    kinopoisk_rating: 8.4,
    poster:
      'https://avatars.mds.yandex.net/get-kinopoisk-post-img/1374145/6aae47e9a525adfb3c9c433be10e62df/960x540',
    genres: ['Мелодрама', 'История'],
  },
  {
    id: 5,
    name: 'Джентльмены',
    isSerial: false,
    year: 2019,
    kinopoisk_rating: 8.5,
    poster:
      'https://avatars.mds.yandex.net/get-ott/1648503/2a000001711b57abb795e9276957168f83e9/1344x756',
    genres: ['Криминал', 'Комедия', 'Боевик'],
  },
  {
    id: 6,
    name: 'Майор Гром: Чумной Доктор',
    isSerial: false,
    year: 2021,
    kinopoisk_rating: 7.2,
    poster:
      'https://avatars.mds.yandex.net/get-ott/200035/2a000001793c63def1ed1c92bd8538a1f715/678x380',
    genres: ['Комедия', 'Боевик'],
  },
  {
    id: 7,
    name: 'Джентльмены 1',
    isSerial: false,
    year: 2019,
    kinopoisk_rating: 8.5,
    poster:
      'https://avatars.mds.yandex.net/get-ott/1648503/2a000001711b57abb795e9276957168f83e9/1344x756',
    genres: ['Криминал', 'Комедия', 'Боевик'],
  },
  {
    id: 8,
    name: 'Джентльмены 2',
    isSerial: false,
    year: 2019,
    kinopoisk_rating: 8.5,
    poster:
      'https://avatars.mds.yandex.net/get-ott/1648503/2a000001711b57abb795e9276957168f83e9/1344x756',
    genres: ['Криминал', 'Комедия', 'Боевик'],
  },
  {
    id: 9,
    name: 'Джентльмены 3',
    isSerial: false,
    year: 2019,
    kinopoisk_rating: 8.5,
    poster:
      'https://avatars.mds.yandex.net/get-ott/1648503/2a000001711b57abb795e9276957168f83e9/1344x756',
    genres: ['Криминал', 'Комедия', 'Боевик'],
  },
  {
    id: 10,
    name: 'Джентльмены 4',
    isSerial: false,
    year: 2019,
    kinopoisk_rating: 8.5,
    poster:
      'https://avatars.mds.yandex.net/get-ott/1648503/2a000001711b57abb795e9276957168f83e9/1344x756',
    genres: ['Криминал', 'Комедия', 'Боевик'],
  },
];
</script>

<template>
  <CollectionBlock title="Популярное" :movies="data" one-row />
  <CollectionBlock :movies="data" />
</template>
