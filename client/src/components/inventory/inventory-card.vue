<template>
  <div ref="inventoryCard" class="inventory-card">
    <div class="inventory-background">
      <div class="invention-wrapper">
        <div class="invention-icon" :class="inventionToBackground"></div>
        <div class="invention-text">{{ Math.floor(builtPieces.length / 3)}}</div>
      </div>
      <div class="card-content">
        <div class="invention-title">{{getInventionName}}</div>
        <div class="invention-pieces-title">INVENTION PIECES</div>
        <div class="invention-pieces-wrapper">
          <div class="invention-piece" v-for="(piece, index) in unbuiltPieces" :key="index">
            <div class="invention-piece-icon" :class="inventionPieceToBackground(index)"></div>
            <div
              class="invention-pieces-text"
              style="color: #e82024"
              v-if="piece.length === 0"
            >{{piece.length}}</div>
            <div class="invention-pieces-text" style="color: #018d47" v-else>{{piece.length}}</div>
          </div>
          <div class="build-btn-wrapper">
            <button class="build-btn" :disabled="!canBuild" @click="onBuild"></button>
          </div>
        </div>
      </div>
    </div>
    <div ref="inventoryDropdown" class="inventory-dropdown">
      <div class="inventory-dropdown-wrapper">
        <picture>
          <img class="prize-image" :src="getPrizeDetails.imageSrc" type="image/png" />
        </picture>
        <div class="prize-title">{{getPrizeDetails.title}}</div>
        <div class="prize-subtitle">{{`PRIZES FOR THE ${getInventionName} RAFFLE`}}</div>
        <div class="prize-wrapper">
          <div class="prize-description">
            Description:
            <span class="description-text">{{getPrizeDetails.description}}</span>
          </div>
          <div class="prize-details">
            Details:
            <span
              v-if="typeof getPrizeDetails.details === 'string'"
              class="details-text"
            >{{getPrizeDetails.details}}</span>
            <ul v-else class="details-text list">
              <li v-for="(detail, index) in getPrizeDetails.details" :key="index">{{detail}}</li>
            </ul>
          </div>
        </div>
        <div class="dropdown-footer-wrapper">
          <div class="dropdown-text-wrapper">
            <div
              class="dropdown-text--title"
            >{{'1 ' + getInventionName + ' = 1 RAFFLE ENTRY FOR THIS PRIZE.'}}</div>
            <div class="dropdown-text--your-entries">
              Your entries:
              <span style="color: #751d24">{{ Math.floor(builtPieces.length / 3)}}</span>
            </div>
            <div class="dropdown-text--all-entries">
              All entries:
              <span style="color: #751d24">{{1}}</span>
            </div>
          </div>
          <div class="dropdown-btn-wrapper">
            <button ref="dropdownBtn" class="dropdown-btn" @click="toggleDropdown()"></button>
          </div>
        </div>
      </div>
    </div>
    <div class="dropdown-toggle" @click="toggleDropdown()"></div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

