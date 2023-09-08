<template>
  <div class="objective-card">
    <div class="objective-wrapper">
      <picture>
        <!-- <source srcset="../../assets/JPEG2000/ObjectiveFrame.jp2" type="image/jp2"> -->
        <img class="objective-card-bg" src="../../assets/PNG/ObjectiveFrame.png" type="image/png" />
      </picture>
      <div class="objective-title">{{getTitle}}</div>
      <div class="objective-subtitle">{{getDescription}}</div>
      <div
        class="objective-stage"
        v-if="objective.stage !== undefined"
      >{{getStageAsText | capitalize}}</div>
      <div class="objective-reward" :class="[getRewardAsClass]">
        <span class="reward-text">{{getRewardText}}</span>
      </div>

      <progress-bar :progress="progress" :sectionTitle="sectionTitle" />
    </div>
    <div class="claim-wrapper" v-if="checkClaimability" @click="$emit('onClaimObjective')"></div>
  </div>
</template>

<script>
import ProgressBar from "./progress-bar";
import { mapActions } from "vuex";

const api = require("../../api");

export default {
  name: "ObjectiveCard",
  components: {
    ProgressBar
  },
  props: {
    objective: {},
    sectionTitle: "",
    title: ""
  },
  data() {
    return {
      objectiveRequirements: {
        daily: {
          powerUsage: {
            title: "Power Usage",
            description: "Use 2,000 power in 1 day.",
            target: 2000,
            reward: {
              type: "inventionPieces",
              amount: 15
            }
          },
          triviaQuestions: {
            title: "Trivia Questions",
            description: "Correctly answer 4 Trivia Questions in 1 day.",
            target: 4,
            reward: {
              type: "inventionPieces",
              amount: 15
            }
          },
          makingFriends: {
            title: "Making Friends",
            description: "Claim a Random Trivia Card from 2 users.",
            target: 2,
            reward: {
              type: "invention",
              amount: 4
            }
          },
          combine: {
            title: "Combine",
            description: "Build 2 completed inventions.",
            target: 2,
            reward: {
              type: "triviaCards",
              amount: 5
            }
          }
        },
        weekly: {
          powerUsage: {
            title: "Power Usage",
            description: "Use 12,000 power in 7 days.",
            target: 12000,
            reward: {
              type: "invention",
              amount: 12
            }
          },
          triviaQuestions: {
            title: "Trivia Questions",
            description: "Correctly answer 25 Trivia Questions in 7 day.",
            target: 25,
            reward: {
              type: "invention",
              amount: 12
            }
          },
          makingFriends: {
            title: "Making Friends",
            description: "Claim a Random Trivia Card from 12 users.",
            target: 12,
            reward: {
              type: "inventionPieces",
              amount: 45
            }
          },
          combine: {
            title: "Combine",
            description: "Build 12 complete inventions.",
            target: 12,
            reward: {
              type: "invention",
              amount: 10
            }
          }
        },
        challenges: {
          dailyDiscoverer: {
            title: "Daily Discoverer",
            description: {
              prepend: "Complete ",
              append: " Daily Challenge"
            },
            stages: [
              {
                target: 1,
                reward: {
                  type: "triviaCards",
                  amount: 4
                }
              },
              {
                target: 3,
                reward: {
                  type: "triviaCards",
                  amount: 5
                }
              },
              {
                target: 10,
                reward: {
                  type: "triviaCards",
                  amount: 6
                }
              },
              {
                target: 25,
                reward: {
                  type: "triviaCards",
                  amount: 7
                }
              },
              {
                target: 50,
                reward: {
                  type: "triviaCards",
                  amount: 8
                }
              },
              {
                target: 75,
                reward: {
                  type: "triviaCards",
                  amount: 9
                }
              },
              {
                target: 150,
                reward: {
                  type: "triviaCards",
                  amount: 10
                }
              }
            ]
          },
          bigSpender: {
            title: "Big Spender",
            description: {
              prepend: "Spend ",
              append: " Coins"
            },
            stages: [
              {
                target: 1000,
                reward: {
                  type: "inventionPieces",
                  amount: 14
                }
              },
              {
                target: 2500,
                reward: {
                  type: "inventionPieces",
                  amount: 15
                }
              },
              {
                target: 5000,
                reward: {
                  type: "inventionPieces",
                  amount: 16
                }
              },
              {
                target: 8500,
                reward: {
                  type: "inventionPieces",
                  amount: 17
                }
              },
              {
                target: 15000,
                reward: {
                  type: "inventionPieces",
                  amount: 18
                }
              },
              {
                target: 30000,
                reward: {
                  type: "inventionPieces",
                  amount: 19
                }
              },
              {
                target: 50000,
                reward: {
                  type: "inventionPieces",
                  amount: 20
                }
              },
              {
                target: 75000,
                reward: {
                  type: "inventionPieces",
                  amount: 21
                }
              },
              {
                target: 100000,
                reward: {
                  type: "inventionPieces",
                  amount: 22
                }
              },
              {
                target: 130000,
                reward: {
                  type: "inventionPieces",
                  amount: 23
                }
              }
            ]
          },
          weeklyChallenger: {
            title: "Weekly Challenger",
            description: {
              prepend: "Complete ",
              append: " Weekly Challenge"
            },
            stages: [
              {
                target: 1,
                reward: {
                  type: "invention",
                  amount: 4
                }
              },
              {
                target: 2,
                reward: {
                  type: "invention",
                  amount: 5
                }
              },
              {
                target: 4,
                reward: {
                  type: "invention",
                  amount: 6
                }
              },
              {
                target: 8,
                reward: {
                  type: "invention",
                  amount: 7
                }
              },
              {
                target: 12,
                reward: {
                  type: "invention",
                  amount: 8
                }
              },
              {
                target: 16,
                reward: {
                  type: "invention",
                  amount: 9
                }
              },
              {
                target: 20,
                reward: {
                  type: "invention",
                  amount: 10
                }
              },
              {
                target: 24,
                reward: {
                  type: "invention",
                  amount: 11
                }
              },
              {
                target: 28,
                reward: {
                  type: "invention",
                  amount: 12
                }
              }
            ]
          },
          giveInventionPieces: {
            title: "Gifter",
            description: {
              prepend: "Total Invention Pieces Given ",
              append: ""
            },
            stages: [
              {
                target: 1,
                reward: {
                  type: "triviaCards",
                  amount: 4
                }
              },
              {
                target: 10,
                reward: {
                  type: "triviaCards",
                  amount: 5
                }
              },
              {
                target: 25,
                reward: {
                  type: "triviaCards",
                  amount: 6
                }
              },
              {
                target: 45,
                reward: {
                  type: "triviaCards",
                  amount: 7
                }
              },
              {
                target: 70,
                reward: {
                  type: "triviaCards",
                  amount: 8
                }
              },
              {
                target: 100,
                reward: {
                  type: "triviaCards",
                  amount: 9
                }
              },
              {
                target: 140,
                reward: {
                  type: "triviaCards",
                  amount: 10
                }
              },
              {
                target: 185,
                reward: {
                  type: "triviaCards",
                  amount: 11
                }
              },
              {
                target: 250,
                reward: {
                  type: "triviaCards",
                  amount: 12
                }
              }
            ]
          },
          socialite: {
            title: "Socialite",
            description: {
              prepend: "Claim ",
              append: " Random Trivia Card(s) from other users"
            },
            stages: [
              {
                target: 1,
                reward: {
                  type: "triviaCards",
                  amount: 4
                }
              },
              {
                target: 3,
                reward: {
                  type: "triviaCards",
                  amount: 5
                }
              },
              {
                target: 6,
                reward: {
                  type: "triviaCards",
                  amount: 6
                }
              },
              {
                target: 10,
                reward: {
                  type: "triviaCards",
                  amount: 7
                }
              },
              {
                target: 15,
                reward: {
                  type: "triviaCards",
                  amount: 8
                }
              },
              {
                target: 22,
                reward: {
                  type: "triviaCards",
                  amount: 9
                }
              },
              {
                target: 30,
                reward: {
                  type: "triviaCards",
                  amount: 10
                }
              },
              {
                target: 40,
                reward: {
                  type: "triviaCards",
                  amount: 11
                }
              },
              {
                target: 55,
                reward: {
                  type: "triviaCards",
                  amount: 12
                }
              },
              {
                target: 75,
                reward: {
                  type: "triviaCards",
                  amount: 13
                }
              },
              {
                target: 100,
                reward: {
                  type: "triviaCards",
                  amount: 14
                }
              }
            ]
          },
          triviaExtraordinaire: {
            title: "Trivia Extraordinaire",
            description: {
              prepend: "Correctly Answer ",
              append: " Trivia Cards"
            },
            stages: [
              {
                target: 1,
                reward: {
                  type: "invention",
                  amount: 4
                }
              },
              {
                target: 3,
                reward: {
                  type: "invention",
                  amount: 5
                }
              },
              {
                target: 10,
                reward: {
                  type: "invention",
                  amount: 6
                }
              },
              {
                target: 25,
                reward: {
                  type: "invention",
                  amount: 7
                }
              },
              {
                target: 50,
                reward: {
                  type: "invention",
                  amount: 8
                }
              },
              {
                target: 75,
                reward: {
                  type: "invention",
                  amount: 9
                }
              },
              {
                target: 100,
                reward: {
                  type: "invention",
                  amount: 10
                }
              },
              {
                target: 125,
                reward: {
                  type: "invention",
                  amount: 11
                }
              },
              {
                target: 150,
                reward: {
                  type: "invention",
                  amount: 12
                }
              },
              {
                target: 175,
                reward: {
                  type: "invention",
                  amount: 13
                }
              },
              {
                target: 200,
                reward: {
                  type: "invention",
                  amount: 14
                }
              },
              {
                target: 225,
                reward: {
                  type: "invention",
                  amount: 15
                }
              },
              {
                target: 250,
                reward: {
                  type: "invention",
                  amount: 16
                }
              },
              {
                target: 275,
                reward: {
                  type: "invention",
                  amount: 17
                }
              },
              {
                target: 300,
                reward: {
                  type: "invention",
                  amount: 18
                }
              },
              {
                target: 325,
                reward: {
                  type: "invention",
                  amount: 19
                }
              },
              {
                target: 350,
                reward: {
                  type: "invention",
                  amount: 20
                }
              },
              {
                target: 375,
                reward: {
                  type: "invention",
                  amount: 21
                }
              },
              {
                target: 400,
                reward: {
                  type: "invention",
                  amount: 22
                }
              }
            ]
          },
          triviaSavant: {
            title: "Trivia Savant",
            description: {
              prepend: "Correctly Answer ",
              append: " different Trivia Cards"
            },
            stages: [
              {
                target: 5,
                reward: {
                  type: "inventionPieces",
                  amount: 14
                }
              },
              {
                target: 10,
                reward: {
                  type: "inventionPieces",
                  amount: 15
                }
              },
              {
                target: 20,
                reward: {
                  type: "inventionPieces",
                  amount: 16
                }
              },
              {
                target: 40,
                reward: {
                  type: "inventionPieces",
                  amount: 17
                }
              },
              {
                target: 60,
                reward: {
                  type: "inventionPieces",
                  amount: 18
                }
              },
              {
                target: 80,
                reward: {
                  type: "inventionPieces",
                  amount: 19
                }
              },
              {
                target: 100,
                reward: {
                  type: "inventionPieces",
                  amount: 20
                }
              }
            ]
          },
          bottomOfTheBarrel: {
            stage: 0,
            status: 0
          }
        }
      },
      objectiveDetails: {},
      progress: {},
      completed: false,
      stage: 0
    };
  },
  created() {
    this.objectiveDetails = this.objectiveRequirements[this.sectionTitle][
      this.title
    ];

    this.stage = this.objective.stage // copy of stage so we have one source of truth about the completed status of each objective's stage
    
    if (this.sectionTitle === "challenges") {
      if (this.objectiveDetails.stages.length <= this.stage) { // initial check for completed status of each objective
        this.completed = true;
        this.stage = this.objectiveDetails.stages.length - 1;
      }

      this.progress = {
        value: this.objective.status,
        max_value: this.objectiveDetails.stages[this.stage].target
      };
    } else {
      this.completed = this.objective.completed

      this.progress = {
        value: this.objective.status,
        max_value: this.objectiveDetails.target
      };
    }
  },
  computed: {
    getStageAsText() {
      let stage = this.stage;
      return `${stage + 1} OF ${this.objectiveDetails.stages.length}`;
    },
    getRewardAsClass() {
      let reward_class = "objective-reward--";

      if (this.sectionTitle !== "challenges")
        return reward_class + this.objectiveDetails.reward.type;

      return (
        reward_class +
        this.objectiveDetails.stages[this.stage].reward.type
      );
    },
    checkClaimability() {
      return (
        this.progress.value >= this.progress.max_value && !this.completed
      );
    },
    getRewardText() {
      if (this.sectionTitle !== "challenges")
        return this.objectiveDetails.reward.amount;
      return this.objectiveDetails.stages[this.stage].reward.amount;
    },
    getDescription() {
      let description = this.objectiveDetails.description;

      if (typeof description === "string") return description; // dailys and weeklys

      let target = this.objectiveDetails.stages[this.stage].target;

      return description.prepend + target + description.append; // challenges
    },
    getTitle() {
      if (this.sectionTitle !== "challenges")
        return this.sectionTitle + ": " + this.objectiveDetails.title;

      let romanNumerals = [
        "I",
        "II",
        "III",
        "IV",
        "V",
        "VI",
        "VII",
        "VIII",
        "IX",
        "X",
        "XI",
        "XII",
        "XIII",
        "XIV",
        "XV",
        "XVI",
        "XVII",
        "XVIII",
        "IXX",
        "XX"
      ];

      return `${this.objectiveDetails.title}: ${
        romanNumerals[this.stage]
      }`;
    }
  },
  methods: {
    ...mapActions(["updatePower", "getCard", "checkAnswer"]),
    async claimReward() {
      let payload = {
        objective_type: this.sectionTitle,
        objective_title: this.title
      };

      this.$store.commit("SET_IS_WAITING_ON_API", true);

      let response = await this.updatePower("CLAIM_OBJECTIVE");

      if (response.status === 200) {
        let res = await api.default.rewardObjectives(payload);

        if (res.status === 200) {
          if (this.sectionTitle === "challenges") {
            this.stage = this.stage + 1;

            if (this.objectiveDetails.stages.length <= this.stage) { // initial check for completed status of each objective
              this.completed = true;
              this.stage = this.objectiveDetails.stages.length - 1;
            }
            
            this.progress = {
              value: this.objective.status,
              max_value: this.objectiveDetails.stages[this.stage].target
            };

            this.objective.stage = this.objective.stage + 1

          } else {
            this.completed = true;
            this.objective.completed = this.completed
          }

          this.$store.commit("SET_INVENTORY_CACHEFIRST", false);
          this.$store.commit("SET_IS_WAITING_ON_API", false);
          this.$emit("playClaimed");
        }
      } else if (response.status === 401) {
        this.$store.commit("SET_IS_WAITING_ON_API", false);
        this.$emit("insufficientFunds");
      }
    }
  },
  filters: {
    capitalize: function(value) {
      if (!value) return "";
      value = value.toString();
      return value.toUpperCase();
    }
  }
};
</script>

