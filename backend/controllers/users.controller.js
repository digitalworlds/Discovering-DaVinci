const Inventory = require('../models/Inventory'),
  User = require('../models/Users'),
  Objectives = require('../models/Objectives'),
  Transaction = require('../models/Transaction')

// for registering users making a steem account for the first time
exports.register = async (req, res) => {
  let user = req.body

  let newUser = User.newUser(user.email, user.username, user.hasSteemAccount)

  await User.createUser(newUser)
    .then(() => {
      let message = {
        status: 200,
        message: 'Successfully Created User Entry'
      }
      res.send(message)
    })
    .catch(err => {
      let message = {
        status: 403,
        message: err
      }

      res.send(message)
    })
}

exports.verify = async (req, res) => {
  await User.getUserByHash(req.params.id)
    .then(result => {
      let message = {
        status: 200,
        message: "User was verified",
        data: result
      }
      res.send(message)
    })
    .catch(err => {
      let message = {
        status: 400,
        message: "User was not verified"
      }
      res.send(message)
    })
}

exports.login = async (req, res) => {
  let user_id = req.body.user

  if (!user_id)
    res.status(400).send({ "message": 'No user_id provided' })
  else {
    User.getUserById(user_id)
      .then(async result => {
        let user = result[0]
        let inventory = await Inventory.getInventory(user_id)
        let power = user.power
        res.send(
          {
            "status": 200,
            "message": 'User is registered',
            'user': user,
            'inventory': inventory,
            'power': power
          }
        )
      })
      .catch(err => {
        console.log(err)
        res.send(
          {
            "status": 201,
            "message": 'User is not registered',
          }
        )
      })
  }
}

exports.getInventory = async (req, res) => {
  let user = req.body.user
  let inventory = await Inventory.getInventory(user)

  if (inventory) {
    let message = {
      'status': 200,
      'inventory': inventory,
      'message': 'Successfully retrieved user\'s inventory'
    }
    res.send(message)
  }
  else {
    let message = {
      'status': 400,
      'message': 'Failed to retrieve user\'s inventory'
    }
    res.send(message)
  }
}

exports.updateInventory = async (req, res) => {
  let user = req.body.user
  let operation = req.body.op
  let payload = req.body.payload

  if (operation === "SAVE_CARD") {
    await Inventory.addSavedCard(user, payload['infInv'])
      .then(async () => {
        await User.updateEncountered(user, payload['user_id'])
          .then(async () => {
            await Objectives.updateObjective(user, ['daily', 'weekly', 'challenges'], ['makingFriends', 'socialite'], 1)
              .then(async () => {
                let newTransaction = new Transaction(payload['user_id'], user, 'claimed', {})
                await newTransaction.createTransaction()
                  .then(async () => {
                    await User.updatePlayerStats(user, 'triviaCards', 'claimed', 1)
                      .then(() => {
                        let message = {
                          'status': 200,
                          'message': `Successfully claimed ${claim['user_id']}\'s infinite trivia card`
                        }
                        res.send(message)
                      })
                      .catch(() => {
                        let message = {
                          'status': 400,
                          'message': 'Failed to use claim inifite trivia card'
                        }
                        res.send(message)
                      })
                  })
                  .catch(err => {
                    console.log(err)
                    let message = {
                      'status': 400,
                      'message': 'Failed saved card to user\'s inventory'
                    }
                    res.send(message)
                  })
              })
              .catch(err => {
                console.log(err)
                let message = {
                  'status': 400,
                  'message': 'Failed saved card to user\'s inventory'
                }
                res.send(message)
              })
          })
          .catch(err => {
            let message = {
              'status': 400,
              'message': 'Failed saved card to user\'s inventory'
            }
            res.send(message)
          })
      })
      .catch(err => {
        let message = {
          'status': 400,
          'message': 'Failed saved card to user\'s inventory'
        }
        res.send(message)
      })
  }
  else if (operation === "USE_CARD") {
    await Inventory.popSavedCard(user, payload)
      .then(result => {
        card = result['used_card']
        let message = {
          'status': 200,
          'message': 'Successfully used a card from user\'s inventory',
          'card': card
        }
        res.send(message)
      })
      .catch(err => {
        let message = {
          'status': 400,
          'message': 'Failed to use a card from user\'s inventory',
          'err': err
        }
        res.send(message)
      })
  }
}

exports.claimTriviaCard = async function (req, res) {
  let userId = req.body.user
  let claim_key = req.body.payload

  let claim = await User.claimTriviaCard(userId, claim_key)

  if (claim) {
    let message = {
      'status': 200,
      'message': `Successfully claimed ${claim['user_id']}\'s infinite trivia card`,
      'claim': claim
    }
    res.send(message)
  } else {
    let message = {
      'status': 400,
      'message': 'Failed to use claim inifite trivia card'
    }
    res.send(message)
  }
}

