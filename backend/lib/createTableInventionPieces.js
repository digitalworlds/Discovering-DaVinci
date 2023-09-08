const sql = require('./databaseConnector');
let queryString = `CREATE TABLE invention_pieces (
  ip_id VARCHAR(36) NOT NULL, 
  user_id VARCHAR(150) NOT NULL, 
  invention VARCHAR(1) NOT NULL,
  piece VARCHAR(1) NOT NULL,
  usedInBuild BOOL NOT NULL,
  INDEX USER_ID (user_id ASC),
  PRIMARY KEY (ip_id), 
  FOREIGN KEY (user_id) REFERENCES users(user_id))`

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

