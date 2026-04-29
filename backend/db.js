const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "supermarket_db"
});

db.connect((err) => {
  if (err) {
    console.log("Gabim:", err);
  } else {
    console.log("U lidh me databazen");
  }
});

module.exports = db;