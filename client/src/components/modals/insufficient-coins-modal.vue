<template>
  <div class="modal-container">
    <transition name="fade-overlay">
      <div class="modal-overlay" v-show="beginAnimation" @click="playAnimation(false)"></div>
    </transition>
    <transition name="modal-slideUp">
      <div class="modal-wrapper" v-show="beginAnimation">
        <div class="header">INSUFFICIENT COINS</div>
        <div class="content">
          <div class="top-text">You do NOT have enough Coins to perform that action.</div>
          <picture class="modal-line">
            <img class="modal-line-img" src="../../assets/Modal_Line.png" type="image/png" />
          </picture>
          <button class="continue-btn" @click="playAnimation(false)"></button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "InsufficientCoinsModal",
  data() {
    return {
      beginAnimation: false
    };
  },
  methods: {
    playAnimation(state) {
      if (state != undefined) this.beginAnimation = state;
      else this.beginAnimation = !this.beginAnimation;
    }
  }
};
</script>

<style scoped>
.header {
  position: absolute;
  top: calc(var(--inner-height) * (5 / 1920));
  left: 0;
  right: 0;
  width: 100%;

  text-align: center;
  font-family: "Babas-Regular";
  font-size: calc(var(--inner-height) * (55 / 1920));
  color: white;

  -webkit-transform: scale(1, 1.5); /* Safari and Chrome */
  -moz-transform: scale(1, 1.5); /* Firefox */
  -ms-transform: scale(1, 1.5); /* IE 9 */
  -o-transform: scale(1, 1.5); /* Opera */
  transform: scale(1, 1.5); /* W3C */
}

.content {
  height: 73%;
  width: 100%;
  display: flex;
  flex-direction: column;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: calc(var(--inner-height) * (100 / 1920));
  text-align: center;
}

.top-text {
  text-align: center;
  font-family: "Babas-Regular";
  font-size: calc(var(--inner-height) * (45 / 1920));
  color: black;
  width: 75%;
  margin: 15px auto;
}

.modal-line {
  width: 98%;
  margin: auto;
  height: 0;
  display: contents;
}

.modal-line-img {
  width: 98%;
  margin: 0 auto;
  display: block;
}

.continue-btn {
  background: url(../../assets/btn_Continue_Default.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;

  border: none;
  display: block;
  margin: auto;

  height: calc(var(--inner-height) * (100 / 1920));
  width: calc(100vw * (350 / 1080));
}

.continue-btn:active {
  background: url(../../assets/btn_Continue_Selected.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;

  outline: none;
}

.continue-btn:focus {
  outline: none;
}

.modal-wrapper {
  position: absolute;
  width: 93%;
  height: calc(100vw * (700 / 1920));
  background: url("../../assets/Modal_Frame_Small_001.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  margin: auto;
  right: 0;
  left: 0;
  top: calc(var(--inner-height) * (600 / 1920));
  z-index: 5000;
}

.modal-overlay {
  position: absolute;
  top: 0;
  left: 0;
  background: black;
  opacity: 0.85;

  width: 100%;
  height: 100%;

  display: flex;

  z-index: 1050;
}

/* -- slideUp -- */
@-webkit-keyframes modal-slideUp-enter {
  from {
    -webkit-transform: translate3d(0, 100px, 0);
    transform: translate3d(0, 100px, 0);
    opacity: 0;
  }
}

@keyframes modal-slideUp-enter {
  from {
    -webkit-transform: translate3d(0, 100px, 0);
    transform: translate3d(0, 100px, 0);
    opacity: 0;
  }
}

.modal-slideUp-enter-active {
  -webkit-animation: modal-slideUp-enter both 1s;
  animation: modal-slideUp-enter both 1s;
}

@-webkit-keyframes modal-slideUp-leave {
  to {
    -webkit-transform: translate3d(0, 100px, 0);
    transform: translate3d(0, 100px, 0);
    opacity: 0;
  }
}

@keyframes modal-slideUp-leave {
  to {
    -webkit-transform: translate3d(0, 100px, 0);
    transform: translate3d(0, 100px, 0);
    opacity: 0;
  }
}

.modal-slideUp-leave-active {
  -webkit-animation: modal-slideUp-leave 1s both;
  animation: modal-slideUp-leave 1s both;
}

/* -- fade -- */
@-webkit-keyframes fade-overlay-enter {
  from {
    opacity: 0;
  }
}

@keyframes fade-overlay-enter {
  from {
    opacity: 0;
  }
}

.fade-overlay-enter-active {
  -webkit-animation: fade-overlay-enter 0.5s both ease-in;
  animation: fade-overlay-enter 0.5s both ease-in;
}

@-webkit-keyframes fade-overlay-leave {
  to {
    opacity: 0;
  }
}

@keyframes fade-overlay-leave {
  to {
    opacity: 0;
  }
}

.fade-overlay-leave-active {
  -webkit-animation: fade-overlay-leave 0.5s both ease-out;
  animation: fade-overlay-leave 0.5s both ease-out;
}

@media screen and (min-device-width: 536px) {
  .modal-wrapper {
    height: calc(536px * (700 / 1920));
  }
  .continue-btn {
    width: calc(536px * (350 / 1080));
  }
}
</style>