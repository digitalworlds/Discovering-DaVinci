<template>
  <div class="build-overlay-container">
    <transition name="fade-overlay">
      <div v-if="show" class="build-overlay">
        <video class="build-video" :src="videoSoure" autoplay playsinline @ended="show = !show"></video>
      </div>
    </transition>
  </div>
</template>

<script>
import aerial_screw_path from "../../assets/Build_Aerial_Screw.mp4"
import cart_path from "../../assets/Build_Cart.mp4"
import knight_path from "../../assets/Build_Knight.mp4"
import ornithopter_path from "../../assets/Build_Ornithopter.mp4"
import press_path from "../../assets/Build_Printing_Press.mp4"

export default {
  name: "BuildOverlay",
  props: {
    invention: ""
  },
  data() {
    return {
      show: false,
      videoSoure: ""
    };
  },
  methods: {
    toggleBuildOverlay(inventionNumber) {
      let videoSources = [ornithopter_path, aerial_screw_path, knight_path, press_path, cart_path]
      this.videoSoure = videoSources[inventionNumber]
      this.show = true;
      this.$store.commit('SET_OBJECTIVE_CACHEFIRST', false)
    }
  }
};
</script>

<style scoped>
.build-video {
  margin: auto;

  max-width: 1080px;
  max-height: 1080px;

  height: 100%;
  width: 100%;
}

.build-overlay-container {
  position: fixed;

  top: calc((372 / 1920) * var(--inner-height));
  height: calc(var(--inner-height) * (1350 / 1920));
  left: 0;

  width: inherit;

  pointer-events: none;

  z-index: 10;
}

@media screen and (min-device-width: 536px) {
  .build-overlay-container {
    width: 536px;
    left: calc((100vw / 2) - (536px / 2)); 
  }
}

.build-overlay {
  background: black;
  opacity: 1;
  width: 100%;
  height: 100%;

  pointer-events: none;
  display: flex;

  z-index: 1050;
}

@-webkit-keyframes fade-in-overlay {
  0% {
    background: black;
    position: fixed;
    top: calc((372 / 1920) * var(--inner-height));
    height: calc(var(--inner-height) * (1350 / 1920));

    width: inherit;

    pointer-events: none;
    opacity: 0;
  }
  100% {
    background: black;
    position: fixed;
    top: calc((372 / 1920) * var(--inner-height));
    height: calc(var(--inner-height) * (1350 / 1920));

    width: inherit;

    pointer-events: none;
    opacity: 1;
  }
}
@keyframes fade-in-overlay {
  0% {
    background: black;

    position: fixed;
    top: calc((372 / 1920) * var(--inner-height));
    height: calc(var(--inner-height) * (1350 / 1920));

    width: inherit;

    pointer-events: none;
    opacity: 0;
  }
  100% {
    background: black;

    position: fixed;
    top: calc((372 / 1920) * var(--inner-height));
    height: calc(var(--inner-height) * (1350 / 1920));

    width: inherit;

    pointer-events: none;
    opacity: 1;
  }
}

.fade-overlay-enter-active {
  /* position: relative; */
  -webkit-animation: fade-in-overlay 1s ease;
  animation: fade-in-overlay 1s ease;
}

.fade-overlay-leave-active {
  /* position: relative; */
  -webkit-animation: fade-in-overlay 1s ease reverse;
  animation: fade-in-overlay 1s ease reverse;
}
</style>