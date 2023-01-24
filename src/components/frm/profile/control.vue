<script setup lang="ts">
import { useUserStore } from '@/stores/user';

const store = useUserStore();
</script>

<template>
  <div class="profile-control" v-if="store.username">
    <div class="profile-control__user">
      <div class="profile-control__username">{{ store.username }}</div>
      <div class="profile-control__email description__text">
        {{ store.data?.email }}
      </div>
    </div>
    <div class="profile-control__buttons-list">
      <button
        class="profile-control__button button_no-scaled"
        @click="store.logoutUser"
      >
        Выйти
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
$padding: 1.2em;
.profile-control {
  position: absolute;
  right: 0%;
  top: calc(100% + var(--padding-header) * 0.4);
  background-color: var(--background-secondary);
  border-radius: var(--border-radius);
  display: flex;
  flex-direction: column;
  width: 14em;
  font-size: 1.8rem;

  &__user {
    padding: calc($padding * 0.875) $padding;
    display: flex;
    flex-direction: column;
    row-gap: 0.12em;
  }

  &__email {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    width: 100%;
  }

  &__buttons-list {
    border-top: var(--border-line) var(--color-border);
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  &__button {
    text-align: left;
    padding: calc($padding * 0.75) $padding;
    font-size: 0.875em;
    opacity: 0.6;
    transition: opacity var(--animation-duration),
      scale var(--animation-duration);

    &:hover {
      opacity: 1;
    }

    &:active {
      scale: var(--scale-down);
    }
  }
}
</style>