<style scoped>
@font-face {
  font-family: Babas-Regular;
  src: url(../../assets/Bebas-Regular.otf);
}

.objective-card {
  height: calc(var(--inner-height) * (300 / 1920));
  width: calc(100% * (1000 / 1080));

  position: relative;

  margin: 10px auto;
}

.objective-card-bg {
  height: 100%;
  width: 100%;
  border-radius: 8px;
  position: absolute;
  z-index: 1;
}

.objective-wrapper {
  width: 100%;
  height: 100%;
}

.claim-wrapper {
  position: absolute;
  top: 0;
  background: url(../../assets/btn_ClaimReward_Default.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  width: 100%;
  height: 100%;

  z-index: 1;
}

.objective-title {
  position: relative;
  z-index: 1;
  font-family: "Babas-Regular";
  font-size: 6.4vw;

  margin-left: calc(100% * (30 / 1080));
  margin-top: calc(var(--inner-height) * (6 / 1920));
}

.objective-subtitle {
  position: absolute;
  z-index: 1;
  top: calc(var(--inner-height) * (80 / 1920));
  font-family: "Babas-Regular";
  font-size: 3.9vw;

  margin-left: calc(100% * (30 / 1080));
}

.objective-stage {
  position: absolute;
  z-index: 1;
  top: calc(var(--inner-height) * (15 / 1920));
  right: calc(100% * (260 / 1080));
  font-family: "Babas-Regular";
  font-size: calc(100vw * (35 / 1080));
}

.objective-reward {
  position: absolute;
  z-index: 1;
  top: calc(var(--inner-height) * (100 / 1920));
  right: calc(100% * (68 / 1080));

  width: calc(var(--inner-height) * (110 / 1920));
  height: calc(var(--inner-height) * (110 / 1920));
}

.reward-text {
  font-family: "Babas-Regular";
  font-size: 4vw;

  position: absolute;
  z-index: 1;
  top: calc(var(--inner-height) * (110 / 1920));
  left: calc(100% * (465 / 1080));
}

@media screen and (min-device-width: 526px) {
  .objective-title {
    font-size: calc(526px * (115 / 1920));
  }

  .objective-subtitle {
    font-size: calc(526px * (65 / 1920));
  }

  .reward-text {
    font-size: calc(526px * (67 / 1920));
  }

  .objective-stage {
    font-size: calc(526px * (35 / 1080));
  }
}

.objective-reward--inventionPieces {
  background: url(../../assets/ItemIcon_RandomIP.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

.objective-reward--invention {
  background: url(../../assets/ItemIcon_RandomCI.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

.objective-reward--triviaCards {
  background: url(../../assets/PNG/ItemIcon_RandomCard.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
</style>
