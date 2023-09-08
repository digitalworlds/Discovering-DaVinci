<template>
  <div class="collect-container">
    <div class="qrcode-stream-wrapper" ref="qrStreamWrapper">
      <qrcode-stream @decode="onDecode"></qrcode-stream>
    </div>

    <div class="top-text">POSITION YOUR CODE READER OVER ANOTHER PLAYER'S QR CODE.</div>

    <iframe
      v-if="getUseAr"
      class="ar-viewer"
      allowvr="yes"
      :src="arViewerPath"
      allow="camera"
      frameborder="0"
    ></iframe>

    <div class="qr-reticle-wrapper">
      <div class="qr-reticle"></div>
    </div>
    <div class="bottom-text">{{bottomText}}</div>
    <div class="btn-wrapper">
      <button id="collect-btn" @click="onCollect" :disabled="!canCollect"></button>
    </div>
    <!-- <button @click="onDecode('05061451-aef2-478c-89e4-3fcf8f437bce')">SCANNED</button> -->
  </div>
</template>

<script>
import { QrcodeStream } from "vue-qrcode-reader";
import { mapGetters } from "vuex";

let api = require("../../api");

export default {
  name: "CollectView",
  data() {
    return {
      canCollect: false,
      claim: "",
      arViewerPath: require("../../static/ar-viewer.html"),
      bottomText: "CHECKING FOR VALID QR CODE..."
    };
  },
  components: {
    QrcodeStream
  },
  computed: {
    ...mapGetters(["getQrKey", "getUseAr"])
  },
  mounted() {
    if (!this.getUseAr) {
      this.$refs.qrStreamWrapper.style.visibility = "visible";
    }
  },
  methods: {
    async onDecode(payload) {
      if (!payload) {
        // console.log("DEBUG: Missfire");
      } else {
        // console.log("DEBUG", payload);
        let response = await api.default.claimInfiniteInventionPiece(payload);
        this.$store.commit("SET_IS_WAITING_ON_API", true);
        if (response.status === 200) {
          this.$store.commit("SET_IS_WAITING_ON_API", false);
          this.canCollect = true;
          this.claim = response.claim;
          this.bottomText = "PRESS COLLECT TO GAIN A TRIVIA CARD.";
        } else {
          this.$store.commit("SET_IS_WAITING_ON_API", false);
          this.bottomText = "YOU MAY ONLY COLLECT FROM EACH PLAYER ONCE.";
        }
      }
    },
    async onCollect() {
      this.canCollect = false;
      this.$store.commit("SET_IS_WAITING_ON_API", true);
      let response = await api.default.saveCard(this.claim);
      if (response.status === 200) {
        this.$store.commit("SET_IS_WAITING_ON_API", false);
        this.$emit('playClaimed');
        this.$store.commit("UPDATE_ENCOUNTERED", this.claim["user_id"]);
        this.$store.commit("SET_TRANSACTIONS_CACHEFIRST", false);
        this.$store.commit("SET_OBJECTIVE_CACHEFIRST", false);
      } else {
        this.$store.commit("SET_IS_WAITING_ON_API", false);
      }
    }
  }
};
</script>

<style scoped>
@font-face {
  font-family: Babas-Regular;
  src: url(../../assets/Bebas-Regular.otf);
}

.collect-container {
  position: relative;

  /* top: calc((372 / 1920) * var(--inner-height)); */
  top: 0;
  height: calc(var(--inner-height) * (1270 / 1920));
  /* bottom: calc(var(--inner-height) * (249 / 1920)); */

  width: 100%;

  z-index: 0;

  overflow: hidden;
}

.top-text {
  font-family: "Babas-Regular";
  font-size: 1.05em;
  color: white;
  text-shadow: 1px 1px #000;

  position: absolute;
  top: 3px;
  left: 0;
  right: 0;

  text-align: center;
}

.bottom-text {
  font-family: "Babas-Regular";
  font-size: 1.05em;
  color: white;
  text-shadow: 1px 1px #000;

  position: absolute;
  bottom: 20px;
  left: 0;
  right: 0;

  text-align: center;
}

.qrcode-stream-wrapper {
  /* https://github.com/gruhn/vue-qrcode-reader/issues/107 */
  visibility: hidden;
  position: absolute;
}

.ar-viewer {
  width: 100%;
  height: 100%;
}

.qr-reticle-wrapper {
  height: 175px;
  width: 175px;

  position: absolute;
  top: 50%;
  left: 50%;

  margin-top: -87.5px;
  margin-left: -87.5px;

  text-align: center;
}

.qr-reticle {
  background: url(../../assets/QR-Reticle.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;

  width: 100%;
  height: 100%;

  display: block;
}

.btn-wrapper {
  position: absolute;

  left: 50%;
  top: 72%;

  margin-left: calc((-100vw * (325 / 1080)) / 2);
}

#collect-btn {
  background: url(../../assets/btn_Collect_Default.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;

  border-radius: 13%;
  border-width: 0;

  width: calc(100vw * (325 / 1080));
  height: calc(var(--inner-height) * (135 / 1920));
}

#collect-btn:active {
  background: url(../../assets/btn_Collect_Selected.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;

  border-radius: 13%;
  border-width: 0;

  width: calc(100vw * (325 / 1080));
  height: calc(var(--inner-height) * (135 / 1920));
}

#collect-btn:disabled {
  background: url(../../assets/btn_Collect_Disabled.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;

  border-radius: 13%;
  border-width: 0;

  width: calc(100vw * (325 / 1080));
  height: calc(var(--inner-height) * (135 / 1920));
}

@media screen and (min-device-width: 536px) {
  .btn-wrapper {
    margin-left: calc((-536px * (325 / 1080)) / 2);
  }
  #collect-btn {
    width: calc(536px * (325 / 1080));
  }

  #collect-btn:active {
    width: calc(536px * (325 / 1080));
  }

  #collect-btn:disabled {
    width: calc(536px * (325 / 1080));
  }
}
</style>