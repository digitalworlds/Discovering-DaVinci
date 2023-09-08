<template>
  <div class="modal-container">
    <transition name="fade-overlay">
      <div class="modal-overlay" v-show="beginAnimation" @click="playAnimation(false)"></div>
    </transition>
    <transition name="modal-slideUp">
      <div class="modal-wrapper" v-show="beginAnimation">
        <div class="header">DISCARD CARD</div>
        <div class="content">
          <div
            class="top-text"
          >Discarding this Trivia Card will not refund any Coins spent to draw it.</div>
          <div class="footer">
            <picture class="modal-line">
              <img class="modal-line-img" src="../../assets/Modal_Line.png" type="image/png" />
            </picture>
            <ul class="flex-container row" style="width: 50%">
              <li class="flex-item" style="width: 50%">
                <button class="yes-btn" @click="onYesClick()"></button>
              </li>
              <li class="flex-item" style="width: 50%">
                <button class="no-btn" @click="playAnimation(false)"></button>
              </li>
            </ul>
            <div class="opt-out">
              <input
                v-model="settings.modals.discardCard"
                type="checkbox"
                id="optOut"
                value="optOut"
              />
              <label for="optOut"></label>
              <div
                class="opt-out-text"
              >Don't show this notification next time I want to do this action.</div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "ModalView",
  data() {
    return {
      beginAnimation: false,
      settings: {},
      modalSetting: "discardCard"
    };
  },
  created() {
    this.$set(this, "settings", JSON.parse(JSON.stringify(this.getSettings)));
  },
  computed: {
    ...mapGetters(["getSettings"])
  },
  methods: {
    async playAnimation(state) {
      if (
        !this.beginAnimation &&
        (this.getSettings.modals[this.modalSetting] || this.getSettings.showAllModals)
      ) {
        this.$emit("continue");
      } else {
        this.$store.commit("SET_IS_WAITING_ON_API", true);

        if (state != undefined) this.beginAnimation = state;
        else this.beginAnimation = !this.beginAnimation;

        await this.updateSettings();

        this.$store.commit("SET_IS_WAITING_ON_API", false);
      }
    },
    onCheckboxClick() {
      this.$set(this.settings.modals, this.modalSetting, !this.settings.modals[this.modalSetting]);
    },
    async updateSettings() {
      if (this.beginAnimation) {
        this.$set(
          this,
          "settings",
          JSON.parse(JSON.stringify(this.getSettings))
        );
      } else {
        if (
          this.getSettings.modals[this.modalSetting] !=
          this.settings.modals[this.modalSetting]
        ) {
          let payload = [
            {
              setting: ["modals", this.modalSetting],
              value: this.settings.modals[this.modalSetting]
            }
          ];

          await this.$store.dispatch("updateSettings", payload);
        }
      }
    },
    onYesClick() {
      this.playAnimation(false)
      this.$emit('continue')
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
  height: 80%;
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

.footer {
  position: absolute;
  bottom: 6px;
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
.yes-btn {
  background: url(../../assets/btn_Yes_Default.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;

  border: none;
  display: block;
  margin: auto;

  height: calc(100vw * (95 / 1080));
  width: 100%;
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

  height: calc(100vw * (95 / 1080));
  width: 100%;
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
  font-size: calc(100vw * (32 / 1080));
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

  height: calc(100vw * (58 / 1080));
  width: calc(100vw * (58 / 1080));
}

input[type="checkbox"]:checked + label {
  display: inline-block;
  padding: 0;
  margin: 0 5px;

  background-image: url(../../assets/btn_Checkbox_Checked.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;

  height: calc(100vw * (58 / 1080));
  width: calc(100vw * (58 / 1080));
}

.modal-wrapper {
  position: relative;
  width: 93%;
  height: calc(100vw * (480 / 1080));
  background: url("../../assets/Modal_Frame_Small_001.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  margin: auto;
  right: 0;
  left: 0;
  top: calc(var(--inner-height) * (100 / 1920));
  z-index: 5000;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  background: black;
  opacity: 0.85;

  width: 100%;
  height: 100%;

  display: flex;

  z-index: 5000;
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
    height: calc(536px * (480 / 1080));
  }

    .opt-out-text {
    font-size: calc(536px * (32 / 1080));
  }

    .yes-btn {
    height: calc(536px * (95 / 1080));
  }

  .no-btn {
    height: calc(536px * (95 / 1080));
  }

    input[type="checkbox"] + label {
    height: calc(536px * (58 / 1080));
    width: calc(536px * (58 / 1080));
  }

  input[type="checkbox"]:checked + label {
    height: calc(536px * (58 / 1080));
    width: calc(536px * (58 / 1080));
  }
}
</style>