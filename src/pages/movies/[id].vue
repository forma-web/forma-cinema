<script setup lang="ts">
import { movieById } from '@/services/api/movies';
import { TMovie } from '@/types/movie';
import { useMoviesStore } from '@/stores/movies';

const movie = ref<TMovie | null>(null);
const route = useRoute();
const moviesStore = useMoviesStore();

onBeforeMount(async () => {
  const movieData = await moviesStore.getMovieById(Number(route.params.id));
  if (movieData) {
    movie.value = movieData;
  } else {
    showError({ statusCode: 404, message: 'Movie not found' });
  }
});
</script>

<template>
  <div class="movie">
    <div class="movie__content">
      <div class="movie__information" v-if="movie">
        <h1 class="movie__title">{{ movie.name }}</h1>
        <div class="movie__meta">
          <div class="movie__features"></div>
          <div class="movie__logline" v-if="movie.logline">
            {{ movie.logline }}
          </div>
        </div>
        <div class="movie__control">
          <MoviePlaybutton />
        </div>
      </div>
      <MovieDetails :movie="movie" />
    </div>
    <div class="movie__trailer" v-if="movie">
      <Player
        :src="movie.trailer"
        :poster="movie.poster"
        muted-player
        disabled-contol
        covered-screen
      />
      <div class="movie__background"></div>
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
.movie__background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: change-color($background-color-primary, $alpha: 0.68);
  mask-image: radial-gradient(100vw 88vh at top center, transparent, black);
  backdrop-filter: blur(1.6rem);
}
</style>
