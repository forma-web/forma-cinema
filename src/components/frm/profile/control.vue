<template>
  <div class="profile-control">
    <div class="profile-control__user">
      <div class="profile-control__username">Павел Сенченко</div>
      <div class="profile-control__email description__text">pvs@tusur.ru</div>
    </div>
    <div class="profile-control__buttons-list">
      <button class="profile-control__button button_no-scaled">Выйти</button>
    </div>
  </div>
</template>

<style scoped lang="scss">
$padding: 1.2em;
.profile-control {
  position: absolute;
  right: 0%;
  top: calc(100% + $padding-header * 0.4);
  background-color: $background-profile;
  border-radius: $border-radius;
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

  &__buttons-list {
    border-top: $border-line $border-color;
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  &__button {
    text-align: left;
    padding: calc($padding * 0.75) $padding;
    font-size: 0.875em;
    opacity: 0.6;
    transition: opacity $animation-time, scale $animation-time;

    &:hover {
      opacity: 1;
    }

    &:active {
      scale: $scale-down;
    }
  }
}
</style>
