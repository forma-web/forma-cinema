<script setup lang="ts">
import { useScroll, useElementSize, useWindowSize } from '@vueuse/core';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/24/solid';
import { vIntersectionObserver } from '@vueuse/components';
import { ArrowUturnRightIcon } from '@heroicons/vue/24/outline';

type TCollectionProps = {
  id: number;
  title?: string;
  movieIDs: number[];
  oneRow?: boolean;
};

const root = ref<HTMLElement | null>(null);

const { width: widthWindow } = useWindowSize();
const { width } = useElementSize(root);
const { x, arrivedState } = useScroll(root, { behavior: 'smooth' });

function onIntersectionObserver([
  {
    target,
    boundingClientRect: { left, width: widthElement },
  },
]: IntersectionObserverEntry[]) {
  const isIntersecting = 0 <= left && left <= widthWindow.value - widthElement;
  target.classList.toggle('item_disabled', !isIntersecting);
}

const { id, title, movieIDs, oneRow } = defineProps<TCollectionProps>();
</script>

<template>
  <div class="block">
    <NuxtLink :to="`/selections/${id}`">
      <h3 class="title" v-if="title">{{ title }}</h3>
    </NuxtLink>
    <section class="carousel">
      <ul class="list" :class="{ 'list_one-row': oneRow }" ref="root">
        <li
          class="item"
          v-for="movieID in movieIDs"
          :key="movieID"
          v-intersection-observer="[
            onIntersectionObserver,
            { root, threshold: 1 },
          ]"
        >
          <NuxtLink :to="`/movies/${movieID}`">
            <CollectionItem :key="movieID" :movieID="movieID" />
          </NuxtLink>
        </li>
        <li class="item">
          <NuxtLink :to="`/selections/${id}`">
            <button class="list__link">
              <ArrowUturnRightIcon class="list__link-icon" />
              <span class="list__link-text">Смотреть коллекцию</span>
            </button>
          </NuxtLink>
        </li>
      </ul>

      <button
        v-if="oneRow"
        @click="x -= width"
        class="button-left button_no-scaled"
        :class="{ 'button-left_disabled': arrivedState.left }"
      >
        <ChevronLeftIcon class="icon" />
      </button>
      <button
        v-if="oneRow"
        @click="x += width"
        class="button-right button_no-scaled"
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
  padding: 0 var(--padding-wrapper);
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
  width: var(--padding-wrapper);
  height: 100%;
  transition: opacity var(--animation-duration);
  cursor: pointer;
  z-index: 2;
  display: flex;
}

.button-left {
  left: 0;
}

.button-right {
  right: 0;
}

.icon {
  width: calc(var(--padding-wrapper) / 1.2);
  margin: auto;
}

.list {
  position: relative;
  width: 100%;
  display: flex;
  padding: 0 var(--padding-wrapper);
  flex-wrap: wrap;
  column-gap: 1em;
  row-gap: 2.5em;

  &_one-row {
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    overscroll-behavior-x: contain;
    scroll-padding: 0 var(--padding-wrapper);
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
    width: var(--width-columns);
    flex-shrink: 0;
    z-index: 1;
    transition: opacity var(--animation-duration);

    &_disabled {
      opacity: var(--opacity);
    }
  }
}

.list__link {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  row-gap: 1em;
  transition: opacity var(--animation-duration);

  &-icon {
    width: 3.2em;
    height: 3.2em;
    padding: 1em;
    background-color: var(--color-secondary-2);
    color: var(--color-primary);
    border-radius: 100%;
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
    opacity: var(--opacity-secondary);
  }
}
</style>
