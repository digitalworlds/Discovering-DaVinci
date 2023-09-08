<template>
  <div ref="inventoryView" class="inventory-container">
    <inventory-card
      v-for="(invention, index) in inventions"
      :ref="'inventoryCard'+index"
      :key="index"
      :invention_pieces="invention"
      :inventionNumber="index"
      @toggledDropdown="toggleAllDropdowns(index)"
      @buildInvention="toggleBuildOverlay($event)"
    />
    <build-overlay ref="buildOverlay"/>
    <!-- <confirm-combine-modal ref="confirmCombineModal" @continue="confirmBuild"/> -->
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import InventoryCard from "./inventory-card";
import BuildOverlay from './build-overlay'
import ConfirmCombineModal from '../modals/confirm-combine-modal';

const api = require("../../api");
const bodyScrollLock = require('body-scroll-lock')

export default {
  name: "InventoryView",
  data() {
    return {
      inventions: {},
      saved_cards: [],
      inventionPiece: {}
    };
  },
  components: {
    InventoryCard,
    BuildOverlay,
    ConfirmCombineModal
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
      this.$refs.buildOverlay.toggleBuildOverlay(inventionNumber)
      this.parseInventory()
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
          this.$refs["inventoryCard" + i][0].isOpen = false;
          this.$refs["inventoryCard" + i][0].closeDropdown();
        }
      }
      this.$refs.inventoryView.scrollTop = this.$refs["inventoryCard" + index][0].$el.offsetTop - 15
    }
  },
  watch: {
    getInventory: {
      handler: function(newVal, oldVal) {
        this.parseInventory()
      },
      deep: true
    }
  }
};
</script>

<style scoped>
.inventory-container {
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
