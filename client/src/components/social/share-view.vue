<template>
  <div class="share-container" ref="needsScrolling">
    <div class="top-text">THIS IS YOUR UNIQUE QR CODE</div>
    <div class="qr-wrapper">
      <div class="qr-square">
        <div ref="qrCode" id="qrCode"></div>
      </div>
    </div>
    <div class="qr-line"></div>
  </div>
</template>

<script>
const bodyScrollLock = require("body-scroll-lock");
import { mapGetters, mapActions } from "vuex";

import barcode0 from '../../assets/Barcodes/barcode11.png'
import barcode1 from '../../assets/Barcodes/barcode1.png'
import barcode2 from '../../assets/Barcodes/barcode2.png'
import barcode3 from '../../assets/Barcodes/barcode3.png'
import barcode4 from '../../assets/Barcodes/barcode4.png'

// https://www.cssscript.com/qr-code-generator-logo-title/
import QRCode from "easyqrcodejs";

export default {
  name: "ShareView",
  computed: {
    ...mapGetters(["getQrKey"]),
    mapInventionToPath() {
      let barcodes = [barcode0, barcode1, barcode2, barcode3, barcode4]
      return barcodes[this.infiniteInventionPiece.invention]
    }
  },
  data() {
    return {
      logoDimensions: 83,
      infiniteInventionPiece: {}
    };
  },
  async mounted() {
    this.infiniteInventionPiece = await this.getInfiniteInventionPiece()
    this.createQRCode();
    bodyScrollLock.disableBodyScroll(this.$refs.needsScrolling);
  },
  updated() {
    bodyScrollLock.disableBodyScroll(this.$refs.needsScrolling);
  },
  methods: {
    ...mapActions(['getInfiniteInventionPiece']),
    createQRCode() {
      var qrcode = new QRCode(this.$refs.qrCode, {
        text: this.getQrKey,
        logo: this.mapInventionToPath,
        logoWidth: this.logoDimensions,
        logoHeight: this.logoDimensions,
        logoBackgroundColor: "#ffffff",
        logoBackgroundTransparent: false
      });
    }
  }
};
</script>

<style scoped>
@font-face {
  font-family: Bebas-Regular;
  src: url(../../assets/Bebas-Regular.otf);
}

.share-container {
  position: relative;

  /* top: calc((372 / 1920) * var(--inner-height)); */
  top:0;
  height: calc(var(--inner-height) * (1270 / 1920));
  /* bottom: calc(var(--inner-height) * (249 / 1920)); */

  width: 100%;

  z-index: 0;

  overflow: hidden;
}

.qr-wrapper {
  width: 100%;
  height: 284px;
  display: flex;
  align-items: center;
}

.qr-square {
  background: url("../../assets/QR-Square.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;

  height: 100%;
  width: 284px;
  display: flex;
  margin: auto;
}

#qrCode {
  margin: auto;
}

.top-text {
  font-family: "Bebas-Regular";
  font-size: 1.4em;
  width: 100%;
  text-align: center;

  margin: 10px auto;
}
</style>