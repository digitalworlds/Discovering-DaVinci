<template>
  <div class="give-container">
    <div class="give-sendbar">
      <input class="give-input" placeholder="Enter User Name..." v-model="recipient" autocapitalize="none"/>
      <button class="scan-btn"></button>
    </div>
    <div class="give-body">
      <div class="give-titles">
        <div class="section-title">OWNED</div><div class="section-title">TO GIVE</div>
      </div>
      <div class="owned-body" ref="ownedBody">
        <div class="owned-pieces-wrapper">
          <owned-piece
            v-for="(invention, index) in inventions"
            :ref="'inventoryCard'+index"
            :key="index"
            :invention_pieces="invention"
            :inventionNumber="index"
            @onInventionIconClicked="onInventionIconClicked($event)"
          />
        </div>
      </div><div class="togive-body" ref="toGiveBody">
        <div class="togive-wrapper">
          <to-give-grid
            ref="toGiveGrid"
            @onClearInventionPiece="onClearInventionPiece($event)"
            @onConfirmGive="onConfirmGive"
            @onNoUser="onNoUser()"
            :recipient="recipient"
          />
        </div>
      </div>
    </div>

    <confirm-give-modal ref="confirmGiveModal" @continue="confirmGive" />
    <no-user-give-modal ref="noUserGiveModal" @continue="onNoUser()" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import OwnedPiece from "./owned-piece";
import ToGiveGrid from "./to-give-grid";
import ConfirmGiveModal from "../modals/confirm-give-modal";
import NoUserGiveModal from "../modals/no-user-give-modal"
const bodyScrollLock = require("body-scroll-lock");

export default {
  name: "GiveView",
  data() {
    return {
      inventions: {},
      inventionPiece: {},
      recipient: ""
    };
  },
  components: {
    OwnedPiece,
    ToGiveGrid,
    ConfirmGiveModal,
    NoUserGiveModal
  },
  computed: {
    ...mapGetters(["getInventory"])
  },
  created() {
    this.parseInventory();
  },
  mounted() {
    bodyScrollLock.disableBodyScroll(this.$refs.ownedBody);
    bodyScrollLock.disableBodyScroll(this.$refs.toGiveBody);
  },
  methods: {
    onNoUser() {
      this.$refs.noUserGiveModal.playAnimation()
    },
    parseInventory() {
      let inventory = this.getInventory;

      let invention_pieces = inventory.invention_pieces;
      let saved_cards = inventory.saved_cards;

      this.inventions = this.parseInventionPieces(invention_pieces);
      this.saved_cards = saved_cards;
      this.padInventions();
    },
    parseInventionPieces(pieces) {
      let formatted_pieces = {};

      for (let i = 0; i < pieces.length; i++) {
        let curr_piece = pieces[i];

        if (!curr_piece.usedInBuild) {
          if (!formatted_pieces[curr_piece.invention])
            formatted_pieces[curr_piece.invention] = {};

          if (!formatted_pieces[curr_piece.invention][curr_piece.piece])
            formatted_pieces[curr_piece.invention][curr_piece.piece] = [];

          formatted_pieces[curr_piece.invention][curr_piece.piece].push(
            curr_piece
          );
        }
      }

      return formatted_pieces;
    },
    padInventions() {
      if (!this.inventions["0"]) this.inventions["0"] = {};
      if (!this.inventions["1"]) this.inventions["1"] = {};
      if (!this.inventions["2"]) this.inventions["2"] = {};
      if (!this.inventions["3"]) this.inventions["3"] = {};
      if (!this.inventions["4"]) this.inventions["4"] = {};
    },
    onInventionIconClicked(invention_piece) {
      this.$refs.toGiveGrid.updateInventionPieces(invention_piece);
    },
    onClearInventionPiece(invention_piece) {
      let invention = invention_piece.invention;
      let piece = invention_piece.piece;

      let updated_invention_pieces = this.inventions[invention][piece];

      updated_invention_pieces.push(invention_piece);

      this.$set(this.inventions[invention], piece, updated_invention_pieces);
    },
    onConfirmGive() {
      this.$refs.confirmGiveModal.playAnimation();
    },
    confirmGive() {
      // this.$refs.confirmGiveModal.playAnimation();
      this.$refs.toGiveGrid.givePieces()
    }
  }
};
</script>

<style scoped>
@font-face {
  font-family: Bebas-Regular;
  src: url(../../assets/Bebas-Regular.otf);
}

@font-face {
  font-family: MyriadPro-Regular;
  src: url(../../assets/MYRIADPRO-REGULAR.woff);
}

button:focus {
  outline: 0;
}

.give-container {
  position: relative;

  /* top: calc((372 / 1920) * var(--inner-height)); */
  top: 0;
  height: calc(var(--inner-height) * (1270 / 1920));
  /* bottom: calc(var(--inner-height) * (249 / 1920)); */

  width: 100%;

  z-index: 0;

  overflow: hidden;

  background-color: rgba(255, 255, 255, 0.6);
}

.give-sendbar {
  background: url(../../assets/ToBar.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;

  width: 100%;
  height: calc(var(--inner-height) * (150 / 1920));
  display: flex;
}

.give-input {
  justify-self: flex-start;
  height: calc(var(--inner-height) * (60 / 1920));
  background: none;
  border: none;

  font-size: calc(100vw * (50 / 1080));
  font-family: "MyriadPro-Regular";

  margin: calc(100vw * (46 / 1080)) 8% 0 8%;
}

.give-input::placeholder {
  color: #4d4e4e;
  opacity: 0.5;
}

.give-input:focus {
  outline: none;
}

.scan-btn {
  margin-left: auto;

  background: url(../../assets/btn_Scan_Default.png);
  background-size: 80% 75%;
  background-position: center;
  background-repeat: no-repeat;

  width: calc(100vw * (220 / 1080));

  border-radius: 13%;
  border-width: 0;
}

.scan-btn:active {
  background: url(../../assets/btn_Scan_Selected.png);
  background-size: 80% 75%;
  background-position: center;
  background-repeat: no-repeat;
}

.give-body {
  /* overflow: scroll; */
  box-shadow: inset 0px 0px 13px 3px black;
}

.give-titles {
  width: 100%;
}

.section-title {
  display: inline-block;
  width: 50%;

  text-align: center;

  font-family: "Bebas-Regular";
  font-size: 1.5em;
}

.owned-body {
  overflow: scroll;
  width: 50%;
  display: inline-block;

  height: calc(var(--inner-height) * (1079 / 1920));
}

.owned-pieces-wrapper {
  background: url(../../assets/ItemMat.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center;

  margin: 0 auto;

  height: fit-content;
  width: 85%;

  padding-bottom: calc(var(--inner-height) * (100 / 1920));
}

.togive-body {
  display: inline-block;

  overflow: scroll;
  width: 50%;

  height: calc(var(--inner-height) * (1079 / 1920));
}

.togive-wrapper {
  background: url(../../assets/ItemMat.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center;

  margin: 0 auto;
  min-height: 100%;
  height: fit-content;
  width: 85%;

  padding-bottom: calc(var(--inner-height) * (100 / 1920));
}

@media screen and (min-device-width: 536px) {
  .give-input {
    font-size: calc(536px * (50 / 1080));
    margin: calc(536px * (46 / 1080)) 8% 0 8%;
  }
  .scan-btn {
    width: calc(536px * (220 / 1080));
  }
}
</style>