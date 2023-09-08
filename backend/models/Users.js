const uuid = require('uuid/v4'),
  crypto = require('crypto'),
  emailer = require('../lib/emailer'),
  Objectives = require('./Objectives'),
  sql = require('../lib/databaseConnector'),
  promisify = require('util').promisify

const newPlayerStats = {
  "triviaCards": {
    "drawn": 0,
    "correct": 0,
    "incorrect": 0,
    "claimed": 0
  },
  "invPieces": {
    "given": 0,
    "collected": 0,
    "ornithopter": 0,
    "screw": 0,
    "knight": 0,
    "press": 0,
    "cart": 0
  },
  "coins": {
    "spent": 0
  },
  "objectives": {
    "daily": 0,
    "weekly": 0,
    "challenges": 0
  }
}

const newSettings = {
  'showAllModals': false,
  'modals': {
    'confirmCombine': false,
    'confirmGive': false,
    'discardCard': false,
    'drawCard': false,
    'insufficientCoins': false,
    'limitReached': false,
    'useCollected': false,
    'claimObjective': false
  }
}

const newUnknownInventionPieces = {
  "0": {
    "0": true,
    "1": true,
    "2": true
  },
  "1": {
    "0": true,
    "1": true,
    "2": true
  },
  "2": {
    "0": true,
    "1": true,
    "2": true
  },
  "3": {
    "0": true,
    "1": true,
    "2": true
  },
  "4": {
    "0": true,
    "1": true,
    "2": true
  }
}

var getEncountered = promisify(function (userId, result) {
  var queryString = `SELECT encountered FROM users WHERE user_id = '${userId}'`

  sql.query(queryString, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    }
    else {
      result(null, JSON.parse(res[0].encountered));
    }
  });
})

var updateEncountered = promisify(async function (userId, encounteredId, result) {
  await getEncountered(userId)
    .then(encountered => {
      encountered.push(encounteredId)
      let queryString = `UPDATE users SET encountered = '${JSON.stringify(encountered)}' WHERE user_id = '${userId}'`

      // sql.query(queryString, (err, res) => {
      //   if (err) {
      //     console.log("error: ", err);
      //     result(err, null);
      //   }
      //   else {
      //     result(null, res);
      //   }
      // })

      result(null, 'debug');
    })
    .catch(err => {
      console.log(err)
    })
})

