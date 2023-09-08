<template>
  <div class="play-container">
    <div v-if="getAccessToken !== ''">
      <span class="drawer-text">Collection</span>

      <trivia-card ref="triviaCard" :invention_piece="inventionPiece" @insufficientFunds="$emit('insufficientFunds')"/>
      <drawer ref="drawer" :collection="collection" @useSavedCard="useSavedCard($event)" />

      <router-link to="Inventory">
        <button ref="inventoryBtn" class="inventory-btn"></button>
        <span class="inventory-btn-text">Inventory</span>
      </router-link>
      <router-link to="/Social/Collect">
        <button ref="socialBtn" class="social-btn"></button>
        <span class="social-btn-text">Social</span>
      </router-link>
      <router-link to="/Objectives/Daily">
        <button ref="objectivesBtn" class="objectives-btn"></button>
        <span class="objectives-btn-text">Objectives</span>
      </router-link>
      <router-link to="/Codex/PlayerStats">
        <button ref="codexBtn" class="codex-btn"></button>
        <span class="codex-btn-text">Codex</span>
      </router-link>
      <button ref="drawCardBtn" class="draw-card-btn" @click="$refs.drawCardModal.playAnimation()"></button>
    </div>
    <div v-if="getAccessToken === ''">
      <router-link to="SignUp">Sign Up</router-link>or
      <router-link to="Login">Login</router-link>
    </div>
    <draw-card-modal ref="drawCardModal" @continue="drawCard" />
  </div>
</template>

<script>
import SignUp from "./SignUp";
import TriviaCard from "./trivia-card";
import Drawer from "./Drawer";
import DrawCardModal from "./modals/draw-card-modal";
import { mapGetters, mapActions } from "vuex";

const api = require("../api");

export default {
  name: "Play",
  components: {
    SignUp,
    TriviaCard,
    Drawer,
    DrawCardModal
  },
  data() {
    return {
      collection: {},
      inventionPiece: {}
    };
  },
  async created() {
    this.inventionPiece = this.getRandomReward();
    await this.parseInventory();
  },
  computed: {
    ...mapGetters(["getAccessToken", "getUser", "getInventory", "getSettings"])
  },
  methods: {
    ...mapActions(["logout"]),
    async drawCard() {
      // this.$refs.drawCardModal.playAnimation();
      if (this.getUser.power === 0) {
        this.$emit("insufficientFunds");
      } else {
        this.inventionPiece = this.getRandomReward();
        this.shiftZIndexes();
        await this.$refs.triviaCard.drawCard("DRAW_CARD");
        this.$store.commit("SET_OBJECTIVE_CACHEFIRST", false);
        this.$store.commit("SET_PLAYERSTATS_CACHEFIRST", false);
      }
    },
    shiftZIndexes() {
      this.$refs.triviaCard.shiftZIndex(1110);
    },
    async useSavedCard(invention_piece) {
      if (this.getUser.power === 0) {
        this.$emit("insufficientFunds");
      } else {
        let response = await api.default.useSavedCard(
          invention_piece.invention
        );
        this.inventionPiece = invention_piece;
        this.shiftZIndexes();
        this.$refs.triviaCard.drawCard("USE_SAVED_CARD");
      }
    },
    async parseInventory() {
      let inventory = await this.$store.dispatch("getInventory");
      let saved_cards = inventory.saved_cards;
      this.collection = saved_cards;
    },
    getRandomReward() {
      // 1-5 inventions, 1-3 pieces from that invention
      let invention_piece = {
        invention: (5 * Math.random()) << 0,
        piece: (3 * Math.random()) << 0
      };

      return invention_piece;
    }
  }
};
</script>

<style scoped>
button:focus {
  outline: 0;
}