var inventionPieceToName = function (piece) {
  let invention = piece.invention;
  let inventionName = "";

  switch (invention) {
    case "0":
      inventionName = "ornithopter";
      break;
    case "1":
      inventionName = "screw";
      break;
    case "2":
      inventionName = "knight";
      break;
    case "3":
      inventionName = "press";
      break;
    case "4":
      inventionName = "cart";
      break;
  }
  return inventionName;
}

exports.addBuildInvention = async function (req, res) {
  let user = req.body.user
  let pieces = req.body.payload

  let inventionPiece = inventionPieceToName(pieces[0])

  await Inventory.addBuiltInvention(user, pieces)
    .then(async () => {
      await Objectives.updateObjective(user, ['daily', 'weekly'], ['combine'], 1)
        .then(async () => {
          await User.updatePlayerStats(user, 'invPieces', inventionPiece, 1)
            .then(async () => {
              let message = {
                'status': 200,
                'message': `Successfully added a new built invention`,
              }
              res.send(message)
            })
            .catch(err => {
              console.log(err)
              let message = {
                'status': 400,
                'message': 'Failed to add a new built invention',
                'err': err
              }
              res.send(message)
            })
        })
        .catch(err => {
          let message = {
            'status': 400,
            'message': 'Failed to add a new built invention',
            'err': err
          }
          res.send(message)
        })
    })
    .catch(err => {
      console.log(err)
      let message = {
        'status': 400,
        'message': 'Failed to add a new built invention',
        'err': err
      }
      res.send(message)
    })
}

exports.getInfiniteInventionPiece = async function (req, res) {
  let user_id = req.body.user

  await User.getInfiniteInventionPiece(user_id)
    .then(result => {
      let infiniteInventionPiece = JSON.parse(result[0].infInv)
      let message = {
        'status': 200,
        'message': 'Successfully retrieved infinite invention piece',
        'infiniteInventionPiece': infiniteInventionPiece
      }
      res.send(message)
    })
    .catch(err => {
      console.log(err)
      let message = {
        'status': 400,
        'message': 'Failed to retrieve infinite invention piece'
      }
      res.send(message)
    })
}

exports.getPlayerStats = async (req, res) => {
  let userId = req.body.user

  await User.getPlayerStats(userId)
    .then(playerStats => {
      let message = {
        'message': 'Successfully retrieved player stats',
        'status': 200,
        'playerStats': playerStats
      }
      res.send(message)
    })
    .catch(err => {
      console.log(err)
      let message = {
        'message': 'Failed to retrieve player stats',
        'status': 500
      }
      res.send(message)
    })
}

exports.getTransactions = async (req, res) => {
  let userId = req.body.user

  await new Transaction().getTransactions(userId)
    .then(result => {
      let message = {
        message: 'Successfully retrieved transactions',
        status: 200,
        transactions: result
      }
      res.send(message)
    })
    .catch(err => {
      console.log(err)
      let message = {
        message: 'Failed to get transactions',
        status: 500
      }
      res.send(message)
    })
}

exports.givePieces = async (req, res) => {
  let userId = req.body.user
  let recipient = req.body.payload.recipient
  let pieces = req.body.payload.pieces

  await User.getUserById(recipient)
    .then(async results => {
      if (results[0].user_id === userId) {
        let message = {
          message: 'Cannot give pieces to yourself',
          status: 401
        }
        res.send(message)
      }
      else if (results.length > 0) {
        await Inventory.givePieces(userId, recipient, pieces, req.body.client)
        let message = {
          message: 'Succesfully initiated give transaction',
          status: 200
        }
        res.send(message)
      }
    })
    .catch(err => {
      let message = {
        message: 'Failed to find recipient',
        status: 400,
        err: err
      }
      res.send(message)
    })
}

exports.updateSettings = async (req, res) => {
  let userId = req.body.user
  let updatedSettings = req.body.payload

  await User.updateSettings(userId, updatedSettings)
    .then(async () => {
      await User.getSettings(userId)
        .then(result => {
          let message = {
            'status': 200,
            'message': 'Successfully updated and retrieved settings',
            'settings': result[0].settings
          }

          res.send(message)
        })
        .catch(err => {
          console.log(err)

          let message = {
            'status': 500,
            'message': 'Updated settings but failed to get settings for user',
            'err': err
          }

          res.send(message)
        })
    }).
    catch(err => {
      console.log(err)

      let message = {
        'status': 500,
        'message': 'Failed to update settings',
        'err': err
      }

      res.send(message)
    })
}