module.exports = {
  newUser(email, user_id, hasSteemAccount, isActive = 0) {
    let user = {}
    let infiniteReward = this.createInfiniteTriviaCard(user_id)

    user.email = email;
    user.userId = user_id;
    user.active = isActive
    user.hasSteemAccount = hasSteemAccount
    user.hash = crypto.randomBytes(20).toString('hex')
    user.encountered = []
    user.power = 15000
    user.infInvId = infiniteReward.infInvId
    user.infInv = infiniteReward.infiniteInventionPiece
    user.objectives = Objectives.createObjectives()
    user.inventory = {
      saved_cards: {}
    }
    user.playerStats = newPlayerStats
    user.settings = newSettings
    user.unknownInventionPieces = newUnknownInventionPieces

    return user
  },

  getInfiniteInventionPiece: promisify(function (userId, result) {
    var queryString = "SELECT infInv FROM users WHERE user_id = ?"

    sql.query(queryString, [userId], function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      }
      else {
        result(null, res);
      }
    });
  }),

  createInfiniteTriviaCard(user_id) {
    let infInvId = uuid()

    return { 'infInvId': infInvId, 'infiniteInventionPiece': this._getRandomReward() }
  },

  _getRandomReward() {
    // 1-5 inventions, 1-3 pieces from that invention
    let invention_piece = {
      invention: 5 * Math.random() << 0,
      piece: 3 * Math.random() << 0
    }

    return invention_piece
  },

  createUser: promisify(function (newUser, result) {
    let queryString = "INSERT INTO users " +
      "(user_id, email, active, hasSteemAccount, hash, infInvId, infInv, encountered, objectives, inventory, playerStats, unknownInventionPieces, settings, power) VALUES " +
      `('${newUser.userId}', ` +
      `'${newUser.email}', ` +
      `'${newUser.active}',` +
      `'${newUser.hasSteemAccount}',` +
      `'${newUser.hash}',` +
      `'${newUser.infInvId}',` +
      `'${JSON.stringify(newUser.infInv)}',` +
      `'${JSON.stringify(newUser.encountered)}',` +
      `'${JSON.stringify(newUser.objectives)}',` +
      `'${JSON.stringify(newUser.inventory)}',` +
      `'${JSON.stringify(newUser.playerStats)}',` +
      `'${JSON.stringify(newUser.unknownInventionPieces)}',` +
      `'${JSON.stringify(newUser.settings)}',` +
      `'${newUser.power}')`

    sql.query(queryString, async function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      }
      else {
        if (newUser.active === 0) {
          await emailer.sendVerificationEmail(newUser)
        }
        result(null, res);
      }
    });
  }),

  setUserToActive: promisify(function (userId, result) {
    let queryString = `UPDATE users SET active = '1' WHERE user_id = '${userId}'`

    sql.query(queryString, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      }
      else {
        result(null, res);
      }
    })
  }),

  getUserByHash: promisify(function (hash, result) {
    var queryString = "SELECT * FROM users USE INDEX (HASH) WHERE hash = ?"

    sql.query(queryString, hash, async (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      }
      else {
        await this.setUserToActive(res.user_id)
          .then(() => {
            res.active = 1
            result(null, res);
          })
          .catch(err => {
            result(err, null);
          })
      }
    });
  }),

  getUserById: promisify(function (userId, result) {
    sql.query("SELECT * FROM users WHERE user_id = ?", userId, function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      }
      else {
        result(null, res);
      }
    })
  }),

  updateUserById: promisify((userId, updatedFields, result) => {
    var queryString = "UPDATE users SET "

    Object.keys(updatedFields).forEach(key => {
      queryString += `${key} = '${updatedFields[key]}' `
    })

    queryString += `WHERE user_id = '${userId}'`

    sql.query(queryString, function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      }
      else {
        result(null, res);
      }
    })
  }),

  getUserByInfInvId: promisify(function (infInvId, result) {
    var queryString = "SELECT infInv, user_id FROM users USE INDEX (INFINV_ID) WHERE infInvId = ?"

    sql.query(queryString, [infInvId], function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      }
      else {
        result(null, res);
      }
    });
  }),


  getPlayerStats: promisify(function (userId, result) {
    var queryString = `SELECT playerStats FROM users WHERE user_id = '${userId}'`
    sql.query(queryString, function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      }
      else {
        result(null, JSON.parse(res[0].playerStats));
      }
    });
  }),

  updatePlayerStats: promisify(async function (userId, category, type, increaseAmount, result) {
    await this.getPlayerStats(userId)
      .then(async playerStats => {
        playerStats[category][type] += increaseAmount

        let queryString = `UPDATE users SET playerStats = '${JSON.stringify(playerStats)}' WHERE user_id = '${userId}'`

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
      .catch(err => {
        console.log(err)
      })
  }),

  updateSettings: promisify(function (userId, settings, result) {
    var queryString = `UPDATE users SET settings = JSON_REPLACE(\`settings\`,`;

    settings.forEach(setting => {
      if (typeof setting.setting === 'object') {
        queryString += ` '$.${setting.setting[0]}.${setting.setting[1]}', ${setting.value},`
      }
      else {
        queryString += ` '$.${setting.setting}', ${setting.value},`
      }
    })

    var len = queryString.length;

    if (queryString.substr(len - 1, 1) == ",") {
      queryString = queryString.substring(0, len - 1) + `) WHERE user_id = '${userId}'`;
    }

    sql.query(queryString, function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      }
      else {
        result(null, res);
      }
    })
  }),

  getSettings: promisify(function (userId, result) {
    let queryString = `SELECT settings FROM users WHERE user_id = '${userId}'`

    sql.query(queryString, function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      }
      else {
        result(null, res);
      }
    })
  }),

  async claimTriviaCard(user_id, claim_key) {
    let infInv = undefined
    let encounteredId = undefined

    let alreadyEncountered = false

    await this.getUserByInfInvId(claim_key)
      .then(async function (res) {
        infInv = res[0].infInv
        encounteredId = res[0].user_id

        await getEncountered(user_id)
          .then(async function (encountered) {
            alreadyEncountered = encountered.includes(encounteredId);
          })
      })
      .catch(err => {
        console.log(err)
        alreadyEncountered = true
      })

    if (alreadyEncountered) return false

    return { 'infInv': infInv, 'user_id': encounteredId }
  },

  updateEncountered: promisify(async function (userId, encounteredId, result) {
    await getEncountered(userId)
      .then(encountered => {
        encountered.push(encounteredId)
        let queryString = `UPDATE users SET encountered = '${JSON.stringify(encountered)}' WHERE user_id = '${userId}'`

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
      .catch(err => {
        console.log(err)
      })
  })
}