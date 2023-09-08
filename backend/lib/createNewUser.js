var sql = require('./databaseConnector'),
  promisify = require('util').promisify


var createUser = promisify(function (newUser, result) {
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

  sql.query(queryString, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    }
    else {
      result(null, res);
    }
  });
});


var user = {
  "email": "liamvwood@ufl.edu",
  "userId": "squits",
  "active": 0,
  "hasSteemAccount": 0,
  "infInvId": "932a87b2-1225-413c-9013-01c64e230569",
  "infInv": {
    "invention": 0,
    "piece": 0
  },
  "hash": "3291859389014bcbd64f53da3310dfeb8ce15fba",
  "encountered": [],
  "objectives": {
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
      }
    }
  },
  "power": 15000,
  "inventory": {
    'saved_cards': {},
    'invention_pieces': []
  },
  "playerStats": {
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
  },
  'settings': {
    'showAllModals': false,
    'modals': {
      'confirmCombine': false,
      'confirmGive': false,
      'discardCard': false,
      'drawCard': false,
      'insufficientCoins': false,
      'limitReached': false,
      'useCollected': false
    }
  },
  'unknownInventionPieces': {
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
}

createUser(user)
  .then((res) => {
    console.log(res)
  })
  .catch(err => {
    console.log(err)
  })

sql.end()