var sql = require('./databaseConnector.js'),
  promisify = require('util').promisify

var addColumnUnknownInventionPieces = promisify(function (result) {
  var queryString = `ALTER TABLE users ADD COLUMN unknownInventionPieces JSON NOT NULL`

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

var addColumnSettings = promisify(function (result) {
  var queryString = `ALTER TABLE users ADD COLUMN settings JSON NOT NULL`

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

var initializeSettings = promisify(function (result) {
  let settings = {
    'showAllModals': true,
    'modals': {
      'confirmCombine': true,
      'confirmGive': true,
      'discardCard': true,
      'drawCard': true,
      'insufficientCoins': true,
      'limitReached': true,
      'useCollected': true
    }
  }
  let queryString = `UPDATE users SET settings = '${JSON.stringify(settings)}'`

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

var initializeUnknownInventionPieces = promisify(function (result) {
  let unknownInventionPieces = {
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
  let queryString = `UPDATE users SET unknownInventionPieces = '${JSON.stringify(unknownInventionPieces)}'`

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

addColumnUnknownInventionPieces()
  .then(
    addColumnSettings()
      .then(() => {
        initializeSettings()
          .then(() => {
            initializeUnknownInventionPieces()
              .catch(err => {
                console.log(err)
              })
          })
          .catch(err => {
            console.log(err)
          })
      })
      .catch(err => {
        console.log(err)
      })
  )
  .catch(err => {
    console.log(err)
  })