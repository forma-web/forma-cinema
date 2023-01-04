<script setup lang="ts">
const data = [
  {
    title: 'The Walking Dead',
    isSerial: true,
    year: 2010,
    genres: ['Драма', 'Ужасы', 'Боевик'],
  },
  {
    title: 'Titanic',
    isSerial: false,
    year: 1997,
    genres: ['Мелодрама', 'История'],
  },
  {
    title: 'The Gentlemen',
    isSerial: false,
    year: 2019,
    genres: ['Криминал', 'Комедия', 'Боевик'],
  },
  {
    title: 'The Gentlemen 1',
    isSerial: false,
    year: 2019,
    genres: ['Криминал', 'Комедия', 'Боевик'],
  },
  {
    title: 'The Gentlemen 2',
    isSerial: false,
    year: 2019,
    genres: ['Криминал', 'Комедия', 'Боевик'],
  },
  {
    title: 'The Gentlemen 3',
    isSerial: false,
    year: 2019,
    genres: ['Криминал', 'Комедия', 'Боевик'],
  },
];
</script>

<template>
  <div>
    <CollectionBlock title="Popular" :movies="data" />
  </div>
</template>
