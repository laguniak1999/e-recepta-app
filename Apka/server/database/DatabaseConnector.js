const mysql = require("mysql");
const dbConfig = require("../config/DbConfig.js");

var connection = mysql.createPool({
  host: dbConfig.host,
  user: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.database,
  multipleStatements: true,
});

module.exports = connection;
