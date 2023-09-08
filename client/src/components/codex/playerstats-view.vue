<template>
  <div class="playerstats-container">
    <div class="wrapper">
      <div class="header-text">PLAYER STATISTICS</div>
      <picture>
        <img class="line-img" src="../../assets/PNG/Codex_Line.png" type="image/png" />
      </picture>
      <div class="playerstats-wrapper">
        <dl class="list-wrapper">
          <div>
            <dt>Total Trivia Cards Drawn</dt>
            <dd>{{playerStats.triviaCards.drawn}}</dd>
          </div>
          <div>
            <dt>Total Trivia Questions Answered Correctly</dt>
            <dd>{{playerStats.triviaCards.correct}}</dd>
          </div>
          <div>
            <dt>Total Trivia Questions Answered Incorrectly</dt>
            <dd>{{playerStats.triviaCards.incorrect}}</dd>
          </div>
          <div>
            <dt>Total Trivia Cards Claimed from Users</dt>
            <dd>{{playerStats.triviaCards.claimed}}</dd>
          </div>
          <div>
            <dt>Total Coins Spent</dt>
            <dd>{{playerStats.coins.spent}}</dd>
          </div>
          <div>
            <dt>Total Daily Objectives Completed</dt>
            <dd>{{playerStats.objectives.daily}}</dd>
          </div>
          <div>
            <dt>Total Weekly Objectives Completed</dt>
            <dd>{{playerStats.objectives.weekly}}</dd>
          </div>
          <div>
            <dt>Total Challenges Completed</dt>
            <dd>{{playerStats.objectives.challenges}}</dd>
          </div>
          <div>
            <dt>Total Invention Pieces Collected</dt>
            <dd>{{playerStats.invPieces.collected}}</dd>
          </div>
          <div>
            <dt>Total of All Inventions Built</dt>
            <dd>{{totalAllInventionsBuilt}}</dd>
          </div>
          <div>
            <dt>Total Ornithopters Built</dt>
            <dd>{{playerStats.invPieces.ornithopter}}</dd>
          </div>
          <div>
            <dt>Total Aerial Screws Built</dt>
            <dd>{{playerStats.invPieces.screw}}</dd>
          </div>
          <div>
            <dt>Total Robotic Knights Built</dt>
            <dd>{{playerStats.invPieces.knight}}</dd>
          </div>
          <div>
            <dt>Total Printing Press Built</dt>
            <dd>{{playerStats.invPieces.press}}</dd>
          </div>
          <div>
            <dt>Total Self-Propelled Cart Built</dt>
            <dd>{{playerStats.invPieces.cart}}</dd>
          </div>
        </dl>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

const bodyScrollLock = require('body-scroll-lock')

export default {
  name: "PlayerStatsView",
  data() {
    return {
      playerStats: {}
    };
  },
  async created() {
    this.playerStats = await this.getPlayerStats();
  },
  mounted() {
    bodyScrollLock.disableBodyScroll(this.$el);
  },
  computed: {
    totalAllInventionsBuilt() {
      return (
        parseInt(this.playerStats.invPieces.ornithopter) +
        parseInt(this.playerStats.invPieces.screw) +
        parseInt(this.playerStats.invPieces.knight) +
        parseInt(this.playerStats.invPieces.press) +
        parseInt(this.playerStats.invPieces.cart)
      );
    }
  },
  methods: {
    ...mapActions(["getPlayerStats"])
  }
};
</script>

<style scoped>
@font-face {
  font-family: MyriadPro-Regular;
  src: url(../../assets/MYRIADPRO-REGULAR.woff);
}

.playerstats-container {
  position: relative;
  top: 0;
  left: 0;
  z-index: 1;

  height: calc(var(--inner-height) * (1270 / 1920));
  width: 100%;

  overflow-y: scroll;
}

.wrapper {
  padding-bottom: 20%;
}

.header-text {
  font-family: "Babas-Regular";
  font-size: calc(100vw * (65 / 1080));
  margin: 12px 0 0 24px;
}

.line-img {
  display: block;
  margin: auto;
  width: calc(100vw * (950 / 1080));
}

.playerstats-wrapper {
  font-family: "Babas-Regular";
  font-size: calc(100vw * (40 / 1080));
  margin: 7px 24px 0 24px;
}

/* https://www.bennadel.com/blog/3622-styling-a-movie-cast-list-using-a-definition-list-and-css-flexbox.htm */
dl.list-wrapper {
  width: 100%;
  margin: 0;
}
dl.list-wrapper div {
  /* Setup the DT (character) and DD (cast) items as a flexible layout. */
  display: flex;
  margin: 0.5px 0px 0px 0px;
}
dl.list-wrapper dt {
  /*
        Setup the DT element as a NESTED flexible layout. This will control the
        IMPLICIT TEXT element (character) and the :after pseudo-element (dots)
        layouts.
    */
  display: flex;
  /* Setup the DT (character) element to grow and take-up space. */
  flex: 1 1 auto;
  margin: 0px 0px 0px 0px;
}
dl.list-wrapper dt:after {
  border-bottom: 2px dotted #787878;
  content: "";
  /*
        Setup the pseudo-element (dots) to grow and take-up space. This will fill
        the white-space with "dots" because it growing inside of another layout
        which is also growing.
    */
  flex: 1 1 auto;
  margin: 0px 5px 5px 5px;
}
dl.list-wrapper dd {
  /* Setup the DD (cast) element to shrink, allow for dots to fill space. */
  flex: 0 1 auto;
  margin: 0px 0px 0px 0px;
  font-family: "MyriadPro-Regular";
  font-size: calc(100vw * (42 / 1080));
}

@media screen and (min-device-width: 536px) {
  .header-text {
    font-size: calc(536px * (65 / 1080));
  }
  .playerstats-wrapper {
    font-size: calc(536px * (40 / 1080));
  }
  dl.list-wrapper dd {
    font-size: calc(536px * (42 / 1080));
  }
  .line-img {
    display: block;
    margin: auto;
    width: calc(536px * (950 / 1080));
  }
}
</style>