const prizeDetails = {
  "0": {
    title: "Nintendo Switch",
    description:
      "The Nintendo Switch combines the mobility of a handheld with the power of a home system, giving you the flexibility to play wherever you are and however you like – whether it’s in handheld mode, TV mode, or tabletop mode.",
    details: "Nintendo Switch with Neon Blue and Neon Red Joy‑Con",
    dropdownHeight: 0,
    imageSrc: require("../../assets/PNG/Inventory_PrizeBanner_NintendoSwitch.png")
  },
  "1": {
    title: "Gator Swag",
    description:
      "This raffle prize is comprised of gator and University memorabilia!",
    details: [
      "Gator Tervis 24oz Bottle",
      "Gator Yeti Tumbler 30oz",
      "Official Gator Umbrella",
      "Gator Plush Animal Toy",
      "Official Gator License Plate Cover",
      "Gator Camping Chair",
      "Official Gator Magnet"
    ],
    dropdownHeight: 0,
    imageSrc: require("../../assets/PNG/Inventory_PrizeBanner_GatorSwag.png")
  },
  "2": {
    title: "Hoard of Boardgames",
    description:
      "This magnificent hoard of board games, which showcases a wide range of styles and themes has been curated by Paul Burgermeister, the host of Digital Worlds’ own recurring board game event, Tabletop.",
    details: [
      "Dominion: 2nd Edition",
      "Catan",
      "Ticket to Ride",
      "Spot It",
      "Fluxx",
      "Pandemic",
      "Azul"
    ],
    dropdownHeight: 0,
    imageSrc: require("../../assets/PNG/Inventory_PrizeBanner_Boardgames.png")
  },
  "3": {
    title: "Apple Airpods",
    description:
      "The latest model Apple AirPods deliver rich, high-quality audio and voice, with faster wireless connection to devices, seamless switching between devices, and quick access to Siri. Charging case can be charged using the Lightning connector.",
    details: "Apple AirPods with Charging Case",
    dropdownHeight: 0,
    imageSrc: require("../../assets/PNG/Inventory_PrizeBanner_Airpods.png")
  },
  "4": {
    title: "Gaming Mouse & Mouse Pad",
    description:
      "The Razer Viper gaming mouse features ultralight, a high-precision 16K DPI optical sensor, customizable RGB color profiles, and 8 programmable buttons. The Razer Goliathus Chroma mouse mat’s micro-textured cloth surface offers an exceptional balance of control and speed while illuminating every minute of gameplay.",
    details: [
      "Razer Viper Ultralight Ambidextrous Wired Gaming Mouse",
      "Razer Goliathus Chroma Gaming Mouse Mat"
    ],
    dropdownHeight: 0,
    imageSrc: require("../../assets/PNG/Inventory_PrizeBanner_GamingMouseMat.png")
  }
};
export default {
  name: "InventoryCard",
  props: {
    invention_pieces: {},
    inventionNumber: ""
  },
  data() {
    return {
      isOpen: false,
      isUnknown: [false, false, false],
      builtPieces: [],
      unbuiltPieces: []
    };
  },
  computed: {
    ...mapGetters(["getUnknownPieces"]),
    getPrizeDetails() {
      return prizeDetails[this.inventionNumber];
    },
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
      let bg_class = "";
      if (this.builtPieces.length === 0) {
        bg_class = "unknown-icon";
      } else {
        let inventionName = this.getInventionName;
        bg_class = this.formatInventionName(inventionName) + "-completed";
      }

      return bg_class;
    },
    canBuild() {
      for (let key in this.unbuiltPieces)
        if (this.unbuiltPieces[key].length === 0) return false;

      return true;
    }
  },
  created() {
    this.padInventionPieces();
    this.unbuiltPieces = this.parseBuiltPieces();
  },
  methods: {
    parseBuiltPieces() {
      this.builtPieces = [];
      // returns an invention_pieces object without pieces that are flagged as built
      let parsed_pieces = {};

      Object.assign(parsed_pieces, this.invention_pieces);

      Object.keys(this.invention_pieces).forEach(key => {
        let unbuilt_pieces = this.invention_pieces[key].filter(piece => {
          if (piece.usedInBuild) {
            this.builtPieces.push(piece);
          }
          return !piece.usedInBuild; // this is the return for the filter
        });

        parsed_pieces[key] = unbuilt_pieces;
      });

      return parsed_pieces;
    },
    padInventionPieces() {
      for (let i = 0; i < 3; i++) {
        if (!this.invention_pieces[`${i}`]) {
          this.isUnknown[i] = true;
          this.invention_pieces[`${i}`] = [];
        } else if (this.isUnknown[i]) {
          this.isUnknown[i] = false;
        }
      }
    },
    inventionPieceToBackground(inventionPieceNumber) {
      let inventionName = this.formatInventionName(this.getInventionName);
      let bg_class = "";
      if (
        !this.isUnknown[inventionPieceNumber] ||
        !this.getUnknownPieces[this.inventionNumber][inventionPieceNumber]
      ) {
        let pieces = {
          ornithopter: ["wings", "tail", "body"],
          aerialscrew: ["rotarywing", "platform", "mast"],
          roboticknight: ["upperbody", "lowerbody", "mechanicalparts"],
          printingpress: ["platen", "typebed", "pulley"],
          "self-propelledcart": ["frame", "mechanicalparts", "wheelsandaxle"]
        };

        bg_class =
          inventionName + "-" + pieces[inventionName][inventionPieceNumber];
      } else {
        bg_class = "unknown-icon";
      }
      return bg_class;
    },
    formatInventionName(inventionName) {
      return inventionName.replace(/\s/g, "").toLowerCase();
    },
    toggleDropdown() {
      if (!this.isOpen) {
        this.isOpen = true;
        this.openDropdown();
        this.$emit("toggledDropdown");
      } else {
        this.isOpen = false;
        this.closeDropdown();
      }
    },
    openDropdown() {
      if (window.innerWidth > 536)
        this.$refs.inventoryCard.style.height = "calc(536px * (1242/1080))";
      else this.$refs.inventoryCard.style.height = "calc(100vw * (1242/1080))";
      this.$refs.inventoryDropdown.style["clip-path"] = "inset(0 0 0 0)";
      this.$refs.inventoryDropdown.style.webkitClipPath = "inset(0 0 0 0)";
      this.$refs.dropdownBtn.style.transform = "rotate(180deg)";
      this.$refs.dropdownBtn.style.webkitTransform = "rotate(180deg)";
    },
    closeDropdown() {
      if (window.innerWidth < 374) {
        this.$refs.inventoryCard.style.height = "calc(100vw * (760 / 1920))";
        this.$refs.inventoryDropdown.style["clip-path"] =
          "inset(calc(100vw * (1260 / 1920)) 0 0 0)";
        this.$refs.inventoryDropdown.style.webkitClipPath =
          "inset(calc(100vw * (1260 / 1920)) 0 0 0)";
      } else if (window.innerWidth > 536) {
        this.$refs.inventoryCard.style.height = "calc(536px * (760 / 1920))";
        this.$refs.inventoryDropdown.style["clip-path"] =
          "inset(calc(536px * (960 / 1920)) 0 0 0)";
        this.$refs.inventoryDropdown.style.webkitClipPath =
          "inset(calc(536px * (960 / 1920)) 0 0 0)";
      } else {
        this.$refs.inventoryCard.style.height = "calc(100vw * (760 / 1920))";
        this.$refs.inventoryDropdown.style["clip-path"] =
          "inset(calc(100vw * (975 / 1920)) 0 0 0)";
        this.$refs.inventoryDropdown.style.webkitClipPath =
          "inset(calc(100vw * (975 / 1920)) 0 0 0)";
      }
      this.$refs.dropdownBtn.style.transform = "rotate(0)";
      this.$refs.dropdownBtn.style.webkitTransform = "rotate(0)";
    },
    async onBuild() {
      let built_pieces = [];

      for (let key in this.unbuiltPieces) {
        built_pieces.push(this.unbuiltPieces[key].pop());
      }

      this.$store.commit("SET_IS_WAITING_ON_API", true);

      let response = await this.$store.dispatch(
        "addBuiltInvention",
        built_pieces
      );

      this.$store.commit("SET_IS_WAITING_ON_API", false);

      if (response.status === 200) {
        this.$store.commit("SET_PLAYERSTATS_CACHEFIRST", false);
        this.$emit("buildInvention", this.inventionNumber);
      }
    }
  },
  watch: {
    invention_pieces: {
      deep: true,
      handler: function(newVal, oldVal) {
        this.padInventionPieces();
        this.unbuiltPieces = this.parseBuiltPieces();
      }
    }
  }
};
</script>

