<template>
  <div class="qr-shower">
    <div>
      <qr-code :text="getQrKey" :size="250"/>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "QrShower",
  computed: {
    ...mapGetters(["getQrKey"])
  },
  mounted() {
    this.centerQrCode();
  },
  methods: {
    centerQrCode() {
      this.$el.querySelector("img").style.margin = "auto";
    }
  }
};
</script>

<style>
</style>
