<template>
  <div class="reward-mg" @click="endAnimation">
    <transition name="fade-mg">
      <picture class="fade-mg-img" v-show="beginAnimation">
        <img class="fade-mg-img" src="../../assets/PNG/mg_BG.png" type="image/png" />
      </picture>
    </transition>
    <transition name="text-mg">
      <picture class="text-mg-img" v-show="beginAnimation">
        <img class="text-mg-img" src="../../assets/PNG/mg_Correct_Text.png" type="image/png" />
      </picture>
    </transition>
  </div>
</template>

<script>
export default {
  name: "RewardMg",
  data() {
    return {
      beginAnimation: false
    };
  },
  methods: {
    endAnimation() {
      this.playAnimation(false);
      this.$emit("continue");
    },
    playAnimation(state) {
      if (state != undefined) this.beginAnimation = state;
      else this.beginAnimation = !this.beginAnimation;
    }
  }
};
</script>

<style scoped>
.reward-mg {
}

.text-mg-img {
  /* position: fixed; */
  position: absolute;
  top: calc(var(--inner-height) * (150 / 1920));
  left: 0;
  opacity: 1;

  width: 100vw;
  height: calc(var(--inner-height) * (610 / 1920));

  display: flex;

  z-index: 2000;
}

.fade-mg-img {
  /* position: fixed; */
  position: absolute;
  top: calc(var(--inner-height)*(-185/1920));
  left: 0;
  background: black;
  opacity: 0.85;

  width: 100vw;
  height: var(--inner-height);

  display: flex;

  z-index: 2000;
}

@media screen and (min-device-width: 536px) {
  .fade-mg-img {
    width: 536px;
  }

  .text-mg-img {
    width: 536px;
  }
}

/* -- fade -- */
@-webkit-keyframes fade-mg-enter {
  from {
    opacity: 0;
  }
}

@keyframes fade-mg-enter {
  from {
    opacity: 0;
  }
}

.fade-mg-enter-active {
  -webkit-animation: fade-mg-enter 0.125s both ease-in;
  animation: fade-mg-enter 0.125s both ease-in;
}

@-webkit-keyframes fade-mg-leave {
  to {
    opacity: 0;
  }
}

@keyframes fade-mg-leave {
  to {
    opacity: 0;
  }
}

.fade-mg-leave-active {
  -webkit-animation: fade-mg-leave 0.125s both ease-out;
  animation: fade-mg-leave 0.125s both ease-out;
}

/* -- text -- */
@-webkit-keyframes text-mg-enter {
  from {
    /* opacity: 0; */
    left: calc(-1 * 100% * (540 / 1080));
  }
}

@keyframes text-mg-enter {
  from {
    /* opacity: 0; */
    left: calc(-100%);
  }
}

.text-mg-enter-active {
  -webkit-animation: text-mg-enter 0.25s both ease-out;
  animation: text-mg-enter 0.255s both ease-out;
}

@-webkit-keyframes text-mg-leave {
  to {
    /* opacity: 0; */
    left: 200%;
  }
}

@keyframes text-mg-leave {
  to {
    /* opacity: 0; */
    left: 200%;
  }
}

.text-mg-leave-active {
  -webkit-animation: text-mg-leave 0.25s both ease-in;
  animation: text-mg-leave 0.25s both ease-in;
}
</style>