<template>
  <div class="faq-entry" ref="dropdownTarget" :class="{'faq-entry--big': useBigHeader}" @click="toggleDropdown">
    <picture>
      <img
        v-if="!useBigHeader"
        class="header-img"
        src="../../assets/PNG/LedgerHeader.png"
        type="image/png"
      />
      <img
        v-else
        class="header-img header-img--big"
        src="../../assets/PNG/LedgerHeader_002.png"
        type="image/png"
      />
    </picture>
    <ul class="header-text">
      <li class="question-text">
        <slot name="question"></slot>
      </li>
      <li class="username-text"></li>
      <li class="date-text">
        <picture>
          <img
            class="dropdown-btn"
            src="../../assets/btn_CaretOpen_Default.png"
            type="image/png"
            v-if="!isOpen"
            @click="toggleDropdown"
          />
          <img
            class="dropdown-btn"
            src="../../assets/btn_CaretClose_Default.png"
            type="image/png"
            v-else
            @click="toggleDropdown"
          />
        </picture>
      </li>
    </ul>
    <div class="answer-text">
      <slot name="answer"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "FaqEntry",
  props: {
    useBigHeader: false
  },
  data() {
    return {
      isOpen: false
    };
  },
  methods: {
    toggleDropdown() {
      let dropdownTarget = this.$refs.dropdownTarget;

      if (dropdownTarget.style.height !== "fit-content")
        dropdownTarget.style.height = "fit-content";
      else if (window.innerWidth > 536) {
        dropdownTarget.style.height = this.useBigHeader
          ? "calc(536px * (115 / 1080))"
          : "calc(536px * (80 / 1080))";
      } else {
        dropdownTarget.style.height = this.useBigHeader
          ? "calc(100vw * (115 / 1080))"
          : "calc(100vw * (80 / 1080))";
      }

      this.isOpen = !this.isOpen;
    }
  }
};
</script>

<style scoped>
.faq-entry {
  position: relative;
  height: calc(100vw * (80 / 1080));
  overflow: hidden;
  margin-bottom: 5px;
}

.faq-entry--big {
  height: calc(100vw * (115 / 1080));
}

.header-img {
  width: 100%;
}

.header-img--big {
  width: 100%;
  height: calc(100vw * (116 / 1080));
}

ul.header-text {
  list-style: none;
  margin: auto;
  padding: 0;
  position: absolute;
  top: calc(100vw * (15 / 1080));
  left: 0;
  right: 0;
  width: calc(100vw * (971 / 1080));
  height: calc(100vw * (58 / 1080));
}

ul li {
  display: inline-block;
}

ul li.question-text {
  font-family: "MyriadPro-Bold";
  font-size: calc(100vw * (38 / 1080));
  float: left;
  margin-left: 7px;
  max-width: calc(100vw * (869 / 1080));
}

ul li.username-text {
  font-family: "MyriadPro-Regular";
  font-size: calc(100vw * (40 / 1080));

  float: left;
  position: relative;
  top: calc(100vw * (10 / 1080));

  margin-left: calc(100vw * (10 / 1080));
}

ul li.date-text {
  font-family: "MyriadPro-Regular";
  font-size: calc(100vw * (40 / 1080));

  float: right;
}

.dropdown-btn {
  height: auto;
  width: auto;
  max-height: calc(100vw * (50 / 1080));
}

div.answer-text {
  font-family: "MyriadPro-Regular";
  font-size: calc(100vw * (35 / 1080));
  width: calc(100vw * (930 / 1080));
  margin: auto;
}

@media screen and (min-device-width: 536px) {
  .faq-entry {
    height: calc(536px * (80 / 1080));
  }
  .faq-entry--big {
    height: calc(536px * (115 / 1080));
  }
  .header-img--big {
    height: calc(536px * (116 / 1080));
  }
  ul.header-text {
    top: calc(536px * (15 / 1080));
    width: calc(536px * (971 / 1080));
    height: calc(536px * (58 / 1080));
  }
  ul li.question-text {
    font-size: calc(536px * (38 / 1080));
    max-width: calc(536px * (869 / 1080));
  }
  ul li.username-text {
    font-size: calc(536px * (40 / 1080));
    top: calc(536px * (10 / 1080));
    margin-left: calc(536px * (10 / 1080));
  }

  ul li.date-text {
    font-size: calc(536px * (40 / 1080));
    top: calc(536px * (10 / 1080));
  }
  div.answer-text {
    font-family: "MyriadPro-Regular";
    font-size: calc(536px * (35 / 1080));
    width: calc(536px * (930 / 1080));
  }
  .dropdown-btn {
    height: auto;
    width: auto;
    max-height: calc(536px * (50 / 1080));
  }
}
</style>