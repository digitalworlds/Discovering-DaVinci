<template>
  <div class="to-give-grid">
    <div v-for="(invention, inventionNumber) in invention_pieces" :key="inventionNumber">
      <div
        class="invention-piece"
        v-for="(piece, inventionPieceNumber) in invention"
        :key="inventionPieceNumber"
        v-if="showPiece(piece)"
      >
        <div class="invention-piece-icon" :class="inventionPieceToBackground(piece)"></div>
        <div class="invention-pieces-text">{{piece.length}}</div>
        <button class="cancel-btn" @click="onClearInventionPiece(piece)"></button>
      </div>
    </div>
    <div class="confirm-btn-wrapper" v-if="isConfirmShown">
      <picture>
        <img
          class="confirm-btn"
          src="../../assets/PNG/btn_ConfirmGive_Default.png"
          type="image/png"
          :class="{'enabled': isConfirmEnabled}"
          @click="onConfirmGive"
        />
      </picture>
    </div>
  </div>
</template>

<script>
const api = require("../../api").default;

export default {
  name: "ToGiveGrid",
  props: {
    recipient: ""
  },
  data() {
    return {
      invention_pieces: [
        [[], [], []],
        [[], [], []],
        [[], [], []],
        [[], [], []],
        [[], [], []]
      ]
    };
  },
  computed: {
    isConfirmEnabled() {
      return this.recipient;
    },
    isConfirmShown() {
      let show = this.invention_pieces.some(pieces => {
        return pieces.some(piece => {
          return piece.length > 0;
        });
      });

      return show;
    }
  },
  methods: {
    showPiece(pieces) {
      if (pieces.length > 0) {
        return true;
      }
      return false;
    },
    updateInventionPieces(invention_piece) {
      let invention = invention_piece.invention;
      let piece = invention_piece.piece;

      this.invention_pieces[invention][piece].push(invention_piece);
    },
    inventionPieceToBackground(inventionPiece) {
      let inventionNumber = inventionPiece[0].invention;
      let inventionPieceNumber = inventionPiece[0].piece;

      let inventionName = this.formatInventionName(
        this.getInventionName(inventionNumber)
      );

      let bg_class = "";

      let pieces = {
        ornithopter: ["wings", "tail", "body"],
        aerialscrew: ["rotarywing", "platform", "mast"],
        roboticknight: ["upperbody", "lowerbody", "mechanicalparts"],
        printingpress: ["platen", "typebed", "pulley"],
        "self-propelledcart": ["frame", "mechanicalparts", "wheelsandaxle"]
      };

      bg_class =
        inventionName + "-" + pieces[inventionName][inventionPieceNumber];

      return bg_class;
    },
    formatInventionName(inventionName) {
      return inventionName.replace(/\s/g, "").toLowerCase();
    },
    getInventionName(inventionNumber) {
      let invention = inventionNumber;
      let inventionName = "";
      switch (invention) {
        case "0":
          inventionName = "ORNITHOPTER";
          break;
        case "1":
          inventionName = "AERIAL SCREW";
          break;
        case "2":
          inventionName = "ROBOTIC KNIGHT";
          break;
        case "3":
          inventionName = "PRINTING PRESS";
          break;
        case "4":
          inventionName = "SELF-PROPELLED CART";
          break;
      }
      return inventionName;
    },
    onClearInventionPiece(piece) {
      let inventionNumber = piece[0].invention;
      let inventionPieceNumber = piece[0].piece;

      let invention_piece = this.invention_pieces[inventionNumber][
        inventionPieceNumber
      ].pop();

      this.$emit("onClearInventionPiece", invention_piece);
    },

    parsePieces() {
      let invention_pieces = [];

      for (let i = 0; i < this.invention_pieces.length; i++) {
        for (let j = 0; j < this.invention_pieces[i].length; j++) {
          if (this.invention_pieces[i][j].length > 0) {
            invention_pieces.push(...this.invention_pieces[i][j]);
          }
        }
      }

      return invention_pieces;
    },

    resetGrid() {
      this.invention_pieces = [
        [[], [], []],
        [[], [], []],
        [[], [], []],
        [[], [], []],
        [[], [], []]
      ];
    },

    onConfirmGive() {
      this.$emit("onConfirmGive");
    },

    async givePieces() {
      if (this.isConfirmEnabled) {
        let pieces = this.parsePieces();

        let payload = {
          recipient: this.recipient,
          pieces: pieces
        };

        this.$store.commit("SET_IS_WAITING_ON_API", true);

        let response = await api.postGivePieces(payload);

        if (response.status === 200) {
          this.$store.commit("REMOVE_PIECES_FROM_INVENTORY", pieces);
          this.$store.commit("SET_OBJECTIVE_CACHEFIRST", false);
          this.resetGrid();
        } else if (response.status === 400) {
          // console.log(response.message);
          this.$emit('onNoUser')
        } else if (response.status === 401) {
          // console.log(response.message);
        } else {
        }
        this.$store.commit("SET_IS_WAITING_ON_API", false);
      }
    }
  }
};
</script>

