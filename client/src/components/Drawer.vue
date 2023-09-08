<template>
  <div ref="container" class="drawer-container">
    <div class="drawer-button">
      <button class="drawer-open-btn" @click="drawerOpen"></button>
      <button class="drawer-close-btn" @click="drawerClose"></button>
    </div>
    <!-- <div class="drawer" v-on:scroll="scrolling" @click="scrolling"> -->
    <div ref="needsScrolling" class="drawer">
      <div class="drawer-wrapper">
        <div class="drawer-header"></div>
        <div class="drawer-content">
          <div class="drawer-card">
            <div class="drawer-card-rip ornithopter-card"></div>
            <div class="drawer-card-text">
              <div class="card-title">ORNITHOPTER</div>
              <div class="card-subtext">RANDOM INVENTION PIECE</div>
            </div>
            <div class="drawer-card-count">
              <span class="card-count-prepend">x</span>
              {{getCardStackSize("0")}}
            </div>
            <button class="drawer-card-btn" @click="useSavedCard('0')"></button>
          </div>
          <div class="drawer-card">
            <div class="drawer-card-rip aerialscrew-card"></div>
            <div class="drawer-card-text">
              <div class="card-title">AERIAL SCREW</div>
              <div class="card-subtext">RANDOM INVENTION PIECE</div>
            </div>
            <div class="drawer-card-count">
              <span class="card-count-prepend">x</span>
              {{getCardStackSize("1")}}
            </div>
            <button class="drawer-card-btn" @click="useSavedCard('1')"></button>
          </div>
          <div class="drawer-card">
            <div class="drawer-card-rip roboticknight-card"></div>
            <div class="drawer-card-text">
              <div class="card-title">ROBOTIC KNIGHT</div>
              <div class="card-subtext">RANDOM INVENTION PIECE</div>
            </div>
            <div class="drawer-card-count">
              <span class="card-count-prepend">x</span>
              {{getCardStackSize("2")}}
            </div>
            <button class="drawer-card-btn" @click="useSavedCard('2')"></button>
          </div>
          <div class="drawer-card">
            <div class="drawer-card-rip printingpress-card"></div>
            <div class="drawer-card-text">
              <div class="card-title">PRINTING PRESS</div>
              <div class="card-subtext">RANDOM INVENTION PIECE</div>
            </div>
            <div class="drawer-card-count">
              <span class="card-count-prepend">x</span>
              {{getCardStackSize("3")}}
            </div>
            <button class="drawer-card-btn" @click="useSavedCard('3')"></button>
          </div>
          <div></div>
          <div class="drawer-card">
            <div class="drawer-card-rip selfpropelledcart-card"></div>
            <div class="drawer-card-text">
              <div class="card-title cart">Self-Propelled Cart</div>
              <div class="card-subtext">RANDOM INVENTION PIECE</div>
            </div>
            <div class="drawer-card-count cart">
              <span class="card-count-prepend">x</span>
              {{getCardStackSize("4")}}
            </div>
            <button class="drawer-card-btn" @click="useSavedCard('4')"></button>
          </div>
        </div>
        <!-- <div id="scrollbar" @click="mouseClickScrolling"></div> -->
        <!-- <div id="scrollbar"></div> -->
      </div>
    </div>
    <transition name="fade">
      <div class="drawer-close-background" v-if="isDrawerOpen" @click="drawerClose"></div>
    </transition>
  </div>
</template>

