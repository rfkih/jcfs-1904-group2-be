require("dotenv").config();
const mysql = require("mysql2");

const { DB_USER, DB_NAME, DB_PASS } = process.env;


const mysql2 = mysql.createPool({
  host: "localhost",
  user: DB_USER,
  password: DB_PASS,
  database: DB_NAME,
});

// const mysql2 = mysql.createPool({
//   host: "172.105.115.129",
//   user: "user-2",
//   password: "9a216om5g",
//   database:"2_pharmacy",
// });

module.exports = { mysql2 };


