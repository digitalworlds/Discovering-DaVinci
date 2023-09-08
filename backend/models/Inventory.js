const sql = require('../lib/databaseConnector'),
  promisify = require('util').promisify,
  givePiecesTransaction = require('../lib/customTransactions').givePiecesTransaction,
  Transaction = require('../models/Transaction'),
  Objectives = require('./Objectives')
sockets = require('../config/sockets')

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

var checkInventionPieces = function (ownedPieces, givePieces) {
  let confirmed_pieces = []

  for (let i = 0; i < ownedPieces.length; i++) {
    for (let j = 0; j < givePieces.length; j++) {
      if (ownedPieces[i].ip_id === givePieces[j].ip_id) {
        confirmed_pieces.push(givePieces[j])
        givePieces.splice(j, 1)
      }
    }
  }

  return confirmed_pieces
}

var updateUnknownInventionPieces = promisify(function (userId, inventionPieces, status, result) {
  let queryString = `SELECT unknownInventionPieces FROM users WHERE user_id = '${userId}'`
  sql.query(queryString, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    }
    else {
      let unknownInventionPieces = JSON.parse(res[0].unknownInventionPieces)
      let updateFrontend = false

      inventionPieces.forEach(piece => {
        if (unknownInventionPieces[piece.invention][piece.piece]) {
          updateFrontend = true
          unknownInventionPieces[piece.invention][piece.piece] = status
        }
      })

      queryString = `UPDATE users SET unknownInventionPieces = '${JSON.stringify(unknownInventionPieces)}' WHERE user_id = '${userId}'`

      sql.query(queryString, async (err, res) => {
        if (err)
          result(err, null)
        else {
          if (updateFrontend)
            await sockets.emitToUser(userId, 'unknownPieces', { unknownPieces: unknownInventionPieces })
          result(null, res)
        }
      })
    }
  })
})

let Inventory = {

  getSavedCards: promisify(function (userId, result) {
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
  }),

  getInventionPieces: promisify(function (userId, result) {
    let queryString = "SELECT * FROM invention_pieces USE INDEX (USER_ID) WHERE user_id = ?";

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

  async getInventory(user_id) {
    let inventory = {}

    await this.getSavedCards(user_id)
      .then(async (res) => {

        let saved_cards = JSON.parse(res[0].saved_cards)

        if (typeof saved_cards === "string")
          saved_cards = JSON.parse(JSON.parse(res[0].saved_cards)); // storing jsons as strings in jsons as strings

        inventory.saved_cards = saved_cards
        await this.getInventionPieces(user_id)
          .then(res => {
            inventory.invention_pieces = JSON.parse(JSON.stringify(res))
          })
          .catch(err => {
            throw new Error(err)
          })
      })
      .catch(err => {
        throw new Error(err)
      })

    return inventory
  },

  addInventionPiece: promisify(function (userId, inventionPieces, result) {
    let queryString = `INSERT INTO invention_pieces (ip_id, user_id, invention, piece, usedInBuild) VALUES `

    for (let i = 0; i < inventionPieces.length; i++) {
      queryString += `('${inventionPieces[i].ip_id}', '${userId}', '${inventionPieces[i].invention}', '${inventionPieces[i].piece}', '0')`

      if (i < inventionPieces.length - 1) {
        queryString += ','
      }
    }

    sql.query(queryString, async function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      }
      else {
        await updateUnknownInventionPieces(userId, inventionPieces, false)
          .then(() => {
            result(null, res);
          })
          .catch(err => {
            result(err, null);
          })
      }
    })
  }),

  removeInventionPieces: promisify(function (userId, pieces, result) {
    let queryString = `DELETE FROM invention_pieces WHERE user_id = '${userId}' AND (`

    for (let i = 0; i < pieces.length; i++) {
      queryString += ` ip_id = '${pieces[i].ip_id}'`
      if (i < pieces.length - 1) {
        queryString += ' OR'
      }
      else {
        queryString += ')'
      }
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

  addBuiltInvention: promisify(function (userId, pieces, result) {
    let queryString = `UPDATE invention_pieces SET usedInBuild = '1' WHERE ip_id = '${pieces[0].ip_id}' OR ip_id = '${pieces[1].ip_id}' OR ip_id = '${pieces[2].ip_id}' AND user_id = '${userId}'`;
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

  addSavedCard: promisify(async (userId, card, result) => {
    card = JSON.parse(card)
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
  }),

  popSavedCard: promisify(async (userId, inventionId, result) => {
    await getSavedCards(userId)
      .then((res) => {
        let saved_cards = JSON.parse(res[0].saved_cards)

        if (typeof saved_cards === "string")
          saved_cards = JSON.parse(JSON.parse(res[0].saved_cards)); // storing jsons as strings in jsons as strings

        let used_card = saved_cards[inventionId].pop();

        let queryString = `UPDATE users SET inventory = JSON_REPLACE(\`inventory\`, '$.saved_cards', '${JSON.stringify(saved_cards)}') where user_id = ?`

        sql.query(queryString, userId, function (err, res) {
          if (err) {
            console.log("error: ", err);
            result(err, null);
          }
          else {
            res['used_card'] = used_card
            result(null, res);
          }
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }),

  givePieces: async function (userId, recipient, pieces, client) {
    await this.getInventionPieces(userId)
      .then(async results => {
        let confirmed_pieces = checkInventionPieces(results, new Array(...pieces))

        if (confirmed_pieces && confirmed_pieces.length === pieces.length) {
          await givePiecesTransaction(userId, recipient, confirmed_pieces, client)
            .then(async result => {
              await Objectives.updateObjective(userId, ['challenges'], ['', 'giveInventionPieces'], confirmed_pieces.length)
            })
            .catch(err => {
              console.log(err)
            })
        }
        else {
          throw new Error('Do not own all pieces trying to be sent.')
        }
      })
      .catch(err => {
        console.log(err)
      })
  },

  updateInventoryOnGive: async function (sender, recipient, pieces) {
    var self = this

    await self.removeInventionPieces(sender, pieces)
      .then(async function () {
        await self.addInventionPiece(recipient, pieces)
          .then(async function () {
            await new Transaction(sender, recipient, 'given', pieces).createTransaction()
          })
          .catch(err => {
            console.log(err)
          })
      })
      .catch(async err => {
        console.log(err)
        await sockets.emitToUser(sender, 'failedGive', { pieces: pieces })
      })
  }
}

module.exports = Inventory