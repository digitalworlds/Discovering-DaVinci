const rewardUser = require('../lib/customTransactions').rewardUser,
  sql = require('../lib/databaseConnector'),
  promisify = require('util').promisify


var getSavedCards = promisify(function (userId, result) {
  let queryString = "SELECT inventory->'$.saved_cards' AS saved_cards FROM users WHERE user_id = ?";

  sql.query(queryString, userId, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    }
    else {
      result(null, res);
    }
  })
})

var getAllUsers = promisify(function (result) {
  var queryString = "SELECT user_id FROM users"

  sql.query(queryString, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    }
    else {
      result(null, res);
    }
  })
})


// to hard to find and should be in one location but I'm avoiding circular dependencies, sorry
var addSavedCard = promisify(async (userId, card, result) => {
  await getSavedCards(userId)
    .then((res) => {
      let saved_cards = JSON.parse(res[0].saved_cards)

      if (typeof saved_cards === "string")
        saved_cards = JSON.parse(JSON.parse(res[0].saved_cards)); // storing jsons as strings in jsons as strings

      if (!saved_cards[card.invention])
        saved_cards[card.invention] = []

      saved_cards[card.invention].push(card)

      let queryString = `UPDATE users SET inventory = JSON_REPLACE(\`inventory\`, '$.saved_cards', '${JSON.stringify(saved_cards)}') where user_id = ?`

      sql.query(queryString, userId, function (err, res) {
        if (err) {
          console.log("error: ", err);
          result(err, null);
        }
        else {
          result(null, res);
        }
      })
    })
})

const objective_requirements = {
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
}

const _getRandomInvention = function () {
  // 1-5 inventions
  let invention = 5 * Math.random() << 0

  return invention
}

const _getRandomInventionPiece = function () {
  let invention_piece = {
    invention: 5 * Math.random() << 0,
    piece: 3 * Math.random() << 0
  }

  return invention_piece
}

const _grantInvention = function (user_id, amount, client) {
  console.log(`${new Date()} Granting ${user_id} x ${amount} of Complete Inventions.`)

  let invention_pieces = []

  for (let i = 0; i < amount; i++) {
    let invention = _getRandomInvention()

    for (let j = 0; j < 3; j++) {
      invention_pieces.push({
        'invention': invention,
        'piece': j
      })
    }
  }

  rewardUser(user_id, client, invention_pieces)
}

const _grantTriviaCards = async function (user_id, amount) {
  console.log(`${new Date()} Granting ${user_id} x ${amount} of Trivia Cards.`)
  for (let i = 0; i < amount; i++) {
    let card_reward = _getRandomInventionPiece()

    await addSavedCard(user_id, card_reward)
      .catch(err => {
        console.log(err)
        return err
      })
  }
}

const _grantInventionPieces = function (user_id, amount, client) {
  console.log(`${new Date()} Granting ${user_id} x ${amount} of Invention Pieces.`)

  let invention_pieces = []

  for (let i = 0; i < amount; i++) {
    invention_pieces.push(_getRandomInventionPiece())
  }

  rewardUser(user_id, client, invention_pieces)
}

const _updateObjectives = promisify(function (updatedObjectives, userId, result) {
  var queryString = `UPDATE users SET objectives = JSON_REPLACE(\`objectives\`,`;

  for (type in updatedObjectives)
    for (title in updatedObjectives[type])
      for (key in updatedObjectives[type][title])
        queryString += ` '$.${type}.${title}.${key}', ${updatedObjectives[type][title][key]},`

  var len = queryString.length;

  if (queryString.substr(len - 1, 1) == ",") {
    queryString = queryString.substring(0, len - 1) + `) WHERE user_id = '${userId}'`;
  }

  sql.query(queryString, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    }
    else {
      result(null, res);
    }
  })
})

let objectives = {
  'daily': {
    'powerUsage': {
      'status': 0,
      'completed': false
    },
    'triviaQuestions': {
      'status': 0,
      'completed': false
    },
    'makingFriends': {
      'status': 0,
      'completed': false
    },
    'combine': {
      'status': 0,
      'completed': false
    }
  },
  'weekly': {
    'powerUsage': {
      'status': 0,
      'completed': false
    },
    'triviaQuestions': {
      'status': 0,
      'completed': false
    },
    'makingFriends': {
      'status': 0,
      'completed': false
    },
    'combine': {
      'status': 0,
      'completed': false
    }
  },
  'challenges': {
    'dailyDiscoverer': {
      'stage': 0,
      'status': 0
    },
    'bigSpender': {
      'stage': 0,
      'status': 0
    },
    'weeklyChallenger': {
      'stage': 0,
      'status': 0
    },
    'giveInventionPieces': {
      'stage': 0,
      'status': 0
    },
    'socialite': {
      'stage': 0,
      'status': 0
    },
    'triviaExtraordinaire': {
      'stage': 0,
      'status': 0
    },
    'triviaSavant': {
      'stage': 0,
      'status': 0
    },
    'bottomOfTheBarrel': {
      'stage': 0,
      'status': 0
    }
  }
}

