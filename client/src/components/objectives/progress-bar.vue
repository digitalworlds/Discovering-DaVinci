<template>
  <div class="progress-bar">
    <picture v-if="getColor === 'green'">
      <source srcset="../../assets/JPEG2000/Bar_Green.jp2" type="image/jp2" />
      <source srcset="../../assets/WebP/Bar_Green.webp" type="image/webp" />
      <img
        src="../../assets/PNG/Bar_Green.png"
        ref="progressbarVideo"
        type="image/png"
        class="progressbar-video"
      />
    </picture>
    <picture v-if="getColor === 'blue'">
      <source srcset="../../assets/JPEG2000/Bar_Blue.jp2" type="image/jp2" />
      <source srcset="../../assets/WebP/Bar_Blue.webp" type="image/webp" />
      <img
        src="../../assets/PNG/Bar_Blue.png"
        ref="progressbarVideo"
        type="image/png"
        class="progressbar-video"
      />
    </picture>
    <picture v-if="getColor === 'orange'">
      <source srcset="../../assets/JPEG2000/Bar_Orange.jp2" type="image/jp2" />
      <source srcset="../../assets/WebP/Bar_Orange.webp" type="image/webp" />
      <img
        src="../../assets/PNG/Bar_Orange.png"
        ref="progressbarVideo"
        type="image/png"
        class="progressbar-video"
      />
    </picture>
    <picture v-if="getColor === 'purple'">
      <source srcset="../../assets/JPEG2000/Bar_Purple.jp2" type="image/jp2" />
      <source srcset="../../assets/WebP/Bar_Purple.webp" type="image/webp" />
      <img
        src="../../assets/PNG/Bar_Purple.png"
        ref="progressbarVideo"
        type="image/png"
        class="progressbar-video"
      />
    </picture>
    <!-- <img v-if="getColor === 'blue'" ref="progressbarVideo" class="progressbar-video" src="../../assets/JPEG2000/Bar_Blue.jp2">
    <img v-if="getColor === 'green'" ref="progressbarVideo" class="progressbar-video" src="../../assets/JPEG2000/Bar_Green.jp2">
    <img v-if="getColor === 'orange'" ref="progressbarVideo" class="progressbar-video" src="../../assets/JPEG2000/Bar_Orange.jp2">
    <img v-if="getColor === 'purple'" ref="progressbarVideo" class="progressbar-video" src="../../assets/JPEG2000/Bar_Purple.jp2">-->

    <div class="progressbar-bg"></div>
    <span class="progressbar-text">{{getBarText}}</span>
  </div>
</template>

<script>
export default {
  name: "ProgressBar",
  props: {
    progress: {},
    sectionTitle: ""
  },
  data() {
    return {
      _progress: {}
    };
  },
  created() {
    this._progress = this.progress;
  },
  mounted() {
    this.applyBarStyles();
  },
  computed: {
    getBarRatio() {
      return 100 - (100 * this._progress.value) / this._progress.max_value <= 0
        ? 0
        : 100 - (100 * this._progress.value) / this._progress.max_value;
    },
    getBarText() {
      if (this.isObjectiveComplete) {
        return "COMPLETED";
      } else {
        let value = this.addComma(this._progress.value);
        let max_value = this.addComma(this._progress.max_value);

        return `${value} / ${max_value}`;
      }
    },
    getColor() {
      if (this.isObjectiveComplete) return "green";
      else if (this.sectionTitle === "daily") return "blue";
      else if (this.sectionTitle === "weekly") return "orange";
      else if (this.sectionTitle === "challenges") return "purple";
    },
    isObjectiveComplete() {
      return this._progress.max_value <= this._progress.value;
    }
  },
  methods: {
    applyBarStyles() {
      this.$refs.progressbarVideo.style.clipPath = `inset(0 ${this.getBarRatio}% 0 0)`;
      this.$refs.progressbarVideo.style.webkitClipPath = `inset(0 ${this.getBarRatio}% 0 0)`;
    },
    changeStartTime() {
      let duration = this.$refs.progressbarVideo.duration;
      let startTime = this.getRandomInt(duration);

      this.$refs.progressbarVideo.currentTime = startTime;
    },
    getRandomInt(max) {
      return Math.floor(Math.random() * Math.floor(max));
    },
    addComma(value) {
      if (!value) return "0";
      value = value.toString();
      if (value.length > 3)
        return (
          value.slice(0, value.length - 3) + "," + value.slice(value.length - 3)
        );
      else return value;
    }
  },
  filters: {
    capitalize: function(value) {
      if (!value) return "";
      value = value.toString();
      return value.toUpperCase();
    }
  },
  watch: {
    progress: {
      handler: function(newVal, oldVal) {
        this.$set(this._progress, "max_value", newVal.max_value);
        this.$set(this._progress, "value", newVal.value);
        this.applyBarStyles();
      },
      deep: true
    }
  }
};
</script>

<style scoped>
.progressbar-video {
  position: absolute;
  top: calc(var(--inner-height) * (192 / 1920));
  left: calc(100% * (30 / 1080));
  max-width: 100%;
  width: 71%;
  height: 23%;
  background-size: cover;
  overflow: hidden;
}

.progressbar-text {
  position: absolute;
  top: calc(var(--inner-height) * (190 / 1920));
  width: 77.3%;
  text-align: center;

  font-family: "Babas-Regular";
  font-size: calc(var(--inner-height) * (30 / 1080));
  color: white;
  text-shadow: 1px 1px #111;
}

@media screen and (min-device-width: 526px) {
  /* .progressbar-text {
    font-size: calc(536px * (55 / 1080));
  } */
}
.progressbar-bg {
  background: url(../../assets/ObjectiveFrame_ProgressBarBG.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;

  position: absolute;
  top: calc(var(--inner-height) * (190 / 1920));
  right: calc(100% * (280 / 1080));

  width: calc(100% * (770 / 1080));
  height: calc(var(--inner-height) * (70 / 1920));

  z-index: -2;
}
</style>
