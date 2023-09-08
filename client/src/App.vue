<template>
  <div id="app">
    <Header
      v-if="showHeader"
      :section_title="getSectionTitle"
      @onSettingsClicked="$refs.settingsModal.playAnimation()"
    />
    <router-view
      @playClaimed="$refs.claimedMg.playAnimation()"
      @insufficientFunds="$refs.insufficientCoinsModal.playAnimation()"
    />
    <Footer
      v-if="currRoute !=='/' && currRoute !== '/Play' && currRoute !== '/register' && currRoute !== '/verify'"
      :currRoute="currRoute"
      :section_title="getSectionTitle"
    />
    <!-- <button style="position:absolute; top: 100px; z-index: 99999" @click="$refs.claimedMg.playAnimation()">TEST</button> -->
    <div class="loading-screen" v-if="isLoading">
      <picture>
        <img class="loading-icon" src="./assets/loading.gif" alt="Loading..." />
      </picture>
    </div>

    <div class="loading-screen loading-screen--translucent" v-if="isWaitingOnApi">
      <picture>
        <img class="loading-icon" src="./assets/loading.gif" alt="Loading..." />
      </picture>
    </div>

    <div class="full-app">
      <picture class="app-background">
        <source srcset="./assets/JPEG2000/Background.jp2" type="image/jp2" />
        <source srcset="./assets/WebP/Background.webp" type="image/webp" />
        <img src="./assets/PNG/Background.png" />
      </picture>
    </div>
    <settings-modal ref="settingsModal" />
    <insufficient-coins-modal ref="insufficientCoinsModal" />
    <!-- <reward-mg ref="rewardMg"/> -->
    <claimed-mg ref="claimedMg" />
  </div>
</template>

<script>
// const bodyScrollLock = require('body-scroll-lock')
import Header from "./components/Header";
import Footer from "./components/footer";
import RewardMg from "./components/play/correct-mg";
import ClaimedMg from "./components/play/claimed-mg";
import SettingsModal from "./components/modals/settings-modal";
import InsufficientCoinsModal from "./components/modals/insufficient-coins-modal";
import { mapGetters } from "vuex";

export default {
  name: "App",
  components: {
    Header,
    Footer,
    RewardMg,
    SettingsModal,
    ClaimedMg,
    InsufficientCoinsModal
  },
  data() {
    return {
      currRoute: this.$route.path
    };
  },
  mounted() {
    this.$socket.open();
    document.documentElement.style.setProperty(
      "--inner-height",
      `${window.innerHeight}px`
    );
    let ver = this.iOSversion();

    if (ver && ver[0] < 13) {
      this.$store.commit("SET_USE_AR", false);
    }
  },
  computed: {
    ...mapGetters(["isLoading", "isWaitingOnApi"]),
    getSectionTitle() {
      if (this.currRoute === "/") return "";

      let parsed_path = this.currRoute.split("/");

      if (parsed_path[parsed_path.length - 1] === "PlayerStats")
        return "Player Stats";

      return parsed_path[parsed_path.length - 1];
    },
    showHeader() {
      return (
        this.getSectionTitle &&
        this.getSectionTitle !== "register" &&
        this.getSectionTitle !== "verify"
      );
    }
  },
  methods: {
    playRewardAnimation() {
      this.$refs.rewardMg.playAnimation();
    },
    iOSversion() {
      if (/iP(hone|od|ad)/.test(navigator.platform)) {
        // supports iOS 2.0 and later: <http://bit.ly/TJjs1V>
        var v = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);
        return [
          parseInt(v[1], 10),
          parseInt(v[2], 10),
          parseInt(v[3] || 0, 10)
        ];
      }
    }
  },
  watch: {
    "$route.path": function(newPath, oldPath) {
      this.currRoute = newPath;
    }
  },
  sockets: {
    connect: function() {
      this.$socket.emit("authentication", {
        AccessToken: this.$store.getters.getAccessToken
      });
    },
    authenticated: function() {
      console.log("Is authenticated");
    },
    hourlyCoinUpdate: function() {
      this.$store.commit("SET_POWER", this.$store.state.user.power + 100);
    },
    newInventionPiece: function(data) {
      console.log("Earned new invention piece", data.invPiece);
      this.$store.commit("UPDATE_INVENTORY", data.invPiece);
    },
    unknownPieces: function(data) {
      console.log("Updated Unknown Pieces", data.unknownPieces);
      this.$store.commit("UPDATE_UNKNOWN_PIECES", data.unknownPieces);
    },
    disconnect: function() {
      let self = this;
      // probably useless and might cause a bug later
      setTimeout(() => {
        if (self.$socket.disconnected) {
          self.$socket.open();
        }
      }, 3000);
    }
  }
};
</script>

<style>
:root {
  --inner-height: 100vh;
}

html {
  margin: 0px;
  padding: 0px;
  overflow: hidden;
}
body {
  margin: 0px;
  padding: 0px;
  width: 100%;
  text-align: center;
  overflow: hidden;
  background-color: black;
}

#app {
  margin: 0px;
  padding: 0px;
  max-width: 536px;
  text-align: left;
  margin: 0px auto;
  overflow: hidden;
  position: relative;
  /* background-image: url("./assets/Background.png");
  background-size: 100vw 100vh;
  background-repeat: no-repeat; */
}

.full-app {
  position: absolute;
  top: 0;
  z-index: -1;
  left: 0;
}

.app-background {
  z-index: 1;
}

.loading-icon {
  width: 35%;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-top: -27%;
  margin-left: -17.5%;
}

.loading-screen {
  position: absolute;
  top: 0;
  height: var(--inner-height);
  left: 0;
  right: 0;
  z-index: 10000;
  background: black;
}

.loading-screen--translucent {
  background: rgba(0, 0, 0, 0.6);
}
</style>
