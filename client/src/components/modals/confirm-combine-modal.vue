<template>
  <div class="modal-container">
    <transition name="fade-overlay">
      <div class="modal-overlay" v-show="beginAnimation" @click="playAnimation(false)"></div>
    </transition>
    <transition name="modal-slideUp">
      <div class="modal-wrapper" v-show="beginAnimation">
        <div class="header">CONFIRM GIVE</div>
        <div class="content">
          <div class="top-text" style="margin-top: 10px">
            This will consume 1 of each associated Invention Piece and will create 1 Completed Invention.
          </div>

          <div
            class="top-text" style="margin-bottom: 10px">Each Completed Invention is 1 raffle entry towards the associated prize.</div>
          <picture class="modal-line">
            <img class="modal-line-img" src="../../assets/Modal_Line.png" type="image/png" />
          </picture>
          <ul class="flex-container row">
            <li class="flex-item">
              <button class="yes-btn"></button>
            </li>
            <li class="flex-item">
              <button class="no-btn" @click="playAnimation(false)"></button>
            </li>
          </ul>
          <div class="opt-out">
            <input type="checkbox" id="optOut" value="optOut" />
            <label for="optOut"></label>
            <div
              class="opt-out-text"
            >Don't show this notification next time I want to go this action.</div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "ModalView",
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
  font-size: calc(var(--inner-height) * (65 / 1920));
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
  margin: 5px auto;
}

.drawer-card-count {
  font-size: 7vw;
  width: fit-content;
  height: max-content;
  margin: 0 auto;
}

.flex-container {
  padding: 0;
  margin: 0;
  list-style: none;

  -ms-box-orient: horizontal;
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -moz-flex;
  display: -webkit-flex;
  display: flex;

  margin: auto;
  width: fit-content;
}

.row {
  -webkit-flex-direction: row;
  flex-direction: row;
}

.invention-piece {
  height: calc(var(--inner-height) * (100 / 1920));
  padding-right: calc(var(--inner-height) * (15 / 1920));
}

.card-count-prepend {
  padding-bottom: calc(var(--inner-height) * (10 / 1920));
  font-size: 4vw;
  display: inline-block;
  vertical-align: middle;
  line-height: normal;
}

.modal-line {
  width: 98%;
  margin: auto;
  height: 0;
  display: contents;
}

.modal-line-img {
  width: 98%;
  margin: auto;
  display: block;
}

.yes-btn {
  background: url(../../assets/btn_Yes_Default.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;

  border: none;
  display: block;
  margin: auto;

  height: calc(var(--inner-height) * (110 / 1920));
  width: calc(100vw * (250 / 1080));
  max-width: 250px;

  margin: 5px;
}

.no-btn {
  background: url(../../assets/btn_No_Default.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;

  border: none;
  display: block;
  margin: auto;

  height: calc(var(--inner-height) * (110 / 1920));
  width: calc(100vw * (250 / 1080));
  max-width: 250px;

  margin: 5px;
}

.yes-btn:active {
  background: url(../../assets/btn_Yes_Selected.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;

  outline: none;
}

.no-btn:active {
  background: url(../../assets/btn_No_Selected.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;

  outline: none;
}

button:focus {
  outline: none;
  align-content: center;
}

.opt-out {
  display: flex;
}

.opt-out-text {
  font-size: 0.7em;
  width: fit-content;
  height: 100%;
  line-height: 2;
  display: inline-block;
}

input[type="checkbox"] {
  display: none;
}

input[type="checkbox"] + label {
  display: inline-block;
  padding: 0;
  margin: 0 5px;

  background-image: url(../../assets/btn_Checkbox_Unchecked.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;

  height: 20px;
  width: 20px;
}

input[type="checkbox"]:checked + label {
  display: inline-block;
  padding: 0;
  margin: 0 5px;

  background-image: url(../../assets/btn_Checkbox_Checked.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;

  height: 20px;
  width: 20px;
}

.modal-wrapper {
  position: absolute;
  width: 93vw;
  height: calc(var(--inner-height) * (700 / 1920));
  background: url("../../assets/Modal_Frame_Large_001.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  margin: auto;
  right: 0;
  left: 0;
  top: calc(100vh * (425 / 1920));
  z-index: 1051;
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
</style>