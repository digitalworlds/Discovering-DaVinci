const sql = require('./databaseConnector');

let queryString = `CREATE TABLE transactions (
  transaction_id VARCHAR(36) NOT NULL, 
  from_id VARCHAR(150) NOT NULL, 
  to_id VARCHAR(150) NOT NULL, 
  action VARCHAR(15) NOT NULL,
  createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  receipt JSON,
  PRIMARY KEY (transaction_id), 
  FOREIGN KEY (from_id) REFERENCES users(user_id),
  FOREIGN KEY (to_id) REFERENCES users(user_id))`

let query = sql.query(queryString)

query
  .on('error', (err) => {
    console.log("err ", err)
    sql.end(() => { })
  })
  .on('fields', (fields) => {
    console.log("fields ", fields)
  })
  .on('result', (results) => {
    console.log("results ", results)
    sql.end((err) => {

    })
  })

