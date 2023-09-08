<template>
  <div class="challenges-container" ref="challengesContainer">
    <objective-card
      v-for="(objective_key, index) in Object.keys(this.objectives.challenges)"
      :key="index"
      :title="objective_key"
      :objective="objectives.challenges[objective_key]"
      :sectionTitle="sectionTitle"
      :ref="`${objective_key}`"
      @playClaimed="$emit('playClaimed')"
      @insufficientFunds="$emit('insufficientFunds')"
      @onClaimObjective="onClaimObjective(objective_key)"
    />
    <div
      class="addPadding"
      style="height: calc((var(--inner-height) * (300 / 1920))/2); width:100%;"
    ></div>
    <claim-objective-modal ref="claimObjectiveModal" @continue="onModalContinue()" />
  </div>
</template>

<script>
import ObjectiveCard from "./objective-card";
import ClaimObjectiveModal from "../modals/claim-objective-modal";

const bodyScrollLock = require("body-scroll-lock");

export default {
  name: "ChallengesView",
  components: {
    ObjectiveCard,
    ClaimObjectiveModal
  },
  data() {
    return {
      sectionTitle: "challenges",
      objectives: {
        'challenges': {}
      },
      objectiveKey: ''
    };
  },
  async created() {
    await this.getObjectives();
  },
  mounted() {
    bodyScrollLock.disableBodyScroll(this.$el);
  },
  updated() {
    // run something after dom has changed by vue
    bodyScrollLock.disableBodyScroll(this.$refs.challengesContainer);
  },
  methods: {
    async getObjectives() {
      let objectives = await this.$store.dispatch("getObjectives");
      if (objectives) this.objectives = objectives;
    },
    onClaimObjective(objective_key) {
      this.objectiveKey = objective_key;
      this.$refs.claimObjectiveModal.playAnimation();
    },
    onModalContinue() {
      this.$refs[this.objectiveKey][0].claimReward()
    }
  }
};
</script>

<style scoped>
.challenges-container {
  background: url(../../assets/BackgroundBlackout.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;

  position: relative;
  height: calc(var(--inner-height) * (1270 / 1920));

  width: 100%;

  overflow-y: scroll;
  overflow-x: hidden;
}
</style>