<script>
const bodyScrollLock = require("body-scroll-lock");
export default {
  name: "Drawer",
  props: {
    collection: {}
  },
  mounted() {
    bodyScrollLock.disableBodyScroll(this.$refs.needsScrolling);
  },
  data() {
    return {
      isDrawerOpen: false
    };
  },
  methods: {
    scrolling() {
      var documentHeight = document.body.clientHeight;
      var scrollbar = document.getElementById("scrollbar");
      var drawer = document.getElementById("drawer");
      var scrollHeight = drawer.scrollHeight;
      var scrolled = drawer.scrollTop;
      var documentHeight = window.innerHeight;
      var drawerHeight = drawer.offsetHeight;

      var scrollImageHeight = scrollbar.offsetHeight;
      // this is pretty stupid
      // scrollbar position on page =
      // offset for the header element +
      // distance scrolled /
      // (total scroll distance -
      // content div height) *
      // (content div height - scrollbar image height)
      // REASONING: the maximum you can scroll is equal to the total scroll height - div height. after that, you need to take into account the size of the image that you are using as the scrollbar to ensure it doesnt disappear off the div.
      scrollbar.style.top =
        documentHeight * 0.2 +
        (scrolled / (scrollHeight - drawerHeight)) *
          (drawerHeight - scrollImageHeight) +
        "px";
    },
    drawerOpen() {
      this.isDrawerOpen = true;
      var drawerContainer = document.querySelector(".drawer-container");

      var drawerOpenButton = document.querySelector(".drawer-open-btn");
      var drawerCloseButton = document.querySelector(".drawer-close-btn");

      drawerOpenButton.style.display = "none";
      drawerCloseButton.style.display = "inline-block";

      drawerContainer.classList.remove("open-drawer-animation");
      drawerContainer.classList.remove("close-drawer-animation");

      drawerContainer.classList.add("open-drawer-animation");
    },
    drawerClose() {
      this.isDrawerOpen = false;
      var drawerContainer = document.querySelector(".drawer-container");

      var drawerOpenButton = document.querySelector(".drawer-open-btn");
      var drawerCloseButton = document.querySelector(".drawer-close-btn");

      drawerOpenButton.style.display = "inline-block";
      drawerCloseButton.style.display = "none";

      drawerContainer.classList.remove("open-drawer-animation");
      drawerContainer.classList.remove("close-drawer-animation");

      drawerContainer.classList.add("close-drawer-animation");
    },
    async useSavedCard(index) {
      let used_card = this.collection[index].pop();
      // let response = await this.$store.dispatch(
      //   "updatePower",
      //   "USE_SAVED_CARD"
      // );
      this.drawerClose();
      this.$emit("useSavedCard", used_card);
    },
    getCardStackSize(index) {
      let card_stack = this.collection[index];

      if (!card_stack) return 0;

      return card_stack.length;
    }
  }
};
</script>

<style scoped>
.drawer-container {
  position: absolute;
  z-index: 1100;
  right: 0;
  top: 0;
  width: 100%;
}
@font-face {
  font-family: Babas-Regular;
  src: url(../assets/Bebas-Regular.otf);
}

@font-face {
  font-family: MyriadPro-Condensed;
  src: url(../assets/MYRIADPRO-COND.woff);
}

/* .container {
    position: 
} */

button:focus {
  outline: 0;
}

.drawer-close-background {
  position: absolute;
  top: 0;
  left: 0;
  height: var(--inner-height);
  background: black;
  opacity: 0.85;
  width: 100%;

  z-index: 1998;
}

/* -- fade -- */
@-webkit-keyframes fade-enter {
  from {
    opacity: 0;
  }
}

@keyframes fade-enter {
  from {
    opacity: 0;
  }
}

.fade-enter-active {
  -webkit-animation: fade-enter 0.5s both ease-in;
  animation: fade-enter 0.5s both ease-in;
}

@-webkit-keyframes fade-leave {
  to {
    opacity: 0;
  }
}

@keyframes fade-leave {
  to {
    opacity: 0;
  }
}

.fade-leave-active {
  -webkit-animation: fade-leave 0.5s both ease-out;
  animation: fade-leave 0.5s both ease-out;
}

