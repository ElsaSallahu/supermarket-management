const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "supermarket_db",
  port: 3306
});

db.connect((err) => {
  if (err) {
    console.log("Gabim ne lidhje me databazen:", err);
  } else {
    console.log("Lidhja me databazen u realizua me sukses!");
  }
});

module.exports = db;