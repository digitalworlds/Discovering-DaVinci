<template>
  <div
    v-show="carousel.pageCount > 1"
    class="VueCarousel-pagination"
    v-bind:class="{ [`VueCarousel-pagination--${paginationPositionModifierName}`]: paginationPositionModifierName }"
  >
    <div class="VueCarousel-dot-container" role="tablist" :style="dotContainerStyle">
      <picture>
        <img
          class="carousel-footer-btn carousel-footer-btn--left"
          src="../../../../assets/PNG/btn_CaretLeft_Default.png"
          type="image/png"
          @click="carousel.advancePage('backward')"
        />
      </picture>
      <button
        v-for="(page, index) in paginationCount"
        :key="`${page}_${index}`"
        class="VueCarousel-dot"
        aria-hidden="false"
        role="tab"
        :title="getDotTitle(index)"
        :value="getDotTitle(index)"
        :aria-label="getDotTitle(index)"
        :aria-selected="isCurrentDot(index) ? 'true' : 'false'"
        v-bind:class="{ 'VueCarousel-dot--active': isCurrentDot(index) }"
        v-on:click="goToPage(index)"
        :style="dotStyle(index)"
      >
        <!-- <span v-if="!isCurrentDot(index)">
          <div class="VueCarousel-dot-background VueCarousel-dot-background--gradient"></div>
        </span>
        <span v-else>
          <div class="VueCarousel-dot-background"></div>
        </span> -->
      </button>
      <picture>
        <img
          class="carousel-footer-btn carousel-footer-btn--right"
          src="../../../../assets/PNG/btn_CaretRight_Default.png"
          type="image/png"
          @click="carousel.advancePage()"
        />
      </picture>
    </div>
  </div>
</template>

<script>
export default {
  name: "pagination",
  inject: ["carousel"],
  computed: {
    paginationPositionModifierName() {
      const { paginationPosition } = this.carousel;
      // guard to add only required class modifiers
      if (paginationPosition.indexOf("overlay") < 0) return;
      return paginationPosition;
    },
    paginationPropertyBasedOnPosition() {
      return this.carousel.paginationPosition.indexOf("top") >= 0
        ? "bottom"
        : "top";
    },
    paginationCount() {
      return this.carousel && this.carousel.scrollPerPage
        ? this.carousel.pageCount
        : this.carousel.slideCount || 0;
    },
    dotContainerStyle() {
      const { carousel } = this;
      if (carousel.maxPaginationDotCount === -1)
        return {
          "margin-top": `${carousel.paginationMargin * 2}px`
        };
      const doublePadding = carousel.paginationMargin * 2;
      const containerWidth =
        carousel.maxPaginationDotCount *
        (carousel.paginationSize + doublePadding);
      return {
        "margin-top": `${carousel.paginationMargin * 2}px`,
        overflow: "hidden",
        width: `${containerWidth}px`,
        margin: "0 auto",
        "white-space": "nowrap"
      };
    }
  },
  methods: {
    /**
     * Change page by index
     * @param {number} index
     * return {void}
     */
    goToPage(index) {
      /**
       * @event paginationclick
       * @type {number}
       */
      this.$emit("paginationclick", index);
    },

    /**
     * Check on current dot
     * @param {number} index - dot index
     * @return {boolean}
     */
    isCurrentDot(index) {
      return index === this.carousel.currentPage;
    },

    /**
     * Generate dot title
     * @param {number} index - dot index
     * @return {string}
     */
    getDotTitle(index) {
      return this.carousel.$children[index].title
        ? this.carousel.$children[index].title
        : `Item ${index}`;
    },
    /**
     * Control dots appear and disappear
     * @param {number} index - dot index
     * @return {Object} - dot(buttn) style
     */
    dotStyle(index) {
      const { carousel } = this;
      const basicBtnStyle = {};
      basicBtnStyle[
        `margin-${this.paginationPropertyBasedOnPosition}`
      ] = `${carousel.paginationMargin * 2}px`;

      Object.assign(basicBtnStyle, {
        margin: `${carousel.paginationPadding}px`,
        border: "0"
      });

      if (carousel.maxPaginationDotCount === -1) return basicBtnStyle;

      const eachDotsWidth =
        carousel.paginationSize + carousel.paginationPadding * 2;
      const maxReverse = carousel.pageCount - carousel.maxPaginationDotCount;
      const translateAmount =
        carousel.currentPage > maxReverse
          ? maxReverse
          : carousel.currentPage <= carousel.maxPaginationDotCount / 2
          ? 0
          : carousel.currentPage -
            Math.ceil(carousel.maxPaginationDotCount / 2) +
            1;
      const transformWidth = 0 - eachDotsWidth * translateAmount;
      return Object.assign(basicBtnStyle, {
        "-webkit-transform": `translate3d(${transformWidth}px,0,0)`,
        transform: `translate3d(${transformWidth}px,0,0)`,
        "-webkit-transition": `-webkit-transform ${carousel.speed / 1000}s`,
        transition: `transform ${carousel.speed / 1000}s`
      });
    }
  }
};
</script>

<style scoped>
.carousel-footer-btn {
  position: absolute;
  height: calc(100vw * (87 / 1080));
  width: calc(100vw * (87 / 1080));
  bottom: 0;
}

.carousel-footer-btn--left {
  left: calc(100vw * (200 / 1080));
}
.carousel-footer-btn--right {
  right: calc(100vw * (200 / 1080));
}

.VueCarousel-pagination {
  width: 100%;
  text-align: center;
}

.VueCarousel-pagination--top-overlay {
  position: absolute;
  top: 0;
}

.VueCarousel-pagination--bottom-overlay {
  position: absolute;
  bottom: 0;
}

.VueCarousel-dot-container {
  display: inline-block;
  margin: 0 auto;
  padding: 0;
}

.VueCarousel-dot {
  background: url(../../../../assets/PNG/btn_CarouselPip.png) no-repeat;
  background-size: 100% 100%;
  display: inline-block;
  cursor: pointer;
  appearance: none;
  /* border: none; */
  background-clip: content-box;
  box-sizing: content-box;
  padding: 0;
  border-radius: 100%;
  outline: none;
  position: relative;

  height: calc(100vw * (35 / 1080));
  width: calc(100vw * (35 / 1080));
}

.VueCarousel-dot--active {
  background: black no-repeat;
  background-size: 100% 100%;
}

.VueCarousel-dot:focus {
  outline: none;
}

.VueCarousel-dot-background {
  background: black;
  width: calc(100vw * (40 / 1080));
  height: calc(100vw * (40 / 1080));
  position: relative;
  left: calc(-100vw * (6 / 1080));
  top: calc(-100vw * (6 / 1080));
  z-index: -1;
  border-radius: 100%;
}

.VueCarousel-dot-background--gradient {
  background: linear-gradient(#954d45, #4c1e18);
}

@media screen and (min-device-width: 536px) {
  .VueCarousel-dot {
    height: calc(536px * (35 / 1080));
    width: calc(536px * (35 / 1080));
  }
  .VueCarousel-dot-background {
    width: calc(536px * (40 / 1080));
    height: calc(536px * (40 / 1080));

    left: calc(-536px * (6 / 1080));
    top: calc(-536px * (6 / 1080));
  }
  .carousel-footer-btn {
    position: absolute;
    height: calc(536px * (87 / 1080));
    width: calc(536px * (87 / 1080));
  }

  .carousel-footer-btn--left {
    left: calc(536px * (200 / 1080));
  }
  .carousel-footer-btn--right {
    right: calc(536px * (200 / 1080));
  }
}
</style>
