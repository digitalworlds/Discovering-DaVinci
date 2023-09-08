const sql = require('./databaseConnector');

let queryString = `CREATE TABLE users (
  user_id VARCHAR(150) NOT NULL, 
  email VARCHAR(150) NOT NULL, 
  createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, 
  active BOOLEAN NOT NULL, 
  hasSteemAccount BOOLEAN NOT NULL, 
  hash VARCHAR(150), 
  infInvId VARCHAR(36) NOT NULL, 
  infInv JSON NOT NULL, 
  encountered JSON NOT NULL, 
  power INT NOT NULL, 
  objectives JSON NOT NULL, 
  inventory JSON NOT NULL, 
  playerStats JSON NOT NULL,
  settings JSON NOT NULL,
  unknownInventionPieces JSON NOT NULL,
  PRIMARY KEY (user_id), 
  INDEX INFINV_ID (infInvId ASC), 
  INDEX HASH (hash ASC))`

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

