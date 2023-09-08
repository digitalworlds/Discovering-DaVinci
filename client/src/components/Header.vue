<template>
  <div class="header-container">
    <img class="full-header-background" src="../assets/PNG/Header.png" type="image/png" />
    <picture>
      <source />
      <img class="header-background" src="../assets/HeaderBarBG.png" type="image/png" />
    </picture>
    <span class="username-text">{{getUser.name | capitalize}}</span>
    <video
      ref="progressbar"
      playsinline
      autoplay
      muted
      loop
      id="progressbar"
      :style="{ 'clip-path': `inset(0 ${getBarRatio}% 0 0)`, '-webkit-clip-path': `inset(0 ${getBarRatio}% 0 0)`}"
    >
      <source src="../assets/Bar_Yellow.mp4" type="video/MP4" />
    </video>
    <span class="progressbar-text">{{getUser.power | addcomma }}</span>
    <span class="title-text">{{section_title}}</span>
    <button
      class="settings-btn"
      @click="$emit('onSettingsClicked')"
    ></button>
    <!-- <button class="information-btn"></button> -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Header",
  props: {
    section_title: ""
  },
  computed: {
    ...mapGetters(["getAccessToken", "getUser"]),
    getBarRatio() {
      return -87.7 * (this.getUser.power / 15000) + 93.744;
    }
  },
  mounted() {
    this.$refs.progressbar.style["left"] = 0;
  },
  methods: {},
  filters: {
    capitalize: function(value) {
      if (!value) return "";
      value = value.toString();
      return value.toUpperCase();
    },
    addcomma: function(value) {
      if (!value) return "0 / 15,000";
      value = value.toString();
      if (value.length > 3)
        return (
          value.slice(0, value.length - 3) +
          "," +
          value.slice(value.length - 3) +
          " / 15,000"
        );
      else return value + " / 15,000";
    }
  }
};
</script>

<style scoped>
@font-face {
  font-family: Babas-Regular;
  src: url(../assets/Bebas-Regular.otf);
}

@font-face {
  font-family: Walkway-Condensed-Bold;
  src: url(../assets/Walkway-Condensed-Bold.ttf);
}

.username-text {
  position: absolute;
  top: calc(var(--inner-height) * (145 / 1920));
  left: calc(100% * (188 / 1080));

  font-size: calc(var(--inner-height) * (39 / 1920));
  font-family: "Walkway-Condensed-Bold";
}

.container {
  position: relative;
  z-index: 700;
}

.header-container {
  position: relative;
  height: calc(var(--inner-height) * (370 / 1920));
  width: 100%;
  overflow: hidden;
  z-index: 1;
  box-shadow: 0px 0px 15px 4px black;
}

.full-header-background {
  height: 100%;
  width: 100%;
  position: absolute;
}

.header-background {
  position: absolute;
  top: calc(var(--inner-height) * (196 / 1920));

  height: calc(var(--inner-height) * (58 / 1920));
  width: 100%;

  z-index: -200;
}

#progressbar {
  position: absolute;
  top: calc(var(--inner-height) * (196 / 1920));

  /* height: calc(var(--inner-height) * (372 / 1920)); */
  width: 100%;

  z-index: -100;
}

.progressbar-text {
  position: absolute;
  top: calc(var(--inner-height) * (193.5 / 1920));
  width: 100%;
  text-align: center;

  font-family: "Babas-Regular";
  font-size: calc(var(--inner-height) * (43 / 1920));
  color: white;
  text-shadow: 1px 1px #111;
}

.settings-btn {
  background: url(../assets/btn_Settings_Default.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;

  position: absolute;
  top: calc(var(--inner-height) * (18 / 1920));
  right: calc(100% * (18 / 1080));

  height: calc(var(--inner-height) * (98 / 1920));
  width: calc(var(--inner-height) * (98 / 1920));
  /* width: calc(100% * (100 / 1080)); */

  border-radius: 25%;
  border-width: 0;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.settings-btn:active {
  background: url(../assets/btn_Settings_Selected.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

.settings-btn:focus {
  outline: 0;
}

.title-text {
  position: absolute;
  top: calc(var(--inner-height) * (258 / 1920));
  width: 100%;
  text-align: center;

  color: white;
  font-family: "Babas-Regular";
  font-size: calc(var(--inner-height) * (88 / 1920));
  text-shadow: 1px 1px #000;
}

.information-btn {
  background: url(../assets/btn_Information_Default.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;

  position: absolute;
  top: calc(var(--inner-height) * (280 / 1920));
  right: calc(100% * (13 / 1080));

  height: calc(var(--inner-height) * (64 / 1920));
  width: calc(var(--inner-height) * (64 / 1920));
  /* width: calc(100% * (100 / 1080)); */

  border-radius: 25%;
  border-width: 0;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.information-btn:active {
  background: url(../assets/btn_Information_Selected.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

.information-btn:focus {
  outline: 0;
}
</style>
