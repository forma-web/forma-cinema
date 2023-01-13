<script setup lang="ts">
import { getMoviesById } from '@/services/api/movies';
import { TMovie } from '@/types/movie';
import { Ref } from 'nuxt/dist/app/compat/capi';
import { TDetail } from '@/types/details';
import { DETAILS_DATA } from '@/constants/details';
import { useImage } from '@vueuse/core';

const video = ref<HTMLVideoElement | null>(null);
const posterVisible = ref(true);

const movie = ref<TMovie>();
const details = ref<TDetail[]>([]);

const onStartTrailer = () => {
  if (video.value) {
    posterVisible.value = false;
    video.value.play();
  }
};

const onEndTrailer = () => {
  if (video.value) {
    posterVisible.value = true;
    video.value.pause();
  }
};

const route = useRoute();

onBeforeMount(async () => {
  const response = await getMoviesById(route.params.id as string);
  if (response && response.data?.value) {
    movie.value = response.data.value;
    details.value = DETAILS_DATA.filter((detail) =>
      (movie as Ref<TMovie>).value.hasOwnProperty(detail.type)
    ).map(({ type, label, convert }) => {
      const movieValue = (movie as Ref<TMovie>).value[type as keyof TMovie];
      const value =
        convert && movieValue ? convert(movieValue) : String(movieValue);
      return {
        type,
        label,
        value,
      };
    });
  } else {
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
      <MovieDetails :details="details" />
    </div>
    <div class="movie__trailer" v-if="movie">
      <video
        ref="video"
        @canplaythrough="onStartTrailer"
        @ended="onEndTrailer"
        class="trailer"
        loading="lazy"
        :src="movie.trailer"
        muted
      ></video>
      <Transition name="movie">
        <img
          class="poster"
          :src="movie.poster"
          v-show="posterVisible"
          loading="eager"
        />
      </Transition>
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

.movie__trailer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(255, 255, 255);
  opacity: 1;
  /* mask-image: radial-gradient(100vw 92vh at top center, black, transparent); */
}

.movie__background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: change-color($background-color-primary, $alpha: 0.88);
  mask-image: radial-gradient(100vw 88vh at top center, transparent, black);
  backdrop-filter: blur(1.2rem);
}

.trailer,
.poster {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.trailer {
  object-fit: cover;
}

.poster {
  object-position: top;
  background-color: $background-color-primary;
}

.poster {
  background-color: $background-color-primary;
}
</style>
