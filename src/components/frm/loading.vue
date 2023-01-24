<template>
  <div class="lds-ring">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
</template>

<style scoped lang="scss">
.lds-ring {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
  --animation-duration: 0.8s;
}
.lds-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 64px;
  height: 64px;
  margin: 8px;
  border: 4px solid #fff;
  border-radius: 50%;
  animation: lds-ring var(--animation-duration) cubic-bezier(0.5, 0, 0.5, 1)
    infinite;
  border-color: #fff transparent transparent transparent;
}
.lds-ring div:nth-child(1) {
  animation-delay: calc(var(--animation-duration) * 3 / -8);
}
.lds-ring div:nth-child(2) {
  animation-delay: calc(var(--animation-duration) / -4);
}
.lds-ring div:nth-child(3) {
  animation-delay: calc(var(--animation-duration) / -8);
}
@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
