<template>
  <div class="card-container" ref="container">
    <div class="deck"></div>
    <div class="scene scene--card" ref="card">
      <div class="card card-animation">
        <div class="card__face card__face--front"></div>
        <div class="card__face card__face--back--model">
          <div class="model-background" :class="[inventionPieceToBackground]"></div>
        </div>
        <div class="card__face card__face--back">
          <div
            class="card-invention-piece"
          >{{`${inventionPieceToString[0]}: ${inventionPieceToString[1]}`}}</div>
          <div class="card-invention-name">{{inventionPieceToString[0]}}</div>
          <div class="card-question">
            <span class="question-text">{{question}}</span>
          </div>
          <div
            class="card-answer card-answer-a"
            @click="submitAnswer(responses[0])"
          >{{responses[0]}}</div>
          <button class="card-a-btn" @click="submitAnswer(responses[0])"></button>
          <div
            class="card-answer card-answer-b"
            @click="submitAnswer(responses[1])"
          >{{responses[1]}}</div>
          <button class="card-b-btn" @click="submitAnswer(responses[1])"></button>
          <div
            class="card-answer card-answer-c"
            @click="submitAnswer(responses[2])"
          >{{responses[2]}}</div>
          <button class="card-c-btn" @click="submitAnswer(responses[2])"></button>
          <div
            class="card-answer card-answer-d"
            @click="submitAnswer(responses[3])"
          >{{responses[3]}}</div>
          <button class="card-d-btn" @click="submitAnswer(responses[3])"></button>

          <button class="card-discard-btn" @click="$refs.discardCardModal.playAnimation()"></button>
        </div>
      </div>
    </div>
    <div class="overlay" ref="overlay">
      <div class="pip-wrapper">
        <picture>
          <source srcset="../assets/JPEG2000/AttemptPip.jp2" type="image/jp2" />
          <img
            class="attempt-pip-idle attempt-pip-1"
            src="../assets/PNG/AttemptPip.png"
            alt="AttemptPip"
          />
        </picture>
        <picture>
          <source srcset="../assets/JPEG2000/AttemptPip.jp2" type="image/jp2" />
          <img
            class="attempt-pip-idle attempt-pip-2"
            src="../assets/PNG/AttemptPip.png"
            alt="AttemptPip"
          />
        </picture>
        <picture>
          <source srcset="../assets/JPEG2000/AttemptPip.jp2" type="image/jp2" />
          <img
            class="attempt-pip-idle attempt-pip-3"
            src="../assets/PNG/AttemptPip.png"
            alt="AttemptPip"
          />
        </picture>
        <picture>
          <source srcset="../assets/JPEG2000/AttemptPip.jp2" type="image/jp2" />
          <img
            class="attempt-pip-idle attempt-pip-4"
            src="../assets/PNG/AttemptPip.png"
            alt="AttemptPip"
          />
        </picture>
        <picture>
          <source srcset="../assets/JPEG2000/AttemptPip.jp2" type="image/jp2" />
          <img
            class="attempt-pip-idle attempt-pip-5"
            src="../assets/PNG/AttemptPip.png"
            alt="AttemptPip"
          />
        </picture>
        <picture>
          <source srcset="../assets/JPEG2000/AttemptPip.jp2" type="image/jp2" />
          <img
            class="attempt-pip-idle attempt-pip-6"
            src="../assets/PNG/AttemptPip.png"
            alt="AttemptPip"
          />
        </picture>

        <picture>
          <source srcset="../assets/JPEG2000/AttemptPip_Empty.jp2" type="image/jp2" />
          <img
            class="attempt-pip-remove attempt-pip-1"
            src="../assets/PNG/AttemptPip_Empty.png"
            alt="AttemptPip"
          />
        </picture>
        <picture>
          <source srcset="../assets/JPEG2000/AttemptPip_Empty.jp2" type="image/jp2" />
          <img
            class="attempt-pip-remove attempt-pip-2"
            src="../assets/PNG/AttemptPip_Empty.png"
            alt="AttemptPip"
          />
        </picture>
        <picture>
          <source srcset="../assets/JPEG2000/AttemptPip_Empty.jp2" type="image/jp2" />
          <img
            class="attempt-pip-remove attempt-pip-3"
            src="../assets/PNG/AttemptPip_Empty.png"
            alt="AttemptPip"
          />
        </picture>
        <picture>
          <source srcset="../assets/JPEG2000/AttemptPip_Empty.jp2" type="image/jp2" />
          <img
            class="attempt-pip-remove attempt-pip-4"
            src="../assets/PNG/AttemptPip_Empty.png"
            alt="AttemptPip"
          />
        </picture>
        <picture>
          <source srcset="../assets/JPEG2000/AttemptPip_Empty.jp2" type="image/jp2" />
          <img
            class="attempt-pip-remove attempt-pip-5"
            src="../assets/PNG/AttemptPip_Empty.png"
            alt="AttemptPip"
          />
        </picture>
        <picture>
          <source srcset="../assets/JPEG2000/AttemptPip_Empty.jp2" type="image/jp2" />
          <img
            class="attempt-pip-remove attempt-pip-6"
            src="../assets/PNG/AttemptPip_Empty.png"
            alt="AttemptPip"
          />
        </picture>
      </div>
    </div>
    <div class="attempts-remaining">
      <div class="attempts-remaining-text">{{attempts}}</div>
    </div>
    <reward-mg ref="rewardMg" @continue="fadeOverlay" />
    <no-attempts-modal ref="noAttemptsModal" @continue="clearDrawnCard" />
    <discard-card-modal ref="discardCardModal" @continue="discardCard" />
    <model-background :invention_piece="invention_piece" ref="model" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import ModelBackground from "./model-background";
