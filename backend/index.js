const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

// TEST
app.get("/", (req, res) => {
  res.send("Backend po funksionon");
});

// GET produktet
app.get("/produktet", (req, res) => {
  const sql =
    "SELECT * FROM produkti ORDER BY produkti_id DESC";

  db.query(sql, (err, results) => {
    if (err) {
      console.log("Gabim:", err);
      return res
        .status(500)
        .send("Gabim ne databaze");
    }

    res.json(results);
  });
});

// START SERVER
app.listen(5000, () => {
  console.log(
    "Serveri po funksionon ne portin 5000"
  );
});