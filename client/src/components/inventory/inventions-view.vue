<template>
  <div ref="inventionsView" class="inventions-container">
    <invention-card
      v-for="(invention, index) in inventions"
      :ref="'inventionCard'+index"
      :key="index"
      :invention_pieces="invention"
      :inventionNumber="index"
      @toggledDropdown="toggleAllDropdowns(index)"
      @buildInvention="toggleBuildOverlay($event)"
    />
  </div>
</template>

<script>
import InventionCard from "./invention-card";
import { mapActions, mapGetters } from "vuex";
const api = require("../../api");
const bodyScrollLock = require("body-scroll-lock");

export default {
  name: "InventionsView",
  components: {
    InventionCard
  },
  data() {
    return {
      inventions: {},
      saved_cards: [],
      inventionPiece: {}
    };
  },
  computed: {
    ...mapGetters(["getInventory"])
  },
  created() {
    this.parseInventory();
  },
  mounted() {
    bodyScrollLock.disableBodyScroll(this.$el);
  },
  methods: {
    toggleBuildOverlay(inventionNumber) {
      this.$refs.buildOverlay.toggleBuildOverlay(inventionNumber);
      this.parseInventory();
    },
    async useSavedCard(invention_piece) {
      let response = await api.default.useSavedCard(invention_piece.invention);
      this.inventionPiece = invention_piece;
      this.$refs.triviaCard.drawCard();
    },
    parseInventory() {
      let inventory = this.getInventory;

      let invention_pieces = inventory.invention_pieces;

      this.inventions = this.parseInventionPieces(invention_pieces);
      this.padInventions();
    },
    parseInventionPieces(pieces) {
      let formatted_pieces = {};

      for (let i = 0; i < pieces.length; i++) {
        let curr_piece = pieces[i];

        if (!formatted_pieces[curr_piece.invention])
          formatted_pieces[curr_piece.invention] = {};

        if (!formatted_pieces[curr_piece.invention][curr_piece.piece])
          formatted_pieces[curr_piece.invention][curr_piece.piece] = [];

        formatted_pieces[curr_piece.invention][curr_piece.piece].push(
          curr_piece
        );
      }

      return formatted_pieces;
    },
    padInventions() {
      for (let i = 0; i < 5; i++) {
        if (!this.inventions[`${i}`]) {
          this.inventions[`${i}`] = {};
        }
      }
    },
    toggleAllDropdowns(index) {
      for (let i = 0; i < 5; i++) {
        if (i != index) {
          this.$refs["inventionCard" + i][0].closeDropdown();
        }
      }
      this.$refs.inventionsView.scrollTop = this.$refs["inventionCard" + index][0].$el.offsetTop - 15
    }
  }
};
</script>

<style scoped>
.inventions-container {
  background: url(../../assets/BackgroundBlackout.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;

  position: relative;
  top: 0;
  left: 0;
  z-index: 1;

  height: calc(var(--inner-height) * (1350 / 1920));
  width: 100%;

  overflow-y: scroll;
}
</style>