const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
<<<<<<< HEAD
<<<<<<< HEAD
  password: "password",
=======
  password: "",
>>>>>>> e2867bcef7aebb25a20fe81e1dc955492f950621
=======
  password: "mYsql895?",
>>>>>>> 697f02eaf861ab3a6928287dbe265d226986a2b3
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