.drawer {
  position: absolute;
  top: 0;
  right: calc(100% * (-630 / 1080));
  background: url(../assets/CardDrawer.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;

  height: calc(var(--inner-height) * ((1920 - 372) / 1920));
  width: calc(100% * (630 / 1080));

  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

  z-index: 2000;

  text-align: center;

  overflow-y: scroll;
  overflow-x: hidden;
}

.drawer-wrapper {
  height: 100%;
}

.drawer-button {
  position: relative;
  z-index: 1999;
}

.drawer-header {
  background: url(../assets/CardDrawer_Header.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;

  height: 7%;
  width: 94%;

  display: inline-block;

  margin: 5px 0;
}

/* TODO: REPLACE BACKGROUND IMAGE AND RESIZE PROPERLY */
.drawer-content {
  margin: 0 10px;

  /* height: calc(100vh * ()) */
  height: 100%;
  width: 87%;

  display: grid;
  grid-template-columns: repeat(2, 50%);
  grid-gap: 10px;
  grid-auto-rows: minmax(208px, auto);
}

.drawer-card {
  height: 100%;
  background: url(../assets/CardSlot.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;

  /* position: absolute; */
  position: relative;

  text-align: center;
}

.drawer-card-rip {
  width: 64%;
  height: calc(100% * (900 / 1920));
  max-width: 80px;
  margin: 5% auto 0 auto;
}

.drawer-card-text {
}

.card-subtext {
  font-size: 2.5vw;
  font-family: "MyriadPro-Condensed";
}

.drawer-card-count {
  font-size: 7vw;
}

.card-text.cart {
  font-size: calc(100vw * (38 / 1080));
}

.drawer-card-count.cart {
  font-size: calc(100vw * (55 / 1080));
}

.card-count-prepend {
  font-size: 4vw;
  display: inline-block;
  vertical-align: middle;
  line-height: normal;
}

@media screen and (min-device-width: 526px) {
  .card-subtext {
    font-size: calc(526px * (25 / 1080));
  }

  .drawer-card-count {
    font-size: calc(526px * (50 / 1080));
  }

  .card-count-prepend {
    font-size: calc(526px * (30 / 1080));
  }

  .drawer-content {
    width: 91%;
  }

  .card-text.cart {
    font-size: calc(526px * (38 / 1080));
  }

  .drawer-card-count.cart {
    font-size: calc(526px * (55 / 1080));
  }
}

.drawer-card-btn {
  background: url(../assets/btn_Use_Default.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;

  border-radius: 13%;
  border-width: 0;

  width: 75%;
  height: calc(100% * (175 / 1080));
}

.drawer-card-btn:active {
  background: url(../assets/btn_Use_Selected.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

.ornithopter-card {
  background: url(../assets/Card_Ornithopter.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

.aerialscrew-card {
  background: url(../assets/Card_AerialScrew.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

.roboticknight-card {
  background: url(../assets/Card_RoboticKnight.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

.printingpress-card {
  background: url(../assets/Card_PrintingPress.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

.selfpropelledcart-card {
  background: url(../assets/Card_SelfPropelledCart.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

.drawer-open-btn {
  background: url(../assets/btn_OpenCardDrawer_Default.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;

  position: absolute;
  right: 0;
  top: calc(100vh * (53 / 1920));

  height: calc(var(--inner-height) * (161 / 1920));
  width: calc(100% * (152 / 1080));

  border-radius: 13% 0 0 13%;
  border-width: 0;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.drawer-text {
  position: absolute;
  right: 0.5%;
  top: calc(100vh * (210 / 1920));

  z-index: 1001;
  font-size: 3.4vw;

  color: black;
}

@media screen and (min-device-width: 526px) {
  .drawer-text {
    position: absolute;
    right: 0.5%;
    top: calc(100vh * (210 / 1920));

    z-index: 1001;
    font-size: calc(526px * (37.5 / 1080));

    color: black;
  }
}

.drawer-open-btn:active {
  background: url(../assets/btn_OpenCardDrawer_Selected.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

.drawer-close-btn {
  background: url(../assets/btn_CloseCardDrawer_Default.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;

  position: absolute;
  right: 0;
  top: calc(100vh * (53 / 1920));

  height: calc(var(--inner-height) * (161 / 1920));
  width: calc(100% * (152 / 1080));

  display: none;

  border-radius: 13% 0 0 13%;
  border-width: 0;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.drawer-close-btn:active {
  background: url(../assets/btn_CloseCardDrawer_Selected.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

@-webkit-keyframes translate-left {
  0% {
    transform: translateX(0%) translateY(0);
  }
  100% {
    transform: translateX(-58.5%) translateY(0);
  }
}

@keyframes translate-left {
  0% {
    transform: translateX(0%) translateY(0);
  }
  100% {
    transform: translateX(-58.5%) translateY(0);
  }
}

.open-drawer-animation {
  -webkit-animation: translate-left 1s ease forwards;
  animation: translate-left 1s ease forwards;
}

@-webkit-keyframes translate-right {
  0% {
    transform: translateX(-58.5%) translateY(0);
  }
  100% {
    transform: translateX(0) translateY(0);
  }
}

@keyframes translate-right {
  0% {
    transform: translateX(-58.5%) translateY(0);
  }
  100% {
    transform: translateX(0) translateY(0);
  }
}

.close-drawer-animation {
  -webkit-animation: translate-right 1s ease forwards;
  animation: translate-right 1s ease forwards;
}

/* .drawer-close-btn:focus{outline: 0;} */

#scrollbar {
  background: url(../assets/btn_ScrollBar_Default.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  height: 5vh;
  width: 4vw;
  margin: 0;
  position: fixed;
  right: 0;
  top: 20vh;
}
</style>
