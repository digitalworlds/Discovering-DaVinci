const mysql = require('mysql'),
  config = require('../config/config');

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.DB_PASSWORD || config.DB_PASSWORD,
  database: process.env.DB_NAME || config.DB_NAME
});

connection.connect(function(err) {
  if (err) throw err;
});

module.exports = connection;