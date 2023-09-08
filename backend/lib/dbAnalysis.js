var sql = require('./databaseConnector.js'),
  promisify = require('util').promisify

var getAllInventionPieces = promisify(function (result) {
  var queryString = "SELECT * FROM invention_pieces"

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

function getUsersWithCompleteInventions (users) {
  let usersWithCompleteInvention = 0

  for (let user in users) {
    let hasCompleteInvention = true
    let i = 0
    while (i < users[user].length && hasCompleteInvention) {
      for (let j = 0; j < users[user][i].length; j++) {
        if (users[user][i][j] == 0) {
          hasCompleteInvention = false
          break
        }
      }

      if (i == users[user].length - 1 && hasCompleteInvention)
        usersWithCompleteInvention++
      i++
    }
  }
  console.log(usersWithCompleteInvention)
}

function getNumberOfEntries (users) {
  let prizeEntries = [0, 0, 0, 0 ,0]
  let names = ["","","","",""]
  for (let user in users) {

    for (let i = 0; i < users[user].length; i++) {
      let numEntries = Math.min.apply(null, users[user][i])
      prizeEntries[i] += numEntries
      for (let j = 0; j < numEntries; j++) {
        names[i] += `${user},`
      }
    }
  }

  console.log(names)
}

function parseUsers (invention_pieces) {
  let users = {}

  for (piece of invention_pieces) {
    if (!users[piece.user_id])
      users[piece.user_id] = [[0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]]
    users[piece.user_id][parseInt(piece.invention)][parseInt(piece.piece)]++
  }

  return users
}

getAllInventionPieces()
  .then(res => {
    sql.end()

    let users = parseUsers(res)

    getNumberOfEntries(users)
    // getUsersWithCompleteInventions(users)

  })
  .catch(err => {
    console.log(err)
  })