import NoAttemptsModal from "../components/modals/no-attempts-modal";
import DiscardCardModal from "../components/modals/discard-card-modal";
import RewardMg from "./play/correct-mg";

const api = require("../api");

export default {
  name: "TriviaCard",
  props: {
    invention_piece: {}
  },
  components: {
    ModelBackground,
    NoAttemptsModal,
    DiscardCardModal,
    RewardMg
  },
  data() {
    return {
      question_id: "",
      question: "",
      responses: [],
      attempts: 6
      // invention_piece: ""
    };
  },
  created() {
    // this.invention_piece = !this.ip.invention ? this.ip : this.getRandomReward();
  },
  computed: {
    inventionPieceToString() {
      let names = [
        [
          ["Ornithopter", "Body"],
          ["Ornithopter", "Wings"],
          ["Ornithopter", "Tail"]
        ],
        [
          ["Aerial Screw", "Rotary Wing"],
          ["Aerial Screw", "Mast"],
          ["Aerial Screw", "Platform"]
        ],
        [
          ["Robotic Knight", "Mechanical Parts"],
          ["Robotic Knight", "Upper Body"],
          ["Robotic Knight", "Lower Body"]
        ],
        [
          ["Printing Press", "Pulley"],
          ["Printing Press", "Platen"],
          ["Printing Press", "Type Bed"]
        ],
        [
          ["Self-Propelled Cart", "Wheels and Axle"],
          ["Self-Propelled Cart", "Frame"],
          ["Self-Propelled Cart", "Mechanical Parts"]
        ]
      ];
      return names[this.invention_piece.invention][this.invention_piece.piece];
    },
    inventionPieceToBackground() {
      let invention_piece = this.invention_piece;
      let bg_class = "";

      switch (invention_piece.invention) {
        case 0:
          bg_class = "ornithopter-background";
          break;
        case 1:
          bg_class = "aerialscrew-background";
          break;
        case 2:
          bg_class = "roboticknight-background";
          break;
        case 3:
          bg_class = "printingpress-background";
          break;
        case 4:
          bg_class = "selfpropelledcart-background";
          break;
      }

      return bg_class;
    }
  },
  methods: {
    discardCard() {
      // this.$refs.discardCardModal.playAnimation();
      this.fadeCardAnimation();
      this.shiftZIndex(1000);
    },
    shiftZIndex(zIndex) {
      this.$refs.card.style["z-index"] = zIndex;
      this.$refs.overlay.style["z-index"] = zIndex - 1;
    },
    ...mapActions(["updatePower", "getCard", "checkAnswer"]),
    redrawCardAnimation() {
      // add animation to play it, remove it to ensure that it can run again by readding it
      var card = document.querySelector(".card");
      var attemptsRemainingModal = document.querySelector(
        ".attempts-remaining"
      );
      this.$refs.model.toggleDisplay();

      card.classList.remove("redraw-card-animation");
      attemptsRemainingModal.classList.remove(
        "show-attempts-remaining-animation"
      );

      // no idea why this fixes the animation
      void card.offsetWidth;
      void attemptsRemainingModal.offsetWidth;

      card.classList.add("redraw-card-animation");
      attemptsRemainingModal.classList.add("show-attempts-remaining-animation");

      setTimeout(() => {
        this.$refs.model.toggleDisplay();
      }, 1500);
    },
    drawCardAnimation() {
      var card = document.querySelector(".card");
      var overlay = document.querySelector(".overlay");

      card.classList.remove("draw-card-animation");
      card.classList.remove("destroy-card-animation");
      card.classList.remove("fade-card-animation");
      overlay.classList.remove("show-overlay-animation");
      overlay.classList.remove("hide-overlay-animation");

      void card.offsetWidth;
      void overlay.offsetWidth;

      card.classList.add("draw-card-animation");
      overlay.classList.add("show-overlay-animation");

      setTimeout(() => {
        this.$refs.model.toggleDisplay();
      }, 1000);
    },
    fadeCardAnimation() {
      var card = document.querySelector(".card");
      var overlay = document.querySelector(".overlay");

      card.classList.remove("fade-card-animation");
      overlay.classList.remove("hide-overlay-animation");

      void card.offsetWidth;
      void overlay.offsetWidth;

      card.classList.add("fade-card-animation");
      overlay.classList.add("hide-overlay-animation");
      card.classList.remove("draw-card-animation");
      overlay.classList.remove("show-overlay-animation");
      card.classList.remove("redraw-card-animation");

      this.$refs.model.toggleDisplay();
    },
    async drawCard(action) {
      this.$store.commit("SET_IS_WAITING_ON_API", true);
      // potential optimization here with promise logic
      let response = await this.updatePower(action);
      this.$store.commit("SET_IS_WAITING_ON_API", false);
      if (response.status === 200) {
        await this.fetchCard();
        this.resetPips();
        this.drawCardAnimation();
      }
      else if (response.status === 401) {
        this.$emit('insufficientFunds')
      }
    },
    destroyCardAnimation() {
      var card = document.querySelector(".card");
      // var overlay = document.querySelector(".overlay");

      this.toggleCardStyles();

      var cardBack = document.querySelector(".card__face--front");
      // cardBack.style.opacity = 0;

      card.classList.remove("destroy-card-animation");
      // overlay.classList.remove("fade-in-overlay");

      // no idea why this fixes the animation
      void card.offsetWidth;
      // void overlay.offsetWidth;

      card.classList.add("destroy-card-animation");
      // overlay.classList.add("hide-overlay-animation");

      setTimeout(() => {
        this.toggleCardStyles();
        this.clearCurrentCard();
      }, 450);

      card.classList.remove("draw-card-animation");
      // overlay.classList.remove("show-overlay-animation");
      card.classList.remove("redraw-card-animation");
      this.shiftZIndex(1000);
      this.$refs.model.toggleDisplay();
    },
    toggleCardStyles() {
      var cardFaces = document.getElementsByClassName("card__face");
      var modelBackground = document.getElementsByClassName("model-background");

      for (var i = 0; i < cardFaces.length; i++) {
        if (cardFaces[i].style.backfaceVisibility === "visible")
          cardFaces[i].style.backfaceVisibility = "hidden";
        else cardFaces[i].style.backfaceVisibility = "visible";
      }

      if (modelBackground[0].style["z-index"] === "0")
        modelBackground[0].style["z-index"] = -10;
      else modelBackground[0].style["z-index"] = 0;
    },
    fadeOverlay() {
      var overlay = document.querySelector(".overlay");
      overlay.classList.remove("fade-in-overlay");
      overlay.classList.add("hide-overlay-animation");
      overlay.classList.remove("show-overlay-animation");
    },
    async submitAnswer(response) {
      this.attempts--;
      if (this.attempts === 0) {
        this.$refs.noAttemptsModal.playAnimation();
      } else {
        this.$store.commit("SET_IS_WAITING_ON_API", true);
        let res = await this.checkAnswer({
          id: this.questionId,
          response: response,
          invention_piece: this.invention_piece
        });
        if (res.isCorrect) {
          this.$store.commit("SET_IS_WAITING_ON_API", false);
          this.$store.commit("SET_OBJECTIVE_CACHEFIRST", false);
          this.$refs.rewardMg.playAnimation();
          this.clearCurrentCard();
          this.destroyCardAnimation();
        } else {
          await this.fetchCard();
          this.$store.commit("SET_IS_WAITING_ON_API", false);
          this.destroyPip();
          this.redrawCardAnimation();
        }
      }
    },
    clearDrawnCard() {
      this.$refs.noAttemptsModal.playAnimation();
      this.clearCurrentCard();
      this.fadeCardAnimation();
      this.shiftZIndex(1000);
    },
    destroyPip() {
      let curr_pip_idle_query = `.attempt-pip-idle.attempt-pip-${this.attempts +
        1}`;
      let curr_pip_remove_query = `.attempt-pip-remove.attempt-pip-${this
        .attempts + 1}`;

      let curr_pip_idle = document.querySelector(curr_pip_idle_query);
      let curr_pip_remove = document.querySelector(curr_pip_remove_query);

      curr_pip_remove.style.display = "inline";
      // curr_pip_remove.play();
      curr_pip_idle.style.display = "none";
    },
    resetPips() {
      for (let i = 1; i < 7; i++) {
        let curr_pip_idle_query = `.attempt-pip-idle.attempt-pip-${i}`;
        let curr_pip_remove_query = `.attempt-pip-remove.attempt-pip-${i}`;

        let curr_pip_idle = document.querySelector(curr_pip_idle_query);
        let curr_pip_remove = document.querySelector(curr_pip_remove_query);

        curr_pip_idle.style.display = "inline";
        curr_pip_remove.style.display = "none";
      }
    },
    shuffleResponses(array) {
      var currentIndex = array.length,
        temporaryValue,
        randomIndex;

      // While there remain elements to shuffle...
      while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }

      return array;
    },
    clearCurrentCard() {
      this.question_id = "";
      this.question = "";
      this.responses = [];
      this.attempts = 6;
    },
    async fetchCard() {
      let trivia_res = await this.getCard();
      this.questionId = trivia_res.trivia.id;
      this.question = trivia_res.trivia.question.Question;
      this.responses = this.shuffleResponses(
        trivia_res.trivia.question.Responses
      );
    },
    async saveCard() {
      let response = await api.default.saveCard(this.getRandomReward());
      if (response.status === 200) {
        // console.log("You saved a card to your inventory!");
        // prevent user from answering the question while saving
        this.clearCurrentCard();
      } else {
        // console.log("Something went wrong while saving your card :(");
      }
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
@font-face {
  font-family: Babas-Regular;
  src: url(../assets/Bebas-Regular.otf);
}

@font-face {
  font-family: MyriadPro-Regular;
  src: url(../assets/MYRIADPRO-REGULAR.woff);
}

.card-container {
  z-index: 1000;
}

.overlay {
  background: black;

  opacity: 0;

  position: fixed;
  left: 0;
  top: 0;

  height: var(--inner-height);
  width: 100vw;

  pointer-events: none;

  z-index: 1050;
}

@-webkit-keyframes fade-in-overlay {
  from {
    position: fixed;
    left: 0;
    top: 0;

    height: var(--inner-height);
    width: 100vw;

    pointer-events: none;
    opacity: 0;
  }
  to {
    position: fixed;
    left: 0;
    top: 0;

    height: var(--inner-height);
    width: 100vw;

    pointer-events: none;
    opacity: 1;
  }
}
@keyframes fade-in-overlay {
  from {
    position: fixed;
    left: 0;
    top: 0;

    height: var(--inner-height);
    width: 100vw;

    pointer-events: none;
    opacity: 0;
  }
  to {
    position: fixed;
    left: 0;
    top: 0;

    height: var(--inner-height);
    width: 100vw;

    pointer-events: none;
    opacity: 1;
  }
}

.show-overlay-animation {
  /* position: relative; */
  -webkit-animation: fade-in-overlay 1s ease forwards;
  animation: fade-in-overlay 1s ease forwards;
}

@-webkit-keyframes fade-out-overlay {
  from {
    position: fixed;
    left: 0;
    top: 0;

    height: var(--inner-height);
    width: 100vw;

    pointer-events: none;
    opacity: 1;
  }
  to {
    position: fixed;
    left: 0;
    top: 0;

    height: var(--inner-height);
    width: 100vw;

    pointer-events: none;
    opacity: 0;
  }
}
@keyframes fade-out-overlay {
  from {
    position: fixed;
    left: 0;
    top: 0;

    height: var(--inner-height);
    width: 100vw;

    pointer-events: none;
    opacity: 1;
  }
  to {
    position: fixed;
    left: 0;
    top: 0;

    height: var(--inner-height);
    width: 100vw;

    pointer-events: none;
    opacity: 0;
  }
}

.hide-overlay-animation {
  /* position: relative; */
  -webkit-animation: fade-out-overlay 0.5s ease forwards;
  animation: fade-out-overlay 0.5s ease forwards;
}

.deck {
  background: url(../assets/Deck.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;

  position: absolute;
  top: calc(var(--inner-height) * (153 / 1920));
  left: calc(100% * (((1080 - 927) / 2) / 1080));

  height: calc(var(--inner-height) * (987 / 1920));
  width: calc(100% * (927 / 1080));

  /* z-index: 1000; */
}

/* card animation scene */
.scene {
  position: absolute;
  top: calc(var(--inner-height) * (200 / 1920));
  left: calc(100% * (((1080 - 514) / 2) / 1080));

  height: calc(var(--inner-height) * (824 / 1920));
  width: calc(100% * (514 / 1080));

  perspective: 600px;

  z-index: 1100;
}

.card {
  width: 100%;
  height: 100%;
  transition: transform 1s;
  transform-style: preserve-3d;
  cursor: pointer;
  position: relative;

  /* z-index: 10; */
}

.card__face {
  position: absolute;
  width: 100%;
  height: 100%;
  text-align: left;
  font-family: "Babas-Regular";
  backface-visibility: hidden;
  /* backface-visibility: visible; */
}

.card__face--front {
  background: url(../assets/CardBack.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;

  position: absolute;
}

.card__face--back {
  background: url(../assets/CardFrame.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  transform: rotateY(180deg);

  position: absolute;
}

.model-background {
  -webkit-backface-visibility: hidden;
  -moz-backface-visibility: hidden;
  backface-visibility: hidden;

  transform: rotateY(180deg);

  position: absolute;
  left: calc(5%);
  top: calc(var(--inner-height) * (123 / 1920) / (1607 / 824));

  height: calc(var(--inner-height) * (530 / 1920) / (1023 / 514));
  width: calc(97% * (1000 / 1080));

  z-index: -10;
}

.aerialscrew-background {
  background: url(../assets/BGColor_002.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

.printingpress-background {
  background: url(../assets/BGColor_005.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

.ornithopter-background {
  background: url(../assets/BGColor_001.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

.selfpropelledcart-background {
  background: url(../assets/BGColor_004.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

.roboticknight-background {
  background: url(../assets/BGColor_003.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

.card-invention-piece {
  position: absolute;
  left: calc(100% * (45 / 1080));
  top: calc(var(--inner-height) * (23 / 1920) / (1607 / 824));

  height: calc(var(--inner-height) * (90 / 1920) / (1023 / 514));

  /* TODO: fix font sizing */
  display: flex;
  align-items: center;

  font-size: 11px;
}

.card-invention-name {
  position: absolute;
  left: calc(100% * (45 / 1080));
  top: calc(var(--inner-height) * (649 / 1920) / (1607 / 824));

  height: calc(var(--inner-height) * (58 / 1920) / (1023 / 514));

  line-height: calc(var(--inner-height) * (58 / 1920) / (1023 / 514));

  font-size: 8.5px;
}

.card-question {
  position: absolute;
  left: calc(100% * (50 / 1080));
  right: calc(100% * (55 / 1080));
  top: calc(var(--inner-height) * (715 / 1920) / (1607 / 824));

  line-height: calc(var(--inner-height) * (285 / 1920) / (1023 / 514));
  /* display: flex;
  align-items: center; */
}

.question-text {
  padding: 0 5px;
  font-size: 7px;
  font-family: "MyriadPro-Regular";

  display: inline-block;
  vertical-align: middle;
  line-height: calc(var(--inner-height) * (22 / 1920));
}

.card-answer {
  font-size: 7px;
  font-family: "MyriadPro-Regular";
  display: flex;
  align-items: center;
}

.card-answer-a {
  position: absolute;
  left: calc(100% * (50 / 1080));
  right: calc(100% * (55 / 1080));
  top: calc(var(--inner-height) * (1002 / 1920) / (1607 / 824));

  height: calc(var(--inner-height) * (131 / 1920) / (1023 / 514));
  padding-left: calc(100% * (75 / 1080));

  padding-top: 1%;
}

.card-answer-a:active {
  background: rgba(0, 0, 0, 0.3);
}

.card-answer-b {
  position: absolute;
  left: calc(100% * (50 / 1080));
  right: calc(100% * (55 / 1080));
  top: calc(var(--inner-height) * (1140 / 1920) / (1607 / 824));

  height: calc(var(--inner-height) * (131 / 1920) / (1023 / 514));

  padding-left: calc(100% * (75 / 1080));

  line-height: calc(var(--inner-height) * (131 / 1920) / (1023 / 514));
}

.card-answer-b:active {
  background: rgba(0, 0, 0, 0.3);
}

.card-answer-c {
  position: absolute;
  left: calc(100% * (50 / 1080));
  right: calc(100% * (55 / 1080));
  top: calc(var(--inner-height) * (1278 / 1920) / (1607 / 824));

  height: calc(var(--inner-height) * (131 / 1920) / (1023 / 514));

  padding-left: calc(100% * (75 / 1080));
}

.card-answer-c:active {
  background: rgba(0, 0, 0, 0.3);
}

.card-answer-d {
  position: absolute;
  left: calc(100% * (50 / 1080));
  right: calc(100% * (55 / 1080));
  top: calc(var(--inner-height) * (1416 / 1920) / (1607 / 824));

  height: calc(var(--inner-height) * (131 / 1920) / (1023 / 514));

  padding-left: calc(100% * (75 / 1080));
}

.card-answer-d:active {
  background: rgba(0, 0, 0, 0.3);
}
button {
  border: 0;
  padding: 0;
}

button:focus {
  outline: 0;
}

.card-a-btn {
  background: url(../assets/btn_A_Default.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;

  position: absolute;
  left: calc(100% * ((-22 / 1080) / (1023 / 514)));
  top: calc(var(--inner-height) * ((989 + 24) / 1920) / (1607 / 824));

  height: calc(var(--inner-height) * (120 / 1920) / (1023 / 514));
  width: calc(var(--inner-height) * (120 / 1920) / (1023 / 514));

  z-index: 1400;
}

.card-a-btn:active {
  background: url(../assets/btn_A_Selected.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

.card-b-btn {
  background: url(../assets/btn_B_Default.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;

  position: absolute;
  left: calc(100% * ((-22 / 1080) / (1023 / 514)));
  top: calc(var(--inner-height) * ((1127 + 21) / 1920) / (1607 / 824));

  height: calc(var(--inner-height) * (120 / 1920) / (1023 / 514));
  width: calc(var(--inner-height) * (120 / 1920) / (1023 / 514));

  z-index: 1400;
}

.card-b-btn:active {
  background: url(../assets/btn_B_Selected.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

.card-c-btn {
  background: url(../assets/btn_C_Default.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;

  position: absolute;
  left: calc(100% * ((-22 / 1080) / (1023 / 514)));
  top: calc(var(--inner-height) * ((1263 + 19) / 1920) / (1607 / 824));

  height: calc(var(--inner-height) * (120 / 1920) / (1023 / 514));
  width: calc(var(--inner-height) * (120 / 1920) / (1023 / 514));

  z-index: 1400;
}

.card-c-btn:active {
  background: url(../assets/btn_C_Selected.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

.card-d-btn {
  background: url(../assets/btn_D_Default.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;

  position: absolute;
  left: calc(100% * ((-22 / 1080) / (1023 / 514)));
  top: calc(var(--inner-height) * ((1406 + 12) / 1920) / (1607 / 824));

  height: calc(var(--inner-height) * (120 / 1920) / (1023 / 514));
  width: calc(var(--inner-height) * (120 / 1920) / (1023 / 514));

  z-index: 1400;
}

.card-d-btn:active {
  background: url(../assets/btn_D_Selected.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

.card-discard-btn {
  background: url(../assets/btn_Discard_Default.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;

  position: absolute;
  right: calc(100% * (75 / 1080));
  top: calc(var(--inner-height) * (((1498 + 10) / 1920) / (1607 / 824)));

  height: calc(var(--inner-height) * (119 / 1920) / (1607 / 824));
  width: calc(100% * (240 / 1080));

  z-index: 1400;
}

.card-discard-btn:active {
  background: url(../assets/btn_Discard_Selected.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

.draw-card-btn {
  background: url(../assets/btn_DrawNewCard_Default.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;

  position: absolute;
  top: calc(var(--inner-height) * (1080 / 1920));
  left: calc(100vw * (((1080 - 411) / 2) / 1080));

  height: calc(var(--inner-height) * (114 / 1920));
  width: calc(100vw * (411 / 1080));

  border-radius: 13%;
  border-width: 0;
  box-shadow: 0 4px 8px 0 rgba(204, 202, 202, 0.2),
    0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.draw-card-btn:active {
  background: url(../assets/btn_DrawNewCard_Selected.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

@-webkit-keyframes rotate-180-scale {
  0% {
    transform: rotateY(0deg) scale(1);
  }
  100% {
    transform: rotateY(180deg) scale(calc(1023 / 524));
  }
}

@keyframes rotate-180-scale {
  0% {
    transform: rotateY(0deg) scale(1);
  }
  100% {
    transform: rotateY(180deg) scale(calc(1023 / 524));
  }
}

.draw-card-animation {
  position: relative;
  -webkit-animation: rotate-180-scale 1s ease forwards;
  animation: rotate-180-scale 1s ease forwards;
}

@-webkit-keyframes rotate-360-scale {
  0% {
    transform: rotateY(180deg) scale(calc(1023 / 514), calc(1607 / 824));
  }
  50% {
    transform: rotateY(360deg)
      scale(calc((1023 / 524) * 0.85), calc((1607 / 824) * 0.85));
  }
  100% {
    transform: rotateY(540deg) scale(calc(1023 / 524), calc(1607 / 824));
  }
}

@keyframes rotate-360-scale {
  0% {
    transform: rotateY(180deg) scale(calc(1023 / 514), calc(1607 / 824));
  }
  50% {
    transform: rotateY(360deg)
      scale(calc((1023 / 524) * 0.85), calc((1607 / 824) * 0.85));
  }
  100% {
    transform: rotateY(540deg) scale(calc(1023 / 524), calc(1607 / 824));
  }
}

.redraw-card-animation {
  position: relative;
  -webkit-animation: rotate-360-scale 2s ease forwards;
  animation: rotate-360-scale 2s ease forwards;
}

@-webkit-keyframes scale-fade {
  0% {
    transform: rotateY(540deg) scale(calc(1023 / 514), calc(1607 / 824))
      translateY(0);
    transform-origin: center;

    opacity: 1;
  }
  100% {
    transform: rotateY(540deg) scale(0)
      translateY(calc(var(--inner-height) * ((1920 - 372) / 1920)));
    transform-origin: center calc(var(--inner-height) * ((1920 - 372) / 1920));

    opacity: 0;
  }
}

@keyframes scale-fade {
  0% {
    transform: rotateY(540deg) scale(calc(1023 / 514), calc(1607 / 824))
      translateY(0);
    transform-origin: center;

    opacity: 1;
  }
  100% {
    transform: rotateY(540deg) scale(0)
      translateY(calc(var(--inner-height) * ((1920 - 372) / 1920)));
    transform-origin: center calc(var(--inner-height) * ((1920 - 372) / 1920));

    opacity: 0;
  }
}

.destroy-card-animation {
  position: relative;
  -webkit-animation: scale-fade 0.5s linear;
  animation: scale-fade 0.5s linear;
}

.attempts-remaining {
  background: url(../assets/Modal_RemainingAttempts.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;

  position: fixed;
  left: calc(-1 * 100vw * (540 / 1080));
  top: 10vh;

  height: calc(var(--inner-height) * (1192 / 1920));
  width: calc(100% * (540 / 1080));

  z-index: 50000;
}

.attempts-remaining-text {
  position: absolute;
  top: calc(var(--inner-height) * (366 / 1920));
  left: calc(100% * (351 / 1080));

  height: calc(var(--inner-height) * (156 / 1920));
  width: calc(100% * (350 / 1080));

  color: white;
  font-size: calc(var(--inner-height) * (175 / 1920));
  text-shadow: 1.5px 1.5px black;
}

@keyframes translate-pause-translate {
  0% {
    transform: translateX(0);
  }
  25%,
  75% {
    transform: translateX(
      (calc(100vw * (540 / 1080)) + (100vw * ((1080 - 540) / 2) / 1080))
    );
  }
  100% {
    transform: translateX(calc(100vw + (100vw * (540 / 1080))));
  }
}

.show-attempts-remaining-animation {
  -webkit-animation: translate-pause-translate 1.8s
    cubic-bezier(0.25, 1, 0.75, 0);
  animation: translate-pause-translate 1.8s cubic-bezier(0.25, 1, 0.75, 0);
}

@-webkit-keyframes fade {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

@keyframes fade {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

.fade-card-animation {
  position: relative;
  -webkit-animation: fade 1s ease;
  animation: fade 1s ease;
}

.attempt-pip-idle {
  position: fixed;
  top: calc(var(--inner-height) * (24 / 1920));

  width: calc(100vw * (100 / 1080));

  /* display: none; */
}

.attempt-pip-remove {
  position: fixed;
  top: calc(var(--inner-height) * (24 / 1920));

  width: calc(100vw * (100 / 1080));

  display: none;
}

.attempt-pip-1 {
  left: calc(100vw * (240 / 1080));
}

.attempt-pip-2 {
  left: calc(100vw * (340 / 1080));
}

.attempt-pip-3 {
  left: calc(100vw * (440 / 1080));
}

.attempt-pip-4 {
  left: calc(100vw * (540 / 1080));
}

.attempt-pip-5 {
  left: calc(100vw * (640 / 1080));
}

.attempt-pip-6 {
  left: calc(100vw * (740 / 1080));
}

.pip-wrapper {
  position: relative;
  width: fit-content;
  margin: 0 auto;
  width: calc(100vw * (599 / 1080));
  height: calc(100vw * (149 / 1080));
}

@media screen and (min-device-width: 536px) {
  .model-background {
    -webkit-backface-visibility: visible;
    -moz-backface-visibility: visible;
    backface-visibility: visible;
  }
  .attempt-pip-1 {
    left: calc(536px * (0 / 1080));
  }

  .attempt-pip-2 {
    left: calc(536px * (100 / 1080));
  }

  .attempt-pip-3 {
    left: calc(536px * (200 / 1080));
  }

  .attempt-pip-4 {
    left: calc(536px * (300 / 1080));
  }

  .attempt-pip-5 {
    left: calc(536px * (400 / 1080));
  }

  .attempt-pip-6 {
    left: calc(536px * (500 / 1080));
  }

  .attempt-pip-idle {
    position: absolute;
    top: calc(var(--inner-height) * (24 / 1920));

    width: calc(536px * (100 / 1080));
  }

  .attempt-pip-remove {
    position: absolute;
    top: calc(var(--inner-height) * (24 / 1920));

    width: calc(536px * (100 / 1080));

    display: none;
  }
  .pip-wrapper {
    width: calc(536px * (599 / 1080));
    height: calc(536px * (149 / 1080));
  }
}
</style>