const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "supermarket_db",
  port: 3306
});

db.connect((err) => {
  if (err) {
    console.log("Gabim ne lidhje me databazen:", err);
  } else {
    console.log("U lidh me databazen");
  }
});

module.exports = db;