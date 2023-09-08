<template>
  <div class="scan">
    <qr-scanner v-if="mode === 'scan'" />
    <qr-shower v-if="mode === 'show'" />
    <button :disabled="mode === 'scan'" @click="changeMode">Scan</button>
    <button :disabled="mode === 'show'" @click="changeMode">Show</button>
  </div>
</template>

<script>
import QrScanner from "@/components/qr-scanner";
import QrShower from "@/components/qr-shower";

export default {
  name: "Scan",
  data() {
    return {
      mode: "scan"
    };
  },
  components: {
    QrShower,
    QrScanner
  },
  methods: {
    changeMode() {
      if (this.mode === "scan") this.mode = "show";
      else this.mode = "scan";
    }
  }
};
</script>

<style>
</style>
