<template>
  <div class="reward-mg" @click="endAnimation">
    <transition name="fade-mg">
      <picture class="fade-mg-img" v-show="beginAnimation">
        <img class="fade-mg-img" src="../../assets/PNG/mg_BG.png" type="image/png" />
      </picture>
    </transition>
    <transition name="text-mg">
      <picture class="text-mg-img" v-show="beginAnimation">
        <img class="text-mg-img" src="../../assets/PNG/mg_Claimed_Text.png" type="image/png" />
      </picture>
    </transition>
  </div>
</template>

<script>
export default {
  name: "ClaimedMg",
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
  /* position: fixed;
  top: calc(100vw * (162 / 1080));
  left: 0;
  z-index: 4; */
}

.text-mg-img {
  /* position: fixed; */
  position: absolute;
  top: calc(var(--inner-height) * (290 / 1920));
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
  top: 0;
  left: 0;
  background: black;
  opacity: 0.85;

  width: 100vw;
  height: var(--inner-height);

  display: flex;

  z-index: 2000;
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
  -webkit-animation: fade-mg-leave 0.25s both ease-out;
  animation: fade-mg-leave 0.25s both ease-out;
}

/* -- text -- */
@-webkit-keyframes text-mg-enter {
  from {
    left: calc(-1 * 100vw * (540 / 1080));
  }
}

@keyframes text-mg-enter {
  from {
    left: calc(-1 * 100vw * (540 / 1080));
  }
}

.text-mg-enter-active {
  -webkit-animation: text-mg-enter 0.25s both ease-out;
  animation: text-mg-enter 0.255s both ease-out;
}

@-webkit-keyframes text-mg-leave {
  to {
    /* opacity: 0; */
    left: calc(2 * 100vw);
  }
}

@keyframes text-mg-leave {
  to {
    /* opacity: 0; */
    left: calc(2 * 100vw);
  }
}

.text-mg-leave-active {
  -webkit-animation: text-mg-leave 0.25s both ease-in;
  animation: text-mg-leave 0.25s both ease-in;
}

@media screen and (min-device-width: 536px) {
  .fade-mg-img {
    width: 536px;
  }

  .text-mg-img {
    width: 536px;
  }

  /* -- text -- */
  @-webkit-keyframes text-mg-enter {
    from {
      left: calc(-1 * 536px * (540 / 1080));
    }
  }

  @keyframes text-mg-enter {
    from {
      left: calc(-1 * 536px * (540 / 1080));
    }
  }

  @-webkit-keyframes text-mg-leave {
    to {
      left: calc(2 * 536px);
    }
  }

  @keyframes text-mg-leave {
    to {
      left: calc(2 * 536px);
    }
  }

  .reward-mg {
    /* top: calc(536px * (162 / 1080)); */
  }
}
</style>