.draw-card-btn {
  background: url(../assets/btn_DrawNewCard_Default.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;

  position: absolute;
  top: calc(var(--inner-height) * (1080 / 1920));
  left: calc(100% * (((1080 - 411) / 2) / 1080));

  height: calc(var(--inner-height) * (114 / 1920));
  width: calc(100% * (411 / 1080));

  /* border-radius: 13%; */
  border-width: 0;
  box-shadow: 0 4px 8px 0 rgba(204, 202, 202, 0.2),
    0 6px 20px 0 rgba(0, 0, 0, 0.19);

  z-index: 1001;
}

.draw-card-btn:active {
  background: url(../assets/btn_DrawNewCard_Selected.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

/* .draw-card-btn:focus {
  outline: 0;
} */

@font-face {
  font-family: Babas-Regular;
  src: url(../assets/Bebas-Regular.otf);
}

.drawer-text {
  position: absolute;
  right: 0.5%;
  top: calc(100vh * (210 / 1920));

  z-index: 1001;
  font-size: 3.4vw;

  color: black;
}

@media screen and (min-device-width: 526px) {
  .drawer-text {
    position: absolute;
    right: 0.5%;
    top: calc(100vh * (210 / 1920));

    z-index: 1001;
    font-size: calc(526px * (37.5 / 1080));

    color: black;
  }
}

.play-container {
  position: relative;

  height: calc(var(--inner-height) * ((1920 - 372) / 1920));
  width: 100%;

  font-family: "Babas-Regular";
  text-align: center;

  z-index: 800;
}

.card {
  width: 100%;
  height: 100%;
  /* transition: transform 1s; */
  transform-style: preserve-3d;
  cursor: pointer;
  position: relative;
}

.card.is-flipped {
  transition: transform 2s;
  transform: rotateY(360deg);
}

.card.full-flip-part-1 {
  transition: transform 5s;
  transform: scale(0.66) rotateY(180deg);
}

.card.full-flip-part-2 {
  transition: transform 5s;
  transform: scale(1.5) rotateY(180deg);
}

.card__face {
  position: absolute;
  width: 100%;
  height: 100%;
  line-height: 260px;
  color: white;
  text-align: center;
  font-weight: bold;
  font-size: 40px;
  backface-visibility: hidden;
}

.social-btn {
  background: url(../assets/btn_Social_Default.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;

  position: absolute;
  bottom: calc(var(--inner-height) * (86 / 1920));
  left: calc(100% * (54 / 1080));

  height: calc(100% * (120 / 1080));
  width: calc(100% * (150 / 1080));

  border-radius: 50%;
  border-width: 0;
  /* box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19); */

  z-index: 1001;
}

.social-btn-text {
  position: absolute;
  bottom: calc(var(--inner-height) * (34 / 1920));
  left: calc(100% * (83 / 1080));

  z-index: 1001;
  font-size: 3.7vw;

  color: black;
}

.social-btn:active {
  background: url(../assets/btn_Social_Selected.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

/* .social-btn:focus {
  outline: 0;
} */

.inventory-btn {
  background: url(../assets/btn_Inventory_Default.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;

  position: absolute;
  bottom: calc(var(--inner-height) * (86 / 1920));
  left: calc(100% * (327 / 1080));

  height: calc(100% * (120 / 1080));
  width: calc(100% * (160 / 1080));

  border-radius: 13%;
  border-width: 0;
  /* box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19); */

  z-index: 1001;
}

.inventory-btn-text {
  position: absolute;
  bottom: calc(var(--inner-height) * (34 / 1920));
  left: calc(100% * (334 / 1080));

  z-index: 1001;
  font-size: 3.7vw;

  color: black;
}

.inventory-btn:active {
  background: url(../assets/btn_Inventory_Selected.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

/* .inventory-btn:focus {
  outline: 0;
} */

.objectives-btn {
  background: url(../assets/btn_Objectives_Default.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;

  position: absolute;
  bottom: calc(var(--inner-height) * (86 / 1920));
  right: calc(100% * (327 / 1080));

  height: calc(100% * (120 / 1080));
  width: calc(100% * (160 / 1080));

  border-radius: 13%;
  border-width: 0;
  /* box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19); */

  z-index: 1001;
}

.objectives-btn-text {
  position: absolute;
  bottom: calc(var(--inner-height) * (34 / 1920));
  right: calc(100% * (331 / 1080));

  z-index: 1001;
  font-size: 3.7vw;

  color: black;
}

.objectives-btn:active {
  background: url(../assets/btn_Objectives_Selected.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

/* .objectives-btn:focus {
  outline: 0;
} */

.codex-btn {
  background: url(../assets/btn_Codex_Default.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;

  position: absolute;
  bottom: calc(var(--inner-height) * (86 / 1920));
  right: calc(100% * (54 / 1080));

  height: calc(100% * (120 / 1080));
  width: calc(100% * (150 / 1080));

  border-radius: 50%;
  border-width: 0;
  /* box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19); */

  z-index: 1001;
}

.codex-btn-text {
  position: absolute;
  bottom: calc(var(--inner-height) * (34 / 1920));
  right: calc(100% * (85 / 1080));

  z-index: 1001;
  font-size: 3.7vw;

  color: black;
}

.codex-btn:active {
  background: url(../assets/btn_Codex_Selected.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

@media screen and (min-device-width: 526px) {
  .codex-btn-text {
    position: absolute;
    bottom: calc(var(--inner-height) * (34 / 1920));
    right: calc(100% * (85 / 1080));

    z-index: 1001;
    font-size: calc(526px * (42 / 1080));

    color: black;
  }
  .objectives-btn-text {
    position: absolute;
    bottom: calc(var(--inner-height) * (34 / 1920));
    right: calc(100% * (331 / 1080));

    z-index: 1001;
    font-size: calc(526px * (42 / 1080));

    color: black;
  }
  .inventory-btn-text {
    position: absolute;
    bottom: calc(var(--inner-height) * (34 / 1920));
    left: calc(100% * (334 / 1080));

    z-index: 1001;
    font-size: calc(526px * (42 / 1080));

    color: black;
  }
  .social-btn-text {
    font-size: calc(526px * (42 / 1080));
  }
}
</style>
