<template>
  <div class="owned-piece">
    <div class="invention-title">{{getInventionName}}</div>
    <div class="invention-pieces-wrapper">
      <div
        class="invention-piece"
        v-for="(piece, index) in invention_pieces"
        :key="index"
        @click="onInventionIconClicked(index)"
      >
        <div class="icon-wrapper">
          <div class="invention-piece-icon" :class="inventionPieceToBackground(index)"></div>
        </div>
        <div class="invention-pieces-text">{{piece.length}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "OwnedPiece",
  props: {
    invention_pieces: {},
    inventionNumber: ""
  },
  data() {
    return {
      isOpen: false
    };
  },
  computed: {
    getInventionName() {
      let invention = this.inventionNumber;
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
    inventionToBackground(inventionPieceNumber) {
      let inventionName = this.getInventionName;
      let bg_class = this.formatInventionName(inventionName) + "-completed";

      return bg_class;
    }
  },
  created() {
    this.padInventionPieces();
  },
  methods: {
    padInventionPieces() {
      if (!this.invention_pieces["0"]) this.invention_pieces["0"] = [];
      if (!this.invention_pieces["1"]) this.invention_pieces["1"] = [];
      if (!this.invention_pieces["2"]) this.invention_pieces["2"] = [];
    },
    inventionPieceToBackground(inventionPieceNumber) {
      let inventionName = this.formatInventionName(this.getInventionName);
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
    onInventionIconClicked(index) {
      if (this.invention_pieces[index].length > 0) {
        let invention_piece = this.invention_pieces[index].pop();
        this.$emit("onInventionIconClicked", invention_piece);
      }
    }
  }
};
</script>

<style scoped>
.owned-piece {
  width: 100%;
}

.invention-title {
  font-family: "Babas-Regular";
  font-size: calc(100vw * (50 / 1080));
  margin-left: 10px;
}

.invention-pieces-wrapper {
  top: 50px;
  height: 59px;
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  margin-bottom: calc(100vw * (29 / 1080));
}

.invention-piece {
  display: inline-flex;
  position: relative;
  float: left;
  height: calc(100vw * (130 / 1080));
  width: calc(100vw * (130 / 1080));
}

.icon-wrapper {
  border: 1px solid #954d45;
  width: 90%;
  height: 90%;
  display: flex;
  border-radius: 4px;
}

.invention-piece-icon {
  height: 95%;
  width: 95%;
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

@media screen and (min-device-width: 536px) {
  .invention-piece {
    height: calc(536px * (130 / 1080));
    width: calc(536px * (130 / 1080));
  }
  .invention-title {
    font-size: calc(536px * (50 / 1080));
  }

  .invention-pieces-wrapper {
    margin-bottom: calc(536px * (29 / 1080));
  }
}
</style>