module.exports = {
  resetWeeklyObjectives: promisify(async function (userId, result) {
    await this.getObjectives(userId)
      .then(async (res) => {

        let user_objectives = JSON.parse(res[0].objectives)
        user_objectives.weekly = objectives.weekly;

        let queryString = `UPDATE users SET objectives = '${JSON.stringify(user_objectives)}' WHERE user_id = '${userId}'`

        sql.query(queryString, function (err, res) {
          if (err) {
            console.log("error: ", err);
            result(err, null);
          }
          else {
            result(null, res);
          }
        })
      })
      .catch(err => {
        console.log(err)
      })

  }),
  async resetAllWeeklyObjectives() {
    let self = this
    await getAllUsers()
      .then(async (res) => {
        for (let user of res) {
          await self.resetWeeklyObjectives(user.user_id)
            .catch(err => {
              console.log(err)
            })
          console.log(`${new Date()} Scheduled: Reseting ${user.user_id}'s weekly objectives`)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  },

  resetDailyObjectives: promisify(async function (userId, result) {
    await this.getObjectives(userId)
      .then(async (res) => {

        let user_objectives = JSON.parse(res[0].objectives)
        user_objectives.daily = objectives.daily;

        let queryString = `UPDATE users SET objectives = '${JSON.stringify(user_objectives)}' WHERE user_id = '${userId}'`

        sql.query(queryString, function (err, res) {
          if (err) {
            console.log("error: ", err);
            result(err, null);
          }
          else {
            result(null, res);
          }
        })
      })
      .catch(err => {
        console.log(err)
      })

  }),
  async resetAllDailyObjectives() {
    let self = this
    await getAllUsers()
      .then(async (res) => {
        for (let user of res) {
          await self.resetDailyObjectives(user.user_id)
            .catch(err => {
              console.log(err)
            })
          console.log(`${new Date()} Scheduled: Reseting ${user.user_id}'s daily objectives`)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  },

  createObjectives() {
    return objectives
  },

  getObjectives: promisify(function (userId, result) {
    var queryString = "SELECT objectives FROM users WHERE user_id = ?"

    sql.query(queryString, userId, function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      }
      else {
        result(null, res);
      }
    })
  }),

  async updateObjective(user_id, objective_types, objective_title, amountToUpdateBy) {
    await this.getObjectives(user_id)
      .then(async (res) => {
        let user_objectives = JSON.parse(res[0].objectives);
        let updatedValues = {}

        for (let i = 0; i < objective_types.length; i++) {
          let objective_type = objective_types[i]

          updatedValues[objective_type] = {}

          let title = objective_type === 'challenges' ? objective_title[1] : objective_title[0]

          if (objective_type === 'challenges') {
            updatedValues[objective_type][title] = {
              status: user_objectives[objective_type][title].status + amountToUpdateBy,
              stage: user_objectives[objective_type][title].stage
            }
          }
          else {
            updatedValues[objective_type][title] = {
              status: user_objectives[objective_type][title].status + amountToUpdateBy,
              completed: user_objectives[objective_type][title].completed
            }
          }
        }

        await _updateObjectives(updatedValues, user_id)
          .catch((err) => {
            console.log(err)
            return err
          })
      })
      .catch((err) => {
        console.log(err)
        return err
      })
  },

  async rewardUser(user_id, objective_type, objective_title, client) {
    let self = this
    await this.getObjectives(user_id)
      .then(async (res) => {
        let user_objectives = JSON.parse(res[0].objectives);

        let updatedValues = {}
        updatedValues[objective_type] = {}

        if (objective_type === 'challenges') {
          updatedValues[objective_type][objective_title] = {
            status: user_objectives[objective_type][objective_title].status,
            stage: user_objectives[objective_type][objective_title].stage + 1
          }
        }
        else {
          updatedValues[objective_type][objective_title] = {
            status: user_objectives[objective_type][objective_title].status,
            completed: true
          }
        }

        await _updateObjectives(updatedValues, user_id)
          .then(async (res) => {
            let curr_requirements = objective_requirements[objective_type][objective_title]
            let reward = curr_requirements.reward

            if (objective_type === 'challenges') {
              reward = curr_requirements.stages[user_objectives[objective_type][objective_title].stage].reward
            }

            console.log(`${new Date()} User ${user_id} claimed objective: '${objective_type}.${objective_title}${objective_type === 'challenges' ? '.' + user_objectives[objective_type][objective_title].stage : ''}'`)

            err = ''

            if (objective_type !== 'challenges') {

              let challengeType = objective_type === 'weekly' ? 'weeklyChallenger' : 'dailyDiscoverer'

              await self.updateObjective(user_id, ['challenges'], ['', challengeType], 1)

            }

            if (reward.type === 'triviaCards') {
              err = await _grantTriviaCards(user_id, reward.amount)
            }
            else if (reward.type === 'inventionPieces') {
              err = await _grantInventionPieces(user_id, reward.amount, client)
            }
            else if (reward.type === 'invention') {
              err = await _grantInvention(user_id, reward.amount, client)
            }

            return err
          })
          .catch((err) => {
            console.log(err)
            return err
          })
      })
      .catch((err) => {
        console.log(err)
        return err
      })
  },
  async _grantTriviaCards(user_id, amount) {
    console.log(`Granting ${user_id} x ${amount} of Trivia Cards.`)
    for (let i = 0; i < amount; i++) {
      let card_reward = _getRandomInventionPiece()
      await addSavedCard(user_id, card_reward)
        .catch(err => {
          console.log(err)
          return err
        })
    }
  }
}