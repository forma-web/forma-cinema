<script setup lang="ts">
const data = [
  {
    title: 'Ходячие мертвецы',
    isSerial: true,
    year: 2010,
    rating: 8.0,
    poster:
      'https://www.soyuz.ru/public/uploads/files/2/7456048/202102021713434bf4c8a1a0.jpg',
    genres: ['Драма', 'Ужасы', 'Боевик'],
  },
  {
    title: 'Мстители: Финал',
    isSerial: false,
    year: 2019,
    rating: 7.8,
    poster:
      'https://www.film.ru/sites/default/files/filefield_paths/avengersendgame.jpg',
    genres: ['Фантастика', 'Боевик', 'Приключения'],
  },
  {
    title: 'Пятьдесят оттенков серого',
    isSerial: false,
    year: 2015,
    rating: 4.4,
    poster: 'https://www.kino-teatr.ru/news/5489/58742.jpg',
    genres: ['Драма', 'Мелодрама', 'Романтика'],
  },
  {
    title: 'Титаник',
    isSerial: false,
    year: 1997,
    rating: 8.4,
    poster:
      'https://avatars.mds.yandex.net/get-kinopoisk-post-img/1374145/6aae47e9a525adfb3c9c433be10e62df/960x540',
    genres: ['Мелодрама', 'История'],
  },
  {
    title: 'Джентльмены',
    isSerial: false,
    year: 2019,
    rating: 8.5,
    poster:
      'https://avatars.mds.yandex.net/get-ott/1648503/2a000001711b57abb795e9276957168f83e9/1344x756',
    genres: ['Криминал', 'Комедия', 'Боевик'],
  },
  {
    title: 'Майор Гром: Чумной Доктор',
    isSerial: false,
    year: 2021,
    rating: 7.2,
    poster:
      'https://avatars.mds.yandex.net/get-ott/200035/2a000001793c63def1ed1c92bd8538a1f715/678x380',
    genres: ['Комедия', 'Боевик'],
  },
];
</script>

<template>
  <div>
    <CollectionBlock title="Popular" :movies="data" />
  </div>
</template>
