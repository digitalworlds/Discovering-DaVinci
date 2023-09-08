<template>
  <div class="qr-scanner">
    <qrcode-stream @decode="onDecode"></qrcode-stream>
    <button @click="onCollect" v-if="canCollect">Collect</button>
    <button @click="onDecode('05061451-aef2-478c-89e4-3fcf8f437bce')">SCANNED</button>
  </div>
</template>

<script>
import { QrcodeStream } from "vue-qrcode-reader";
import { mapGetters } from "vuex";
let api = require("../api");

export default {
  name: "QrScanner",
  data() {
    return {
      canCollect: false,
      claim: ""
    };
  },
  components: {
    QrcodeStream
  },
  computed: {
    ...mapGetters(["getQrKey"])
  },
  methods: {
    async onDecode(payload) {
      if (!payload) {
        // console.log("DEBUG: Missfire");
      } else {
        // console.log("DEBUG", payload);
        let response = await api.default.claimInfiniteInventionPiece(payload);
        if (response.status === 200) {
          this.canCollect = true;
          this.claim = response.claim;
          this.$store.commit("UPDATE_ENCOUNTERED", this.claim["user_id"]);
        }
      }
    },
    async onCollect() {
      let response = await api.default.saveCard(
        this.claim["infInv"]
      );
      if (response.status === 200) {
      }
    }
  }
};
</script>

<style>
</style>
