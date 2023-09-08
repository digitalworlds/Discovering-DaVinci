const promisify = require('util').promisify,
  databaseConnector = require('../lib/databaseConnector'),
  uuid4 = require('uuid/v4')

class Transaction {
  constructor(from_id, to_id, action, receipt) {
    this.transaction_id = uuid4()
    this.from_id = from_id
    this.to_id = to_id
    this.action = action
    this.receipt = receipt

    this.createTransaction = this.createTransaction.bind(this)
    this.getTransactions = this.getTransactions.bind(this)
  }

  createTransaction() {
    return promisify(function (newTransaction, result) {
      let queryString = "INSERT INTO transactions " +
        "(transaction_id, from_id, to_id, action, receipt) VALUES " +
        `('${newTransaction.transaction_id}', ` +
        `'${newTransaction.from_id}', ` +
        `'${newTransaction.to_id}',` +
        `'${newTransaction.action}',` +
        `'${JSON.stringify(newTransaction.receipt)}')`

      databaseConnector.query(queryString, function (err, res) {
        if (err) {
          console.log("error: ", err);
          result(err, null);
        }
        else {
          result(null, res);
        }
      })
    })(this)
  }

  getTransactions(userId) {
    return promisify(function (userId, result) {
      let queryString = `SELECT * FROM transactions WHERE from_id = '${userId}' OR to_id = '${userId}'`

      databaseConnector.query(queryString, function (err, res) {
        if (err) {
          console.log("error: ", err);
          result(err, null);
        }
        else {
          result(null, res);
        }
      })
    })(userId)
  }
}

module.exports = Transaction