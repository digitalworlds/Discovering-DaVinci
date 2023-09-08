<template>
  <div class="settings-modal">
    <transition name="fade-overlay">
      <div class="modal-overlay" v-show="beginAnimation" @click="playAnimation(false)"></div>
    </transition>
    <transition name="modal-slideUp">
      <div class="modal-wrapper" v-show="beginAnimation">
        <picture>
          <img
            class="logout-btn"
            src="../../assets/PNG/btn_LogOut_Default.png"
            type="image/png"
            @click="onLogoutClick"
          />
        </picture>
        <div class="settings-wrapper">
          <dl class="list-wrapper">
            <div>
              <dt>Disable Confirmation Modals</dt>
              <dd @click="onCheckboxClick('showAllModals')">
                <input v-model="settings.showAllModals" type="checkbox" id="optOut" value="optOut" />
                <label for="optOut" @click.prevent></label>
              </dd>
            </div>
          </dl>
        </div>
        <picture>
          <img
            class="close-btn"
            src="../../assets/PNG/btn_Close_Default.png"
            type="image/png"
            @click="playAnimation(false)"
          />
        </picture>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "SettingsModal",
  data() {
    return {
      beginAnimation: false,
      settings: {},
      isOpen: false,
      modalSetting: "showAllModals"
    };
  },
  computed: {
    ...mapGetters(["getSettings"])
  },
  methods: {
    ...mapActions(["logout"]),
    async playAnimation(state) {
      this.$store.commit("SET_IS_WAITING_ON_API", true);

      if (state != undefined) this.beginAnimation = state;
      else this.beginAnimation = !this.beginAnimation;

      await this.updateSettings();

      this.$store.commit("SET_IS_WAITING_ON_API", false);
    },
    async updateSettings() {
      let updatedSettings = [];

      if (!this.isOpen) {
        this.$set(this, "settings", Object.assign({}, this.getSettings));
      } else {
        if (
          this.settings[this.modalSetting] !=
          this.getSettings[this.modalSetting]
        ) {
          updatedSettings.push({
            setting: this.modalSetting,
            value: this.settings[this.modalSetting]
          });
          for (let modalSetting in this.settings.modals) {
            updatedSettings.push({
              setting: ["modals", modalSetting],
              value: this.settings[this.modalSetting]
            });
          }
        }
      }

      this.isOpen = !this.isOpen;

      if (updatedSettings.length > 0) {
        await this.$store.dispatch("updateSettings", updatedSettings);
      }
    },

    onLogoutClick() {
      this.logout();
      this.playAnimation(false);
      this.$router.push("/");
    },

    onCheckboxClick(setting) {
      this.$set(this.settings, setting, !this.settings[setting]);
    }
  }
};
</script>

<style scoped>
.logout-btn {
  position: absolute;
  right: 10px;
  top: calc(100vw * (70 / 1080));
  height: auto;
  width: auto;
  max-width: calc(100vw * (220 / 1080));
}

.logout-btn:active {
  position: absolute;
  right: 10px;
  top: calc(100vw * (70 / 1080));
  height: auto;
  width: auto;
  max-width: calc(100vw * (220 / 1080));
  filter: brightness(75%);
  -webkit-filter: brightness(75%);
}

.settings-wrapper {
  position: absolute;
  top: calc(100vw * (185 / 1080));
  bottom: calc(110vw * (140 / 1080));
  right: 0;
  left: 0;
}

/* https://www.bennadel.com/blog/3622-styling-a-movie-cast-list-using-a-definition-list-and-css-flexbox.htm */
dl.list-wrapper {
  width: 100%;
  margin: 0;
}
dl.list-wrapper div {
  /* Setup the DT (character) and DD (cast) items as a flexible layout. */
  display: flex;
  margin: calc(100vw * (30 / 1080)) calc(100vw * (60 / 1080)) 0px
    calc(100vw * (60 / 1080));
}
dl.list-wrapper dt {
  /*
        Setup the DT element as a NESTED flexible layout. This will control the
        IMPLICIT TEXT element (character) and the :after pseudo-element (dots)
        layouts.
    */
  display: flex;
  /* Setup the DT (character) element to grow and take-up space. */
  flex: 1 1 auto;
  margin: 0px 0px 0px 0px;
  font-family: "MyriadPro-Regular";
  font-size: calc(100vw * (45 / 1080));
  align-items: center;
}

dl.list-wrapper dd {
  /* Setup the DD (cast) element to shrink, allow for dots to fill space. */
  flex: 0 1 auto;
  margin: 0px 0px 0px 0px;
  font-family: "MyriadPro-Regular";
  font-size: calc(100vw * (42 / 1080));
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

.close-btn {
  position: absolute;
  right: 0;
  left: 0;
  bottom: 10px;
  margin: auto;
  height: auto;
  width: auto;
  max-width: calc(100vw * (220 / 1080));
}

.close-btn:active {
  position: absolute;
  right: 0;
  left: 0;
  bottom: 10px;
  margin: auto;
  height: auto;
  width: auto;
  max-width: calc(100vw * (220 / 1080));
  filter: brightness(75%);
  -webkit-filter: brightness(75%);
}

.modal-wrapper {
  position: absolute;
  width: 93%;
  height: 68%;
  background: url("../../assets/PNG/Modal_Frame_Settings.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  margin: auto;
  right: 0;
  left: 0;
  top: calc(100vw * (350 / 1920));
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

@media screen and (min-device-width: 536px) {
  .logout-btn {
    top: calc(536px * (70 / 1080));
    max-width: calc(536px * (220 / 1080));
  }

  .logout-btn:active {
    top: calc(536px * (70 / 1080));
    max-width: calc(536px * (220 / 1080));
  }

  .settings-wrapper {
    top: calc(536px * (185 / 1080));
    bottom: calc(536px * (140 / 1080));
  }
  dl.list-wrapper div {
    margin: calc(536px * (30 / 1080)) calc(536px * (60 / 1080)) 0px
      calc(536px * (60 / 1080));
  }
  dl.list-wrapper dt {
    font-size: calc(536px * (45 / 1080));
  }

  dl.list-wrapper dd {
    font-size: calc(536px * (42 / 1080));
  }

  input[type="checkbox"] + label {
    height: calc(536px * (58 / 1080));
    width: calc(536px * (58 / 1080));
  }

  input[type="checkbox"]:checked + label {
    height: calc(536px * (58 / 1080));
    width: calc(536px * (58 / 1080));
  }
  .close-btn {
    max-width: calc(536px * (220 / 1080));
  }

  .close-btn:active {
    max-width: calc(536px * (220 / 1080));
  }

  .modal-wrapper {
    top: calc(536px * (350 / 1920));
  }
}
</style>