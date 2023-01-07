<script setup lang="ts">
import { TMovie } from '@/types/movie';
import { useScroll, useElementSize, useWindowSize } from '@vueuse/core';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/24/solid';
import { vIntersectionObserver } from '@vueuse/components';

const root = ref<HTMLElement | null>(null);

const { width: widthWindow } = useWindowSize();
const { width } = useElementSize(root);

function onIntersectionObserver([
  {
    target,
    boundingClientRect: { left, width: widthElement },
  },
]: IntersectionObserverEntry[]) {
  const isIntersecting = 0 <= left && left <= widthWindow.value - widthElement;
  target.classList.toggle('item_disabled', !isIntersecting);
}
const { x, arrivedState } = useScroll(root, { behavior: 'smooth' });

type TCollection = {
  title?: string;
  movies: TMovie[];
  oneRow?: boolean;
};

const { title, movies, oneRow } = defineProps<TCollection>();
</script>

<template>
  <div class="block">
    <h3 class="title" v-if="title">{{ title }}</h3>
    <section class="carousel">
      <ul class="list" :class="{ 'list_one-row': oneRow }" ref="root">
        <li
          class="item"
          v-for="movie in movies"
          v-intersection-observer="[
            onIntersectionObserver,
            { root, threshold: 1 },
          ]"
        >
          <NuxtLink to="/movie">
            <CollectionItem :key="movie.id" :movie="movie" />
          </NuxtLink>
        </li>
      </ul>

      <button
        v-if="oneRow"
        @click="x -= width"
        class="button-left"
        :class="{ 'button-left_disabled': arrivedState.left }"
      >
        <ChevronLeftIcon class="icon" />
      </button>
      <button
        v-if="oneRow"
        @click="x += width"
        class="button-right"
        :class="{ 'button-right_disabled': arrivedState.right }"
      >
        <ChevronRightIcon class="icon" />
      </button>
    </section>
  </div>
</template>

<style scoped lang="scss">
.block {
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  row-gap: 4.4rem;
  font-size: 1.8rem;
}

.title {
  width: 100%;
  padding: 0 $padding-wrapper;
}
.carousel {
  width: 100%;
  position: relative;
}

.button-left,
.button-right {
  position: absolute;
  top: 0;
  opacity: 0;
  width: $padding-wrapper;
  height: 100%;
  transition: opacity $animation-time;
  cursor: pointer;
  z-index: 2;
  display: flex;

  &:hover, &:active {
    scale: 1;
  }
}

.button-left {
  left: 0;
}

.button-right {
  right: 0;
}

.icon {
  width: calc($padding-wrapper / 1.2);
  margin: auto;
}

.list {
  position: relative;
  width: 100%;
  display: flex;
  padding: 0 $padding-wrapper;
  flex-wrap: wrap;
  column-gap: 1em;
  row-gap: 2.5em;

  &_one-row {
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    overscroll-behavior-x: contain;
    scroll-padding: 0 $padding-wrapper;
    flex-wrap: nowrap;

    &::-webkit-scrollbar {
      display: none;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;

    .item {
      scroll-snap-align: end;
      scroll-snap-stop: normal;
    }
  }

  .item {
    position: relative;
    width: $width-collection-movie;
    flex-shrink: 0;
    z-index: 1;
    transition: opacity $animation-time;

    &_disabled {
      opacity: $opacity;
    }
  }
}

.carousel:hover {
  .button-left,
  .button-right {
    opacity: 1;

    &_disabled {
      opacity: 0;
      cursor: default;
    }
  }

  .item_disabled {
    opacity: $opacity-disabled;
  }
}
</style>