<style scoped>
button:focus {
  outline: 0;
}

.to-give-grid {
  display: grid;
  grid-auto-columns: auto auto auto;
  grid-auto-rows: auto;
  width: 85%;
  margin: auto;
  padding-top: 19px;
}

.invention-piece {
  display: inline-flex;
  position: relative;
  float: left;
  height: calc(100vw * (130 / 1080));
  width: calc(100vw * (130 / 1080));

  margin-bottom: 15px;
}

.invention-piece-icon {
  height: 87%;
  width: 87%;

  margin: auto;
}

.invention-pieces-text {
  font-family: "Babas-Regular";
  font-size: 0.9em;

  position: absolute;
  bottom: -13px;
  right: 0;
  left: 0;
  text-align: center;
}

.confirm-btn {
  width: auto;
  height: auto;
  max-width: 100%;
  filter: grayscale(100%);
  -webkit-filter: grayscale(100%);
}

.confirm-btn.enabled {
  width: auto;
  height: auto;
  max-width: 100%;
  filter: none;
  -webkit-filter: none;
}

.confirm-btn.enabled:active {
  width: auto;
  height: auto;
  max-width: 100%;
  filter: brightness(75%);
  -webkit-filter: brightness(75%);
}

.ornithopter-wings {
  background: url(../../assets/ItemIcon_Ornithopter_Wings.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

.ornithopter-body {
  background: url(../../assets/ItemIcon_Ornithopter_Body.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

.ornithopter-tail {
  background: url(../../assets/ItemIcon_Ornithopter_Tail.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

.roboticknight-upperbody {
  background: url(../../assets/ItemIcon_RoboticKnight_UpperBody.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
.roboticknight-lowerbody {
  background: url(../../assets/ItemIcon_RoboticKnight_LowerBody.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
.roboticknight-mechanicalparts {
  background: url(../../assets/ItemIcon_RoboticKnight_MechanicalParts.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

.aerialscrew-rotarywing {
  background: url(../../assets/ItemIcon_AerialScrew_RotaryWing.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
.aerialscrew-platform {
  background: url(../../assets/ItemIcon_AerialScrew_Platform.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
.aerialscrew-mast {
  background: url(../../assets/ItemIcon_AerialScrew_Mast.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

.printingpress-platen {
  background: url(../../assets/ItemIcon_PrintingPress_Platen.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
.printingpress-typebed {
  background: url(../../assets/ItemIcon_PrintingPress_TypeBed.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
.printingpress-pulley {
  background: url(../../assets/ItemIcon_PrintingPress_Pulley.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

.self-propelledcart-frame {
  background: url(../../assets/ItemIcon_Cart_Frame.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
.self-propelledcart-mechanicalparts {
  background: url(../../assets/ItemIcon_Cart_MechanicalParts.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
.self-propelledcart-wheelsandaxle {
  background: url(../../assets/ItemIcon_Cart_WheelsAndAxle.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

.cancel-btn {
  background: url(../../assets/btn_RemoveIP_Default.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;

  border-radius: 50%;
  border: none;

  height: 18px;
  width: 18px;

  position: absolute;
  top: -4.5px;
  right: -4.5px;
}

@media screen and (min-device-width: 536px) {
  .invention-piece {
    height: calc(536px * (130 / 1080));
    width: calc(536px * (130 / 1080));
  }
}
</style>