const dsteem = require('dsteem'),
  uuidv4 = require('uuid/v4'),
  steemTransact = require('steem-transact'),
  promisify = require('util').promisify,
  config = require('../config/config')

const USERNAME = process.env.USERNAME || config.USERNAME,
  PRIVATE_KEY = process.env.PRIVATE_KEY || config.PRIVATE_KEY

const STEEM_APP_KEY = process.env.STEEM_APP_KEY || config.STEEM_APP_KEY

var client = new dsteem.Client('https://api.steemit.com');
var transactor = steemTransact(client, dsteem, 'ufl_app_dev_');
let customJson = promisify(transactor.json)

const getRandomReward = () => {
  // 1-5 inventions, 1-3 pieces from that invention
  let invention_piece = {
    invention: 5 * Math.random() << 0,
    piece: 3 * Math.random() << 0
  }

  return invention_piece
}

const givePiecesTransaction = async (sender, recipient, pieces, client) => {
  let transaction = {
    'from': sender,
    'to': recipient,
    'pieces': pieces
  }

  client.customJson([], [sender], STEEM_APP_KEY + 'give', JSON.stringify(transaction), function (err, res) {
    console.log(err, res)
  });

  // customJson(USERNAME, PRIVATE_KEY, 'give', transaction)
  //   .then(result => {
  //     console.log(`Submitted give transaction, ${JSON.stringify(result)}`)
  //   })
  //   .catch(err => {
  //     console.log(err)
  //   })
}

var formatRewards = (invention_pieces) => {
  let rewards = []

  if (invention_pieces.length !== undefined) {
    for (invention_piece of invention_pieces) {
      rewards.push({
        'ip_id': uuidv4(),
        'invention': invention_piece.invention,
        'piece': invention_piece.piece
      })
    }
  } else {
    rewards.push({
      'ip_id': uuidv4(),
      'invention': invention_pieces.invention,
      'piece': invention_pieces.piece
    })
  }

  return rewards
}

const rewardUser = (user, client, invention_piece) => {
  if (!invention_piece) {
    invention_piece = getRandomReward()
  }

  let transaction = {
    'user': user,
    'rewards': formatRewards(invention_piece)
  }

  client.customJson([], [user], STEEM_APP_KEY + 'reward', JSON.stringify(transaction), function (err, res) {
    // console.log(err, res)
  });

  // customJson(USERNAME, PRIVATE_KEY, 'reward', transaction)
  //   .then(result => {
  //     // console.log(result)
  //   })
  //   .catch(err => {
  //     console.log(err)
  //   })
}

module.exports = {
  rewardUser,
  givePiecesTransaction
}