<style scoped>
@font-face {
  font-family: Babas-Regular;
  src: url(../../assets/Bebas-Regular.otf);
}

@font-face {
  font-family: MyriadPro-Regular;
  src: url(../../assets/MYRIADPRO-REGULAR.woff);
}

@font-face {
  font-family: MyriadPro-SemiBold;
  src: url(../../assets/MYRIADPRO-SEMIBOLD.woff);
}

button:focus {
  outline: 0;
}

.inventory-card {
  height: calc(100vw * (760 / 1920));
  width: calc(100% * (1000 / 1080));

  position: relative;
  margin: 15px auto;
}

.inventory-background {
  background: url(../../assets/InventoryFrame.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  height: calc(100vw * (560 / 1920));
  width: 100%;
  position: absolute;
  z-index: 2;
  box-shadow: 2px 0px 20px 0 black;
  border-radius: 6px;
}

.dropdown-toggle {
  position: absolute;
  bottom: 0px;
  height: calc(var(--inner-height) * (120 / 1920));
  width: 100%;
  z-index: 2;
}

.inventory-dropdown {
  background: url(../../assets/InventoryFrame_PrizeExpanded.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;

  position: absolute;
  bottom: 0px;
  /* left: 1.5%; */

  height: calc(100vw * (962 / 1080));
  width: 100%;
  z-index: 1;

  border-radius: 6px;

  clip-path: inset(calc(100vw * (1260 / 1920)) 0 0 0);
  pointer-events: none;
}

.inventory-dropdown-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
}

.dropdown-footer-wrapper {
  font-family: "Babas-Regular";
  font-size: calc(100vw * (48 / 1080));

  position: absolute;
  bottom: 0;

  height: calc(100vw * (116 / 1080));
  width: 100%;
}

.dropdown-text-wrapper {
  display: inline-block;

  height: 100%;
  width: 100%;
}

.dropdown-text--title {
  margin-left: 10px;
}

.dropdown-text--your-entries {
  font-size: 0.85em;
  float: left;
  margin-left: 10px;
}

.dropdown-text--all-entries {
  font-size: 0.85em;
  float: right;
  margin-right: 97px;
}

.dropdown-btn-wrapper {
  position: absolute;
  right: 5px;
  bottom: 5px;

  z-index: 2;
}

.dropdown-btn {
  background: url(../../assets/btn_CaretOpen_Default.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  width: 30px;
  height: 30px;

  border: 0;
}

.dropdown-btn:active {
  background: url(../../assets/btn_CaretOpen_Selected.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

.card-content {
  display: inline-flex;
  height: calc(var(--inner-height) * (335 / 1920));
  /* width: calc(100% * (735 / 1080)); */
  float: left;
}

/* @media screen and (min-device-width: 526px) {
  .card-content {
    margin-left: 13px;
  }
} */

.invention-title {
  position: absolute;
  font-family: "Babas-Regular";
  font-size: calc(100vw * (125 / 1920));
}

.invention-pieces-title {
  position: absolute;
  top: calc(100vw * (162.5 / 1920));
  font-family: "Babas-Regular";
  font-size: calc(100vw * (60 / 1920));
}

.invention-pieces-wrapper {
  position: absolute;
  top: calc(100vw * (250 / 1920));
  bottom: calc(100vw * (30 / 1920));
  left: calc(100vw * (565 / 1920));
  right: calc(100vw * (22 / 1080));
  /* height: calc(100vw * (158.25 / 1920));
  width: calc(100% * (720 / 1080)); */
}

.invention-wrapper {
  height: calc(100vw * (575 / 1920));
  width: calc(100vw * (575 / 1920));
  display: inline-flex;
  float: left;
  position: relative;
}

.invention-text {
  position: absolute;
  font-family: "Babas-Regular";
  font-size: calc(100vw * (80 / 1920));
  bottom: calc(100vw * (50 / 1920));
  left: 0;
  right: 0;
  text-align: center;
  color: white;
  text-shadow: 1px 1px black;
}

.invention-icon {
  margin: auto;
  height: 87%;
  width: 87%;
}

.unknown-icon {
  background: url(../../assets/PNG/ItemIcon_UnknownIP.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

.ornithopter-completed {
  background: url(../../assets/CI_Ornithopter.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

.aerialscrew-completed {
  background: url(../../assets/CI_AerialScrew.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

.roboticknight-completed {
  background: url(../../assets/CI_RoboticKnight.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

.printingpress-completed {
  background: url(../../assets/CI_PrintingPress.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

.self-propelledcart-completed {
  background: url(../../assets/CI_SelfPropelledCart.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

.invention-piece {
  display: inline-flex;
  position: relative;
  float: left;
  height: calc(100vw * (215 / 1920));
  width: calc(100vw * (215 / 1920));
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

.build-btn-wrapper {
  display: inline-flex;
  width: calc(100% * (430 / 1080));
  height: 100%;
  float: left;
}

.build-btn {
  background: url(../../assets/btn_Build_Default.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;

  height: 73%;
  width: 80%;

  margin: auto;

  border-radius: 13%;
  border-width: 0;
}

.build-btn:active {
  background: url(../../assets/btn_Build_Selected.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

.build-btn:disabled {
  background: url(../../assets/btn_Build_Disabled.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
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

.prize-image {
  width: 100%;
  position: absolute;
  top: calc(-100vw * (14 / 1080));
}

.prize-title {
  font-family: "Babas-Regular";
  font-size: calc(100vw * (70 / 1080));
  color: white;
  position: absolute;
  top: calc(100vw * (191 / 1080));
  left: 9px;
}

.prize-subtitle {
  font-family: "Babas-Regular";
  font-size: calc(100vw * (53 / 1080));
  position: absolute;
  top: calc(100vw * (291 / 1080));
  left: 9px;
}

.prize-wrapper {
  overflow: scroll;
  position: absolute;
  top: calc(100vw * (350 / 1080));
  bottom: calc(100vw * (120 / 1080));
  left: 0;
  right: 0;
}

.prize-description {
  font-family: "MyriadPro-SemiBold";
  font-size: calc(100vw * (40 / 1080));
  margin: 5px 10px 0px;
}

.description-text {
  font-family: "MyriadPro-Regular";
  font-size: 0.9em;
}

.prize-details {
  font-family: "MyriadPro-SemiBold";
  font-size: calc(100vw * (39 / 1080));
  margin: 5px 10px 0px;
}
.details-text {
  font-family: "MyriadPro-Regular";
  font-size: 0.9em;
}

.details-text.list {
  height: calc(100vw * (230 / 1080));
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  width: calc(100vw * (817 / 1080));
  margin: 0;
}

@media screen and (min-device-width: 374px) {
  .inventory-dropdown {
    clip-path: inset(calc(100vw * (975 / 1920)) 0 0 0);
  }
}

@media screen and (min-device-width: 536px) {
  .inventory-card {
    height: calc(536px * (760 / 1920));
  }

  .inventory-background {
    height: calc(536px * (560 / 1920));
  }

  .invention-wrapper {
    height: calc(536px * (575 / 1920));
    width: calc(536px * (575 / 1920));
  }

  .invention-pieces-wrapper {
    top: calc(536px * (250 / 1920));
    bottom: calc(536px * (30 / 1920));
    left: calc(536px * (565 / 1920));
    right: calc(536px * (22 / 1080));
  }

  .invention-pieces-title {
    top: calc(536px * (162.5 / 1920));
    font-size: calc(536px * (60 / 1920));
  }

  .invention-title {
    font-size: calc(536px * (125 / 1920));
  }

  .invention-piece {
    height: calc(536px * (215 / 1920));
    width: calc(536px * (215 / 1920));
  }

  .invention-text {
    font-size: calc(536px * (80 / 1920));
    bottom: calc(536px * (50 / 1920));
  }

  .inventory-dropdown {
    height: calc(536px * (962 / 1080));
    clip-path: inset(calc(536px * (960 / 1920)) 0 0 0);
  }

  .prize-image {
    top: calc(-536px * (14 / 1080));
  }

  .details-text.list {
    width: calc(536px * (817 / 1080));
    height: calc(536px * (230 / 1080));
  }

  .prize-wrapper {
    top: calc(536px * (350 / 1080));
    bottom: calc(536px * (120 / 1080));
  }

  .prize-title {
    top: calc(536px * (191 / 1080));
    font-size: calc(536px * (70 / 1080));
  }

  .prize-subtitle {
    top: calc(536px * (291 / 1080));
    font-size: calc(536px * (53 / 1080));
  }
  .prize-description {
    font-size: calc(536px * (40 / 1080));
  }
  .prize-details {
    font-size: calc(536px * (39 / 1080));
  }
  .dropdown-footer-wrapper {
    font-size: calc(536px * (48 / 1080));
    height: calc(536px * (116 / 1080));
  }
}
</style>